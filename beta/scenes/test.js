let img_srcs = [
	// Buildings
	'./img/buildings/houses/house_0.png',
	'./img/buildings/houses/house_0_shadow.png',

	// Vegetation
	...vegetation_imgs
];

let game = new Game(img_srcs, _ => {
	// Wind entity
	game.entities.add(new Wind({ x: 20, y: 10, z: 2 }, 0.5));

	// Vegetation entities
	for (let veg of vegetation_entities) {
		let args = [];
		for (a of veg.split(' ').slice(1)) args.push(parseInt(a));
		if (veg.includes('pine')) game.entities.add(new Pine(...args));

		if (veg.includes('herb')) game.entities.add(new Herb(...args));
	}

	// House
	game.entities.add(new House(128, 100, 0));

	// Move cam with left-joystick
	mge.joysticks.L.onPush = j => {
		game.camera.x += (j.pos.x * Math.abs(j.pos.x) * delay) / 20;
		game.camera.y += (j.pos.y * Math.abs(j.pos.y) * delay) / 20;
	};

	// Pop smoke on touch
	mge.joysticks.forEach(j => {
		j.onTap = j => {
			let w = game.entities.get('wind')[0];
			let r = n => (Math.random() - 0.5) * 2 * n;

			for (let i = 0; i < 24; i++) {
				game.entities.add(new Smoke({ ...mge.toGameCoords(j.tip), z: 14 }, w));
			}
		};
	});

	// Init scene
	game.setScene(
		256,
		256,
		'#7d8f6c',
		// 'white',
		0.3,
		['default_grass', 'shadows', 'entities']
	);

	// game.fog = {
	// 	ratio: 0.01,
	// 	actual: { b: 100, t: 200 },
	// 	target: { b: 5, t: 12 }
	// };

	// Init camera
	game.camera = { x: 128, y: 100, z: 144 };
	mge.camera.set(game.camera, 1);

	// Activate joysticks
	game.setTimeout('joysticks', 1000, event => mge.joysticks.forEach(j => j.setActive(true)));
});
