// ========================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    // Função para mostrar seção ativa
    function showSection(targetId) {
        // Esconder todas as seções
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar seção alvo
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Atualizar link ativo na navegação
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });

        // Fechar menu mobile se estiver aberto
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    }

    // Event listeners para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Scroll suave para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Toggle do menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Mostrar seção home por padrão
    showSection('home');
});

// ========================================
// CONTADOR ANIMADO PARA ESTATÍSTICAS
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 50; // Menor número = animação mais lenta

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Observer para iniciar contadores quando visíveis
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statsSection);
}

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contato__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const nome = formData.get('nome');
            const empresa = formData.get('empresa');
            const email = formData.get('email');
            const telefone = formData.get('telefone');
            const segmento = formData.get('segmento');
            const interesse = formData.get('interesse');
            const mensagem = formData.get('mensagem');
            
            // Validar campos obrigatórios
            if (!nome || !email || !telefone || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validar checkbox de aceite
            const aceito = formData.get('aceito');
            if (!aceito) {
                alert('É necessário aceitar o recebimento de informações para prosseguir.');
                return;
            }
            
            // Criar mensagem para WhatsApp
            let whatsappMessage = `🚀 *Nova mensagem do site BritosCode*\\n\\n`;
            whatsappMessage += `👤 *Nome:* ${nome}\\n`;
            if (empresa) whatsappMessage += `🏢 *Empresa:* ${empresa}\\n`;
            whatsappMessage += `📧 *Email:* ${email}\\n`;
            whatsappMessage += `📱 *Telefone:* ${telefone}\\n`;
            if (segmento) whatsappMessage += `🏪 *Segmento:* ${segmento}\\n`;
            if (interesse) whatsappMessage += `🎯 *Interesse:* ${interesse}\\n\\n`;
            whatsappMessage += `💬 *Mensagem:*\\n${mensagem}\\n\\n`;
            whatsappMessage += `📝 Mensagem enviada através do site: entr.ai/britoscode`;
            
            // Abrir WhatsApp
            const whatsappURL = `https://wa.me/5511966092994?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
            
            // Mostrar mensagem de sucesso
            alert('Redirecionando para o WhatsApp! Sua mensagem será enviada diretamente para nosso atendimento.');
            
            // Limpar formulário
            this.reset();
        });
        
        // Melhorar UX dos campos do formulário
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Efeito de foco
            input.addEventListener('focus', function() {
                this.style.borderColor = '#1A2A5F';
                this.style.boxShadow = '0 0 0 3px rgba(26, 42, 95, 0.1)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            });
        });
    }
});

// ========================================
// SMOOTH SCROLL E EFEITOS VISUAIS
// ========================================

// Adicionar classe para elementos que aparecem ao rolar
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.sobre__item, .segmento-destaque, .diferencial__item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// Executar ao carregar e ao rolar
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// ========================================
// MELHORIAS DE ACESSIBILIDADE
// ========================================

// Navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC fecha menu mobile
    if (e.key === 'Escape') {
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// ========================================
// UTILITÁRIOS
// ========================================

// Função para formatação de telefone
function formatPhone(input) {
    let value = input.value.replace(/\\D/g, '');
    value = value.replace(/(\\d{2})(\\d)/, '($1) $2');
    value = value.replace(/(\\d{4,5})(\\d{4})$/, '$1-$2');
    input.value = value;
}

// Aplicar formatação ao campo telefone
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        formatPhone(this);
    });
}

// Função para validação de email
function validateEmail(email) {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
}

// Validação em tempo real do email
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
            this.setCustomValidity('Por favor, insira um email válido');
        } else {
            this.style.borderColor = '#ddd';
            this.setCustomValidity('');
        }
    });
}

// ========================================
// PERFORMANCE E OTIMIZAÇÃO
// ========================================

// Lazy loading para vídeos (caso necessário)
function lazyLoadVideos() {
    const videos = document.querySelectorAll('video[data-src]');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                    videoObserver.unobserve(video);
                }
            });
        });
        
        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadVideos);

// Debug helper (remover em produção)
console.log('🚀 BritosCode Tecnologia - Site carregado com sucesso!');
console.log('📱 WhatsApp: (11) 96609-2994');
console.log('🌐 Portfólio: https://entr.ai/britoscode');