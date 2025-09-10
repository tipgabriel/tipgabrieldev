# 🎨 Portfólio tipgabrieldev

Portfólio profissional desenvolvido com HTML, CSS, Tailwind CSS, JavaScript vanilla e LD-JSON para SEO.

## ✨ Características

- 📱 **Design Responsivo**: Mobile-first, funciona perfeitamente em todos os dispositivos
- 🎭 **Efeito Matrix**: Animação Matrix pronunciada no hero section
- 🎨 **Design Corporativo**: Visual profissional e moderno
- ⚡ **Performance**: Carregamento rápido e otimizado
- 🔍 **SEO Otimizado**: Meta tags completas e estrutura LD-JSON
- 🌐 **Cross-browser**: Compatível com todos os navegadores modernos

## 🚀 Funcionalidades

### 🎯 Seções Principais
- **Hero**: Apresentação com efeito Matrix animado
- **Sobre**: Biografia, habilidades e links sociais
- **Portfólio**: 6 projetos de exemplo com filtros por categoria
- **Contato**: Formulário funcional com validação
- **Footer**: Links, informações e JSON-LD estruturado

### 🔧 Funcionalidades Técnicas
- ✅ Navegação suave entre seções
- ✅ Menu hamburger responsivo
- ✅ Filtros dinâmicos do portfólio
- ✅ Formulário com validação completa
- ✅ Sistema de notificações toast
- ✅ Animações CSS e JavaScript
- ✅ Lazy loading de imagens

## 📁 Estrutura de Arquivos

```
tipgabrieldev-portfolio/
├── index.html          # Estrutura HTML principal
├── style.css           # Estilos customizados
├── script.js           # JavaScript vanilla
├── data.js            # Dados mock dos projetos
└── README.md          # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos e animações
- **Tailwind CSS**: Framework utilitário via CDN
- **JavaScript**: Vanilla JS puro, sem dependências
- **LD-JSON**: Dados estruturados para SEO
- **Google Fonts**: Inter + Fira Code

## 🎨 Customização

### 1. Informações Pessoais
Edite o arquivo `data.js` para atualizar:
- Informações pessoais (nome, email, telefone)
- Links para redes sociais
- Projetos do portfólio
- Tecnologias e habilidades

### 2. Logo e Branding
- Substitua o placeholder "TGD" no hero pela sua logomarca
- Atualize o título "tipgabrieldev" para sua marca
- Modifique as cores no Tailwind config se necessário

### 3. Projetos
No arquivo `data.js`, atualize o array `mockProjects`:
```javascript
{
    id: 1,
    title: "Seu Projeto",
    description: "Descrição do projeto...",
    category: "frontend", // web-design, frontend, fullstack
    image: "url-da-imagem.jpg",
    technologies: ["React", "CSS3"],
    liveUrl: "https://seu-projeto.com",
    githubUrl: "https://github.com/seu-usuario/projeto"
}
```

### 4. Cores e Estilos
Personalize as cores no `index.html`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'corporate-blue': '#sua-cor-aqui'
            }
        }
    }
}
```

## 🚀 Como Usar

### Opção 1: Download Direto
1. Baixe todos os arquivos
2. Abra `index.html` em qualquer navegador
3. Funciona offline e localmente

### Opção 2: Hospedagem Web
1. Faça upload dos arquivos para seu servidor
2. Configure seu domínio
3. Perfeito para hospedagem estática (Netlify, Vercel, GitHub Pages)

### Opção 3: Desenvolvimento Local
```bash
# Clone ou baixe os arquivos
cd tipgabrieldev-portfolio

# Abra com um servidor local (opcional)
python -m http.server 8000
# ou
npx serve .
```

## 📧 Formulário de Contato

O formulário está configurado para funcionar via JavaScript (mock). Para integração real:

1. **Backend próprio**: Modifique a função `simulateFormSubmission` em `script.js`
2. **Formspree**: Adicione `action="https://formspree.io/f/seu-id"` ao form
3. **Netlify Forms**: Adicione `netlify` ao atributo do form
4. **EmailJS**: Integre com a biblioteca EmailJS

## 🔍 SEO

O site inclui:
- Meta tags completas
- Open Graph para redes sociais  
- JSON-LD estruturado (Schema.org)
- URLs amigáveis
- Estrutura HTML semântica

## 📱 Responsividade

Testado e otimizado para:
- 📱 Mobile (320px+)
- 📟 Tablet (768px+)  
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## ⚡ Performance

- ✅ Imagens otimizadas com lazy loading
- ✅ CSS e JS minificados em produção
- ✅ Fontes otimizadas do Google Fonts
- ✅ Sem dependências externas pesadas
- ✅ First Contentful Paint < 2s

## 🌐 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 📝 Licença

Este projeto é de uso livre. Você pode usar, modificar e distribuir como desejar.

## 🤝 Suporte

Para dúvidas ou suporte:
- 📧 Email: contato@tipgabrieldev.com
- 🌐 Website: https://tipgabrieldev.com

---

**Desenvolvido com ❤️ por Gabriel - tipgabrieldev**
