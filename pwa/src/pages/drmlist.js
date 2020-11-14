pages['drmlist'] = game => {
	game.variant = '';

	game.images = [];
	game.sounds = {
		click: new Audio('./sounds/click.mp3')
	};

	game.soundtrack = game.sounds.menu;
	game.play_soundtrack = true;
	game.loadImg(['dreams.png', 'buttons/menu-button.png', 'buttons/menu-button-shadow.png', 'buttons/menu2-button.png', 'buttons/menu2-button-shadow.png', 'buttons/small-button.png', 'buttons/small-button-shadow.png'], () => {
		game.ground = game.images['dreams'];
		game.tree_calc = null;
		game.fog_map = null;

		game.can.height = game.ground.height;
		game.can.width = game.ground.width;
		game.bg_color = '#202124';
		game.speed = 1;

		treeList = [];

		game.entities = {
			buildings: [],
			trees: [],
			sheeps: [],
			humans: [],
			creatures: [],
			particles: []
		};

		game.player = null;

		game.dimension = 0;
		game.fog = false;

		game.rain = null;

		for (let coords of treeList) game.entities.trees.push(new Tree(coords, 0));

		game.cam = {
			x: 108,
			y: 40,
			h: 128,
			o: 1,
			targ_h: 100,
			default_h: 110,
			targ_o: 0,
			targ_speed: 400,
			target: { x: 108, y: 40 }
		};

		game.buttons = [
			new Button(
				'play',
				'menu-button',
				lang == '#fr' ? 'Jouer' : 'Play',
				btn => ({
					x: (can.width - btn.img.width * game.scale) / 2,
					y: can.height - (btn.img.height + 5) * game.scale
				}),
				btn => {
					game.events.push(
						new TimeEvent(200, event => {
							btn.kill(300);
						}),
						new TimeEvent(700, event => {
							loadPage('drm' + game.cursor);
						})
					);
				}
			),
			new Button(
				'prev',
				'small-button',
				'<',
				btn => ({
					x: (can.width - btn.img.width * game.scale) / 2 - 26 * game.scale,
					y: can.height - (btn.img.height + 5) * game.scale
				}),
				btn => {
					game.triggerEvent('drm' + (game.cursor - 1));
				}
			),
			new Button(
				'next',
				'small-button',
				'>',
				btn => ({
					x: (can.width - btn.img.width * game.scale) / 2 + 26 * game.scale,
					y: can.height - (btn.img.height + 5) * game.scale
				}),
				btn => {
					game.triggerEvent('drm' + (game.cursor + 1));
				}
			),
			new Button(
				'quit',
				'small-button',
				'<',
				btn => ({
					x: 5 * game.scale,
					y: 5 * game.scale
				}),
				btn => {
					game.events.push(
						new TimeEvent(200, event => {
							btn.kill(300);
						}),
						new TimeEvent(700, event => {
							loadPage('menu');
						})
					);
				}
			)
		];

		game.overlays = [
			new OverText(
				'title',
				overtext => '',
				overtext => ({
					x: can.width / 2,
					y: 16 * game.scale
				}),
				1800,
				12,
				'#cdcad3'
			),
			new OverText(
				'info',
				overtext => '',
				overtext => ({
					x: can.width / 2,
					y: can.height / 2
				}),
				1800,
				12
			)
		];

		game.events = [];

		game.cursor = 1;

		game.event_map = {
			drm1: () => {
				game.cam.target.x = 132;
				game.cursor = 1;
				game.getOverlay('title').getText = overtext => (lang == '#fr' ? 'Premier rêve: Rêve lucide.' : 'First dream: Lucid dream.');
				game.getButton('prev').mode = 'disabled';
				game.getButton('next').mode = 'normal';

				if (getCookie('dream') >= 1) {
					game.getOverlay('info').getText = overtext => '';
					game.getButton('play').mode = 'normal';
				} else {
					game.getOverlay('info').getText = overtext => (lang == '#fr' ? 'Termine le chapitre 2 pour débloquer.' : 'Complete Chapter 2 to unlock.');
					game.getButton('play').mode = 'disabled';
				}

				game.getOverlay('info').color = '#202124';

				if (game.getButton('?')) game.getButton('?').kill(300);
			},
			drm2: () => {
				game.cam.target.x = 132 + 192;
				game.cursor = 2;
				game.getOverlay('title').getText = overtext => (lang == '#fr' ? 'Deuxième rêve.' : 'Second dream.');
				game.getOverlay('info').getText = overtext => (lang == '#fr' ? 'Bientôt disponible.' : 'Coming soon');
				game.getButton('prev').mode = 'normal';
				// game.getButton('play').mode = lang == '#dev' ? 'normal' : 'disabled';
				game.getButton('play').mode = 'disabled';
				game.getButton('next').mode = 'disabled';

				game.getOverlay('info').color = '#cdcad3';

				game.buttons.push(
					new Button(
						'?',
						'small-button',
						'?',
						btn => ({
							x: (can.width - btn.img.width * game.scale) / 2,
							y: can.height / 2 + 10 * game.scale
						}),
						btn => {
							location.assign('https://the-mute-bow.com');
						}
					)
				);
			}
		};

		game.checkpoint = 0;

		if (getCookie('dream') == '0') game.triggerEvent('drm1');
		else game.triggerEvent('drm' + getCookie('dream'));

		game.loop = true;
	});
};
