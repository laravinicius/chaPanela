function reserveItem(link) {
    event.preventDefault();
    const itemId = link.getAttribute('data-id');
    link.classList.add('unavailable');
    link.textContent = 'Indisponível';
    let reservedItems = JSON.parse(localStorage.getItem('reservedItems')) || [];
    reservedItems.push(itemId);
    localStorage.setItem('reservedItems', JSON.stringify(reservedItems));
}

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

window.onload = function() {
    let reservedItems = JSON.parse(localStorage.getItem('reservedItems')) || [];
    reservedItems.forEach(itemId => {
        let link = document.querySelector(`.gift-link[data-id="${itemId}"]`);
        if (link) {
            link.classList.add('unavailable');
            link.textContent = 'Indisponível';
        }
    });
};