pages['menu'] = game => {
	game.images = [];
	game.loadImg(['ground1.png', 'buildings/small-house1.png'], 0, () => {
		game.ground = game.images['ground1'];
		game.can.height = game.ground.height;
		game.can.width = game.ground.width;
		game.bg_color = '#323c2e';
		game.height = 100;
		game.speed = 1;
		game.cam = { x: 200, y: 200 };

		game.loop = true;
	});
};
