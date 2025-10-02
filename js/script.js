// ========================================
// JAVASCRIPT ULTRA-SIMPLIFICADO - GARANTIDO
// ========================================

console.log('🔄 Iniciando navegação...');

// Aguardar DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVEGAÇÃO DIRETA E SIMPLES
    // ========================================
    
    // Função principal para mostrar seção
    function showSection(targetId) {
        console.log(`🎯 Mostrando seção: ${targetId}`);
        
        // Esconder todas as seções
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        
        // Mostrar seção target
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            console.log(`✅ Seção ${targetId} ativa!`);
        } else {
            console.error(`❌ Seção ${targetId} não existe!`);
        }
        
        // Scroll para topo
        window.scrollTo(0, 0);
        
        // Atualizar menu ativo
        updateActiveMenu(targetId);
    }
    
    // Atualizar menu ativo
    function updateActiveMenu(activeId) {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ========================================
    // EVENTOS DOS LINKS
    // ========================================
    
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
    
    // ========================================
    // MENU MOBILE
    // ========================================
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    
    // Forçar mostrar home no início
    setTimeout(function() {
        showSection('home');
        console.log('🏠 Home carregada inicialmente');
    }, 100);
    
    console.log('✅ JavaScript carregado com sucesso!');
});

// ========================================
// FUNÇÕES GLOBAIS PARA TESTE
// ========================================

// Função global para testar
window.irPara = function(secao) {
    console.log(`🧪 Teste: Indo para ${secao}`);
    
    // Esconder todas
    document.querySelectorAll('.section').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });
    
    // Mostrar target
    const target = document.getElementById(secao);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
        console.log(`✅ ${secao} mostrada!`);
    }
};

console.log('📄 JavaScript carregado!');
