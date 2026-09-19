// navbar
gsap.from(".navbar-nav .nav-item", {
    y: -25,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.2
});

// hero section

gsap.fromTo(".hero-content h1",{ 
    autoAlpha: 0, 
    y: 40 },
    { autoAlpha: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out", 
        delay: 0.4 }
);

gsap.fromTo(".hero-content h1",
  { autoAlpha: 0, letterSpacing: "0.4em", filter: "blur(12px)" },
  { autoAlpha: 1, letterSpacing: "0em", filter: "blur(0px)", duration: 1.4, ease: "power3.out", delay: 0.4 }
);

document.addEventListener("DOMContentLoaded", () => {
    const badge = document.querySelector(".hero-content h3");
    const btn = document.querySelector(".hero-content button");

    /* ---- entrance ---- */
    gsap.fromTo(badge,
        { autoAlpha: 0, scale: 0.5, rotate: -8, letterSpacing: "0.6em" },
        {
            autoAlpha: 1, scale: 1, rotate: 0, letterSpacing: "0.2em",
            duration: 1, ease: "elastic.out(1, 0.6)", delay: 0.6
        }
    );

    gsap.fromTo(btn,
        { autoAlpha: 0, y: 20, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)", delay: 1.6 }
    );

    /* ---- button hover: fill wipes in, text flips colour, arrow slides ---- */
    btn.addEventListener("mouseenter", () => {
        gsap.set(btn, { "--origin": "left" });
        gsap.to(btn, { "--fill": 1, color: "#fff", duration: 0.45, ease: "power3.out" });
    });

    btn.addEventListener("mouseleave", () => {
        gsap.set(btn, { "--origin": "right" });
        gsap.to(btn, { "--fill": 0, color: "", duration: 0.45, ease: "power3.inOut" });
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    });

    /* ---- magnetic pull toward the cursor ---- */
    btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.4,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    /* ---- press feedback ---- */
    btn.addEventListener("mousedown", () =>
        gsap.to(btn, { scale: 0.93, duration: 0.1 }));
    btn.addEventListener("mouseup", () =>
        gsap.to(btn, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }));
});

// cards animation

  gsap.utils.toArray(".card-range").forEach((card_range, i) => {
    gsap.to(card_range, {
      y: (i - 1) * -20,
      ease: "none",
      scrollTrigger: { trigger: card_range, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

