// Menu Mobile - TELA CHEIA
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevenir scroll do body quando menu está aberto
    if (navMenu.classList.contains('active')) {
        body.classList.add('menu-open');
    } else {
        body.classList.remove('menu-open');
    }
    
    // Adicionar efeito de toggle no ícone
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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animar barras de habilidades individualmente
            if (entry.target.classList.contains('skills__container')) {
                animateSkills();
            }
        }
    });
}, observerOptions);

// CORREÇÃO DAS BARRAS DE HABILIDADES
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill__level');
    skills.forEach((skill, index) => {
        setTimeout(() => {
            const level = skill.getAttribute('data-level');
            // Usar transition em vez de animation para melhor controle
            skill.style.transition = 'width 1.5s ease-in-out';
            skill.style.width = level + '%';
        }, index * 200);
    });
};

// Formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simular envio do formulário
    console.log('Dados do formulário:', data);
    
    // Mostrar mensagem de sucesso com animação
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
    
    // Estilos da notificação
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
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Inicializar observadores quando o DOM carregar
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

    // Observar elementos específicos para animações individuais
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

    // GARANTIR QUE O FOOTER SEJA OBSERVADO
    const footer = document.querySelector('.footer');
    if (footer) {
        observer.observe(footer);
    }

    // Adicionar ano atual no footer
    const yearSpan = document.querySelector('.footer__bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', currentYear);
    }

    // CORREÇÃO: Inicializar barras de habilidades com 0
    const skillBars = document.querySelectorAll('.skill__level');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
});

// Prevenir animações durante o redimensionamento
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-inicializar observadores após redimensionamento
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }, 250);
});

// CORREÇÃO: Prevenir scroll horizontal
window.addEventListener('resize', () => {
    document.body.style.overflowX = 'hidden';
});

// Garantir que não há overflow horizontal
function checkOverflow() {
    const bodyWidth = document.body.scrollWidth;
    const windowWidth = window.innerWidth;
    
    if (bodyWidth > windowWidth) {
        console.log('Overflow detectado, corrigindo...');
        document.body.style.overflowX = 'hidden';
    }
}

// Verificar overflow periodicamente
setInterval(checkOverflow, 1000);
checkOverflow();
