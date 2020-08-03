let onAndroid = /Android/i.test(navigator.userAgent);
// let onAndroid = true;

let lang = getCookie('lang');
if (!lang && onAndroid) alert('🇫🇷 Ce jeu utilise les cookies pour enregistrer les préférences de langue et la progression du jeu.\n🇺🇸 This game uses cookies to save language preferences and progression in game.');

if (!location.hash) {
	if (lang) {
		location.assign(location.href + lang);
	} else {
		setCookie('lang', '#fr');
		location.reload(true);
	}
} else if (lang != location.hash) {
	setCookie('lang', location.hash);
	location.reload(true);
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
	if (isAvailable) {
		if (confirm(lang == '#fr' ? "Mise à jour disponible ! Recharger l'application?" : 'Update available ! Refresh the app?')) location.reload();
	}
});

let time = 0;
let oldtime = 0;
let dpi = window.devicePixelRatio;
let can = document.querySelector('canvas');
let over = document.getElementsByClassName('over')[0];
let gifs = [...document.querySelectorAll('img')];
let gif_text = document.querySelector('p');
let ctx = can.getContext('2d');
let mode = '';

let game = new Game();

const setScreen = newmode => {
	if (newmode != mode) {
		mode = newmode;
		// console.log('set mode to', mode);

		over.classList.remove('hidden');

		if (mode != 'touch-screen') over.onclick = null;

		if (mode == 'game') {
			over.classList.add('hidden');
			can.classList.remove('hidden');
		} else {
			over.classList.remove('hidden');
			can.classList.add('hidden');
		}

		for (let img of gifs) {
			if (img.id == mode) {
				img.classList.remove('hidden');
			} else img.classList.add('hidden');
		}

		if (mode == 'touch-screen') {
			gif_text.innerHTML = lang == '#fr' ? "Touche l'écran." : 'Touch the screen.';
			setTimeout(() => {
				over.onclick = () => {
					can.requestFullscreen().catch(error => {});
					// setTimeout(resize, 500);
				};
			}, 500);
		}

		if (mode == 'android') {
			gif_text.innerHTML = lang == '#fr' ? 'Jeu disponible uniquement sur Android.' : 'Game only available on Android.';
		}

		if (mode == 'loading') {
			gif_text.innerHTML = lang == '#fr' ? 'Chargement...' : 'Loading...';
		}

		if (mode == 'rotate-phone') {
			gif_text.innerHTML = lang == '#fr' ? "Tourne l'écran." : 'Turn the screen.';
		}
	}
};

addEventListener('resize', event => resize());

const resize = () => {
	can.width = innerWidth;
	can.height = innerHeight;

	if (document.fullscreenElement) {
		can.setAttribute('height', Math.floor(can.clientHeight * dpi));
		can.setAttribute('width', Math.floor(can.clientWidth * dpi));
	}

	game.scale = can.height / game.cam.h;
};

const mainloop = newtime => {
	let dtime = newtime - oldtime;
	oldtime = newtime;

	let sound = false;

	if (innerWidth < innerHeight) setScreen('rotate-phone');
	else if (!document.fullscreenElement) setScreen('touch-screen');
	else if (!game.loop) setScreen('loading');
	else {
		setScreen('game');
		resize();

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
};

const loadPage = page_name => {
	// console.warn(`load ${page_name}`);
	if (game.soundtrack) game.soundtrack.pause();
	game.loop = false;
	setScreen('loading');
	pages[page_name](game);
};

window.onload = () => {
	if (onAndroid) {
		initTouch();
		loadPage('chap2');
		mainloop();
	} else setScreen('android');
};
