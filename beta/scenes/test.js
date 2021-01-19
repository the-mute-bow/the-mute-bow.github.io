let img_srcs = [
	// Buildings
	'./img/buildings/houses/house_0.png',
	'./img/buildings/houses/house_0_shadow.png',

	// Pines
	'./img/vegetation/pines/pine_0/pine_0.png',
	'./img/vegetation/pines/pine_0/pine_0_shadow.png',
	'./img/vegetation/pines/pine_1/pine_1.png',
	'./img/vegetation/pines/pine_1/pine_1_shadow.png',

	// Herbs
	'./img/vegetation/herbs/herb_0.png',
	'./img/vegetation/herbs/herb_0_shadow.png',
	'./img/vegetation/herbs/herb_1.png',
	'./img/vegetation/herbs/herb_1_shadow.png',
	'./img/vegetation/herbs/herb_2.png',
	'./img/vegetation/herbs/herb_2_shadow.png',
	'./img/vegetation/herbs/herb_3.png',
	'./img/vegetation/herbs/herb_3_shadow.png'
];

let vegetation = [
	'pine 134 25 0',
	'herb 148 25 2',
	'herb 195 28 2',
	'herb 104 29 2',
	'herb 215 29 1',
	'herb 231 30 1',
	'herb 22 36 0',
	'pine 192 36 1',
	'pine 99 37 0',
	'herb 179 37 3',
	'pine 67 38 0',
	'pine 30 40 1',
	'pine 161 45 1',
	'herb 248 46 2',
	'herb 82 49 3',
	'herb 126 55 0',
	'herb 147 55 1',
	'pine 211 57 0',
	'herb 224 59 1',
	'herb 41 62 3',
	'herb 191 67 2',
	'pine 250 67 1',
	'herb 212 68 1',
	'pine 5 85 0',
	'herb 40 86 3',
	'herb 68 93 0',
	'herb 6 100 2',
	'herb 117 101 2',
	'herb 44 102 1',
	'herb 203 109 2',
	'herb 15 113 0',
	'herb 242 116 2',
	'herb 74 125 3',
	'herb 59 130 2',
	'herb 77 133 2',
	'herb 224 133 1',
	'herb 9 141 2',
	'herb 63 150 3',
	'herb 180 155 2',
	'herb 232 171 3',
	'herb 19 175 2',
	'pine 254 181 1',
	'pine 5 185 0',
	'herb 100 188 1',
	'herb 159 193 1',
	'herb 173 195 2',
	'pine 219 198 0',
	'herb 169 199 1',
	'herb 33 201 3',
	'herb 7 205 3',
	'pine 44 205 0',
	'herb 222 208 0',
	'pine 248 213 1',
	'herb 204 219 0',
	'pine 91 224 1',
	'pine 143 224 0',
	'pine 187 229 0',
	'herb 111 230 1',
	'herb 11 236 0',
	'pine 21 238 1',
	'herb 142 240 1',
	'herb 38 241 1',
	'herb 211 243 1',
	'herb 242 248 1',
	'pine 49 251 0',
	'herb 116 252 3',
	'herb 62 253 1',
	'pine 125 253 1',
	'pine 235 253 0',
	'pine 164 255 1'
];

let game = new Game(img_srcs, _ => {
	game.entities.add(new Wind({ x: 20, y: 10, z: 2 }, 0.5));

	for (let veg of vegetation) {
		let args = [];
		for (a of veg.split(' ').slice(1)) args.push(parseInt(a));
		if (veg.includes('pine')) game.entities.add(new Pine(...args));

		if (veg.includes('herb')) game.entities.add(new Herb(...args));
	}

	// Move cam with left-joystick
	mge.joysticks.L.onPush = j => {
		game.camera.x += (j.pos.x * Math.abs(j.pos.x) * delay) / 20;
		game.camera.y += (j.pos.y * Math.abs(j.pos.y) * delay) / 20;
	};

	// Add Entities
	game.entities.add(
		new Animated('animated', { x: 128, y: 96 }, {}, {}, {}, 72, 144, {
			main: new Sprite('house_0', 144, 144),
			shadow: new Sprite('house_0_shadow', 144, 144)
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
		['default_grass', 'shadows', 'entities']
	);

	// game.fog = {
	// 	ratio: 0.01,
	// 	actual: { b: 100, t: 200 },
	// 	target: { b: 5, t: 12 }
	// };

	// Init camera
	game.camera = { x: 128, y: 128, z: 200 };
	mge.camera.set(game.camera, 1);

	// Activate joysticks
	game.setTimeout('joysticks', 1000, event => mge.joysticks.forEach(j => j.setActive(true)));
});
