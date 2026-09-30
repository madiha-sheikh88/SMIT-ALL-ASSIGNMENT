// sign-in.js — only for sign-in.html (needs auth.js loaded first)

// ----- Theme toggle (same code as your script.js, so the theme stays in sync) -----
const root = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
const startTheme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(startTheme);

function setTheme(t) {
  root.setAttribute("data-theme", t);
  toggleBtn.innerHTML = t === "dark" ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
  localStorage.setItem("theme", t);
}
toggleBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();

// ==================== SIGN-IN / SIGN-UP LOGIC — START ====================
const flip = document.getElementById("authToggle");      // the checkbox that flips the card
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const signupMsg = document.getElementById("signupMsg");
const loginMsg = document.getElementById("loginMsg");

// Already signed in? No need to see this page.
if (PNCA.currentUser()) {
  window.location.replace("index.html");
}

function showMsg(el, text, ok) {
  el.textContent = text;
  el.classList.toggle("ok", !!ok);
}

// ----- Sign up -----
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();                         // stop the browser reloading the page
  const data = new FormData(signupForm);      // reads every input by its name=""

  const result = PNCA.register({
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone"),
    password: data.get("password")
  });

  if (!result.ok) return showMsg(signupMsg, result.error, false);

  signupForm.reset();
  showMsg(signupMsg, "", false);
  showMsg(loginMsg, "Account created! Please log in.", true);
  flip.checked = true;                        // slide the login sheet up
});

// ----- Login -----
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);

  const result = PNCA.login(data.get("email"), data.get("password"));
  if (!result.ok) return showMsg(loginMsg, result.error, false);

  // For now everyone goes home (the navbar will show their name).
  // Later, when your dashboards exist, swap this line for:
  //   window.location.href = PNCA.dashboardFor(result.user);
  window.location.href = "index.html";
});
// ==================== SIGN-IN / SIGN-UP LOGIC — END ====================
