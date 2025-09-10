/**
 * Script principal para o portfólio tipgabrieldev
 * Contém toda a lógica JavaScript vanilla do site
 */

// ===== VARIÁVEIS GLOBAIS =====
let currentFilter = 'all';
let isSubmitting = false;

// ===== INICIALIZAÇÃO DO SITE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfólio tipgabrieldev iniciado');
    
    // Inicializar componentes
    initializeHeader();
    initializeMatrixEffect();
    initializePortfolio();
    initializeContactForm();
    initializeMobileMenu();
    updateCurrentYear();
    
    console.log('✅ Todos os componentes inicializados');
});

// ===== HEADER E NAVEGAÇÃO =====


// Navegação suave para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

// Scroll para o topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== MENU MOBILE =====
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenu.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

// ===== EFEITO MATRIX =====
function initializeMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajusta o canvas para tela inteira
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configurações do efeito Matrix
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Inicializa as colunas
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Função de animação do Matrix
    function drawMatrix() {
        // Fundo semi-transparente para efeito de fade
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Texto verde característico do Matrix
        ctx.fillStyle = "#0F4";
        ctx.font = fontSize + "px monospace";

        // Desenha cada coluna
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset da coluna quando chega ao fim
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Inicia a animação
    const matrixInterval = setInterval(drawMatrix, 35);
    
    console.log('✅ Efeito Matrix inicializado');
}

// ===== PORTFÓLIO =====
function initializePortfolio() {
    renderProjects();
    console.log('✅ Portfólio inicializado com', mockProjects.length, 'projetos');
}

// Renderiza os projetos na tela
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const noProjectsMessage = document.getElementById('no-projects');
    
    // Filtra projetos baseado na categoria selecionada
    const filteredProjects = currentFilter === 'all' 
        ? mockProjects 
        : mockProjects.filter(project => project.category === currentFilter);
    
    // Limpa o grid
    projectsGrid.innerHTML = '';
    
    if (filteredProjects.length === 0) {
        noProjectsMessage.classList.remove('hidden');
        return;
    }
    
    noProjectsMessage.classList.add('hidden');
    
    // Renderiza cada projeto
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Cria um card de projeto
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.setAttribute('data-category', project.category);
    
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img 
                src="${project.image}" 
                alt="${project.title}"
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=Imagem+Indisponível'"
            />
            <div class="project-overlay">
                <div class="flex space-x-4">
                    ${project.liveUrl ? `
                        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-action" title="Ver projeto ao vivo">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </a>
                    ` : ''}
                    ${project.githubUrl ? `
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-action" title="Ver código no GitHub">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    ` : ''}
                    ${project.caseStudyUrl ? `
                        <a href="${project.caseStudyUrl}" target="_blank" rel="noopener noreferrer" class="project-action" title="Ver estudo de caso">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
        <div class="p-6">
            <span class="category-badge">${project.categoryLabel}</span>
            <h3 class="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-200">
                ${project.title}
            </h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
                ${project.description}
            </p>
            <div class="flex flex-wrap gap-2">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Filtra projetos por categoria
function filterProjects(category) {
    currentFilter = category;
    
    // Atualiza botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Re-renderiza projetos
    renderProjects();
    
    console.log('🔍 Filtro aplicado:', category);
}

// ===== FORMULÁRIO DE CONTATO =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', handleFormSubmit);
    
    console.log('✅ Formulário de contato inicializado');
}

// Manipula o envio do formulário
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validação
    const errors = validateForm(data);
    if (errors.length > 0) {
        showToast('Erro na validação', errors.join(', '), 'error');
        return;
    }
    
    // Estado de carregamento
    setSubmitLoading(true);
    
    try {
        // Simula envio do formulário (substitua por integração real)
        await simulateFormSubmission(data);
        
        showToast('Mensagem enviada!', 'Obrigado pelo contato. Retornarei em breve!', 'success');
        
        // Limpa o formulário
        e.target.reset();
        
        console.log('📧 Formulário enviado:', data);
        
    } catch (error) {
        console.error('❌ Erro ao enviar formulário:', error);
        showToast('Erro ao enviar', 'Tente novamente ou entre em contato diretamente.', 'error');
    } finally {
        setSubmitLoading(false);
    }
}

// Valida os dados do formulário
function validateForm(data) {
    const errors = [];
    
    if (!data.name || !data.name.trim()) {
        errors.push('Nome é obrigatório');
    }
    
    if (!data.email || !data.email.trim()) {
        errors.push('Email é obrigatório');
    } else if (!isValidEmail(data.email)) {
        errors.push('Email inválido');
    }
    
    if (!data.message || !data.message.trim()) {
        errors.push('Mensagem é obrigatória');
    }
    
    return errors;
}

// Valida formato do email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simula o envio do formulário
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simula tempo de processamento
        setTimeout(() => {
            // Simula sucesso (90% das vezes)
            if (Math.random() > 0.1) {
                resolve(data);
            } else {
                reject(new Error('Erro simulado'));
            }
        }, 2000);
    });
}

// Define estado de carregamento do botão
function setSubmitLoading(loading) {
    isSubmitting = loading;
    
    const submitBtn = document.getElementById('submit-btn');
    const sendIcon = document.getElementById('send-icon');
    const loadingSpinner = document.getElementById('loading-spinner');
    const btnText = document.getElementById('btn-text');
    
    if (loading) {
        submitBtn.disabled = true;
        sendIcon.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        btnText.textContent = 'Enviando...';
        submitBtn.classList.add('opacity-75');
    } else {
        submitBtn.disabled = false;
        sendIcon.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        btnText.textContent = 'Enviar Mensagem';
        submitBtn.classList.remove('opacity-75');
    }
}

// ===== SISTEMA DE TOAST NOTIFICATIONS =====
function showToast(title, description, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDescription = document.getElementById('toast-description');
    const toastIcon = document.getElementById('toast-icon');
    
    // Define conteúdo
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Define ícone e estilo baseado no tipo
    if (type === 'success') {
        toast.className = 'fixed top-4 right-4 z-50 toast-success';
        toastIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        `;
    } else if (type === 'error') {
        toast.className = 'fixed top-4 right-4 z-50 toast-error';
        toastIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        `;
    }
    
    // Mostra o toast
    toast.classList.remove('hidden');
    
    // Auto-hide após 5 segundos
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('hidden');
}

// ===== UTILITÁRIOS =====
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== ANIMAÇÕES E EFEITOS =====
// Observador de interseção para animações
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem animar
    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== MANIPULAÇÃO DE EVENTOS =====
// Fecha menu mobile ao clicar fora
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
        hideToast();
    }
});

// ===== LOG DE INICIALIZAÇÃO =====
console.log(`
🎨 tipgabrieldev Portfolio
📧 contato@tipgabrieldev.com
🌐 https://tipgabrieldev.com

✨ Feito com HTML, CSS, Tailwind CSS & JavaScript
💻 Desenvolvido por Gabriel
`);

// ===== ANALYTICS E TRACKING (OPCIONAL) =====
// Aqui você pode adicionar código para Google Analytics, Facebook Pixel, etc.
function trackEvent(eventName, data = {}) {
    console.log('📊 Event tracked:', eventName, data);
    
    // Exemplo para Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, data);
    // }
}

// Rastreia cliques em projetos
document.addEventListener('click', function(e) {
    if (e.target.closest('.project-action')) {
        const action = e.target.closest('.project-action');
        const title = action.getAttribute('title');
        trackEvent('project_click', { action: title });
    }
});

// ===== SERVICE WORKER (PWA - OPCIONAL) =====
// Descomente para transformar em PWA
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ ServiceWorker registrado:', registration.scope);
            })
            .catch(function(error) {
                console.log('❌ ServiceWorker falhou:', error);
            });
    });
}
*/
