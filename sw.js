let version = '2.0.17';

let files = [
	// system
	'./',
	'./index.html',
	'./styles/style.css',

	'./src/cookie.js',
	'./src/touch.js',
	'./src/overlay.js',
	'./src/button.js',
	'./src/event.js',
	'./src/entity.js',
	'./src/game.js',
	'./src/pages/menu.js',
	'./src/pages/chap1.js',
	'./src/main.js',

	'./img/icon/icon192.png',
	'./img/icon/icon512.png',
	'./img/gifs/android.gif',
	'./img/gifs/loading.gif',
	'./img/gifs/rotate_phone.gif',
	'./img/gifs/touch_screen.gif',

	'./fonts/Pixelar.woff',
	'./fonts/Pixelar.woff2',

	// gameplay
	'./sounds/click.mp3',
	'./sounds/Art Of Silence.mp3',
	'./sounds/nature-ambience.mp3',

	'./img/title.png',
	'./img/ground1.png',
	'./img/ground1-night.png',

	'./img/buildings/small-house1.png',
	'./img/buildings/small-house1-shadow.png',
	'./img/buildings/small-house1-night.png',

	'./img/trees/pine1.png',
	'./img/trees/pine1-shadow.png',
	'./img/trees/pine2.png',
	'./img/trees/pine2-shadow.png',
	'./img/trees/pine3.png',
	'./img/trees/pine3-shadow.png',
	'./img/trees/pine4.png',
	'./img/trees/pine4-shadow.png',
	'./img/trees/tree-calc.png',

	'./img/trees/pine1-night.png',
	'./img/trees/pine1-shadow-night.png',
	'./img/trees/pine2-night.png',
	'./img/trees/pine2-shadow-night.png',
	'./img/trees/pine3-night.png',
	'./img/trees/pine3-shadow-night.png',
	'./img/trees/pine4-night.png',
	'./img/trees/pine4-shadow-night.png',
	'./img/trees/tree-calc-night.png',

	'./img/humans/human-shadow.png',
	'./img/humans/eliot.png',
	'./img/humans/eliot-night.png',
	'./img/humans/lea.png',
	'./img/humans/lea-night.png',
	'./img/humans/scott.png',
	'./img/humans/scott-night.png',
	'./img/humans/karmen.png',
	'./img/humans/karmen-night.png',

	'./img/humans/icon-null.png',
	'./img/humans/icon-stay.png',
	'./img/humans/icon-follow.png',
	'./img/humans/icon-bow.png',
	'./img/humans/icon-axe.png',
	'./img/humans/icon-fence.png',
	'./img/humans/icon-none.png',
	'./img/humans/icon-message.png',
	'./img/humans/icon-exclam.png',
	'./img/humans/icon-noamo.png',
	'./img/humans/icon-plus.png',

	'./img/buttons/axe-button.png',
	'./img/buttons/axe-button-shadow.png',
	'./img/buttons/bow-button.png',
	'./img/buttons/bow-button-shadow.png',
	'./img/buttons/fence-button.png',
	'./img/buttons/fence-button-shadow.png',
	'./img/buttons/none-button.png',
	'./img/buttons/none-button-shadow.png',

	'./img/buttons/france-button.png',
	'./img/buttons/france-button-shadow.png',
	'./img/buttons/usa-button.png',
	'./img/buttons/usa-button-shadow.png',

	'./img/buttons/menu-button.png',
	'./img/buttons/menu-button-shadow.png',
	'./img/buttons/menu2-button.png',
	'./img/buttons/menu2-button-shadow.png',
	'./img/buttons/pause-button.png',
	'./img/buttons/pause-button-shadow.png'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('static').then(cache => {
			return cache
				.addAll(files)
				.then(() => self.skipWaiting())
				.catch(error => {
					console.error('Erreur de cache.');
				});
		})
	);
});

self.addEventListener('fetch', event => {
	let file = event.request.url.split('/');
	file = file[file.length - 1];
	event.respondWith(
		caches.match(event.request).then(res => {
			if (res) {
				// console.log(`used cache for ${file}`);
				return res;
			} else {
				// console.warn(`used fetch for ${file}`);
				return fetch(event.request).catch(err => {
					console.error(`fetch error for ${file}`);
				});
			}
		})
	);
});
