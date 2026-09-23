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

    // Photo
    const photoPreview   = document.getElementById("sv-photo-preview");
    const photoData      = document.getElementById("sv-photo-data");
    const cameraInput    = document.getElementById("sv-camera-input");
    const uploadInput    = document.getElementById("sv-upload-input");
    const clearPhotoBtn  = document.getElementById("sv-clear-photo");

    // Attendance
    const attendSearch   = document.getElementById("attend-search");
    const attendList     = document.getElementById("attend-list");

    // Today
    const todayCount     = document.getElementById("today-count");
    const todayList      = document.getElementById("today-list");
    const refreshTodayBtn = document.getElementById("refresh-today");

    // Finance
    const finForm        = document.getElementById("finance-form");
    const finMsg         = document.getElementById("fin-message");
    const finIncome      = document.getElementById("fin-income");
    const finExpense     = document.getElementById("fin-expense");
    const finNet         = document.getElementById("fin-net");
    const finList        = document.getElementById("finance-list");
    const finDateInput   = document.getElementById("fin-date");

    // Finance lock (الخزنة مقفولة بكود الكابتن)
    const finLock        = document.getElementById("finance-lock");
    const finContent     = document.getElementById("finance-content");
    const finUnlockForm  = document.getElementById("finance-unlock-form");
    const finCodeInput   = document.getElementById("finance-code");
    const finLockError   = document.getElementById("finance-lock-error");
    let financeUnlocked  = false;

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
        financeUnlocked = false;
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
            if (target === "finance") { if (financeUnlocked) loadFinance(); else showFinanceLock(); }
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

    /* ── Photo Processing ── */
    function processPhoto(file) {
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                var maxW = 600, maxH = 600;
                var w = img.width, h = img.height;
                if (w > maxW || h > maxH) {
                    var ratio = Math.min(maxW / w, maxH / h);
                    w = Math.round(w * ratio);
                    h = Math.round(h * ratio);
                }
                var canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;
                canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                var dataUrl = canvas.toDataURL("image/jpeg", 0.7);
                photoData.value = dataUrl;
                photoPreview.innerHTML = '<img src="' + dataUrl + '">';
                clearPhotoBtn.style.display = "inline-block";
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    cameraInput.addEventListener("change", function () {
        if (this.files && this.files[0]) processPhoto(this.files[0]);
    });

    uploadInput.addEventListener("change", function () {
        if (this.files && this.files[0]) processPhoto(this.files[0]);
    });

    clearPhotoBtn.addEventListener("click", function () {
        photoData.value = "";
        photoPreview.innerHTML = "<span>📷</span>";
        clearPhotoBtn.style.display = "none";
        cameraInput.value = "";
        uploadInput.value = "";
    });

    /* ── Add Member ── */
    addForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        addMsg.textContent = "";
        addMsg.className = "form-message";

        const name  = document.getElementById("add-name").value.trim();
        const code  = document.getElementById("add-code").value.trim();
        const phone = document.getElementById("add-phone").value.trim();
        const weight = Number(document.getElementById("add-weight").value) || 0;
        const plan  = document.getElementById("add-plan").value;
        const price = Number(document.getElementById("add-price").value) || 0;
        const photo = photoData.value || "";

        if (!name || !code) {
            addMsg.textContent = "الاسم والكود مطلوبان.";
            addMsg.className = "form-message msg-error";
            return;
        }

        // Prevent adding the same member twice (duplicate code) — instant client check
        var normCode = code.toLowerCase();
        var duplicate = allMembers.some(function (m) {
            return String(m.code || "").trim().toLowerCase() === normCode;
        });
        if (duplicate) {
            addMsg.textContent = "المشترك موجود بالفعل بنفس الكود — مينفعش يتضاف مرتين.";
            addMsg.className = "form-message msg-error";
            return;
        }

        const planDays = { "نص شهر": 15, "شهر": 30, "10 أيام": 10 };
        const totalDays = planDays[plan] || 30;
        const now = new Date();
        const startDate = now.toISOString().slice(0, 10);
        const endDate = new Date(now.getTime() + totalDays * 86400000).toISOString().slice(0, 10);

        const member = {
            name, code, phone, weight, plan, price, photo,
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
                photoData.value = "";
                photoPreview.innerHTML = "<span>📷</span>";
                clearPhotoBtn.style.display = "none";
                loadMembers();
                // ملاحظة: تسجيل الفلوس في الخزنة بيتم تلقائياً في السيرفر عند إضافة المشترك
                // (مرة واحدة فقط، بدون تكرار) — مش محتاج نبعت حركة مالية من هنا.
            } else if (res.status === 409) {
                addMsg.textContent = "المشترك موجود بالفعل بنفس الكود — مينفعش يتضاف مرتين.";
                addMsg.className = "form-message msg-error";
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

    /* ── Finance (الخزنة) ── */
    finDateInput.value = new Date().toISOString().slice(0, 10);

    /* ── Finance lock: الخزنة متاحة فقط بعد إدخال كود الكابتن ── */
    function showFinanceLock() {
        financeUnlocked = false;
        if (finLock) finLock.style.display = "";
        if (finContent) finContent.style.display = "none";
        if (finLockError) finLockError.textContent = "";
        if (finCodeInput) finCodeInput.value = "";
    }

    function showFinanceContent() {
        financeUnlocked = true;
        if (finLock) finLock.style.display = "none";
        if (finContent) finContent.style.display = "";
        loadFinance();
    }

    if (finUnlockForm) {
        finUnlockForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            var code = (finCodeInput.value || "").trim();
            if (!code) return;

            var btn = document.getElementById("finance-unlock-btn");
            if (btn) btn.disabled = true;
            finLockError.textContent = "";
            finLockError.className = "form-message";

            try {
                var res = await fetch(API + "/api/captain/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: code })
                });
                var data = await res.json();
                if (res.ok && data.ok) {
                    showFinanceContent();
                } else {
                    finLockError.textContent = data.error || "كود الكابتن غير صحيح.";
                    finLockError.className = "form-message msg-error";
                }
            } catch {
                finLockError.textContent = "تعذر الاتصال بالسيرفر.";
                finLockError.className = "form-message msg-error";
            } finally {
                if (btn) btn.disabled = false;
            }
        });
    }

    async function loadFinance() {
        finList.innerHTML = '<div class="empty-state">جاري التحميل...</div>';
        try {
            var res = await fetch(API + "/api/finance");
            var entries = await res.json();
            if (!Array.isArray(entries)) entries = [];

            var totalIncome = 0, totalExpense = 0;
            entries.forEach(function (e) {
                if (e.type === "income") totalIncome += Number(e.amount) || 0;
                else totalExpense += Number(e.amount) || 0;
            });

            finIncome.textContent = totalIncome.toLocaleString();
            finExpense.textContent = totalExpense.toLocaleString();
            var net = totalIncome - totalExpense;
            finNet.textContent = net.toLocaleString();
            finNet.parentElement.className = "fin-card net" + (net < 0 ? " negative" : "");

            if (!entries.length) {
                finList.innerHTML = '<div class="empty-state">لا توجد حركات مالية</div>';
                return;
            }

            entries.sort(function (a, b) {
                return (b.date || b.createdAt || "").localeCompare(a.date || a.createdAt || "");
            });

            finList.innerHTML = '<div class="fin-entries">' + entries.map(function (e) {
                var isIncome = e.type === "income";
                return '<div class="fin-entry">' +
                    '<div class="fin-entry-right">' +
                        '<span class="fin-type-dot ' + (isIncome ? 'dot-income' : 'dot-expense') + '"></span>' +
                        '<div><div class="fin-entry-note">' + escHtml(e.note) + '</div>' +
                        '<div class="fin-entry-date">' + escHtml(e.date || "") + '</div></div>' +
                    '</div>' +
                    '<div class="fin-entry-amount ' + (isIncome ? 'amount-income' : 'amount-expense') + '">' +
                        (isIncome ? '+' : '-') + Number(e.amount).toLocaleString() +
                    '</div>' +
                '</div>';
            }).join("") + '</div>';
        } catch {
            finList.innerHTML = '<div class="empty-state">تعذر تحميل البيانات</div>';
        }
    }

    finForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        finMsg.textContent = "";
        finMsg.className = "form-message";

        var type   = document.getElementById("fin-type").value;
        var amount = Number(document.getElementById("fin-amount").value);
        var note   = document.getElementById("fin-note").value.trim();
        var date   = finDateInput.value || new Date().toISOString().slice(0, 10);

        if (!amount || amount <= 0) {
            finMsg.textContent = "المبلغ مطلوب.";
            finMsg.className = "form-message msg-error";
            return;
        }
        if (!note) {
            finMsg.textContent = "الملاحظة مطلوبة.";
            finMsg.className = "form-message msg-error";
            return;
        }

        var submitBtn = finForm.querySelector(".submit-btn");
        submitBtn.disabled = true;

        try {
            var res = await fetch(API + "/api/finance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: type, amount: amount, note: note, date: date })
            });
            var data = await res.json();
            if (res.ok) {
                finMsg.textContent = "تمت الإضافة ✅";
                finMsg.className = "form-message msg-success";
                document.getElementById("fin-amount").value = "";
                document.getElementById("fin-note").value = "";
                finDateInput.value = new Date().toISOString().slice(0, 10);
                loadFinance();
            } else {
                finMsg.textContent = data.error || "حدث خطأ.";
                finMsg.className = "form-message msg-error";
            }
        } catch {
            finMsg.textContent = "تعذر الاتصال بالسيرفر.";
            finMsg.className = "form-message msg-error";
        } finally {
            submitBtn.disabled = false;
        }
    });

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
