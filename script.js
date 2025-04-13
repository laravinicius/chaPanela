function reserveItem(link) {
    event.preventDefault();

    const itemId = link.getAttribute('data-id');
    link.classList.add('unavailable');
    link.textContent = 'Item já comprado';

    let reservedItems = JSON.parse(localStorage.getItem('reservedItems')) || [];

    if (!reservedItems.includes(itemId)) {
        reservedItems.push(itemId);
        localStorage.setItem('reservedItems', JSON.stringify(reservedItems));
    }

    // Redireciona para o link PicPay (se tiver href)
    if (link.href && link.href !== '#') {
        window.open(link.href, '_blank');
    }

    // Atualiza botão "Verificar" na index se aplicável
    updateGiftLinks();
}
function updateGiftLinks() {
    const reservedItems = JSON.parse(localStorage.getItem('reservedItems')) || [];

    document.querySelectorAll('.gift-link[data-id]').forEach(link => {
        const itemId = link.getAttribute('data-id');
        if (reservedItems.includes(itemId)) {
            link.textContent = 'Item já comprado';
            link.classList.add('unavailable');
            link.removeAttribute('href');
            link.removeAttribute('onclick');
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.6';
        }
    });
}




function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

window.onload = function () {
    let reservedItems = JSON.parse(localStorage.getItem('reservedItems')) || [];
    reservedItems.forEach(itemId => {
        let link = document.querySelector(`.gift-link[data-id="${itemId}"]`);
        if (link) {
            link.classList.add('unavailable');
            link.textContent = 'Item já comprado';
        }
    });
};
document.addEventListener('DOMContentLoaded', function () {
    updateGiftLinks();
});

function copiarPix() {
    const input = document.getElementById("pixInput");
    input.select();
    input.setSelectionRange(0, 99999); // Compatível com mobile

    navigator.clipboard.writeText(input.value)
        .then(() => {
            const popup = document.getElementById("popup");
            popup.classList.add("show");

            setTimeout(() => {
                popup.classList.remove("show");
            }, 3000); // 3 segundos
        })
        .catch(err => {
            console.error("Erro ao copiar:", err);
        });
}


