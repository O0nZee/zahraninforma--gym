/* Supervisor App — Zahran Informa */
(function () {
    "use strict";

    const API = window.location.origin;
    let allMembers = [];

    /* ── DOM refs ── */
    const loginScreen   = document.getElementById("login-screen");
    const appShell       = document.getElementById("app-shell");
    const loginForm      = document.getElementById("login-form");
    const loginCodeInput = document.getElementById("login-code");
    const loginError     = document.getElementById("login-error");
    const loginBtn       = document.getElementById("login-btn");
    const logoutBtn      = document.getElementById("logout-btn");

    const tabBtns        = document.querySelectorAll(".tab-btn");
    const tabContents    = document.querySelectorAll(".tab-content");

    // Add member
    const addForm        = document.getElementById("add-member-form");
    const addMsg         = document.getElementById("add-message");

    // Attendance
    const attendSearch   = document.getElementById("attend-search");
    const attendList     = document.getElementById("attend-list");

    // Today
    const todayCount     = document.getElementById("today-count");
    const todayList      = document.getElementById("today-list");
    const refreshTodayBtn = document.getElementById("refresh-today");

    /* ── Login / Logout ── */
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const code = loginCodeInput.value.trim();
        if (!code) return;

        loginBtn.disabled = true;
        loginError.textContent = "";

        try {
            const res = await fetch(API + "/api/supervisor/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                sessionStorage.setItem("sv_logged", "1");
                showApp();
            } else {
                loginError.textContent = data.error || "كود خاطئ";
            }
        } catch {
            loginError.textContent = "تعذر الاتصال بالسيرفر.";
        } finally {
            loginBtn.disabled = false;
        }
    });

    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("sv_logged");
        loginScreen.style.display = "flex";
        appShell.classList.remove("active");
        loginCodeInput.value = "";
    });

    function showApp() {
        loginScreen.style.display = "none";
        appShell.classList.add("active");
        loadMembers();
        loadToday();
    }

    /* ── Tabs ── */
    tabBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const target = btn.dataset.tab;
            tabBtns.forEach(function (b) { b.classList.remove("active"); });
            tabContents.forEach(function (c) { c.classList.remove("active"); });
            btn.classList.add("active");
            document.getElementById("tab-" + target).classList.add("active");
            if (target === "attend") loadMembers();
            if (target === "today") loadToday();
        });
    });

    /* ── Load Members ── */
    async function loadMembers() {
        try {
            const res = await fetch(API + "/api/members");
            allMembers = await res.json();
        } catch {
            allMembers = [];
        }
        renderAttendList();
    }

    /* ── Add Member ── */
    addForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        addMsg.textContent = "";
        addMsg.className = "form-message";

        const name  = document.getElementById("add-name").value.trim();
        const code  = document.getElementById("add-code").value.trim();
        const phone = document.getElementById("add-phone").value.trim();
        const plan  = document.getElementById("add-plan").value;
        const price = Number(document.getElementById("add-price").value) || 0;

        if (!name || !code) {
            addMsg.textContent = "الاسم والكود مطلوبان.";
            addMsg.className = "form-message msg-error";
            return;
        }

        const planDays = { "نص شهر": 15, "شهر": 30, "10 أيام": 10 };
        const totalDays = planDays[plan] || 30;
        const now = new Date();
        const startDate = now.toISOString().slice(0, 10);
        const endDate = new Date(now.getTime() + totalDays * 86400000).toISOString().slice(0, 10);

        const member = {
            name, code, phone, plan, price,
            totalDays,
            remainingDays: totalDays,
            subscriptionStartedAt: startDate,
            subscriptionEndsAt: endDate,
            attendanceCount: 0,
            attendanceLog: []
        };

        const submitBtn = addForm.querySelector(".submit-btn");
        submitBtn.disabled = true;

        try {
            const res = await fetch(API + "/api/members", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(member)
            });
            const data = await res.json();
            if (res.ok) {
                addMsg.textContent = "تم إضافة المشترك بنجاح ✅";
                addMsg.className = "form-message msg-success";
                addForm.reset();
                loadMembers();
            } else {
                addMsg.textContent = data.error || "حدث خطأ.";
                addMsg.className = "form-message msg-error";
            }
        } catch {
            addMsg.textContent = "تعذر الاتصال بالسيرفر.";
            addMsg.className = "form-message msg-error";
        } finally {
            submitBtn.disabled = false;
        }
    });

    /* ── Attendance Search & List ── */
    attendSearch.addEventListener("input", renderAttendList);

    function renderAttendList() {
        const q = (attendSearch.value || "").trim().toLowerCase();
        const today = new Date().toISOString().slice(0, 10);

        let filtered = allMembers;
        if (q) {
            filtered = allMembers.filter(function (m) {
                return (m.name || "").toLowerCase().includes(q) ||
                       (m.code || "").toLowerCase().includes(q) ||
                       (m.phone || "").includes(q);
            });
        }

        if (!filtered.length) {
            attendList.innerHTML = '<div class="empty-state">' + (q ? 'لا توجد نتائج' : 'لا يوجد مشتركين') + '</div>';
            return;
        }

        attendList.innerHTML = filtered.map(function (m) {
            var log = Array.isArray(m.attendanceLog) ? m.attendanceLog : [];
            var attended = log.some(function (entry) {
                var d = typeof entry === "object" ? (entry.date || (entry.at || "").slice(0, 10)) : String(entry).slice(0, 10);
                return d === today;
            });

            return '<div class="member-card">' +
                '<div class="member-info">' +
                    '<h3>' + escHtml(m.name) + '</h3>' +
                    '<p>' + escHtml(m.code) + (m.phone ? ' • ' + escHtml(m.phone) : '') + '</p>' +
                '</div>' +
                (attended
                    ? '<button class="attend-btn done" disabled>تم ✓</button>'
                    : '<button class="attend-btn" onclick="supervisorApp.markAttendance(\'' + escAttr(m.id) + '\', this)">حضور</button>') +
            '</div>';
        }).join("");
    }

    window.supervisorApp = {
        markAttendance: async function (memberId, btnEl) {
            btnEl.disabled = true;
            try {
                var res = await fetch(API + "/api/qr/attendance", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ memberId: memberId })
                });
                var data = await res.json();
                if (res.ok) {
                    btnEl.textContent = "تم ✓";
                    btnEl.className = "attend-btn done";
                    loadMembers();
                } else {
                    alert(data.error || "حدث خطأ");
                    btnEl.disabled = false;
                }
            } catch {
                alert("تعذر الاتصال بالسيرفر.");
                btnEl.disabled = false;
            }
        }
    };

    /* ── Today ── */
    refreshTodayBtn.addEventListener("click", loadToday);

    async function loadToday() {
        todayCount.textContent = "...";
        todayList.innerHTML = "";
        try {
            var res = await fetch(API + "/api/captain/today");
            var data = await res.json();
            var members = data.members || [];
            todayCount.textContent = members.length;

            if (!members.length) {
                todayList.innerHTML = '<div class="empty-state">لا يوجد حضور اليوم بعد</div>';
                return;
            }

            var today = new Date().toISOString().slice(0, 10);
            todayList.innerHTML = members.map(function (m) {
                var log = Array.isArray(m.attendanceLog) ? m.attendanceLog : [];
                var todayEntry = null;
                for (var i = log.length - 1; i >= 0; i--) {
                    var entry = log[i];
                    var d = typeof entry === "object" ? (entry.date || (entry.at || "").slice(0, 10)) : String(entry).slice(0, 10);
                    if (d === today) { todayEntry = entry; break; }
                }
                var time = todayEntry && todayEntry.time ? todayEntry.time : (todayEntry && todayEntry.at ? todayEntry.at.slice(11, 16) : "");

                return '<div class="today-member">' +
                    '<span class="name">' + escHtml(m.name) + ' <small style="color:var(--text-muted)">' + escHtml(m.code) + '</small></span>' +
                    '<span class="time">' + escHtml(time) + '</span>' +
                '</div>';
            }).join("");
        } catch {
            todayList.innerHTML = '<div class="empty-state">تعذر تحميل البيانات</div>';
        }
    }

    /* ── Helpers ── */
    function escHtml(s) {
        var d = document.createElement("div");
        d.textContent = String(s || "");
        return d.innerHTML;
    }

    function escAttr(s) {
        return String(s || "").replace(/'/g, "\\'").replace(/"/g, "&quot;");
    }

    /* ── Auto-login if session is active ── */
    if (sessionStorage.getItem("sv_logged") === "1") {
        showApp();
    }
})();
