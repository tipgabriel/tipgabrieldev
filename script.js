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
    initializeMatrixEffect();   // Matrix no fundo do hero
    initializePortfolio();
    initializeContactForm();
    initializeMobileMenu();
    updateCurrentYear();
    
    console.log('✅ Todos os componentes inicializados');
});

// ===== NAVEGAÇÃO SUAVE =====
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
    const mobileMenuBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
}

// ===== EFEITO MATRIX (FUNDO DO HERO) =====
function initializeMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight; // altura da seção hero
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F4"; // cor verde Matrix
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);
    console.log('✅ Efeito Matrix inicializado no hero');
}

// ===== PORTFÓLIO =====
function initializePortfolio() {
    const projectsGrid = document.getElementById('projects-grid');
    const noProjects = document.getElementById('no-projects');

    const projects = [
        { title: "Projeto 1", category: "web-design", img: "project1.jpg", link: "#" },
        { title: "Projeto 2", category: "frontend", img: "project2.jpg", link: "#" },
        { title: "Projeto 3", category: "fullstack", img: "project3.jpg", link: "#" }
    ];

    function renderProjects(filter) {
        projectsGrid.innerHTML = '';
        let filtered = projects;
        if (filter !== 'all') {
            filtered = projects.filter(p => p.category === filter);
        }

        if (filtered.length === 0) {
            noProjects.classList.remove('hidden');
        } else {
            noProjects.classList.add('hidden');
            filtered.forEach(p => {
                const card = document.createElement('div');
                card.className = 'project-card relative overflow-hidden rounded-xl shadow-lg';
                card.innerHTML = `
                    <a href="${p.link}" target="_blank">
                        <img src="${p.img}" alt="${p.title}" class="w-full h-64 object-cover">
                        <div class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">${p.title}</div>
                    </a>
                `;
                projectsGrid.appendChild(card);
            });
        }
    }

    renderProjects(currentFilter);

    window.filterProjects = function(filter) {
        currentFilter = filter;
        renderProjects(filter);

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.filter-btn[data-filter="${filter}"]`)?.classList.add('active');
    };
}

// ===== FORMULÁRIO DE CONTATO =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const btnText = document.getElementById('btn-text');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (isSubmitting) return;

        isSubmitting = true;
        loadingSpinner.classList.remove('hidden');
        btnText.textContent = "Enviando...";

        setTimeout(() => {
            isSubmitting = false;
            loadingSpinner.classList.add('hidden');
            btnText.textContent = "Enviar Mensagem";
            form.reset();
            showToast("Sucesso!", "Mensagem enviada com sucesso.");
        }, 1500);
    });
}

// ===== TOAST =====
function showToast(title, description) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-description');

    if (!toast) return;

    toastTitle.textContent = title;
    toastDesc.textContent = description;
    toast.classList.remove('hidden');

    setTimeout(() => {
        hideToast();
    }, 3000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('hidden');
}

// ===== ANO ATUAL NO FOOTER =====
function updateCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
