var menu = new Chapter('Menu', './chapters/menu/img/', ['characters/player.png', 'characters/player_bow.png', 'characters/player_axe.png', 'characters/karmen.png', 'characters/karmen_bow.png', 'characters/karmen_axe.png', 'characters/scott.png', 'characters/scott_bow.png', 'characters/scott_axe.png', 'characters/lea.png', 'characters/lea_bow.png', 'characters/lea_axe.png', 'characters/human_shadow.png', 'characters/bow_aim.png', 'characters/axe_hit.png', 'characters/pnj_icons.png', 'sheep.png', 'sheep_shadow.png', 'house.png', 'house_shadow.png', 'fence.png', 'fence_translucid.png', 'red_fence.png', 'fence_shadow.png', 'trap.png', 'trees/pine_1.png', 'trees/pine_1_shadow.png', 'trees/pine_2.png', 'trees/pine_2_shadow.png', 'trees/pine_3.png', 'trees/pine_3_shadow.png', 'trees/pine_4.png', 'trees/pine_4_shadow.png', 'trees/tree_calc.png', 'ground.png', 'water.png', 'play_button.png', 'play_button_pressed.png', 'title.png'], chap => {
	console.log('Init ' + chap.name);
	chap.gcan = document.createElement('canvas');
	chap.gcan.width = chap.img['ground'].width;
	chap.gcan.height = chap.img['ground'].height;
	chap.message = '';
	chap.title = null;
	chap.bg_color = '#353242';
	chap.def_cam = { x: -2200, y: -1400 };
	chap.allow_traps = false;

	chap.entities = {
		over: [{ x: 0, y: -4, img: chap.img['title'] }],
		buttons: [
			new Button(0, 30, chap.img['play_button'], chap.img['play_button_pressed'], game => {
				game.loadChapter(1);
			})
		],
		// player: new Player(335, 335, chap.img),
		player: null,
		allies: [],
		particles: [],
		infected: [],
		traps: [],
		buildings: [new Entity(256, 79, 0, chap.img['house'], chap.img['house_shadow'], 96, 96, 0, 0, 60, new Hitbox(33, 40, 48, 19, 0, 50)), new Fence(190, 95, 1, chap.img), new Fence(190, 114, 1, chap.img), new Fence(244, 95, 1, chap.img), new Fence(244, 114, 1, chap.img), new Fence(227, 122, 0, chap.img), new Fence(202, 122, 0, chap.img), new Fence(227, 87, 0, chap.img), new Fence(202, 87, 0, chap.img)],
		sheeps: [new Mob(230, 94, chap.img['sheep'], chap.img['sheep_shadow'], 24, 24, 0, 0, 24, new Hitbox(6, 21, 12, 4, 2, 9)), new Mob(215, 100, chap.img['sheep'], chap.img['sheep_shadow'], 24, 24, 0, 0, 24, new Hitbox(6, 21, 12, 4, 2, 9))],
		arrows: []
	};

	chap.game_events = [];
});
