// Espera o HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Dados para as seções dinâmicas
    const skills = [
        { name: "HTML5", icon: "html5" },
        { name: "CSS3", icon: "css3" },
        { name: "JavaScript", icon: "js" },
        { name: "React", icon: "react" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "GitHub", icon: "github" },
        { name: "VS Code", icon: "vscode" },
        { name: "Figma", icon: "figma" },
    ];

    const experiences = [
        {
            company: "Empresa XPTO",
            position: "Desenvolvedor Front-end",
            duration: "Janeiro 2023 - Presente",
            description: "Responsável por desenvolver interfaces web responsivas e otimizadas. Trabalhei com HTML, CSS, JavaScript e React em projetos de e-commerce e portais corporativos.",
        },
        {
            company: "Startup XYZ",
            position: "UI/UX Designer & Dev",
            duration: "Março 2022 - Dezembro 2022",
            description: "Participei do ciclo de design e desenvolvimento de produtos digitais, traduzindo wireframes e protótipos de Figma em código funcional.",
        },
    ];

    const projects = [
        {
            title: "E-commerce de Roupas",
            description: "Plataforma de vendas com carrinho de compras, sistema de login e filtros de produtos. Feito com React e Tailwind.",
            link: "https://github.com/tipgabrieldev/ecommerce-project",
            technologies: ["React", "Tailwind", "JavaScript"]
        },
        {
            title: "Blog Pessoal",
            description: "Site otimizado para SEO com sistema de comentários e painel de administração. Desenvolvido com HTML, CSS e um pouco de JS.",
            link: "https://github.com/tipgabrieldev/blog-project",
            technologies: ["HTML", "CSS", "JavaScript"]
        },
    ];

    const testimonials = [
        {
            quote: "O Tipgabrieldev entregou um site incrível e superou minhas expectativas. Rápido, profissional e com uma atenção aos detalhes impecável.",
            author: "João Silva",
            role: "CEO, Empresa Fictícia"
        },
        {
            quote: "Trabalhar com ele foi uma experiência fantástica. Ele transformou a ideia em uma realidade funcional e elegante. Recomendo muito!",
            author: "Maria Oliveira",
            role: "Fundadora, Startup Digital"
        },
    ];

    // Funções para renderizar as seções
    function renderSkills() {
        const container = document.getElementById('skills-container');
        if (!container) return;
        skills.forEach(skill => {
            const badge = document.createElement('span');
            badge.className = "skill-badge-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1";
            badge.innerHTML = `<i data-lucide="${skill.icon}" class="h-4 w-4"></i> ${skill.name}`;
            container.appendChild(badge);
        });
    }

    function renderExperience() {
        const container = document.getElementById('experience-container');
        if (!container) return;
        experiences.forEach(exp => {
            const card = document.createElement('div');
            card.className = "card-bg p-6 rounded-lg shadow-lg space-y-4 card-hover";
            card.innerHTML = `
                <div class="flex items-center space-x-4">
                    <i data-lucide="building" class="h-6 w-6 text-blue-500"></i>
                    <h3 class="text-xl font-semibold text-custom-primary">${exp.company}</h3>
                </div>
                <p class="text-lg text-custom-secondary font-medium">${exp.position}</p>
                <p class="text-sm text-custom-muted">${exp.duration}</p>
                <p class="text-custom-secondary leading-relaxed">${exp.description}</p>
            `;
            container.appendChild(card);
        });
    }

    function renderProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = "card-bg p-6 rounded-lg shadow-lg space-y-4 max-w-sm w-full card-hover";
            
            let techBadges = project.technologies.map(tech => `
                <span class="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full font-mono">${tech}</span>
            `).join('');

            card.innerHTML = `
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-semibold text-custom-primary">${project.title}</h3>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="text-custom-muted hover:text-blue-500 transition-colors duration-200">
                        <i data-lucide="github" class="h-5 w-5"></i>
                    </a>
                </div>
                <p class="text-custom-secondary text-sm">${project.description}</p>
                <div class="flex flex-wrap gap-2 pt-2">${techBadges}</div>
            `;
            container.appendChild(card);
        });
    }

    function renderTestimonials() {
        const container = document.getElementById('testimonials-container');
        if (!container) return;
        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = "card-bg p-6 rounded-lg shadow-lg space-y-4 card-hover";
            card.innerHTML = `
                <i data-lucide="quote" class="h-8 w-8 text-blue-500"></i>
                <p class="text-custom-secondary italic leading-relaxed">"${testimonial.quote}"</p>
                <div class="border-t border-custom-tertiary pt-4">
                    <p class="text-custom-primary font-semibold">${testimonial.author}</p>
                    <p class="text-sm text-custom-muted">${testimonial.role}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function handleScroll() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('header-bg');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('header-bg');
            header.classList.add('bg-transparent');
        }
    }

    function handleMobileMenu() {
        const toggleButton = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');

        toggleButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    function handleYear() {
        const currentYearSpan = document.getElementById('current-year');
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Inicialização de todas as funções após o DOM estar pronto
    renderSkills();
    renderExperience();
    renderProjects();
    renderTestimonials();
    handleMobileMenu();
    handleYear();

    // Eventos que dependem de interação do usuário
    window.addEventListener('scroll', handleScroll);

    // Chamar a função do Lucide para renderizar os ícones
    // É CRUCIAL que isso venha DEPOIS de todos os `render`
    lucide.createIcons();

});
