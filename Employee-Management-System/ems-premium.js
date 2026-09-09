//  NEW LANDING PAGE ANIMATIONS
(function () {
    "use strict";

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.addEventListener("DOMContentLoaded", function () {
        initScrollReveal();
        initCounters();
    });

    /* ---- Scroll reveal: one fade+slide-up per section,
       not per element, triggered once ---- */
    function initScrollReveal() {
        var targets = document.querySelectorAll(".ems-reveal");
        if (!targets.length) return;

        if (reduceMotion || !("IntersectionObserver" in window)) {
            targets.forEach(function (el) {
                el.classList.add("ems-in");
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("ems-in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        targets.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ---- Animated statistic counters (run once) ---- */
    function initCounters() {
        var counters = document.querySelectorAll("[data-ems-count]");
        if (!counters.length) return;

        function animateCounter(el) {
            var target = parseFloat(el.getAttribute("data-ems-count"));
            var suffix = el.getAttribute("data-ems-suffix") || "";
            var duration = 1400;
            var start = null;

            if (reduceMotion) {
                el.textContent = target + suffix;
                return;
            }

            function step(timestamp) {
                if (start === null) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var value = Math.round(eased * target);
                el.textContent = value + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        }

        if (!("IntersectionObserver" in window)) {
            counters.forEach(animateCounter);
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(function (el) {
            observer.observe(el);
        });
    }
})();
