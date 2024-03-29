const version = 'b3.0.0';
const log = false;

const files = [CACHE_FILES];

self.addEventListener('install', event =>
	event.waitUntil(
		caches.open('static').then(cache =>
			cache
				.addAll(files)
				.then(() => self.skipWaiting())
				.catch(error => console.error('Erreur de cache.', error))
		)
	)
);

self.addEventListener('fetch', event => {
	let file = event.request.url.split('/');
	file = file[file.length - 1];

	event.respondWith(
		caches.match(event.request).then(res => {
			if (log) console.warn(`used ${res ? 'cache' : 'fetch'} for ${file}`);
			return res ? res : fetch(event.request).catch(err => console.error(`fetch error for ${file}`));
		})
	);
});
