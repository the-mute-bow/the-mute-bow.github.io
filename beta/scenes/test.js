let img_srcs = ['./img/buildings/houses/house_0.png', './img/buildings/houses/house_0_shadow.png'];

let game = new Game(img_srcs, _ => {
	// Move cam with left-joystick
	mge.joysticks.L.onPush = j => {
		game.camera.x += (j.pos.x * Math.abs(j.pos.x) * delay) / 20;
		game.camera.y += (j.pos.y * Math.abs(j.pos.y) * delay) / 20;
	};

	// Add Entities
	game.entities.add(
		new Animated('animated', { x: 128, y: 128 }, {}, {}, {}, 48, 96, {
			main: new Sprite('house_0', 96, 96),
			shadow: new Sprite('house_0_shadow', 96, 96)
		})
	);

	mge.joysticks.forEach(j => {
		j.onTap = j => {
			let c = () => (Math.random() - 0.5) * 300;
			for (let i = 0; i < 24; i++) game.entities.add(new Particle('particle', { ...mge.toGameCoords(j.tip), z: 12 }, { x: c(), y: c(), z: c() }, { z: -200 }, { a: 0.1, g: 0.5 }, 'green'));
		};
	});

	// Init scene
	game.setScene(
		256,
		256,
		'#7d8f6c',
		// 'white',
		0.3,
		['default_background', 'shadows', 'entities']
	);

	// game.fog = {
	// 	ratio: 0.01,
	// 	actual: { b: 100, t: 200 },
	// 	target: { b: 5, t: 12 }
	// };

	// Init camera
	game.camera = { x: 128, y: 128, z: 100 };
	mge.camera.set(game.camera, 1);

	// Activate joysticks
	game.setTimeout('joysticks', 1000, event => mge.joysticks.forEach(j => j.setActive(true)));
});
