const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const rootDir = __dirname;
const dataDir = process.env.DATA_DIR || path.join(rootDir, "data");
const accountsDir = path.join(dataDir, "accounts");
const membersFile = path.join(dataDir, "members.json");
const settingsFile = path.join(dataDir, "settings.json");
const financeFile = path.join(dataDir, "finance.json");
const financeArchiveFile = path.join(dataDir, "finance-archive.json");
const renewalRequestsFile = path.join(dataDir, "renewal-requests.json");
const auditLogFile = path.join(dataDir, "audit-log.json");
const whatsappReminderLogFile = path.join(dataDir, "whatsapp-reminders.json");
const port = Number(process.env.PORT || 8080);
const whatsappApiVersion = String(process.env.WHATSAPP_API_VERSION || "v23.0").trim();
const whatsappCloudToken = String(process.env.WHATSAPP_CLOUD_TOKEN || "").trim();
const whatsappPhoneNumberId = String(process.env.WHATSAPP_PHONE_NUMBER_ID || "").trim();
const whatsappTemplateName = String(process.env.WHATSAPP_TEMPLATE_NAME || "").trim();
const whatsappTemplateLanguage = String(process.env.WHATSAPP_TEMPLATE_LANGUAGE || "ar").trim();
const whatsappAutoReminders = String(process.env.WHATSAPP_AUTO_REMINDERS || "disabled").trim().toLowerCase() === "enabled";
const whatsappAutoReminderHour = Math.max(0, Math.min(23, Number(process.env.WHATSAPP_AUTO_REMINDER_HOUR || 10)));
const whatsappAutoAccountEmail = normalizeAccountEmail(process.env.WHATSAPP_AUTO_ACCOUNT_EMAIL || "");
const WHATSAPP_BULK_LIMIT = 100;

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".webp": "image/webp"
};

const defaultSettings = {
    gymName: "Zahran Informa",
    gymPhone: "",
    ownerEmail: "",
    memberCodePrefix: "ZI",
    defaultPlan: "شهر",
    autoBackup: "enabled",
    expiryReminderDays: "7",
    registrationStatus: "open",
    inactiveMemberDays: "30",
    storageMode: "mobile-sync",
    onlineSyncUrl: "",
    syncTokenConfigured: false,
    updatedAt: null
};

async function ensureDataFiles() {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.mkdir(accountsDir, { recursive: true });
    await ensureJsonFile(membersFile, []);
    await ensureJsonFile(settingsFile, defaultSettings);
    await ensureJsonFile(financeFile, []);
    await ensureJsonFile(financeArchiveFile, []);
    await ensureJsonFile(renewalRequestsFile, []);
    await ensureJsonFile(auditLogFile, []);
    await ensureJsonFile(whatsappReminderLogFile, {});
}

function normalizeAccountEmail(value) {
    return String(value || "").trim().toLowerCase();
}

function getRequestAccountEmail(request) {
    const parsedUrl = new URL(request.url, "http://localhost");
    const headerEmail = request.headers["x-zahran-account"];
    return normalizeAccountEmail(headerEmail || parsedUrl.searchParams.get("account") || parsedUrl.searchParams.get("email"));
}

function getRequestSyncToken(request) {
    const parsedUrl = new URL(request.url, "http://localhost");
    const headerToken = request.headers["x-zahran-token"];
    return String(headerToken || parsedUrl.searchParams.get("token") || "").trim();
}

function getAccountKey(email) {
    return crypto.createHash("sha256").update(email).digest("hex").slice(0, 32);
}

function hashSyncToken(ownerEmail, token) {
    return crypto.createHash("sha256").update(`${ownerEmail}:${token}`).digest("hex");
}

async function getDataFilesForRequest(request) {
    const ownerEmail = getRequestAccountEmail(request);
    if (!ownerEmail) {
        return {
            ownerEmail: "",
            membersFile,
            settingsFile,
            financeFile,
            financeArchiveFile,
            renewalRequestsFile,
            auditLogFile,
            whatsappReminderLogFile,
            accountFile: ""
        };
    }

    const accountDir = path.join(accountsDir, getAccountKey(ownerEmail));
    await fs.mkdir(accountDir, { recursive: true });

    const files = {
        ownerEmail,
        membersFile: path.join(accountDir, "members.json"),
        settingsFile: path.join(accountDir, "settings.json"),
        financeFile: path.join(accountDir, "finance.json"),
        financeArchiveFile: path.join(accountDir, "finance-archive.json"),
        renewalRequestsFile: path.join(accountDir, "renewal-requests.json"),
        auditLogFile: path.join(accountDir, "audit-log.json"),
        whatsappReminderLogFile: path.join(accountDir, "whatsapp-reminders.json"),
        accountFile: path.join(accountDir, "account.json")
    };

    await ensureJsonFile(files.membersFile, []);
    await ensureJsonFile(files.settingsFile, { ...defaultSettings, ownerEmail });
    await ensureJsonFile(files.financeFile, []);
    await ensureJsonFile(files.financeArchiveFile, []);
    await ensureJsonFile(files.renewalRequestsFile, []);
    await ensureJsonFile(files.auditLogFile, []);
    await ensureJsonFile(files.whatsappReminderLogFile, {});
    await ensureJsonFile(files.accountFile, {
        ownerEmail,
        syncTokenHash: "",
        createdAt: new Date().toISOString(),
        updatedAt: null
    });

    return files;
}

async function ensureJsonFile(filePath, fallbackValue) {
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, JSON.stringify(fallbackValue, null, 2), "utf8");
    }
}

async function readJson(filePath, fallbackValue) {
    try {
        return JSON.parse(await fs.readFile(filePath, "utf8"));
    } catch {
        return fallbackValue;
    }
}

async function writeJson(filePath, value) {
    await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

function normalizeMemberCode(value) {
    return String(value || "").trim().toLowerCase();
}

function findDuplicateMemberCode(members, code, ignoredMemberId = "") {
    const normalizedCode = normalizeMemberCode(code);
    if (!normalizedCode) {
        return -1;
    }

    return members.findIndex((member) => (
        normalizeMemberCode(member.code) === normalizedCode
        && String(member.id) !== String(ignoredMemberId || "")
    ));
}

function normalizeMember(input, currentMember = {}) {
    return {
        ...currentMember,
        id: String(input.id || currentMember.id || `${Date.now()}`),
        code: String(input.code || currentMember.code || "").trim(),
        name: String(input.name || currentMember.name || "").trim(),
        phone: String(input.phone || currentMember.phone || "").trim(),
        weight: Math.max(0, Math.round(Number(input.weight ?? currentMember.weight ?? 0) * 10) / 10),
        height: Math.max(0, Math.round(Number(input.height ?? currentMember.height ?? 0) * 10) / 10),
        plan: normalizePlanValue(input.plan || currentMember.plan),
        price: Math.max(0, Math.round(Number(input.price ?? currentMember.price ?? 0))),
        subscriptionStartedAt: String(input.subscriptionStartedAt ?? currentMember.subscriptionStartedAt ?? input.createdAt ?? currentMember.createdAt ?? new Date().toISOString()).slice(0, 10),
        subscriptionEndsAt: String(input.subscriptionEndsAt ?? currentMember.subscriptionEndsAt ?? "").slice(0, 10),
        totalDays: Math.max(0, Math.floor(Number(input.totalDays ?? currentMember.totalDays ?? input.remainingDays ?? currentMember.remainingDays ?? 0))),
        remainingDays: Math.max(0, Math.floor(Number(input.remainingDays ?? currentMember.remainingDays ?? input.totalDays ?? currentMember.totalDays ?? 0))),
        attendanceCount: Math.max(0, Math.floor(Number(input.attendanceCount ?? currentMember.attendanceCount ?? 0))),
        lastAttendanceAt: input.lastAttendanceAt ?? currentMember.lastAttendanceAt ?? null,
        attendanceLog: Array.isArray(input.attendanceLog) ? normalizeAttendanceLog(input.attendanceLog) : normalizeAttendanceLog(currentMember.attendanceLog || []),
        measurementLog: Array.isArray(input.measurementLog) ? input.measurementLog : (currentMember.measurementLog || []),
        approvedForMemberApp: Boolean(input.approvedForMemberApp ?? currentMember.approvedForMemberApp ?? false),
        photo: String(input.photo ?? currentMember.photo ?? "").trim(),
        faceSignature: String(input.faceSignature ?? currentMember.faceSignature ?? "").trim(),
        photoEnhanced: Boolean(input.photoEnhanced ?? currentMember.photoEnhanced),
        createdAt: currentMember.createdAt || input.createdAt || new Date().toISOString(),
        updatedAt: input.updatedAt || currentMember.updatedAt || null
    };
}

function normalizeSettingsInput(input = {}, ownerEmail = "") {
    return {
        ...defaultSettings,
        gymName: String(input.gymName || defaultSettings.gymName).trim(),
        gymPhone: String(input.gymPhone || "").trim(),
        ownerEmail: normalizeAccountEmail(input.ownerEmail || ownerEmail),
        memberCodePrefix: String(input.memberCodePrefix || "ZI").trim().toUpperCase().slice(0, 6),
        defaultPlan: normalizePlanValue(input.defaultPlan || "شهر"),
        autoBackup: input.autoBackup === "enabled" ? "enabled" : "disabled",
        expiryReminderDays: String(input.expiryReminderDays || "7").trim(),
        registrationStatus: input.registrationStatus === "closed" ? "closed" : "open",
        inactiveMemberDays: String(input.inactiveMemberDays || "30").trim(),
        storageMode: String(input.storageMode || "mobile-sync").trim(),
        onlineSyncUrl: normalizeOnlineSyncUrl(input.onlineSyncUrl),
        syncTokenConfigured: Boolean(input.syncTokenConfigured),
        updatedAt: input.updatedAt || new Date().toISOString()
    };
}

async function readAccountMeta(dataFiles) {
    if (!dataFiles.accountFile) {
        return { ownerEmail: "", syncTokenHash: "" };
    }

    return await readJson(dataFiles.accountFile, {
        ownerEmail: dataFiles.ownerEmail,
        syncTokenHash: "",
        createdAt: new Date().toISOString(),
        updatedAt: null
    });
}

async function writeAccountMeta(dataFiles, meta) {
    if (!dataFiles.accountFile) {
        return;
    }

    await writeJson(dataFiles.accountFile, {
        ownerEmail: dataFiles.ownerEmail,
        syncTokenHash: String(meta.syncTokenHash || ""),
        createdAt: meta.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
}

async function ensureAccountAccess(request, response, dataFiles, input = null) {
    if (!dataFiles.ownerEmail) {
        return true;
    }

    const meta = await readAccountMeta(dataFiles);
    const requestToken = getRequestSyncToken(request) || String(input?.syncToken || "").trim();
    const tokenHash = requestToken ? hashSyncToken(dataFiles.ownerEmail, requestToken) : "";

    if (!meta.syncTokenHash) {
        if (requestToken) {
            meta.syncTokenHash = tokenHash;
            await writeAccountMeta(dataFiles, meta);
        }
        return true;
    }

    if (!tokenHash) {
        sendJson(response, 401, { error: "Sync token is required." });
        return false;
    }

    if (tokenHash !== meta.syncTokenHash) {
        sendJson(response, 403, { error: "Invalid sync token." });
        return false;
    }

    return true;
}

async function rotateAccountSyncToken(dataFiles, token) {
    if (!dataFiles.ownerEmail || !token) {
        return;
    }

    const meta = await readAccountMeta(dataFiles);
    meta.syncTokenHash = hashSyncToken(dataFiles.ownerEmail, token);
    await writeAccountMeta(dataFiles, meta);
}

async function appendAuditLog(dataFiles, action, details = {}) {
    const entries = await readJson(dataFiles.auditLogFile, []);
    const entry = {
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        at: new Date().toISOString(),
        account: dataFiles.ownerEmail || "local",
        action,
        details
    };

    entries.unshift(entry);
    await writeJson(dataFiles.auditLogFile, entries.slice(0, 500));
}

async function decorateSettingsForResponse(settings, dataFiles) {
    const meta = await readAccountMeta(dataFiles);
    const { syncToken, ...cleanSettings } = settings;
    return {
        ...cleanSettings,
        syncTokenConfigured: Boolean(meta.syncTokenHash || settings.syncTokenConfigured)
    };
}

function sendJson(response, statusCode, value) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, X-Zahran-Account, X-Zahran-Token",
        "Cache-Control": "no-store"
    });
    response.end(JSON.stringify(value));
}

function sendNoContent(response) {
    response.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Zahran-Account, X-Zahran-Token",
        "Cache-Control": "no-store"
    });
    response.end();
}

function normalizeOnlineSyncUrl(value) {
    const rawUrl = String(value || "").trim().replace(/\/+$/, "");
    if (!rawUrl) return "";

    try {
        const url = new URL(rawUrl);
        return ["http:", "https:"].includes(url.protocol) ? url.origin : "";
    } catch {
        return "";
    }
}

function normalizePhoneForWhatsApp(phone) {
    const digits = String(phone || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("00")) return digits.slice(2);
    if (digits.startsWith("0")) return `20${digits.slice(1)}`;
    return digits;
}

function getWhatsAppConfigStatus() {
    return {
        enabled: Boolean(whatsappCloudToken && whatsappPhoneNumberId),
        hasAccessToken: Boolean(whatsappCloudToken),
        hasPhoneNumberId: Boolean(whatsappPhoneNumberId),
        apiVersion: whatsappApiVersion,
        mode: whatsappTemplateName ? "template" : "text",
        templateName: whatsappTemplateName,
        templateLanguage: whatsappTemplateLanguage,
        automaticReminders: whatsappAutoReminders,
        automaticReminderHour: whatsappAutoReminderHour
    };
}

function normalizeWhatsAppRecipient(input = {}) {
    const memberName = String(input.memberName || input.name || "").trim();
    const memberCode = String(input.memberCode || input.code || "").trim();
    const remainingDays = Math.max(0, Math.floor(Number(input.remainingDays || 0)));
    const subscriptionEndsAt = String(input.subscriptionEndsAt || input.expiry || "").slice(0, 10);
    const message = String(input.message || "").trim();

    return {
        id: String(input.id || input.memberId || "").trim(),
        phone: normalizePhoneForWhatsApp(input.phone || input.to),
        message,
        memberName,
        memberCode,
        remainingDays,
        subscriptionEndsAt,
        templateParameters: Array.isArray(input.templateParameters)
            ? input.templateParameters.map((value) => String(value ?? "").trim())
            : [
                memberName,
                settingsFriendlyValue(input.gymName, "Zahran Informa"),
                subscriptionEndsAt || "-",
                String(remainingDays),
                memberCode
            ]
    };
}

function settingsFriendlyValue(value, fallback = "") {
    const normalized = String(value || "").trim();
    return normalized || fallback;
}

function buildWhatsAppMessagePayload(recipient) {
    if (whatsappTemplateName) {
        const parameters = recipient.templateParameters
            .filter((value) => String(value || "").trim())
            .map((value) => ({
                type: "text",
                text: String(value).slice(0, 1024)
            }));

        return {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: recipient.phone,
            type: "template",
            template: {
                name: whatsappTemplateName,
                language: {
                    code: whatsappTemplateLanguage
                },
                ...(parameters.length
                    ? {
                        components: [
                            {
                                type: "body",
                                parameters
                            }
                        ]
                    }
                    : {})
            }
        };
    }

    return {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient.phone,
        type: "text",
        text: {
            preview_url: false,
            body: recipient.message.slice(0, 4096)
        }
    };
}

async function sendWhatsAppCloudMessage(input) {
    const status = getWhatsAppConfigStatus();
    if (!status.enabled) {
        const missing = [
            status.hasAccessToken ? "" : "WHATSAPP_CLOUD_TOKEN",
            status.hasPhoneNumberId ? "" : "WHATSAPP_PHONE_NUMBER_ID"
        ].filter(Boolean).join(", ");
        const error = new Error(`WhatsApp Cloud API is not configured. Missing: ${missing}`);
        error.statusCode = 503;
        throw error;
    }

    const recipient = normalizeWhatsAppRecipient(input);
    if (!recipient.phone) {
        const error = new Error("Recipient phone is required.");
        error.statusCode = 400;
        throw error;
    }
    if (!whatsappTemplateName && !recipient.message) {
        const error = new Error("Message text is required.");
        error.statusCode = 400;
        throw error;
    }

    const response = await fetch(
        `https://graph.facebook.com/${encodeURIComponent(whatsappApiVersion)}/${encodeURIComponent(whatsappPhoneNumberId)}/messages`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${whatsappCloudToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(buildWhatsAppMessagePayload(recipient))
        }
    );
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        const apiMessage = result?.error?.message || `WhatsApp Cloud API error: ${response.status}`;
        const error = new Error(apiMessage);
        error.statusCode = response.status;
        error.apiError = result?.error || null;
        throw error;
    }

    return {
        ok: true,
        phone: recipient.phone,
        messageId: result?.messages?.[0]?.id || "",
        contact: result?.contacts?.[0] || null
    };
}

function formatDateForWhatsApp(value) {
    const dateValue = String(value || "").slice(0, 10);
    if (!dateValue) return "-";
    const [year, month, day] = dateValue.split("-");
    if (!year || !month || !day) return dateValue;
    return `${day}/${month}/${year}`;
}

function buildExpiryReminderMessage(member, settings) {
    return `اهلا وسهلا يا ${member.name || ""}\nاشتراكك ف الجيم على وشك الانتهاء يا وحش🫵💪 تنمنى تجديده للاستمرار ف التمرين معانا\nللتجديد تواصل مع ادارة الجيم ☺️😜`;
}

function getTodayDateValue() {
    return new Date().toISOString().slice(0, 10);
}

async function readWhatsAppReminderLog(dataFiles) {
    const filePath = dataFiles.whatsappReminderLogFile;
    if (!filePath) return {};
    return await readJson(filePath, {});
}

async function writeWhatsAppReminderLog(dataFiles, log) {
    const filePath = dataFiles.whatsappReminderLogFile;
    if (!filePath) return;
    await writeJson(filePath, log && typeof log === "object" ? log : {});
}

async function sendAutomaticWhatsAppRemindersForAccount(dataFiles) {
    const settings = await readJson(dataFiles.settingsFile, { ...defaultSettings, ownerEmail: dataFiles.ownerEmail });
    const members = await readJson(dataFiles.membersFile, []);
    const reminderDays = Math.max(0, Math.floor(Number(settings.expiryReminderDays || 7)));
    const today = getTodayDateValue();
    const log = await readWhatsAppReminderLog(dataFiles);
    const eligibleMembers = members.filter((member) => {
        const remainingDays = Math.max(0, Math.floor(Number(member.remainingDays || 0)));
        return normalizePhoneForWhatsApp(member.phone)
            && remainingDays > 0
            && remainingDays <= reminderDays
            && log[`expiry:${member.id}`]?.date !== today;
    });

    const results = [];
    for (const member of eligibleMembers.slice(0, WHATSAPP_BULK_LIMIT)) {
        try {
            const remainingDays = Math.max(0, Math.floor(Number(member.remainingDays || 0)));
            const message = buildExpiryReminderMessage(member, settings);
            const result = await sendWhatsAppCloudMessage({
                id: member.id,
                phone: member.phone,
                message,
                memberName: member.name,
                memberCode: member.code,
                gymName: settings.gymName,
                remainingDays,
                subscriptionEndsAt: member.subscriptionEndsAt,
                templateParameters: [
                    member.name || "",
                    settings.gymName || "Zahran Informa",
                    formatDateForWhatsApp(member.subscriptionEndsAt || ""),
                    String(remainingDays),
                    member.code || ""
                ]
            });
            log[`expiry:${member.id}`] = {
                memberId: member.id,
                date: today,
                sentAt: new Date().toISOString(),
                messageId: result.messageId || "",
                remainingDays
            };
            results.push({ ok: true, memberId: member.id, phone: result.phone, messageId: result.messageId });
        } catch (error) {
            results.push({
                ok: false,
                memberId: String(member.id || ""),
                phone: normalizePhoneForWhatsApp(member.phone),
                error: error.message || "WhatsApp send failed."
            });
        }
    }

    await writeWhatsAppReminderLog(dataFiles, log);
    if (results.length) {
        await appendAuditLog(dataFiles, "whatsapp:auto-reminders", `تمت معالجة ${results.length} رسالة واتساب تلقائية.`);
    }
    return results;
}

function normalizeAttendanceLog(input) {
    if (!Array.isArray(input)) {
        return [];
    }

    return input
        .filter(Boolean)
        .map((entry) => {
            if (typeof entry === "object") {
                return {
                    at: String(entry.at || entry.date || entry.createdAt || new Date().toISOString()),
                    photo: String(entry.photo || ""),
                    faceSignature: String(entry.faceSignature || "")
                };
            }

            return {
                at: String(entry),
                photo: "",
                faceSignature: ""
            };
        });
}

function normalizePlanValue(plan) {
    const value = String(plan || "").trim();
    const legacyPlans = {
        "شهري": "شهر",
        "3 شهور": "شهر",
        "حصص": "10 أيام",
        "PT": "10 أيام",
        "10 ايام": "10 أيام",
        "نصف شهر": "نص شهر"
    };
    return legacyPlans[value] || (["نص شهر", "شهر", "10 أيام"].includes(value) ? value : "شهر");
}

function normalizeRenewalRequest(input) {
    return {
        id: String(input.id || `${Date.now()}`),
        memberId: String(input.memberId || "").trim(),
        memberCode: String(input.memberCode || "").trim(),
        memberName: String(input.memberName || "").trim(),
        memberPhone: String(input.memberPhone || "").trim(),
        plan: normalizePlanValue(input.plan),
        remainingDays: Math.max(0, Math.floor(Number(input.remainingDays || 0))),
        createdAt: input.createdAt || new Date().toISOString()
    };
}

function readBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk;
            if (body.length > 50_000_000) {
                request.destroy();
                reject(new Error("Request body is too large."));
            }
        });
        request.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
    });
}

async function handleApi(request, response) {
    if (request.method === "OPTIONS") {
        sendNoContent(response);
        return true;
    }

    const requestPath = new URL(request.url, "http://localhost").pathname;
    const dataFiles = await getDataFilesForRequest(request);
    if (!(await ensureAccountAccess(request, response, dataFiles))) {
        return true;
    }

    if (requestPath === "/api/health" && request.method === "GET") {
        sendJson(response, 200, {
            ok: true,
            app: "Zahran Informa",
            dataDir,
            whatsapp: getWhatsAppConfigStatus()
        });
        return true;
    }

    if (requestPath === "/api/whatsapp/status" && request.method === "GET") {
        sendJson(response, 200, getWhatsAppConfigStatus());
        return true;
    }

    if (requestPath === "/api/whatsapp/send" && request.method === "POST") {
        const input = await readBody(request);
        try {
            const result = await sendWhatsAppCloudMessage(input);
            await appendAuditLog(dataFiles, "whatsapp:send", `${input.memberName || input.name || input.phone || input.to || "رسالة"} - ${result.messageId || "sent"}`);
            sendJson(response, 200, result);
        } catch (error) {
            sendJson(response, error.statusCode || 500, {
                ok: false,
                error: error.message || "WhatsApp send failed.",
                apiError: error.apiError || null
            });
        }
        return true;
    }

    if (requestPath === "/api/whatsapp/send-bulk" && request.method === "POST") {
        const input = await readBody(request);
        const recipients = Array.isArray(input.recipients) ? input.recipients : [];
        const type = String(input.type || "broadcast").trim();
        if (!recipients.length) {
            sendJson(response, 400, { ok: false, error: "No WhatsApp recipients were provided." });
            return true;
        }
        if (recipients.length > WHATSAPP_BULK_LIMIT) {
            sendJson(response, 400, { ok: false, error: `Bulk WhatsApp send is limited to ${WHATSAPP_BULK_LIMIT} recipients per request.` });
            return true;
        }

        const reminderLog = type === "expiry" ? await readWhatsAppReminderLog(dataFiles) : {};
        const results = [];
        for (const recipientInput of recipients) {
            try {
                const result = await sendWhatsAppCloudMessage(recipientInput);
                results.push({
                    ok: true,
                    id: String(recipientInput.id || recipientInput.memberId || ""),
                    phone: result.phone,
                    messageId: result.messageId
                });
                if (type === "expiry" && (recipientInput.id || recipientInput.memberId)) {
                    reminderLog[`expiry:${recipientInput.id || recipientInput.memberId}`] = {
                        memberId: String(recipientInput.id || recipientInput.memberId),
                        date: getTodayDateValue(),
                        sentAt: new Date().toISOString(),
                        messageId: result.messageId || "",
                        remainingDays: Math.max(0, Math.floor(Number(recipientInput.remainingDays || 0)))
                    };
                }
            } catch (error) {
                results.push({
                    ok: false,
                    id: String(recipientInput.id || recipientInput.memberId || ""),
                    phone: normalizePhoneForWhatsApp(recipientInput.phone || recipientInput.to),
                    error: error.message || "WhatsApp send failed.",
                    apiError: error.apiError || null
                });
            }
        }

        if (type === "expiry") {
            await writeWhatsAppReminderLog(dataFiles, reminderLog);
        }
        const sent = results.filter((item) => item.ok).length;
        await appendAuditLog(dataFiles, "whatsapp:bulk-send", `تم إرسال ${sent} من ${results.length} رسالة واتساب.`);
        sendJson(response, 200, {
            ok: sent > 0,
            total: results.length,
            sent,
            failed: results.length - sent,
            results
        });
        return true;
    }

    if (requestPath === "/api/whatsapp/send-reminders" && request.method === "POST") {
        try {
            const results = await sendAutomaticWhatsAppRemindersForAccount(dataFiles);
            const sent = results.filter((item) => item.ok).length;
            sendJson(response, 200, {
                ok: sent > 0 || results.length === 0,
                total: results.length,
                sent,
                failed: results.length - sent,
                results
            });
        } catch (error) {
            sendJson(response, error.statusCode || 500, {
                ok: false,
                error: error.message || "WhatsApp reminders failed.",
                apiError: error.apiError || null
            });
        }
        return true;
    }

    if (requestPath === "/api/settings" && request.method === "GET") {
        const settings = await readJson(dataFiles.settingsFile, { ...defaultSettings, ownerEmail: dataFiles.ownerEmail });
        sendJson(response, 200, await decorateSettingsForResponse({ ...defaultSettings, ownerEmail: dataFiles.ownerEmail || settings.ownerEmail || "", ...settings }, dataFiles));
        return true;
    }

    if (requestPath === "/api/settings" && request.method === "PUT") {
        const input = await readBody(request);
        const settings = normalizeSettingsInput(input, dataFiles.ownerEmail);
        const syncToken = String(input.syncToken || "").trim();
        if (syncToken) {
            await rotateAccountSyncToken(dataFiles, syncToken);
            settings.syncTokenConfigured = true;
        }

        await writeJson(dataFiles.settingsFile, settings);
        await appendAuditLog(dataFiles, "settings:update", "تم تحديث إعدادات الحساب.");
        sendJson(response, 200, await decorateSettingsForResponse(settings, dataFiles));
        return true;
    }

    if (requestPath === "/api/captain/set-code" && request.method === "POST") {
        const input = await readBody(request);
        const code = String(input.code || "").trim();
        if (!code || code.length < 4) {
            sendJson(response, 400, { error: "كود الكابتن يجب أن يكون 4 أحرف على الأقل." });
            return true;
        }
        const settings = await readJson(dataFiles.settingsFile, {});
        settings.captainCode = code;
        await writeJson(dataFiles.settingsFile, settings);
        sendJson(response, 200, { ok: true, message: "تم حفظ كود الكابتن بنجاح." });
        return true;
    }

    if (requestPath === "/api/captain/login" && request.method === "POST") {
        const input = await readBody(request);
        const code = String(input.code || "").trim();
        const settings = await readJson(dataFiles.settingsFile, {});
        const captainCode = String(settings.captainCode || "").trim();
        if (!captainCode) {
            sendJson(response, 403, { error: "لم يتم تعيين كود الكابتن بعد. تواصل مع صاحب الجيم." });
            return true;
        }
        if (code !== captainCode) {
            sendJson(response, 401, { error: "كود الكابتن غير صحيح." });
            return true;
        }
        sendJson(response, 200, { ok: true });
        return true;
    }

    if (requestPath === "/api/supervisor/set-code" && request.method === "POST") {
        const input = await readBody(request);
        const code = String(input.code || "").trim();
        if (!code || code.length < 4) {
            sendJson(response, 400, { error: "كود المشرف يجب أن يكون 4 أحرف على الأقل." });
            return true;
        }
        const settings = await readJson(dataFiles.settingsFile, {});
        settings.supervisorCode = code;
        await writeJson(dataFiles.settingsFile, settings);
        sendJson(response, 200, { ok: true, message: "تم حفظ كود المشرف بنجاح." });
        return true;
    }

    if (requestPath === "/api/supervisor/login" && request.method === "POST") {
        const input = await readBody(request);
        const code = String(input.code || "").trim();
        const settings = await readJson(dataFiles.settingsFile, {});
        const supervisorCode = String(settings.supervisorCode || "").trim();
        if (!supervisorCode) {
            sendJson(response, 403, { error: "لم يتم تعيين كود المشرف بعد. تواصل مع الكابتن." });
            return true;
        }
        if (code !== supervisorCode) {
            sendJson(response, 401, { error: "كود المشرف غير صحيح." });
            return true;
        }
        sendJson(response, 200, { ok: true });
        return true;
    }

    if (requestPath === "/api/captain/today" && request.method === "GET") {
        const members = await readJson(dataFiles.membersFile, []);
        const today = new Date().toISOString().slice(0, 10);
        const present = members.filter(m => {
            const log = Array.isArray(m.attendanceLog) ? m.attendanceLog : [];
            return log.some(entry => {
                const d = typeof entry === "object" ? (entry.date || (entry.at||"").slice(0,10)) : String(entry).slice(0,10);
                return d === today;
            });
        });
        sendJson(response, 200, { ok: true, members: present, date: today });
        return true;
    }

    if (requestPath === "/api/backup" && request.method === "GET") {
        sendJson(response, 200, {
            app: "Zahran Informa",
            version: 1,
            exportedAt: new Date().toISOString(),
            settings: await decorateSettingsForResponse(await readJson(dataFiles.settingsFile, { ...defaultSettings, ownerEmail: dataFiles.ownerEmail }), dataFiles),
            members: await readJson(dataFiles.membersFile, []),
            financeEntries: await readJson(dataFiles.financeFile, []),
            renewalRequests: await readJson(dataFiles.renewalRequestsFile, [])
        });
        return true;
    }

    if (requestPath === "/api/backup" && request.method === "PUT") {
        const input = await readBody(request);
        const settings = normalizeSettingsInput(input.settings || {}, dataFiles.ownerEmail);
        const members = Array.isArray(input.members) ? input.members.map((member) => normalizeMember(member)) : [];
        const financeEntries = Array.isArray(input.financeEntries) ? input.financeEntries.map((entry) => ({
            id: String(entry.id || `${Date.now()}`),
            type: entry.type === "expense" ? "expense" : "income",
            amount: Math.max(0, Math.round(Number(entry.amount || 0))),
            note: String(entry.note || "").trim(),
            date: String(entry.date || new Date().toISOString().slice(0, 10)).trim(),
            createdAt: entry.createdAt || new Date().toISOString()
        })) : [];
        const renewalRequests = Array.isArray(input.renewalRequests) ? input.renewalRequests.map(normalizeRenewalRequest) : [];

        await writeJson(dataFiles.settingsFile, settings);
        await writeJson(dataFiles.membersFile, members);
        await writeJson(dataFiles.financeFile, financeEntries);
        await writeJson(dataFiles.renewalRequestsFile, renewalRequests);
        await appendAuditLog(dataFiles, "backup:restore", `تم استبدال بيانات الحساب: ${members.length} مشترك.`);
        sendJson(response, 200, {
            settings: await decorateSettingsForResponse(settings, dataFiles),
            members,
            financeEntries,
            renewalRequests
        });
        return true;
    }

    if (requestPath === "/api/audit" && request.method === "GET") {
        sendJson(response, 200, await readJson(dataFiles.auditLogFile, []));
        return true;
    }

    if (requestPath === "/api/members" && request.method === "GET") {
        const members = await readJson(dataFiles.membersFile, []);
        sendJson(response, 200, members);
        return true;
    }

    if (requestPath === "/api/finance" && request.method === "GET") {
        sendJson(response, 200, await readJson(dataFiles.financeFile, []));
        return true;
    }

    if (requestPath === "/api/finance" && request.method === "POST") {
        const input = await readBody(request);
        const entries = await readJson(dataFiles.financeFile, []);
        const entry = {
            id: String(input.id || `${Date.now()}`),
            type: input.type === "expense" ? "expense" : "income",
            amount: Math.max(0, Math.round(Number(input.amount || 0))),
            note: String(input.note || "").trim(),
            date: String(input.date || new Date().toISOString().slice(0, 10)).trim(),
            createdAt: input.createdAt || new Date().toISOString()
        };

        if (!entry.amount || !entry.note) {
            sendJson(response, 400, { error: "Missing required finance fields." });
            return true;
        }

        const existingEntryIndex = entries.findIndex((item) => String(item.id) === entry.id);
        if (existingEntryIndex >= 0) {
            entries[existingEntryIndex] = { ...entries[existingEntryIndex], ...entry };
        } else {
            entries.unshift(entry);
        }
        await writeJson(dataFiles.financeFile, entries);
        await appendAuditLog(dataFiles, "finance:create", `${entry.type === "income" ? "وارد" : "مصروف"} - ${entry.amount}`);
        sendJson(response, existingEntryIndex >= 0 ? 200 : 201, entry);
        return true;
    }

    if (requestPath === "/api/finance" && request.method === "DELETE") {
        const entries = await readJson(dataFiles.financeFile, []);
        const income = entries
            .filter((item) => item.type !== "expense")
            .reduce((sum, item) => sum + Number(item.amount || 0), 0);
        const expense = entries
            .filter((item) => item.type === "expense")
            .reduce((sum, item) => sum + Number(item.amount || 0), 0);

        if (entries.length) {
            // Members and their data are untouched: only the finance ledger moves to the archive.
            const archive = await readJson(dataFiles.financeArchiveFile, []);
            const archiveList = Array.isArray(archive) ? archive : [];
            archiveList.unshift({
                id: `${Date.now()}`,
                resetAt: new Date().toISOString(),
                totals: { income, expense, net: income - expense, count: entries.length },
                entries
            });
            await writeJson(dataFiles.financeArchiveFile, archiveList.slice(0, 12));
        }

        await writeJson(dataFiles.financeFile, []);
        await appendAuditLog(dataFiles, "finance:reset", `تصفير الخزنة - ${entries.length} حركة (وارد: ${income} | صادر: ${expense})`);
        sendJson(response, 200, {
            cleared: entries.length,
            income,
            expense,
            net: income - expense,
            financeEntries: []
        });
        return true;
    }

    if (requestPath === "/api/renewal-requests" && request.method === "GET") {
        sendJson(response, 200, await readJson(dataFiles.renewalRequestsFile, []));
        return true;
    }

    if (requestPath === "/api/renewal-requests" && request.method === "POST") {
        const input = await readBody(request);
        const requests = await readJson(dataFiles.renewalRequestsFile, []);
        const renewalRequest = normalizeRenewalRequest(input);

        if (!renewalRequest.memberCode || !renewalRequest.memberName) {
            sendJson(response, 400, { error: "Missing required renewal fields." });
            return true;
        }

        const existingRequestIndex = requests.findIndex((item) => String(item.id) === renewalRequest.id);
        if (existingRequestIndex >= 0) {
            requests[existingRequestIndex] = { ...requests[existingRequestIndex], ...renewalRequest };
        } else {
            requests.unshift(renewalRequest);
        }

        await writeJson(dataFiles.renewalRequestsFile, requests);
        await appendAuditLog(dataFiles, "renewal:create", `${renewalRequest.memberName} - ${renewalRequest.memberCode}`);
        sendJson(response, existingRequestIndex >= 0 ? 200 : 201, renewalRequest);
        return true;
    }

    if (requestPath.startsWith("/api/renewal-requests/") && request.method === "DELETE") {
        const requestId = decodeURIComponent(requestPath.replace("/api/renewal-requests/", ""));
        const requests = await readJson(dataFiles.renewalRequestsFile, []);
        const nextRequests = requests.filter((item) => String(item.id) !== requestId);

        if (nextRequests.length === requests.length) {
            sendJson(response, 404, { error: "Renewal request not found." });
            return true;
        }

        await writeJson(dataFiles.renewalRequestsFile, nextRequests);
        await appendAuditLog(dataFiles, "renewal:delete", requestId);
        sendJson(response, 200, { ok: true });
        return true;
    }

    if (requestPath === "/api/members" && request.method === "POST") {
        const input = await readBody(request);
        const members = await readJson(dataFiles.membersFile, []);
        const member = normalizeMember(input);

        if (!member.code || !member.name || !member.plan) {
            sendJson(response, 400, { error: "Missing required member fields." });
            return true;
        }

        const existingMemberIndex = members.findIndex((item) => String(item.id) === member.id);
        const duplicateCodeIndex = findDuplicateMemberCode(members, member.code, member.id);
        if (duplicateCodeIndex >= 0) {
            sendJson(response, 409, { error: "Member code already exists." });
            return true;
        }

        if (existingMemberIndex >= 0) {
            members[existingMemberIndex] = {
                ...members[existingMemberIndex],
                ...member,
                updatedAt: new Date().toISOString()
            };
        } else {
            members.unshift(member);
        }
        await writeJson(dataFiles.membersFile, members);
        await appendAuditLog(dataFiles, existingMemberIndex >= 0 ? "member:update" : "member:create", `${member.name} - ${member.code}`);
        sendJson(response, existingMemberIndex >= 0 ? 200 : 201, existingMemberIndex >= 0 ? members[existingMemberIndex] : member);
        return true;
    }

    if (requestPath.startsWith("/api/members/") && request.method === "PUT") {
        const memberId = decodeURIComponent(requestPath.replace("/api/members/", ""));
        const input = await readBody(request);
        const members = await readJson(dataFiles.membersFile, []);
        const memberIndex = members.findIndex((member) => String(member.id) === memberId);

        if (memberIndex === -1) {
            sendJson(response, 404, { error: "Member not found." });
            return true;
        }

        const currentMember = members[memberIndex];
        const updatedMember = normalizeMember({
            ...input,
            updatedAt: new Date().toISOString()
        }, currentMember);

        const duplicateCodeIndex = findDuplicateMemberCode(members, updatedMember.code, memberId);
        if (duplicateCodeIndex >= 0) {
            sendJson(response, 409, { error: "Member code already exists." });
            return true;
        }

        members[memberIndex] = updatedMember;
        await writeJson(dataFiles.membersFile, members);
        await appendAuditLog(dataFiles, "member:update", `${updatedMember.name} - ${updatedMember.code}`);
        sendJson(response, 200, updatedMember);
        return true;
    }

    if (requestPath === "/api/member/login" && request.method === "POST") {
        const input = await readBody(request);
        const inputCode = normalizeMemberCode(input.code);
        const inputPhone = normalizePhoneForWhatsApp(input.phone);
        const rawPhoneDigits = String(input.phone || "").replace(/\D/g, "");

        if (!inputCode || (!inputPhone && !rawPhoneDigits)) {
            sendJson(response, 400, { error: "يرجى إدخال كود المشترك ورقم الهاتف لتسجيل الدخول." });
            return true;
        }

        const members = await readJson(dataFiles.membersFile, []);
        const member = members.find((m) => {
            const codeMatch = normalizeMemberCode(m.code) === inputCode;
            const mPhone = normalizePhoneForWhatsApp(m.phone);
            const mDigits = String(m.phone || "").replace(/\D/g, "");
            const phoneMatch = (mPhone && mPhone === inputPhone) || (rawPhoneDigits && (mDigits.endsWith(rawPhoneDigits) || rawPhoneDigits.endsWith(mDigits)));
            return codeMatch && phoneMatch;
        });

        if (!member) {
            sendJson(response, 404, { error: "عذراً، هذا المشترك غير مسجل في قاعدة بيانات الجيم." });
            return true;
        }

        if (!member.approvedForMemberApp) {
            sendJson(response, 403, { error: "غير مسموح بالدخول: يجب الحصول على موافقة كابتن الجيم لتفعيل حسابك على التطبيق أولاً." });
            return true;
        }

        sendJson(response, 200, { ok: true, member });
        return true;
    }

    if (requestPath === "/api/member/measurements" && request.method === "POST") {
        const input = await readBody(request);
        const memberId = String(input.memberId || "").trim();
        const height = Math.max(0, Math.round(Number(input.height || 0) * 10) / 10);
        const weight = Math.max(0, Math.round(Number(input.weight || 0) * 10) / 10);

        if (!memberId || height <= 0 || weight <= 0) {
            sendJson(response, 400, { error: "يرجى إدخال بيانات الطول والوزن بشكل صحيح." });
            return true;
        }

        const members = await readJson(dataFiles.membersFile, []);
        const memberIndex = members.findIndex((m) => String(m.id) === memberId);
        if (memberIndex === -1) {
            sendJson(response, 404, { error: "المشترك غير موجود." });
            return true;
        }

        const member = members[memberIndex];
        if (!member.approvedForMemberApp) {
            sendJson(response, 403, { error: "غير مصرح لك بتسجيل القياسات." });
            return true;
        }

        const newMeasurement = {
            at: new Date().toISOString(),
            date: new Date().toISOString().slice(0, 10),
            height,
            weight
        };

        const measurementLog = Array.isArray(member.measurementLog) ? [...member.measurementLog] : [];
        measurementLog.unshift(newMeasurement);

        const updatedMember = normalizeMember({
            ...member,
            height,
            weight,
            measurementLog,
            updatedAt: new Date().toISOString()
        }, member);

        members[memberIndex] = updatedMember;
        await writeJson(dataFiles.membersFile, members);
        await appendAuditLog(dataFiles, "member:measurement", `${updatedMember.name} - W:${weight} H:${height}`);
        sendJson(response, 200, { ok: true, member: updatedMember });
        return true;
    }

    if (requestPath.startsWith("/api/members/") && requestPath.endsWith("/approval") && request.method === "PUT") {
        const memberId = decodeURIComponent(requestPath.replace("/api/members/", "").replace("/approval", ""));
        const input = await readBody(request);
        const members = await readJson(dataFiles.membersFile, []);
        const memberIndex = members.findIndex((m) => String(m.id) === memberId);

        if (memberIndex === -1) {
            sendJson(response, 404, { error: "Member not found." });
            return true;
        }

        const approved = Boolean(input.approvedForMemberApp);
        members[memberIndex].approvedForMemberApp = approved;
        members[memberIndex].updatedAt = new Date().toISOString();

        await writeJson(dataFiles.membersFile, members);
        await appendAuditLog(dataFiles, "member:approval", `${members[memberIndex].name} - ${approved ? "موافق" : "معطل"}`);
        sendJson(response, 200, { ok: true, member: members[memberIndex] });
        return true;
    }

    if (requestPath === "/api/member/renewal-request" && request.method === "POST") {
        const input = await readBody(request);
        const memberId = String(input.memberId || "").trim();
        const members = await readJson(dataFiles.membersFile, []);
        const member = members.find((m) => String(m.id) === memberId);

        if (!member) {
            sendJson(response, 404, { error: "المشترك غير موجود." });
            return true;
        }

        const requests = await readJson(dataFiles.renewalRequestsFile, []);
        const existingRequest = requests.find((r) => String(r.memberId) === memberId || String(r.memberCode) === member.code);

        if (existingRequest) {
            sendJson(response, 200, { ok: true, message: "تم إرسال طلب تجديد سابقاً للكابتن وهو قيد المراجعة.", request: existingRequest });
            return true;
        }

        const newRequest = normalizeRenewalRequest({
            memberId: member.id,
            memberCode: member.code,
            memberName: member.name,
            memberPhone: member.phone,
            plan: member.plan,
            remainingDays: member.remainingDays
        });

        requests.unshift(newRequest);
        await writeJson(dataFiles.renewalRequestsFile, requests);
        await appendAuditLog(dataFiles, "renewal:member-app", `${member.name} - ${member.code}`);
        sendJson(response, 201, { ok: true, request: newRequest });
        return true;
    }

    if (requestPath.startsWith("/api/members/") && request.method === "DELETE") {
        const memberId = decodeURIComponent(requestPath.replace("/api/members/", ""));
        const members = await readJson(dataFiles.membersFile, []);
        const nextMembers = members.filter((member) => String(member.id) !== memberId);

        if (nextMembers.length === members.length) {
            sendJson(response, 404, { error: "Member not found." });
            return true;
        }

        await writeJson(dataFiles.membersFile, nextMembers);
        await appendAuditLog(dataFiles, "member:delete", memberId);
        sendJson(response, 200, { ok: true });
        return true;
    }

    if (requestPath === "/api/qr/attendance" && request.method === "POST") {
        const input = await readBody(request);
        const memberId = String(input.memberId || "").trim();
        const memberCode = String(input.code || "").trim();

        const members = await readJson(dataFiles.membersFile, []);
        let memberIndex = -1;

        if (memberId) {
            memberIndex = members.findIndex((m) => String(m.id) === memberId);
        } else if (memberCode) {
            const normalizedCode = normalizeMemberCode(memberCode);
            memberIndex = members.findIndex((m) => normalizeMemberCode(m.code) === normalizedCode);
        }

        if (memberIndex === -1) {
            sendJson(response, 404, { error: "المشترك غير موجود في قاعدة البيانات." });
            return true;
        }

        const member = members[memberIndex];

        const now = new Date();
        const todayDate = now.toISOString().slice(0, 10);
        const attendanceLog = Array.isArray(member.attendanceLog) ? [...member.attendanceLog] : [];

        const alreadyToday = attendanceLog.some((entry) => {
            const entryDate = typeof entry === "object" ? (entry.date || (entry.at || "").slice(0, 10)) : String(entry).slice(0, 10);
            return entryDate === todayDate;
        });

        if (alreadyToday) {
            sendJson(response, 200, { ok: true, alreadyCheckedIn: true, member, message: `${member.name} سبق تسجيل حضوره اليوم بالفعل.` });
            return true;
        }

        const newEntry = {
            at: now.toISOString(),
            date: todayDate,
            time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
        };
        attendanceLog.push(newEntry);

        const updatedMember = normalizeMember({
            ...member,
            attendanceLog,
            attendanceCount: attendanceLog.length
        });
        members[memberIndex] = updatedMember;
        await writeJson(dataFiles.membersFile, members);

        sendJson(response, 200, { ok: true, alreadyCheckedIn: false, member: updatedMember, message: `تم تسجيل حضور ${updatedMember.name} بنجاح! ✅` });
        return true;
    }

    return false;
}

async function serveStatic(request, response) {
    const urlPath = decodeURIComponent(request.url.split("?")[0]);
    let requestedPath = urlPath;

    if (requestedPath === "/zahran-informa") {
        requestedPath = "/index.html";
    } else if (requestedPath.startsWith("/zahran-informa/")) {
        requestedPath = requestedPath.replace("/zahran-informa", "") || "/index.html";
    } else if (requestedPath === "/" || requestedPath === "") {
        requestedPath = "/index.html";
    } else if (requestedPath === "/member") {
        requestedPath = "/member.html";
    } else if (requestedPath === "/supervisor") {
        requestedPath = "/supervisor.html";
    }

    const filePath = path.normalize(path.join(rootDir, requestedPath));

    if (!filePath.startsWith(rootDir)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
    }

    try {
        const file = await fs.readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        response.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
        response.end(file);
    } catch {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
    }
}

let lastAutomaticWhatsAppReminderDate = "";

async function getAccountDataFilesFromDirectory(accountDir) {
    await fs.mkdir(accountDir, { recursive: true });
    const accountFile = path.join(accountDir, "account.json");
    const meta = await readJson(accountFile, {});
    const ownerEmail = normalizeAccountEmail(meta.ownerEmail || "");
    const files = {
        ownerEmail,
        membersFile: path.join(accountDir, "members.json"),
        settingsFile: path.join(accountDir, "settings.json"),
        financeFile: path.join(accountDir, "finance.json"),
        financeArchiveFile: path.join(accountDir, "finance-archive.json"),
        renewalRequestsFile: path.join(accountDir, "renewal-requests.json"),
        auditLogFile: path.join(accountDir, "audit-log.json"),
        whatsappReminderLogFile: path.join(accountDir, "whatsapp-reminders.json"),
        accountFile
    };
    await ensureJsonFile(files.whatsappReminderLogFile, {});
    return files;
}

async function getAutomaticReminderAccounts() {
    if (whatsappAutoAccountEmail) {
        const accountDir = path.join(accountsDir, getAccountKey(whatsappAutoAccountEmail));
        return [await getAccountDataFilesFromDirectory(accountDir)];
    }

    const accounts = [
        {
            ownerEmail: "",
            membersFile,
            settingsFile,
            financeFile,
            financeArchiveFile,
            renewalRequestsFile,
            auditLogFile,
            whatsappReminderLogFile,
            accountFile: ""
        }
    ];

    let accountEntries = [];
    try {
        accountEntries = await fs.readdir(accountsDir, { withFileTypes: true });
    } catch {
        accountEntries = [];
    }

    for (const entry of accountEntries) {
        if (entry.isDirectory()) {
            accounts.push(await getAccountDataFilesFromDirectory(path.join(accountsDir, entry.name)));
        }
    }

    return accounts;
}

async function runAutomaticWhatsAppReminderSweep() {
    const today = getTodayDateValue();
    if (!whatsappAutoReminders || lastAutomaticWhatsAppReminderDate === today) {
        return;
    }
    if (!getWhatsAppConfigStatus().enabled) {
        return;
    }
    if (new Date().getHours() !== whatsappAutoReminderHour) {
        return;
    }

    lastAutomaticWhatsAppReminderDate = today;
    const accounts = await getAutomaticReminderAccounts();
    for (const dataFiles of accounts) {
        await sendAutomaticWhatsAppRemindersForAccount(dataFiles);
    }
}

async function main() {
    await ensureDataFiles();

    http.createServer(async (request, response) => {
        try {
            if (request.url.startsWith("/api/") && await handleApi(request, response)) {
                return;
            }
            await serveStatic(request, response);
        } catch (error) {
            sendJson(response, 500, { error: "Server error." });
        }
    }).listen(port, () => {
        console.log(`Zahran Informa is running at http://localhost:${port}/`);
    });

    if (whatsappAutoReminders) {
        setInterval(() => {
            runAutomaticWhatsAppReminderSweep().catch((error) => {
                console.error("WhatsApp automatic reminder sweep failed:", error.message);
            });
        }, 10 * 60 * 1000);
        runAutomaticWhatsAppReminderSweep().catch((error) => {
            console.error("WhatsApp automatic reminder sweep failed:", error.message);
        });
    }
}

main();
