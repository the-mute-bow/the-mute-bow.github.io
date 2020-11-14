let version = '1.2.1b';

let files = [
	'../404.html',
	'../cookie.js',
	'../fonts/Pixelar.woff',
	'../fonts/Pixelar.woff2',
	'../img/background-about-desk.png',
	'../img/background-about-mobile.png',
	'../img/background-about-strat-desk.png',
	'../img/background-about-strat-mobile.png',
	'../img/background-about.png',
	'../img/background-top-desk.png',
	'../img/background-top-mobile.png',
	'../img/banner_1024x500.png',
	'../img/banner_base.png',
	'../img/chap1-desk.png',
	'../img/chap1-mobile.png',
	'../img/eliot-hover.png',
	'../img/eliot-out.png',
	'../img/icon-base.png',
	'../img/icon1024.png',
	'../img/icon512.png',
	'../img/lea-hover.png',
	'../img/lea-out.png',
	'../img/Meh.png',
	'../img/piet-hover.png',
	'../img/piet-out.png',
	'../img/QR.png',
	'../img/shabyn-hover.png',
	'../img/shabyn-out.png',
	'../img/sheep1-hover.png',
	'../img/sheep2-hover.png',
	'../img/sheep3-hover.png',
	'../index.html',
	'../licence.html',
	'../main.js',
	'../pwa/img/arrow-bonus.png',
	'../pwa/img/buildings/small-house1-night.png',
	'../pwa/img/buildings/small-house1-shadow.png',
	'../pwa/img/buildings/small-house1.png',
	'../pwa/img/buttons/axe-button-shadow.png',
	'../pwa/img/buttons/axe-button.png',
	'../pwa/img/buttons/bow-button-shadow.png',
	'../pwa/img/buttons/bow-button.png',
	'../pwa/img/buttons/buy-button-shadow.png',
	'../pwa/img/buttons/buy-button.png',
	'../pwa/img/buttons/donate-button.png',
	'../pwa/img/buttons/fence-button-shadow.png',
	'../pwa/img/buttons/fence-button.png',
	'../pwa/img/buttons/france-button-shadow.png',
	'../pwa/img/buttons/france-button.png',
	'../pwa/img/buttons/google-button-shadow.png',
	'../pwa/img/buttons/google-button.png',
	'../pwa/img/buttons/menu-button-shadow.png',
	'../pwa/img/buttons/menu-button.png',
	'../pwa/img/buttons/menu2-button-shadow.png',
	'../pwa/img/buttons/menu2-button.png',
	'../pwa/img/buttons/mission-button-shadow.png',
	'../pwa/img/buttons/mission-button.png',
	'../pwa/img/buttons/none-button-shadow.png',
	'../pwa/img/buttons/none-button.png',
	'../pwa/img/buttons/pause-button-shadow.png',
	'../pwa/img/buttons/pause-button.png',
	'../pwa/img/buttons/small-button-shadow.png',
	'../pwa/img/buttons/small-button.png',
	'../pwa/img/buttons/usa-button-shadow.png',
	'../pwa/img/buttons/usa-button.png',
	'../pwa/img/chapters-base.png',
	'../pwa/img/chapters.png',
	'../pwa/img/coin.png',
	'../pwa/img/gifs/android.gif',
	'../pwa/img/gifs/cookie.gif',
	'../pwa/img/gifs/error.gif',
	'../pwa/img/gifs/loading-old.gif',
	'../pwa/img/gifs/loading.gif',
	'../pwa/img/gifs/rotate-phone.gif',
	'../pwa/img/gifs/stop-sign.gif',
	'../pwa/img/gifs/touch-screen.gif',
	'../pwa/img/gifs/update-done.gif',
	'../pwa/img/gifs/update-ready.gif',
	'../pwa/img/ground1-night.png',
	'../pwa/img/ground1.png',
	'../pwa/img/humans/creature-light.png',
	'../pwa/img/humans/creature.png',
	'../pwa/img/humans/eliot-night.png',
	'../pwa/img/humans/eliot-pp.png',
	'../pwa/img/humans/eliot.png',
	'../pwa/img/humans/human-shadow.png',
	'../pwa/img/humans/icon-axe.png',
	'../pwa/img/humans/icon-bow.png',
	'../pwa/img/humans/icon-exclam.png',
	'../pwa/img/humans/icon-fence.png',
	'../pwa/img/humans/icon-follow.png',
	'../pwa/img/humans/icon-mana0.png',
	'../pwa/img/humans/icon-mana1.png',
	'../pwa/img/humans/icon-mana2.png',
	'../pwa/img/humans/icon-mana3.png',
	'../pwa/img/humans/icon-mana4.png',
	'../pwa/img/humans/icon-message.png',
	'../pwa/img/humans/icon-noamo.png',
	'../pwa/img/humans/icon-none.png',
	'../pwa/img/humans/icon-null.png',
	'../pwa/img/humans/icon-plus.png',
	'../pwa/img/humans/icon-stamina-green.png',
	'../pwa/img/humans/icon-stamina-red.png',
	'../pwa/img/humans/icon-stamina-use.png',
	'../pwa/img/humans/icon-stay.png',
	'../pwa/img/humans/lea-night.png',
	'../pwa/img/humans/lea-pp.png',
	'../pwa/img/humans/lea.png',
	'../pwa/img/humans/mouton-pp.png',
	'../pwa/img/humans/piet-night.png',
	'../pwa/img/humans/piet-pp.png',
	'../pwa/img/humans/piet.png',
	'../pwa/img/humans/shabyn-night.png',
	'../pwa/img/humans/shabyn-pp.png',
	'../pwa/img/humans/shabyn.png',
	'../pwa/img/humans/sheep-pp.png',
	'../pwa/img/icon/icon1024.png',
	'../pwa/img/icon/icon192.png',
	'../pwa/img/icon/icon512.png',
	'../pwa/img/icon/iconBase.png',
	'../pwa/img/icon/iconBase1024.png',
	'../pwa/img/icon/maskable_icon.png',
	'../pwa/img/icon/maskable_icon512.png',
	'../pwa/img/icon/title-square.png',
	'../pwa/img/missions/axe1.gif',
	'../pwa/img/missions/axe2.gif',
	'../pwa/img/missions/chp2.gif',
	'../pwa/img/missions/fence.gif',
	'../pwa/img/missions/follow.gif',
	'../pwa/img/missions/mana.gif',
	'../pwa/img/missions/move.gif',
	'../pwa/img/missions/run.gif',
	'../pwa/img/missions/sheep.gif',
	'../pwa/img/missions/shoot.gif',
	'../pwa/img/missions/strat.gif',
	'../pwa/img/missions/the-mute-bow.gif',
	'../pwa/img/missions/tv-snow.gif',
	'../pwa/img/mobs/sheep-shadow.png',
	'../pwa/img/mobs/sheep.png',
	'../pwa/img/qr-code-white.png',
	'../pwa/img/title.png',
	'../pwa/img/trees/pine1-night.png',
	'../pwa/img/trees/pine1-shadow-night.png',
	'../pwa/img/trees/pine1-shadow.png',
	'../pwa/img/trees/pine1.png',
	'../pwa/img/trees/pine2-night.png',
	'../pwa/img/trees/pine2-shadow-night.png',
	'../pwa/img/trees/pine2-shadow.png',
	'../pwa/img/trees/pine2.png',
	'../pwa/img/trees/pine3-night.png',
	'../pwa/img/trees/pine3-shadow-night.png',
	'../pwa/img/trees/pine3-shadow.png',
	'../pwa/img/trees/pine3.png',
	'../pwa/img/trees/pine4-night.png',
	'../pwa/img/trees/pine4-shadow-night.png',
	'../pwa/img/trees/pine4-shadow.png',
	'../pwa/img/trees/pine4.png',
	'../pwa/img/trees/tree-calc-night.png',
	'../pwa/img/trees/tree-calc.png',
	'../pwa/img/weapons/axe-hit.png',
	'../pwa/img/weapons/axe-hold.png',
	'../pwa/img/weapons/bow-aim.png',
	'../pwa/img/weapons/bow-hold.png',
	'../pwa/img/weapons/fence-night.png',
	'../pwa/img/weapons/fence-red.png',
	'../pwa/img/weapons/fence-shadow.png',
	'../pwa/img/weapons/fence.png',
	'../pwa/index.html',
	'../pwa/sounds/Art Of Silence.mp3',
	'../pwa/sounds/click.mp3',
	'../pwa/sounds/dark-ambience.mp3',
	'../pwa/sounds/night-ambience.mp3',
	'../pwa/sounds/rain-piano.mp3',
	'../pwa/sounds/tense-ambience.mp3',
	'../pwa/src/button.js',
	'../pwa/src/entity.js',
	'../pwa/src/event.js',
	'../pwa/src/game.js',
	'../pwa/src/main.js',
	'../pwa/src/overlay.js',
	'../pwa/src/pages/chp1.js',
	'../pwa/src/pages/chp2.js',
	'../pwa/src/pages/chplist.js',
	'../pwa/src/pages/menu.js',
	'../pwa/src/pages/test.js',
	'../pwa/src/touch.js',
	'../pwa/styles/style.css',
	'../styles/style.css'
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
				console.log(`used cache for ${file}`);
				return res;
			} else {
				console.warn(`used fetch for ${file}`);
				return fetch(event.request).catch(err => {
					console.error(`fetch error for ${file}`);
				});
			}
		})
	);
});
