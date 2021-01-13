let img_srcs = [];

let game = new Game(img_srcs, _ => {
	// Activate joysticks
	game.setTimeout('joysticks', 1000, event => mge.joysticks.forEach(j => j.setActive(true)));

	// Move cam with left-joystick
	mge.joysticks.L.onPush = j => {
		game.camera.x += (j.pos.x * delay) / 20;
		game.camera.y += (j.pos.y * delay) / 20;
	};

	// Init scene
	game.setScene(256, 256, '#7d8f6c', ['default_background', 'entities']);

	// Camera
	game.camera = { x: 128, y: 128, z: 128 };
	mge.camera.set(game.camera, 1);
});
