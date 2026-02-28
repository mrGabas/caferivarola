// Café Rivarola · script.js

// ─── NAV SCROLL ────────────────────────────────────────
(function () {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
})();

// ─── MOBILE MENU ───────────────────────────────────────
(function () {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let open = false;

    function toggleMenu() {
        open = !open;
        mobileMenu.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        const spans = hamburger.querySelectorAll('span');
        if (open) {
            spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    }

    hamburger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => {
        if (open) toggleMenu();
    }));
})();

// ─── MENU TABS ─────────────────────────────────────────
(function () {
    const tabs = document.querySelectorAll('.menu__tab');
    const categories = document.querySelectorAll('.menu__category');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const cat = document.querySelector(`.menu__category[data-category="${target}"]`);
            if (cat) {
                cat.classList.add('active');
                // Animate items in
                const items = cat.querySelectorAll('.menu__item');
                items.forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'none';
                    }, i * 60);
                });
            }
        });
    });
})();

// ─── SCROLL REVEAL ─────────────────────────────────────
(function () {
    const revealEls = document.querySelectorAll(
        '.section-label, .section-title, .about__body, .about__stats, ' +
        '.about__images, .menu__tabs, .menu__category, .gallery__item, ' +
        '.eventos__img, .eventos__text, .location__info, .location__map'
    );

    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
})();

// ─── STAGGERED GALLERY REVEAL ──────────────────────────
(function () {
    const items = document.querySelectorAll('.gallery__item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(items).indexOf(entry.target);
                setTimeout(() => entry.target.classList.add('visible'), idx * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    items.forEach(el => observer.observe(el));
})();

// ─── SMOOTH ANCHOR OFFSET (for fixed nav) ──────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
