
(function () {
    "use strict";
 
    const SESSION_KEY = "ems_current_user";
    const user = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
 
    if (!user) {
        window.location.href = "./signup-login.html";
        return;
    }
 
    // Make the logged-in user available to any other script on the page
    window.currentUser = user; // { username, role, email? }
 
    document.addEventListener("DOMContentLoaded", function () {
        const nameEl = document.getElementById("current-username");
        if (nameEl) nameEl.textContent = user.username;
 
        const greetingEl = document.getElementById("greeting-name");
        if (greetingEl) greetingEl.textContent = user.username;
 
        const roleEl = document.getElementById("current-role");
        if (roleEl) roleEl.textContent = user.role;
 
        if (user.role !== "admin") {
            document.querySelectorAll("[data-admin-only]").forEach(function (el) {
                el.style.display = "none";
            });
        }
 
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                sessionStorage.removeItem(SESSION_KEY);
                window.location.href = "./signup-login.html";
            });
        }
    });
})();
 