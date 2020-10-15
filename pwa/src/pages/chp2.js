pages['chp2'] = game => {
	game.images = [];
	game.sounds = {
		click: new Audio('./sounds/click.mp3'),
		dark: new Audio('./sounds/dark-ambience.mp3'),
		night: new Audio('./sounds/night-ambience.mp3'),
		tense: new Audio('./sounds/tense-ambience.mp3')
	};

	game.soundtrack = game.sounds.night;

	game.loadImg(
		[
			'ground1-night.png',
			'buildings/small-house1-night.png',
			'buildings/small-house1-shadow.png',

			'coin.png',
			'arrow-bonus.png',

			'trees/pine1-night.png',
			'trees/pine1-shadow-night.png',
			'trees/pine2-night.png',
			'trees/pine2-shadow-night.png',
			'trees/pine3-night.png',
			'trees/pine3-shadow-night.png',
			'trees/pine4-night.png',
			'trees/pine4-shadow-night.png',
			'trees/tree-calc-night.png',

			'mobs/sheep.png',
			'mobs/sheep-shadow.png',

			'humans/human-shadow.png',
			'humans/eliot-night.png',
			'humans/lea-night.png',
			'humans/piet-night.png',
			'humans/shabyn-night.png',
			'humans/creature.png',
			'humans/creature-light.png',

			'humans/icon-null.png',
			'humans/icon-stay.png',
			'humans/icon-follow.png',
			'humans/icon-bow.png',
			'humans/icon-axe.png',
			'humans/icon-fence.png',
			'humans/icon-none.png',
			'humans/icon-message.png',
			'humans/icon-exclam.png',
			'humans/icon-noamo.png',
			'humans/icon-plus.png',
			'humans/icon-stamina-red.png',
			'humans/icon-stamina-green.png',
			'humans/icon-stamina-use.png',
			'humans/icon-mana0.png',
			'humans/icon-mana1.png',
			'humans/icon-mana2.png',
			'humans/icon-mana3.png',
			'humans/icon-mana4.png',

			'weapons/axe-hold.png',
			'weapons/axe-hit.png',
			'weapons/bow-hold.png',
			'weapons/bow-aim.png',
			'weapons/fence.png',
			'weapons/fence-night.png',
			'weapons/fence-red.png',
			'weapons/fence-shadow.png',

			'buttons/pause-button.png',
			'buttons/pause-button-shadow.png',
			'buttons/menu-button.png',
			'buttons/menu-button-shadow.png',
			'buttons/menu2-button.png',
			'buttons/menu2-button-shadow.png',
			'buttons/buy-button.png',
			'buttons/buy-button-shadow.png',
			'buttons/mission-button.png',
			'buttons/mission-button-shadow.png',

			'buttons/none-button.png',
			'buttons/none-button-shadow.png',
			'buttons/bow-button.png',
			'buttons/bow-button-shadow.png',
			'buttons/axe-button.png',
			'buttons/axe-button-shadow.png',
			'buttons/fence-button.png',
			'buttons/fence-button-shadow.png'
		],
		() => {
			game.variant = '-night';
			game.ground = game.images['ground1' + game.variant];
			game.tree_calc = game.images['tree-calc' + game.variant];
			game.can.width = game.ground.width;
			game.can.height = game.ground.height;

			game.bg_color = '#212423';
			game.leave_color = '#293d48';
			game.speed = 1;
			game.fps = { frames: 0, duration: 0, value: 0 };

			game.coins = 0;

			let treeList = [
				{ x: 131, y: 19, z: 0 },
				{ x: 339, y: 20, z: 0 },
				{ x: 183, y: 23, z: 0 },
				{ x: 153, y: 669, z: 0 },
				{ x: 278, y: 23, z: 0 },
				{ x: 473, y: 24, z: 0 },
				{ x: 66, y: 31, z: 0 },
				{ x: 231, y: 31, z: 0 },
				{ x: 404, y: 33, z: 0 },
				{ x: 443, y: 41, z: 0 },
				{ x: 9, y: 45, z: 0 },
				{ x: 92, y: 52, z: 0 },
				{ x: 307, y: 54, z: 0 },
				{ x: 160, y: 55, z: 0 },
				{ x: 489, y: 58, z: 0 },
				{ x: 361, y: 59, z: 0 },
				{ x: 247, y: 64, z: 0 },
				{ x: 124, y: 69, z: 0 },
				{ x: 54, y: 73, z: 0 },
				{ x: 201, y: 73, z: 0 },
				{ x: 461, y: 77, z: 0 },
				{ x: 400, y: 83, z: 0 },
				{ x: 280, y: 90, z: 0 },
				{ x: 329, y: 91, z: 0 },
				{ x: 18, y: 97, z: 0 },
				{ x: 80, y: 97, z: 0 },
				{ x: 499, y: 106, z: 0 },
				{ x: 448, y: 112, z: 0 },
				{ x: 178, y: 114, z: 0 },
				{ x: 374, y: 117, z: 0 },
				{ x: 139, y: 125, z: 0 },
				{ x: 52, y: 130, z: 0 },
				{ x: 101, y: 135, z: 0 },
				{ x: 418, y: 137, z: 0 },
				{ x: 480, y: 147, z: 0 },
				{ x: 13, y: 157, z: 0 },
				{ x: 74, y: 161, z: 0 },
				{ x: 112, y: 172, z: 0 },
				{ x: 453, y: 190, z: 0 },
				{ x: 509, y: 193, z: 0 },
				{ x: 43, y: 197, z: 0 },
				{ x: 93, y: 203, z: 0 },
				{ x: 404, y: 218, z: 0 },
				{ x: 1, y: 224, z: 0 },
				{ x: 482, y: 234, z: 0 },
				{ x: 125, y: 241, z: 0 },
				{ x: 74, y: 243, z: 0 },
				{ x: 37, y: 250, z: 0 },
				{ x: 446, y: 271, z: 0 },
				{ x: 511, y: 276, z: 0 },
				{ x: 101, y: 295, z: 0 },
				{ x: 50, y: 300, z: 0 },
				{ x: 418, y: 308, z: 0 },
				{ x: 483, y: 310, z: 0 },
				{ x: 131, y: 321, z: 0 },
				{ x: 453, y: 323, z: 0 },
				{ x: 220, y: 325, z: 0 },
				{ x: 10, y: 328, z: 0 },
				{ x: 87, y: 335, z: 0 },
				{ x: 507, y: 335, z: 0 },
				{ x: 169, y: 336, z: 0 },
				{ x: 262, y: 340, z: 0 },
				{ x: 383, y: 347, z: 0 },
				{ x: 478, y: 359, z: 0 },
				{ x: 49, y: 360, z: 0 },
				{ x: 127, y: 368, z: 0 },
				{ x: 188, y: 376, z: 0 },
				{ x: 424, y: 394, z: 0 },
				{ x: 294, y: 395, z: 0 },
				{ x: 10, y: 397, z: 0 },
				{ x: 58, y: 401, z: 0 },
				{ x: 100, y: 401, z: 0 },
				{ x: 238, y: 402, z: 0 },
				{ x: 490, y: 410, z: 0 },
				{ x: 143, y: 412, z: 0 },
				{ x: 287, y: 423, z: 0 },
				{ x: 214, y: 429, z: 0 },
				{ x: 70, y: 437, z: 0 },
				{ x: 165, y: 442, z: 0 },
				{ x: 459, y: 442, z: 0 },
				{ x: 112, y: 443, z: 0 },
				{ x: 18, y: 448, z: 0 },
				{ x: 264, y: 449, z: 0 },
				{ x: 396, y: 452, z: 0 },
				{ x: 510, y: 463, z: 0 },
				{ x: 52, y: 478, z: 0 },
				{ x: 373, y: 479, z: 0 },
				{ x: 199, y: 484, z: 0 },
				{ x: 149, y: 485, z: 0 },
				{ x: 437, y: 485, z: 0 },
				{ x: 103, y: 487, z: 0 },
				{ x: 1, y: 495, z: 0 },
				{ x: 248, y: 496, z: 0 },
				{ x: 486, y: 503, z: 0 },
				{ x: 35, y: 521, z: 0 },
				{ x: 79, y: 523, z: 0 },
				{ x: 400, y: 528, z: 0 },
				{ x: 168, y: 530, z: 0 },
				{ x: 273, y: 530, z: 0 },
				{ x: 120, y: 534, z: 0 },
				{ x: 229, y: 554, z: 0 },
				{ x: 56, y: 559, z: 0 },
				{ x: 451, y: 561, z: 0 },
				{ x: 495, y: 561, z: 0 },
				{ x: 95, y: 563, z: 0 },
				{ x: 192, y: 565, z: 0 },
				{ x: 18, y: 566, z: 0 },
				{ x: 156, y: 573, z: 0 },
				{ x: 366, y: 581, z: 0 },
				{ x: 419, y: 590, z: 0 },
				{ x: 129, y: 595, z: 0 },
				{ x: 38, y: 597, z: 0 },
				{ x: 1, y: 605, z: 0 },
				{ x: 69, y: 609, z: 0 },
				{ x: 466, y: 615, z: 0 },
				{ x: 107, y: 624, z: 0 },
				{ x: 382, y: 627, z: 0 },
				{ x: 511, y: 631, z: 0 },
				{ x: 21, y: 637, z: 0 },
				{ x: 334, y: 639, z: 0 },
				{ x: 54, y: 647, z: 0 },
				{ x: 291, y: 654, z: 0 },
				{ x: 429, y: 654, z: 0 },
				{ x: 386, y: 668, z: 0 },
				{ x: 476, y: 671, z: 0 },
				{ x: 477, y: 671, z: 0 },
				{ x: 1, y: 673, z: 0 },
				{ x: 84, y: 674, z: 0 },
				{ x: 254, y: 679, z: 0 },
				{ x: 43, y: 688, z: 0 },
				{ x: 311, y: 689, z: 0 },
				{ x: 349, y: 698, z: 0 },
				{ x: 122, y: 701, z: 0 },
				{ x: 215, y: 701, z: 0 },
				{ x: 177, y: 703, z: 0 },
				{ x: 418, y: 705, z: 0 },
				{ x: 508, y: 713, z: 0 },
				{ x: 76, y: 714, z: 0 },
				{ x: 279, y: 715, z: 0 },
				{ x: 462, y: 716, z: 0 },
				{ x: 463, y: 716, z: 0 },
				{ x: 382, y: 719, z: 0 },
				{ x: 21, y: 721, z: 0 },
				{ x: 242, y: 727, z: 0 },
				{ x: 149, y: 732, z: 0 },
				{ x: 330, y: 733, z: 0 },
				{ x: 100, y: 741, z: 0 },
				{ x: 50, y: 751, z: 0 },
				{ x: 12, y: 757, z: 0 },
				{ x: 308, y: 759, z: 0 },
				{ x: 440, y: 759, z: 0 },
				{ x: 221, y: 761, z: 0 },
				{ x: 268, y: 761, z: 0 },
				{ x: 269, y: 761, z: 0 },
				{ x: 181, y: 762, z: 0 },
				{ x: 401, y: 762, z: 0 },
				{ x: 135, y: 763, z: 0 },
				{ x: 484, y: 763, z: 0 },
				{ x: 360, y: 765, z: 0 }
			];

			game.entities = {
				buildings: [
					new House({ x: 270, y: 90, z: 0 }),

					new Fence({ x: 219, y: 121, z: 0 }, 0),
					new Fence({ x: 263, y: 112, z: 0 }, 1),
					new Fence({ x: 262, y: 92, z: 0 }, 1),
					new Fence({ x: 207, y: 112, z: 0 }, 1),
					new Fence({ x: 206, y: 93, z: 0 }, 1),
					new Fence({ x: 218, y: 83, z: 0 }, 0),
					new Fence({ x: 244, y: 82, z: 0 }, 0)
				],
				trees: [],
				sheeps: [new Sheep({ x: 228, y: 104, z: 0 }), new Sheep({ x: 242, y: 90, z: 0 })],
				humans: [new Human('eliot', { x: 315, y: 150, z: 0 }), new Human('lea', { x: 320, y: 126, z: 0 }), new Human('shabyn', { x: 297, y: 125, z: 0 }), new Human('piet', { x: 308, y: 128, z: 0 })],
				creatures: [new Creature({ x: 191, y: 145, z: 0 }), new Creature({ x: 200, y: 136, z: 0 }), new Creature({ x: 205, y: 148, z: 0 })],
				particles: []
			};

			for (let coords of treeList) game.entities.trees.push(new Tree(coords, 0));

			game.player = game.getHuman('eliot');
			game.player.target = null;

			game.fog_map = new FogMap(game.ground.width, game.ground.height);
			game.fog_map.humans.push(game.player);
			game.fog_map.fill();

			game.cam = {
				x: game.player.pos.x + 12,
				y: game.player.pos.y + 12,
				h: 80,
				o: 0,
				targ_h: 86,
				default_h: 86,
				targ_o: 0,
				targ_speed: 400,
				target: game.player
			};

			game.dialog = null;

			game.mission = {
				text: "Ceci est un test pour voir si l'affichage des missions s'effectue correctement avec une image animée et un texte.",
				img: './img/missions/the-mute-bow.gif',
				click: mission => {
					setScreen('mission', {
						text: "Ceci est un test pour voir si l'affichage des missions s'effectue correctement avec une image fixe et un texte.",
						img: './img/missions/sprint.png',
						pixelated: true,
						click: mission => {
							setScreen('game');
						}
					});
				}
			};

			game.mode = 'title';

			game.buttons = [];
			game.overlays = [];

			game.events = [];
			game.event_map = {
				title: () => {
					game.triggerEvent('start');
					return;
					game.mode = 'title';
					game.strat_fog = 1;

					game.events.push(
						new TimeEvent(1000, event => {
							game.overlays.push(
								new OverText(
									'title',
									overtext => (lang == '#fr' ? 'Chapitre 2' : 'Chapter 2'),
									overtext => ({
										x: can.width / 2,
										y: can.height / 2
									}),
									1800,
									10,
									'#cdcad3'
								)
							);
						}),

						new TimeEvent(2000, event => {
							game.overlays.push(
								new OverText(
									'title2',
									overtext => (lang == '#fr' ? 'Une étrange créature.' : 'A strange creature.'),
									overtext => ({
										x: can.width / 2,
										y: can.height / 2 + 6 * game.scale
									}),
									1800,
									6,
									'#cdcad3'
								)
							);
						}),

						new TimeEvent(4800, event => {
							for (let o of game.overlays) o.kill(1000);
						}),

						new TimeEvent(6000, event => {
							game.triggerEvent('start');
						})
					);
				},
				start: () => {
					game.mode = 'normal';
					for (let event of ['creature_dead', 'creature_nearby', 'dead_human']) game.triggerEvent(event);
					game.fog_map.fill();

					game.events.push(
						new TimeEvent(1000, event => {
							game.initPauseButton();
							game.initMissionButton();
							game.initCoinOverlays();
							if (lang == '#dev') game.initDevOverlays();
						}),

						new WalkEvent(318, 140, 24, 0.8, game.entities.humans, 'all', 'in', 'white', event => {
							game.getHuman('shabyn').event = () => {
								game.getHuman('shabyn').event = null;
								game.dialog = {
									character: 'shabyn',
									text: "j'aime pas les moutons. Tsheeeep.",
									click: dialog => {
										game.dialog = null;
									}
								};
							};
						})
					);
				},
				creature_dead: () => {
					game.events.push(
						new GameEvent(event => {
							if (!game.entities.creatures.length) {
								event.done = true;
								game.soundtrack.pause();
								game.soundtrack = game.sounds.night;
								for (let human of game.entities.humans) human.health.val = 12;
							}
						})
					);
				},
				creature_nearby: () => {
					game.events.push(
						new GameEvent(event => {
							if (game.entities.humans.length < 4) event.done = true;
							else {
								for (let creature of game.entities.creatures) {
									let dx = creature.pos.x - game.player.pos.x;
									let dy = creature.pos.y - game.player.pos.y;
									if (Math.sqrt(dx * dx + dy * dy) < 48) {
										event.done = true;
										game.player.health.val = 9;
										game.fog_map.fill();
										game.soundtrack.pause();
										game.soundtrack = game.sounds.dark;
										game.triggerEvent('creature_chase');

										for (let human of game.entities.humans) {
											if (human.name != 'eliot' && human.name != 'lea')
												game.events.push(
													new TimeEvent(Math.random() * 1000, event => {
														human.setWeapon('bow');
														human.enemies = 'creatures';
													})
												);
										}
										break;
									}
								}
							}
						})
					);
				},
				creature_chase: () => {
					game.events.push(
						new GameEvent(event => {
							if (!game.entities.creatures.length || game.entities.humans.length < 4) event.done = true;
							else {
								for (let creature of game.entities.creatures) {
									if (creature.target && creature.target.obj && creature.target.obj.name != 'creature') {
										event.done = true;
										game.soundtrack.pause();
										game.soundtrack = game.sounds.tense;
										game.player.view_distance = 0;
										game.cam.h *= 0.96;
										game.soundtrack.currentTime = 0;
										game.triggerEvent('creature_toofar');
										break;
									}
								}
							}
						})
					);
				},
				creature_toofar: () => {
					game.events.push(
						new TimeEvent(1000, event => {
							game.events.push(
								new GameEvent(event => {
									if (!game.entities.creatures.length || game.entities.humans.length < 4) event.done = true;
									else {
										let far = true;
										for (let creature of game.entities.creatures) {
											if (creature.target && creature.target.obj && creature.target.obj.name != 'creature') {
												far = false;
												break;
											}
										}

										if (far) {
											event.done = true;
											game.soundtrack.pause();
											game.soundtrack = game.sounds.dark;
											game.soundtrack.currentTime = 0;
											game.triggerEvent('creature_chase');
										}
									}
								})
							);
						})
					);
				},
				dead_human: () => {
					game.events.push(
						new GameEvent(event => {
							for (let name of ['eliot', 'shabyn', 'piet', 'lea']) {
								if (!game.getHuman(name)) {
									event.done = true;
									game.end_caption = name.charAt(0).toUpperCase() + name.slice(1) + (lang == '#fr' ? ' est mort' + (['lea', 'shabyn'].includes(name) ? 'e.' : '.') : ' is dead.');
									game.getButton('mission').kill(400);
									game.events.push(
										new TimeEvent(1000, event => {
											game.getButton('pause').mode = 'pressed';
											game.player = null;
											game.pause(false);

											game.overlays = [
												new OverText(
													'dead',
													overtext => game.end_caption,
													overtext => ({
														x: can.width / 2,
														y: can.height / 2
													}),
													1000,
													18
												)
											];

											game.buttons.push(
												new Button(
													'next',
													'menu-button',
													lang == '#fr' ? 'Suite' : 'Next',
													btn => ({
														x: (can.width - btn.img.width * game.scale) / 2,
														y: can.height - (btn.img.height + 5) * game.scale
													}),
													btn => {
														game.getOverlay('dead').kill(400);
														btn.kill(400);
														game.speed = 1;
														game.events.push(
															new TimeEvent(500, event => {
																game.speed = 1;
																game.pause(false);
																loadPage('menu');
															})
														);
													},
													200,
													'normal',
													10
												)
											);
										})
									);
								}
							}
						})
					);
				}
			};

			game.initShop();

			game.loop = true;

			for (let mob of [...game.entities.humans, ...game.entities.sheeps]) mob.target = null;

			game.player.mana.val = 4;
		}
	);
};
