
(function () {
    "use strict";

    // 1) SET YOUR OWN ADMIN LOGIN HERE -----------------------------
    const ADMIN = {
        username: "admin",
        password: "admin@123",   // <-- change this to your own password
        role: "admin"
    };
    // ----------------------------------------------------------------

    const USERS_KEY = "ems_users";
    const SESSION_KEY = "ems_current_user";

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function showMessage(el, text, isError) {
        if (!el) return;
        el.textContent = text;
        el.style.color = isError ? "#ff4d4f" : "#2ecc71";
    }

    // Flip between the Sign In and Sign Up panels.
    // If your CSS used a different class/element to control this in the
    // old script and this doesn't animate correctly, tell me what class
    // your style.css toggles and I'll match it exactly.
    window.toggle = function () {
        const container = document.getElementById("container");
        if (container) container.classList.toggle("sign-in");
    };

    document.addEventListener("DOMContentLoaded", function () {
        // ---------- SIGN UP ----------
        const suBtn = document.getElementById("su-submit");
        if (suBtn) {
            suBtn.addEventListener("click", function () {
                const username = document.getElementById("su-username").value.trim();
                const email = document.getElementById("su-email").value.trim();
                const password = document.getElementById("su-password").value;
                const confirm = document.getElementById("su-confirm").value;
                const msg = document.getElementById("su-msg");

                if (!username || !email || !password || !confirm) {
                    showMessage(msg, "Please fill in every field.", true);
                    return;
                }
                if (password !== confirm) {
                    showMessage(msg, "Passwords do not match.", true);
                    return;
                }
                if (password.length < 6) {
                    showMessage(msg, "Password must be at least 6 characters.", true);
                    return;
                }
                if (username.toLowerCase() === ADMIN.username.toLowerCase()) {
                    showMessage(msg, "That username is reserved.", true);
                    return;
                }

                const users = getUsers();
                const exists = users.some(
                    (u) =>
                        u.username.toLowerCase() === username.toLowerCase() ||
                        u.email.toLowerCase() === email.toLowerCase()
                );
                if (exists) {
                    showMessage(msg, "Username or email already registered.", true);
                    return;
                }

                users.push({ username, email, password, role: "employee" });
                saveUsers(users);

                showMessage(msg, "Account created! Switching to sign in…", false);
                setTimeout(function () {
                    document.getElementById("su-username").value = "";
                    document.getElementById("su-email").value = "";
                    document.getElementById("su-password").value = "";
                    document.getElementById("su-confirm").value = "";
                    window.toggle();
                }, 900);
            });
        }

        // ---------- SIGN IN ----------
        const siBtn = document.getElementById("si-submit");
        if (siBtn) {
            siBtn.addEventListener("click", function () {
                const username = document.getElementById("si-username").value.trim();
                const password = document.getElementById("si-password").value;
                const msg = document.getElementById("si-msg");

                if (!username || !password) {
                    showMessage(msg, "Enter your username and password.", true);
                    return;
                }

                // Admin check first
                if (
                    username.toLowerCase() === ADMIN.username.toLowerCase() &&
                    password === ADMIN.password
                ) {
                    sessionStorage.setItem(
                        SESSION_KEY,
                        JSON.stringify({ username: ADMIN.username, role: "admin" })
                    );
                    showMessage(msg, "Welcome back, admin!", false);
                    setTimeout(function () {
                        window.location.href = "./dashboard.html";
                    }, 500);
                    return;
                }

                // Regular users
                const users = getUsers();
                const user = users.find(
                    (u) =>
                        u.username.toLowerCase() === username.toLowerCase() &&
                        u.password === password
                );

                if (!user) {
                    showMessage(msg, "Incorrect username or password.", true);
                    return;
                }

                sessionStorage.setItem(
                    SESSION_KEY,
                    JSON.stringify({ username: user.username, email: user.email, role: user.role })
                );
                showMessage(msg, "Signed in! Redirecting…", false);
                setTimeout(function () {
                    window.location.href = "./dashboard.html";
                }, 500);
            });
        }

        // Allow pressing Enter inside inputs to submit
        document.querySelectorAll(".form.sign-up input").forEach((input) => {
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") document.getElementById("su-submit").click();
            });
        });
        document.querySelectorAll(".form.sign-in input").forEach((input) => {
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") document.getElementById("si-submit").click();
            });
        });
    });
})();
