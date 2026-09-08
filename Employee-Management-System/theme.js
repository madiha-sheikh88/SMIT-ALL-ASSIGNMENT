
(function () {
    "use strict";

    const STORAGE_KEY = "ems_theme";
    const saved = localStorage.getItem(STORAGE_KEY) || "dark";
    document.documentElement.setAttribute("data-theme", saved);

    document.addEventListener("DOMContentLoaded", function () {
        const btn = document.getElementById("theme-toggle");
        updateIcon(saved, btn);

        if (btn) {
            btn.addEventListener("click", function () {
                const current = document.documentElement.getAttribute("data-theme");
                const next = current === "dark" ? "light" : "dark";
                document.documentElement.setAttribute("data-theme", next);
                localStorage.setItem(STORAGE_KEY, next);
                updateIcon(next, btn);
            });
        }
    });

    function updateIcon(theme, btn) {
        if (!btn) return;
        const icon = btn.querySelector("i");
        if (!icon) return;
        icon.className = theme === "dark" ? "bx bx-moon" : "bx bx-sun";
    }
})();
