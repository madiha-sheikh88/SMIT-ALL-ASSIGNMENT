// navbar becomes solid + sticky-styled on scroll
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// letter-by-letter name animation (typing/drop-in)
const name = "MADIHA SHEIKH";
const heroName = document.getElementById('heroName');
[...name].forEach((ch, i) => {
  const span = document.createElement('span');
  if (ch === ' ') { span.className = 'space'; span.innerHTML = '&nbsp;'; }
  else { span.textContent = ch; }
  span.style.setProperty('--d', (i * 0.07) + 's');
  heroName.appendChild(span);
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