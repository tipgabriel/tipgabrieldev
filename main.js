document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Controle do Menu Mobile (Flexbox Interativo) ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'hidden' do Tailwind
            mobileMenu.classList.toggle('hidden');
        });

        // Oculta o menu ao clicar em um link (melhor UX)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- 2. Filtro de Projetos (Foco em Conteúdo) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            filterProjects(filterValue);
            updateActiveButton(button);
        });
    });

    // Função para filtrar e mostrar/esconder no Grid
    function filterProjects(filter) {
        projectCards.forEach(card => {
            const tech = card.getAttribute('data-tech');
            const shouldShow = filter === 'Todos' || tech.includes(filter);

            // Controla a visibilidade (com classe para facilitar transição se desejar)
            if (shouldShow) {
                card.style.display = 'block'; // Mostra o card
            } else {
                card.style.display = 'none'; // Esconde o card
            }
        });
    }

    // Função para mudar o estilo do botão ativo
    function updateActiveButton(activeButton) {
        filterButtons.forEach(btn => {
            // Remove estilos de ativo
            btn.classList.remove('bg-inov-indigo', 'text-white');
            btn.classList.add('bg-gray-200', 'text-inov-gray');

            // Adiciona estilos de ativo
            if (btn === activeButton) {
                btn.classList.add('bg-inov-indigo', 'text-white');
                btn.classList.remove('bg-gray-200', 'text-inov-gray');
            }
        });
    }

    // Inicializa o filtro para "Todos" e define o botão ativo
    const allButton = document.querySelector('[data-filter="Todos"]');
    if (allButton) {
        updateActiveButton(allButton);
    }
});
