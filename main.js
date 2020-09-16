let lang = getCookie('lang');

if (!location.hash) {
	if (lang) location.replace(lang);
	else location.replace('#en');
}

if (lang != location.hash) {
	setCookie('lang', location.hash);
	location.reload();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});
