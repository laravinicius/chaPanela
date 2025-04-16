const API_URL = 'https://sheetdb.io/api/v1/mxn12bb0ghik0';

async function reserveItem(link) {
    event.preventDefault();

    const itemId = link.getAttribute('data-id');

    // Atualiza o campo "reservado" para true
    await fetch(`${API_URL}/id/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reservado: 'true' })
    });

    // Atualiza visualmente os botões
    setTimeout(updateGiftLinks, 1000);

    // Abre link do presente
    if (link.href && link.href !== '#') {
        window.open(link.href, '_blank');
    }
}

async function updateGiftLinks() {
    const response = await fetch(API_URL);
    const items = await response.json();

    document.querySelectorAll('.gift-link[data-id]').forEach(link => {
        const itemId = link.getAttribute('data-id');
        const item = items.find(i => i.id === itemId);

        if (item && item.reservado === 'true') {
            link.textContent = 'Item já comprado';
            link.classList.add('unavailable');
            link.removeAttribute('href');
            link.removeAttribute('onclick');
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.6';
        }
    });
}

document.addEventListener('DOMContentLoaded', updateGiftLinks);
