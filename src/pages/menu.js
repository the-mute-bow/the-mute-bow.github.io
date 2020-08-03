pages['menu'] = game => {
	game.sounds = {
		click: new Audio('./sounds/click.mp3'),
		menu: new Audio('./sounds/Art Of Silence.mp3')
	};
	game.soundtrack = game.sounds.menu;
	game.images = [];
	game.loadImg(
		[
			'title.png',
			'ground1-night.png',
			'buttons/menu-button.png',
			'buttons/menu-button-shadow.png',
			'buttons/france-button.png',
			'buttons/france-button-shadow.png',
			'buttons/usa-button.png',
			'buttons/usa-button-shadow.png',
			'buildings/small-house1-night.png',
			'buildings/small-house1-shadow.png',
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
		0,
		() => {
			game.ground = game.images['ground1-night'];
			game.tree_calc = game.images['tree-calc-night'];
			game.can.height = game.ground.height;
			game.can.width = game.ground.width;
			game.bg_color = '#293d48';
			game.speed = 1;

			let treeList = [
				{ x: 327, y: 32, z: 0 },
				{ x: 404, y: 33, z: 0 },
				{ x: 211, y: 45, z: 0 },
				{ x: 267, y: 47, z: 0 },
				{ x: 240, y: 50, z: 0 },
				{ x: 300, y: 51, z: 0 },
				{ x: 160, y: 55, z: 0 },
				{ x: 187, y: 55, z: 0 },
				{ x: 362, y: 59, z: 0 },
				{ x: 362, y: 60, z: 0 },
				{ x: 388, y: 66, z: 0 },
				{ x: 124, y: 69, z: 0 },
				{ x: 335, y: 71, z: 0 },
				{ x: 420, y: 72, z: 0 },
				{ x: 461, y: 77, z: 0 },
				{ x: 217, y: 78, z: 0 },
				{ x: 251, y: 80, z: 0 },
				{ x: 95, y: 85, z: 0 },
				{ x: 173, y: 88, z: 0 },
				{ x: 392, y: 97, z: 0 },
				{ x: 71, y: 98, z: 0 },
				{ x: 274, y: 101, z: 0 },
				{ x: 491, y: 108, z: 0 },
				{ x: 361, y: 109, z: 0 },
				{ x: 196, y: 111, z: 0 },
				{ x: 448, y: 112, z: 0 },
				{ x: 139, y: 125, z: 0 },
				{ x: 54, y: 135, z: 0 },
				{ x: 101, y: 135, z: 0 },
				{ x: 418, y: 137, z: 0 },
				{ x: 469, y: 142, z: 0 },
				{ x: 499, y: 143, z: 0 },
				{ x: 13, y: 157, z: 0 },
				{ x: 74, y: 161, z: 0 },
				{ x: 447, y: 169, z: 0 },
				{ x: 112, y: 172, z: 0 },
				{ x: 485, y: 187, z: 0 },
				{ x: 43, y: 197, z: 0 },
				{ x: 93, y: 203, z: 0 },
				{ x: 404, y: 218, z: 0 },
				{ x: 460, y: 231, z: 0 },
				{ x: 74, y: 243, z: 0 },
				{ x: 498, y: 246, z: 0 },
				{ x: 37, y: 250, z: 0 },
				{ x: 446, y: 271, z: 0 },
				{ x: 101, y: 295, z: 0 },
				{ x: 50, y: 300, z: 0 },
				{ x: 75, y: 306, z: 0 },
				{ x: 418, y: 308, z: 0 },
				{ x: 483, y: 310, z: 0 },
				{ x: 131, y: 321, z: 0 },
				{ x: 453, y: 323, z: 0 },
				{ x: 10, y: 328, z: 0 },
				{ x: 507, y: 335, z: 0 },
				{ x: 169, y: 336, z: 0 },
				{ x: 214, y: 340, z: 0 },
				{ x: 262, y: 340, z: 0 },
				{ x: 383, y: 347, z: 0 },
				{ x: 80, y: 350, z: 0 },
				{ x: 478, y: 359, z: 0 },
				{ x: 49, y: 360, z: 0 },
				{ x: 436, y: 366, z: 0 },
				{ x: 188, y: 376, z: 0 },
				{ x: 109, y: 380, z: 0 },
				{ x: 147, y: 383, z: 0 },
				{ x: 294, y: 395, z: 0 },
				{ x: 10, y: 397, z: 0 },
				{ x: 406, y: 398, z: 0 },
				{ x: 238, y: 402, z: 0 },
				{ x: 481, y: 402, z: 0 },
				{ x: 317, y: 403, z: 0 },
				{ x: 427, y: 413, z: 0 },
				{ x: 66, y: 415, z: 0 },
				{ x: 66, y: 416, z: 0 },
				{ x: 366, y: 417, z: 0 },
				{ x: 256, y: 423, z: 0 },
				{ x: 287, y: 423, z: 0 },
				{ x: 214, y: 429, z: 0 },
				{ x: 508, y: 429, z: 0 },
				{ x: 165, y: 442, z: 0 },
				{ x: 111, y: 443, z: 0 },
				{ x: 112, y: 443, z: 0 },
				{ x: 469, y: 444, z: 0 },
				{ x: 330, y: 449, z: 0 },
				{ x: 396, y: 452, z: 0 },
				{ x: 257, y: 464, z: 0 },
				{ x: 203, y: 474, z: 0 },
				{ x: 312, y: 479, z: 0 },
				{ x: 373, y: 479, z: 0 },
				{ x: 443, y: 481, z: 0 },
				{ x: 149, y: 485, z: 0 },
				{ x: 252, y: 500, z: 0 },
				{ x: 486, y: 503, z: 0 },
				{ x: 409, y: 506, z: 0 },
				{ x: 340, y: 507, z: 0 }
			];

			game.entities = {
				buildings: [
					new Entity(
						{ x: 270, y: 90, z: 0 },
						{
							main: new Sprite(game.images['small-house1-night'], { x: 0, y: 0, w: 73, h: 49 }),
							shadow: new Sprite(game.images['small-house1-shadow'], { x: 0, y: 0, w: 73, h: 49 })
						},
						new Hitbox(18, 26, 54, 22, 50),
						{ x: 18, y: 48 }
					)
				],
				trees: [],
				humans: [],
				creatures: [],
				particles: []
			};

			game.player = null;

			for (let coords of treeList) game.entities.trees.push(new Tree(coords, 0, '-night'));

			game.cam = {
				x: 300,
				y: 300,
				h: 128,
				o: 1,
				targ_h: 100,
				targ_o: 0,
				targ_speed: 400,
				target: { x: 300, y: 300 }
			};

			game.buttons = [];
			game.overlays = [
				new Overlay(
					'title',
					game.images['title'],
					overlay => ({
						x: (can.width - overlay.img.width * game.scale) / 2,
						y: (can.height - overlay.img.height * game.scale) / 2
					}),
					1000
				)
			];

			game.events = [
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
										game.events.push(
											new TimeEvent(400, event => {
												loadPage('chap1');
											})
										);
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
										location.href = lang == '#fr' ? '/#en' : '/#fr';
										location.reload(true);
									})
								);
							}
						)
					);
				})
			];

			game.loop = true;
		}
	);
};
