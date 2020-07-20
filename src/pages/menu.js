pages['menu'] = game => {
	game.images = [];
	game.loadImg(
		[
			'ground1.png',
			'buildings/small-house1.png',
			'humans/human-shadow.png',
			'humans/eliot.png',
			'humans/lea.png',
			'humans/scott.png',
			'humans/karmen.png'
		],
		0,
		() => {
			game.ground = game.images['ground1'];
			game.can.height = game.ground.height;
			game.can.width = game.ground.width;
			game.bg_color = '#323c2e';
			game.speed = 1;

			game.entities = {
				buildings: [
					new Entity(
						{ x: 0, y: 0, z: 0 },
						{ main: new Sprite(game.images['small-house1'], { x: 0, y: 0, w: 56, h: 49 }) }
					)
				],
				humans: [
					new Human('eliot', { x: 200, y: 200, z: 0 }),
					new Human('lea', { x: 220, y: 205, z: 0 }),
					new Human('karmen', { x: 205, y: 220, z: 0 }),
					new Human('scott', { x: 210, y: 215, z: 0 })
				]
			};

			game.player = game.getHuman('eliot');
			game.cam = { x: 200, y: 200, h: 128, o: 1, targ_h: 100, targ_o: 0, targ_speed: 20, target: game.player };

			game.loop = true;
		}
	);
};
