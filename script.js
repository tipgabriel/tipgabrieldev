// Menu Mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        body.classList.add('menu-open');
    } else {
        body.classList.remove('menu-open');
    }
    
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em um link
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

// Sistema de animação avançado ao scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animar barras de habilidades
            if (entry.target.classList.contains('skills__container')) {
                animateSkills();
            }
            
            // Animar contadores
            if (entry.target.classList.contains('about__container')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Animação das barras de habilidades
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill__level');
    skills.forEach((skill, index) => {
        setTimeout(() => {
            const level = skill.getAttribute('data-level');
            skill.style.transition = 'width 2s ease-in-out';
            skill.style.width = level + '%';
        }, index * 300);
    });
};

// Animação dos contadores
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// Atualizar copyright automaticamente
const updateCopyright = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
};

// Formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Dados do formulário:', data);
    showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    contactForm.reset();
});

// Função para mostrar notificação
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
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    // Animar elementos da seção hero
    const heroElements = document.querySelectorAll('.hero__content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Observar seções para animação
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observar elementos específicos
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
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Garantir que o footer seja observado
    const footer = document.querySelector('.footer');
    if (footer) {
        observer.observe(footer);
    }

    // Atualizar copyright
    updateCopyright();

    // Inicializar barras de habilidades com 0
    const skillBars = document.querySelectorAll('.skill__level');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
});

// Prevenir scroll horizontal
window.addEventListener('resize', () => {
    document.body.style.overflowX = 'hidden';
});

// CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification button:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
