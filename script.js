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
const observerOptions = { 
    threshold: 0.3, 
    rootMargin: '0px 0px -50px 0px' 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animar contadores quando a seção about ficar visível
            if (entry.target.classList.contains('about__container')) {
                console.log('🔢 Seção About visível - iniciando contadores');
                animateCounters();
            }
            
            // Animar barras quando a seção skills ficar visível
            if (entry.target.classList.contains('skills__container')) {
                console.log('🎯 Seção Skills visível - iniciando barras');
                animateSkills();
            }
        }
    });
}, observerOptions);

// ===================== ANIMAÇÃO DOS CONTADORES SINCRONIZADOS =====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    console.log(`🔢 Encontrados ${counters.length} contadores`);
    
    // Reset dos contadores
    counters.forEach(counter => {
        counter.textContent = '0';
    });

    const duration = 2000; // 2 segundos para todos
    const startTime = performance.now();
    const targets = Array.from(counters).map(counter => 
        parseInt(counter.getAttribute('data-target'))
    );

    function updateCounters(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        counters.forEach((counter, index) => {
            const target = targets[index];
            const currentValue = Math.floor(target * easeOutQuart);
            counter.textContent = currentValue;
        });

        if (progress < 1) {
            requestAnimationFrame(updateCounters);
        } else {
            // Garantir valores finais exatos
            counters.forEach((counter, index) => {
                counter.textContent = targets[index] + '+';
            });
            console.log('✅ Contadores finalizados');
        }
    }

    requestAnimationFrame(updateCounters);
}

// ===================== ANIMAÇÃO DAS BARRAS DE HABILIDADES =====================
function animateSkills() {
    const skills = document.querySelectorAll('.skill__level');
    
    console.log(`🎯 Encontradas ${skills.length} barras para animar`);
    
    // Reset completo das barras - IMPORTANTE!
    skills.forEach(skill => {
        skill.style.transition = 'none';
        skill.style.width = '0%';
    });

    // Forçar reflow do navegador - CRÍTICO!
    void document.body.offsetHeight;

    // Animar cada barra com delay progressivo
    skills.forEach((skill, index) => {
        setTimeout(() => {
            const targetWidth = skill.getAttribute('data-level');
            console.log(`📊 Animando barra ${index + 1} para ${targetWidth}%`);
            
            // Aplicar transição suave
            skill.style.transition = 'width 1.8s cubic-bezier(0.22, 0.61, 0.36, 1)';
            skill.style.width = targetWidth + '%';
            
        }, index * 200); // Delay entre barras
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
        
        // Simular envio do formulário
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log('📧 Dados do formulário:', data);
        
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
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ===================== INICIALIZAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Carregado - Inicializando...');
    
    // Observar seções principais
    const aboutSection = document.querySelector('.about__container');
    const skillsSection = document.querySelector('.skills__container');
    
    if (aboutSection) {
        console.log('📍 Seção About encontrada');
        observer.observe(aboutSection);
    }
    
    if (skillsSection) {
        console.log('📍 Seção Skills encontrada');
        observer.observe(skillsSection);
    }

    // Observar outras seções para animações de entrada
    const sections = document.querySelectorAll('.section');
    console.log(`📄 ${sections.length} seções encontradas`);
    sections.forEach(sec => observer.observe(sec));

    // Observar elementos específicos para animações
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
    
    console.log(`🎭 ${animatedElements.length} elementos animados encontrados`);
    animatedElements.forEach(el => observer.observe(el));

    // Observar footer
    const footer = document.querySelector('.footer');
    if (footer) observer.observe(footer);

    // Atualizar copyright
    updateCopyright();

    // Inicializar skill bars com 0% - GARANTIR QUE COMEÇAM EM 0
    const skillBars = document.querySelectorAll('.skill__level');
    console.log(`📊 ${skillBars.length} barras de habilidades inicializadas em 0%`);
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.opacity = '1';
        bar.style.transition = 'none'; // Remover transição inicial
    });
});

// ===================== CSS DINÂMICO PARA ANIMAÇÕES =====================
const animationStyles = document.createElement('style');
animationStyles.textContent = `
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
    
    /* GARANTIR que as barras são visíveis e animáveis */
    .skill__level {
        opacity: 1 !important;
        visibility: visible !important;
    }
`;
document.head.appendChild(animationStyles);

// ===================== VERIFICAÇÃO FINAL =====================
window.addEventListener('load', () => {
    console.log('✅ Página completamente carregada');
    console.log('🎯 Barras de habilidades:', document.querySelectorAll('.skill__level').length);
    console.log('🔢 Contadores:', document.querySelectorAll('.stat h3').length);
    
    // Verificar se as barras começaram em 0%
    const skillBars = document.querySelectorAll('.skill__level');
    skillBars.forEach((bar, index) => {
        console.log(`Barra ${index + 1}: ${bar.style.width}`);
    });
});

// ===================== PREVENÇÃO DE SCROLL HORIZONTAL =====================
window.addEventListener('resize', () => { 
    document.body.style.overflowX = 'hidden'; 
});
