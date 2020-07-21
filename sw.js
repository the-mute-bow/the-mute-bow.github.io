let version = '2.0.5';

let files = [
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
	'./img/ground1.png',
	'./img/buildings/small-house1.png',
	'./fonts/Pixelar.woff',
	'./fonts/Pixelar.woff2'
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
