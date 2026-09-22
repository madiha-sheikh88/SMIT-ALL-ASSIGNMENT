// navbar becomes solid + sticky-styled on scroll
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


let tl = gsap.timeline({ delay: 0.5 });
tl.from("#heroName", {
  x: -200,
  duration: 1.2,
  opacity: 0,
  scale: 0.94,
  ease: "power3.out"
});
tl.from("#heroTagline", {
  opacity: 0,
  y: 500,
  duration: 1.2,
  delay: 0.5
});
// ---- Skills marquee (two rows, opposite directions) ----
const skills = [
  { name: 'HTML5', bg: '#e34f26', ic: '</>' },
  { name: 'CSS3', bg: '#2965f1', ic: '{ }' },
  { name: 'JavaScript (ES6)', bg: '#d4b106', ic: 'JS' },
  { name: 'GitHub', bg: '#24292e', ic: 'GH' },
  { name: 'Excel', bg: '#1d6f42', ic: 'XL' },
  { name: 'Scratch', bg: '#f97316', ic: 'SC' },
  { name: 'Git', bg: '#b91c1c', ic: 'GIT' },
  { name: 'Bootstrap', bg: '#6f42c1', ic: 'BS' },
  { name: 'Figma', bg: '#7c3aed', ic: 'FG' },
  { name: 'VS Code', bg: '#3b82f6', ic: 'VS' },
  { name: 'Netlify', bg: '#22d3ee', ic: 'NL' },
];
function fillSkillTrack(el, list) {
  [...list, ...list].forEach(s => {
    const chip = document.createElement('div');
    chip.className = 'skill-chip';
    chip.innerHTML = `<span class="ic" style="background:${s.bg}">${s.ic}</span><span class="name">${s.name}</span>`;
    el.appendChild(chip);
  });
}
fillSkillTrack(document.getElementById('skillTrackLeft'), skills.slice(0, 6));
fillSkillTrack(document.getElementById('skillTrackRight'), skills.slice(6, 12));


// date and time

function updateDateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}
updateDateTime();
setInterval(updateDateTime, 1000);

// add to email

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = `New Portfolio Message from ${name}`;

    const body = `
Name: ${name}
Email: ${email}

Message:
${message}
`;

    const mailtoLink =
        `mailto:YOUR-EMAIL@gmail.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
});
// ---- ScrollTrigger-based reveal animations ----
gsap.registerPlugin(ScrollTrigger);

// fade + slide up every section heading as it enters the viewport
gsap.utils.toArray(".section-heading").forEach((heading) => {
  gsap.from(heading, {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
    },
  });
});

// about avatar glides in from the side, about text fades up
gsap.from(".about-avatar", {
  x: -60,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about-grid",
    start: "top 80%",
  },
});

gsap.from(".about-text > *", {
  y: 30,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out",
  stagger: 0.12,
  scrollTrigger: {
    trigger: ".about-text",
    start: "top 80%",
  },
});

// hero section photo GSAP animation

const heroPhoto = document.querySelector(".hero-image");

gsap.fromTo(heroPhoto,
    {
        y: 180,
        opacity: 0,
        scale: 0.85,
        rotate: 3
    },
    {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.8,
        delay: 0.3,
        ease: "power4.out"
    }
);


// after mouse effect on hero image GSAP
const hero = document.querySelector("#hero");
const heroPhoto1 = document.querySelector(".hero-image");

hero.addEventListener("mousemove", (e) => {

    const rect = hero.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(heroPhoto1, {
        x: x * 25,
        y: y * 15,
        rotateY: x * 8,
        rotateX: -y * 5,
        duration: 0.6,
        ease: "power2.out"
    });
});

hero.addEventListener("mouseleave", () => {

    gsap.to(heroPhoto1, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: "power3.out"
    });

});


// ---- Magnetic button effect ----
function applyMagnetic(el, strength = 0.35) {
  if (!el) return;
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  });
}

applyMagnetic(document.querySelector(".btn-contact"));
applyMagnetic(document.getElementById("submitBtn"), 0.25);
