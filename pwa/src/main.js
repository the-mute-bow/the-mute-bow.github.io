if (location.host == 'the-mute-bow.github.io') location.replace('https://the-mute-bow.com');

let onAndroid = /Android/i.test(navigator.userAgent);

let lang = getCookie('lang');
if (!lang && onAndroid) alert('🇺🇸 This game uses cookies to save language preferences and progression in game.\n🇫🇷 Ce jeu utilise les cookies pour enregistrer les préférences de langue et la progression du jeu.');

if (!location.hash) {
	if (lang) {
		location.assign(lang);
	} else {
		setCookie('lang', '#en');
		location.reload(true);
	}
} else if (lang != location.hash) {
	setCookie('lang', location.hash);
	location.reload(true);
}

let allow_fullscreen = true;

if (lang == '#dev-nfs') {
	lang = '#dev';
	allow_fullscreen = false;
	console.log('disabled fullscreen');
}

window.isUpdateAvailable = new Promise(function (resolve, reject) {
	if ('serviceWorker' in navigator)
		navigator.serviceWorker
			.register('/sw.js', {
				scope: '/'
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
	if (isAvailable && confirm(lang == '#fr' ? "Mise à jour disponible ! Recharger l'application?" : 'Update available ! Refresh the app?')) location.reload();
});

let time = 0;
let oldtime = 0;
let dpi = 1;
let resise_time = 0;
let can = document.querySelector('canvas');
let over = document.getElementsByClassName('over')[0];
let dialog_div = document.getElementById('dialog');
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
			if (mode == 'dialog') over.classList.add('hidden');
			else over.classList.remove('hidden');
		}

		if (mode == 'dialog') {
			dialog_div.classList.remove('hidden');
			document.getElementById('dialog-img').src = `./img/humans/${data.character}-pp.png`;
			document.getElementById('dialog-title').innerHTML = data.character.charAt(0).toUpperCase() + data.character.slice(1);
			document.getElementById('dialog-text').innerHTML = data.text;
			document.getElementById('dialog-next').innerHTML = lang == '#fr' ? 'Suivant' : 'Next';
			document.getElementById('dialog-next').onclick = data.click;
		} else {
			dialog_div.classList.add('hidden');
		}

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

		if (mode == 'android')
			gif_text.innerHTML = lang == '#fr' ? 'Jeu disponible uniquement sur Android.<br/><a href="../">Revenir sur le site principal</a>' : 'Game only available on Android.<br/><a href="../">Go back to main website</a>';

		if (mode == 'error') {
			if (data) gif_text.innerHTML = data;
			else gif_text.innerHTML = lang == '#fr' ? 'Erreur.' : 'Error.';
			if (lang == '#dev') gif_text.innerHTML += `<br/>${dev_log}`;
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
		else if (!document.fullscreenElement && allow_fullscreen) setScreen('touch-screen');
		else if (!game.loop) setScreen('loading');
		else if (game.dialog) {
			setScreen('dialog', game.dialog);
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
			if (sound) game.soundtrack.play();
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
	// console.warn(`load ${page_name}`);
	if (game.soundtrack) game.soundtrack.pause();
	game.loop = false;
	setScreen('loading');
	pages[page_name](game);
};

window.onload = () => {
	if (onAndroid || lang == '#dev') {
		initTouch();
		loadPage('menu');
		mainloop();
	} else setScreen('android');
};
