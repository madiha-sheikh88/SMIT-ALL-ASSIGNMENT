// THEME TOGGLE

var root = document.documentElement;
var savedTheme = localStorage.getItem("ems-theme");
var systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
var currentTheme = savedTheme || systemTheme;

root.setAttribute("data-theme", currentTheme);

document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("theme-toggle");
    var icon = toggleBtn.querySelector("i");

    icon.className = "bx " + (currentTheme === "light" ? "bx-moon" : "bx-sun");

    toggleBtn.addEventListener("click", function () {
        currentTheme = currentTheme === "light" ? "dark" : "light";

        root.setAttribute("data-theme", currentTheme);
        icon.className = "bx " + (currentTheme === "light" ? "bx-moon" : "bx-sun");
        localStorage.setItem("ems-theme", currentTheme);

        toggleBtn.classList.add("spin");
        setTimeout(function () {
            toggleBtn.classList.remove("spin");
        }, 500);
    });
});
