/* =========================================================
   Zahran Informa - Member Web App JavaScript Engine
   Handles authentication, approval checks, BMI & health stats,
   progress comparison, renewal requests, and API sync.
   ========================================================= */

(function () {
    "use strict";

    const MEMBER_SESSION_KEY = "zahran_member_session";

    // DOM Elements - Navigation & Header
    const loginScreen = document.getElementById("login-screen");
    const dashboardScreen = document.getElementById("dashboard-screen");
    const userHeaderInfo = document.getElementById("user-header-info");
    const headerAvatar = document.getElementById("header-avatar");
    const headerMemberName = document.getElementById("header-member-name");
    const headerMemberCode = document.getElementById("header-member-code");
    const memberLogoutBtn = document.getElementById("member-logout-btn");
    const gymTitle = document.getElementById("gym-title");

    // Login Form Elements
    const loginForm = document.getElementById("member-login-form");
    const inputMemberCode = document.getElementById("input-member-code");
    const inputMemberPhone = document.getElementById("input-member-phone");
    const loginSubmitBtn = document.getElementById("login-submit-btn");
    const loginFeedbackMsg = document.getElementById("login-feedback-msg");

    // Dashboard Hero & Subscription
    const dashMemberPhoto = document.getElementById("dash-member-photo");
    const dashMemberAvatarPlaceholder = document.getElementById("dash-member-avatar-placeholder");
    const dashMemberName = document.getElementById("dash-member-name");
    const dashMemberCode = document.getElementById("dash-member-code");
    const dashSubStatus = document.getElementById("dash-sub-status");
    const dashPlanName = document.getElementById("dash-plan-name");
    const dashRemainingDays = document.getElementById("dash-remaining-days");
    const dashStartDate = document.getElementById("dash-start-date");
    const dashEndDate = document.getElementById("dash-end-date");
    const dashPlanPrice = document.getElementById("dash-plan-price");
    const requestRenewBtn = document.getElementById("request-renew-btn");
    const renewToastMsg = document.getElementById("renew-toast-msg");

    // Calculator Elements
    const measurementForm = document.getElementById("measurement-form");
    const calcWeight = document.getElementById("calc-weight");
    const calcHeight = document.getElementById("calc-height");
    const resBmiVal = document.getElementById("res-bmi-val");
    const resBmiStatus = document.getElementById("res-bmi-status");
    const resIdealWeight = document.getElementById("res-ideal-weight");
    const resCalories = document.getElementById("res-calories");

    // Comparison Elements
    const compInitialWeight = document.getElementById("comp-initial-weight");
    const compInitialDate = document.getElementById("comp-initial-date");
    const compLatestWeight = document.getElementById("comp-latest-weight");
    const compLatestDate = document.getElementById("comp-latest-date");
    const compWeightDiff = document.getElementById("comp-weight-diff");
    const compDiffBadge = document.getElementById("comp-diff-badge");
    const historyTableBody = document.getElementById("history-table-body");

    // Attendance Elements
    const dashAttendanceCount = document.getElementById("dash-attendance-count");
    const dashAttendanceList = document.getElementById("dash-attendance-list");

    // State
    let currentMember = null;

    /* Helper Utilities */
    function getApiBaseUrl() {
        return location.protocol !== "file:" ? "" : "";
    }

    function formatDate(dateString) {
        if (!dateString) return "-";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString.slice(0, 10);
            return new Intl.DateTimeFormat("ar-EG", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).format(date);
        } catch {
            return String(dateString).slice(0, 10);
        }
    }

    function showFeedback(element, message, isError = true) {
        if (!element) return;
        element.textContent = message;
        element.className = `form-feedback ${isError ? "error" : "success"}`;
        element.hidden = false;
    }

    function hideFeedback(element) {
        if (!element) return;
        element.hidden = true;
        element.textContent = "";
    }

    /* Calculator Logic */
    function calculateBmi(weightKg, heightCm) {
        if (!weightKg || !heightCm || heightCm <= 0) return null;
        const heightMeters = heightCm / 100;
        const bmi = weightKg / (heightMeters * heightMeters);
        return Math.round(bmi * 10) / 10;
    }

    function getBmiCategory(bmi) {
        if (!bmi) return { label: "--", class: "" };
        if (bmi < 18.5) return { label: "نقص في الوزن", class: "underweight" };
        if (bmi < 25.0) return { label: "وزن مثالي 👍", class: "normal" };
        if (bmi < 30.0) return { label: "زيادة في الوزن ⚠️", class: "overweight" };
        return { label: "سمنة - يُنصح بالمتابعة 🚨", class: "obese" };
    }

    function calculateIdealWeightRange(heightCm) {
        if (!heightCm || heightCm <= 0) return "--";
        const heightMeters = heightCm / 100;
        const idealBase = 22 * (heightMeters * heightMeters);
        const minIdeal = Math.round(idealBase * 0.95);
        const maxIdeal = Math.round(idealBase * 1.05);
        return `${minIdeal} - ${maxIdeal}`;
    }

    function calculateEstimatedCalories(weightKg, heightCm) {
        if (!weightKg || !heightCm) return "--";
        // BMR estimate for moderate activity
        const bmr = 10 * weightKg + 6.25 * heightCm - 5 * 25 + 5;
        const maintenance = Math.round(bmr * 1.4);
        return maintenance.toLocaleString("ar-EG");
    }

    function updateLiveCalculatorResults(weightKg, heightCm) {
        const bmi = calculateBmi(weightKg, heightCm);
        if (bmi) {
            resBmiVal.textContent = bmi.toLocaleString("ar-EG");
            const cat = getBmiCategory(bmi);
            resBmiStatus.textContent = cat.label;
            resBmiStatus.className = `bmi-badge ${cat.class}`;
        } else {
            resBmiVal.textContent = "--";
            resBmiStatus.textContent = "--";
            resBmiStatus.className = "bmi-badge";
        }

        const idealRange = calculateIdealWeightRange(heightCm);
        resIdealWeight.textContent = `${idealRange} كجم`;

        const calories = calculateEstimatedCalories(weightKg, heightCm);
        resCalories.textContent = `${calories} كالوري`;
    }

    /* Rendering Dashboard Views */
    function renderMemberDashboard(member) {
        currentMember = member;

        // Header Info
        headerMemberName.textContent = member.name || "المشترك";
        headerMemberCode.textContent = member.code || "";
        userHeaderInfo.hidden = false;

        // Hero Info
        dashMemberName.textContent = member.name || "المشترك";
        dashMemberCode.textContent = member.code || "";
        if (member.photo) {
            dashMemberPhoto.src = member.photo;
            dashMemberPhoto.hidden = false;
            dashMemberAvatarPlaceholder.hidden = true;
        } else {
            dashMemberPhoto.hidden = true;
            dashMemberAvatarPlaceholder.hidden = false;
        }

        // Subscription Info
        const remainingDays = Math.max(0, Math.floor(Number(member.remainingDays || 0)));
        dashRemainingDays.textContent = remainingDays.toLocaleString("ar-EG");
        dashPlanName.textContent = member.plan || "شهر";
        dashPlanPrice.textContent = `${(Number(member.price || 0)).toLocaleString("ar-EG")} ج.م`;
        dashStartDate.textContent = formatDate(member.subscriptionStartedAt || member.createdAt);
        dashEndDate.textContent = formatDate(member.subscriptionEndsAt);

        // Subscription Status Badge
        if (remainingDays > 7) {
            dashSubStatus.textContent = "نشط 🟢";
            dashSubStatus.className = "status-badge active";
        } else if (remainingDays > 0) {
            dashSubStatus.textContent = "ينتهي قريباً ⚠️";
            dashSubStatus.className = "status-badge expiring";
        } else {
            dashSubStatus.textContent = "منتهي 🔴";
            dashSubStatus.className = "status-badge expired";
        }

        // Fill Weight & Height
        const weight = Number(member.weight || 0);
        const height = Number(member.height || 0);
        if (weight > 0) calcWeight.value = weight;
        if (height > 0) calcHeight.value = height;

        updateLiveCalculatorResults(weight, height);

        // Render Measurement Log & Comparison
        renderComparisonAndHistory(member);

        // Render Attendance
        renderAttendanceLog(member);

        // Render QR Code
        renderMemberQrCode(member);

        // Switch Screen
        loginScreen.classList.remove("active");
        loginScreen.hidden = true;
        dashboardScreen.hidden = false;
        dashboardScreen.classList.add("active");
    }

    function renderMemberQrCode(member) {
        const wrap = document.querySelector(".qr-canvas-wrap");
        const qrName = document.getElementById("qr-display-name");
        const qrCodeEl = document.getElementById("qr-display-code");
        if (!wrap) return;

        if (qrName) qrName.textContent = member.name || "";
        if (qrCodeEl) qrCodeEl.textContent = member.code || "";

        // Clear any previously generated QR image/canvas
        wrap.innerHTML = "";

        const qrData = JSON.stringify({
            id: member.id,
            code: member.code,
            name: member.name,
            phone: member.phone
        });

        if (typeof QRCode !== "undefined") {
            new QRCode(wrap, {
                text: qrData,
                width: 200,
                height: 200,
                colorDark: "#0b0f19",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        } else {
            wrap.innerHTML = `<p style="color:#9ca3af;font-size:12px">تعذر تحميل مكتبة QR. تأكد من الاتصال بالإنترنت.</p>`;
        }
    }

    function renderComparisonAndHistory(member) {
        const log = Array.isArray(member.measurementLog) ? [...member.measurementLog] : [];

        // If no log entries, build a synthetic initial entry if height/weight exist
        if (!log.length && (member.weight || member.height)) {
            log.push({
                at: member.createdAt || new Date().toISOString(),
                date: (member.createdAt || new Date().toISOString()).slice(0, 10),
                weight: Number(member.weight || 0),
                height: Number(member.height || 0)
            });
        }

        if (!log.length) {
            compInitialWeight.textContent = "-- كجم";
            compInitialDate.textContent = "--/--/----";
            compLatestWeight.textContent = "-- كجم";
            compLatestDate.textContent = "--/--/----";
            compWeightDiff.textContent = "0 كجم";
            compDiffBadge.textContent = "ثابت";
            historyTableBody.innerHTML = `<tr><td colspan="4" class="empty-msg">لا توجد قياسات مسجلة بعد.</td></tr>`;
            return;
        }

        // Sort chronological (oldest first)
        const sortedAsc = [...log].sort((a, b) => (a.at || a.date || "").localeCompare(b.at || b.date || ""));
        const initial = sortedAsc[0];
        const latest = sortedAsc[sortedAsc.length - 1];

        compInitialWeight.textContent = `${Number(initial.weight || member.weight || 0).toLocaleString("ar-EG")} كجم`;
        compInitialDate.textContent = formatDate(initial.at || initial.date || member.createdAt);

        compLatestWeight.textContent = `${Number(latest.weight || member.weight || 0).toLocaleString("ar-EG")} كجم`;
        compLatestDate.textContent = formatDate(latest.at || latest.date || new Date());

        const initialW = Number(initial.weight || 0);
        const latestW = Number(latest.weight || 0);
        const diff = Math.round((latestW - initialW) * 10) / 10;

        if (diff > 0) {
            compWeightDiff.textContent = `+${diff.toLocaleString("ar-EG")} كجم`;
            compDiffBadge.textContent = "زيادة في الوزن 📈";
            compDiffBadge.style.color = "#fcd34d";
        } else if (diff < 0) {
            compWeightDiff.textContent = `${diff.toLocaleString("ar-EG")} كجم`;
            compDiffBadge.textContent = "نزول في الوزن 📉";
            compDiffBadge.style.color = "#6ee7b7";
        } else {
            compWeightDiff.textContent = `0 كجم`;
            compDiffBadge.textContent = "ثابت ⚖️";
            compDiffBadge.style.color = "#9ca3af";
        }

        // Render History Table (newest first)
        const sortedDesc = [...log].reverse();
        historyTableBody.innerHTML = sortedDesc.map((item) => {
            const w = Number(item.weight || 0);
            const h = Number(item.height || 0);
            const bmi = calculateBmi(w, h);
            const bmiText = bmi ? `${bmi.toLocaleString("ar-EG")} (${getBmiCategory(bmi).label})` : "--";

            return `
                <tr>
                    <td>${formatDate(item.at || item.date || item.createdAt)}</td>
                    <td>${w ? `${w.toLocaleString("ar-EG")} كجم` : "--"}</td>
                    <td>${h ? `${h.toLocaleString("ar-EG")} سم` : "--"}</td>
                    <td>${bmiText}</td>
                </tr>
            `;
        }).join("");
    }

    function renderAttendanceLog(member) {
        const attendanceLog = Array.isArray(member.attendanceLog) ? member.attendanceLog : [];
        const count = attendanceLog.length || Number(member.attendanceCount || 0);

        dashAttendanceCount.textContent = `${count.toLocaleString("ar-EG")} مرات حضور`;

        if (!attendanceLog.length) {
            dashAttendanceList.innerHTML = `<p class="empty-msg">لم يتم تسجيل حضور بعد في التمرين.</p>`;
            return;
        }

        const sortedLog = [...attendanceLog].reverse().slice(0, 10);
        dashAttendanceList.innerHTML = sortedLog.map((item) => {
            const dateStr = typeof item === "object" ? (item.at || item.date) : item;
            return `
                <div class="attendance-item">
                    <div>
                        <strong>تمرين الجيم 💪</strong>
                        <br>
                        <small>${formatDate(dateStr)}</small>
                    </div>
                    <span class="status-badge active">تم الحضور ✅</span>
                </div>
            `;
        }).join("");
    }

    /* API Interactions */
    async function handleLoginSubmit(event) {
        event.preventDefault();
        hideFeedback(loginFeedbackMsg);

        const code = inputMemberCode.value.trim();
        const phone = inputMemberPhone.value.trim();

        if (!code || !phone) {
            showFeedback(loginFeedbackMsg, "يرجى كتابة كود المشترك ورقم الهاتف لتسجيل الدخول.");
            return;
        }

        loginSubmitBtn.disabled = true;
        loginSubmitBtn.querySelector("span").textContent = "جاري التحقق من الحساب...";

        try {
            const response = await fetch(`${getApiBaseUrl()}/api/member/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, phone })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const errorMsg = data?.error || "تعذر تسجيل الدخول. يرجى التأكد من البيانات وموافقة الكابتن.";
                showFeedback(loginFeedbackMsg, errorMsg, true);
                return;
            }

            if (data.ok && data.member) {
                localStorage.setItem(MEMBER_SESSION_KEY, JSON.stringify(data.member));
                renderMemberDashboard(data.member);
            } else {
                showFeedback(loginFeedbackMsg, "بيانات غير متوقعة من السيرفر.", true);
            }

        } catch (error) {
            showFeedback(loginFeedbackMsg, "تعذر الاتصال بالسيرفر. يرجى التأكد من تشغيل خادم الجيم والاتصال بالشبكة.", true);
        } finally {
            loginSubmitBtn.disabled = false;
            loginSubmitBtn.querySelector("span").textContent = "دخول الحساب";
        }
    }

    async function handleMeasurementSubmit(event) {
        event.preventDefault();
        if (!currentMember) return;

        const weight = Number(calcWeight.value || 0);
        const height = Number(calcHeight.value || 0);

        if (weight <= 0 || height <= 0) {
            alert("يرجى إدخال الطول والوزن بشكل صحيح.");
            return;
        }

        const saveBtn = document.getElementById("save-measure-btn");
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.textContent = "جاري الحفظ...";
        }

        try {
            const response = await fetch(`${getApiBaseUrl()}/api/member/measurements`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    memberId: currentMember.id,
                    weight,
                    height
                })
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok && data.member) {
                currentMember = data.member;
                localStorage.setItem(MEMBER_SESSION_KEY, JSON.stringify(currentMember));
                renderMemberDashboard(currentMember);
                alert("تم حفظ قياس الوزن والطول الجديد وتحديث مقارنة التطور بنجاح! 🎯");
            } else {
                alert(data.error || "فشل حفظ القياسات.");
            }
        } catch {
            alert("تعذر الاتصال بالسيرفر لحفظ القياسات.");
        } finally {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.textContent = "💾 احتساب وحفظ القياس";
            }
        }
    }

    async function handleRenewalRequest() {
        if (!currentMember) return;

        requestRenewBtn.disabled = true;
        requestRenewBtn.textContent = "جاري إرسال الطلب...";

        try {
            const response = await fetch(`${getApiBaseUrl()}/api/member/renewal-request`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId: currentMember.id })
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                renewToastMsg.textContent = data.message || "تم إرسال طلب تجديد الاشتراك للكابتن بنجاح! ⚡";
                renewToastMsg.hidden = false;
            } else {
                alert(data.error || "تعذر إرسال طلب التجديد.");
            }
        } catch {
            alert("تعذر الاتصال بالسيرفر لإرسال طلب التجديد.");
        } finally {
            requestRenewBtn.disabled = false;
            requestRenewBtn.textContent = "⚡ طلب تجديد الاشتراك الآن";
        }
    }

    function handleLogout() {
        localStorage.removeItem(MEMBER_SESSION_KEY);
        currentMember = null;
        userHeaderInfo.hidden = true;

        dashboardScreen.classList.remove("active");
        dashboardScreen.hidden = true;

        loginScreen.hidden = false;
        loginScreen.classList.add("active");
    }

    /* Event Listeners Initialization */
    function init() {
        loginForm?.addEventListener("submit", handleLoginSubmit);
        measurementForm?.addEventListener("submit", handleMeasurementSubmit);
        requestRenewBtn?.addEventListener("click", handleRenewalRequest);
        memberLogoutBtn?.addEventListener("click", handleLogout);

        // Live calculator input feedback
        calcWeight?.addEventListener("input", () => updateLiveCalculatorResults(Number(calcWeight.value), Number(calcHeight.value)));
        calcHeight?.addEventListener("input", () => updateLiveCalculatorResults(Number(calcWeight.value), Number(calcHeight.value)));

        // Auto-restore Session if exists
        const savedSession = localStorage.getItem(MEMBER_SESSION_KEY);
        if (savedSession) {
            try {
                const member = JSON.parse(savedSession);
                if (member && member.id) {
                    renderMemberDashboard(member);
                }
            } catch {
                localStorage.removeItem(MEMBER_SESSION_KEY);
            }
        }
    }

    document.addEventListener("DOMContentLoaded", init);

})();
