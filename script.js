// Inicializar Swiper (Carrossel)
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 6000, // Transição a cada 6 segundos
        disableOnInteraction: false, // Continua após interação do usuário
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Ajuste dinâmico da altura do textarea
const textarea = document.querySelector('#contato form textarea');

textarea.addEventListener('input', () => {
    // Redefine a altura para o valor padrão
    textarea.style.height = 'auto';

    // Ajusta a altura com base no conteúdo
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Limita a altura máxima
    if (textarea.scrollHeight > 300) {
        textarea.style.height = '300px';
        textarea.style.overflowY = 'auto'; // Adiciona barra de rolagem vertical
    } else {
        textarea.style.overflowY = 'hidden'; // Remove a barra de rolagem
    }
});

// Menu Mobile
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll suave
document.querySelectorAll('nav a').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Obtém o ID do destino
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Verifica se o elemento existe antes de rolar
        if (targetElement) {
            if (targetId === '#hero') {
                // Rola até o topo da página para o link "Início"
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else {
                // Rola para outras seções com scroll-margin-top
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        } else {
            console.error(`Elemento com ID ${targetId} não encontrado.`);
        }
    });
});

// Modal de Sucesso
const form = document.getElementById('contato-form');
const modal = document.getElementById('success-modal');
const closeModal = document.querySelector('.close');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura os dados do formulário
    const formData = new FormData(form);

    // Envia os dados para o FormSubmit com modo 'no-cors'
    fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Modo 'no-cors'
    })
        .then(() => {
            // Exibe o modal de sucesso
            modal.style.display = 'flex';

            // Limpa os campos do formulário
            form.reset();

            // Fecha o modal após 4 segundos
            setTimeout(() => {
                modal.style.display = 'none';
            }, 4000);
        })
        .catch(() => {
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
        });
});

// Fechar o modal ao clicar no "X"
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Efeito de clique/toque no botão do WhatsApp
const whatsappButton = document.querySelector('.whatsapp-float');

whatsappButton.addEventListener('click', () => {
    // Adiciona a classe "clicked" ao botão
    whatsappButton.classList.add('clicked');

    // Remove a classe após 300ms (tempo da animação)
    setTimeout(() => {
        whatsappButton.classList.remove('clicked');
    }, 300);
});
