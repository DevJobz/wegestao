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
const textarea = document.querySelector('#contato-form textarea');

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto'; // Redefine a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta a altura com base no conteúdo

    // Limita a altura máxima
    if (textarea.scrollHeight > 300) {
        textarea.style.height = '300px';
        textarea.style.overflowY = 'auto'; // Adiciona barra de rolagem
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

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            if (targetId === '#hero') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start', // Alinha o elemento ao topo da viewport
                });
            }
        } else {
            console.error(`Elemento com ID ${targetId} não encontrado.`);
        }
    });
});

// Modal de Sucesso

const modal = document.getElementById('success-modal');
const closeModal = document.querySelector('.close');

const form = document.getElementById('contato-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura os dados do formulário
    const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
    };

    // Envia os dados para o backend
    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (response.ok) {
                // Exibe o modal de sucesso
                modal.style.display = 'flex';

                // Limpa os campos do formulário
                form.reset();

                // Fecha o modal após 4 segundos
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 4000);
            } else {
                alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
            }
        })
        .catch((error) => {
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
