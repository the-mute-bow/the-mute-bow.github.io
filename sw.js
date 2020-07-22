let version = '2.0.6';

let files = [
	// system
	'./',
	'./index.html',
	'./styles/style.css',
	'./src/cookie.js',
	'./src/game.js',
	'./src/pages/menu.js',
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
	'./img/ground1.png',
	'./img/buildings/small-house1.png',
	'./img/buildings/small-house1-shadow.png',
	'./img/trees/pine1.png',
	'./img/trees/pine1-shadow.png',
	'./img/trees/pine2.png',
	'./img/trees/pine2-shadow.png',
	'./img/trees/pine3.png',
	'./img/trees/pine3-shadow.png',
	'./img/trees/pine4.png',
	'./img/trees/pine4-shadow.png',
	'./img/trees/tree-calc.png',
	'./img/humans/human-shadow.png',
	'./img/humans/eliot.png',
	'./img/humans/lea.png',
	'./img/humans/scott.png',
	'./img/humans/karmen.png'
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
