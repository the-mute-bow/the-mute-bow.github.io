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

	// Init scene
	game.setScene(256, 256, ['default_grass', 'shadows', 'entities', 'light', 'darkness']);
	game.darkness_color = { r: 60, g: 10, b: 0, a: 0 };
	game.shadow_color = { r: 10, g: 10, b: 20, a: 100 };
	game.fireflies = true;

	// Night fall
	game.setTimeout('nightfall', 5000, game.setEvent, 'darkness', event => {
		game.darkness_color = game.transitionColor(game.darkness_color, { r: 10, g: 10, b: 38, a: 150 }, 0.0002 * game.delay);
	});

	// Init camera
	game.camera = { x: 128, y: 100, z: 144 };
	mge.camera.set(game.camera, 1);
});
