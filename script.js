// Menu Mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'var(--shadow)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animar barras de habilidades quando visíveis
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill__level');
    const skillsSection = document.querySelector('.skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skills.forEach(skill => {
                    const level = skill.getAttribute('data-level');
                    skill.style.width = level + '%';
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
};

// Formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simular envio do formulário
    console.log('Dados do formulário:', data);
    
    // Mostrar mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
    contactForm.reset();
});

// Animar elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    // Animar elementos da seção hero
    const heroElements = document.querySelectorAll('.hero__content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('fade-in-up');
    });

    // Observar seções para animação
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Inicializar animação das habilidades
    animateSkills();

    // Adicionar ano atual no footer
    const yearSpan = document.querySelector('.footer__bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', currentYear);
    }
});

// Loading skeleton (opcional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Otimização de performance - Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (exemplo com Google Analytics)
const trackEvent = (category, action, label) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
};

// Track clicks nos links principais
document.querySelectorAll('.nav__link, .btn, .portfolio__link').forEach(link => {
    link.addEventListener('click', (e) => {
        const text = e.target.textContent || e.target.innerText;
        trackEvent('Navigation', 'Click', text);
    });
});
