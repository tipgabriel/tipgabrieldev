// Menu Mobile - CORREÇÃO COMPLETA
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

// CORREÇÃO: Adicionar evento de clique no toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
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

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
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
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Sistema de animação avançado ao scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // CORREÇÃO: Animar barras de habilidades
            if (entry.target.classList.contains('skills__container')) {
                setTimeout(() => {
                    animateSkills();
                }, 300);
            }
            
            // CORREÇÃO: Animar contadores
            if (entry.target.classList.contains('about__container')) {
                setTimeout(() => {
                    animateCounters();
                }, 300);
            }
        }
    });
}, observerOptions);

// CORREÇÃO: Animação das barras de habilidades
function animateSkills() {
    const skills = document.querySelectorAll('.skill__level');
    
    skills.forEach((skill, index) => {
        // Reset para garantir que começa do zero
        skill.style.width = '0%';
        
        setTimeout(() => {
            const level = skill.getAttribute('data-level');
            
            // Usar requestAnimationFrame para animação suave
            let startWidth = 0;
            const targetWidth = parseInt(level);
            const duration = 1500; // 1.5 segundos
            const startTime = performance.now();
            
            function animateBar(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function para suavizar
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentWidth = startWidth + (targetWidth - startWidth) * easeOutQuart;
                
                skill.style.width = currentWidth + '%';
                
                if (progress < 1) {
                    requestAnimationFrame(animateBar);
                }
            }
            
            requestAnimationFrame(animateBar);
        }, index * 200); // Delay entre cada barra
    });
}

// CORREÇÃO: Animação dos contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const startTime = performance.now();
        const startValue = 0;
        
        // Reset para garantir que começa do zero
        counter.textContent = '0';
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function para suavizar
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            counter.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

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

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        contactForm.reset();
    });
}

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

// CORREÇÃO: Inicialização completa
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

    // CORREÇÃO: Inicializar barras de habilidades com 0
    const skillBars = document.querySelectorAll('.skill__level');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
});

// CORREÇÃO: Prevenir problemas de carregamento
window.addEventListener('load', () => {
    // Re-inicializar observadores se necessário
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Prevenir scroll horizontal
window.addEventListener('resize', () => {
    document.body.style.overflowX = 'hidden';
});
