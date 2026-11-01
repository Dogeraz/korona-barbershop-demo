// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

function setMenu(open) {
	burger.setAttribute('aria-expanded', String(open));
	burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
	nav.classList.toggle('is-open', open);
}

// Клик по бургеру: открыть или закрыть
burger.addEventListener('click', () => {
	const isOpen = burger.getAttribute('aria-expanded') === 'true';
	setMenu(!isOpen);
});

// Клик по пункту меню: закрыть меню
nav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => setMenu(false));
});

// Клавиша Escape: закрыть меню
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') setMenu(false);
});
