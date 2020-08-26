var chapter2 = new Chapter('Tutorial', './chapters/chapter 2/img/', ['characters/player.png', 'characters/player_bow.png', 'characters/player_axe.png', 'characters/karmen.png', 'characters/karmen_bow.png', 'characters/karmen_axe.png', 'characters/scott.png', 'characters/scott_bow.png', 'characters/scott_axe.png', 'characters/infected1.png', 'characters/lea.png', 'characters/lea_bow.png', 'characters/lea_axe.png', 'characters/human_shadow.png', 'characters/bow_aim.png', 'characters/axe_hit.png', 'characters/pnj_icons.png', 'sheep.png', 'sheep_shadow.png', 'house.png', 'house_shadow.png', 'fence.png', 'fence_translucid.png', 'red_fence.png', 'fence_shadow.png', 'trap.png', 'trees/pine_1.png', 'trees/pine_1_shadow.png', 'trees/pine_2.png', 'trees/pine_2_shadow.png', 'trees/pine_3.png', 'trees/pine_3_shadow.png', 'trees/pine_4.png', 'trees/pine_4_shadow.png', 'trees/tree_calc.png', 'ground.png', 'water.png'], chap => {
	console.log('Init ' + chap.name);
	chap.gcan = document.createElement('canvas');
	chap.gcan.width = chap.img['ground'].width;
	chap.gcan.height = chap.img['ground'].height;
	chap.message = '';
	chap.title = ['Chapitre 2', 'Une drôle de bête.'];
	chap.bg_color = '#323c2e';
	chap.def_cam = { x: -2200, y: -1400 };
	chap.allow_traps = true;

	chap.entities = {
		over: [],
		infected: [new Infected(210, 100, chap.img, null)],
		particles: [],
		buttons: [],
		player: new Player(320, 137, chap.img),
		arrows: [],
		traps: [new Trap(226, 110, chap.img)],
		buildings: [new Entity(256, 79, 0, chap.img['house'], chap.img['house_shadow'], 96, 96, 0, 0, 60, new Hitbox(33, 40, 48, 19, 0, 50)), new Fence(190, 95, 1, chap.img), new Fence(190, 114, 1, chap.img), new Fence(244, 95, 1, chap.img), new Fence(244, 114, 1, chap.img), new Fence(202, 122, 0, chap.img), new Fence(227, 87, 0, chap.img), new Fence(202, 87, 0, chap.img)],
		sheeps: [new Mob(220, 140, chap.img['sheep'], chap.img['sheep_shadow'], 24, 24, 0, 0, 24, new Hitbox(6, 21, 12, 4, 2, 9)), new Mob(195, 150, chap.img['sheep'], chap.img['sheep_shadow'], 24, 24, 0, 0, 24, new Hitbox(6, 21, 12, 4, 2, 9))],
		allies: [
			new Ally(306, 142, 'karmen', chap.img, 1),
			new Ally(286, 132, 'scott', chap.img, 1),
			new Ally(300, 130, 'lea', chap.img, 0, null, game => {
				game.dialog = new Dialog('lea', ["C'était quoi ce bruit?"], game => {
					game.dialog = new Dialog('scott', ['La bête revient pour nos moutons!'], game => {
						game.dialog = null;
						game.getAlly('lea').event = null;
						game.getAlly('lea').target = { x: 262, y: 126, obj: null };
						game.getAlly('scott').target = { x: 244, y: 143, obj: null };
						game.getAlly('karmen').target = { x: 230, y: 147, obj: null };
						game.message = "Suis tes amis jusqu'à l'enclos.";
						game.entities.player.canmove = true;
						game.game_events = [
							new walkEvent(235, 125, 40, (event, game) => {
								let dx = event.pos.x - game.entities.player.pos.x - 12;
								let dy = event.pos.y - game.entities.player.getFoot();
								if (Math.sqrt(dx * dx + dy * dy) < event.pos.r) {
									game.message = '';
									game.entities.player.canmove = false;
									game.entities.infected[0].target = { x: 230, y: 105 };
									game.game_events = [
										new basicEvent((event, game) => {
											if (game.entities.traps[0].traped) {
												game.entities.infected[0].target = null;
												game.game_events = [
													new timeEvent(30, (event, game) => {
														game.game_events = [];
														game.message = 'Parle à Karmen.';
														game.getAlly('karmen').event = game => {
															game.dialog = new Dialog('karmen', ['On dirait un gars...'], game => {
																game.dialog = new Dialog('scott', ["Je vais m'approcher."], game => {
																	game.dialog = new Dialog('lea', ["J'ai peur..."], game => {
																		game.message = '';
																		game.dialog = null;
																		game.getAlly('karmen').event = null;
																		game.getAlly('scott').target = { x: 5, y: 5, obj: game.entities.infected[0] };

																		game.game_events = [
																			new basicEvent((event, game) => {
																				if (game.getAlly('scott').health < game.getAlly('karmen').health) {
																					game.game_events = [
																						new timeEvent(5, (event, game) => {
																							game.game_events = [];
																							game.getAlly('scott').target = { x: 244, y: 143, obj: null };

																							// game.dialog = new Dialog('scott', ["Il y en a d'autres dans la forêt, prenez vos arcs!"], game => {});
																						})
																					];
																				}
																			})
																		];
																	});
																});
															});
														};
													})
												];
											}
										})
									];
								}
							})
						];
					});
				});
			})
		]
	};

	console.log(chap.entities);

	chap.entities.player.canmove = false;
	chap.entities.player.wood = 0;
	chap.game_events = [new timeEvent(60, (event, game) => (game.message = 'Parle à Lea.'))];
});
