const API_URL = 'https://sheetdb.io/api/v1/mxn12bb0ghik0';

async function reserveItem(link) {
    event.preventDefault();

    const itemId = link.getAttribute('data-id');
    const originalHref = link.href; // salva o link original antes de remover

    // Atualiza visualmente todos os links com mesmo data-id imediatamente
    document.querySelectorAll(`.gift-link[data-id="${itemId}"]`).forEach(linkEl => {
        linkEl.textContent = 'Item já comprado';
        linkEl.classList.add('unavailable');
        linkEl.removeAttribute('href');
        linkEl.removeAttribute('onclick');
        linkEl.style.pointerEvents = 'none';
        linkEl.style.opacity = '0.6';
    });

    // Atualiza o campo "reservado" na planilha
    await fetch(`${API_URL}/id/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reservado: 'true' })
    });

    // Como garantia, atualiza todos os links novamente após 1 segundo
    setTimeout(updateGiftLinks, 1000);

    // Abre o link original do presente
    if (originalHref && originalHref !== '#') {
        window.open(originalHref, '_blank');
    }
}

async function updateGiftLinks() {
    const response = await fetch(API_URL);
    const items = await response.json();

    document.querySelectorAll('.gift-link[data-id]').forEach(link => {
        const itemId = link.getAttribute('data-id');
        const item = items.find(i => i.id === itemId);

        if (item && item.reservado && item.reservado.toString().toLowerCase() === 'true') {
            link.textContent = 'Item já comprado';
            link.classList.add('unavailable');
            link.removeAttribute('href');
            link.removeAttribute('onclick');
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.6';
        }
    });
}

// Atualiza todos os botões ao carregar a página
document.addEventListener('DOMContentLoaded', updateGiftLinks);
