// Portfolio Data
const portfolioData = {
    personal: {
        name: "Tipgabrieldev",
        title: "Desenvolvedor Front-end",
        bio: "Desenvolvedor apaixonado por tecnologia e inovação, especializado em criar soluções web modernas e funcionais. Com experiência em desenvolvimento Front-end, sempre busco entregar projetos de alta qualidade que superem as expectativas dos clientes.",
        location: "Brasil",
        email: "tipgabrieldev@proton.me",
        phone: "+55 (31) 982042552"
    },

    social: {
        github: "https://github.com/tipgabrieldev",
        instagram: "https://instagram.com/tipgabrieldev"
    },

    skills: [
        { name: "HTML5", icon: "code" },
        { name: "CSS3", icon: "paint-bucket" },
        { name: "JavaScript", icon: "monitor-play" },
        { name: "Tailwind CSS", icon: "swatch-book" },
        { name: "JSON-LD", icon: "file-json" },
        { name: "Design Responsivo", icon: "smartphone" },
        { name: "UI/UX Design", icon: "tablet" },
        { name: "Otimização e Perfomance", icon: "rocket" },
        { name: "SEO", icon: "search" }
    ],

    experience: [
        {
            id: 1,
            position: "Desenvolvedor Frontend",
            company: "Projetos Independentes",
            period: "2020 - Presente",
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
            image: "meltrancasbh.png",
            link: "https://meltrancasbh.vercel.app/#",
            instagram: "https://www.instagram.com/meltrancasbh/",
            category: "Website Comercial",
            featured: true
        },
        {
            id: 2,
            title: "Logo Barbearia André",
            description: "Desenvolvimento de identidade visual completa para barbearia, incluindo logotipo, paleta de cores e aplicações em diversos materiais.",
            technologies: ["Design", "Branding", "CSS", "HTML"],
            image: "barbearia-andre.png",
            link: "https://www.instagram.com/barbeariandreoficial032013/",
            instagram: "https://www.instagram.com/barbeariandreoficial032013/",
            category: "Branding & Design",
            featured: true
        },
        {
            id: 3,
            title: "HQ Azul Estelar e Verde Neon",
            description: "Website interativo para histórias em quadrinhos com design futurista, galeria de personagens e sistema de leitura online otimizado.",
            technologies: ["HTML", "CSS", "JavaScript", "Tailwind", "JSON-LD"],
            image: "https://via.placeholder.com/600x400/06b6d4/ffffff?text=HQ+Azul+Estelar",
            link: "https://github.com/tipgabrieldev/hq-project",
            github: "https://github.com/tipgabrieldev/hq-project",
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
    initializeElements();
    setupEventListeners();
    populateContent();
    setupScrollEffects();
    updateCopyrightYear();

    // Importante: A chamada para renderizar os ícones deve ser feita apenas UMA VEZ
    // e DEPOIS que todo o conteúdo dinâmico for adicionado ao DOM.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

function initializeElements() {
    elements = {
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        mobileMenu: document.getElementById('mobile-menu'),
        menuIcon: document.getElementById('menu-icon'),
        closeIcon: document.getElementById('close-icon'),
        viewProjectsBtn: document.getElementById('view-projects-btn'),
        navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),
        skillsContainer: document.getElementById('skills-container'),
        experienceContainer: document.getElementById('experience-container'),
        projectsContainer: document.getElementById('projects-container'),
        testimonialsContainer: document.getElementById('testimonials-container'),
        contactForm: document.getElementById('contact-form'),
        toast: document.getElementById('toast'),
        toastMessage: document.getElementById('toast-message'),
        header: document.getElementById('header'),
        currentYear: document.getElementById('current-year')
    };
}

function setupEventListeners() {
    elements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
    
    elements.viewProjectsBtn?.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
    
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
    
    elements.contactForm?.addEventListener('submit', handleContactSubmit);
    
    document.addEventListener('click', (e) => {
        if (elements.mobileMenuToggle && elements.mobileMenu && 
            !elements.mobileMenuToggle.contains(e.target) && 
            !elements.mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    if (elements.currentYear) {
        elements.currentYear.textContent = currentYear;
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
    if (elements.mobileMenu && elements.menuIcon && elements.closeIcon) {
        elements.mobileMenu.classList.add('hidden');
        elements.menuIcon.classList.remove('hidden');
        elements.closeIcon.classList.add('hidden');
    }
}

function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            elements.header.classList.add('header-bg', 'shadow-lg');
        } else {
            elements.header.classList.remove('header-bg', 'shadow-lg');
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
    
    // Adicionei um ícone correspondente a cada skill para enriquecer o visual
    // O Lucide possui uma vasta gama de ícones, como 'code', 'paint-bucket', 'rocket' etc.
    // É importante mapear a skill para um ícone existente na biblioteca.
    const skillIcons = {
        "HTML5": "code",
        "CSS3": "paint-bucket",
        "JavaScript": "monitor-play",
        "Tailwind CSS": "swatch-book",
        "JSON-LD": "file-json",
        "Design Responsivo": "smartphone",
        "UI/UX Design": "tablet",
        "Otimização e Perfomance": "rocket",
        "SEO": "search"
    };

    elements.skillsContainer.innerHTML = portfolioData.skills.map(skill => `
        <span class="px-3 py-2 skill-badge-white rounded-lg text-sm transition-all duration-200 cursor-default flex items-center gap-1">
            <i data-lucide="${skillIcons[skill]}" class="h-4 w-4"></i>
            ${skill}
        </span>
    `).join('');
}

function populateExperience() {
    if (!elements.experienceContainer) return;
    
    elements.experienceContainer.innerHTML = portfolioData.experience.map(exp => `
        <div class="card-bg p-6 rounded-lg shadow-lg card-hover">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                    <h3 class="text-xl font-semibold mb-1 text-custom-primary">${exp.position}</h3>
                    <p class="text-blue-400 font-medium">${exp.company}</p>
                </div>
                <div class="flex items-center mt-2 md:mt-0">
                    <i data-lucide="calendar" class="h-4 w-4 mr-2 text-custom-muted"></i>
                    <span class="text-sm text-custom-muted">${exp.period}</span>
                </div>
            </div>
            <p class="text-custom-secondary mb-4 leading-relaxed">
                ${exp.description}
            </p>
            <div class="flex flex-wrap gap-2">
                ${exp.technologies.map(tech => `
                    <span class="px-2 py-1 bg-custom-tertiary text-custom-secondary rounded text-xs border border-gray-600">
                        ${tech}
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function populateProjects() {
    if (!elements.projectsContainer) return;
    
    elements.projectsContainer.innerHTML = portfolioData.projects.map(project => {
        // Gerar os links dinamicamente com base nos dados do projeto
        const linkBtn = project.link ? `
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="flex-1 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center text-sm">
                <i data-lucide="external-link" class="h-4 w-4 mr-2"></i>
                Demo
            </a>
        ` : '';
        const githubBtn = project.github ? `
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <i data-lucide="github" class="h-4 w-4"></i>
            </a>
        ` : '';
        const instagramBtn = project.instagram ? `
            <a href="${project.instagram}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <i data-lucide="instagram" class="h-4 w-4"></i>
            </a>
        ` : '';

        return `
            <div class="card-bg rounded-lg shadow-lg overflow-hidden card-hover group">
                <div class="relative overflow-hidden">
                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute bottom-4 left-4 right-4 flex space-x-2">
                            ${linkBtn}
                            ${githubBtn}
                            ${instagramBtn}
                        </div>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="text-lg font-semibold text-custom-primary">${project.title}</h3>
                        <span class="px-2 py-1 bg-custom-tertiary text-custom-secondary rounded text-xs border border-gray-600">
                            ${project.category}
                        </span>
                    </div>
                    
                    <p class="text-custom-muted text-sm leading-relaxed mb-4">
                        ${project.description}
                    </p>
                    
                    <div class="flex flex-wrap gap-1">
                        ${project.technologies.map(tech => `
                            <span class="px-2 py-1 bg-custom-tertiary text-custom-secondary rounded text-xs">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function populateTestimonials() {
    if (!elements.testimonialsContainer) return;
    
    elements.testimonialsContainer.innerHTML = portfolioData.testimonials.map(testimonial => `
        <div class="card-bg p-6 rounded-lg shadow-lg">
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
                    <p class="text-custom-muted italic mb-3">
                        "${testimonial.content}"
                    </p>
                    <div>
                        <p class="font-semibold text-sm text-custom-primary">${testimonial.name}</p>
                        <p class="text-xs text-custom-muted">${testimonial.role}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Você pode usar uma API de formulário como Formspree ou Getform para receber os dados
    // Exemplo: fetch('https://formspree.io/f/seu-id', { method: 'POST', body: new FormData(e.target) });
    
    showToast('Mensagem enviada com sucesso! Retornarei em breve.');
    e.target.reset();
}

function showToast(message) {
    if (elements.toast && elements.toastMessage) {
        elements.toastMessage.textContent = message;
        elements.toast.classList.remove('translate-x-full');
        
        setTimeout(() => {
            elements.toast.classList.add('translate-x-full');
        }, 3000);
    }
}
