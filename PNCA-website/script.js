// ----- Theme toggle (remembers choice, defaults to system) -----
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

// ----- Typewriter (spelling letter by letter) -----
const typer = document.querySelector(".typewriter");
let typeTimer;

function startTyping() {
  clearInterval(typeTimer);
  const text = typer.dataset.text;
  let i = 0;
  typer.textContent = "";
  typer.classList.add("typing");
  setTimeout(() => {
    typeTimer = setInterval(() => {
      typer.textContent = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(typeTimer); typer.classList.remove("typing"); }
    }, 55);
  }, 1300); // starts after the first two headings have arrived
}
function resetTyping() {
  clearInterval(typeTimer);
  typer.textContent = "";
  typer.classList.remove("typing");
}

// ----- Scroll animations (replay every time the section enters view) -----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("in-view", entry.isIntersecting);
    if (entry.target.classList.contains("hero-text")) {
      entry.isIntersecting ? startTyping() : resetTyping();
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));

// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();


// ==================== FREEFRONTEND.COM ANIMATED SECTION — START ====================
// GSAP ScrollSmoother: smooth scrolling + parallax (data-speed) on the headings and images.
// Note: ScrollSmoother smooths the scrolling of the whole page.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.config({ trialWarn: false });

let smoother = ScrollSmoother.create({
  smooth: 3,
  effects: true
});
// ==================== FREEFRONTEND.COM ANIMATED SECTION — END ====================

