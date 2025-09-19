// Dados do Portfólio
const portfolioData = {
  // Informações pessoais
  personal: {
    name: "TipGabrielDev",
    title: "Desenvolvedor Front-end",
    bio: "Desenvolvedor apaixonado por tecnologia e inovação, especializado em criar soluções web modernas e funcionais. Café, código e criatividade: crio interfaces que funcionam e fazem sentido.",
    location: "Brasil",
    email: "tipgabrieldev@proton.me",
    phone: "+55 (31) 98204-2552"
  },
  // Redes sociais
  social: {
    github: "https://github.com/tipgabriel",
    instagram: "https://instagram.com/tipgabrieldev"
  },
  // Lista de habilidades
  skills: [
    "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "JSON-LD",
    "Design Responsivo", "UI/UX Design", "Otimização e Perfomance", "SEO"
  ],
  // Experiências profissionais
  experience: [
    {
      id: 1,
      position: "Desenvolvedor Front-end",
      company: "Projetos Independentes",
      period: "2020 - Presente",
      description: "Criação de interfaces modernas e funcionais, focando em experiência do usuário e design responsivo. Desenvolvimento de identidades visuais e branding.",
      technologies: ["HTML5", "CSS3", "Tailwind", "JavaScript", "JSON-LD", "Design", "Canva"]
    }
  ],
  // Projetos desenvolvidos
  projects: [
    {
      id: 1,
      title: "MeltrançasBH",
      description: "Website completo para estúdio de tranças afro, incluindo galeria de trabalhos, agendamento online e informações sobre serviços especializados.",
      technologies: ["HTML5", "CSS3", "Tailwind", "JavaScript", "JSON-LD"],
      image: "meltrancasbh.png",
      link: "https://studiomel.vercel.app/", // Link para o site
      Instagram: "https://www.instagram.com/studiomel/", // Link para o Instagram
      category: "Website",
      featured: true
    },
    {
      id: 2,
      title: "Barbearia André",
      description: "Desenvolvimento de identidade visual completa para barbearia, incluindo logotipo, paleta de cores e aplicações em diversos materiais.",
      technologies: ["Design", "Branding"],
      image: "barbearia-andre.png",
      link: "https://www.instagram.com/barbeariandreoficial032013/", // Link para o site
      Instagram: "https://www.instagram.com/barbeariandreoficial032013/",
      category: "Logo",
      featured: true
    },
    {
      id: 3,
      title: "HQ Azul Estelar e Verde Neon",
      description: "Website interativo para histórias em quadrinhos com design futurista, galeria de personagens e sistema de leitura online otimizado.",
      technologies: ["HTML5", "CSS3", "Tailwind", "JavaScript", "JSON-LD"],
      image: "Azul-estelar.jpeg",
      link: "https://hqsunrise.vercel.app/", // Link para o site
      Instagram: "https://www.instagram.com/jessicapamela461/",
      category: "Website",
      featured: true
    }
  ],
  // Depoimentos de clientes
  testimonials: [
    {
      id: 1,
      name: "Studiomel",
      role: "Proprietária do Estúdio",
      content: "O site ficou incrível, moderno e super funcional, do jeitinho que a gente precisava.",
      avatar: "mel.jpg"
    },
    {
      id: 2,
      name: "André",
      role: "Proprietário da Barbearia",
      content: "Transformou minha ideia em uma identidade visual impecável para a barbearia. Ficou exatamente como eu imaginava!",
      avatar: "barbearia-andre.png"
    }
  ]
};

// Objeto para armazenar elementos do DOM
let elements = {};

// Inicializa o script quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa os ícones do Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  // Obtém os elementos do DOM e os armazena
  initializeElements();
  // Configura os ouvintes de eventos
  setupEventListeners();
  // Preenche o conteúdo do portfólio na página
  populateContent();
  // Configura os efeitos de rolagem
  setupScrollEffects();
  // Atualiza o ano no rodapé
  updateCopyrightYear();
});

// Função para inicializar os elementos do DOM
function initializeElements() {
  elements = {
    // Menu móvel
    mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
    mobileMenu: document.getElementById('mobile-menu'),
    menuIcon: document.getElementById('menu-icon'),
    closeIcon: document.getElementById('close-icon'),
    // Navegação
    viewProjectsBtn: document.getElementById('view-projects-btn'),
    navLinks: document.querySelectorAll('.nav-link, .mobile-nav-link'),
    // Contêineres de conteúdo
    skillsContainer: document.getElementById('skills-container'),
    experienceContainer: document.getElementById('experience-container'),
    projectsContainer: document.getElementById('projects-container'),
    testimonialsContainer: document.getElementById('testimonials-container'),
    // Formulário de contato
    contactForm: document.getElementById('contact-form'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message'),
    // Cabeçalho
    header: document.getElementById('header'),
    // Ano do rodapé
    currentYear: document.getElementById('current-year')
  };
}

// Função para configurar os ouvintes de eventos
function setupEventListeners() {
  // Adiciona evento para o menu móvel
  elements.mobileMenuToggle?.addEventListener('click', toggleMobileMenu);
  // Adiciona evento para o botão "Ver Projetos"
  elements.viewProjectsBtn?.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });
  // Adiciona evento de clique para os links de navegação
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
  // Adiciona evento para o formulário de contato
  elements.contactForm?.addEventListener('submit', handleContactSubmit);
  // Fecha o menu móvel ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (!elements.mobileMenuToggle?.contains(e.target) && !elements.mobileMenu?.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

// Função para atualizar o ano no rodapé
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  if (elements.currentYear) {
    elements.currentYear.textContent = currentYear;
  }
}

// Função para alternar o menu móvel (abrir/fechar)
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

// Função para fechar o menu móvel
function closeMobileMenu() {
  elements.mobileMenu.classList.add('hidden');
  elements.menuIcon.classList.remove('hidden');
  elements.closeIcon.classList.add('hidden');
}

// Função para adicionar efeitos de rolagem ao cabeçalho
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

// Função principal para popular todo o conteúdo
function populateContent() {
  populateSkills();
  populateExperience();
  populateProjects();
  populateTestimonials();
}

// Função para popular as habilidades
function populateSkills() {
  if (!elements.skillsContainer) return;
  elements.skillsContainer.innerHTML = portfolioData.skills.map(skill => `
    <span class="px-3 py-2 skill-badge-white rounded-lg text-sm transition-all duration-200 cursor-default">
      ${skill}
    </span>
  `).join('');
}

// Função para popular as experiências profissionais
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
  // Re-inicializa os ícones após popular o conteúdo
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Função para popular os projetos
function populateProjects() {
  if (!elements.projectsContainer) return;
  elements.projectsContainer.innerHTML = portfolioData.projects.map(project => `
    <div class="card-bg rounded-lg shadow-lg overflow-hidden card-hover group">
      <div class="relative overflow-hidden">
        <img
          src="${project.image}"
          alt="${project.title}"
          class="w-80 h-80 rounded-md object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-4 left-4 right-4 flex space-x-2">
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="flex-1 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center text-sm">
              <i data-lucide="external-link" class="h-4 w-4 mr-2"></i>
              Explore o site
            </a>
            <a href="${project.Instagram}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center text-sm">
              <i data-lucide="instagram" class="h-4 w-4"></i>
            </a>
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
  `).join('');
  // Re-inicializa os ícones após popular o conteúdo
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Função para popular os depoimentos
function populateTestimonials() {
  if (!elements.testimonialsContainer) return;
  elements.testimonialsContainer.innerHTML = portfolioData.testimonials.map(testimonial => `
    <div class="card-bg p-6 rounded-lg shadow-lg">
      <div class="flex items-start space-x-4">
        <img
          src="${testimonial.avatar}"
          alt="${testimonial.name}"
          class="w-12 h-12 rounded-full flex-shrink-0 object-cover"
          loading="lazy"
        />
        <div class="flex-1">
          <div class="flex items-center mb-2">
            ${Array(5).fill().map(() => `
              <i data-lucide="star" class="h-4 w-4 text-yellow-400 fill-current"></i>
            `).join('')}
          </div>
          <p class="text-custom-muted normal mb-3">
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
  // Re-inicializa os ícones após popular o conteúdo
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Função para lidar com o envio do formulário de contato
function handleContactSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };
  // Simula o envio do formulário e exibe uma mensagem
  showToast('Mensagem enviada com sucesso! Retornarei em breve.');
  // Reseta o formulário
  e.target.reset();
  // Em uma aplicação real, você enviaria esses dados para o seu backend
  console.log('Formulário de contato enviado:', data);
}

// Função para exibir uma mensagem de toast
function showToast(message) {
  elements.toastMessage.textContent = message;
  elements.toast.classList.remove('translate-x-full');
  setTimeout(() => {
    elements.toast.classList.add('translate-x-full');
  }, 3000);
}
