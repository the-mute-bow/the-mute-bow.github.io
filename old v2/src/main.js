if (location.host == 'the-mute-bow.github.io') location.replace('https://the-mute-bow.com');

let onAndroid = /Android/i.test(navigator.userAgent);

let version = '1.2.1b';
document.getElementById('version').innerHTML = version;

let lang = getCookie('lang-pwa');

if (lang) {
	if (!location.hash) {
		location.replace(lang);
		location.reload();
	}

	if (lang != location.hash) {
		setCookie('lang-pwa', location.hash);
		location.reload();
	}
} else if (location.hash) lang = location.hash;
else if (getCookie('lang')) {
	location.replace(getCookie('lang'));
	location.reload();
}

let onUpdate = false;

let allow_fullscreen = true;

let options = lang.split('-');
lang = options[0];
console.log(options, lang);

if (options.includes('nfs')) {
	allow_fullscreen = false;
	console.log('disabled fullscreen');
}

if (!getCookie('chapter')) setCookie('chapter', 1);
if (!getCookie('dream')) setCookie('dream', 0);

window.isUpdateAvailable = new Promise(function (resolve, reject) {
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

let time = 0;
let oldtime = 0;
let dpi = 1;
let resise_time = 0;
let can = document.querySelector('canvas');
let over = document.getElementsByClassName('over')[0];
let dialog_div = document.getElementById('dialog');
let mission_div = document.getElementById('mission');
let mission_content_div = document.getElementById('mission-content');
let gifs = [...document.getElementsByClassName('gif')];
let gif_text = document.getElementById('message');
let load_bar = {
	back: document.getElementById('load-bar-back'),
	front: document.getElementById('load-bar-front')
};
let ctx = can.getContext('2d');
let mode = '';

let dev_log = '';

let game = new Game();

const setScreen = (newmode, data) => {
	if (newmode != mode || data) {
		mode = newmode;
		// console.log('set mode to', mode);

		over.classList.remove('hidden');

		if (mode != 'touch-screen') over.onclick = null;

		if (mode == 'game') {
			over.classList.add('hidden');
			can.classList.remove('hidden');
		} else {
			can.classList.add('hidden');
			if (mode == 'dialog' || mode == 'mission') over.classList.add('hidden');
			else over.classList.remove('hidden');
		}

		if (mode == 'dialog') {
			dialog_div.classList.remove('hidden');
			document.getElementById('dialog-img').src = `./img/humans/${data.character}-pp.png`;
			document.getElementById('dialog-title').innerHTML = data.character.charAt(0).toUpperCase() + data.character.slice(1);
			document.getElementById('dialog-text').innerHTML = data.text;
			document.getElementById('dialog-next').innerHTML = lang == '#fr' ? 'Suivant' : 'Next';
			document.getElementById('dialog-next').onclick = data.click;
		} else dialog_div.classList.add('hidden');

		if (mode == 'mission' && data) {
			mission_div.classList.remove('hidden');
			mission_content_div.innerHTML = '';
			if ('img' in data) {
				mission_content_div.innerHTML += `
					<img class="pixelated" src="./img/missions/tv-snow.gif" id="mission-snow"/>
					<img class="hidden ${data.pixelated ? 'pixelated' : ''}" src="${data.img}" id="mission-img"/>
				`;

				document.querySelector('#mission-img').addEventListener('load', event => {
					document.querySelector('#mission-snow').classList.add('hidden');
					document.querySelector('#mission-img').classList.remove('hidden');
				});
			}
			if ('text' in data) mission_content_div.innerHTML += `<p class="text">${data.text}</p>`;
			let next = document.getElementById('mission-next');
			next.innerHTML = lang == '#fr' ? 'Suivant' : 'Next';
			next.onclick = event => data.click(data);
		} else mission_div.classList.add('hidden');

		for (let img of gifs) {
			if (img.id == mode) {
				img.classList.remove('hidden');
			} else img.classList.add('hidden');
		}

		if (mode == 'touch-screen') {
			gif_text.innerHTML = lang == '#fr' ? "Touche l'écran." : 'Touch the screen.';
			setTimeout(() => {
				over.onclick = () => can.requestFullscreen().catch(error => {});
			}, 500);
		}

		if (mode == 'android') gif_text.innerHTML = lang == '#fr' ? 'Jeu disponible uniquement sur Android.<br/><a href="../">Revenir au site principal</a>' : 'Game only available on Android.<br/><a href="../">Go back to main website</a>';

		if (mode == 'stop-sign')
			gif_text.innerHTML =
				lang == '#fr'
					? '<span class="red">Bloqueur de pubs détecté.</span><br/>Les pubs permettent de financer le développement du jeu. Désactiver le bloqueur de pubs nous aiderait grandement.<br/><a class="red" href="./" onclick="setCookie(`ads`, 1)">Ignorer</a>'
					: '<span class="red">Ad blocker detected.</span><br/>Ads are used to fund the development of the game. Turning off the ad blocker would help us a lot.<br/><a class="red" href="./" onclick="setCookie(`ads`, 1)">Ignore</a>';

		if (mode == 'error') {
			if (data) gif_text.innerHTML = data;
			else gif_text.innerHTML = lang == '#fr' ? 'Erreur.' : 'Error.';
			if (lang == '#dev') gif_text.innerHTML += `<br/>${dev_log}`;
			gif_text.innerHTML += lang == '#fr' ? `<br/><a href="./">Rafraîchir</a>` : `<br/><a href="./">Reload</a>`;
			gif_text.classList.add('red');
		}

		if (mode == 'loading') {
			if (lang == '#dev' && data) gif_text.innerHTML = data;
			else gif_text.innerHTML = lang == '#fr' ? 'Chargement...' : 'Loading...';
			load_bar.front.classList.remove('hidden');
			load_bar.back.classList.remove('hidden');
		} else {
			load_bar.front.classList.add('hidden');
			load_bar.back.classList.add('hidden');
		}

		if (mode == 'rotate-phone') gif_text.innerHTML = lang == '#fr' ? "Tourne l'écran." : 'Turn the screen.';

		if (mode == 'cookie')
			gif_text.innerHTML =
				lang == '#fr'
					? 'Ce jeu utilise les <span class="cookies">cookies</span> pour enregistrer les préférences de langue et la progression du jeu.<br/><br/><a href="./" onclick="setCookie(`lang-pwa`, `#fr`);">Accepter</a>'
					: 'This game uses <span class="coockie">cookies</span> to save language preferences and progression in game.<br/><br/><a href="./" onclick="setCookie(`lang-pwa`, `#en`);">Accept</a>';

		if (mode == 'update-ready')
			gif_text.innerHTML =
				lang == '#fr'
					? 'Nouvelle mise à jour disponible !<br/><br/><a onclick="onUpdate = false; setScreen(`game`);">Ignorer</a> | <a href="./">Actualiser</a>'
					: 'New update available !<br/><br/><a onclick="onUpdate = false; setScreen(`game`);">Ignore</a> | <a href="./">Reload</a>';

		if (mode == 'update-done')
			gif_text.innerHTML =
				lang == '#fr'
					? `Bienvenue en <a>${version}</a> !<br/><br/><a href="./" onclick="setCookie('version', version);">Continuer</a>`
					: `Welcome in <a>${version}</a> !<br/><br/><a href="./" onclick="setCookie('version', version);">Continue</a>`;
	}
};

const resize = () => {
	dpi = allow_fullscreen ? window.devicePixelRatio : 1;
	can.width = innerWidth;
	can.height = innerHeight;

	if (document.fullscreenElement) {
		can.setAttribute('height', Math.floor(can.clientHeight * dpi));
		can.setAttribute('width', Math.floor(can.clientWidth * dpi));
	}
};

addEventListener('resize', event => resize());

const mainloop = newtime => {
	try {
		if (mode == 'error') return;

		let dtime = Math.min(newtime - oldtime, 100);
		oldtime = newtime;

		let sound = false;

		if (innerWidth < innerHeight) setScreen('rotate-phone');
		else if (onUpdate) setScreen('update-ready');
		else if (!document.fullscreenElement && allow_fullscreen) setScreen('touch-screen');
		else if (!game.loop) setScreen('loading');
		else if (game.dialog) {
			setScreen('dialog', game.dialog);
			sound = true;
		} else if (mode == 'mission' || mode == 'update-ready') {
			sound = true;
		} else {
			setScreen('game');

			if (time - resise_time >= 100) {
				resise_time = time;
				resize();
			}
			game.scale = can.height / game.cam.h;

			sound = true;
			time += game.speed * dtime;
			game.tick(dtime);
			game.graphics(dtime);
		}

		if (game.soundtrack) {
			if (sound && game.play_soundtrack) game.soundtrack.play();
			else game.soundtrack.pause();
		}

		requestAnimationFrame(mainloop);
	} catch (error) {
		dev_log = error;
		setScreen('error', lang == '#fr' ? 'Erreur interne.' : 'Internal error.');
		console.error(error);
	}
};

const loadPage = page_name => {
	game.play_soundtrack = false;
	if (game.soundtrack) game.soundtrack.pause();
	game.loop = false;
	setScreen('loading');
	pages[page_name](game);
};

window.onload = () => {
	if (onAndroid) {
		if (!getCookie('lang-pwa')) setScreen('cookie');
		else if (!getCookie('ads') && !ads) setScreen('stop-sign');
		else if (getCookie('version') != version) setScreen('update-done');
		else {
			if (!getCookie('coins')) setCookie('coins', 0);

			initTouch();
			loadPage(lang == '#dev' ? 'drm1' : 'menu');
			mainloop();
		}
	} else setScreen('android');
};
