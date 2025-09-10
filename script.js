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
    initializeMatrixEffect();   // Matrix no fundo do header
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

// ===== EFEITO MATRIX (FUNDO DO HEADER) =====
function initializeMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.getElementById('header').offsetHeight; // só atrás do header
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 12;
    let columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F4";
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

    setInterval(drawMatrix, 40);
    console.log('✅ Efeito Matrix inicializado no header');
}
