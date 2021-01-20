// Redirect to custom domain
if (location.host == 'the-mute-bow.github.io') location.replace('https://the-mute-bow.com');

// Game version
let version = 'b3.0.5';
for (let elem of document.querySelectorAll('.version')) elem.innerHTML = version;

// Show load screen
mge.setOverlay('loading');

// URL variables
const urlParams = new URLSearchParams(location.search);

// Scene loading
const loadScene = scene => {
	if (scene) urlParams.set('scene', scene);

	let params = [];
	urlParams.forEach((v, k) => params.push(v ? k + '=' + v : k));

	location.replace('?' + params.join('&'));
};

// Init URL variables
if (!urlParams.has('scene')) loadScene('test');

// Init cookies
if (!getCookie('lang')) setCookie('lang', 'en');

// Translation
const translate = _ => {
	for (let elem of document.querySelectorAll('.translate')) {
		elem.classList.remove('translate');
		let html = elem.innerHTML.split('|');
		elem.innerHTML = html[html.length < 2 || getCookie('lang') == 'fr' ? 0 : 1];
	}
};

const between = (a, b, c) => Math.min(Math.max(a, b), c);

// Get service worker update
let update_ready = false;
window.isUpdateAvailable = new Promise((resolve, reject) => {
	if ('serviceWorker' in navigator)
		navigator.serviceWorker
			.register('./sw.js', {
				scope: './'
			})
			.then(reg => {
				reg.onupdatefound = () => {
					const installingWorker = reg.installing;
					installingWorker.onstatechange = () => {
						if (installingWorker.state == 'installed') {
							if (navigator.serviceWorker.controller) resolve(true);
							else resolve(false);
						}
					};
				};
			});
}).then(isAvailable => {
	if (isAvailable) onUpdate = true;
});

// Loading bar element
let load_bar = {
	back: document.querySelector('#load-bar-back'),
	front: document.querySelector('#load-bar-front')
};

// Error screen
const showError = (error, message, trans = true) => {
	console.error(error);
	let elem = document.querySelector('#error .message');
	elem.innerHTML = message ? message : error;

	if (trans) {
		elem.classList.add('translate');
		translate();
	}

	mge.setOverlay('error');
};

// To add a js script in body
const addScript = src => {
	let script = document.createElement('script');
	script.src = src;

	let mess = src + ` <span class="translate">n'existe pas.|does not exist.</span><br /><a class="translate" onclick="loadScene('test')">Retour|Back</a>`;
	script.addEventListener('error', error => {
		showError(src + ' does not exist.', mess, false);
		translate();
	});

	document.body.appendChild(script);
};

onload = () => {
	translate();

	// If not running on Android device
	if (urlParams.has('android') || /Android/i.test(navigator.userAgent)) {
		// Media metadata
		navigator.mediaSession.metadata = new MediaMetadata({
			title: 'The Mute Bow',
			artist: 'Nicolas Gouwy',
			artwork: [{ src: './img/icon/icon512.png', sizes: '512x512', type: 'image/png' }]
		});

		mge.getFullscreen = _ => outerHeight > 0.98 * screen.height;

		// Game logic call
		mge.logic = () => {
			if (mge.overlayID == 'blank') {
				try {
					// If cookies not allowed
					if (!getCookie('allow-cookies')) mge.setOverlay('cookies');
					// If an update is ready
					else if (update_ready) mge.setOverlay('update-ready');
					// If an update was done
					else if (getCookie('version') != version) mge.setOverlay('update-done');
					// Game goes on
					else {
						game.logic();
					}
				} catch (error) {
					// Logic error
					showError(error, 'Erreur de logique.|Logic error.');
				}
			}
		};

		// Game graphics call
		mge.graphics = () => {
			if (mge.overlayID == 'blank') {
				try {
					game.graphics();
				} catch (error) {
					// Graphics error
					showError(error, 'Erreur de graphismes.|Graphics error.');
				}
			}
		};

		// Loading vegetation script
		addScript(`./vegetations/${urlParams.get('scene')}_vegetation.js`);
	} else {
		mge.forceFullscreen = false;
		mge.setOverlay('compatibility');
	}
};
