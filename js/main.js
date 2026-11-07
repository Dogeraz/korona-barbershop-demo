// Контакты мессенджеров (демо: вымышленный проект, реальные данные не используются).
// Настройте в одном месте перед публикацией для клиента.
const MESSENGERS = {
	// Только цифры в международном формате без "+" и пробелов, например "79990000000". Пусто = не настроено.
	whatsappNumber: '',
	// Имя пользователя Telegram без "@", например "korona_barbershop". Пусто = не настроено.
	telegramUsername: '',
	// Необязательный текст для WhatsApp (будет закодирован в URL). Пусто = без текста.
	whatsappText: '',
};

function buildMessengerUrl(type) {
	if (type === 'whatsapp') {
		const number = (MESSENGERS.whatsappNumber || '').replace(/\D/g, '');
		if (!number) return '';
		const url = 'https://wa.me/' + number;
		const text = (MESSENGERS.whatsappText || '').trim();
		return text ? url + '?text=' + encodeURIComponent(text) : url;
	}
	if (type === 'telegram') {
		const username = (MESSENGERS.telegramUsername || '').trim().replace(/^@/, '');
		if (!/^[A-Za-z0-9_]{5,32}$/.test(username)) return '';
		return 'https://t.me/' + username;
	}
	return '';
}

function initMessengerButtons() {
	document.querySelectorAll('[data-messenger]').forEach((button) => {
		const type = button.getAttribute('data-messenger');
		const url = buildMessengerUrl(type);
		const hint = 'Контакт не настроен (демо)';

		if (!url) {
			button.disabled = true;
			button.setAttribute('aria-disabled', 'true');
			button.setAttribute('title', hint);
			return;
		}

		button.disabled = false;
		button.removeAttribute('aria-disabled');
		button.removeAttribute('title');
		button.addEventListener('click', () => {
			window.open(url, '_blank', 'noopener,noreferrer');
		});
	});
}

initMessengerButtons();

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
