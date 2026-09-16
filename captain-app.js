/* captain-app.js */
(function () {
    'use strict';

    var scanning = false;
    var scanStream = null;
    var scanRaf = null;
    var lastScanData = null;
    var SESSION_KEY = 'zahran_captain_session';

    var loginScreen    = document.getElementById('login-screen');
    var dashScreen     = document.getElementById('dashboard-screen');
    var loginForm      = document.getElementById('captain-login-form');
    var loginField     = document.getElementById('captain-code-field');
    var loginMsg       = document.getElementById('login-msg');
    var loginBtn       = document.getElementById('captain-login-btn');
    var logoutBtn      = document.getElementById('cap-logout-btn');
    var tabScan        = document.getElementById('tab-scan');
    var tabToday       = document.getElementById('tab-today');
    var tabContentScan = document.getElementById('tab-content-scan');
    var tabContentToday= document.getElementById('tab-content-today');
    var capVideoWrap   = document.getElementById('cap-video-wrap');
    var capVideo       = document.getElementById('cap-qr-video');
    var capCanvas      = document.getElementById('cap-qr-canvas');
    var capStartBtn    = document.getElementById('cap-start-scan');
    var capStopBtn     = document.getElementById('cap-stop-scan');
    var capScanMsg     = document.getElementById('cap-scan-msg');
    var capMemberCard  = document.getElementById('cap-member-card');
    var capScanAgain   = document.getElementById('cap-scan-again');
    var capMemberName  = document.getElementById('cap-member-name');
    var capMemberCode  = document.getElementById('cap-member-code');
    var capMemberStatus= document.getElementById('cap-member-status');
    var capMemberPlan  = document.getElementById('cap-member-plan');
    var capMemberDays  = document.getElementById('cap-member-days');
    var capMemberEnd   = document.getElementById('cap-member-end');
    var capMemberPhone = document.getElementById('cap-member-phone');
    var capMemberAttend= document.getElementById('cap-member-attendance');
    var capCheckinBanner=document.getElementById('cap-checkin-banner');
    var capCheckinIcon = document.getElementById('cap-checkin-icon');
    var capCheckinMsg  = document.getElementById('cap-checkin-msg');
    var capTodayCount  = document.getElementById('cap-today-count');
    var capTodayList   = document.getElementById('cap-today-list');
    var capRefreshToday= document.getElementById('cap-refresh-today');

    function getSession() {
        try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch(e) { return null; }
    }
    function saveSession(d) { localStorage.setItem(SESSION_KEY, JSON.stringify(d)); }
    function clearSession() { localStorage.removeItem(SESSION_KEY); }

    function showLogin() {
        loginScreen.hidden = false;
        loginScreen.classList.add('active');
        dashScreen.hidden = true;
        dashScreen.classList.remove('active');
    }
    function showDashboard() {
        loginScreen.hidden = true;
        loginScreen.classList.remove('active');
        dashScreen.hidden = false;
        dashScreen.classList.add('active');
    }

    function init() {
        var s = getSession();
        if (s && s.loggedIn) { showDashboard(); } else { showLogin(); }
        loginForm.addEventListener('submit', handleLogin);
        logoutBtn.addEventListener('click', handleLogout);
        capStartBtn.addEventListener('click', startScanning);
        capStopBtn.addEventListener('click', stopScanning);
        capScanAgain.addEventListener('click', resetScan);
        capRefreshToday.addEventListener('click', loadTodayMembers);
        tabScan.addEventListener('click', function() { switchTab('scan'); });
        tabToday.addEventListener('click', function() { switchTab('today'); loadTodayMembers(); });
    }

    async function handleLogin(e) {
        e.preventDefault();
        var code = loginField.value.trim();
        if (!code) return;
        loginMsg.textContent = '';
        loginMsg.className = 'cap-feedback';
        loginMsg.hidden = true;
        loginBtn.disabled = true;
        loginBtn.textContent = '...';
        try {
            var res = await fetch('/api/captain/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code })
            });
            var data = await res.json();
            if (res.ok && data.ok) {
                saveSession({ loggedIn: true });
                loginField.value = '';
                showDashboard();
            } else {
                loginMsg.textContent = data.error || 'كود غير صحيح.';
                loginMsg.className = 'cap-feedback error';
                loginMsg.hidden = false;
            }
        } catch(err) {
            loginMsg.textContent = 'تعذر الاتصال بالخادم.';
            loginMsg.className = 'cap-feedback error';
            loginMsg.hidden = false;
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'دخول';
        }
    }

    function handleLogout() {
        stopScanning();
        clearSession();
        showLogin();
        loginMsg.hidden = true;
    }

    function switchTab(tab) {
        tabScan.classList.toggle('active', tab === 'scan');
        tabToday.classList.toggle('active', tab === 'today');
        tabContentScan.hidden = (tab !== 'scan');
        tabContentScan.classList.toggle('active', tab === 'scan');
        tabContentToday.hidden = (tab !== 'today');
        tabContentToday.classList.toggle('active', tab === 'today');
        if (tab !== 'scan') stopScanning();
    }

    async function startScanning() {
        if (scanning) return;
        capScanMsg.textContent = 'جاري فتح الكاميرا...';
        capStartBtn.hidden = true;
        capStopBtn.hidden = false;
        capMemberCard.hidden = true;
        lastScanData = null;
        try {
            scanStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            capVideo.srcObject = scanStream;
            await capVideo.play();
            capVideoWrap.hidden = false;
            capScanMsg.textContent = '';
            scanning = true;
            scanLoop();
        } catch(err) {
            capStartBtn.hidden = false;
            capStopBtn.hidden = true;
            capScanMsg.textContent = 'تعذر فتح الكاميرا: ' + (err.message || err);
        }
    }

    function stopScanning() {
        if (scanRaf) { cancelAnimationFrame(scanRaf); scanRaf = null; }
        if (scanStream) { scanStream.getTracks().forEach(function(t){ t.stop(); }); scanStream = null; }
        capVideo.srcObject = null;
        capVideoWrap.hidden = true;
        capStartBtn.hidden = false;
        capStopBtn.hidden = true;
        scanning = false;
        capScanMsg.textContent = '';
    }

    function resetScan() {
        capMemberCard.hidden = true;
        lastScanData = null;
        capScanMsg.textContent = '';
        startScanning();
    }

    function scanLoop() {
        if (!scanning) return;
        scanRaf = requestAnimationFrame(scanLoop);
        if (capVideo.readyState < 2) return;
        var w = capVideo.videoWidth, h = capVideo.videoHeight;
        if (!w || !h) return;
        capCanvas.width = w; capCanvas.height = h;
        var ctx = capCanvas.getContext('2d');
        ctx.drawImage(capVideo, 0, 0, w, h);
        var img = ctx.getImageData(0, 0, w, h);
        var code = null;
        if (typeof jsQR !== 'undefined') {
            var r = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
            if (r) code = r.data;
        }
        if (!code && 'BarcodeDetector' in window) {
            if (!window._bd) window._bd = new BarcodeDetector({ formats: ['qr_code'] });
            window._bd.detect(capCanvas).then(function(rs) { if (rs.length) handleQrCode(rs[0].rawValue); }).catch(function(){});
        }
        if (code) handleQrCode(code);
    }

    function handleQrCode(raw) {
        if (raw === lastScanData) return;
        lastScanData = raw;
        stopScanning();
        var qrData;
        try { qrData = JSON.parse(raw); } catch(e) {
            capScanMsg.textContent = 'QR Code غير صالح.';
            setTimeout(resetScan, 2200);
            return;
        }
        if (!qrData.id && !qrData.code) {
            capScanMsg.textContent = 'QR لا يحتوي بيانات مشترك.';
            setTimeout(resetScan, 2200);
            return;
        }
        capScanMsg.textContent = 'جاري تسجيل الحضور...';
        recordAttendance(qrData);
    }

    async function recordAttendance(qrData) {
        try {
            var res = await fetch('/api/qr/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memberId: qrData.id, code: qrData.code })
            });
            var data = await res.json();
            if (res.ok && data.member) {
                showMemberResult(data.member, data.alreadyCheckedIn || data.alreadyToday);
            } else {
                capScanMsg.textContent = data.error || data.message || 'لم يتم العثور على المشترك.';
                setTimeout(resetScan, 2500);
            }
        } catch(e) {
            capScanMsg.textContent = 'تعذر الاتصال بالخادم.';
            setTimeout(resetScan, 2500);
        }
    }

    function calcDaysLeft(endDate) {
        if (!endDate) return null;
        var end = new Date(endDate);
        if (isNaN(end)) return null;
        var today = new Date(); today.setHours(0,0,0,0);
        return Math.floor((end - today) / 86400000);
    }

    function showMemberResult(member, alreadyToday) {
        capScanMsg.textContent = '';
        capMemberCard.hidden = false;
        capMemberName.textContent  = member.name  || '-';
        capMemberCode.textContent  = member.code  || '-';
        capMemberPhone.textContent = member.phone || '-';
        capMemberPlan.textContent  = member.plan  || '-';
        var daysLeft = calcDaysLeft(member.endDate);
        capMemberDays.textContent  = (daysLeft !== null) ? (daysLeft + ' يوم') : '-';
        capMemberEnd.textContent   = member.endDate || '-';
        var cnt = Array.isArray(member.attendanceLog) ? member.attendanceLog.length : 0;
        capMemberAttend.textContent = cnt + ' مرة';
        var statusText = 'نشط', statusClass = 'active';
        if (daysLeft === null || daysLeft < 0) { statusText = 'منتهي'; statusClass = 'expired'; }
        else if (daysLeft <= 7) { statusText = 'قارب على الانتهاء'; statusClass = 'expiring'; }
        capMemberStatus.textContent = statusText;
        capMemberStatus.className = 'cap-status-badge ' + statusClass;
        capCheckinBanner.className = 'cap-checkin-banner';
        if (statusClass === 'expired') {
            capCheckinBanner.classList.add('expired');
            capCheckinIcon.textContent = '⚠️';
            capCheckinMsg.textContent = 'الاشتراك منتهي';
        } else if (alreadyToday) {
            capCheckinBanner.classList.add('already-in');
            capCheckinIcon.textContent = '🔵';
            capCheckinMsg.textContent = 'مسجّل مسبقاً اليوم';
        } else {
            capCheckinBanner.classList.add('checked-in');
            capCheckinIcon.textContent = '✅';
            capCheckinMsg.textContent = 'تم تسجيل الحضور';
        }
    }

    async function loadTodayMembers() {
        capTodayList.innerHTML = '<p class="cap-empty">جاري التحميل...</p>';
        capTodayCount.textContent = '...';
        try {
            var res = await fetch('/api/captain/today');
            var data = await res.json();
            if (!res.ok) throw new Error(data.error || 'خطأ');
            renderTodayList(data.members || []);
        } catch(err) {
            capTodayList.innerHTML = '<p class="cap-empty">تعذر تحميل البيانات.</p>';
            capTodayCount.textContent = '0 مشترك';
        }
    }

    function todayDate() {
        var d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    }

    function lastTodayLog(member, todayStr) {
        if (!Array.isArray(member.attendanceLog)) return null;
        var logs = member.attendanceLog.slice().reverse();
        for (var i = 0; i < logs.length; i++) {
            var l = logs[i];
            var d = (typeof l === 'object') ? (l.date || (l.at||'').slice(0,10)) : String(l).slice(0,10);
            if (d === todayStr) return l;
        }
        return null;
    }

    function renderTodayList(members) {
        var count = members.length;
        capTodayCount.textContent = count + ' مشترك';
        if (count === 0) { capTodayList.innerHTML = '<p class="cap-empty">لا أحد في الجيم بعد اليوم.</p>'; return; }
        var t = todayDate();
        members.sort(function(a,b) {
            var al = lastTodayLog(a,t), bl = lastTodayLog(b,t);
            var at = al ? (typeof al==='object' ? al.time||'' : '') : '';
            var bt = bl ? (typeof bl==='object' ? bl.time||'' : '') : '';
            return bt.localeCompare(at);
        });
        capTodayList.innerHTML = '';
        members.forEach(function(m) {
            var log = lastTodayLog(m, t);
            var time = log && typeof log==='object' ? (log.time||'--:--') : '--:--';
            var div = document.createElement('div');
            div.className = 'cap-today-item';
            div.innerHTML =
                '<div class="cap-today-avatar">🏋️</div>' +
                '<div class="cap-today-info"><strong>' + esc(m.name) + '</strong>' +
                '<small>' + esc(m.code) + ' &bull; ' + esc(m.plan||'-') + '</small></div>' +
                '<span class="cap-today-time">' + esc(time) + '</span>';
            capTodayList.appendChild(div);
        });
    }

    function esc(s) {
        return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    document.addEventListener('DOMContentLoaded', init);
})();
