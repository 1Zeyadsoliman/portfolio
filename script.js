document.addEventListener('DOMContentLoaded', function () {

    // ── TYPED.JS ──────────────────────────────────────────────
    var typed = new Typed('#typed', {
        strings: [
    'FRONTEND DEVELOPER',
    'REACT DEVELOPER',
    'UI ENGINEER',
    'CREATIVE CODER'
        ],
        typeSpeed: 55,
        backSpeed: 35,
        backDelay: 2200,
        loop: true,
        cursorChar: '_',
        smartBackspace: true
    });

    // ── STAR FIELD ────────────────────────────────────────────
    const canvas = document.getElementById('stars');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = Array.from({ length: 180 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() < 0.08 ? 1.5 : 0.8,
            o: Math.random() * 0.7 + 0.3,
            red: Math.random() < 0.06
        }));

        stars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.red
                ? `rgba(180,40,40,${s.o})`
                : `rgba(240,237,232,${s.o})`;
            ctx.fill();
        });

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars.forEach(s => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = s.red
                    ? `rgba(180,40,40,${s.o})`
                    : `rgba(240,237,232,${s.o})`;
                ctx.fill();
            });
        });
    }

    // ── CUSTOM CURSOR ─────────────────────────────────────────
    const cursor = document.querySelector('.cursor');
    const ring = document.querySelector('.cursor-ring');
    if (cursor && ring) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top  = e.clientY + 'px';
            ring.style.left   = e.clientX + 'px';
            ring.style.top    = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.style.transform = 'translate(-50%, -50%) scale(1.8)';
                ring.style.borderColor = 'var(--red-core)';
            });
            el.addEventListener('mouseleave', () => {
                ring.style.transform = 'translate(-50%, -50%) scale(1)';
                ring.style.borderColor = 'var(--red-dim)';
            });
        });
    }

    // ── SMOOTH SCROLL FOR NAV LINKS ───────────────────────────
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile navbar
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    // ── ACTIVE NAV ON SCROLL ──────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 220) current = s.id;
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Navbar bg
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 80) {
                navbar.style.background = 'rgba(0,0,0,0.98)';
            } else {
                navbar.style.background = 'rgba(0,0,0,0.92)';
            }
        }
    });

    // ── FADE IN ON SCROLL ─────────────────────────────────────
    const fadeElements = document.querySelectorAll('.fade-in, .project-card, .mission-card, .terminal-panel');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ── PAGE LOAD FADE IN ─────────────────────────────────────
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 60);

});