let lang = getCookie('lang');

if (!location.hash) {
	if (lang) location.replace(lang);
	else location.replace('#en');
}

if (lang != location.hash) {
	setCookie('lang', location.hash);
	location.reload();
}

for (let text of document.querySelectorAll('.translate')) {
	text.innerHTML = text.innerHTML.split('|')[Math.floor(lang == '#fr')];
}

document.querySelector('#flag').href = lang == '#fr' ? '#en' : '#fr';
document.querySelector('#flag-img').src = `./pwa/img/buttons/${lang == '#fr' ? 'france' : 'usa'}-button.png`;
document.querySelector('#flag-shad').src = `./pwa/img/buttons/${lang == '#fr' ? 'france' : 'usa'}-button-shadow.png`;

let imgs = document.querySelectorAll('img');
console.log(imgs);
for (img of imgs) img.addEventListener('load', event => console.log(imgs.length, img.src));

for (let button of document.querySelectorAll('.button')) {
	button.addEventListener('click', event => {
		event.preventDefault();

		let ref = button.getAttribute('href');
		if (ref == '#fr' || ref == '#en') {
			location.replace(ref);
			location.reload();
		} else if (ref.includes('#')) document.querySelector(ref).scrollIntoView({ behavior: 'smooth' });

		button.classList.add('pressed');
		setTimeout(() => button.classList.remove('pressed'), 1000);

		// location.replace(lang);
	});
}
