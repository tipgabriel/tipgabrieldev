// Portfolio Data
const portfolioData = {
    personal: {
        name: "TipGabrielDev",
        title: "Desenvolvedor Full Stack",
        bio: "Desenvolvedor apaixonado por tecnologia e inovação, especializado em criar soluções web modernas e funcionais. Com experiência em desenvolvimento frontend e backend, sempre busco entregar projetos de alta qualidade que superem as expectativas dos clientes.",
        location: "Brasil",
        email: "contato@tipgabrieldev.com",
        phone: "+55 (11) 99999-9999"
    },

    social: {
        github: "https://github.com/tipgabrieldev",
        instagram: "https://instagram.com/tipgabrieldev"
    },

    skills: [
        "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "JSON-LD",
        "React", "Node.js", "MongoDB", "Git", "Responsive Design",
        "UI/UX Design", "Performance Optimization", "SEO"
    ],

    experience: [
        {
            id: 1,
            position: "Desenvolvedor Full Stack Freelancer",
            company: "TipGabrielDev Studio",
            period: "2022 - Presente",
            description: "Desenvolvimento de websites e aplicações web personalizadas para diversos clientes. Especializado em soluções responsivas e otimizadas para performance.",
            technologies: ["HTML", "CSS", "JavaScript", "Tailwind", "React", "Node.js"]
        },
        {
            id: 2,
            position: "Desenvolvedor Frontend",
            company: "Projetos Independentes",
            period: "2021 - 2022",
            description: "Criação de interfaces modernas e funcionais, focando em experiência do usuário e design responsivo. Desenvolvimento de identidades visuais e branding.",
            technologies: ["HTML", "CSS", "JavaScript", "Tailwind", "Design"]
        }
    ],

    projects: [
        {
            id: 1,
            title: "MeltrançasBH",
            description: "Website completo para estúdio de tranças afro, incluindo galeria de trabalhos, agendamento online e informações sobre serviços especializados.",
            technologies: ["HTML", "CSS", "JavaScript", "Tailwind", "JSON-LD"],
            image: "https://via.placeholder.com/600x400/6366f1/ffffff?text=MeltrançasBH",
            link: "", // placeholder para o usuário preencher
            github: "", // placeholder para o usuário preencher
            category: "Website Comercial",
            featured: true
        },
        {
            id: 2,
            title: "Logo Barbearia André",
            description: "Desenvolvimento de identidade visual completa para barbearia, incluindo logotipo, paleta de cores e aplicações em diversos materiais.",
            technologies: ["Design", "Branding", "CSS", "HTML"],
            image: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Barbearia+André",
            link: "", // placeholder para o usuário preencher
            github: "",
            category: "Branding & Design",
            featured: true
        },
        {
            id: 3,
            title: "HQ Azul Estelar e Verde Neon",
            description: "Website interativo para histórias em quadrinhos com design futurista, galeria de personagens e sistema de leitura online otimizado.",
            technologies: ["HTML", "CSS", "JavaScript", "Tailwind", "JSON-LD"],
            image: "https://via.placeholder.com/600x400/06b6d4/ffffff?text=HQ+Azul+Estelar",
            link: "", // placeholder para o usuário preencher
            github: "",
            category: "Website Interativo",
            featured: true
        }
    ],

    testimonials: [
        {
            id: 1,
            name: "Cliente MeltrançasBH",
            role: "Proprietária do Estúdio",
            content: "O TipGabrielDev criou um site incrível que representa perfeitamente nosso trabalho. O design é moderno e funcional!",
            avatar: "https://via.placeholder.com/60x60/6366f1/ffffff?text=M"
        },
        {
            id: 2,
            name: "André Silva",
            role: "Barbearia André",
            content: "A identidade visual ficou perfeita! Conseguiu capturar exatamente o que eu imaginava para minha barbearia.",
            avatar: "https://via.placeholder.com/60x60/8b5cf6/ffffff?text=A"
        }
    ]
};

// DOM Elements
let elements = {};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Get DOM elements
    initializeElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Populate content
    populateContent();
    
    // Initialize theme
    initializeTheme();
    
    // Setup scroll effects
    setupScrollEffects();
});

function initializeElements() {
    elements = {
        // Theme toggles
        themeToggle: document.getElementById('theme-toggle'),
        themeToggleMobile: document.getElementById('theme-toggle-mobile'),
        
        // Mobile menu
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        mobileMenu: document.getElementById('mobile-menu'),
        menuIcon: document.getElementById('menu-icon'),
        closeIcon: document.getElementById('close-icon'),
        
        // Matrix effect
        matrixToggle: document.getElementById('matrix-toggle'),
        matrixIcon: document.getElementById('matrix-icon'),
        
        // Navigation
        viewProjectsBtn: document.getElementById('view-projects-btn'),
        navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),
        
        // Content containers
        skillsContainer: document.getElementById('skills-container'),
        experienceContainer: document.getElementById('experience-container'),
        projectsContainer: document.getElementById('projects-container'),
        testimonialsContainer: document.getElementById('testimonials-container'),
        
        // Form
        contactForm: document.getElementById('contact-form'),
        toast: document.getElementById('toast'),
        toastMessage: document.getElementById('toast-message'),
        
        // Header
        header: document.getElementById('header')
    };
}

function setupEventListeners() {
    // Theme toggles
    elements.themeToggle?.addEventListener('click', toggleTheme);
    elements.themeToggleMobile?.addEventListener('click', toggleTheme);
    
    // Mobile menu
    elements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
    
    // Matrix effect toggle
    elements.matrixToggle?.addEventListener('click', toggleMatrix);
    
    // View projects button
    elements.viewProjectsBtn?.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Navigation links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });
    
    // Contact form
    elements.contactForm?.addEventListener('submit', handleContactSubmit);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.mobileMenuToggle?.contains(e.target) && !elements.mobileMenu?.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}

function toggleMobileMenu() {
    const isOpen = !elements.mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        elements.mobileMenu.classList.remove('hidden');
        elements.menuIcon.classList.add('hidden');
        elements.closeIcon.classList.remove('hidden');
    }
}

function closeMobileMenu() {
    elements.mobileMenu.classList.add('hidden');
    elements.menuIcon.classList.remove('hidden');
    elements.closeIcon.classList.add('hidden');
}

function toggleMatrix() {
    if (window.matrixRain) {
        const isActive = window.matrixRain.toggle();
        
        // Update button icon and text
        if (isActive) {
            elements.matrixIcon.setAttribute('data-lucide', 'pause');
        } else {
            elements.matrixIcon.setAttribute('data-lucide', 'play');
        }
        
        // Recreate icon
        lucide.createIcons();
    }
}

function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            elements.header.classList.add('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'shadow-lg');
        } else {
            elements.header.classList.remove('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'shadow-lg');
        }
    });
}

function populateContent() {
    populateSkills();
    populateExperience();
    populateProjects();
    populateTestimonials();
}

function populateSkills() {
    if (!elements.skillsContainer) return;
    
    elements.skillsContainer.innerHTML = portfolioData.skills.map(skill => `
        <span class="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-colors duration-200 cursor-default">
            ${skill}
        </span>
    `).join('');
}

function populateExperience() {
    if (!elements.experienceContainer) return;
    
    elements.experienceContainer.innerHTML = portfolioData.experience.map(exp => `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                    <h3 class="text-xl font-semibold mb-1">${exp.position}</h3>
                    <p class="text-blue-600 dark:text-blue-400 font-medium">${exp.company}</p>
                </div>
                <div class="flex items-center mt-2 md:mt-0">
                    <i data-lucide="calendar" class="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"></i>
                    <span class="text-sm text-gray-500 dark:text-gray-400">${exp.period}</span>
                </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                ${exp.description}
            </p>
            <div class="flex flex-wrap gap-2">
                ${exp.technologies.map(tech => `
                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs border border-gray-300 dark:border-gray-600">
                        ${tech}
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    // Re-initialize icons
    lucide.createIcons();
}

function populateProjects() {
    if (!elements.projectsContainer) return;
    
    elements.projectsContainer.innerHTML = portfolioData.projects.map(project => `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700">
            <div class="relative overflow-hidden">
                <img
                    src="${project.image}"
                    alt="${project.title}"
                    class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 right-4 flex space-x-2">
                        <button class="flex-1 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center text-sm">
                            <i data-lucide="external-link" class="h-4 w-4 mr-2"></i>
                            Demo
                        </button>
                        <button class="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors duration-200">
                            <i data-lucide="github" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-lg font-semibold">${project.title}</h3>
                    <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs border border-gray-300 dark:border-gray-600">
                        ${project.category}
                    </span>
                </div>
                
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    ${project.description}
                </p>
                
                <div class="flex flex-wrap gap-1">
                    ${project.technologies.map(tech => `
                        <span class="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize icons
    lucide.createIcons();
}

function populateTestimonials() {
    if (!elements.testimonialsContainer) return;
    
    elements.testimonialsContainer.innerHTML = portfolioData.testimonials.map(testimonial => `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-start space-x-4">
                <img
                    src="${testimonial.avatar}"
                    alt="${testimonial.name}"
                    class="w-12 h-12 rounded-full flex-shrink-0"
                    loading="lazy"
                />
                <div class="flex-1">
                    <div class="flex items-center mb-2">
                        ${Array(5).fill().map(() => `
                            <i data-lucide="star" class="h-4 w-4 text-yellow-400 fill-current"></i>
                        `).join('')}
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 italic mb-3">
                        "${testimonial.content}"
                    </p>
                    <div>
                        <p class="font-semibold text-sm">${testimonial.name}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">${testimonial.role}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize icons
    lucide.createIcons();
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    showToast('Mensagem enviada com sucesso! Retornarei em breve.');
    
    // Reset form
    e.target.reset();
    
    // In a real application, you would send this data to your backend
    console.log('Contact form submitted:', data);
}

function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('translate-x-full');
    
    setTimeout(() => {
        elements.toast.classList.add('translate-x-full');
    }, 3000);
}
