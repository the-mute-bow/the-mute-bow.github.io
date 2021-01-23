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

	// House
	game.entities.add(new House(128, 100, 0));

	document.querySelector('div.tactile').addEventListener('click', event => {
		let w = game.entities.get('wind')[0];
		let r = n => (Math.random() - 0.5) * 2 * n;
		for (let i = 0; i < 24; i++) game.entities.add(new Smoke({ ...mge.toGameCoords({ x: event.clientX, y: event.clientY }), z: 3 }, w));
	});

	// mge settings
	mge.forceFullscreen = false;
	mge.forceLandscape = false;

	// Init scene
	game.setScene(256, 256, ['default_grass', 'shadows', 'entities']);

	// Init camera
	game.camera = { x: 128, y: 100, z: 144 };

	mge.camera.set(game.camera, 1);
});
