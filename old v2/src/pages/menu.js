pages['menu'] = game => {
	game.title = 'menu';
	game.variant = '-night';

	game.images = [];
	game.sounds = {
		click: new Audio('./sounds/click.mp3'),
		menu: new Audio('./sounds/Art Of Silence.mp3')
	};

	game.checkpoint = 0;

	game.soundtrack = game.sounds.menu;
	game.play_soundtrack = true;
	game.loadImg(
		[
			'title.png',
			'ground1-night.png',

			'buttons/menu-button.png',
			'buttons/menu-button-shadow.png',
			'buttons/menu2-button.png',
			'buttons/menu2-button-shadow.png',
			'buttons/small-button.png',
			'buttons/small-button-shadow.png',

			'buttons/france-button.png',
			'buttons/france-button-shadow.png',
			'buttons/usa-button.png',
			'buttons/usa-button-shadow.png',

			'buildings/small-house1-night.png',
			'buildings/small-house1-shadow.png',

			'humans/human-shadow.png',
			'humans/shabyn-night.png',
			'humans/creature.png',

			'trees/pine1-night.png',
			'trees/pine1-shadow-night.png',
			'trees/pine2-night.png',
			'trees/pine2-shadow-night.png',
			'trees/pine3-night.png',
			'trees/pine3-shadow-night.png',
			'trees/pine4-night.png',
			'trees/pine4-shadow-night.png',
			'trees/tree-calc-night.png'
		],
		() => {
			game.ground = game.images['ground1' + game.variant];
			game.tree_calc = game.images['tree-calc' + game.variant];
			game.fog_map = null;
			game.rain = null;

			game.can.height = game.ground.height;
			game.can.width = game.ground.width;
			game.bg_color = '#293d48';
			game.speed = 1;

			let treeList = [
				{ x: 131, y: 19, z: 0 },
				{ x: 339, y: 20, z: 0 },
				{ x: 183, y: 23, z: 0 },
				{ x: 153, y: 669, z: 0 },
				{ x: 278, y: 23, z: 0 },
				{ x: 473, y: 24, z: 0 },
				{ x: 66, y: 31, z: 0 },
				{ x: 231, y: 31, z: 0 },
				{ x: 404, y: 33, z: 0 },
				{ x: 443, y: 41, z: 0 },
				{ x: 9, y: 45, z: 0 },
				{ x: 92, y: 52, z: 0 },
				{ x: 307, y: 54, z: 0 },
				{ x: 160, y: 55, z: 0 },
				{ x: 489, y: 58, z: 0 },
				{ x: 361, y: 59, z: 0 },
				{ x: 247, y: 64, z: 0 },
				{ x: 124, y: 69, z: 0 },
				{ x: 54, y: 73, z: 0 },
				{ x: 201, y: 73, z: 0 },
				{ x: 461, y: 77, z: 0 },
				{ x: 400, y: 83, z: 0 },
				{ x: 280, y: 90, z: 0 },
				{ x: 329, y: 91, z: 0 },
				{ x: 18, y: 97, z: 0 },
				{ x: 80, y: 97, z: 0 },
				{ x: 499, y: 106, z: 0 },
				{ x: 448, y: 112, z: 0 },
				{ x: 178, y: 114, z: 0 },
				{ x: 374, y: 117, z: 0 },
				{ x: 139, y: 125, z: 0 },
				{ x: 52, y: 130, z: 0 },
				{ x: 101, y: 135, z: 0 },
				{ x: 418, y: 137, z: 0 },
				{ x: 480, y: 147, z: 0 },
				{ x: 13, y: 157, z: 0 },
				{ x: 74, y: 161, z: 0 },
				{ x: 112, y: 172, z: 0 },
				{ x: 453, y: 190, z: 0 },
				{ x: 509, y: 193, z: 0 },
				{ x: 43, y: 197, z: 0 },
				{ x: 93, y: 203, z: 0 },
				{ x: 404, y: 218, z: 0 },
				{ x: 1, y: 224, z: 0 },
				{ x: 482, y: 234, z: 0 },
				{ x: 125, y: 241, z: 0 },
				{ x: 74, y: 243, z: 0 },
				{ x: 37, y: 250, z: 0 },
				{ x: 446, y: 271, z: 0 },
				{ x: 511, y: 276, z: 0 },
				{ x: 101, y: 295, z: 0 },
				{ x: 50, y: 300, z: 0 },
				{ x: 418, y: 308, z: 0 },
				{ x: 483, y: 310, z: 0 },
				{ x: 131, y: 321, z: 0 },
				{ x: 453, y: 323, z: 0 },
				{ x: 220, y: 325, z: 0 },
				{ x: 10, y: 328, z: 0 },
				{ x: 87, y: 335, z: 0 },
				{ x: 507, y: 335, z: 0 },
				{ x: 169, y: 336, z: 0 },
				{ x: 262, y: 340, z: 0 },
				{ x: 383, y: 347, z: 0 },
				{ x: 478, y: 359, z: 0 },
				{ x: 49, y: 360, z: 0 },
				{ x: 127, y: 368, z: 0 },
				{ x: 188, y: 376, z: 0 },
				{ x: 424, y: 394, z: 0 },
				{ x: 294, y: 395, z: 0 },
				{ x: 10, y: 397, z: 0 },
				{ x: 58, y: 401, z: 0 },
				{ x: 100, y: 401, z: 0 },
				{ x: 238, y: 402, z: 0 },
				{ x: 490, y: 410, z: 0 },
				{ x: 143, y: 412, z: 0 },
				{ x: 287, y: 423, z: 0 },
				{ x: 214, y: 429, z: 0 },
				{ x: 70, y: 437, z: 0 },
				{ x: 165, y: 442, z: 0 },
				{ x: 459, y: 442, z: 0 },
				{ x: 112, y: 443, z: 0 },
				{ x: 18, y: 448, z: 0 },
				{ x: 264, y: 449, z: 0 },
				{ x: 396, y: 452, z: 0 },
				{ x: 510, y: 463, z: 0 },
				{ x: 52, y: 478, z: 0 },
				{ x: 373, y: 479, z: 0 },
				{ x: 199, y: 484, z: 0 },
				{ x: 149, y: 485, z: 0 },
				{ x: 437, y: 485, z: 0 },
				{ x: 103, y: 487, z: 0 },
				{ x: 1, y: 495, z: 0 },
				{ x: 248, y: 496, z: 0 },
				{ x: 486, y: 503, z: 0 },
				{ x: 35, y: 521, z: 0 },
				{ x: 79, y: 523, z: 0 },
				{ x: 400, y: 528, z: 0 },
				{ x: 168, y: 530, z: 0 },
				{ x: 273, y: 530, z: 0 },
				{ x: 120, y: 534, z: 0 },
				{ x: 229, y: 554, z: 0 },
				{ x: 56, y: 559, z: 0 },
				{ x: 451, y: 561, z: 0 },
				{ x: 495, y: 561, z: 0 },
				{ x: 95, y: 563, z: 0 },
				{ x: 192, y: 565, z: 0 },
				{ x: 18, y: 566, z: 0 },
				{ x: 156, y: 573, z: 0 },
				{ x: 366, y: 581, z: 0 },
				{ x: 419, y: 590, z: 0 },
				{ x: 129, y: 595, z: 0 },
				{ x: 38, y: 597, z: 0 },
				{ x: 1, y: 605, z: 0 },
				{ x: 69, y: 609, z: 0 },
				{ x: 466, y: 615, z: 0 },
				{ x: 107, y: 624, z: 0 },
				{ x: 382, y: 627, z: 0 },
				{ x: 511, y: 631, z: 0 },
				{ x: 21, y: 637, z: 0 },
				{ x: 334, y: 639, z: 0 },
				{ x: 54, y: 647, z: 0 },
				{ x: 291, y: 654, z: 0 },
				{ x: 429, y: 654, z: 0 },
				{ x: 386, y: 668, z: 0 },
				{ x: 476, y: 671, z: 0 },
				{ x: 477, y: 671, z: 0 },
				{ x: 1, y: 673, z: 0 },
				{ x: 84, y: 674, z: 0 },
				{ x: 254, y: 679, z: 0 },
				{ x: 43, y: 688, z: 0 },
				{ x: 311, y: 689, z: 0 },
				{ x: 349, y: 698, z: 0 },
				{ x: 122, y: 701, z: 0 },
				{ x: 215, y: 701, z: 0 },
				{ x: 177, y: 703, z: 0 },
				{ x: 418, y: 705, z: 0 },
				{ x: 508, y: 713, z: 0 },
				{ x: 76, y: 714, z: 0 },
				{ x: 279, y: 715, z: 0 },
				{ x: 462, y: 716, z: 0 },
				{ x: 463, y: 716, z: 0 },
				{ x: 382, y: 719, z: 0 },
				{ x: 21, y: 721, z: 0 },
				{ x: 242, y: 727, z: 0 },
				{ x: 149, y: 732, z: 0 },
				{ x: 330, y: 733, z: 0 },
				{ x: 100, y: 741, z: 0 },
				{ x: 50, y: 751, z: 0 },
				{ x: 12, y: 757, z: 0 },
				{ x: 308, y: 759, z: 0 },
				{ x: 440, y: 759, z: 0 },
				{ x: 221, y: 761, z: 0 },
				{ x: 268, y: 761, z: 0 },
				{ x: 269, y: 761, z: 0 },
				{ x: 181, y: 762, z: 0 },
				{ x: 401, y: 762, z: 0 },
				{ x: 135, y: 763, z: 0 },
				{ x: 484, y: 763, z: 0 },
				{ x: 360, y: 765, z: 0 }
			];

			game.entities = {
				buildings: [],
				trees: [],
				sheeps: [],
				humans: [new Human('shabyn', { x: 240, y: 570, z: 0 })],
				creatures: [new Creature({ x: 185, y: 590, z: 0 })],
				particles: []
			};

			game.player = null;

			for (let coords of treeList) game.entities.trees.push(new Tree(coords, 0));

			game.cam = {
				x: 300,
				y: 300,
				h: 128,
				o: 1,
				targ_h: 100,
				default_h: 100,
				targ_o: 0,
				targ_speed: 400,
				target: { x: 300, y: 300 }
			};

			game.buttons = [];
			game.overlays = [];

			game.events = [];

			game.event_map = {
				title: () => {
					game.cam.target = { x: 300, y: 300 };

					game.overlays.push(
						new Overlay(
							'title',
							game.images['title'],
							overlay => ({
								x: (can.width - overlay.img.width * game.scale) / 2,
								y: (can.height - overlay.img.height * game.scale) / 2
							}),
							1000
						)
					);

					game.events.push(
						new TimeEvent(1000, event => {
							game.buttons.push(
								new Button(
									'menu',
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
												game.getOverlay('title').kill(300);
												game.triggerEvent('gamemode');
											}),
											new TimeEvent(1000, event => {
												game.getButton('lang').kill(300);
											})
										);
									}
								)
							);
						}),
						new TimeEvent(2000, event => {
							game.buttons.push(
								new Button(
									'lang',
									lang == '#fr' ? 'france-button' : 'usa-button',
									'',
									btn => ({
										x: can.width - (btn.img.width + 5) * game.scale,
										y: 5 * game.scale
									}),
									btn => {
										game.events.push(
											new TimeEvent(200, event => {
												location.replace(lang == '#fr' ? '#en' : '#fr');
												location.reload();
											})
										);
									}
								)
							);
						})
					);
				},
				gamemode: () => {
					game.cam.target = { x: 200, y: 600 };

					game.events.push(
						new TimeEvent(1000, event => {
							game.buttons.push(
								new Button(
									'survival',
									'menu2-button',
									lang == '#fr' ? 'Survie' : 'Survival',
									btn => ({
										x: (can.width - btn.img.width * game.scale) / 4,
										y: can.height - (btn.img.height + 5) * game.scale
									}),
									btn => {
										game.events.push(
											new TimeEvent(200, event => {
												btn.kill(300);
												game.events.push(
													new TimeEvent(400, event => {
														loadPage('drmlist');
													})
												);
											})
										);
									}
								),
								new Button(
									'campain',
									'menu2-button',
									lang == '#fr' ? 'Campagne' : 'Campain',
									btn => ({
										x: ((can.width - btn.img.width * game.scale) / 4) * 3,
										y: can.height - (btn.img.height + 5) * game.scale
									}),
									btn => {
										game.events.push(
											new TimeEvent(200, event => {
												btn.kill(300);
												game.events.push(
													new TimeEvent(400, event => {
														loadPage('chplist');
													})
												);
											})
										);
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
												for (let b of game.buttons) b.kill(300);
												game.triggerEvent('title');
											})
										);
									}
								)
							);
						})
					);
				}
			};

			game.loop = true;
			game.triggerEvent('title');
		}
	);
};
