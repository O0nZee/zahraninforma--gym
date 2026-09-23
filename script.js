const OWNER_HASH_KEY = "zahran_informa_owner_hash";
const OWNER_SESSION_KEY = "zahran_informa_owner_session";
const MEMBERS_STORAGE_KEY = "zahran_informa_members";
const SETTINGS_STORAGE_KEY = "zahran_informa_settings";
const FINANCE_STORAGE_KEY = "zahran_informa_finance_entries";
const FINANCE_ARCHIVE_KEY = "zahran_informa_finance_archive";
const RENEWAL_REQUESTS_STORAGE_KEY = "zahran_informa_renewal_requests";
const FINANCE_HASH_KEY = "zahran_informa_finance_hash";
const FINANCE_MANAGER_KEY = "zahran_informa_finance_manager";
const FINANCE_USERS_KEY = "zahran_informa_finance_users";
const FINANCE_SESSION_KEY = "zahran_informa_finance_session";
const FINANCE_SESSION_ROLE_KEY = "zahran_informa_finance_session_role";
const FINANCE_SESSION_NAME_KEY = "zahran_informa_finance_session_name";
const SYNC_QUEUE_KEY = "zahran_informa_sync_queue";
const ONLINE_SYNC_URL_KEY = "zahran_informa_online_sync_url";
const SYNC_TOKEN_KEY = "zahran_informa_sync_token";
const AUDIT_LOG_STORAGE_KEY = "zahran_informa_audit_log";
const WHATSAPP_REMINDER_LOG_KEY = "zahran_informa_whatsapp_reminder_log";
const BIOMETRIC_LOGIN_KEY = "zahran_informa_biometric_login";
const BIOMETRIC_CREDENTIAL_ID_KEY = "zahran_informa_biometric_credential_id";
const DAY_MS = 24 * 60 * 60 * 1000;

const ownerLogin = document.getElementById("owner-login");
const ownerForm = document.getElementById("owner-form");
const ownerCodeInput = document.getElementById("owner-code");
const ownerSubmit = document.getElementById("owner-submit");
const ownerMessage = document.getElementById("owner-message");
const ownerBiometricLogin = document.getElementById("owner-biometric-login");
const biometricLoginMessage = document.getElementById("biometric-login-message");
const loginCopy = document.getElementById("login-copy");
const logoutBtn = document.getElementById("logout-btn");

const memberForm = document.getElementById("member-form");
const membersTable = document.getElementById("members-table");
const searchInput = document.getElementById("search-input");
const generatedCode = document.getElementById("generated-code");
const newMemberCode = document.getElementById("new-member-code");
const totalMembers = document.getElementById("total-members");
const statTotal = document.getElementById("stat-total");
const statLastCode = document.getElementById("stat-last-code");
const statLastDate = document.getElementById("stat-last-date");
const settingsForm = document.getElementById("settings-form");
const settingsMessage = document.getElementById("settings-message");
const storageStatus = document.getElementById("storage-status");
const brandName = document.getElementById("brand-name");
const pageTitle = document.getElementById("page-title");
const planSelect = document.getElementById("plan-select");
const themeToggle = document.getElementById("theme-toggle");
const menuToggleBtn = document.getElementById("menu-toggle-btn");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");
const zoomOutBtn = document.getElementById("zoom-out-btn");
const zoomInBtn = document.getElementById("zoom-in-btn");
const zoomResetBtn = document.getElementById("zoom-reset-btn");
const zoomLevel = document.getElementById("zoom-level");
const pageLinks = document.querySelectorAll("[data-page-link]");
const pageSections = document.querySelectorAll("[data-page]");
const membersPageCount = document.getElementById("members-page-count");
const refreshMembers = document.getElementById("refresh-members");
const settingsPreviewName = document.getElementById("settings-preview-name");
const settingsPreviewPrefix = document.getElementById("settings-preview-prefix");
const settingsPreviewStorage = document.getElementById("settings-preview-storage");
const syncTokenInput = settingsForm?.elements.namedItem("syncToken");
const syncTokenStatus = document.getElementById("sync-token-status");
const generateSyncToken = document.getElementById("generate-sync-token");
const passwordForm = document.getElementById("password-form");
const passwordMessage = document.getElementById("password-message");
const jumpPasswordSettings = document.getElementById("jump-password-settings");
const passwordSettingsSection = document.getElementById("password-settings-section");
const enableBiometricLogin = document.getElementById("enable-biometric-login");
const disableBiometricLogin = document.getElementById("disable-biometric-login");
const biometricSettingsMessage = document.getElementById("biometric-settings-message");
const priceInput = document.getElementById("price-input");
const remainingDaysInput = document.getElementById("remaining-days-input");
const weightInput = document.getElementById("weight-input");
const heightInput = document.getElementById("height-input");
const memberCamera = document.getElementById("member-camera");
const memberPhotoCanvas = document.getElementById("member-photo-canvas");
const memberPhotoData = document.getElementById("member-photo-data");
const memberPhotoPreview = document.getElementById("member-photo-preview");
const photoPreview = document.getElementById("photo-preview");
const startCameraBtn = document.getElementById("start-camera-btn");
const switchCameraBtn = document.getElementById("switch-camera-btn");
const capturePhotoBtn = document.getElementById("capture-photo-btn");
const stopCameraBtn = document.getElementById("stop-camera-btn");
const cameraMessage = document.getElementById("camera-message");
const photoUploadInput = document.getElementById("photo-upload-input");
const nativePhotoCameraInput = document.getElementById("native-photo-camera-input");
const financeLockForm = document.getElementById("finance-lock-form");
const financePassword = document.getElementById("finance-password");
const financeManagerSetup = document.getElementById("finance-manager-setup");
const financeManagerName = document.getElementById("finance-manager-name");
const financeManagerPassword = document.getElementById("finance-manager-password");
const financeManagerConfirmPassword = document.getElementById("finance-manager-confirm-password");
const financeUnlockBtn = document.getElementById("finance-unlock-btn");
const financeLockMessage = document.getElementById("finance-lock-message");
const financePrivateArea = document.getElementById("finance-private-area");
const financeVaultStatus = document.getElementById("finance-vault-status");
const financeLockBtn = document.getElementById("finance-lock-btn");
const resetFinanceBtn = document.getElementById("reset-finance-btn");
const financeResetMessage = document.getElementById("finance-reset-message");
const financeManagerPanel = document.getElementById("finance-manager-panel");
const financeUserNote = document.getElementById("finance-user-note");
const financeChangePasswordForm = document.getElementById("finance-change-password-form");
const financePasswordMessage = document.getElementById("finance-password-message");
const financeUserForm = document.getElementById("finance-user-form");
const financeUserMessage = document.getElementById("finance-user-message");
const financeUsersCount = document.getElementById("finance-users-count");
const financeUsersTable = document.getElementById("finance-users-table");
const financeForm = document.getElementById("finance-form");
const financeDate = document.getElementById("finance-date");
const financeMessage = document.getElementById("finance-message");
const financeTable = document.getElementById("finance-table");
const financeIncomeTotal = document.getElementById("finance-income-total");
const financeExpenseTotal = document.getElementById("finance-expense-total");
const financeNetTotal = document.getElementById("finance-net-total");
const progressForm = document.getElementById("progress-form");
const progressMemberSelect = document.getElementById("progress-member-select");
const progressMonth = document.getElementById("progress-month");
const progressWeight = document.getElementById("progress-weight");
const progressHeight = document.getElementById("progress-height");
const progressMessage = document.getElementById("progress-message");
const progressSummaryGrid = document.getElementById("progress-summary-grid");
const membersLockModal = document.getElementById("members-lock-modal");
const membersLockForm = document.getElementById("members-lock-form");
const membersLockPassword = document.getElementById("members-lock-password");
const membersLockMessage = document.getElementById("members-lock-message");
const membersLockCancel = document.getElementById("members-lock-cancel");
const quickAttendanceForm = document.getElementById("quick-attendance-form");
const quickAttendanceQuery = document.getElementById("quick-attendance-query");
const quickAttendanceMessage = document.getElementById("quick-attendance-message");
const quickAttendanceResult = document.getElementById("quick-attendance-result");
const quickAttendanceCamera = document.getElementById("quick-attendance-camera");
const quickAttendanceCanvas = document.getElementById("quick-attendance-canvas");
const quickAttendancePhotoData = document.getElementById("quick-attendance-photo-data");
const quickAttendancePhotoImg = document.getElementById("quick-attendance-photo-img");
const quickAttendancePhotoPreview = document.getElementById("quick-attendance-photo-preview");
const startAttendanceCameraBtn = document.getElementById("start-attendance-camera-btn");
const switchAttendanceCameraBtn = document.getElementById("switch-attendance-camera-btn");
const captureAttendancePhotoBtn = document.getElementById("capture-attendance-photo-btn");
const stopAttendanceCameraBtn = document.getElementById("stop-attendance-camera-btn");
const clearAttendancePhotoBtn = document.getElementById("clear-attendance-photo-btn");
const attendancePhotoUploadInput = document.getElementById("attendance-photo-upload-input");
const nativeAttendanceCameraInput = document.getElementById("native-attendance-camera-input");
const quickAttendanceCameraMessage = document.getElementById("quick-attendance-camera-message");
const sessionsList = document.getElementById("sessions-list");
const sessionsPageCount = document.getElementById("sessions-page-count");
const refreshSessions = document.getElementById("refresh-sessions");
const installStrip = document.getElementById("install-strip");
const installAppBtn = document.getElementById("install-app-btn");
const memberPortalForm = document.getElementById("member-portal-form");
const memberPortalQuery = document.getElementById("member-portal-query");
const memberPortalMessage = document.getElementById("member-portal-message");
const memberPortalResult = document.getElementById("member-portal-result");
const renewalRequestsTable = document.getElementById("renewal-requests-table");
const renewalRequestsCount = document.getElementById("renewal-requests-count");
const refreshRenewalRequests = document.getElementById("refresh-renewal-requests");
const backupExportBtn = document.getElementById("backup-export-btn");
const backupImportInput = document.getElementById("backup-import-input");
const backupMessage = document.getElementById("backup-message");
const syncPendingBtn = document.getElementById("sync-pending-btn");
const syncUploadBtn = document.getElementById("sync-upload-btn");
const syncDownloadBtn = document.getElementById("sync-download-btn");
const testSyncConnectionBtn = document.getElementById("test-sync-connection-btn");
const refreshAuditLogBtn = document.getElementById("refresh-audit-log-btn");
const syncMessage = document.getElementById("sync-message");
const auditLogList = document.getElementById("audit-log-list");
const whatsappForm = document.getElementById("whatsapp-form");
const whatsappAudience = document.getElementById("whatsapp-audience");
const whatsappMessageInput = document.getElementById("whatsapp-message-input");
const whatsappExpiryTemplate = document.getElementById("whatsapp-expiry-template");
const sendWhatsAppBroadcast = document.getElementById("send-whatsapp-broadcast");
const whatsappMessageStatus = document.getElementById("whatsapp-message-status");
const whatsappCloudStatus = document.getElementById("whatsapp-cloud-status");
const whatsappSummary = document.getElementById("whatsapp-summary");
const whatsappLinks = document.getElementById("whatsapp-links");
const whatsappAutoCount = document.getElementById("whatsapp-auto-count");
const whatsappAutoStatus = document.getElementById("whatsapp-auto-status");
const whatsappAutoReminders = document.getElementById("whatsapp-auto-reminders");
const refreshWhatsAppReminders = document.getElementById("refresh-whatsapp-reminders");
const openNextWhatsAppReminder = document.getElementById("open-next-whatsapp-reminder");
const openAllWhatsAppReminders = document.getElementById("open-all-whatsapp-reminders");
const sendWhatsAppReminders = document.getElementById("send-whatsapp-reminders");
const editMemberModal = document.getElementById("edit-member-modal");
const editMemberForm = document.getElementById("edit-member-form");
const editMemberCancel = document.getElementById("edit-member-cancel");
const editMemberMessage = document.getElementById("edit-member-message");
const editMemberId = document.getElementById("edit-member-id");
const editMemberPlan = document.getElementById("edit-member-plan");
const editMemberPrice = document.getElementById("edit-member-price");
const editMemberRemainingDays = document.getElementById("edit-member-remaining-days");
const editMemberPhotoUpload = document.getElementById("edit-member-photo-upload");
const editMemberPhotoData = document.getElementById("edit-member-photo-data");
const editMemberPhotoImg = document.getElementById("edit-member-photo-img");
const editMemberPhotoPlaceholder = document.getElementById("edit-member-photo-placeholder");
const editMemberPhotoClear = document.getElementById("edit-member-photo-clear");
const renewMemberModal = document.getElementById("renew-member-modal");
const renewMemberForm = document.getElementById("renew-member-form");
const renewMemberCancel = document.getElementById("renew-member-cancel");
const renewMemberMessage = document.getElementById("renew-member-message");
const renewMemberName = document.getElementById("renew-member-name");
const renewMemberId = document.getElementById("renew-member-id");
const renewRequestId = document.getElementById("renew-request-id");
const renewPlanSelect = document.getElementById("renew-plan-select");
const renewDaysInput = document.getElementById("renew-days-input");
const renewPriceInput = document.getElementById("renew-price-input");

let apiAvailable = location.protocol !== "file:" || Boolean(localStorage.getItem(ONLINE_SYNC_URL_KEY));
let membersCache = [];
let settingsCache = defaultSettings();
let financeEntriesCache = [];
let renewalRequestsCache = [];
let cameraStream = null;
let attendanceCameraStream = null;
let memberCameraFacingMode = "user";
let attendanceCameraFacingMode = "user";
let latestMemberFaceSignature = "";
let latestAttendanceFaceSignature = "";
let isSyncingQueue = false;
let deferredInstallPrompt = null;
let whatsappReminderTimer = null;

const PLAN_DEFAULTS = {
    "نص شهر": { days: 15, price: 0 },
    "شهر": { days: 30, price: 0 },
    "10 أيام": { days: 10, price: 0 }
};

const PAGE_ROUTES = {
    register: { page: "subscriptions", title: "إضافة مشترك جديد", navKey: "subscriptions" },
    dashboard: { page: "dashboard", title: "لوحة التحكم" },
    attendance: { page: "attendance", title: "الحضور" },
    sessions: { page: "sessions", title: "الحصص" },
    subscriptions: { page: "subscriptions", title: "إضافة مشترك جديد" },
    members: { page: "members", title: "الأعضاء" },
    payments: { page: "settings", title: "الخزنة", toolPage: "payments" },
    reports: { page: "settings", title: "التقارير", toolPage: "reports" },
    settings: { page: "settings", title: "الإعدادات", toolPage: "settings" }
};

const SETTINGS_PAGE_GROUPS = {
    settings: [
        "#settings > .panel-heading",
        "#settings > .settings-control-grid",
        "#settings > #settings-form",
        "#password-settings-section",
        ".backup-tool",
        ".sync-tool",
        ".whatsapp-tool",
        ".renewal-tool"
    ],
    payments: [".finance-tool"],
    reports: [".progress-tool"]
};

const LEGACY_PLAN_VALUES = {
    "Ø´Ù‡Ø±ÙŠ": "شهر",
    "3 Ø´Ù‡ÙˆØ±": "شهر",
    "Ø­ØµØµ": "10 أيام",
    "شهري": "شهر",
    "3 شهور": "شهر",
    "حصص": "10 أيام",
    "PT": "10 أيام",
    "10 ايام": "10 أيام",
    "نصف شهر": "نص شهر"
};

function normalizePlanValue(plan) {
    const value = String(plan || "").trim();
    return LEGACY_PLAN_VALUES[value] || (PLAN_DEFAULTS[value] ? value : "شهر");
}

function normalizeSettings(settings = {}) {
    const normalized = {
        ...defaultSettings(),
        ...settings
    };

    normalized.gymName = String(normalized.gymName || "Zahran Informa").trim();
    normalized.gymPhone = String(normalized.gymPhone || "").trim();
    normalized.ownerEmail = normalizeAccountEmail(normalized.ownerEmail);
    normalized.memberCodePrefix = String(normalized.memberCodePrefix || "ZI").trim().toUpperCase().slice(0, 6);
    normalized.defaultPlan = normalizePlanValue(normalized.defaultPlan);
    normalized.autoBackup = normalized.autoBackup === "enabled" ? "enabled" : "disabled";
    normalized.expiryReminderDays = String(normalized.expiryReminderDays || "7").trim();
    normalized.registrationStatus = normalized.registrationStatus === "closed" ? "closed" : "open";
    normalized.inactiveMemberDays = String(normalized.inactiveMemberDays || "30").trim();
    normalized.storageMode = String(normalized.storageMode || "mobile-sync").trim();
    normalized.onlineSyncUrl = cleanOnlineSyncUrl(normalized.onlineSyncUrl || localStorage.getItem(ONLINE_SYNC_URL_KEY) || "");
    normalized.syncTokenConfigured = Boolean(normalized.syncTokenConfigured);

    return normalized;
}

function applyTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light-mode", isLight);
    if (themeToggle) {
        themeToggle.setAttribute("aria-label", isLight ? "تفعيل الوضع الليلي" : "تفعيل الوضع النهاري");
        themeToggle.setAttribute("title", isLight ? "الوضع الليلي" : "الوضع النهاري");
        themeToggle.setAttribute("aria-pressed", String(!isLight));
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem("zahran_informa_theme") || "dark";
    applyTheme(savedTheme);
}

function clampZoom(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return 1;
    }

    return Math.min(1.45, Math.max(0.8, Math.round(number * 20) / 20));
}

function applyAppZoom(value) {
    const zoom = clampZoom(value);
    document.documentElement.style.setProperty("--app-zoom", String(zoom));

    if (zoomLevel) {
        zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
    }
    if (zoomOutBtn) {
        zoomOutBtn.disabled = zoom <= 0.8;
    }
    if (zoomInBtn) {
        zoomInBtn.disabled = zoom >= 1.45;
    }

    return zoom;
}

function setAppZoom(value) {
    const zoom = applyAppZoom(value);
    localStorage.setItem("zahran_informa_zoom", String(zoom));
}

function initAppZoom() {
    const savedZoom = localStorage.getItem("zahran_informa_zoom") || "1";
    applyAppZoom(savedZoom);
}

function defaultSettings() {
    return {
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
        onlineSyncUrl: localStorage.getItem(ONLINE_SYNC_URL_KEY) || "",
        syncTokenConfigured: false,
        updatedAt: null
    };
}

function normalizeAccountEmail(value) {
    return String(value || "").trim().toLowerCase();
}

function getStoredSettingsValue(key) {
    try {
        const storedSettings = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}");
        return storedSettings?.[key] || "";
    } catch {
        return "";
    }
}

function getSyncAccountEmail() {
    return normalizeAccountEmail(settingsCache.ownerEmail || getStoredSettingsValue("ownerEmail"));
}

function getSyncAccountToken() {
    return String(localStorage.getItem(SYNC_TOKEN_KEY) || "").trim();
}

function getSyncAccountHeaders() {
    const email = getSyncAccountEmail();
    const token = getSyncAccountToken();
    return {
        ...(email ? { "X-Zahran-Account": email } : {}),
        ...(token ? { "X-Zahran-Token": token } : {})
    };
}

function createSyncToken() {
    const bytes = new Uint8Array(24);
    if (crypto?.getRandomValues) {
        crypto.getRandomValues(bytes);
    } else {
        for (let index = 0; index < bytes.length; index += 1) {
            bytes[index] = Math.floor(Math.random() * 256);
        }
    }

    return Array.from(bytes)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

function cleanOnlineSyncUrl(value) {
    const url = String(value || "").trim().replace(/\/+$/, "");
    if (!url) return "";

    try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol) ? parsed.origin : "";
    } catch {
        return "";
    }
}

function getOnlineSyncUrl() {
    return cleanOnlineSyncUrl(settingsCache.onlineSyncUrl || localStorage.getItem(ONLINE_SYNC_URL_KEY) || "");
}

function getApiBaseUrl() {
    if (location.protocol === "file:") {
        return getOnlineSyncUrl();
    }

    return "";
}

function hasApiEndpoint() {
    if (location.protocol !== "file:") {
        return true;
    }

    return Boolean(getOnlineSyncUrl() && getSyncAccountEmail() && getSyncAccountToken());
}

function getSyncQueue() {
    try {
        return JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || "[]");
    } catch {
        return [];
    }
}

function saveSyncQueue(queue) {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
    updateConnectionStatus();
}

function queueSyncOperation(operation) {
    const queue = getSyncQueue();
    queue.push({
        id: createId(),
        createdAt: new Date().toISOString(),
        ...operation
    });
    saveSyncQueue(queue);
}

function setStorageMessage(message) {
    if (storageStatus) {
        storageStatus.textContent = message;
    }
    if (settingsPreviewStorage) {
        settingsPreviewStorage.textContent = message;
    }
}

function updateConnectionStatus() {
    const pendingCount = getSyncQueue().length;
    apiAvailable = hasApiEndpoint() && navigator.onLine !== false;

    if (pendingCount > 0) {
        setStorageMessage(`أوفلاين - ${pendingCount.toLocaleString("ar-EG")} في انتظار المزامنة`);
        return;
    }

    if (navigator.onLine === false) {
        setStorageMessage("أوفلاين - تخزين على الجهاز");
        return;
    }

    if (!hasApiEndpoint()) {
        if (!getOnlineSyncUrl()) {
            setStorageMessage("أوفلاين - أضف رابط سيرفر الأونلاين");
        } else if (!getSyncAccountEmail()) {
            setStorageMessage("أوفلاين - أضف إيميل المزامنة");
        } else {
            setStorageMessage("أوفلاين - أضف مفتاح المزامنة");
        }
        return;
    }

    setStorageMessage(location.protocol === "file:" ? "أونلاين - متصل بسيرفر المزامنة" : "أونلاين - مزامنة فورية");
}

async function syncOfflineQueue() {
    if (isSyncingQueue || navigator.onLine === false || !hasApiEndpoint()) {
        updateConnectionStatus();
        return;
    }

    const queue = getSyncQueue();
    if (!queue.length) {
        apiAvailable = true;
        updateConnectionStatus();
        return;
    }

    isSyncingQueue = true;
    setStorageMessage("جاري مزامنة بيانات الأوفلاين...");

    let syncedCount = 0;
    try {
        apiAvailable = true;
        for (const operation of queue) {
            await apiRequest(operation.path, {
                method: operation.method,
                body: JSON.stringify(operation.payload)
            });
            syncedCount += 1;
            saveSyncQueue(queue.slice(syncedCount));
        }

        if (syncedCount > 0) {
            await loadSettings();
            await loadMembers();
            await loadFinanceEntries();
            await loadRenewalRequests();
            renderMembers();
            renderFinance();
            renderRenewalRequests();
            renderProgressSummary();
            applySettingsToUi();
        }
    } catch {
        apiAvailable = false;
    } finally {
        isSyncingQueue = false;
        updateConnectionStatus();
    }
}

async function registerMobileRuntime() {
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
        try {
            await navigator.serviceWorker.register("service-worker.js");
        } catch {
            // The app still works without the worker, but offline shell caching will be unavailable.
        }
    }

    window.addEventListener("online", () => {
        apiAvailable = true;
        updateConnectionStatus();
        syncOfflineQueue();
    });

    window.addEventListener("offline", () => {
        apiAvailable = false;
        updateConnectionStatus();
    });

    updateConnectionStatus();
    if (navigator.onLine !== false) {
        setTimeout(syncOfflineQueue, 800);
    }
}

async function apiRequest(path, options = {}) {
    const apiBaseUrl = getApiBaseUrl();
    if (!hasApiEndpoint()) {
        throw new Error("API is not configured.");
    }

    const controller = new AbortController();
    const timeoutMs = Number(options.timeoutMs || 8000);
    const requestOptions = { ...options };
    delete requestOptions.timeoutMs;
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(`${apiBaseUrl}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...getSyncAccountHeaders(),
            ...(requestOptions.headers || {})
        },
        cache: "no-store",
        signal: controller.signal,
        ...requestOptions
    }).finally(() => window.clearTimeout(timeout));

    if (!response.ok) {
        const error = new Error(`API request failed: ${response.status}`);
        error.status = response.status;
        throw error;
    }

    return response.json();
}

function toPositiveInteger(value, fallback = 0) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return fallback;
    }

    return Math.max(0, Math.floor(number));
}

function toMoneyValue(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return 0;
    }

    return Math.max(0, Math.round(number));
}

function toMeasurementValue(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return 0;
    }

    return Math.max(0, Math.round(number * 10) / 10);
}

function getPlanDefaults(plan) {
    return PLAN_DEFAULTS[normalizePlanValue(plan)] || PLAN_DEFAULTS["شهر"];
}

function getTodayDateValue() {
    return new Date().toISOString().slice(0, 10);
}

function toDateValue(value, fallback = getTodayDateValue()) {
    const date = value instanceof Date ? value : new Date(value || fallback);
    if (Number.isNaN(date.getTime())) {
        return fallback;
    }

    return date.toISOString().slice(0, 10);
}

function dateValueToUtc(value) {
    return new Date(`${toDateValue(value)}T00:00:00.000Z`);
}

function addDaysToDateValue(value, days) {
    const date = dateValueToUtc(value);
    date.setUTCDate(date.getUTCDate() + toPositiveInteger(days, 0));
    return date.toISOString().slice(0, 10);
}

function daysBetweenDateValues(startValue, endValue) {
    const start = dateValueToUtc(startValue);
    const end = dateValueToUtc(endValue);
    return Math.max(0, Math.ceil((end.getTime() - start.getTime()) / DAY_MS));
}

function daysUntilDateValue(endValue) {
    return daysBetweenDateValues(getTodayDateValue(), endValue);
}

function getSubscriptionStartDate(member) {
    return toDateValue(member.subscriptionStartedAt || member.subscriptionStartAt || member.createdAt || getTodayDateValue());
}

function getSubscriptionEndDate(member, plan, totalDays) {
    if (member.subscriptionEndsAt || member.subscriptionEndAt) {
        return toDateValue(member.subscriptionEndsAt || member.subscriptionEndAt);
    }

    return addDaysToDateValue(getSubscriptionStartDate(member), totalDays || getPlanDefaults(plan).days);
}

function getRenewalBaseDate(member) {
    const currentEnd = getSubscriptionEndDate(member, member.plan, member.totalDays);
    return daysUntilDateValue(currentEnd) > 0 ? currentEnd : getTodayDateValue();
}

function getMonthKey(date = new Date()) {
    const value = date instanceof Date ? date : new Date(date);
    return value.toISOString().slice(0, 7);
}

function getPreviousMonthKey(monthKey) {
    const [year, month] = String(monthKey || getMonthKey()).split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 2, 1));
    return date.toISOString().slice(0, 7);
}

function formatMonthLabel(monthKey) {
    const [year, month] = String(monthKey || getMonthKey()).split("-").map(Number);
    return new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "long"
    }).format(new Date(Date.UTC(year, month - 1, 1)));
}

function normalizeAttendanceLog(member) {
    if (Array.isArray(member.attendanceLog)) {
        return member.attendanceLog
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

    if (member.lastAttendanceAt) {
        return [{
            at: String(member.lastAttendanceAt),
            photo: "",
            faceSignature: ""
        }];
    }

    return [];
}

function normalizeMeasurementLog(member, plan) {
    const log = Array.isArray(member.measurementLog) ? member.measurementLog : [];
    const normalizedLog = log
        .filter((entry) => entry && entry.month)
        .map((entry) => ({
            month: String(entry.month),
            weight: toMeasurementValue(entry.weight),
            height: toMeasurementValue(entry.height),
            note: String(entry.note || "").trim(),
            createdAt: entry.createdAt || member.createdAt || new Date().toISOString()
        }));

    if (!normalizedLog.length && (member.weight || member.height)) {
        normalizedLog.push({
            month: getMonthKey(member.createdAt || new Date()),
            weight: toMeasurementValue(member.weight),
            height: toMeasurementValue(member.height),
            note: `بداية اشتراك ${plan}`,
            createdAt: member.createdAt || new Date().toISOString()
        });
    }

    return normalizedLog.sort((a, b) => a.month.localeCompare(b.month));
}

function normalizeMember(member) {
    const plan = normalizePlanValue(member.plan);
    const defaults = getPlanDefaults(plan);
    const storedTotalDays = toPositiveInteger(member.totalDays ?? member.remainingDays, defaults.days);
    const subscriptionStartedAt = getSubscriptionStartDate(member);
    const subscriptionEndsAt = getSubscriptionEndDate(member, plan, storedTotalDays || defaults.days);
    const totalDays = Math.max(
        storedTotalDays,
        daysBetweenDateValues(subscriptionStartedAt, subscriptionEndsAt),
        defaults.days
    );
    const remainingDays = daysUntilDateValue(subscriptionEndsAt);
    const attendanceLog = normalizeAttendanceLog(member);

    return {
        ...member,
        plan,
        weight: toMeasurementValue(member.weight),
        height: toMeasurementValue(member.height),
        price: toMoneyValue(member.price),
        faceSignature: String(member.faceSignature || "").trim(),
        subscriptionStartedAt,
        subscriptionEndsAt,
        totalDays,
        remainingDays,
        attendanceCount: toPositiveInteger(member.attendanceCount, 0),
        lastAttendanceAt: member.lastAttendanceAt || attendanceLog.at(-1)?.at || null,
        attendanceLog,
        measurementLog: normalizeMeasurementLog(member, plan)
    };
}

async function loadMembers() {
    let rawMembers = [];
    if (apiAvailable) {
        try {
            rawMembers = await apiRequest("/api/members");
            updateConnectionStatus();
        } catch {
            apiAvailable = false;
        }
    }

    if (!apiAvailable) {
        try {
            rawMembers = JSON.parse(localStorage.getItem(MEMBERS_STORAGE_KEY) || "[]");
        } catch {
            rawMembers = [];
        }
    }

    membersCache = rawMembers.map(normalizeMember);
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
    updateConnectionStatus();
    return membersCache;
}

async function saveMember(member) {
    const normalizedMember = normalizeMember(member);

    if (apiAvailable) {
        try {
            const savedMember = await apiRequest("/api/members", {
                method: "POST",
                body: JSON.stringify(normalizedMember)
            });
            const normalizedSavedMember = normalizeMember(savedMember);
            membersCache.unshift(normalizedSavedMember);
            localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
            updateConnectionStatus();
            addLocalAudit("إضافة مشترك", `${normalizedSavedMember.name} - ${normalizedSavedMember.code}`);
            return normalizedSavedMember;
        } catch (error) {
            if (error?.status === 409) {
                throw error;
            }
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    membersCache.unshift(normalizedMember);
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
    queueSyncOperation({
        type: "member:create",
        method: "POST",
        path: "/api/members",
        payload: normalizedMember
    });
    addLocalAudit("إضافة مشترك", `${normalizedMember.name} - ${normalizedMember.code}`);
    return normalizedMember;
}

async function updateMember(updatedMember) {
    const normalizedMember = normalizeMember(updatedMember);

    if (apiAvailable) {
        try {
            const savedMember = await apiRequest(`/api/members/${encodeURIComponent(normalizedMember.id)}`, {
                method: "PUT",
                body: JSON.stringify(normalizedMember)
            });
            const normalizedSavedMember = normalizeMember(savedMember);
            membersCache = membersCache.map((member) => (
                member.id === normalizedSavedMember.id ? normalizedSavedMember : member
            ));
            localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
            updateConnectionStatus();
            addLocalAudit("تعديل مشترك", `${normalizedSavedMember.name} - ${normalizedSavedMember.code}`);
            return normalizedSavedMember;
        } catch (error) {
            if (error?.status === 409) {
                throw error;
            }
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    membersCache = membersCache.map((member) => (
        member.id === normalizedMember.id ? normalizedMember : member
    ));
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
    queueSyncOperation({
        type: "member:update",
        method: "PUT",
        path: `/api/members/${encodeURIComponent(normalizedMember.id)}`,
        payload: normalizedMember
    });
    addLocalAudit("تعديل مشترك", `${normalizedMember.name} - ${normalizedMember.code}`);
    return normalizedMember;
}

async function deleteMember(memberId) {
    const normalizedMemberId = String(memberId || "");
    if (!normalizedMemberId) return false;

    if (apiAvailable && navigator.onLine !== false) {
        try {
            await apiRequest(`/api/members/${encodeURIComponent(normalizedMemberId)}`, {
                method: "DELETE"
            });
            membersCache = membersCache.filter((member) => member.id !== normalizedMemberId);
            localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
            updateConnectionStatus();
            addLocalAudit("حذف مشترك", normalizedMemberId);
            return true;
        } catch {
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    membersCache = membersCache.filter((member) => member.id !== normalizedMemberId);
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
    queueSyncOperation({
        type: "member:delete",
        method: "DELETE",
        path: `/api/members/${encodeURIComponent(normalizedMemberId)}`
    });
    addLocalAudit("حذف مشترك", normalizedMemberId);
    return true;
}

function normalizeFinanceEntry(entry) {
    return {
        id: String(entry.id || createId()),
        type: entry.type === "expense" ? "expense" : "income",
        amount: toMoneyValue(entry.amount),
        note: String(entry.note || "").trim(),
        date: entry.date || getTodayDateValue(),
        createdAt: entry.createdAt || new Date().toISOString()
    };
}

function getFinanceTotals(entries = financeEntriesCache) {
    const list = Array.isArray(entries) ? entries : [];
    const income = list
        .filter((entry) => entry.type === "income")
        .reduce((sum, entry) => sum + (toMoneyValue(entry.amount) || 0), 0);
    const expense = list
        .filter((entry) => entry.type === "expense")
        .reduce((sum, entry) => sum + (toMoneyValue(entry.amount) || 0), 0);
    return {
        income,
        expense,
        net: income - expense,
        count: list.length
    };
}

async function loadFinanceEntries() {
    if (apiAvailable) {
        try {
            financeEntriesCache = (await apiRequest("/api/finance")).map(normalizeFinanceEntry);
            localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(financeEntriesCache));
            return financeEntriesCache;
        } catch {
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    try {
        financeEntriesCache = JSON.parse(localStorage.getItem(FINANCE_STORAGE_KEY) || "[]").map(normalizeFinanceEntry);
    } catch {
        financeEntriesCache = [];
    }

    return financeEntriesCache;
}

async function saveFinanceEntry(entry) {
    const normalizedEntry = normalizeFinanceEntry(entry);

    if (apiAvailable) {
        try {
            const savedEntry = normalizeFinanceEntry(await apiRequest("/api/finance", {
                method: "POST",
                body: JSON.stringify(normalizedEntry)
            }));
            financeEntriesCache.unshift(savedEntry);
            localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(financeEntriesCache));
            updateConnectionStatus();
            addLocalAudit("حركة مالية", `${savedEntry.type === "income" ? "وارد" : "مصروف"} - ${formatMoney(savedEntry.amount)}`);
            return savedEntry;
        } catch {
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    financeEntriesCache.unshift(normalizedEntry);
    localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(financeEntriesCache));
    queueSyncOperation({
        type: "finance:create",
        method: "POST",
        path: "/api/finance",
        payload: normalizedEntry
    });
    addLocalAudit("حركة مالية", `${normalizedEntry.type === "income" ? "وارد" : "مصروف"} - ${formatMoney(normalizedEntry.amount)}`);
    return normalizedEntry;
}

function readFinanceArchive() {
    try {
        const archive = JSON.parse(localStorage.getItem(FINANCE_ARCHIVE_KEY) || "[]");
        return Array.isArray(archive) ? archive : [];
    } catch {
        return [];
    }
}

function archiveFinanceEntries(entries, resetBy = "") {
    const list = Array.isArray(entries) ? entries : [];
    if (!list.length) return;

    const archive = readFinanceArchive();
    archive.unshift({
        id: createId(),
        resetAt: new Date().toISOString(),
        resetBy: String(resetBy || "").trim(),
        totals: getFinanceTotals(list),
        entries: list.map(normalizeFinanceEntry)
    });

    try {
        // Keep the last 12 reset batches only, so the archive never fills up local storage.
        localStorage.setItem(FINANCE_ARCHIVE_KEY, JSON.stringify(archive.slice(0, 12)));
    } catch {
        // Archiving is a convenience: if storage is full the reset itself still goes through.
    }
}

// Older desktop/mobile builds ship a host without DELETE /api/finance. For those we rewrite the
// ledger through PUT /api/backup, which every build supports, keeping members and settings intact.
async function clearRemoteFinanceViaBackup() {
    const snapshot = normalizeBackupSnapshot(await apiRequest("/api/backup"));
    await apiRequest("/api/backup", {
        method: "PUT",
        body: JSON.stringify({
            settings: snapshot.settings,
            members: snapshot.members,
            financeEntries: [],
            renewalRequests: snapshot.renewalRequests
        }),
        timeoutMs: 20000
    });
}

async function resetFinanceToZero(resetBy = "") {
    archiveFinanceEntries(financeEntriesCache, resetBy);
    const auditDetails = `رجعت الخزنة للصفر${resetBy ? ` - ${resetBy}` : ""}`;

    const finishLocally = () => {
        financeEntriesCache = [];
        localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(financeEntriesCache));
    };

    if (apiAvailable) {
        try {
            await apiRequest("/api/finance", { method: "DELETE" });
            finishLocally();
            updateConnectionStatus();
            addLocalAudit("تصفير الخزنة", auditDetails);
            return true;
        } catch (error) {
            // A status code means the host answered, so it is reachable but missing the route.
            if (error && typeof error.status === "number") {
                try {
                    await clearRemoteFinanceViaBackup();
                    finishLocally();
                    updateConnectionStatus();
                    addLocalAudit("تصفير الخزنة", `${auditDetails} (نسخة قديمة من السيرفر)`);
                    return true;
                } catch {
                    apiAvailable = false;
                }
            } else {
                apiAvailable = false;
            }
            updateConnectionStatus();
        }
    }

    finishLocally();
    queueSyncOperation({
        type: "finance:reset",
        method: "DELETE",
        path: "/api/finance"
    });
    addLocalAudit("تصفير الخزنة", auditDetails);
    return true;
}

async function recordNewMemberIncome(member) {
    const amount = toMoneyValue(member?.price);
    if (!amount) {
        return null;
    }

    await loadFinanceEntries();
    // Deterministic id tied to the member keeps this idempotent: the server
    // auto-creates the same "sub_<id>" entry on member creation, so posting the
    // same id here updates that entry instead of recording the money twice.
    const entry = await saveFinanceEntry({
        id: `sub_${member.id}`,
        type: "income",
        amount,
        date: getTodayDateValue(),
        note: `اشتراك جديد - ${member.name} - ${member.code}`,
        createdAt: new Date().toISOString()
    });

    renderFinance();
    return entry;
}

function normalizeRenewalRequest(request) {
    return {
        id: String(request.id || createId()),
        memberId: String(request.memberId || ""),
        memberCode: String(request.memberCode || "").trim(),
        memberName: String(request.memberName || "").trim(),
        memberPhone: String(request.memberPhone || "").trim(),
        plan: normalizePlanValue(request.plan),
        remainingDays: toPositiveInteger(request.remainingDays, 0),
        createdAt: request.createdAt || new Date().toISOString()
    };
}

async function loadRenewalRequests() {
    if (apiAvailable) {
        try {
            renewalRequestsCache = (await apiRequest("/api/renewal-requests")).map(normalizeRenewalRequest);
            localStorage.setItem(RENEWAL_REQUESTS_STORAGE_KEY, JSON.stringify(renewalRequestsCache));
            updateConnectionStatus();
            return renewalRequestsCache;
        } catch {
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    try {
        renewalRequestsCache = JSON.parse(localStorage.getItem(RENEWAL_REQUESTS_STORAGE_KEY) || "[]").map(normalizeRenewalRequest);
    } catch {
        renewalRequestsCache = [];
    }

    return renewalRequestsCache;
}

async function saveRenewalRequest(request) {
    const normalizedRequest = normalizeRenewalRequest(request);

    if (apiAvailable) {
        try {
            const savedRequest = normalizeRenewalRequest(await apiRequest("/api/renewal-requests", {
                method: "POST",
                body: JSON.stringify(normalizedRequest)
            }));
            renewalRequestsCache.unshift(savedRequest);
            localStorage.setItem(RENEWAL_REQUESTS_STORAGE_KEY, JSON.stringify(renewalRequestsCache));
            updateConnectionStatus();
            addLocalAudit("طلب تجديد", `${savedRequest.memberName} - ${savedRequest.memberCode}`);
            return savedRequest;
        } catch {
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    renewalRequestsCache.unshift(normalizedRequest);
    localStorage.setItem(RENEWAL_REQUESTS_STORAGE_KEY, JSON.stringify(renewalRequestsCache));
    queueSyncOperation({
        type: "renewal:create",
        method: "POST",
        path: "/api/renewal-requests",
        payload: normalizedRequest
    });
    addLocalAudit("طلب تجديد", `${normalizedRequest.memberName} - ${normalizedRequest.memberCode}`);
    return normalizedRequest;
}

async function deleteRenewalRequest(requestId) {
    const normalizedRequestId = String(requestId || "");
    if (!normalizedRequestId) return false;

    if (apiAvailable && navigator.onLine !== false) {
        try {
            await apiRequest(`/api/renewal-requests/${encodeURIComponent(normalizedRequestId)}`, {
                method: "DELETE"
            });
            renewalRequestsCache = renewalRequestsCache.filter((request) => request.id !== normalizedRequestId);
            localStorage.setItem(RENEWAL_REQUESTS_STORAGE_KEY, JSON.stringify(renewalRequestsCache));
            updateConnectionStatus();
            addLocalAudit("حذف طلب تجديد", normalizedRequestId);
            return true;
        } catch {
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    renewalRequestsCache = renewalRequestsCache.filter((request) => request.id !== normalizedRequestId);
    localStorage.setItem(RENEWAL_REQUESTS_STORAGE_KEY, JSON.stringify(renewalRequestsCache));
    queueSyncOperation({
        type: "renewal:delete",
        method: "DELETE",
        path: `/api/renewal-requests/${encodeURIComponent(normalizedRequestId)}`
    });
    addLocalAudit("حذف طلب تجديد", normalizedRequestId);
    return true;
}

async function loadSettings() {
    if (apiAvailable) {
        try {
            settingsCache = normalizeSettings(await apiRequest("/api/settings"));
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settingsCache));
            updateConnectionStatus();
            return settingsCache;
        } catch {
            apiAvailable = false;
        }
    }

    try {
        settingsCache = normalizeSettings(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}"));
    } catch {
        settingsCache = defaultSettings();
    }

    updateConnectionStatus();
    return settingsCache;
}

async function saveSettings(settings) {
    const rawSyncToken = String(settings.syncToken || "").trim();
    const previousSyncToken = getSyncAccountToken();
    const effectiveSyncToken = rawSyncToken || previousSyncToken;
    const settingsWithoutSecret = { ...settings };
    delete settingsWithoutSecret.syncToken;

    settingsCache = {
        ...normalizeSettings(settingsWithoutSecret),
        syncTokenConfigured: Boolean(effectiveSyncToken || settingsWithoutSecret.syncTokenConfigured),
        updatedAt: new Date().toISOString()
    };
    localStorage.setItem(ONLINE_SYNC_URL_KEY, settingsCache.onlineSyncUrl || "");
    apiAvailable = (location.protocol !== "file:"
        || Boolean(settingsCache.onlineSyncUrl && settingsCache.ownerEmail && effectiveSyncToken))
        && navigator.onLine !== false;

    if (rawSyncToken && !previousSyncToken) {
        localStorage.setItem(SYNC_TOKEN_KEY, rawSyncToken);
    }

    if (apiAvailable) {
        try {
            const payload = rawSyncToken
                ? { ...settingsCache, syncToken: rawSyncToken }
                : settingsCache;
            const firstTokenHeaders = rawSyncToken && !previousSyncToken
                ? { "X-Zahran-Token": rawSyncToken }
                : {};
            settingsCache = normalizeSettings(await apiRequest("/api/settings", {
                method: "PUT",
                headers: firstTokenHeaders,
                body: JSON.stringify(payload)
            }));
            if (rawSyncToken) {
                localStorage.setItem(SYNC_TOKEN_KEY, rawSyncToken);
                settingsCache.syncTokenConfigured = true;
            }
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settingsCache));
            updateConnectionStatus();
            addLocalAudit("تحديث الإعدادات", "تم حفظ إعدادات النظام والمزامنة.");
            return settingsCache;
        } catch {
            apiAvailable = false;
        }
    }

    if (rawSyncToken && !previousSyncToken) {
        localStorage.setItem(SYNC_TOKEN_KEY, rawSyncToken);
        settingsCache.syncTokenConfigured = true;
    }
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settingsCache));
    queueSyncOperation({
        type: "settings:update",
        method: "PUT",
        path: "/api/settings",
        payload: settingsCache
    });
    addLocalAudit("تحديث الإعدادات", "تم حفظ الإعدادات محليًا في انتظار المزامنة.");
    return settingsCache;
}

function setBackupMessage(message, type = "info") {
    if (!backupMessage) return;
    backupMessage.textContent = message;
    backupMessage.dataset.type = type;
}

function normalizeBackupSnapshot(input = {}) {
    return {
        app: "Zahran Informa",
        version: 1,
        exportedAt: input.exportedAt || new Date().toISOString(),
        settings: normalizeSettings(input.settings || {}),
        members: Array.isArray(input.members) ? input.members.map(normalizeMember) : [],
        financeEntries: Array.isArray(input.financeEntries)
            ? input.financeEntries.map(normalizeFinanceEntry)
            : (Array.isArray(input.finance) ? input.finance.map(normalizeFinanceEntry) : []),
        renewalRequests: Array.isArray(input.renewalRequests)
            ? input.renewalRequests.map(normalizeRenewalRequest)
            : []
    };
}

async function collectBackupSnapshot() {
    if (apiAvailable && navigator.onLine !== false) {
        try {
            return normalizeBackupSnapshot(await apiRequest("/api/backup"));
        } catch {
            apiAvailable = false;
            updateConnectionStatus();
        }
    }

    await loadSettings();
    await loadMembers();
    await loadFinanceEntries();
    await loadRenewalRequests();

    return normalizeBackupSnapshot({
        settings: settingsCache,
        members: membersCache,
        financeEntries: financeEntriesCache,
        renewalRequests: renewalRequestsCache
    });
}

function persistBackupSnapshotLocally(snapshot) {
    settingsCache = normalizeSettings(snapshot.settings);
    membersCache = snapshot.members.map(normalizeMember);
    financeEntriesCache = snapshot.financeEntries.map(normalizeFinanceEntry);
    renewalRequestsCache = snapshot.renewalRequests.map(normalizeRenewalRequest);

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settingsCache));
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
    localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(financeEntriesCache));
    localStorage.setItem(RENEWAL_REQUESTS_STORAGE_KEY, JSON.stringify(renewalRequestsCache));
}

async function restoreBackupSnapshot(input) {
    const snapshot = normalizeBackupSnapshot(input);

    persistBackupSnapshotLocally(snapshot);

    if (apiAvailable && navigator.onLine !== false) {
        try {
            const savedSnapshot = normalizeBackupSnapshot(await apiRequest("/api/backup", {
                method: "PUT",
                body: JSON.stringify(snapshot)
            }));
            persistBackupSnapshotLocally(savedSnapshot);
        } catch {
            apiAvailable = false;
            queueSyncOperation({
                type: "backup:restore",
                method: "PUT",
                path: "/api/backup",
                payload: snapshot
            });
        }
    } else {
        queueSyncOperation({
            type: "backup:restore",
            method: "PUT",
            path: "/api/backup",
            payload: snapshot
        });
    }

    applySettingsToUi();
    renderMembers();
    renderFinance();
    renderRenewalRequests();
    renderProgressSummary();
    updateConnectionStatus();
}

function downloadBackupSnapshot(snapshot) {
    const dateStamp = new Date().toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `zahran-informa-backup-${dateStamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function setSyncMessage(message, type = "info") {
    if (!syncMessage) return;
    syncMessage.textContent = message;
    syncMessage.dataset.type = type;
}

function getSyncSetupError() {
    if (!getOnlineSyncUrl()) {
        return "اكتب رابط سيرفر الأونلاين في الإعدادات الأول.";
    }
    if (!getSyncAccountEmail()) {
        return "اكتب إيميل حساب المزامنة الأول. نفس الإيميل على جهازين يعني نفس البيانات.";
    }
    if (!getSyncAccountToken()) {
        return "اكتب مفتاح المزامنة. نفس المفتاح لازم يكون على كل الأجهزة المرتبطة.";
    }

    return "";
}

function readLocalAuditLog() {
    try {
        const parsed = JSON.parse(localStorage.getItem(AUDIT_LOG_STORAGE_KEY) || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeLocalAuditLog(entries) {
    localStorage.setItem(AUDIT_LOG_STORAGE_KEY, JSON.stringify(entries.slice(0, 120)));
}

function addLocalAudit(action, details = "") {
    const entries = readLocalAuditLog();
    entries.unshift({
        id: createId(),
        at: new Date().toISOString(),
        action,
        details: String(details || "").trim()
    });
    writeLocalAuditLog(entries);
}

function renderAuditLog(entries = readLocalAuditLog()) {
    if (!auditLogList) return;

    auditLogList.hidden = false;
    if (!entries.length) {
        auditLogList.innerHTML = `<article class="empty-progress-card">لسه مفيش عمليات متسجلة.</article>`;
        return;
    }

    auditLogList.innerHTML = entries.slice(0, 40).map((entry) => `
        <article class="audit-log-item">
            <div>
                <strong>${escapeHtml(entry.action || "عملية")}</strong>
                <span>${escapeHtml(entry.details || "")}</span>
            </div>
            <time>${formatDate(entry.at || new Date().toISOString())}</time>
        </article>
    `).join("");
}

async function remoteApiRequest(path, options = {}) {
    const onlineSyncUrl = getOnlineSyncUrl();
    if (!onlineSyncUrl) {
        throw new Error("Online sync URL is not configured.");
    }
    if (!getSyncAccountEmail()) {
        throw new Error("Sync account email is not configured.");
    }
    if (!getSyncAccountToken()) {
        throw new Error("Sync account token is not configured.");
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);

    const response = await fetch(`${onlineSyncUrl}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...getSyncAccountHeaders(),
            ...(options.headers || {})
        },
        cache: "no-store",
        signal: controller.signal,
        ...options
    }).finally(() => window.clearTimeout(timeout));

    if (!response.ok) {
        throw new Error(`Online sync failed: ${response.status}`);
    }

    return response.json();
}

async function collectCurrentDeviceSnapshot() {
    if (location.protocol === "file:") {
        let localSettings = {};
        let localMembers = [];
        let localFinanceEntries = [];
        let localRenewalRequests = [];

        try {
            localSettings = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}");
        } catch {
            localSettings = {};
        }
        try {
            localMembers = JSON.parse(localStorage.getItem(MEMBERS_STORAGE_KEY) || "[]");
        } catch {
            localMembers = [];
        }
        try {
            localFinanceEntries = JSON.parse(localStorage.getItem(FINANCE_STORAGE_KEY) || "[]");
        } catch {
            localFinanceEntries = [];
        }
        try {
            localRenewalRequests = JSON.parse(localStorage.getItem(RENEWAL_REQUESTS_STORAGE_KEY) || "[]");
        } catch {
            localRenewalRequests = [];
        }

        return normalizeBackupSnapshot({
            settings: localSettings,
            members: localMembers,
            financeEntries: localFinanceEntries,
            renewalRequests: localRenewalRequests
        });
    }

    await loadSettings();
    await loadMembers();
    await loadFinanceEntries();
    await loadRenewalRequests();

    return normalizeBackupSnapshot({
        settings: settingsCache,
        members: membersCache,
        financeEntries: financeEntriesCache,
        renewalRequests: renewalRequestsCache
    });
}

async function uploadCurrentDeviceToOnline() {
    const snapshot = await collectCurrentDeviceSnapshot();
    await remoteApiRequest("/api/backup", {
        method: "PUT",
        body: JSON.stringify(snapshot)
    });
    return snapshot;
}

async function downloadOnlineToCurrentDevice() {
    const snapshot = normalizeBackupSnapshot(await remoteApiRequest("/api/backup"));
    await restoreBackupSnapshot(snapshot);
    return snapshot;
}

async function hashText(value) {
    if (!crypto?.subtle) {
        let hash = 0;
        for (let index = 0; index < value.length; index += 1) {
            hash = ((hash << 5) - hash) + value.charCodeAt(index);
            hash |= 0;
        }
        return `fallback-${Math.abs(hash)}`;
    }

    const encoder = new TextEncoder();
    const bytes = await crypto.subtle.digest("SHA-256", encoder.encode(value));
    return Array.from(new Uint8Array(bytes))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

function bytesToBase64Url(bytes) {
    const binary = Array.from(bytes)
        .map((byte) => String.fromCharCode(byte))
        .join("");
    return btoa(binary)
        .replaceAll("+", "-")
        .replaceAll("/", "_")
        .replaceAll("=", "");
}

function base64UrlToBytes(value) {
    const base64 = String(value || "")
        .replaceAll("-", "+")
        .replaceAll("_", "/")
        .padEnd(Math.ceil(String(value || "").length / 4) * 4, "=");
    return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}

function getRandomChallenge() {
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);
    return challenge;
}

function hasAndroidBiometricBridge() {
    return Boolean(window.ZahranAndroid && typeof window.ZahranAndroid.authenticateBiometric === "function");
}

function isAndroidBiometricAvailable() {
    try {
        return Boolean(window.ZahranAndroid?.isBiometricAvailable?.());
    } catch {
        return false;
    }
}

function isWebAuthnAvailable() {
    return Boolean(window.PublicKeyCredential && window.isSecureContext && crypto?.subtle);
}

function getBiometricMode() {
    return localStorage.getItem(BIOMETRIC_LOGIN_KEY) || "";
}

function isBiometricLoginEnabled() {
    const mode = getBiometricMode();
    if (mode === "android") {
        return true;
    }

    return mode === "webauthn" && Boolean(localStorage.getItem(BIOMETRIC_CREDENTIAL_ID_KEY));
}

function setBiometricMessage(message, type = "info") {
    if (biometricSettingsMessage) {
        biometricSettingsMessage.textContent = message;
        biometricSettingsMessage.dataset.type = type;
    }
}

function updateBiometricUi() {
    const enabled = isBiometricLoginEnabled();

    if (ownerBiometricLogin) {
        ownerBiometricLogin.hidden = !isOwnerConfigured() || !enabled;
    }
    if (disableBiometricLogin) {
        disableBiometricLogin.disabled = !enabled;
    }
    if (enableBiometricLogin) {
        enableBiometricLogin.textContent = enabled ? "إعادة تفعيل البصمة" : "تفعيل البصمة";
    }
}

async function enableWebAuthnLogin() {
    if (!isWebAuthnAvailable()) {
        throw new Error("WebAuthn is not available.");
    }

    const ownerHash = localStorage.getItem(OWNER_HASH_KEY) || createId();
    const userIdHash = await hashText(ownerHash);
    const credential = await navigator.credentials.create({
        publicKey: {
            challenge: getRandomChallenge(),
            rp: { name: "Zahran Informa" },
            user: {
                id: new TextEncoder().encode(userIdHash.slice(0, 64)),
                name: "owner",
                displayName: "صاحب الجيم"
            },
            pubKeyCredParams: [
                { type: "public-key", alg: -7 },
                { type: "public-key", alg: -257 }
            ],
            authenticatorSelection: {
                userVerification: "required"
            },
            timeout: 60000
        }
    });

    if (!credential?.rawId) {
        throw new Error("No credential was created.");
    }

    localStorage.setItem(BIOMETRIC_CREDENTIAL_ID_KEY, bytesToBase64Url(new Uint8Array(credential.rawId)));
    localStorage.setItem(BIOMETRIC_LOGIN_KEY, "webauthn");
}

async function authenticateWithWebAuthn() {
    const credentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_ID_KEY);
    if (!credentialId || !isWebAuthnAvailable()) {
        return false;
    }

    const credential = await navigator.credentials.get({
        publicKey: {
            challenge: getRandomChallenge(),
            allowCredentials: [{
                type: "public-key",
                id: base64UrlToBytes(credentialId)
            }],
            userVerification: "required",
            timeout: 60000
        }
    });

    return Boolean(credential);
}

function authenticateWithAndroidBiometric() {
    return new Promise((resolve) => {
        if (!isAndroidBiometricAvailable()) {
            resolve(false);
            return;
        }

        let resolved = false;
        const finish = (ok) => {
            if (resolved) return;
            resolved = true;
            window.handleNativeBiometricResult = null;
            resolve(Boolean(ok));
        };

        window.handleNativeBiometricResult = finish;
        try {
            window.ZahranAndroid.authenticateBiometric();
        } catch {
            finish(false);
        }
    });
}

async function enableBiometricLoginOnDevice() {
    if (!isOwnerConfigured()) {
        setBiometricMessage("اعمل كلمة سر للبرنامج الأول وبعدها فعل البصمة.", "error");
        return;
    }

    try {
        if (hasAndroidBiometricBridge()) {
            // التطبيق الأصلي موجود، بس لازم يكون فيه قفل شاشة/بصمة متسجّل على الموبايل
            if (!isAndroidBiometricAvailable()) {
                setBiometricMessage("فعّل قفل الشاشة أو البصمة من إعدادات الموبايل الأول، وبعدها ارجع فعّل البصمة هنا.", "error");
                return;
            }
            localStorage.setItem(BIOMETRIC_LOGIN_KEY, "android");
            setBiometricMessage("تم تفعيل دخول البصمة على هذا الهاتف.", "success");
            updateBiometricUi();
            return;
        }

        await enableWebAuthnLogin();
        setBiometricMessage("تم تفعيل دخول البصمة / Windows Hello على هذا الجهاز.", "success");
    } catch {
        setBiometricMessage("الجهاز أو المتصفح لا يدعم البصمة هنا. كلمة السر هتفضل شغالة عادي.", "error");
    } finally {
        updateBiometricUi();
    }
}

function disableBiometricLoginOnDevice() {
    localStorage.removeItem(BIOMETRIC_LOGIN_KEY);
    localStorage.removeItem(BIOMETRIC_CREDENTIAL_ID_KEY);
    setBiometricMessage("تم إلغاء دخول البصمة على هذا الجهاز.", "success");
    updateBiometricUi();
}

async function authenticateOwnerWithBiometric() {
    const mode = getBiometricMode();
    if (mode === "android") {
        return authenticateWithAndroidBiometric();
    }

    if (mode === "webauthn") {
        return authenticateWithWebAuthn();
    }

    return false;
}

function createId() {
    if (crypto?.randomUUID) {
        return crypto.randomUUID();
    }

    return `member-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function initialsFromName(name) {
    return String(name || "مشترك")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase() || "م";
}

function renderMemberPhoto(member) {
    if (member.photo) {
        return `<span class="member-avatar"><img src="${escapeHtml(member.photo)}" alt="صورة ${escapeHtml(member.name)}"></span>`;
    }

    return `<span class="member-avatar" aria-label="لا توجد صورة">${escapeHtml(initialsFromName(member.name))}</span>`;
}

function formatMoney(value) {
    return `${toMoneyValue(value).toLocaleString("ar-EG")} ج`;
}

function formatMeasurement(value, unit) {
    const number = toMeasurementValue(value);
    return number ? `${number.toLocaleString("ar-EG")} ${unit}` : "-";
}

function renderRemainingDays(member) {
    const remainingDays = toPositiveInteger(member.remainingDays, 0);
    let statusClass = "good";

    if (remainingDays <= 0) {
        statusClass = "expired";
    } else if (remainingDays <= 3) {
        statusClass = "low";
    }

    return `<span class="days-pill ${statusClass}">${remainingDays.toLocaleString("ar-EG")} يوم</span>`;
}

function renderAttendanceInfo(member) {
    const attendanceCount = toPositiveInteger(member.attendanceCount, 0);
    const lastAttendance = member.lastAttendanceAt
        ? `<small>آخر حضور: ${formatDate(member.lastAttendanceAt)}</small>`
        : `<small>لسه مفيش حضور</small>`;

    return `<span class="attendance-info"><strong>${attendanceCount.toLocaleString("ar-EG")}</strong>${lastAttendance}</span>`;
}

function renderAttendanceAction(member) {
    const disabled = toPositiveInteger(member.remainingDays, 0) <= 0 ? "disabled" : "";
    const label = disabled ? "انتهى الاشتراك" : "تسجيل حضور";

    return `<button class="attendance-btn" type="button" data-attendance-id="${escapeHtml(member.id)}" ${disabled}>${label}</button>`;
}

function renderMemberActions(member) {
    return `
        <div class="row-actions">
            ${renderAttendanceAction(member)}
            <button class="secondary-action row-action-btn" type="button" data-member-renew-id="${escapeHtml(member.id)}">تجديد</button>
            <button class="secondary-action row-action-btn" type="button" data-member-edit-id="${escapeHtml(member.id)}">تعديل</button>
            <button class="secondary-action row-action-btn danger-action" type="button" data-member-delete-id="${escapeHtml(member.id)}">حذف</button>
        </div>
    `;
}

function findAttendanceMatches(query) {
    const value = String(query || "").trim().toLowerCase();
    if (!value) {
        return [];
    }

    const exactMatches = membersCache.filter((member) => (
        String(member.code || "").toLowerCase() === value
        || String(member.phone || "").toLowerCase() === value
        || String(member.name || "").toLowerCase() === value
    ));

    if (exactMatches.length) {
        return exactMatches;
    }

    return membersCache.filter((member) => {
        const searchValue = `${member.code} ${member.name} ${member.phone}`.toLowerCase();
        return searchValue.includes(value);
    });
}

function renderQuickAttendanceMember(member) {
    const lastPhoto = (member.attendanceLog || []).slice().reverse().find((entry) => entry.photo)?.photo || "";

    return `
        <article class="quick-member-card">
            ${renderMemberPhoto(member)}
            <div>
                <strong>${escapeHtml(member.name)}</strong>
                <span>${escapeHtml(member.code)} - ${escapeHtml(member.phone)}</span>
                ${lastPhoto ? `<small>تم حفظ صورة حضور مع آخر تسجيل</small>` : ""}
            </div>
            ${renderRemainingDays(member)}
            ${lastPhoto ? `<img class="attendance-proof-thumb" src="${escapeHtml(lastPhoto)}" alt="صورة آخر حضور">` : ""}
        </article>
    `;
}

function setQuickAttendanceMessage(message, type = "info") {
    if (!quickAttendanceMessage) return;
    quickAttendanceMessage.textContent = message;
    quickAttendanceMessage.dataset.type = type;
}

function clearQuickAttendanceResult() {
    if (quickAttendanceResult) {
        quickAttendanceResult.innerHTML = "";
    }
}

function renderQuickAttendanceChoices(matches) {
    if (!quickAttendanceResult) return;

    quickAttendanceResult.innerHTML = `
        <div class="quick-attendance-choices">
            <strong>اختار اللاعب المطلوب</strong>
            <div>
                ${matches.slice(0, 6).map((member) => `
                    <button type="button" data-quick-attendance-id="${escapeHtml(member.id)}">
                        <span>${escapeHtml(member.name)}</span>
                        <small>${escapeHtml(member.code)}</small>
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

function setAttendanceCameraMessage(message, type = "info") {
    if (!quickAttendanceCameraMessage) return;
    quickAttendanceCameraMessage.textContent = message;
    quickAttendanceCameraMessage.dataset.type = type;
}

function getCameraFacingLabel(facingMode) {
    return facingMode === "environment" ? "الكاميرا الخلفية" : "الكاميرا الأمامية";
}

function toggleCameraFacingMode(facingMode) {
    return facingMode === "environment" ? "user" : "environment";
}

async function buildCameraOptionsAsync(facingMode) {
    const options = [];

    if (navigator.mediaDevices?.enumerateDevices) {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");

            if (videoDevices.length > 0) {
                const targetFacing = (facingMode || "").toLowerCase();
                const matched = videoDevices.find((dev) => {
                    const label = (dev.label || "").toLowerCase();
                    if (targetFacing === "environment") {
                        return label.includes("back") || label.includes("rear") || label.includes("خلف") || label.includes("environment");
                    }
                    return label.includes("front") || label.includes("user") || label.includes("أمام") || label.includes("facetime") || label.includes("integrated");
                });

                if (matched && matched.deviceId) {
                    options.push({
                        video: {
                            deviceId: { exact: matched.deviceId },
                            width: { ideal: 1280 },
                            height: { ideal: 720 }
                        },
                        audio: false
                    });
                }
            }
        } catch {
            // Ignore enumeration errors
        }
    }

    options.push({
        video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 }
        },
        audio: false
    });

    options.push({
        video: {
            facingMode: { ideal: facingMode }
        },
        audio: false
    });

    options.push({
        video: {
            facingMode
        },
        audio: false
    });

    options.push({
        video: true,
        audio: false
    });

    return options;
}

function buildCameraOptions(facingMode) {
    return [
        {
            video: {
                facingMode: { ideal: facingMode },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        },
        {
            video: {
                facingMode: { ideal: facingMode }
            },
            audio: false
        },
        {
            video: true,
            audio: false
        }
    ];
}

function updateCameraFacingButtons() {
    if (switchCameraBtn) {
        switchCameraBtn.textContent = getCameraFacingLabel(memberCameraFacingMode);
    }
    if (switchAttendanceCameraBtn) {
        switchAttendanceCameraBtn.textContent = getCameraFacingLabel(attendanceCameraFacingMode);
    }
}

function setAttendanceCameraState(isActive) {
    if (quickAttendanceCamera) {
        quickAttendanceCamera.hidden = !isActive;
        if (attendanceCameraFacingMode === "user") {
            quickAttendanceCamera.classList.add("camera-mirror");
        } else {
            quickAttendanceCamera.classList.remove("camera-mirror");
        }
    }
    if (captureAttendancePhotoBtn) {
        captureAttendancePhotoBtn.disabled = !isActive;
    }
    if (stopAttendanceCameraBtn) {
        stopAttendanceCameraBtn.disabled = !isActive;
    }
    if (startAttendanceCameraBtn) {
        startAttendanceCameraBtn.disabled = isActive;
    }
    updateCameraFacingButtons();
}

function setAttendancePhoto(photoData, faceSignature = "") {
    if (!quickAttendancePhotoData || !quickAttendancePhotoImg) return;

    quickAttendancePhotoData.value = photoData || "";
    latestAttendanceFaceSignature = faceSignature || "";
    quickAttendancePhotoImg.src = photoData || "";
    quickAttendancePhotoImg.hidden = !photoData;
    quickAttendancePhotoPreview?.querySelector("span")?.toggleAttribute("hidden", Boolean(photoData));

    if (clearAttendancePhotoBtn) {
        clearAttendancePhotoBtn.disabled = !photoData;
    }
}

function clearAttendancePhoto() {
    setAttendancePhoto("", "");
    setAttendanceCameraMessage("تم مسح صورة الحضور.");
}

async function getMemberFaceSignature(member) {
    if (member.faceSignature) {
        return member.faceSignature;
    }

    if (!member.photo) {
        return "";
    }

    try {
        const signature = await createFaceSignatureFromDataUrl(member.photo);
        member.faceSignature = signature;
        return signature;
    } catch {
        return "";
    }
}

async function recognizeMemberFromAttendancePhoto(faceSignature) {
    if (!faceSignature) {
        setQuickAttendanceMessage("تم حفظ صورة الحضور، لكن لم نقدر نطلع بصمة واضحة منها.", "error");
        return;
    }

    await loadMembers();

    const scoredMatches = [];
    for (const member of membersCache) {
        const memberSignature = await getMemberFaceSignature(member);
        const score = compareFaceSignatures(faceSignature, memberSignature);

        if (score > 0) {
            scoredMatches.push({ member, score });
        }
    }

    scoredMatches.sort((first, second) => second.score - first.score);
    const bestMatch = scoredMatches[0];

    if (!bestMatch) {
        setQuickAttendanceMessage("الصورة اتحفظت، لكن مفيش صور مشتركين كافية للمقارنة.", "error");
        return;
    }

    if (bestMatch.score >= 82) {
        quickAttendanceQuery.value = bestMatch.member.code;
        quickAttendanceResult.innerHTML = renderQuickAttendanceMember(bestMatch.member);
        setQuickAttendanceMessage(`تم التعرف على ${bestMatch.member.name} بنسبة ${bestMatch.score}%. راجع الاسم واضغط تسجيل حضور.`, "success");
        return;
    }

    if (bestMatch.score >= 70) {
        const likelyMatches = scoredMatches
            .filter((match) => match.score >= 70)
            .slice(0, 4)
            .map((match) => match.member);
        renderQuickAttendanceChoices(likelyMatches);
        setQuickAttendanceMessage("في تشابه محتمل. اختار اللاعب الصحيح من النتائج قبل تسجيل الحضور.", "info");
        return;
    }

    setQuickAttendanceMessage("الصورة اتحفظت، لكن التطابق ضعيف. اكتب كود أو اسم اللاعب يدويًا.", "error");
}

function applyPlanDefaultsToForm(force = false) {
    if (!planSelect) return;

    const defaults = getPlanDefaults(planSelect.value);
    if (remainingDaysInput && (force || !remainingDaysInput.value)) {
        remainingDaysInput.value = defaults.days;
    }

    if (priceInput && !priceInput.value) {
        priceInput.value = defaults.price;
    }
}

function isOwnerConfigured() {
    return Boolean(localStorage.getItem(OWNER_HASH_KEY));
}

async function unlockApp() {
    sessionStorage.setItem(OWNER_SESSION_KEY, "true");
    document.body.classList.remove("locked");
    ownerLogin?.setAttribute("aria-hidden", "true");
    await loadSettings();
    applySettingsToUi();
    await loadMembers();
    renderMembers();
    renderProgressSummary();
    await loadRenewalRequests();
    renderRenewalRequests();
    applyFinanceLockUi();
    if (sessionStorage.getItem(FINANCE_SESSION_KEY) === "true" && isFinanceConfigured() && isFinanceManagerConfigured()) {
        await loadFinanceEntries();
        renderFinance();
    }
}

function lockApp() {
    sessionStorage.removeItem(OWNER_SESSION_KEY);
    stopMemberCamera();
    stopAttendanceCamera();
    document.body.classList.add("locked");
    ownerLogin?.removeAttribute("aria-hidden");
    setupOwnerLoginText();
}

function setupOwnerLoginText() {
    const configured = isOwnerConfigured();
    ownerSubmit.textContent = configured ? "دخول لوحة المالك" : "إنشاء كود المالك";
    loginCopy.textContent = configured
        ? "اكتب كود صاحب الجيم للدخول إلى صفحة تسجيل المشتركين."
        : "أول مرة افتح الصفحة واعمل كود دخول خاص بيك. بعد كده محدش يدخل غير بالكود ده.";
    ownerCodeInput.placeholder = configured ? "كود الدخول" : "اعمل كود خاص بيك";
    updateBiometricUi();
}

function buildMemberCode(existingMembers) {
    let code = "";
    const existingCodes = new Set(
        (existingMembers || []).map((member) => normalizeManualMemberCode(member.code).toLowerCase())
    );
    const prefix = (settingsCache.memberCodePrefix || "ZI").trim().toUpperCase();

    do {
        const year = new Date().getFullYear();
        const random = Math.floor(1000 + Math.random() * 9000);
        const sequence = String((existingMembers || []).length + 1).padStart(3, "0");
        code = `${prefix}-${year}-${sequence}-${random}`;
    } while (existingCodes.has(code.toLowerCase()));

    return code;
}

function normalizeManualMemberCode(value) {
    return String(value || "").trim();
}

function isMemberCodeTaken(code, ignoredMemberId = "") {
    const normalizedCode = normalizeManualMemberCode(code).toLowerCase();
    if (!normalizedCode) return false;

    return membersCache.some((member) => (
        normalizeManualMemberCode(member.code).toLowerCase() === normalizedCode
        && String(member.id) !== String(ignoredMemberId || "")
    ));
}

function formatDate(value) {
    return new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date(value));
}

function renderAppApprovalBadge(member) {
    const isApproved = Boolean(member.approvedForMemberApp);
    return `
        <button class="secondary-action row-action-btn ${isApproved ? 'app-approved-btn' : 'app-pending-btn'}" 
                type="button" 
                data-member-approval-toggle-id="${escapeHtml(member.id)}"
                title="${isApproved ? 'إلغاء موافقة التفعيل للتطبيق' : 'منح موافقة التفعيل للتطبيق'}">
            ${isApproved ? '✅ معتمد' : '⛔ غير معتمد'}
        </button>
    `;
}

function renderMembers() {
    totalMembers.textContent = `${membersCache.length.toLocaleString("ar-EG")} مشترك`;
    if (membersPageCount) {
        membersPageCount.textContent = `${membersCache.length.toLocaleString("ar-EG")} مشترك`;
    }
    statTotal.textContent = membersCache.length.toLocaleString("ar-EG");
    statLastCode.textContent = membersCache[0]?.code || "-";
    statLastDate.textContent = membersCache[0] ? formatDate(membersCache[0].createdAt) : "-";
    renderSessionsPage();
    renderWhatsAppAutoReminders();
    renderMembersTable();
}

// Only the table depends on the search query, so typing re-renders just this.
function renderMembersTable() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const visibleMembers = query
        ? membersCache.filter((member) => {
            const searchValue = `${member.code} ${member.name} ${member.phone} ${member.weight} ${member.height} ${member.plan} ${member.price} ${member.remainingDays}`.toLowerCase();
            return searchValue.includes(query);
        })
        : membersCache;

    if (!visibleMembers.length) {
        membersTable.innerHTML = `<tr><td colspan="13" class="empty-cell">لسه مفيش مشتركين.</td></tr>`;
        return;
    }

    membersTable.innerHTML = visibleMembers.map((member) => `
        <tr>
            <td><span class="code-pill">${escapeHtml(member.code)}</span></td>
            <td>${renderMemberPhoto(member)}</td>
            <td>${escapeHtml(member.name)}</td>
            <td>${escapeHtml(member.phone)}</td>
            <td>${formatMeasurement(member.weight, "كجم")}</td>
            <td>${formatMeasurement(member.height, "سم")}</td>
            <td>${escapeHtml(member.plan)}</td>
            <td>${formatMoney(member.price)}</td>
            <td>${renderRemainingDays(member)}</td>
            <td>${renderAttendanceInfo(member)}</td>
            <td>${renderAppApprovalBadge(member)}</td>
            <td>${formatDate(member.createdAt)}</td>
            <td>${renderMemberActions(member)}</td>
        </tr>
    `).join("");
}

function isSessionPlan(member) {
    const plan = normalizePlanValue(member?.plan);
    return plan === "حصص" || plan === "PT";
}

function renderSessionsPage() {
    if (!sessionsList) return;

    const sessionMembers = membersCache.filter(isSessionPlan);
    if (sessionsPageCount) {
        sessionsPageCount.textContent = `${sessionMembers.length.toLocaleString("ar-EG")} لاعب`;
    }

    if (!sessionMembers.length) {
        sessionsList.innerHTML = `<article class="empty-progress-card">لسه مفيش لاعبين بنظام حصص أو PT.</article>`;
        return;
    }

    sessionsList.innerHTML = sessionMembers.map((member) => `
        <article class="session-member-card">
            <div class="session-member-main">
                ${renderMemberPhoto(member)}
                <div>
                    <strong>${escapeHtml(member.name)}</strong>
                    <small>${escapeHtml(member.code)} · ${escapeHtml(member.phone)}</small>
                    <span>${escapeHtml(member.plan)}</span>
                </div>
            </div>
            <div class="session-member-meta">
                ${renderRemainingDays(member)}
                ${renderAttendanceInfo(member)}
            </div>
            <div class="session-member-actions">
                ${renderAttendanceAction(member)}
                <button class="secondary-action row-action-btn" type="button" data-member-renew-id="${escapeHtml(member.id)}">تجديد</button>
                <button class="secondary-action row-action-btn" type="button" data-member-edit-id="${escapeHtml(member.id)}">تعديل</button>
            </div>
        </article>
    `).join("");
}

function isFinanceConfigured() {
    return Boolean(localStorage.getItem(FINANCE_HASH_KEY));
}

function getStoredFinanceManager() {
    try {
        const manager = JSON.parse(localStorage.getItem(FINANCE_MANAGER_KEY) || "null");
        if (manager && typeof manager === "object" && manager.hash) {
            return {
                name: String(manager.name || "مدير الخزنة").trim() || "مدير الخزنة",
                hash: String(manager.hash),
                createdAt: manager.createdAt || new Date().toISOString()
            };
        }
    } catch {
        return null;
    }

    return null;
}

function isFinanceManagerConfigured() {
    return Boolean(getStoredFinanceManager());
}

function saveFinanceManager(manager) {
    localStorage.setItem(FINANCE_MANAGER_KEY, JSON.stringify({
        name: String(manager.name || "مدير الخزنة").trim() || "مدير الخزنة",
        hash: String(manager.hash || ""),
        createdAt: manager.createdAt || new Date().toISOString()
    }));
}

function getFinanceUsers() {
    try {
        return JSON.parse(localStorage.getItem(FINANCE_USERS_KEY) || "[]")
            .filter((user) => user && user.hash)
            .map((user) => ({
                id: String(user.id || createId()),
                name: String(user.name || "مستخدم خزنة").trim() || "مستخدم خزنة",
                hash: String(user.hash),
                createdAt: user.createdAt || new Date().toISOString()
            }));
    } catch {
        return [];
    }
}

function saveFinanceUsers(users) {
    localStorage.setItem(FINANCE_USERS_KEY, JSON.stringify(users));
}

function getFinanceSessionRole() {
    return sessionStorage.getItem(FINANCE_SESSION_ROLE_KEY) || "user";
}

function getFinanceSessionName() {
    return sessionStorage.getItem(FINANCE_SESSION_NAME_KEY) || "";
}

function isFinanceManagerSession() {
    return sessionStorage.getItem(FINANCE_SESSION_KEY) === "true" && getFinanceSessionRole() === "manager";
}

function setFinanceSession(role, name = "") {
    sessionStorage.setItem(FINANCE_SESSION_KEY, "true");
    sessionStorage.setItem(FINANCE_SESSION_ROLE_KEY, role);
    sessionStorage.setItem(FINANCE_SESSION_NAME_KEY, name);
}

function clearFinanceSession() {
    sessionStorage.removeItem(FINANCE_SESSION_KEY);
    sessionStorage.removeItem(FINANCE_SESSION_ROLE_KEY);
    sessionStorage.removeItem(FINANCE_SESSION_NAME_KEY);
}

function renderFinanceUsers() {
    if (!financeUsersTable) return;

    const users = getFinanceUsers();
    if (financeUsersCount) {
        users.length
            ? financeUsersCount.textContent = `${users.length.toLocaleString("ar-EG")} مستخدم`
            : financeUsersCount.textContent = "0 مستخدم";
    }

    if (!users.length) {
        financeUsersTable.innerHTML = `<tr><td colspan="3" class="empty-cell">لسه مفيش مستخدمين للخزنة.</td></tr>`;
        return;
    }

    financeUsersTable.innerHTML = users
        .slice()
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
        .map((user) => `
            <tr>
                <td>${escapeHtml(user.name)}</td>
                <td>${formatDate(user.createdAt)}</td>
                <td>
                    <button class="secondary-action row-action-btn danger-action" type="button" data-finance-user-delete-id="${escapeHtml(user.id)}">حذف</button>
                </td>
            </tr>
        `).join("");
}

function applyFinanceLockUi() {
    const configured = isFinanceConfigured();
    const managerConfigured = isFinanceManagerConfigured();
    const unlocked = sessionStorage.getItem(FINANCE_SESSION_KEY) === "true" && configured && managerConfigured;
    const managerSession = isFinanceManagerSession();

    if (financeUnlockBtn) {
        financeUnlockBtn.textContent = !configured
            ? "إنشاء الخزنة"
            : (managerConfigured ? "فتح الخزنة" : "تعيين مدير الخزنة");
    }

    if (financePassword) {
        financePassword.placeholder = !configured
            ? "باسورد فتح الخزنة"
            : (managerConfigured ? "باسورد المدير أو مستخدم الخزنة" : "باسورد الخزنة الحالي");
        financePassword.autocomplete = configured ? "current-password" : "new-password";
    }
    if (financeManagerSetup) {
        financeManagerSetup.hidden = managerConfigured;
        financeManagerSetup.querySelectorAll("input").forEach((input) => {
            input.required = !managerConfigured;
        });
    }

    if (financePrivateArea) {
        financePrivateArea.hidden = !unlocked;
    }
    if (financeLockForm) {
        financeLockForm.hidden = unlocked;
    }
    if (financeVaultStatus) {
        financeVaultStatus.dataset.state = unlocked ? "open" : (configured ? "locked" : "setup");
        const sessionName = getFinanceSessionName();
        financeVaultStatus.querySelector("strong").textContent = unlocked
            ? (managerSession ? `مفتوحة الآن - مدير الخزنة${sessionName ? `: ${sessionName}` : ""}` : `مفتوحة الآن - ${sessionName || "مستخدم خزنة"}`)
            : (configured ? (managerConfigured ? "مقفولة - اكتب باسورد الخزنة" : "مقفولة - عيّن مدير الخزنة") : "اعمل باسورد للخزنة أول مرة");
    }
    if (financeManagerPanel) {
        financeManagerPanel.hidden = !unlocked || !managerSession;
    }
    if (financeUserNote) {
        financeUserNote.hidden = !unlocked || managerSession;
    }
    if (managerSession) {
        renderFinanceUsers();
    }
}

function lockFinanceVault(message = "تم قفل الخزنة.") {
    clearFinanceSession();
    applyFinanceLockUi();
    if (financeResetMessage) {
        financeResetMessage.textContent = "";
        delete financeResetMessage.dataset.type;
    }
    if (financeLockMessage) {
        financeLockMessage.textContent = message;
        financeLockMessage.dataset.type = "success";
    }
}

function renderFinance() {
    if (!financeTable) return;

    const currentMonthStr = new Date().toISOString().slice(0, 7); // e.g. "2026-08"
    const currentMonthEntries = financeEntriesCache.filter(
        (entry) => entry.date && entry.date.startsWith(currentMonthStr)
    );
    const displayEntries = currentMonthEntries.length ? currentMonthEntries : financeEntriesCache;

    const totals = getFinanceTotals(displayEntries);

    if (financeIncomeTotal) financeIncomeTotal.textContent = formatMoney(totals.income);
    if (financeExpenseTotal) financeExpenseTotal.textContent = formatMoney(totals.expense);
    if (financeNetTotal) financeNetTotal.textContent = formatMoney(totals.net);

    if (!displayEntries.length) {
        financeTable.innerHTML = `<tr><td colspan="4" class="empty-cell">لسه مفيش حركات مالية مسجلة.</td></tr>`;
        return;
    }

    financeTable.innerHTML = displayEntries
        .slice()
        .sort((a, b) => `${b.date}-${b.createdAt}`.localeCompare(`${a.date}-${a.createdAt}`))
        .map((entry) => `
            <tr>
                <td>${escapeHtml(entry.date)}</td>
                <td><span class="finance-type ${entry.type}">${entry.type === "income" ? "وارد" : "مصروف (صادر)"}</span></td>
                <td>${escapeHtml(entry.note)}</td>
                <td>${formatMoney(entry.amount)}</td>
            </tr>
        `).join("");
}

function renderRenewalRequests() {
    if (!renewalRequestsTable) return;

    const count = renewalRequestsCache.length;
    if (renewalRequestsCount) {
        renewalRequestsCount.textContent = `${count.toLocaleString("ar-EG")} طلب`;
    }

    if (!count) {
        renewalRequestsTable.innerHTML = `<tr><td colspan="6" class="empty-cell">لسه مفيش طلبات تجديد.</td></tr>`;
        return;
    }

    renewalRequestsTable.innerHTML = renewalRequestsCache
        .slice()
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
        .map((request) => `
            <tr>
                <td>${formatDate(request.createdAt)}</td>
                <td>${escapeHtml(request.memberName || "-")}</td>
                <td><span class="code-pill">${escapeHtml(request.memberCode || "-")}</span></td>
                <td>${escapeHtml(request.memberPhone || "-")}</td>
                <td>${request.remainingDays.toLocaleString("ar-EG")} يوم</td>
                <td>
                    <div class="row-actions">
                        <button class="secondary-action row-action-btn" type="button" data-renewal-open-id="${escapeHtml(request.id)}">تجديد</button>
                        <button class="secondary-action row-action-btn danger-action" type="button" data-renewal-delete-id="${escapeHtml(request.id)}">حذف</button>
                    </div>
                </td>
            </tr>
        `).join("");
}

function normalizePhoneForWhatsApp(phone) {
    const digits = String(phone || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("00")) return digits.slice(2);
    if (digits.startsWith("0")) return `20${digits.slice(1)}`;
    return digits;
}

function getWhatsAppRenewalHref(member) {
    const phone = normalizePhoneForWhatsApp(settingsCache.gymPhone);
    if (!phone) return "";

    const message = `طلب تجديد اشتراك للاعب ${member.name} - كود ${member.code}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function getWhatsAppMessageHref(phone, message) {
    const normalizedPhone = normalizePhoneForWhatsApp(phone);
    if (!normalizedPhone) return "";

    return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

function fillWhatsAppTemplate(template = "expiry") {
    if (!whatsappMessageInput) return;

    whatsappMessageInput.value = getWhatsAppTemplate(template);
}

function getWhatsAppTemplate(template = "expiry") {
    const templates = {
        expiry: "اهلا وسهلا يا {name}\nاشتراكك ف الجيم على وشك الانتهاء يا وحش🫵💪 تنمنى تجديده للاستمرار ف التمرين معانا\nللتجديد تواصل مع ادارة الجيم ☺️😜",
        welcome: "أهلًا {name}، كودك في {gym} هو {code}. نتمنى لك تمرين قوي ومنظم."
    };

    return templates[template] || templates.expiry;
}

function formatWhatsAppMessage(template, member) {
    return String(template || "")
        .replaceAll("{name}", member.name || "")
        .replaceAll("{code}", member.code || "")
        .replaceAll("{remaining}", toPositiveInteger(member.remainingDays, 0).toLocaleString("ar-EG"))
        .replaceAll("{expiry}", formatDate(member.subscriptionEndsAt || getSubscriptionEndDate(member, member.plan, member.totalDays)))
        .replaceAll("{gym}", settingsCache.gymName || "Zahran Informa");
}

function getInactiveCutoffDate() {
    const days = toPositiveInteger(settingsCache.inactiveMemberDays, 30);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return cutoff;
}

function getWhatsAppAudienceMembers(audience) {
    const reminderDays = toPositiveInteger(settingsCache.expiryReminderDays, 7);
    const inactiveCutoff = getInactiveCutoffDate();

    return membersCache.filter((member) => {
        const remainingDays = toPositiveInteger(member.remainingDays, 0);
        const phone = normalizePhoneForWhatsApp(member.phone);
        if (!phone) return false;

        if (audience === "active") {
            return remainingDays > reminderDays;
        }

        if (audience === "expiring") {
            return remainingDays > 0 && remainingDays <= reminderDays;
        }

        if (audience === "expired") {
            return remainingDays <= 0;
        }

        if (audience === "inactive") {
            const activityDate = member.lastAttendanceAt || member.createdAt;
            return !activityDate || new Date(activityDate) < inactiveCutoff;
        }

        return true;
    });
}

function getWhatsAppReminderLog() {
    try {
        const parsed = JSON.parse(localStorage.getItem(WHATSAPP_REMINDER_LOG_KEY) || "{}");
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }
}

function saveWhatsAppReminderLog(log) {
    localStorage.setItem(WHATSAPP_REMINDER_LOG_KEY, JSON.stringify(log || {}));
}

function getWhatsAppReminderKey(memberId, type = "expiry") {
    return `${type}:${memberId}`;
}

function getWhatsAppReminderRecord(member, type = "expiry") {
    const log = getWhatsAppReminderLog();
    return log[getWhatsAppReminderKey(member.id, type)] || null;
}

function wasWhatsAppReminderOpenedToday(member, type = "expiry") {
    const record = getWhatsAppReminderRecord(member, type);
    return Boolean(record && record.date === getTodayDateValue());
}

function markWhatsAppReminderOpened(memberId, type = "expiry") {
    const member = membersCache.find((item) => item.id === memberId);
    if (!member) return;

    const log = getWhatsAppReminderLog();
    log[getWhatsAppReminderKey(member.id, type)] = {
        memberId: member.id,
        type,
        date: getTodayDateValue(),
        remainingDays: toPositiveInteger(member.remainingDays, 0),
        openedAt: new Date().toISOString()
    };
    saveWhatsAppReminderLog(log);
    renderWhatsAppAutoReminders();
}

function getExpiringWhatsAppMembers() {
    const reminderDays = toPositiveInteger(settingsCache.expiryReminderDays, 7);
    return membersCache.filter((member) => {
        const remainingDays = toPositiveInteger(member.remainingDays, 0);
        return normalizePhoneForWhatsApp(member.phone)
            && remainingDays > 0
            && remainingDays <= reminderDays;
    });
}

function getPendingWhatsAppReminderMembers() {
    return getExpiringWhatsAppMembers().filter((member) => !wasWhatsAppReminderOpenedToday(member));
}

function getWhatsAppExpiryReminderMessage(member) {
    const template = whatsappMessageInput?.value.trim() || getWhatsAppTemplate("expiry");
    return formatWhatsAppMessage(template, member);
}

function setWhatsAppStatusMessage(element, message, type = "info") {
    if (!element) return;
    element.textContent = message;
    element.dataset.type = type;
}

async function refreshWhatsAppCloudStatus() {
    if (!whatsappCloudStatus) return null;
    if (!hasApiEndpoint()) {
        setWhatsAppStatusMessage(whatsappCloudStatus, "الإرسال التلقائي يحتاج سيرفر مزامنة متصل.", "error");
        return null;
    }

    try {
        const status = await apiRequest("/api/whatsapp/status");
        if (status.enabled) {
            const mode = status.mode === "template" ? `قالب ${status.templateName}` : "رسائل نصية";
            const autoText = status.automaticReminders ? `والتنبيهات اليومية مفعلة الساعة ${Number(status.automaticReminderHour || 0).toLocaleString("ar-EG")}:00` : "والتنبيهات اليومية غير مفعلة";
            setWhatsAppStatusMessage(whatsappCloudStatus, `الإرسال التلقائي جاهز من السيرفر (${mode})، ${autoText}.`, "success");
        } else {
            const missing = [
                status.hasAccessToken ? "" : "توكن واتساب",
                status.hasPhoneNumberId ? "" : "Phone Number ID"
            ].filter(Boolean).join(" و ");
            setWhatsAppStatusMessage(whatsappCloudStatus, `الإرسال التلقائي غير مفعل: أضف ${missing} في إعدادات السيرفر.`, "error");
        }
        return status;
    } catch {
        setWhatsAppStatusMessage(whatsappCloudStatus, "تعذر فحص إعداد واتساب على السيرفر.", "error");
        return null;
    }
}

function createWhatsAppRecipientPayload(member, message) {
    const remainingDays = toPositiveInteger(member.remainingDays, 0);
    return {
        id: member.id,
        memberId: member.id,
        phone: member.phone,
        message,
        memberName: member.name,
        memberCode: member.code,
        remainingDays,
        subscriptionEndsAt: member.subscriptionEndsAt,
        gymName: settingsCache.gymName || "Zahran Informa",
        templateParameters: [
            member.name || "",
            settingsCache.gymName || "Zahran Informa",
            formatDate(member.subscriptionEndsAt || getSubscriptionEndDate(member, member.plan, member.totalDays)),
            remainingDays.toLocaleString("ar-EG"),
            member.code || ""
        ]
    };
}

function getWhatsAppSendSummary(result) {
    const sent = Number(result?.sent || 0);
    const failed = Number(result?.failed || 0);
    if (!sent && !failed) {
        return "لا توجد رسائل مطلوبة للإرسال الآن.";
    }
    if (failed) {
        return `تم إرسال ${sent.toLocaleString("ar-EG")} رسالة، وفشل ${failed.toLocaleString("ar-EG")}.`;
    }
    return `تم إرسال ${sent.toLocaleString("ar-EG")} رسالة واتساب تلقائيًا.`;
}

async function sendWhatsAppRecipients(recipients, type = "broadcast", statusElement = whatsappMessageStatus) {
    if (!recipients.length) {
        setWhatsAppStatusMessage(statusElement, "لا توجد أرقام واتساب صالحة للإرسال.", "error");
        return null;
    }
    if (!hasApiEndpoint()) {
        setWhatsAppStatusMessage(statusElement, "الإرسال التلقائي يحتاج سيرفر مزامنة متصل.", "error");
        return null;
    }

    setWhatsAppStatusMessage(statusElement, `جاري إرسال ${recipients.length.toLocaleString("ar-EG")} رسالة من السيرفر...`, "info");
    try {
        const result = await apiRequest("/api/whatsapp/send-bulk", {
            method: "POST",
            timeoutMs: 120000,
            body: JSON.stringify({ type, recipients })
        });

        if (type === "expiry") {
            result.results
                ?.filter((item) => item.ok && item.id)
                .forEach((item) => markWhatsAppReminderOpened(item.id));
        }

        setWhatsAppStatusMessage(statusElement, getWhatsAppSendSummary(result), result.failed ? "error" : "success");
        addLocalAudit("إرسال واتساب تلقائي", getWhatsAppSendSummary(result));
        if (type === "expiry") {
            renderWhatsAppAutoReminders();
        }
        return result;
    } catch {
        setWhatsAppStatusMessage(statusElement, "فشل الإرسال التلقائي. راجع إعدادات WhatsApp Cloud API على السيرفر.", "error");
        return null;
    }
}

async function sendWhatsAppBroadcastAutomatically() {
    await loadMembers();
    await loadSettings();
    const audience = whatsappAudience?.value || "all";
    const template = whatsappMessageInput?.value.trim() || "";
    if (!template) {
        setWhatsAppStatusMessage(whatsappMessageStatus, "اكتب نص الرسالة الأول.", "error");
        return;
    }

    const recipients = getWhatsAppAudienceMembers(audience)
        .map((member) => createWhatsAppRecipientPayload(member, formatWhatsAppMessage(template, member)));

    await sendWhatsAppRecipients(recipients, "broadcast", whatsappMessageStatus);
}

async function sendExpiryWhatsAppRemindersAutomatically() {
    if (!hasApiEndpoint()) {
        const recipients = getPendingWhatsAppReminderMembers()
            .map((member) => createWhatsAppRecipientPayload(member, getWhatsAppExpiryReminderMessage(member)));
        await sendWhatsAppRecipients(recipients, "expiry", whatsappAutoStatus);
        return;
    }

    setWhatsAppStatusMessage(whatsappAutoStatus, "جاري إرسال تنبيهات اليوم من السيرفر...", "info");
    try {
        const result = await apiRequest("/api/whatsapp/send-reminders", {
            method: "POST",
            timeoutMs: 120000,
            body: JSON.stringify({})
        });
        result.results
            ?.filter((item) => item.ok && item.memberId)
            .forEach((item) => markWhatsAppReminderOpened(item.memberId));
        setWhatsAppStatusMessage(whatsappAutoStatus, getWhatsAppSendSummary(result), result.failed ? "error" : "success");
        addLocalAudit("إرسال تنبيهات واتساب", getWhatsAppSendSummary(result));
        await loadMembers();
        renderWhatsAppAutoReminders();
    } catch {
        const recipients = getPendingWhatsAppReminderMembers()
            .map((member) => createWhatsAppRecipientPayload(member, getWhatsAppExpiryReminderMessage(member)));
        await sendWhatsAppRecipients(recipients, "expiry", whatsappAutoStatus);
    }
}

function openWhatsAppReminderForMember(member) {
    if (!member) return false;

    const href = getWhatsAppMessageHref(member.phone, getWhatsAppExpiryReminderMessage(member));
    if (!href) return false;

    markWhatsAppReminderOpened(member.id);
    window.open(href, "_blank", "noopener");
    return true;
}

function openPendingWhatsAppReminders() {
    const queue = getPendingWhatsAppReminderMembers();
    if (!queue.length) {
        renderWhatsAppAutoReminders();
        return;
    }

    if (whatsappReminderTimer) {
        window.clearTimeout(whatsappReminderTimer);
        whatsappReminderTimer = null;
    }

    const openNext = () => {
        const member = queue.shift();
        if (!member) {
            if (whatsappAutoStatus) {
                whatsappAutoStatus.textContent = "تم فتح رسائل اليوم الجاهزة.";
                whatsappAutoStatus.dataset.type = "success";
            }
            renderWhatsAppAutoReminders();
            return;
        }

        openWhatsAppReminderForMember(member);
        if (whatsappAutoStatus) {
            whatsappAutoStatus.textContent = `جاري فتح رسائل واتساب. المتبقي ${queue.length.toLocaleString("ar-EG")} رسالة.`;
            whatsappAutoStatus.dataset.type = "info";
        }

        if (queue.length) {
            whatsappReminderTimer = window.setTimeout(openNext, 3500);
        } else {
            whatsappReminderTimer = null;
        }
    };

    openNext();
}

function renderWhatsAppAutoReminders() {
    if (!whatsappAutoReminders) return;

    const expiringMembers = getExpiringWhatsAppMembers();
    const pendingMembers = getPendingWhatsAppReminderMembers();
    const reminderDays = toPositiveInteger(settingsCache.expiryReminderDays, 7);

    if (whatsappAutoCount) {
        whatsappAutoCount.textContent = `${pendingMembers.length.toLocaleString("ar-EG")} رسالة`;
    }
    if (openNextWhatsAppReminder) {
        openNextWhatsAppReminder.disabled = pendingMembers.length === 0;
    }
    if (openAllWhatsAppReminders) {
        openAllWhatsAppReminders.disabled = pendingMembers.length === 0;
    }
    if (sendWhatsAppReminders) {
        sendWhatsAppReminders.disabled = pendingMembers.length === 0 || !hasApiEndpoint();
    }

    if (!expiringMembers.length) {
        if (whatsappAutoStatus) {
            whatsappAutoStatus.textContent = `مفيش اشتراكات داخل آخر ${reminderDays.toLocaleString("ar-EG")} يوم.`;
            whatsappAutoStatus.dataset.type = "success";
        }
        whatsappAutoReminders.innerHTML = `<article class="empty-progress-card">مفيش تنبيهات واتساب مطلوبة دلوقتي.</article>`;
        return;
    }

    if (!pendingMembers.length) {
        if (whatsappAutoStatus) {
            whatsappAutoStatus.textContent = "كل تنبيهات قرب الانتهاء اتفتحت النهارده.";
            whatsappAutoStatus.dataset.type = "success";
        }
    } else {
        if (whatsappAutoStatus) {
            whatsappAutoStatus.textContent = `في ${pendingMembers.length.toLocaleString("ar-EG")} رسالة قرب انتهاء جاهزة للإرسال.`;
            whatsappAutoStatus.dataset.type = "info";
        }
    }

    whatsappAutoReminders.innerHTML = expiringMembers.map((member) => {
        const openedToday = wasWhatsAppReminderOpenedToday(member);
        const message = getWhatsAppExpiryReminderMessage(member);
        const href = getWhatsAppMessageHref(member.phone, message);
        return `
            <article class="whatsapp-recipient whatsapp-auto-recipient ${openedToday ? "sent" : ""}">
                <div>
                    <strong>${escapeHtml(member.name)}</strong>
                    <span>${escapeHtml(member.code)} - ${escapeHtml(member.phone)} - المتبقي ${toPositiveInteger(member.remainingDays, 0).toLocaleString("ar-EG")} يوم - ينتهي ${formatDate(member.subscriptionEndsAt)}</span>
                </div>
                <div class="whatsapp-reminder-actions">
                    <a href="${href}" target="_blank" rel="noopener" data-whatsapp-reminder-link-id="${escapeHtml(member.id)}">${openedToday ? "فتح تاني" : "فتح واتساب"}</a>
                    <button class="secondary-action" type="button" data-whatsapp-reminder-done-id="${escapeHtml(member.id)}">${openedToday ? "اتفتح النهارده" : "تم الإرسال"}</button>
                </div>
            </article>
        `;
    }).join("");
}

function renderWhatsAppBroadcast() {
    if (!whatsappLinks || !whatsappSummary || !whatsappMessageInput) return;

    const audience = whatsappAudience?.value || "all";
    const template = whatsappMessageInput.value.trim();
    const recipients = getWhatsAppAudienceMembers(audience);

    if (!template) {
        whatsappLinks.innerHTML = "";
        whatsappSummary.textContent = "";
        if (whatsappMessageStatus) {
            whatsappMessageStatus.textContent = "اكتب نص الرسالة الأول.";
            whatsappMessageStatus.dataset.type = "error";
        }
        return;
    }

    if (!recipients.length) {
        whatsappLinks.innerHTML = "";
        whatsappSummary.textContent = "لا يوجد لاعبين بأرقام واتساب في هذه المجموعة.";
        if (whatsappMessageStatus) {
            whatsappMessageStatus.textContent = "";
        }
        return;
    }

    whatsappSummary.textContent = `جاهز ${recipients.length.toLocaleString("ar-EG")} رابط واتساب.`;
    whatsappLinks.innerHTML = recipients.map((member) => {
        const message = formatWhatsAppMessage(template, member);
        const href = getWhatsAppMessageHref(member.phone, message);

        return `
            <article class="whatsapp-recipient">
                <div>
                    <strong>${escapeHtml(member.name)}</strong>
                    <span>${escapeHtml(member.code)} - ${escapeHtml(member.phone)} - ${toPositiveInteger(member.remainingDays, 0).toLocaleString("ar-EG")} يوم - ينتهي ${formatDate(member.subscriptionEndsAt)}</span>
                </div>
                <a href="${escapeHtml(href)}" target="_blank" rel="noopener">فتح واتساب</a>
            </article>
        `;
    }).join("");

    if (whatsappMessageStatus) {
        whatsappMessageStatus.textContent = "افتح روابط واتساب واحد واحد للإرسال.";
        whatsappMessageStatus.dataset.type = "success";
    }
    renderWhatsAppAutoReminders();
}

function findMemberForPortal(query) {
    const value = String(query || "").trim().toLowerCase();
    if (!value) return null;

    return membersCache.find((member) => (
        String(member.code || "").toLowerCase() === value
        || String(member.phone || "").toLowerCase() === value
    )) || null;
}

function renderPortalAttendance(member) {
    const log = normalizeAttendanceLog(member)
        .slice()
        .reverse()
        .slice(0, 5);

    if (!log.length) {
        return `<p class="empty-portal-state">لسه مفيش حضور مسجل.</p>`;
    }

    return `
        <div class="attendance-timeline">
            ${log.map((entry) => `
                <span class="timeline-item">
                    <strong>${formatDate(entry.at)}</strong>
                    ${entry.photo ? `<small>بصورة حضور</small>` : `<small>بدون صورة</small>`}
                </span>
            `).join("")}
        </div>
    `;
}

function renderMemberPortal(member) {
    const remainingDays = toPositiveInteger(member.remainingDays, 0);
    const totalDays = toPositiveInteger(member.totalDays, remainingDays);
    const attendanceCount = toPositiveInteger(member.attendanceCount, 0);
    const lastAttendance = member.lastAttendanceAt ? formatDate(member.lastAttendanceAt) : "لا يوجد";
    const renewalHref = getWhatsAppRenewalHref(member);

    return `
        <article class="member-pass-card">
            <div class="member-pass-top">
                ${renderMemberPhoto(member)}
                <div>
                    <span>كارت اللاعب</span>
                    <strong>${escapeHtml(member.name)}</strong>
                    <small>${escapeHtml(member.plan)} - ${formatMoney(member.price)}</small>
                </div>
            </div>

            <div class="member-code-pass" aria-label="كود اللاعب">
                <span>كود العضوية</span>
                <strong>${escapeHtml(member.code)}</strong>
                <div class="pass-bars" aria-hidden="true"></div>
            </div>

            <div class="member-portal-stats">
                <span><small>المتبقي</small><strong>${remainingDays.toLocaleString("ar-EG")} / ${totalDays.toLocaleString("ar-EG")}</strong></span>
                <span><small>الحضور</small><strong>${attendanceCount.toLocaleString("ar-EG")}</strong></span>
                <span><small>آخر حضور</small><strong>${escapeHtml(lastAttendance)}</strong></span>
            </div>

            <div class="member-portal-actions">
                <button type="button" data-renewal-member-id="${escapeHtml(member.id)}">طلب تجديد</button>
                ${renewalHref ? `<a href="${escapeHtml(renewalHref)}" target="_blank" rel="noopener">واتساب الجيم</a>` : ""}
            </div>

            <section class="portal-attendance-log" aria-label="سجل حضور اللاعب">
                <h3>سجل الحضور</h3>
                ${renderPortalAttendance(member)}
            </section>
        </article>
    `;
}

function setMemberPortalMessage(message, type = "info") {
    if (!memberPortalMessage) return;
    memberPortalMessage.textContent = message;
    memberPortalMessage.dataset.type = type;
}

function updateInstallPromptUi() {
    const standalone = window.matchMedia?.("(display-mode: standalone)")?.matches || navigator.standalone;
    if (!installStrip || !installAppBtn) return;

    installStrip.hidden = standalone || !deferredInstallPrompt;
    installAppBtn.disabled = !deferredInstallPrompt;
}

function focusMemberPortal() {
    if (memberPortalQuery) {
        setTimeout(() => memberPortalQuery.focus(), 80);
    }
}

function countAttendanceInMonth(member, monthKey) {
    return (member.attendanceLog || []).filter((entry) => getMonthKey(entry.at || entry) === monthKey).length;
}

function getMeasurementForMonth(member, monthKey) {
    const measurement = (member.measurementLog || [])
        .filter((entry) => entry.month <= monthKey)
        .at(-1);

    return measurement || {
        month: monthKey,
        weight: toMeasurementValue(member.weight),
        height: toMeasurementValue(member.height),
        note: ""
    };
}

function formatDelta(value, unit) {
    const number = Math.round(Number(value || 0) * 10) / 10;
    if (!number) {
        return `بدون تغيير`;
    }

    return `${number > 0 ? "+" : ""}${number.toLocaleString("ar-EG")} ${unit}`;
}

function updateProgressMemberOptions() {
    if (!progressMemberSelect) return;

    const selectedValue = progressMemberSelect.value;
    progressMemberSelect.innerHTML = `<option value="">اختار لاعب</option>${membersCache.map((member) => (
        `<option value="${escapeHtml(member.id)}">${escapeHtml(member.name)} - ${escapeHtml(member.code)}</option>`
    )).join("")}`;

    if (membersCache.some((member) => member.id === selectedValue)) {
        progressMemberSelect.value = selectedValue;
    }
}

function renderProgressSummary() {
    if (!progressSummaryGrid) return;

    updateProgressMemberOptions();
    const monthKey = progressMonth?.value || getMonthKey();
    const previousMonthKey = getPreviousMonthKey(monthKey);

    if (!membersCache.length) {
        progressSummaryGrid.innerHTML = `<article class="empty-progress-card">سجل لاعبين أولا عشان تتابع التقدم الشهري.</article>`;
        return;
    }

    const reminderDays = toPositiveInteger(settingsCache.expiryReminderDays, 7);
    const activeCount = membersCache.filter((member) => toPositiveInteger(member.remainingDays, 0) > reminderDays).length;
    const expiringCount = membersCache.filter((member) => {
        const remainingDays = toPositiveInteger(member.remainingDays, 0);
        return remainingDays > 0 && remainingDays <= reminderDays;
    }).length;
    const expiredCount = membersCache.filter((member) => toPositiveInteger(member.remainingDays, 0) <= 0).length;
    const monthAttendance = membersCache.reduce((total, member) => total + countAttendanceInMonth(member, monthKey), 0);
    const overview = `
        <article class="progress-card report-overview-card">
            <div>
                <strong>ملخص ${formatMonthLabel(monthKey)}</strong>
                <span>قراءة سريعة لحالة الجيم قبل تفاصيل كل لاعب</span>
            </div>
            <dl>
                <div><dt>نشط</dt><dd>${activeCount.toLocaleString("ar-EG")} مشترك</dd></div>
                <div><dt>قرب الانتهاء</dt><dd>${expiringCount.toLocaleString("ar-EG")} مشترك</dd></div>
                <div><dt>منتهي</dt><dd>${expiredCount.toLocaleString("ar-EG")} مشترك</dd></div>
                <div><dt>حضور الشهر</dt><dd>${monthAttendance.toLocaleString("ar-EG")} مرة</dd></div>
            </dl>
        </article>
    `;

    progressSummaryGrid.innerHTML = overview + membersCache.map((member) => {
        const currentMeasurement = getMeasurementForMonth(member, monthKey);
        const previousMeasurement = getMeasurementForMonth(member, previousMonthKey);
        const currentAttendance = countAttendanceInMonth(member, monthKey);
        const previousAttendance = countAttendanceInMonth(member, previousMonthKey);
        const attendanceDelta = currentAttendance - previousAttendance;
        const weightDelta = currentMeasurement.weight - previousMeasurement.weight;
        const heightDelta = currentMeasurement.height - previousMeasurement.height;

        return `
            <article class="progress-card">
                <div>
                    <strong>${escapeHtml(member.name)}</strong>
                    <span>${formatMonthLabel(monthKey)} مقارنة بـ ${formatMonthLabel(previousMonthKey)}</span>
                </div>
                <dl>
                    <div>
                        <dt>الوزن</dt>
                        <dd>${formatMeasurement(currentMeasurement.weight, "كجم")} <small>${formatDelta(weightDelta, "كجم")}</small></dd>
                    </div>
                    <div>
                        <dt>الطول</dt>
                        <dd>${formatMeasurement(currentMeasurement.height, "سم")} <small>${formatDelta(heightDelta, "سم")}</small></dd>
                    </div>
                    <div>
                        <dt>الالتزام</dt>
                        <dd>${currentAttendance.toLocaleString("ar-EG")} حضور <small>${formatDelta(attendanceDelta, "مرة")}</small></dd>
                    </div>
                </dl>
                ${currentMeasurement.note ? `<p>${escapeHtml(currentMeasurement.note)}</p>` : ""}
            </article>
        `;
    }).join("");
}

function fillProgressFieldsFromMember() {
    const member = membersCache.find((item) => item.id === progressMemberSelect?.value);
    if (!member) return;
    const currentMeasurement = getMeasurementForMonth(member, progressMonth?.value || getMonthKey());

    if (progressWeight) {
        progressWeight.value = currentMeasurement.weight || member.weight || "";
    }
    if (progressHeight) {
        progressHeight.value = currentMeasurement.height || member.height || "";
    }
}

function setCameraMessage(message, type = "info") {
    if (!cameraMessage) return;
    cameraMessage.textContent = message;
    cameraMessage.dataset.type = type;
}

function setCameraState(isActive) {
    if (memberCamera) {
        memberCamera.hidden = !isActive;
        if (memberCameraFacingMode === "user") {
            memberCamera.classList.add("camera-mirror");
        } else {
            memberCamera.classList.remove("camera-mirror");
        }
    }
    if (capturePhotoBtn) {
        capturePhotoBtn.disabled = !isActive;
    }
    if (stopCameraBtn) {
        stopCameraBtn.disabled = !isActive;
    }
    if (startCameraBtn) {
        startCameraBtn.disabled = isActive;
    }
    updateCameraFacingButtons();
}

function getUserMediaCompat(constraints) {
    if (navigator.mediaDevices?.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    const legacyGetUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;

    if (!legacyGetUserMedia) {
        return Promise.reject(new Error("getUserMedia is not supported."));
    }

    return new Promise((resolve, reject) => {
        legacyGetUserMedia.call(navigator, constraints, resolve, reject);
    });
}

function isLocalhostPage() {
    return location.protocol === "file:" || ["localhost", "127.0.0.1", "::1"].includes(location.hostname);
}

async function startMemberCamera() {
    if (!navigator.mediaDevices?.getUserMedia && !navigator.getUserMedia && !navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
        setCameraMessage("المتصفح لا يدعم تشغيل الكاميرا من هنا. استخدم Chrome أو Edge وافتح الصفحة من localhost.", "error");
        return;
    }

    setCameraMessage("جاري طلب إذن الكاميرا من المتصفح...");

    const cameraOptions = await buildCameraOptionsAsync(memberCameraFacingMode);
    let lastError = null;

    try {
        stopAttendanceCamera();
        stopMemberCamera();

        for (const constraints of cameraOptions) {
            try {
                cameraStream = await getUserMediaCompat(constraints);
                break;
            } catch (error) {
                lastError = error;
            }
        }

        if (!cameraStream) {
            throw lastError || new Error("Camera did not start.");
        }

        if (memberCamera) {
            memberCamera.srcObject = cameraStream;
            setCameraState(true);
            try {
                await memberCamera.play();
            } catch (playError) {
                console.warn("memberCamera.play() note:", playError);
            }
        }

        setCameraMessage(`${getCameraFacingLabel(memberCameraFacingMode)} شغالة. ظبط الصورة في الإطار واضغط التقاط وتحسين.`);
    } catch (error) {
        const denied = error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError";
        const busy = error?.name === "NotReadableError" || error?.name === "TrackStartError";
        const missing = error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError";
        const insecure = !window.isSecureContext && !isLocalhostPage();

        let message = "تعذر تشغيل الكاميرا. افتح Zahran Informa Desktop أو استخدم رفع صورة.";
        if (insecure) {
            message = "المتصفح يمنع الكاميرا على روابط HTTP المحلية غير الآمنة. افتح التطبيق المكتبي أو استخدم localhost أو ارفع صورة.";
        } else if (denied) {
            message = "المتصفح رفض إذن الكاميرا. اضغط علامة القفل بجانب الرابط، اسمح بالكاميرا، ثم جرب تاني.";
        } else if (busy) {
            message = "الكاميرا مستخدمة في برنامج تاني. اقفل البرنامج الآخر ثم جرب تاني.";
        } else if (missing) {
            message = "لم يتم العثور على كاميرا متصلة. وصل الكاميرا أو ارفع صورة.";
        }

        setCameraMessage(message, "error");
        setCameraState(false);
    }
}

function stopMemberCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
        cameraStream = null;
    }

    if (memberCamera) {
        memberCamera.pause();
        memberCamera.srcObject = null;
    }

    setCameraState(false);
}

function stopAttendanceCamera() {
    if (attendanceCameraStream) {
        attendanceCameraStream.getTracks().forEach((track) => track.stop());
        attendanceCameraStream = null;
    }

    if (quickAttendanceCamera) {
        quickAttendanceCamera.pause();
        quickAttendanceCamera.srcObject = null;
    }

    setAttendanceCameraState(false);
}

async function switchMemberCamera() {
    const wasActive = Boolean(cameraStream);
    memberCameraFacingMode = toggleCameraFacingMode(memberCameraFacingMode);
    updateCameraFacingButtons();

    if (wasActive) {
        setCameraMessage(`جاري التبديل إلى ${getCameraFacingLabel(memberCameraFacingMode)}...`);
        await startMemberCamera();
        return;
    }

    setCameraMessage(`تم اختيار ${getCameraFacingLabel(memberCameraFacingMode)}. اضغط فتح الكاميرا.`);
}

async function switchAttendanceCamera() {
    const wasActive = Boolean(attendanceCameraStream);
    attendanceCameraFacingMode = toggleCameraFacingMode(attendanceCameraFacingMode);
    updateCameraFacingButtons();

    if (wasActive) {
        setAttendanceCameraMessage(`جاري التبديل إلى ${getCameraFacingLabel(attendanceCameraFacingMode)}...`);
        await startAttendanceCamera();
        return;
    }

    setAttendanceCameraMessage(`تم اختيار ${getCameraFacingLabel(attendanceCameraFacingMode)}. اضغط فتح كاميرا الحضور.`);
}

async function startAttendanceCamera() {
    if (!navigator.mediaDevices?.getUserMedia && !navigator.getUserMedia && !navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
        setAttendanceCameraMessage("المتصفح لا يدعم تشغيل الكاميرا. استخدم Chrome أو Edge.", "error");
        return;
    }

    setAttendanceCameraMessage("جاري طلب إذن كاميرا الحضور...");

    const cameraOptions = await buildCameraOptionsAsync(attendanceCameraFacingMode);
    let lastError = null;

    try {
        stopMemberCamera();
        stopAttendanceCamera();

        for (const constraints of cameraOptions) {
            try {
                attendanceCameraStream = await getUserMediaCompat(constraints);
                break;
            } catch (error) {
                lastError = error;
            }
        }

        if (!attendanceCameraStream) {
            throw lastError || new Error("Attendance camera did not start.");
        }

        if (quickAttendanceCamera) {
            quickAttendanceCamera.srcObject = attendanceCameraStream;
            setAttendanceCameraState(true);
            try {
                await quickAttendanceCamera.play();
            } catch (playError) {
                console.warn("quickAttendanceCamera.play() note:", playError);
            }
        }

        setAttendanceCameraMessage(`${getCameraFacingLabel(attendanceCameraFacingMode)} شغالة للحضور. التقط الصورة ثم سجل الحضور.`);
    } catch (error) {
        const denied = error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError";
        const busy = error?.name === "NotReadableError" || error?.name === "TrackStartError";
        const missing = error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError";
        const insecure = !window.isSecureContext && !isLocalhostPage();

        let message = "تعذر تشغيل كاميرا الحضور. جرب رفع صورة حضور.";
        if (insecure) {
            message = "المتصفح يمنع الكاميرا على روابط HTTP المحلية غير الآمنة. افتح التطبيق المكتبي أو استخدم localhost أو ارفع صورة.";
        } else if (denied) {
            message = "المتصفح رفض إذن الكاميرا. اسمح بالكاميرا من شريط العنوان وجرب تاني.";
        } else if (busy) {
            message = "الكاميرا مستخدمة في برنامج تاني. اقفله أو ارفع صورة حضور.";
        } else if (missing) {
            message = "لا توجد كاميرا متصلة. وصل الكاميرا أو ارفع صورة حضور.";
        }

        setAttendanceCameraMessage(message, "error");
        setAttendanceCameraState(false);
    }
}

async function detectFaceBox(sourceCanvas) {
    if (!("FaceDetector" in window)) {
        return null;
    }

    try {
        const detector = new FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
        const faces = await detector.detect(sourceCanvas);
        return faces[0]?.boundingBox || null;
    } catch {
        return null;
    }
}

function getSmartCrop(sourceWidth, sourceHeight, faceBox) {
    const cropSize = Math.min(sourceWidth, sourceHeight);

    if (!faceBox) {
        return {
            x: Math.max(0, (sourceWidth - cropSize) / 2),
            y: Math.max(0, (sourceHeight - cropSize) / 2),
            size: cropSize
        };
    }

    const faceCenterX = faceBox.x + faceBox.width / 2;
    const faceCenterY = faceBox.y + faceBox.height / 2;
    const paddedSize = Math.min(
        Math.max(faceBox.width, faceBox.height) * 2.75,
        cropSize
    );
    const size = Math.min(cropSize, Math.max(320, paddedSize));

    return {
        x: Math.min(Math.max(0, faceCenterX - size / 2), sourceWidth - size),
        y: Math.min(Math.max(0, faceCenterY - size * 0.45), sourceHeight - size),
        size
    };
}

async function enhanceSourceCanvas(sourceCanvas, successMessage = "تم تحسين الصورة تلقائيًا.") {
    if (!memberPhotoCanvas || !memberPhotoData || !memberPhotoPreview) return;

    const videoWidth = sourceCanvas.width;
    const videoHeight = sourceCanvas.height;
    const signatureResult = await createFaceSignature(sourceCanvas);
    const faceBox = await detectFaceBox(sourceCanvas);
    const crop = getSmartCrop(videoWidth, videoHeight, faceBox);
    const outputSize = 640;
    memberPhotoCanvas.width = outputSize;
    memberPhotoCanvas.height = outputSize;

    const outputContext = memberPhotoCanvas.getContext("2d");
    outputContext.imageSmoothingEnabled = true;
    outputContext.imageSmoothingQuality = "high";
    outputContext.filter = "brightness(1.08) contrast(1.12) saturate(1.08)";
    outputContext.drawImage(
        sourceCanvas,
        crop.x,
        crop.y,
        crop.size,
        crop.size,
        0,
        0,
        outputSize,
        outputSize
    );

    outputContext.filter = "none";
    outputContext.globalCompositeOperation = "overlay";
    outputContext.globalAlpha = 0.08;
    outputContext.drawImage(memberPhotoCanvas, -1, -1, outputSize + 2, outputSize + 2);
    outputContext.globalCompositeOperation = "source-over";
    outputContext.globalAlpha = 1;

    const photoData = memberPhotoCanvas.toDataURL("image/jpeg", 0.86);
    memberPhotoData.value = photoData;
    memberPhotoPreview.src = photoData;
    memberPhotoPreview.hidden = false;
    photoPreview?.querySelector("span")?.setAttribute("hidden", "");
    latestMemberFaceSignature = signatureResult.signature;
    setCameraMessage(faceBox ? "تم تحسين الصورة مع تركيز تلقائي على الوجه." : successMessage);
}

async function captureEnhancedMemberPhoto() {
    if (!memberCamera) return;

    const videoWidth = memberCamera.videoWidth;
    const videoHeight = memberCamera.videoHeight;

    if (!videoWidth || !videoHeight) {
        setCameraMessage("استنى لحظة لحد ما صورة الكاميرا تظهر بوضوح.", "error");
        return;
    }

    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = videoWidth;
    sourceCanvas.height = videoHeight;
    const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
    sourceContext.drawImage(memberCamera, 0, 0, videoWidth, videoHeight);

    await enhanceSourceCanvas(sourceCanvas, "تم التقاط الصورة وتحسينها تلقائيًا.");
}

function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file);

        image.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(image);
        };
        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Image failed to load."));
        };
        image.src = objectUrl;
    });
}

function loadImageFromDataUrl(dataUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = dataUrl;
    });
}

function parseFaceSignature(signature) {
    if (!signature) {
        return [];
    }

    return String(signature)
        .split(",")
        .map(Number)
        .filter((value) => Number.isFinite(value));
}

function compareFaceSignatures(firstSignature, secondSignature) {
    const first = parseFaceSignature(firstSignature);
    const second = parseFaceSignature(secondSignature);

    if (!first.length || first.length !== second.length) {
        return 0;
    }

    let dot = 0;
    let firstNorm = 0;
    let secondNorm = 0;

    for (let index = 0; index < first.length; index += 1) {
        dot += first[index] * second[index];
        firstNorm += first[index] ** 2;
        secondNorm += second[index] ** 2;
    }

    if (!firstNorm || !secondNorm) {
        return 0;
    }

    const cosine = dot / (Math.sqrt(firstNorm) * Math.sqrt(secondNorm));
    return Math.round(Math.max(0, Math.min(100, ((cosine + 1) / 2) * 100)));
}

async function createFaceSignature(sourceCanvas) {
    const faceBox = await detectFaceBox(sourceCanvas);
    const crop = getSmartCrop(sourceCanvas.width, sourceCanvas.height, faceBox);
    const signatureSize = 16;
    const signatureCanvas = document.createElement("canvas");
    signatureCanvas.width = signatureSize;
    signatureCanvas.height = signatureSize;
    const signatureContext = signatureCanvas.getContext("2d", { willReadFrequently: true });

    signatureContext.imageSmoothingEnabled = true;
    signatureContext.imageSmoothingQuality = "high";
    signatureContext.filter = "grayscale(1) contrast(1.12)";
    signatureContext.drawImage(
        sourceCanvas,
        crop.x,
        crop.y,
        crop.size,
        crop.size,
        0,
        0,
        signatureSize,
        signatureSize
    );

    const imageData = signatureContext.getImageData(0, 0, signatureSize, signatureSize).data;
    const values = [];

    for (let index = 0; index < imageData.length; index += 4) {
        values.push(imageData[index]);
    }

    const mean = values.reduce((total, value) => total + value, 0) / values.length;
    const variance = values.reduce((total, value) => total + ((value - mean) ** 2), 0) / values.length;
    const standardDeviation = Math.sqrt(variance) || 1;
    const normalized = values.map((value) => Math.round(((value - mean) / standardDeviation) * 100));

    return {
        signature: normalized.join(","),
        faceDetected: Boolean(faceBox)
    };
}

async function createFaceSignatureFromDataUrl(dataUrl) {
    if (!dataUrl) {
        return "";
    }

    const image = await loadImageFromDataUrl(dataUrl);
    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = image.naturalWidth || image.width;
    sourceCanvas.height = image.naturalHeight || image.height;
    const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
    sourceContext.drawImage(image, 0, 0, sourceCanvas.width, sourceCanvas.height);
    const result = await createFaceSignature(sourceCanvas);
    return result.signature;
}

async function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        setCameraMessage("اختار ملف صورة فقط.", "error");
        return;
    }

    try {
        setCameraMessage("جاري تحسين الصورة المختارة...");
        const image = await loadImageFromFile(file);
        const sourceCanvas = document.createElement("canvas");
        sourceCanvas.width = image.naturalWidth || image.width;
        sourceCanvas.height = image.naturalHeight || image.height;
        const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
        sourceContext.drawImage(image, 0, 0, sourceCanvas.width, sourceCanvas.height);
        await enhanceSourceCanvas(sourceCanvas, "تم رفع الصورة وتحسينها تلقائيًا.");
    } catch {
        setCameraMessage("تعذر قراءة الصورة المختارة. جرب صورة تانية.", "error");
    } finally {
        event.target.value = "";
    }
}

async function createEnhancedAttendancePhoto(sourceCanvas) {
    if (!quickAttendanceCanvas) return null;

    const sourceWidth = sourceCanvas.width;
    const sourceHeight = sourceCanvas.height;
    const signatureResult = await createFaceSignature(sourceCanvas);
    const faceBox = await detectFaceBox(sourceCanvas);
    const crop = getSmartCrop(sourceWidth, sourceHeight, faceBox);
    const outputSize = 640;
    quickAttendanceCanvas.width = outputSize;
    quickAttendanceCanvas.height = outputSize;

    const outputContext = quickAttendanceCanvas.getContext("2d");
    outputContext.imageSmoothingEnabled = true;
    outputContext.imageSmoothingQuality = "high";
    outputContext.filter = "brightness(1.08) contrast(1.12) saturate(1.08)";
    outputContext.drawImage(
        sourceCanvas,
        crop.x,
        crop.y,
        crop.size,
        crop.size,
        0,
        0,
        outputSize,
        outputSize
    );

    outputContext.filter = "none";
    return {
        photoData: quickAttendanceCanvas.toDataURL("image/jpeg", 0.84),
        faceSignature: signatureResult.signature,
        faceDetected: Boolean(faceBox)
    };
}

async function captureAttendancePhoto() {
    if (!quickAttendanceCamera) return;

    const videoWidth = quickAttendanceCamera.videoWidth;
    const videoHeight = quickAttendanceCamera.videoHeight;

    if (!videoWidth || !videoHeight) {
        setAttendanceCameraMessage("استنى لحظة لحد ما صورة كاميرا الحضور تظهر.", "error");
        return;
    }

    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = videoWidth;
    sourceCanvas.height = videoHeight;
    const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
    sourceContext.drawImage(quickAttendanceCamera, 0, 0, videoWidth, videoHeight);

    const result = await createEnhancedAttendancePhoto(sourceCanvas);
    if (!result) return;

    setAttendancePhoto(result.photoData, result.faceSignature);
    setAttendanceCameraMessage(result.faceDetected ? "تم التقاط صورة الحضور وتحسينها مع تركيز على الوجه." : "تم التقاط صورة الحضور وتحسينها.");
    await recognizeMemberFromAttendancePhoto(result.faceSignature);
}

async function handleAttendancePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        setAttendanceCameraMessage("اختار ملف صورة فقط.", "error");
        return;
    }

    try {
        setAttendanceCameraMessage("جاري تحسين صورة الحضور المختارة...");
        const image = await loadImageFromFile(file);
        const sourceCanvas = document.createElement("canvas");
        sourceCanvas.width = image.naturalWidth || image.width;
        sourceCanvas.height = image.naturalHeight || image.height;
        const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
        sourceContext.drawImage(image, 0, 0, sourceCanvas.width, sourceCanvas.height);
        const result = await createEnhancedAttendancePhoto(sourceCanvas);
        if (!result) return;
        setAttendancePhoto(result.photoData, result.faceSignature);
        setAttendanceCameraMessage(result.faceDetected ? "تم رفع صورة الحضور وتحسينها مع تركيز على الوجه." : "تم رفع صورة الحضور وتحسينها.");
        await recognizeMemberFromAttendancePhoto(result.faceSignature);
    } catch {
        setAttendanceCameraMessage("تعذر قراءة صورة الحضور. جرب صورة تانية.", "error");
    } finally {
        event.target.value = "";
    }
}

async function recognizeMemberFromAttendancePhoto(faceSignature) {
    if (!faceSignature || !membersCache.length) return null;

    let bestMatch = null;
    let highestScore = 0;

    for (const member of membersCache) {
        if (!member.faceSignature) continue;
        const score = compareFaceSignatures(faceSignature, member.faceSignature);
        if (score > highestScore && score >= 65) {
            highestScore = score;
            bestMatch = member;
        }
    }

    if (bestMatch && quickAttendanceQuery) {
        quickAttendanceQuery.value = bestMatch.code || bestMatch.phone || bestMatch.name;
        setQuickAttendanceMessage(`تم التعرف تلقائيًا على الوجه: ${bestMatch.name} (دقة ${highestScore}%)`, "success");
    }

    return bestMatch;
}

function applySettingsToUi() {
    brandName.textContent = settingsCache.gymName || "Zahran Informa";
    settingsPreviewName.textContent = settingsCache.gymName || "Zahran Informa";
    settingsPreviewPrefix.textContent = settingsCache.memberCodePrefix || "ZI";
    updateConnectionStatus();

    if (planSelect && settingsCache.defaultPlan) {
        planSelect.value = settingsCache.defaultPlan;
        applyPlanDefaultsToForm();
    }

    if (!settingsForm) return;
    Object.entries(settingsCache).forEach(([key, value]) => {
        const field = settingsForm.elements.namedItem(key);
        if (field) {
            field.value = value ?? "";
        }
    });

    if (syncTokenInput) {
        syncTokenInput.value = "";
        syncTokenInput.placeholder = getSyncAccountToken()
            ? "مفتاح محفوظ على هذا الجهاز - اكتب مفتاح جديد للتغيير"
            : "اكتب نفس المفتاح على كل الأجهزة";
    }
    if (syncTokenStatus) {
        syncTokenStatus.textContent = getSyncAccountToken() || settingsCache.syncTokenConfigured
            ? "مفتاح المزامنة محفوظ. استخدم نفس الإيميل ونفس المفتاح على أي جهاز جديد."
            : "لسه مفيش مفتاح مزامنة. ولّد مفتاح واحفظه قبل ربط جهاز تاني.";
    }
}

function refreshModalOpenState() {
    const hasOpenModal = [membersLockModal, editMemberModal, renewMemberModal]
        .filter(Boolean)
        .some((modal) => !modal.hidden);
    document.body.classList.toggle("modal-open", hasOpenModal);
}

function setEditMemberPhoto(photoData) {
    if (!editMemberPhotoData || !editMemberPhotoImg) return;
    const hasPhoto = Boolean(photoData);
    editMemberPhotoData.value = photoData || "";
    editMemberPhotoImg.src = photoData || "";
    editMemberPhotoImg.hidden = !hasPhoto;
    if (editMemberPhotoPlaceholder) editMemberPhotoPlaceholder.hidden = hasPhoto;
    if (editMemberPhotoClear) editMemberPhotoClear.hidden = !hasPhoto;
}

function openEditMember(memberId) {
    const member = membersCache.find((item) => item.id === memberId);
    if (!member || !editMemberForm || !editMemberModal) return;

    editMemberForm.reset();
    editMemberId.value = member.id;
    editMemberForm.elements.namedItem("code").value = member.code || "";
    editMemberForm.elements.namedItem("name").value = member.name || "";
    editMemberForm.elements.namedItem("phone").value = member.phone || "";
    editMemberForm.elements.namedItem("weight").value = member.weight || "";
    editMemberForm.elements.namedItem("height").value = member.height || "";
    editMemberPlan.value = normalizePlanValue(member.plan);
    editMemberPrice.value = toMoneyValue(member.price) || "";
    editMemberRemainingDays.value = toPositiveInteger(member.remainingDays, 0);
    if (editMemberMessage) editMemberMessage.textContent = "";

    // Load existing member photo
    setEditMemberPhoto(member.photo || "");
    if (editMemberPhotoUpload) editMemberPhotoUpload.value = "";

    editMemberModal.hidden = false;
    refreshModalOpenState();
    setTimeout(() => editMemberForm.elements.namedItem("name")?.focus(), 50);
}

function closeEditMember() {
    if (!editMemberModal) return;
    editMemberModal.hidden = true;
    if (editMemberMessage) editMemberMessage.textContent = "";
    setEditMemberPhoto("");
    if (editMemberPhotoUpload) editMemberPhotoUpload.value = "";
    refreshModalOpenState();
}

function applyRenewDefaults(force = false) {
    if (!renewPlanSelect || !renewDaysInput) return;

    const defaults = getPlanDefaults(renewPlanSelect.value);
    if (force || !renewDaysInput.value) {
        renewDaysInput.value = defaults.days || 1;
    }
}

function openRenewMember(memberId, requestId = "") {
    const member = membersCache.find((item) => item.id === memberId);
    if (!member || !renewMemberForm || !renewMemberModal) return;

    renewMemberForm.reset();
    renewMemberId.value = member.id;
    if (renewRequestId) renewRequestId.value = requestId || "";
    if (renewMemberName) {
        renewMemberName.textContent = `${member.name} - ${member.code}`;
    }
    renewPlanSelect.value = normalizePlanValue(member.plan);
    renewPriceInput.value = toMoneyValue(member.price) || "";
    applyRenewDefaults(true);
    if (renewMemberMessage) renewMemberMessage.textContent = "";

    renewMemberModal.hidden = false;
    refreshModalOpenState();
    setTimeout(() => renewDaysInput?.focus(), 50);
}

function closeRenewMember() {
    if (!renewMemberModal) return;
    renewMemberModal.hidden = true;
    if (renewMemberMessage) renewMemberMessage.textContent = "";
    refreshModalOpenState();
}

function setSidebarOpen(isOpen) {
    document.body.classList.toggle("sidebar-open", Boolean(isOpen));
    menuToggleBtn?.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (sidebarBackdrop) {
        sidebarBackdrop.hidden = !isOpen;
    }
}

function closeSidebar() {
    setSidebarOpen(false);
}

function getPageRoute(pageName) {
    return PAGE_ROUTES[pageName] || PAGE_ROUTES.dashboard;
}

function getSettingsToolElements() {
    const selectors = [...new Set(Object.values(SETTINGS_PAGE_GROUPS).flat())];
    return selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)));
}

function applySettingsToolPage(toolPage = "settings") {
    const activeSelectors = SETTINGS_PAGE_GROUPS[toolPage] || SETTINGS_PAGE_GROUPS.settings;
    const allElements = getSettingsToolElements();

    allElements.forEach((element) => {
        element.hidden = true;
    });

    activeSelectors
        .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
        .forEach((element) => {
            element.hidden = false;
        });
}

function findMemberForRenewalRequest(request) {
    return membersCache.find((member) => member.id === request.memberId)
        || membersCache.find((member) => member.code === request.memberCode)
        || null;
}

function showPage(pageName) {
    const route = getPageRoute(pageName);
    const canonicalPage = route.page;
    const activePageName = route.navKey || pageName;
    closeSidebar();

    if (canonicalPage !== "subscriptions") {
        stopMemberCamera();
    }
    if (canonicalPage !== "attendance") {
        stopAttendanceCamera();
    }

    pageSections.forEach((section) => {
        section.hidden = section.dataset.page !== canonicalPage;
    });

    if (canonicalPage === "settings") {
        applySettingsToolPage(route.toolPage || "settings");
    }

    pageLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.pageLink === activePageName);
    });

    pageTitle.textContent = route.title || `إضافة مشترك جديد ${settingsCache.gymName || "Zahran Informa"}`;
    history.replaceState(null, "", `#${activePageName}`);

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function openMembersLock() {
    if (!membersLockModal) return;

    membersLockModal.hidden = false;
    refreshModalOpenState();
    if (membersLockMessage) {
        membersLockMessage.textContent = "";
    }
    if (membersLockPassword) {
        membersLockPassword.value = "";
        setTimeout(() => membersLockPassword.focus(), 50);
    }
}

function closeMembersLock() {
    if (!membersLockModal) return;

    membersLockModal.hidden = true;
    refreshModalOpenState();
}

async function openMembersPageAfterPassword() {
    await loadMembers();
    renderMembers();
    showPage("members");
}

async function navigateToPage(pageName) {
    const route = getPageRoute(pageName);

    if (route.page === "members") {
        await openMembersPageAfterPassword();
        return;
    }

    if (["dashboard", "attendance", "sessions", "subscriptions"].includes(route.page)) {
        await loadMembers();
        renderMembers();
        renderProgressSummary();
    }

    if (route.page === "settings") {
        await loadMembers();
        renderMembers();
        renderProgressSummary();
        await loadRenewalRequests();
        renderRenewalRequests();
        applyFinanceLockUi();
        if (sessionStorage.getItem(FINANCE_SESSION_KEY) === "true" && isFinanceConfigured() && isFinanceManagerConfigured()) {
            await loadFinanceEntries();
            renderFinance();
        }
        syncOfflineQueue();
    }

    showPage(pageName);
}

async function openCurrentOwnerPage() {
    const requestedPage = location.hash.replace("#", "") || "dashboard";
    await navigateToPage(PAGE_ROUTES[requestedPage] ? requestedPage : "dashboard");
}

async function registerAttendance(memberId, attendancePhoto = "", attendanceFaceSignature = "") {
    const member = membersCache.find((item) => item.id === memberId);
    if (!member) {
        return {
            ok: false,
            message: "لم يتم العثور على اللاعب."
        };
    }

    const remainingDays = toPositiveInteger(member.remainingDays, 0);
    if (remainingDays <= 0) {
        return {
            ok: false,
            member,
            message: "اشتراك اللاعب انتهى ولا يوجد أيام متبقية."
        };
    }

    const attendanceAt = new Date().toISOString();
    await updateMember({
        ...member,
        remainingDays,
        attendanceCount: toPositiveInteger(member.attendanceCount, 0) + 1,
        lastAttendanceAt: attendanceAt,
        attendanceLog: [
            ...(member.attendanceLog || []),
            {
                at: attendanceAt,
                photo: String(attendancePhoto || "").trim(),
                faceSignature: String(attendanceFaceSignature || "").trim()
            }
        ]
    });

    renderMembers();
    renderProgressSummary();

    const updatedMember = membersCache.find((item) => item.id === memberId);
    return {
        ok: true,
        member: updatedMember,
        message: `تم تسجيل حضور ${updatedMember?.name || "اللاعب"}${attendancePhoto ? " مع صورة" : ""}. المتبقي ${toPositiveInteger(updatedMember?.remainingDays, 0).toLocaleString("ar-EG")} يوم.`
    };
}

ownerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const ownerCode = ownerCodeInput.value.trim();

    if (ownerCode.length < 4) {
        ownerMessage.textContent = "الكود لازم يكون 4 حروف أو أرقام على الأقل.";
        return;
    }

    const enteredHash = await hashText(ownerCode);

    if (!isOwnerConfigured()) {
        localStorage.setItem(OWNER_HASH_KEY, enteredHash);
        ownerMessage.textContent = "تم إنشاء كود المالك. متنساهوش.";
        ownerCodeInput.value = "";
        await unlockApp();
        await openCurrentOwnerPage();
        return;
    }

    const savedHash = localStorage.getItem(OWNER_HASH_KEY);
    if (enteredHash !== savedHash) {
        ownerMessage.textContent = "كود الدخول غير صحيح.";
        ownerCodeInput.value = "";
        return;
    }

    ownerCodeInput.value = "";
    await unlockApp();
    await openCurrentOwnerPage();
});

ownerBiometricLogin?.addEventListener("click", async () => {
    if (biometricLoginMessage) {
        biometricLoginMessage.textContent = "جاري فتح البصمة...";
        biometricLoginMessage.dataset.type = "info";
    }

    const ok = await authenticateOwnerWithBiometric();
    if (!ok) {
        if (biometricLoginMessage) {
            biometricLoginMessage.textContent = "لم يتم تأكيد البصمة. استخدم كلمة السر.";
            biometricLoginMessage.dataset.type = "error";
        }
        return;
    }

    if (biometricLoginMessage) {
        biometricLoginMessage.textContent = "";
    }
    await unlockApp();
    await openCurrentOwnerPage();
});

logoutBtn?.addEventListener("click", lockApp);

memberForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (settingsCache.registrationStatus === "closed") {
        newMemberCode.textContent = "التسجيل مغلق من الإعدادات";
        generatedCode.hidden = false;
        return;
    }

    const submitBtn = memberForm.querySelector('button[type="submit"]');
    if (submitBtn?.disabled) return;

    try {
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.textContent || "تسجيل المشترك";
            submitBtn.textContent = "جاري تسجيل المشترك...";
        }

        if (cameraStream) {
            if (!memberPhotoData?.value) {
                try {
                    await captureEnhancedMemberPhoto();
                } catch (e) {
                    console.warn("Auto-capture failed during submit:", e);
                }
            }
            stopMemberCamera();
        }

        const data = new FormData(memberForm);
        const memberWeight = toMeasurementValue(data.get("weight"));
        const memberHeight = toMeasurementValue(data.get("height"));
        const createdAt = new Date().toISOString();
        const subscriptionDays = toPositiveInteger(data.get("remainingDays"), getPlanDefaults(String(data.get("plan") || "").trim()).days);
        const subscriptionStartedAt = getTodayDateValue();
        const subscriptionEndsAt = addDaysToDateValue(subscriptionStartedAt, subscriptionDays);
        const manualCode = normalizeManualMemberCode(data.get("code"));
        const memberCode = manualCode || buildMemberCode(membersCache);
        const memberName = String(data.get("name") || "").trim() || `مشترك ${memberCode}`;

        if (isMemberCodeTaken(memberCode)) {
            const existingMember = membersCache.find(m => normalizeManualMemberCode(m.code).toLowerCase() === memberCode.toLowerCase());
            const existingName = existingMember ? ` (مخصص للمشترك: ${existingMember.name})` : "";
            newMemberCode.textContent = `الكود ده مستخدم قبل كده${existingName}. اكتب كود مختلف أو سيبه فاضي للتوليد التلقائي.`;
            generatedCode.hidden = false;
            return;
        }

        const member = {
            id: createId(),
            code: memberCode,
            name: memberName,
            phone: String(data.get("phone") || "").trim(),
            weight: memberWeight,
            height: memberHeight,
            plan: String(data.get("plan") || "").trim(),
            price: toMoneyValue(data.get("price")),
            subscriptionStartedAt,
            subscriptionEndsAt,
            totalDays: subscriptionDays,
            remainingDays: subscriptionDays,
            approvedForMemberApp: Boolean(data.get("approvedForMemberApp")),
            attendanceCount: 0,
            lastAttendanceAt: null,
            attendanceLog: [],
            measurementLog: [{
                month: getMonthKey(createdAt),
                weight: memberWeight,
                height: memberHeight,
                note: "قياس التسجيل",
                createdAt
            }],
            photo: String(data.get("photo") || "").trim(),
            faceSignature: latestMemberFaceSignature,
            photoEnhanced: Boolean(String(data.get("photo") || "").trim()),
            createdAt
        };

        let savedMember;
        try {
            savedMember = await saveMember(member);
        } catch (error) {
            newMemberCode.textContent = error?.status === 409
                ? "الكود ده مستخدم قبل كده على السيرفر. اكتب كود مختلف."
                : "تعذر حفظ المشترك. جرب تاني.";
            generatedCode.hidden = false;
            return;
        }

        let financeEntry = null;
        try {
            financeEntry = await recordNewMemberIncome(savedMember);
        } catch (finError) {
            console.warn("إشعارات الخزنة: تعذر تسجيل وارد المشترك تلقائياً", finError);
        }

        stopMemberCamera();
        memberForm.reset();
        const approvedCheckbox = document.getElementById("approved-for-member-app-checkbox");
        if (approvedCheckbox) approvedCheckbox.checked = true;
        planSelect.value = settingsCache.defaultPlan || "شهر";
        applyPlanDefaultsToForm(true);
        memberPhotoData.value = "";
        latestMemberFaceSignature = "";
        memberPhotoPreview.hidden = true;
        memberPhotoPreview.removeAttribute("src");
        photoPreview?.querySelector("span")?.removeAttribute("hidden");

        newMemberCode.textContent = financeEntry
            ? `تم تسجيل المشترك بنجاح! الكود: ${savedMember.code} (تم إضافة ${formatMoney(financeEntry.amount)} وارد في الخزنة)`
            : `تم تسجيل المشترك بنجاح! الكود: ${savedMember.code}`;
        generatedCode.hidden = false;
        renderMembers();
        renderProgressSummary();
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || "تسجيل المشترك";
        }
    }
});

const memberCodeInputElement = memberForm?.elements?.namedItem("code");
if (memberCodeInputElement) {
    memberCodeInputElement.addEventListener("input", () => {
        const val = normalizeManualMemberCode(memberCodeInputElement.value);
        if (!val) {
            if (generatedCode && newMemberCode.textContent.includes("مستخدم")) {
                newMemberCode.textContent = "";
                generatedCode.hidden = true;
            }
            return;
        }
        if (isMemberCodeTaken(val)) {
            const existingMember = membersCache.find(m => normalizeManualMemberCode(m.code).toLowerCase() === val.toLowerCase());
            const existingName = existingMember ? ` (${existingMember.name})` : "";
            newMemberCode.textContent = `الكود (${val}) مستخدم بالفعل${existingName}. اكتب كود مختلف أو اتركه فارغاً.`;
            generatedCode.hidden = false;
        } else {
            if (generatedCode && newMemberCode.textContent.includes("مستخدم")) {
                newMemberCode.textContent = "";
                generatedCode.hidden = true;
            }
        }
    });
}

memberPortalForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = memberPortalQuery?.value.trim() || "";

    if (!query) {
        setMemberPortalMessage("اكتب كود اللاعب أو رقم الهاتف.", "error");
        return;
    }

    await loadSettings();
    await loadMembers();
    const member = findMemberForPortal(query);

    if (!member) {
        if (memberPortalResult) memberPortalResult.innerHTML = "";
        setMemberPortalMessage("لم يتم العثور على لاعب بهذا الكود أو الرقم.", "error");
        return;
    }

    if (memberPortalResult) {
        memberPortalResult.innerHTML = renderMemberPortal(member);
    }
    setMemberPortalMessage("تم فتح كارت اللاعب.", "success");
});

memberPortalResult?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-renewal-member-id]");
    if (!button) return;

    const member = membersCache.find((item) => item.id === button.dataset.renewalMemberId);
    if (!member) {
        setMemberPortalMessage("لم يتم العثور على بيانات اللاعب.", "error");
        return;
    }

    button.disabled = true;
    button.textContent = "جاري الإرسال...";
    await saveRenewalRequest({
        memberId: member.id,
        memberCode: member.code,
        memberName: member.name,
        memberPhone: member.phone,
        plan: member.plan,
        remainingDays: member.remainingDays
    });
    renderRenewalRequests();
    button.textContent = "تم إرسال الطلب";
    setMemberPortalMessage(
        getSyncQueue().length ? "تم حفظ طلب التجديد وسيتزامن تلقائيًا." : "تم إرسال طلب التجديد.",
        "success"
    );
});

updateCameraFacingButtons();

startCameraBtn?.addEventListener("click", (event) => {
    event?.preventDefault();
    startMemberCamera();
});
switchCameraBtn?.addEventListener("click", (event) => {
    event?.preventDefault();
    switchMemberCamera();
});
stopCameraBtn?.addEventListener("click", (event) => {
    event?.preventDefault();
    stopMemberCamera();
    setCameraMessage("تم إيقاف الكاميرا.");
});
capturePhotoBtn?.addEventListener("click", (event) => {
    event?.preventDefault();
    captureEnhancedMemberPhoto();
});
photoUploadInput?.addEventListener("change", handlePhotoUpload);
nativePhotoCameraInput?.addEventListener("change", handlePhotoUpload);
startAttendanceCameraBtn?.addEventListener("click", startAttendanceCamera);
switchAttendanceCameraBtn?.addEventListener("click", switchAttendanceCamera);
captureAttendancePhotoBtn?.addEventListener("click", captureAttendancePhoto);
stopAttendanceCameraBtn?.addEventListener("click", () => {
    stopAttendanceCamera();
    setAttendanceCameraMessage("تم إيقاف كاميرا الحضور.");
});
clearAttendancePhotoBtn?.addEventListener("click", clearAttendancePhoto);
attendancePhotoUploadInput?.addEventListener("change", handleAttendancePhotoUpload);
nativeAttendanceCameraInput?.addEventListener("change", handleAttendancePhotoUpload);
window.addEventListener("beforeunload", () => {
    stopMemberCamera();
    stopAttendanceCamera();
});

let membersSearchDebounce;
searchInput?.addEventListener("input", () => {
    clearTimeout(membersSearchDebounce);
    membersSearchDebounce = setTimeout(renderMembersTable, 180);
});
planSelect?.addEventListener("change", () => applyPlanDefaultsToForm(true));
progressMonth?.addEventListener("change", renderProgressSummary);
progressMemberSelect?.addEventListener("change", fillProgressFieldsFromMember);

quickAttendanceForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = quickAttendanceQuery.value.trim();
    clearQuickAttendanceResult();

    if (!query) {
        setQuickAttendanceMessage("اكتب كود أو اسم أو رقم اللاعب.", "error");
        return;
    }

    await loadMembers();
    const matches = findAttendanceMatches(query);

    if (!matches.length) {
        setQuickAttendanceMessage("مفيش لاعب مطابق للبحث.", "error");
        return;
    }

    if (matches.length > 1) {
        setQuickAttendanceMessage(`تم العثور على ${matches.length.toLocaleString("ar-EG")} نتائج. اختار اللاعب من القائمة.`, "info");
        renderQuickAttendanceChoices(matches);
        return;
    }

    const result = await registerAttendance(matches[0].id, quickAttendancePhotoData?.value || "", latestAttendanceFaceSignature);
    setQuickAttendanceMessage(result.message, result.ok ? "success" : "error");
    if (result.member && quickAttendanceResult) {
        quickAttendanceResult.innerHTML = renderQuickAttendanceMember(result.member);
    }
    if (result.ok) {
        quickAttendanceQuery.value = "";
        clearAttendancePhoto();
    }
});

quickAttendanceResult?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-quick-attendance-id]");
    if (!button) return;

    button.disabled = true;
    const result = await registerAttendance(button.dataset.quickAttendanceId, quickAttendancePhotoData?.value || "", latestAttendanceFaceSignature);
    setQuickAttendanceMessage(result.message, result.ok ? "success" : "error");
    quickAttendanceResult.innerHTML = result.member ? renderQuickAttendanceMember(result.member) : "";
    if (result.ok && quickAttendanceQuery) {
        quickAttendanceQuery.value = "";
        clearAttendancePhoto();
    }
});

async function toggleMemberApproval(memberId) {
    const member = membersCache.find((item) => item.id === memberId);
    if (!member) return;

    const newApprovalState = !Boolean(member.approvedForMemberApp);

    if (apiAvailable && navigator.onLine !== false) {
        try {
            await apiRequest(`/api/members/${encodeURIComponent(memberId)}/approval`, {
                method: "PUT",
                body: JSON.stringify({ approvedForMemberApp: newApprovalState })
            });
        } catch {
            // fallback to updateMember
        }
    }

    await updateMember({
        ...member,
        approvedForMemberApp: newApprovalState
    });

    renderMembers();
}

membersTable?.addEventListener("click", async (event) => {
    const approvalButton = event.target.closest("[data-member-approval-toggle-id]");
    if (approvalButton) {
        approvalButton.disabled = true;
        await toggleMemberApproval(approvalButton.dataset.memberApprovalToggleId);
        return;
    }

    const renewButton = event.target.closest("[data-member-renew-id]");
    if (renewButton) {
        openRenewMember(renewButton.dataset.memberRenewId);
        return;
    }

    const editButton = event.target.closest("[data-member-edit-id]");
    if (editButton) {
        openEditMember(editButton.dataset.memberEditId);
        return;
    }

    const deleteButton = event.target.closest("[data-member-delete-id]");
    if (deleteButton) {
        const member = membersCache.find((item) => item.id === deleteButton.dataset.memberDeleteId);
        if (!member) return;

        if (!window.confirm(`حذف ${member.name}؟`)) {
            return;
        }

        deleteButton.disabled = true;
        await deleteMember(member.id);
        renderMembers();
        renderProgressSummary();
        return;
    }

    const button = event.target.closest("[data-attendance-id]");
    if (!button) return;

    button.disabled = true;
    button.textContent = "جاري التسجيل...";
    const result = await registerAttendance(button.dataset.attendanceId);
    if (!result.ok) {
        button.disabled = false;
        button.textContent = "تسجيل حضور";
    }
});

sessionsList?.addEventListener("click", async (event) => {
    const renewButton = event.target.closest("[data-member-renew-id]");
    if (renewButton) {
        openRenewMember(renewButton.dataset.memberRenewId);
        return;
    }

    const editButton = event.target.closest("[data-member-edit-id]");
    if (editButton) {
        openEditMember(editButton.dataset.memberEditId);
        return;
    }

    const button = event.target.closest("[data-attendance-id]");
    if (!button) return;

    button.disabled = true;
    button.textContent = "جاري التسجيل...";
    const result = await registerAttendance(button.dataset.attendanceId);
    if (!result.ok) {
        button.disabled = false;
        button.textContent = "تسجيل حضور";
    }
});

editMemberForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(editMemberForm);
    const memberId = String(data.get("memberId") || "");
    const member = membersCache.find((item) => item.id === memberId);

    if (!member) {
        if (editMemberMessage) editMemberMessage.textContent = "لم يتم العثور على المشترك.";
        return;
    }

    const remainingDays = toPositiveInteger(data.get("remainingDays"), 0);
    const nextPlan = normalizePlanValue(data.get("plan"));
    const nextCode = normalizeManualMemberCode(data.get("code"));

    if (!nextCode) {
        if (editMemberMessage) editMemberMessage.textContent = "كود المشترك مطلوب.";
        return;
    }

    if (isMemberCodeTaken(nextCode, member.id)) {
        if (editMemberMessage) editMemberMessage.textContent = "الكود ده مستخدم مع مشترك تاني.";
        return;
    }

    const shouldResetSubscriptionDates = remainingDays !== toPositiveInteger(member.remainingDays, 0) || nextPlan !== normalizePlanValue(member.plan);
    const subscriptionStartedAt = shouldResetSubscriptionDates
        ? getTodayDateValue()
        : getSubscriptionStartDate(member);
    const subscriptionEndsAt = shouldResetSubscriptionDates
        ? addDaysToDateValue(subscriptionStartedAt, remainingDays)
        : getSubscriptionEndDate(member, nextPlan, member.totalDays);

    let updatedMember;
    try {
        const editPhotoValue = String(data.get("photo") || "").trim();
        updatedMember = await updateMember({
            ...member,
            code: nextCode,
            name: String(data.get("name") || "").trim(),
            phone: String(data.get("phone") || "").trim(),
            weight: toMeasurementValue(data.get("weight")),
            height: toMeasurementValue(data.get("height")),
            plan: nextPlan,
            price: toMoneyValue(data.get("price")),
            photo: editPhotoValue !== "" ? editPhotoValue : (member.photo || ""),
            subscriptionStartedAt,
            subscriptionEndsAt,
            remainingDays,
            totalDays: Math.max(toPositiveInteger(member.totalDays, 0), daysBetweenDateValues(subscriptionStartedAt, subscriptionEndsAt), remainingDays),
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        if (editMemberMessage) {
            editMemberMessage.textContent = error?.status === 409
                ? "الكود ده مستخدم مع مشترك تاني على السيرفر."
                : "تعذر حفظ التعديل. جرب تاني.";
        }
        return;
    }

    if (editMemberMessage) editMemberMessage.textContent = `تم حفظ بيانات ${updatedMember.name}.`;
    renderMembers();
    renderProgressSummary();
    setTimeout(closeEditMember, 350);
});

editMemberCancel?.addEventListener("click", closeEditMember);
editMemberModal?.addEventListener("click", (event) => {
    if (event.target === editMemberModal) {
        closeEditMember();
    }
});

// Edit member photo upload
editMemberPhotoUpload?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
        if (editMemberMessage) editMemberMessage.textContent = "اختار ملف صورة فقط.";
        return;
    }
    try {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            // Compress/resize using canvas
            const img = new Image();
            img.onload = () => {
                const maxSize = 400;
                let { width, height } = img;
                if (width > height) {
                    if (width > maxSize) { height = Math.round(height * maxSize / width); width = maxSize; }
                } else {
                    if (height > maxSize) { width = Math.round(width * maxSize / height); height = maxSize; }
                }
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                const compressed = canvas.toDataURL("image/jpeg", 0.82);
                setEditMemberPhoto(compressed);
                if (editMemberMessage) editMemberMessage.textContent = "";
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    } catch {
        if (editMemberMessage) editMemberMessage.textContent = "تعذر قراءة الصورة. جرب صورة تانية.";
    } finally {
        event.target.value = "";
    }
});

// Edit member photo clear
editMemberPhotoClear?.addEventListener("click", () => {
    setEditMemberPhoto("");
    if (editMemberPhotoUpload) editMemberPhotoUpload.value = "";
});



renewMemberForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(renewMemberForm);
    const memberId = String(data.get("memberId") || "");
    const requestId = String(data.get("requestId") || "");
    const member = membersCache.find((item) => item.id === memberId);

    if (!member) {
        if (renewMemberMessage) renewMemberMessage.textContent = "لم يتم العثور على المشترك.";
        return;
    }

    const plan = normalizePlanValue(data.get("plan"));
    const days = toPositiveInteger(data.get("days"), getPlanDefaults(plan).days);
    const price = toMoneyValue(data.get("price"));

    if (!days) {
        if (renewMemberMessage) renewMemberMessage.textContent = "اكتب عدد أيام التجديد.";
        return;
    }

    const renewalBaseDate = getRenewalBaseDate(member);
    const currentEndDate = getSubscriptionEndDate(member, member.plan, member.totalDays);
    const subscriptionStartedAt = daysUntilDateValue(currentEndDate) > 0
        ? getSubscriptionStartDate(member)
        : getTodayDateValue();
    const subscriptionEndsAt = addDaysToDateValue(renewalBaseDate, days);
    const remainingAfterRenewal = daysUntilDateValue(subscriptionEndsAt);
    const totalAfterRenewal = Math.max(
        toPositiveInteger(member.totalDays, 0) + days,
        daysBetweenDateValues(subscriptionStartedAt, subscriptionEndsAt)
    );
    const renewedMember = await updateMember({
        ...member,
        plan,
        price,
        subscriptionStartedAt,
        subscriptionEndsAt,
        remainingDays: remainingAfterRenewal,
        totalDays: totalAfterRenewal,
        updatedAt: new Date().toISOString()
    });

    if (price > 0 && data.get("addFinance") === "on") {
        await loadFinanceEntries();
        await saveFinanceEntry({
            id: createId(),
            type: "income",
            amount: price,
            date: getTodayDateValue(),
            note: `تجديد اشتراك ${member.name} - ${member.code}`,
            createdAt: new Date().toISOString()
        });
        renderFinance();
    }

    if (requestId) {
        await deleteRenewalRequest(requestId);
        renderRenewalRequests();
    }

    if (renewMemberMessage) {
        renewMemberMessage.textContent = `تم تجديد ${renewedMember.name}. المتبقي ${renewedMember.remainingDays.toLocaleString("ar-EG")} يوم.`;
    }
    renderMembers();
    renderProgressSummary();
    setTimeout(closeRenewMember, 450);
});

renewMemberCancel?.addEventListener("click", closeRenewMember);
renewMemberModal?.addEventListener("click", (event) => {
    if (event.target === renewMemberModal) {
        closeRenewMember();
    }
});

renewalRequestsTable?.addEventListener("click", async (event) => {
    const openButton = event.target.closest("[data-renewal-open-id]");
    if (openButton) {
        await loadMembers();
        const request = renewalRequestsCache.find((item) => item.id === openButton.dataset.renewalOpenId);
        const member = request ? findMemberForRenewalRequest(request) : null;

        if (!member) {
            if (settingsMessage) {
                settingsMessage.textContent = "لم يتم العثور على المشترك المرتبط بطلب التجديد.";
            }
            return;
        }

        openRenewMember(member.id, request.id);
        return;
    }

    const deleteButton = event.target.closest("[data-renewal-delete-id]");
    if (deleteButton) {
        if (!window.confirm("حذف طلب التجديد؟")) {
            return;
        }

        deleteButton.disabled = true;
        await deleteRenewalRequest(deleteButton.dataset.renewalDeleteId);
        renderRenewalRequests();
    }
});

backupExportBtn?.addEventListener("click", async () => {
    setBackupMessage("جاري تجهيز النسخة والبيانات المالية...");
    const snapshot = await collectCurrentDeviceSnapshot();
    downloadBackupSnapshot(snapshot);
    const fin = getFinanceTotals(snapshot.financeEntries);
    setBackupMessage(`تم تنزيل النسخة بنجاح (${snapshot.members.length.toLocaleString("ar-EG")} مشترك | الوارد: ${formatMoney(fin.income)} | الصادر: ${formatMoney(fin.expense)} | الصافي: ${formatMoney(fin.net)}).`, "success");
});

backupImportInput?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
        setBackupMessage("جاري قراءة النسخة والمالية...");
        const snapshot = JSON.parse(await file.text());
        if (!window.confirm("استرجاع هذه النسخة سيستبدل البيانات الحالية. هل تريد المتابعة؟")) {
            return;
        }

        await restoreBackupSnapshot(snapshot);
        const fin = getFinanceTotals(snapshot.financeEntries);
        setBackupMessage(`تم استرجاع النسخة بنجاح (${snapshot.members.length.toLocaleString("ar-EG")} مشترك | الوارد: ${formatMoney(fin.income)} | الصادر: ${formatMoney(fin.expense)} | الصافي: ${formatMoney(fin.net)}).`, "success");
    } catch {
        setBackupMessage("تعذر قراءة ملف النسخة الاحتياطية.", "error");
    } finally {
        event.target.value = "";
    }
});

generateSyncToken?.addEventListener("click", () => {
    const token = createSyncToken();
    if (syncTokenInput) {
        syncTokenInput.value = token;
        syncTokenInput.focus();
    }
    if (syncTokenStatus) {
        syncTokenStatus.textContent = "تم توليد مفتاح قوي. احفظ الإعدادات، واستخدم نفس المفتاح على الأجهزة التانية.";
    }
    setSyncMessage("اتولد مفتاح مزامنة جديد. اضغط حفظ الإعدادات عشان يتفعل.", "info");
});

syncPendingBtn?.addEventListener("click", async () => {
    try {
        const setupError = getSyncSetupError();
        if (location.protocol === "file:" && setupError) {
            setSyncMessage(setupError, "error");
            return;
        }
        setSyncMessage("جاري مزامنة العمليات المؤجلة...");
        apiAvailable = hasApiEndpoint() && navigator.onLine !== false;
        await syncOfflineQueue();
        setSyncMessage(getSyncQueue().length ? "ما زالت توجد عمليات لم تتزامن." : "تمت مزامنة العمليات المؤجلة بنجاح.", getSyncQueue().length ? "info" : "success");
    } catch {
        setSyncMessage("تعذر تنفيذ المزامنة. راجع رابط سيرفر الأونلاين.", "error");
    }
});

syncUploadBtn?.addEventListener("click", async () => {
    const setupError = getSyncSetupError();
    if (setupError) {
        setSyncMessage(setupError, "error");
        return;
    }

    if (!window.confirm("رفع بيانات هذا الجهاز سيستبدل بيانات الأونلاين الحالية. هل تريد المتابعة؟")) {
        return;
    }

    try {
        setSyncMessage("جاري رفع بيانات الجهاز والمالية للأونلاين...");
        const snapshot = await uploadCurrentDeviceToOnline();
        const fin = getFinanceTotals(snapshot.financeEntries);
        addLocalAudit("رفع نسخة أونلاين", `تم رفع ${snapshot.members.length.toLocaleString("ar-EG")} مشترك والخزنة.`);
        setSyncMessage(`تم رفع البيانات للأونلاين بنجاح (${snapshot.members.length.toLocaleString("ar-EG")} مشترك | الوارد: ${formatMoney(fin.income)} | الصادر: ${formatMoney(fin.expense)} | الصافي: ${formatMoney(fin.net)}).`, "success");
    } catch {
        setSyncMessage("فشل رفع البيانات. تأكد أن السيرفر شغال، والرابط والإيميل ومفتاح المزامنة صح.", "error");
    }
});

syncDownloadBtn?.addEventListener("click", async () => {
    const setupError = getSyncSetupError();
    if (setupError) {
        setSyncMessage(setupError, "error");
        return;
    }

    if (!window.confirm("سحب بيانات الأونلاين سيستبدل بيانات هذا الجهاز الحالية. هل تريد المتابعة؟")) {
        return;
    }

    try {
        setSyncMessage("جاري سحب بيانات الأونلاين والمالية (الصادر والوارد)...");
        const snapshot = await downloadOnlineToCurrentDevice();
        const fin = getFinanceTotals(snapshot.financeEntries);
        addLocalAudit("سحب نسخة أونلاين", `تم سحب ${snapshot.members.length.toLocaleString("ar-EG")} مشترك والمالية.`);
        setSyncMessage(`تم سحب البيانات من الأونلاين بنجاح! المشتركين: ${snapshot.members.length.toLocaleString("ar-EG")} | الوارد: ${formatMoney(fin.income)} | الصادر (المصاريف): ${formatMoney(fin.expense)} | الصافي: ${formatMoney(fin.net)}.`, "success");
    } catch {
        setSyncMessage("فشل سحب البيانات. تأكد أن السيرفر شغال، والرابط والإيميل ومفتاح المزامنة صح.", "error");
    }
});

testSyncConnectionBtn?.addEventListener("click", async () => {
    const setupError = getSyncSetupError();
    if (setupError) {
        setSyncMessage(setupError, "error");
        return;
    }

    try {
        setSyncMessage("جاري فحص الاتصال بسيرفر المزامنة...");
        const snapshot = normalizeBackupSnapshot(await remoteApiRequest("/api/backup"));
        const fin = getFinanceTotals(snapshot.financeEntries);
        setSyncMessage(`الاتصال شغال! الحساب عليه ${snapshot.members.length.toLocaleString("ar-EG")} مشترك | حركات الخزنة: ${fin.count.toLocaleString("ar-EG")} (الوارد: ${formatMoney(fin.income)} | الصادر: ${formatMoney(fin.expense)}).`, "success");
        addLocalAudit("فحص اتصال", "تم الاتصال بسيرفر المزامنة بنجاح.");
    } catch {
        setSyncMessage("فشل فحص الاتصال. راجع رابط السيرفر والإيميل ومفتاح المزامنة.", "error");
    }
});

refreshAuditLogBtn?.addEventListener("click", async () => {
    const localEntries = readLocalAuditLog();

    try {
        if (getOnlineSyncUrl() && getSyncAccountEmail() && getSyncAccountToken()) {
            const remoteEntries = await remoteApiRequest("/api/audit");
            renderAuditLog(Array.isArray(remoteEntries) ? remoteEntries : localEntries);
            setSyncMessage("تم تحميل سجل العمليات.", "success");
            return;
        }
    } catch {
        setSyncMessage("تعذر تحميل سجل السيرفر. هعرض سجل الجهاز الحالي.", "error");
    }

    renderAuditLog(localEntries);
});

whatsappExpiryTemplate?.addEventListener("click", () => {
    fillWhatsAppTemplate("expiry");
    renderWhatsAppBroadcast();
});

whatsappForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await loadMembers();
    await loadSettings();
    renderWhatsAppBroadcast();
    await refreshWhatsAppCloudStatus();
});

whatsappAudience?.addEventListener("change", renderWhatsAppBroadcast);

sendWhatsAppBroadcast?.addEventListener("click", sendWhatsAppBroadcastAutomatically);

refreshWhatsAppReminders?.addEventListener("click", async () => {
    await loadMembers();
    await loadSettings();
    renderWhatsAppAutoReminders();
    await refreshWhatsAppCloudStatus();
});

openNextWhatsAppReminder?.addEventListener("click", () => {
    const nextMember = getPendingWhatsAppReminderMembers()[0];
    if (!nextMember) {
        renderWhatsAppAutoReminders();
        return;
    }

    openWhatsAppReminderForMember(nextMember);
});

openAllWhatsAppReminders?.addEventListener("click", openPendingWhatsAppReminders);

sendWhatsAppReminders?.addEventListener("click", sendExpiryWhatsAppRemindersAutomatically);

whatsappAutoReminders?.addEventListener("click", (event) => {
    const doneButton = event.target.closest("[data-whatsapp-reminder-done-id]");
    if (doneButton) {
        markWhatsAppReminderOpened(doneButton.dataset.whatsappReminderDoneId);
        return;
    }

    const link = event.target.closest("[data-whatsapp-reminder-link-id]");
    if (link) {
        markWhatsAppReminderOpened(link.dataset.whatsappReminderLinkId);
    }
});

financeLockForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = financePassword.value.trim();
    const configured = isFinanceConfigured();
    const managerConfigured = isFinanceManagerConfigured();

    if (password.length < 4) {
        financeLockMessage.textContent = "باسورد الخزنة لازم يكون 4 حروف أو أرقام على الأقل.";
        financeLockMessage.dataset.type = "error";
        return;
    }

    const enteredHash = await hashText(password);

    if (!configured || !managerConfigured) {
        if (configured && enteredHash !== localStorage.getItem(FINANCE_HASH_KEY)) {
            financeLockMessage.textContent = "باسورد الخزنة الحالي غير صحيح.";
            financeLockMessage.dataset.type = "error";
            financePassword.value = "";
            return;
        }

        const managerName = financeManagerName?.value.trim() || "";
        const managerPasswordValue = financeManagerPassword?.value.trim() || "";
        const managerConfirmPasswordValue = financeManagerConfirmPassword?.value.trim() || "";

        if (!managerName) {
            financeLockMessage.textContent = "اكتب اسم مدير الخزنة.";
            financeLockMessage.dataset.type = "error";
            return;
        }

        if (managerPasswordValue.length < 4) {
            financeLockMessage.textContent = "باسورد مدير الخزنة لازم يكون 4 حروف أو أرقام على الأقل.";
            financeLockMessage.dataset.type = "error";
            return;
        }

        if (managerPasswordValue !== managerConfirmPasswordValue) {
            financeLockMessage.textContent = "تأكيد باسورد مدير الخزنة غير مطابق.";
            financeLockMessage.dataset.type = "error";
            return;
        }

        if (!configured) {
            localStorage.setItem(FINANCE_HASH_KEY, enteredHash);
        }
        saveFinanceManager({
            name: managerName,
            hash: await hashText(managerPasswordValue),
            createdAt: new Date().toISOString()
        });
        setFinanceSession("manager", managerName);
        financeLockMessage.textContent = configured
            ? "تم تعيين مدير الخزنة."
            : "تم إنشاء الخزنة وتعيين مديرها.";
        financeLockMessage.dataset.type = "success";
    } else {
        const manager = getStoredFinanceManager();
        const financeUsers = getFinanceUsers();
        const matchedUser = financeUsers.find((user) => user.hash === enteredHash);

        if (manager && enteredHash === manager.hash) {
            setFinanceSession("manager", manager.name);
            financeLockMessage.textContent = "تم فتح الخزنة كمدير.";
            financeLockMessage.dataset.type = "success";
        } else if (enteredHash === localStorage.getItem(FINANCE_HASH_KEY)) {
            setFinanceSession("user", "باسورد الخزنة");
            financeLockMessage.textContent = "تم فتح الخزنة.";
            financeLockMessage.dataset.type = "success";
        } else if (matchedUser) {
            setFinanceSession("user", matchedUser.name);
            financeLockMessage.textContent = `تم فتح الخزنة باسم ${matchedUser.name}.`;
            financeLockMessage.dataset.type = "success";
        } else {
            financeLockMessage.textContent = "باسورد الخزنة أو المستخدم غير صحيح.";
            financeLockMessage.dataset.type = "error";
            financePassword.value = "";
            return;
        }
    }

    financeLockForm.reset();
    applyFinanceLockUi();
    await loadFinanceEntries();
    renderFinance();
});

financeLockBtn?.addEventListener("click", () => {
    lockFinanceVault();
});

function setFinanceResetMessage(message, type = "success") {
    // Built lazily so the message still shows even if the page markup is an older cached copy.
    let target = financeResetMessage || document.getElementById("finance-reset-message");
    if (!target && financePrivateArea) {
        target = document.createElement("p");
        target.className = "form-message";
        target.id = "finance-reset-message";
        target.setAttribute("role", "status");
        financePrivateArea.prepend(target);
    }
    if (!target) return;
    target.textContent = message;
    target.dataset.type = type;
}

resetFinanceBtn?.addEventListener("click", async () => {
    if (sessionStorage.getItem(FINANCE_SESSION_KEY) !== "true") {
        setFinanceResetMessage("افتح الخزنة الأول.", "error");
        window.alert("افتح الخزنة الأول قبل التصفير.");
        return;
    }

    await loadFinanceEntries();
    const totals = getFinanceTotals(financeEntriesCache);

    if (!totals.count) {
        renderFinance();
        setFinanceResetMessage("الخزنة صفر بالفعل، مفيش حركات مالية مسجلة.", "error");
        window.alert("الخزنة صفر بالفعل، مفيش حركات مالية مسجلة.");
        return;
    }

    const confirmed = window.confirm(
        `تصفير الخزنة للصفر؟\n\n`
        + `هيتم مسح كل الفلوس اللي في الخزنة: ${totals.count.toLocaleString("ar-EG")} حركة (وارد: ${formatMoney(totals.income)} | صادر: ${formatMoney(totals.expense)} | الصافي: ${formatMoney(totals.net)}).\n\n`
        + `المشتركين واللعيبة وكل بياناتهم هتفضل زي ما هي، والحركات القديمة هتتحفظ في أرشيف الخزنة.`
    );
    if (!confirmed) {
        setFinanceResetMessage("تم إلغاء التصفير.", "error");
        return;
    }

    resetFinanceBtn.disabled = true;
    try {
        await resetFinanceToZero(getFinanceSessionName());
        renderFinance();
        renderAuditLog();
        const successText = `تم تصفير الخزنة للصفر.\nاتمسح ${totals.count.toLocaleString("ar-EG")} حركة بمبلغ صافي ${formatMoney(totals.net)}.\nالوارد والصادر والصافي بقوا صفر، والمشتركين وبياناتهم زي ما هم.`;
        setFinanceResetMessage(successText.replace(/\n/g, " "), "success");
        window.alert(successText);
    } catch {
        setFinanceResetMessage("حصلت مشكلة وقت التصفير، جرب تاني.", "error");
        window.alert("حصلت مشكلة وقت التصفير، جرب تاني.");
    } finally {
        resetFinanceBtn.disabled = false;
    }
});

financeChangePasswordForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(financeChangePasswordForm);
    const managerPassword = String(data.get("currentFinanceManagerPassword") || "").trim();
    const newPassword = String(data.get("newFinancePassword") || "").trim();
    const confirmPassword = String(data.get("confirmFinancePassword") || "").trim();
    const manager = getStoredFinanceManager();

    if (!isFinanceManagerSession() || !manager) {
        financePasswordMessage.textContent = "تغيير الباسورد متاح لمدير الخزنة فقط.";
        financePasswordMessage.dataset.type = "error";
        return;
    }

    if (newPassword.length < 4) {
        financePasswordMessage.textContent = "باسورد الخزنة الجديد لازم يكون 4 حروف أو أرقام على الأقل.";
        financePasswordMessage.dataset.type = "error";
        return;
    }

    if (newPassword !== confirmPassword) {
        financePasswordMessage.textContent = "تأكيد باسورد الخزنة غير مطابق.";
        financePasswordMessage.dataset.type = "error";
        return;
    }

    const managerHash = await hashText(managerPassword);
    if (managerHash !== manager.hash) {
        financePasswordMessage.textContent = "باسورد مدير الخزنة غير صحيح.";
        financePasswordMessage.dataset.type = "error";
        return;
    }

    localStorage.setItem(FINANCE_HASH_KEY, await hashText(newPassword));
    financeChangePasswordForm.reset();
    financePasswordMessage.textContent = "تم تغيير باسورد فتح الخزنة بنجاح.";
    financePasswordMessage.dataset.type = "success";
});

financeUserForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(financeUserForm);
    const name = String(data.get("financeUserName") || "").trim();
    const password = String(data.get("financeUserPassword") || "").trim();
    const confirmPassword = String(data.get("confirmFinanceUserPassword") || "").trim();

    if (!isFinanceManagerSession()) {
        financeUserMessage.textContent = "إضافة مستخدمين الخزنة متاحة للمدير فقط.";
        financeUserMessage.dataset.type = "error";
        return;
    }

    if (!name) {
        financeUserMessage.textContent = "اكتب اسم المستخدم.";
        financeUserMessage.dataset.type = "error";
        return;
    }

    if (password.length < 4) {
        financeUserMessage.textContent = "باسورد المستخدم لازم يكون 4 حروف أو أرقام على الأقل.";
        financeUserMessage.dataset.type = "error";
        return;
    }

    if (password !== confirmPassword) {
        financeUserMessage.textContent = "تأكيد باسورد المستخدم غير مطابق.";
        financeUserMessage.dataset.type = "error";
        return;
    }

    const users = getFinanceUsers();
    if (users.some((user) => user.name.trim().toLowerCase() === name.toLowerCase())) {
        financeUserMessage.textContent = "اسم المستخدم موجود بالفعل.";
        financeUserMessage.dataset.type = "error";
        return;
    }

    users.push({
        id: createId(),
        name,
        hash: await hashText(password),
        createdAt: new Date().toISOString()
    });
    saveFinanceUsers(users);
    financeUserForm.reset();
    financeUserMessage.textContent = `تمت إضافة ${name} لاستخدام الخزنة.`;
    financeUserMessage.dataset.type = "success";
    renderFinanceUsers();
});

financeUsersTable?.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-finance-user-delete-id]");
    if (!deleteButton) return;

    if (!isFinanceManagerSession()) {
        if (financeUserMessage) {
            financeUserMessage.textContent = "حذف مستخدمي الخزنة متاح للمدير فقط.";
            financeUserMessage.dataset.type = "error";
        }
        return;
    }

    if (!window.confirm("حذف صلاحية هذا المستخدم من الخزنة؟")) {
        return;
    }

    const users = getFinanceUsers().filter((user) => user.id !== deleteButton.dataset.financeUserDeleteId);
    saveFinanceUsers(users);
    if (financeUserMessage) {
        financeUserMessage.textContent = "تم حذف صلاحية المستخدم.";
        financeUserMessage.dataset.type = "success";
    }
    renderFinanceUsers();
});

financeForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(financeForm);
    const entry = {
        id: createId(),
        type: String(data.get("type") || "income"),
        amount: toMoneyValue(data.get("amount")),
        date: String(data.get("date") || getTodayDateValue()),
        note: String(data.get("note") || "").trim(),
        createdAt: new Date().toISOString()
    };

    if (!entry.amount || !entry.note) {
        financeMessage.textContent = "اكتب المبلغ والبيان قبل الحفظ.";
        return;
    }

    await saveFinanceEntry(entry);
    financeForm.reset();
    if (financeDate) financeDate.value = getTodayDateValue();
    financeMessage.textContent = "تم حفظ الحركة المالية.";
    renderFinance();
});

progressForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(progressForm);
    const memberId = String(data.get("memberId") || "");
    const member = membersCache.find((item) => item.id === memberId);

    if (!member) {
        progressMessage.textContent = "اختار لاعب الأول.";
        return;
    }

    const month = String(data.get("month") || getMonthKey());
    const weight = toMeasurementValue(data.get("weight"));
    const height = toMeasurementValue(data.get("height"));
    const note = String(data.get("note") || "").trim();
    const nextMeasurementLog = [
        ...(member.measurementLog || []).filter((entry) => entry.month !== month),
        {
            month,
            weight,
            height,
            note,
            createdAt: new Date().toISOString()
        }
    ].sort((a, b) => a.month.localeCompare(b.month));

    await updateMember({
        ...member,
        weight,
        height,
        measurementLog: nextMeasurementLog
    });

    progressForm.reset();
    if (progressMonth) progressMonth.value = month;
    progressMessage.textContent = "تم حفظ قياس الشهر وتحديث المقارنة.";
    renderMembers();
    renderProgressSummary();
});

settingsForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(settingsForm);
    const settings = {
        gymName: String(data.get("gymName") || "Zahran Informa").trim(),
        gymPhone: String(data.get("gymPhone") || "").trim(),
        ownerEmail: normalizeAccountEmail(data.get("ownerEmail")),
        syncToken: String(data.get("syncToken") || "").trim(),
        memberCodePrefix: String(data.get("memberCodePrefix") || "ZI").trim().toUpperCase(),
        defaultPlan: String(data.get("defaultPlan") || "شهر").trim(),
        autoBackup: String(data.get("autoBackup") || "disabled").trim(),
        expiryReminderDays: String(data.get("expiryReminderDays") || "7").trim(),
        registrationStatus: String(data.get("registrationStatus") || "open").trim(),
        inactiveMemberDays: String(data.get("inactiveMemberDays") || "30").trim(),
        storageMode: String(data.get("storageMode") || "mobile-sync").trim(),
        onlineSyncUrl: String(data.get("onlineSyncUrl") || "").trim()
    };

    await saveSettings(settings);
    applySettingsToUi();
    await syncOfflineQueue();
    settingsMessage.textContent = getSyncQueue().length
        ? "تم حفظ الإعدادات على الموبايل، وهتتزامن تلقائيًا لما الإنترنت يرجع."
        : "تم حفظ الإعدادات ومزامنتها.";
});

jumpPasswordSettings?.addEventListener("click", () => {
    passwordSettingsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    passwordSettingsSection?.classList.add("focus-section");
    setTimeout(() => passwordSettingsSection?.classList.remove("focus-section"), 1400);
});

passwordForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(passwordForm);
    const currentPassword = String(data.get("currentPassword") || "").trim();
    const newPassword = String(data.get("newPassword") || "").trim();
    const confirmPassword = String(data.get("confirmPassword") || "").trim();

    if (newPassword.length < 4) {
        passwordMessage.textContent = "الباسورد الجديد لازم يكون 4 حروف أو أرقام على الأقل.";
        return;
    }

    if (newPassword !== confirmPassword) {
        passwordMessage.textContent = "تأكيد الباسورد الجديد مش مطابق.";
        return;
    }

    const currentHash = await hashText(currentPassword);
    if (currentHash !== localStorage.getItem(OWNER_HASH_KEY)) {
        passwordMessage.textContent = "الباسورد الحالي غير صحيح.";
        return;
    }

    localStorage.setItem(OWNER_HASH_KEY, await hashText(newPassword));
    passwordForm.reset();
    passwordMessage.textContent = "تم تغيير باسورد الموقع بنجاح.";
});

enableBiometricLogin?.addEventListener("click", enableBiometricLoginOnDevice);
disableBiometricLogin?.addEventListener("click", disableBiometricLoginOnDevice);

pageLinks.forEach((link) => {
    link.addEventListener("click", async (event) => {
        event.preventDefault();
        const pageName = link.dataset.pageLink || "register";
        await navigateToPage(pageName);
    });
});

menuToggleBtn?.addEventListener("click", () => {
    setSidebarOpen(!document.body.classList.contains("sidebar-open"));
});

sidebarBackdrop?.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSidebar();
    }
});

membersLockForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = membersLockPassword.value.trim();

    if (password.length < 4) {
        membersLockMessage.textContent = "الباسورد لازم يكون 4 حروف أو أرقام على الأقل.";
        return;
    }

    const enteredHash = await hashText(password);
    if (enteredHash !== localStorage.getItem(OWNER_HASH_KEY)) {
        membersLockMessage.textContent = "باسورد المالك غير صحيح.";
        membersLockPassword.value = "";
        membersLockPassword.focus();
        return;
    }

    closeMembersLock();
    await openMembersPageAfterPassword();
});

membersLockCancel?.addEventListener("click", () => {
    closeMembersLock();
    showPage("subscriptions");
});

async function toggleMemberApproval(memberId) {
    const member = membersCache.find((m) => m.id === memberId);
    if (!member) return;

    const nextState = !member.approvedForMemberApp;

    if (apiAvailable && navigator.onLine !== false) {
        try {
            await apiRequest(`/api/members/${encodeURIComponent(memberId)}/approval`, {
                method: "PUT",
                body: JSON.stringify({ approvedForMemberApp: nextState })
            });
        } catch {
            apiAvailable = false;
        }
    }

    member.approvedForMemberApp = nextState;
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(membersCache));
    renderMembers();
    addLocalAudit("موافقة التطبيق للمشترك", `${member.name} - ${nextState ? "تفعيل" : "إلغاء"}`);
}

membersTable?.addEventListener("click", async (event) => {
    const approvalBtn = event.target.closest("[data-member-approval-toggle-id]");
    if (approvalBtn) {
        const memberId = approvalBtn.dataset.memberApprovalToggleId;
        await toggleMemberApproval(memberId);
    }
});

refreshMembers?.addEventListener("click", async () => {
    await loadMembers();
    renderMembers();
});

refreshSessions?.addEventListener("click", async () => {
    await loadMembers();
    renderMembers();
});

refreshRenewalRequests?.addEventListener("click", async () => {
    await loadRenewalRequests();
    renderRenewalRequests();
});

themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
    localStorage.setItem("zahran_informa_theme", nextTheme);
    applyTheme(nextTheme);
});

zoomOutBtn?.addEventListener("click", () => {
    const currentZoom = Number(localStorage.getItem("zahran_informa_zoom") || "1");
    setAppZoom(currentZoom - 0.05);
});

zoomInBtn?.addEventListener("click", () => {
    const currentZoom = Number(localStorage.getItem("zahran_informa_zoom") || "1");
    setAppZoom(currentZoom + 0.05);
});

zoomResetBtn?.addEventListener("click", () => setAppZoom(1));

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallPromptUi();
});

installAppBtn?.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice.catch(() => null);
    deferredInstallPrompt = null;
    updateInstallPromptUi();
});

window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    updateInstallPromptUi();
});

if (financeDate) {
    financeDate.value = getTodayDateValue();
}
if (progressMonth) {
    progressMonth.value = getMonthKey();
}
if (whatsappMessageInput && !whatsappMessageInput.value.trim()) {
    fillWhatsAppTemplate("expiry");
}
refreshWhatsAppCloudStatus();

initTheme();
initAppZoom();
registerMobileRuntime();
setupOwnerLoginText();
applyFinanceLockUi();
updateInstallPromptUi();
initQrScanner();
const initialRequestedPage = location.hash.replace("#", "") || "dashboard";
if (initialRequestedPage === "member") {
    lockApp();
    focusMemberPortal();
} else if (sessionStorage.getItem(OWNER_SESSION_KEY) === "true" && isOwnerConfigured()) {
    unlockApp().then(openCurrentOwnerPage);
} else {
    lockApp();
}

/* =============================================
   QR Scanner - Admin Side
   ============================================= */
function scrollToQrScanner(e) {
    if (e) e.preventDefault();
    // Navigate to attendance page first, then scroll to scanner
    const attendancePage = document.querySelector('[data-page-link="attendance"]');
    if (attendancePage) attendancePage.click();
    setTimeout(() => {
        const panel = document.getElementById("qr-scanner-panel");
        if (panel) panel.scrollIntoView({ behavior: "smooth" });
        const btn = document.getElementById("start-qr-scan-btn");
        if (btn) btn.click();
    }, 300);
}

function initQrScanner() {
    const startBtn = document.getElementById("start-qr-scan-btn");
    const stopBtn = document.getElementById("stop-qr-scan-btn");
    const scanAgainBtn = document.getElementById("qr-scan-again-btn");
    const video = document.getElementById("qr-scanner-video");
    const canvas = document.getElementById("qr-scanner-canvas");
    const videoWrap = document.getElementById("qr-video-wrap");
    const msgEl = document.getElementById("qr-scan-message");
    const resultEl = document.getElementById("qr-scan-result");

    if (!startBtn || !video || !canvas) return;

    let stream = null;
    let animFrame = null;
    let scanning = false;

    function setMsg(text, isError) {
        if (!msgEl) return;
        msgEl.textContent = text;
        msgEl.style.color = isError ? "#f87171" : "#6ee7b7";
    }

    function stopScan() {
        scanning = false;
        if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
        if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
        if (videoWrap) videoWrap.hidden = true;
        if (stopBtn) stopBtn.hidden = true;
        if (startBtn) startBtn.hidden = false;
    }

    async function startScan() {
        setMsg("", false);
        if (resultEl) resultEl.hidden = true;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        } catch {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (err) {
                setMsg("تعذر فتح الكاميرا: " + (err.message || err), true);
                return;
            }
        }
        video.srcObject = stream;
        await video.play().catch(() => {});
        if (videoWrap) videoWrap.hidden = false;
        if (startBtn) startBtn.hidden = true;
        if (stopBtn) stopBtn.hidden = false;
        scanning = true;
        scanFrame();
    }

    function scanFrame() {
        if (!scanning) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Use jsQR if available, otherwise fallback to BarcodeDetector
            if (typeof jsQR !== "undefined") {
                const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
                if (code && code.data) {
                    handleQrData(code.data);
                    return;
                }
            } else if (typeof BarcodeDetector !== "undefined") {
                new BarcodeDetector({ formats: ["qr_code"] }).detect(canvas)
                    .then(codes => { if (codes.length) handleQrData(codes[0].rawValue); })
                    .catch(() => {});
            }
        }
        animFrame = requestAnimationFrame(scanFrame);
    }

    async function handleQrData(rawValue) {
        stopScan();
        setMsg("جاري معالجة QR...", false);

        let parsed;
        try { parsed = JSON.parse(rawValue); } catch { parsed = null; }

        const memberId = parsed && (parsed.id || parsed.memberId);
        const memberCode = parsed && parsed.code;

        if (!memberId && !memberCode) {
            setMsg("QR غير صالح: لا يحتوي على بيانات مشترك.", true);
            if (resultEl) resultEl.hidden = true;
            return;
        }

        try {
            const resp = await fetch("/api/qr/attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId: String(memberId || ""), code: memberCode || "" })
            });
            const data = await resp.json().catch(() => ({}));

            if (resp.ok && data.ok) {
                const m = data.member || {};
                showQrResult(true, data.alreadyCheckedIn, m, data.message);
                setMsg("", false);
                // Refresh members list if open
                if (typeof loadMembers === "function") loadMembers();
            } else {
                setMsg(data.error || "تعذر تسجيل الحضور.", true);
                showQrResult(false, false, parsed || {}, data.error || "تعذر تسجيل الحضور.");
            }
        } catch (err) {
            setMsg("تعذر الاتصال بالسيرفر.", true);
        }
    }

    function showQrResult(success, alreadyIn, member, message) {
        if (!resultEl) return;
        const iconEl = document.getElementById("qr-result-icon");
        const nameEl = document.getElementById("qr-result-name");
        const codeEl = document.getElementById("qr-result-code");
        const planEl = document.getElementById("qr-result-plan");
        const msgResultEl = document.getElementById("qr-result-msg");

        if (iconEl) iconEl.textContent = success ? (alreadyIn ? "⚠️" : "✅") : "❌";
        if (nameEl) nameEl.textContent = member.name || "غير معروف";
        if (codeEl) codeEl.textContent = member.code || "";
        if (planEl) planEl.textContent = member.plan ? `باقة: ${member.plan}` : "";
        if (msgResultEl) {
            msgResultEl.textContent = message || "";
            msgResultEl.style.color = success ? (alreadyIn ? "#fcd34d" : "#6ee7b7") : "#f87171";
        }
        resultEl.hidden = false;
    }

    startBtn.addEventListener("click", startScan);
    stopBtn.addEventListener("click", stopScan);
    if (scanAgainBtn) scanAgainBtn.addEventListener("click", () => {
        if (resultEl) resultEl.hidden = true;
        setMsg("", false);
        startScan();
    });
}

/* =============================================
   Captain Code Form (Settings Page)
   ============================================= */
document.getElementById("captain-code-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const code    = (document.getElementById("captain-code-input")?.value || "").trim();
    const confirm = (document.getElementById("captain-code-confirm")?.value || "").trim();
    const msg     = document.getElementById("captain-code-message");
    if (!msg) return;

    msg.textContent = "";
    msg.className   = "settings-message";

    if (!code || code.length < 4) {
        msg.textContent = "الكود يجب أن يكون 4 أحرف على الأقل.";
        msg.style.color = "#fca5a5";
        return;
    }
    if (code !== confirm) {
        msg.textContent = "الكودان غير متطابقَين.";
        msg.style.color = "#fca5a5";
        return;
    }

    const btn = document.getElementById("save-captain-code-btn");
    if (btn) btn.disabled = true;

    try {
        const res  = await fetch("/api/captain/set-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
        });
        const data = await res.json();
        if (res.ok && data.ok) {
            msg.textContent = "تم حفظ كود الكابتن بنجاح ✅";
            msg.style.color = "#6ee7b7";
            document.getElementById("captain-code-input").value  = "";
            document.getElementById("captain-code-confirm").value = "";
        } else {
            msg.textContent = data.message || "حدث خطأ أثناء الحفظ.";
            msg.style.color = "#fca5a5";
        }
    } catch {
        msg.textContent = "تعذر الاتصال بالخادم.";
        msg.style.color = "#fca5a5";
    } finally {
        if (btn) btn.disabled = false;
    }
});

/* =============================================
   Supervisor Code Form (Settings Page)
   ============================================= */
document.getElementById("supervisor-code-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const code    = (document.getElementById("supervisor-code-input")?.value || "").trim();
    const confirm = (document.getElementById("supervisor-code-confirm")?.value || "").trim();
    const msg     = document.getElementById("supervisor-code-message");
    if (!msg) return;

    msg.textContent = "";
    msg.className   = "settings-message";

    if (!code || code.length < 4) {
        msg.textContent = "الكود يجب أن يكون 4 أحرف على الأقل.";
        msg.style.color = "#fca5a5";
        return;
    }
    if (code !== confirm) {
        msg.textContent = "الكودان غير متطابقَين.";
        msg.style.color = "#fca5a5";
        return;
    }

    const btn = document.getElementById("save-supervisor-code-btn");
    if (btn) btn.disabled = true;

    try {
        const res  = await fetch("/api/supervisor/set-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
        });
        const data = await res.json();
        if (res.ok && data.ok) {
            msg.textContent = "تم حفظ كود المشرف بنجاح ✅";
            msg.style.color = "#6ee7b7";
            document.getElementById("supervisor-code-input").value  = "";
            document.getElementById("supervisor-code-confirm").value = "";
        } else {
            msg.textContent = data.error || data.message || "حدث خطأ أثناء الحفظ.";
            msg.style.color = "#fca5a5";
        }
    } catch {
        msg.textContent = "تعذر الاتصال بالخادم.";
        msg.style.color = "#fca5a5";
    } finally {
        if (btn) btn.disabled = false;
    }
});

/* =============================================
   إشعارات الكابتن: لما المشرف يسجّل مشترك جديد
   ============================================= */
const CAPTAIN_NOTIF_LAST_SEEN_KEY = "zahran_informa_notif_last_seen";

function ensureNotificationToastHost() {
    let host = document.getElementById("captain-notif-host");
    if (host) return host;

    const style = document.createElement("style");
    style.textContent = `
        #captain-notif-host{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:99999;display:flex;flex-direction:column;gap:10px;width:min(92vw,420px);pointer-events:none}
        .captain-notif{pointer-events:auto;background:#0f766e;color:#fff;border-radius:14px;padding:12px 16px;box-shadow:0 10px 30px rgba(0,0,0,.35);font-size:15px;line-height:1.5;display:flex;gap:10px;align-items:flex-start;animation:capNotifIn .25s ease}
        .captain-notif strong{display:block;margin-bottom:2px}
        .captain-notif .cap-x{margin-inline-start:auto;cursor:pointer;opacity:.8;font-size:18px;line-height:1}
        @keyframes capNotifIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
    `;
    document.head.appendChild(style);

    host = document.createElement("div");
    host.id = "captain-notif-host";
    host.setAttribute("dir", "rtl");
    document.body.appendChild(host);
    return host;
}

function showCaptainNotificationToast(title, body) {
    const host = ensureNotificationToastHost();
    const card = document.createElement("div");
    card.className = "captain-notif";
    card.setAttribute("role", "alert");
    card.innerHTML = `<span>🔔</span><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></div><span class="cap-x">×</span>`;
    const remove = () => card.remove();
    card.querySelector(".cap-x")?.addEventListener("click", remove);
    host.appendChild(card);
    window.setTimeout(remove, 9000);

    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
    } catch {
        /* الصوت اختياري */
    }
}

async function pollCaptainNotifications() {
    if (navigator.onLine === false) return;

    const lastSeen = localStorage.getItem(CAPTAIN_NOTIF_LAST_SEEN_KEY);
    if (!lastSeen) {
        // أول مرة: منعرضش الإشعارات القديمة، نبدأ من دلوقتي
        localStorage.setItem(CAPTAIN_NOTIF_LAST_SEEN_KEY, new Date().toISOString());
        return;
    }

    try {
        const params = new URLSearchParams({ since: lastSeen });
        const accountEmail = (typeof getSyncAccountHeaders === "function" && getSyncAccountHeaders()["X-Account-Email"]) || "";
        if (accountEmail) params.set("account", accountEmail);

        const res = await fetch(`/api/notifications?${params.toString()}`, { cache: "no-store" });
        if (!res.ok) return;
        const list = await res.json();
        if (!Array.isArray(list) || !list.length) return;

        // من الأقدم للأحدث عشان الترتيب يبقى منطقي
        list.slice().reverse().forEach((item) => {
            showCaptainNotificationToast(
                item.title || "إشعار جديد",
                item.body || `${item.memberName || ""} ${item.memberCode ? "- " + item.memberCode : ""}`.trim()
            );
        });

        const newest = list
            .map((item) => String(item.createdAt || ""))
            .sort()
            .pop();
        if (newest) localStorage.setItem(CAPTAIN_NOTIF_LAST_SEEN_KEY, newest);
    } catch {
        /* هنعيد المحاولة في الدورة الجاية */
    }
}

// نبدأ متابعة الإشعارات بعد تحميل الصفحة، وكل 20 ثانية
window.setTimeout(pollCaptainNotifications, 3000);
window.setInterval(pollCaptainNotifications, 20000);