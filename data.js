/**
 * Dados mock para o portfólio tipgabrieldev
 * Este arquivo contém todos os dados de exemplo
 * Substitua pelos seus dados reais
 */

// Projetos do portfólio - estrutura preparada para expansão
const mockProjects = [
    {
        id: 1,
        title: "E-commerce Moderno",
        description: "Plataforma de e-commerce completa com design responsivo, sistema de pagamento integrado e painel administrativo. Focado em performance e experiência do usuário.",
        category: "fullstack",
        categoryLabel: "Full Stack",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
        liveUrl: "https://exemplo-ecommerce.com",
        githubUrl: "https://github.com/tipgabrieldev/ecommerce-projeto",
        caseStudyUrl: null,
        featured: true,
        completionDate: "2024-01",
        client: "Empresa XYZ"
    },
    {
        id: 2,
        title: "Dashboard Analytics",
        description: "Interface moderna para visualização de dados e métricas empresariais. Incluindo gráficos interativos, relatórios em tempo real e design system personalizado.",
        category: "frontend",
        categoryLabel: "Frontend",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
        technologies: ["Vue.js", "Chart.js", "SCSS", "TypeScript", "REST API"],
        liveUrl: "https://exemplo-dashboard.com",
        githubUrl: "https://github.com/tipgabrieldev/dashboard-analytics",
        caseStudyUrl: "https://behance.net/project-case-study",
        featured: true,
        completionDate: "2023-12",
        client: "Startup ABC"
    },
    {
        id: 3,
        title: "Landing Page Criativa",
        description: "Landing page com animações fluidas e design impactante para uma agência de marketing digital. Otimizada para conversões e totalmente responsiva.",
        category: "web-design",
        categoryLabel: "Web Design",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center",
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Figma"],
        liveUrl: "https://exemplo-landing.com",
        githubUrl: "https://github.com/tipgabrieldev/landing-criativa",
        caseStudyUrl: null,
        featured: false,
        completionDate: "2023-11",
        client: "Agência Digital 123"
    },
    {
        id: 4,
        title: "App Mobile Web",
        description: "Aplicação web progressiva (PWA) para gestão de tarefas com interface mobile-first, notificações push e funcionamento offline.",
        category: "frontend",
        categoryLabel: "Frontend",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
        technologies: ["React", "PWA", "Service Workers", "IndexedDB", "Material-UI"],
        liveUrl: null,
        githubUrl: "https://github.com/tipgabrieldev/pwa-tasks",
        caseStudyUrl: null,
        featured: false,
        completionDate: "2023-10",
        client: "Projeto Pessoal"
    },
    {
        id: 5,
        title: "Site Institucional",
        description: "Website corporativo para escritório de advocacia com design elegante, formulários de contato e sistema de blog integrado.",
        category: "web-design",
        categoryLabel: "Web Design",
        image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b3d3?w=600&h=400&fit=crop&crop=center",
        technologies: ["WordPress", "PHP", "MySQL", "Bootstrap", "jQuery"],
        liveUrl: "https://exemplo-institucional.com",
        githubUrl: null,
        caseStudyUrl: null,
        featured: false,
        completionDate: "2023-09",
        client: "Escritório Jurídico"
    },
    {
        id: 6,
        title: "Plataforma Educacional",
        description: "Sistema de ensino à distância com área do aluno, professor e administrador. Incluindo sistema de vídeo aulas e quiz interativo.",
        category: "fullstack",
        categoryLabel: "Full Stack",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop&crop=center",
        technologies: ["React", "Express.js", "PostgreSQL", "Socket.io", "AWS S3"],
        liveUrl: null,
        githubUrl: "https://github.com/tipgabrieldev/plataforma-ead",
        caseStudyUrl: "https://behance.net/projeto-educacional",
        featured: true,
        completionDate: "2023-08",
        client: "Instituto de Ensino"
    }
];

// Categorias disponíveis para filtros
const projectCategories = [
    { id: "all", label: "Todos", count: mockProjects.length },
    {
        id: "web-design",
        label: "Web Design",
        count: mockProjects.filter(p => p.category === "web-design").length
    },
    {
        id: "frontend",
        label: "Frontend",
        count: mockProjects.filter(p => p.category === "frontend").length
    },
    {
        id: "fullstack",
        label: "Full Stack",
        count: mockProjects.filter(p => p.category === "fullstack").length
    }
];

// Tecnologias mais utilizadas
const topTechnologies = [
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "TypeScript",
    "Vue.js",
    "HTML5",
    "CSS3",
    "MongoDB",
    "Figma"
];

// Depoimentos de clientes (mock)
const testimonials = [
    {
        id: 1,
        name: "Maria Silva",
        position: "CEO, Empresa XYZ",
        content: "Gabriel entregou um trabalho excepcional. O e-commerce ficou exatamente como imaginávamos, com performance excelente e design moderno.",
        rating: 5,
        project: "E-commerce Moderno",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "João Santos",
        position: "CTO, Startup ABC",
        content: "Profissional competente e dedicado. O dashboard analytics superou nossas expectativas em funcionalidade e usabilidade.",
        rating: 5,
        project: "Dashboard Analytics",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "Ana Costa",
        position: "Diretora de Marketing, Agência 123",
        content: "A landing page desenvolvida pelo Gabriel gerou um aumento significativo nas nossas conversões. Recomendo!",
        rating: 5,
        project: "Landing Page Criativa",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
];

// Estatísticas do desenvolvedor (mock)
const developerStats = [
    { label: "Projetos Concluídos", value: "50+", icon: "projects" },
    { label: "Clientes Satisfeitos", value: "30+", icon: "clients" },
    { label: "Anos de Experiência", value: "5+", icon: "experience" },
    { label: "Tecnologias Dominadas", value: "15+", icon: "technologies" }
];

// Informações do desenvolvedor
const developerInfo = {
    name: "Gabriel",
    title: "Desenvolvedor Front-end & Web Designer",
    location: "São Paulo, SP - Brasil",
    email: "contato@tipgabrieldev.com",
    phone: "+55 (11) 99999-9999",
    website: "https://tipgabrieldev.com",
    bio: "Desenvolvedor front-end apaixonado por criar experiências digitais modernas e funcionais. Especializado em React, JavaScript e design responsivo.",
    availability: "Disponível para freelances",
    social: {
        github: "https://github.com/tipgabrieldev",
        linkedin: "https://linkedin.com/in/tipgabrieldev",
        behance: "https://behance.net/tipgabrieldev",
        instagram: "https://instagram.com/tipgabrieldev"
    }
};

// Configurações do site
const siteConfig = {
    title: "tipgabrieldev - Desenvolvedor Front-end & Web Designer",
    description: "Criando experiências digitais modernas e funcionais. Especializado em desenvolvimento front-end com foco em performance, usabilidade e design responsivo.",
    url: "https://tipgabrieldev.com",
    author: "Gabriel - tipgabrieldev",
    keywords: ["desenvolvedor frontend", "web designer", "React", "JavaScript", "Tailwind CSS", "portfólio"],
    language: "pt-BR",
    theme_color: "#3b82f6",
    background_color: "#ffffff"
};
