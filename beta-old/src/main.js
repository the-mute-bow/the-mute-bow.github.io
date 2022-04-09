// Game version
let version = 'b3.0.8';
for (let elem of document.querySelectorAll('.version')) elem.innerHTML = version;
var beta = location.pathname.includes('beta');

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
initCookie('#wind', 'yes');
initCookie('#fullscreen', 'yes');
initCookie('#light_quality', 'high');

// Langage
const fr = getCookie('#lang') == 'fr';

// Translation
const translate = _ => {
	for (let elem of document.querySelectorAll('.translate')) {
		elem.classList.remove('translate');
		let html = elem.innerHTML.split('|');
		elem.innerHTML = html[html.length < 2 || fr ? 0 : 1];
	}
};

const between = (a, b, c) => Math.min(Math.max(a, b), c);

// Get service worker update
let update_ready = false;
window.isUpdateAvailable = new Promise((resolve, reject) => {
	if ('serviceWorker' in navigator)
		navigator.serviceWorker
			.register('./service-worker.js', {
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

// blank section element
let blank = document.querySelector('section#blank');

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
	mge.forceFullscreen = false;
	mge.forceLandscape = false;

	// If not running on Android device
	if (!urlParams.has('android') && !/Android/i.test(navigator.userAgent) && urlParams.get('scene') != 'wallpaper') mge.setOverlay('compatibility');
	// If lang not set
	else if (!getCookie('#lang')) {
		mge.setOverlay('menu');
		showLangBtns();
		mge.resize();
	}
	// If cookies not allowed
	else if (!getCookie('allow-cookies')) mge.setOverlay('cookies');
	// If an update was done
	else if (getCookie('version') != version) mge.setOverlay('update-done');
	// Start
	else {
		// Media metadata
		navigator.mediaSession.metadata = new MediaMetadata({
			title: 'The Mute Bow',
			artist: 'Nicolas Gouwy',
			artwork: [{ src: './img/icon/icon512.png', sizes: '512x512', type: 'image/png' }]
		});

		// Dev sign
		if (beta) document.querySelector('section#loading span#dev-sign').classList.remove('mge-hidden');

		// Landscpe
		mge.forceLandscape = true;

		// Fullscreen
		mge.getFullscreen = _ => outerHeight > 0.98 * screen.height;
		mge.forceFullscreen = getCookie('#fullscreen') == 'yes';

		// Call resize on overlay change
		mge.onOverlayChange = _ => setTimeout(_ => mge.resize(), 10);

		// Game logic call
		mge.logic = () => {
			if (mge.overlayID == 'blank') {
				try {
					// If an update is ready
					if (update_ready) mge.setOverlay('update-ready');
					// Game goes on
					else game.logic();
				} catch (error) {
					// Logic error
					showError(error, 'Erreur de logique.|Logic error.');
				}
			}
		};

		// Game graphics call
		mge.graphics = () => {
			// mge.forceLandscape = false;

			// Game
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
	}
};
