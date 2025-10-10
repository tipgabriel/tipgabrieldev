// ===================== MENU MOBILE =====================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('menu-open', navMenu.classList.contains('active'));

        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars', !navMenu.classList.contains('active'));
        icon.classList.toggle('fa-times', navMenu.classList.contains('active'));
    });

    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('menu-open');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ===================== SCROLL SUAVE =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===================== HEADER SCROLL EFFECT =====================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'var(--shadow)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ===================== INTERSECTION OBSERVER =====================
const observerOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.classList.contains('skills__container')) {
                animateSkills();
                observer.unobserve(entry.target);
            }

            if (entry.target.classList.contains('about__container')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// ===================== ANIMAÇÃO DAS BARRAS DE HABILIDADES =====================
function animateSkills() {
    const skills = document.querySelectorAll('.skill__level');

    skills.forEach((skill, index) => {
        skill.style.width = '0%';
        setTimeout(() => {
            const level = parseInt(skill.getAttribute('data-level'));
            let start = 0;
            const duration = 1500;
            const startTime = performance.now();

            function animateBar(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 4);
                skill.style.width = Math.floor(start + (level - start) * ease) + '%';
                if (progress < 1) requestAnimationFrame(animateBar);
            }

            requestAnimationFrame(animateBar);
        }, index * 200);
    });
}

// ===================== ANIMAÇÃO DOS CONTADORES =====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        counter.textContent = '0';

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(target * ease);
            counter.textContent = value;

            if (progress < 1) requestAnimationFrame(updateCounter);
            else counter.textContent = target;
        }

        requestAnimationFrame(updateCounter);
    });
}

// ===================== COPYRIGHT =====================
function updateCopyright() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
}

// ===================== FORMULÁRIO DE CONTATO =====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.reset();
        showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    });
}

// ===================== NOTIFICAÇÃO =====================
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// ===================== INICIALIZAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {
    // Animar elementos hero
    const heroElements = document.querySelectorAll('.hero__content > *');
    heroElements.forEach((el, i) => el.style.animationDelay = `${i * 0.2}s`);

    // Observar seções
    const aboutSection = document.querySelector('.about__container');
    if (aboutSection) observer.observe(aboutSection);

    const skillsSection = document.querySelector('.skills__container');
    if (skillsSection) observer.observe(skillsSection);

    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => observer.observe(sec));

    const animatedElements = document.querySelectorAll(`
        .about__text p,
        .stat,
        .skill__category,
        .skill,
        .portfolio__item,
        .contact__item,
        .contact__form,
        .form__group input,
        .form__group textarea,
        .footer__content,
        .footer__social a,
        .footer__bottom
    `);
    animatedElements.forEach(el => observer.observe(el));

    const footer = document.querySelector('.footer');
    if (footer) observer.observe(footer);

    updateCopyright();

    // Inicializar skill bars com 0
    document.querySelectorAll('.skill__level').forEach(bar => bar.style.width = '0%');
});

// ===================== PREVENÇÃO DE SCROLL HORIZONTAL =====================
window.addEventListener('resize', () => { document.body.style.overflowX = 'hidden'; });
