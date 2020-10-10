pages['chp1'] = game => {
	game.images = [];
	game.sounds = {
		click: new Audio('./sounds/click.mp3')
	};

	game.soundtrack = null;

	game.loadImg(
		[
			'ground1.png',
			'buildings/small-house1.png',
			'buildings/small-house1-shadow.png',

			'coin.png',
			'arrow-bonus.png',

			'trees/pine1.png',
			'trees/pine1-shadow.png',
			'trees/pine2.png',
			'trees/pine2-shadow.png',
			'trees/pine3.png',
			'trees/pine3-shadow.png',
			'trees/pine4.png',
			'trees/pine4-shadow.png',
			'trees/tree-calc.png',

			'mobs/sheep.png',
			'mobs/sheep-shadow.png',

			'humans/human-shadow.png',
			'humans/eliot.png',
			'humans/lea.png',
			'humans/piet.png',
			'humans/shabyn.png',
			'humans/creature.png',

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
			'weapons/fence.png',
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
			game.variant = '';
			game.ground = game.images['ground1' + game.variant];
			game.tree_calc = game.images['tree-calc' + game.variant];
			game.can.width = game.ground.width;
			game.can.height = game.ground.height;

			game.bg_color = '#323c2e';
			game.leave_color = '#323c2e';
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
				sheeps: [new Sheep({ x: 218, y: 152, z: 0 }), new Sheep({ x: 232, y: 168, z: 0 }), new Sheep({ x: 208, y: 168, z: 0 })],
				humans: [new Human('eliot', { x: 114, y: 615, z: 0 }), new Human('lea', { x: 240, y: 136, z: 0 }), new Human('shabyn', { x: 240, y: 570, z: 0 }), new Human('piet', { x: 250, y: 130, z: 0 })],
				creatures: [],
				particles: []
			};

			for (let coords of treeList) game.entities.trees.push(new Tree(coords, 0));

			game.player = game.getHuman('eliot');
			game.player.target = null;

			game.fog_map = null;

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
			game.mission = null;

			game.mode = 'title';

			game.buttons = [];
			game.overlays = [];

			game.events = [];
			game.event_map = {
				title: () => {
					if (lang != '#dev') {
						game.player = null;
						game.mode = 'title';
						game.strat_fog = 1;

						game.events.push(
							new TimeEvent(1000, event => {
								game.overlays.push(
									new OverText(
										'text1',
										overtext => (lang == '#fr' ? 'Quand je tire une flèche...' : 'When I shoot an arrow...'),
										overtext => ({
											x: can.width / 2,
											y: can.height / 2
										}),
										1800,
										6,
										'#cdcad3'
									)
								);
							}),

							new TimeEvent(4000, event => {
								for (let o of game.overlays) o.kill(500);

								game.overlays.push(
									new OverText(
										'text1',
										overtext => (lang == '#fr' ? 'et que je sens la corde de mon arc...' : 'and feel the string of my bow...'),
										overtext => ({
											x: can.width / 2,
											y: can.height / 2
										}),
										1800,
										6,
										'#cdcad3'
									)
								);
							}),

							new TimeEvent(7000, event => {
								for (let o of game.overlays) o.kill(500);

								game.overlays.push(
									new OverText(
										'text1',
										overtext => (lang == '#fr' ? 'vibrer jusque dans mon bras...' : 'vibrate up into my arm...'),
										overtext => ({
											x: can.width / 2,
											y: can.height / 2
										}),
										1800,
										6,
										'#cdcad3'
									)
								);
							}),

							new TimeEvent(10000, event => {
								for (let o of game.overlays) o.kill(500);

								game.overlays.push(
									new OverText(
										'text1',
										overtext => (lang == '#fr' ? "c'est comme si je pouvais entendre..." : "it's like I could hear..."),
										overtext => ({
											x: can.width / 2,
											y: can.height / 2
										}),
										1800,
										6,
										'#cdcad3'
									)
								);
							}),

							new TimeEvent(13000, event => {
								for (let o of game.overlays) o.kill(500);

								game.overlays.push(
									new OverText(
										'text1',
										overtext => (lang == '#fr' ? 'la flèche prendre son envol.' : 'the arrow take off.'),
										overtext => ({
											x: can.width / 2,
											y: can.height / 2
										}),
										1800,
										6,
										'#cdcad3'
									)
								);
							}),

							new TimeEvent(15000, event => {
								for (let o of game.overlays) o.kill(1000);
							}),

							new TimeEvent(16000, event => {
								game.overlays.push(
									new OverText(
										'title',
										overtext => (lang == '#fr' ? 'Chapitre 1' : 'Chapter 1'),
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

							new TimeEvent(17500, event => {
								game.overlays.push(
									new OverText(
										'title2',
										overtext => (lang == '#fr' ? 'Retrouvailles.' : 'Reunion.'),
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

							new TimeEvent(20000, event => {
								for (let o of game.overlays) o.kill(1000);
							}),

							new TimeEvent(21000, event => {
								game.triggerEvent('start');
							})
						);
					} else {
						game.triggerEvent('eliot_shoot');
						game.getHuman('eliot').pos = { x: 284, y: 156, z: 0 };
						game.getHuman('piet').pos = { x: 256, y: 148, z: 0 };
						game.getHuman('shabyn').pos = { x: 270, y: 140, z: 0 };
						game.getHuman('shabyn').target = { x: 270, y: 140, obj: null };
						game.cam.x = game.getHuman('eliot').pos.x;
						game.cam.y = game.getHuman('eliot').pos.y;
					}
				},
				start: () => {
					game.getHuman('eliot').target = { x: 185, y: 590, obj: null };
					game.mode = 'normal';
					game.events.push(
						new TimeEvent(1000, event => {
							game.initPauseButton();
							game.initCoinOverlays();
							// if (lang == '#dev') game.initDevOverlays();
						}),
						new TimeEvent(6000, event => {
							game.player = game.getHuman('eliot');
							game.getHuman('shabyn').event = () => {
								game.getHuman('shabyn').event = null;
								game.dialog = {
									character: 'shabyn',
									text: lang == '#fr' ? 'Dépèche-toi Eliot! Je suis pressée de revoir Piet!' : "Hurry up Eliot! I can't wait to see Scott again!",
									click: dialog => {
										game.dialog = {
											character: 'eliot',
											text: '...',
											click: dialog => {
												game.triggerEvent('walk');
											}
										};
									}
								};
							};
						})
					);
				},
				walk: () => {
					game.dialog = null;
					game.player.target = null;

					game.mission = {
						text: lang == '#fr' ? 'Utilise le joystick gauche pour te déplacer et rejoins Shabyn.' : 'Use the left joystick to move and meet Shabyn.',
						img: './img/missions/move.gif',
						pixelated: true,
						click: mission => {
							setScreen('mission', {
								text: lang == '#fr' ? 'Clique sur le bouton <b>aide</b> pour revoir ce message.' : 'Click on the <b>help</b> button to see this message again.',
								img: './img/missions/move.gif',
								pixelated: true,
								click: mission => {
									setScreen('game');
								}
							});
						}
					};

					setScreen('mission', game.mission);

					game.events.push(
						new TimeEvent(1000, event => {
							game.initMissionButton();
						}),

						new WalkEvent(250, 597, 16, 0.7, [game.player, game.getHuman('shabyn')], 'all', 'in', 'white', event => {
							game.triggerEvent('run');
						})
					);
				},
				run: () => {
					game.getHuman('shabyn').target = { x: 266, y: 562, obj: null };
					game.cam.target = game.getHuman('shabyn');
					game.player.target = { x: 242, y: 580, obj: null };
					game.player = null;

					game.events.push(
						new TimeEvent(2300, event => {
							game.getHuman('shabyn').target = { x: 290, y: 560, obj: null };
							game.cam.target = game.getHuman('eliot');

							game.dialog = {
								character: 'shabyn',
								text: lang == '#fr' ? 'Je suis plus rapide que toi!' : "I'm faster than you!",
								click: dialog => {
									game.dialog = null;
									game.getHuman('shabyn').target = { x: 320, y: 450, obj: null };
									game.player = game.getHuman('eliot');
									game.player.target = null;

									game.mission = {
										text:
											lang == '#fr'
												? `Pendant que tu te déplaces, tapote à droite de l'écran pour courrir. Un symbole <font color="#ccf">bleu</font> apparaît au dessus de toi.`
												: `Tap on the left side of the screen while you're moving to run. A <font color="#ccf">blue</font> symbol will appear above you.`,
										img: './img/missions/run.gif',
										pixelated: true,
										click: mission => {
											setScreen('mission', {
												text:
													lang == '#fr'
														? `Courrir épuise ton endurance. Si tu es à bout de souffle, un symbole <font color="#e88">rouge</font> apparaît au dessus de toi.`
														: `Running uses your stamina. When out of breath, a <font color="#e88">red</font> symbol appears above you.`,
												img: './img/missions/run.gif',
												pixelated: true,
												click: mission => {
													setScreen('mission', {
														text:
															lang == '#fr'
																? `Quand tu as repris ton souffle, un symbole <font color="#cfc">vert</font> apparaît au dessus de toi.`
																: `When you have caught your breath, a <font color="#cfc">green</font> symbol appears above you.`,
														img: './img/missions/run.gif',
														pixelated: true,
														click: mission => {
															setScreen('game');
														}
													});
												}
											});
										}
									};

									setScreen('mission', game.mission);

									game.events.push(
										new WalkEvent(324, 470, 16, 0.7, [game.player, game.getHuman('shabyn')], 'all', 'in', 'white', event => {
											game.triggerEvent('strat');
										})
									);
								}
							};
						})
					);
				},
				strat: () => {
					game.player.target = { x: 308, y: 448, obj: null };
					game.player = null;

					game.events.push(
						new TimeEvent(1000, event => {
							game.dialog = {
								character: 'shabyn',
								text: lang == '#fr' ? "C'est pas juste! Tu cours trop vite! Bref, c'est dans quelle direction?" : "It's not fair! You run too fast! Anyway, which direction is it?",
								click: dialog => {
									game.dialog = null;
									game.player = game.getHuman('eliot');
									game.player.target = { x: 305, y: 425, obj: null };
									game.getHuman('shabyn').target = null;

									game.mission = {
										text:
											lang == '#fr'
												? `Tapote à gauche de l'écran quand tu ne bouges pas pour activer le mode stratégie et indiquer à tes amis où aller.`
												: `Tap the left side of the screen when you're not moving to trun on strategy mode and tell your friends where to go.`,
										img: './img/missions/strat.gif',
										pixelated: true,
										click: mission => {
											setScreen('mission', {
												text:
													lang == '#fr'
														? `Tapote une fois sur Shabyn pour lui demander d'aller quelque part. Fais la glisser avec ton doigt pour lui indiquer où aller et amène-la dans le cercle.`
														: `Tap Shabyn once to ask her to go somewhere. Slide her with your finger to tell her where to go and bring her into the circle.`,
												img: './img/missions/strat.gif',
												pixelated: true,
												click: mission => {
													setScreen('mission', {
														text: lang == '#fr' ? `Pour quitter le mode stratégie tapotte à nouveau sur l'écran.` : `To exit strategy mode tap again on the screen.`,
														img: './img/missions/strat.gif',
														pixelated: true,
														click: mission => {
															setScreen('game');
														}
													});
												}
											});
										}
									};

									game.events.push(
										new WalkEvent(346, 410, 14, 0.7, [game.getHuman('shabyn')], 'all', 'in', 'white', event => {
											game.triggerEvent('follow');
										})
									);

									setScreen('mission', game.mission);
								}
							};
						})
					);
				},
				follow: () => {
					game.events.push(
						new WalkEvent(346, 410, 14, 0.7, [game.player, game.getHuman('shabyn')], 'all', 'in', 'white', event => {
							game.dialog = {
								character: 'shabyn',
								text: lang == '#fr' ? 'Bon, je te suis.' : 'Well, I follow you.',
								click: dialog => {
									game.dialog = null;
									game.player = game.getHuman('eliot');
									game.player.target = null;

									game.mission = {
										text:
											lang == '#fr'
												? `Utilise à nouveau le mode stratégie pour demander à Shabyn de te suivre en tapotant un nouvelle fois sur elle.`
												: `Use strategy mode again to ask Shabyn to follow you by tapping on her again.`,
										img: './img/missions/follow.gif',
										pixelated: true,
										click: mission => {
											setScreen('game');
										}
									};

									game.events.push(
										new WalkEvent(330, 300, 14, 0.9, [game.getHuman('shabyn')], 'all', 'in', 'white', event => {
											game.triggerEvent('reunion');
										})
									);

									setScreen('mission', game.mission);
								}
							};
						})
					);
					game.getHuman('shabyn').target = { x: 340, y: 394, obj: null };
					game.player.target = { x: 328, y: 388, obj: null };
					game.player = null;
				},
				reunion: () => {
					game.cam.target = game.getHuman('piet');
					game.events.push(
						new TimeEvent(3000, event => {
							game.cam.target = game.player;
						}),

						new TimeEvent(5000, event => {
							game.dialog = {
								character: 'shabyn',
								text: lang == '#fr' ? 'On est arrivés! Allez viens!' : 'We arrived! Come on!',
								click: dialog => {
									game.dialog = null;
									game.getHuman('shabyn').target = { x: 268, y: 138, obj: null };
								}
							};
						}),

						new WalkEvent(266, 160, 34, 1, game.entities.humans, 'all', 'in', null, event => {
							game.getHuman('piet').event = () => {
								game.getHuman('piet').event = null;
								game.dialog = {
									character: 'piet',
									text: lang == '#fr' ? 'Shabyn! Eliot! Content de vous revoir!' : 'Shabyn! Eliot! Happy to see you again!',
									click: dialog => {
										game.dialog = {
											character: 'shabyn',
											text: lang == '#fr' ? `Piet! Tu m'as... <b>hum</b> Tu <i>nous</i> as manqués!` : `Piet! I... <b>hum</b> <i>we</i> missed you!`,
											click: dialog => {
												game.dialog = {
													character: 'piet',
													text: lang == '#fr' ? `Je vous présente Léa, ma cousine.` : `This is Léa, my cousin.`,
													click: dialog => {
														game.dialog = {
															character: 'lea',
															text:
																lang == '#fr'
																	? `Salut! Piet m'a beaucoup parlé de vous. Surtout de toi Eliot... Il dit que tu es très doué à l'arc.`
																	: `Hi! Piet told me a lot about you. Especially about you Eliot... He says you're very good at archery.`,
															click: dialog => {
																game.dialog = {
																	character: 'eliot',
																	text: '...',
																	click: dialog => {
																		game.dialog = {
																			character: 'shabyn',
																			text:
																				lang == '#fr'
																					? `C'est vrai, il est le meilleur! Mais ne t'attend pas à ce qu'il te réponde. Il ne parle pas, il est sourd-muet...`
																					: `That's right, he's the best! But don't expect him to answer you. He does not speak, he is deaf and mute...`,
																			click: dialog => {
																				game.dialog = {
																					character: 'piet',
																					text:
																						lang == '#fr'
																							? `Dans la région tout le monde le surnomme "l'arc muet". Mais ne t'inquiète pas il lit sur les lèvres.`
																							: `In the region everyone call him "the mute bow". But don't worry he reads lips.`,
																					click: dialog => {
																						game.dialog = {
																							character: 'piet',
																							text:
																								lang == '#fr'
																									? `D'ailleurs pourquoi ne pas lui montrer tes talents à tire-mouton?`
																									: `By the way, why not show him your talents at shoot-sheep?`,
																							click: dialog => {
																								game.dialog = {
																									character: 'shabyn',
																									text: lang == '#fr' ? `On n'y a pas joué depuis plus de dix ans...` : `We haven't played it for over ten years...`,
																									click: dialog => {
																										game.dialog = {
																											character: 'lea',
																											text: lang == '#fr' ? `En quoi ça consiste?` : `What is it about?`,
																											click: dialog => {
																												game.dialog = {
																													character: 'piet',
																													text:
																														lang == '#fr'
																															? `On tire à l'arc sur les moutons en ne touchant que la laine.`
																															: `We shoot the sheeps with a bow, touching only the wool.`,
																													click: dialog => {
																														game.dialog = {
																															character: 'lea',
																															text: lang == '#fr' ? `Mais vous risquez de les blesser!` : `But you risk hurting them!`,
																															click: dialog => {
																																game.dialog = {
																																	character: 'piet',
																																	text:
																																		lang == '#fr'
																																			? `Mais non, on sait où viser! Et puis dans le pire des cas on a une vétérinaire sur le terrain!`
																																			: `Come on, we know where to aim! And in the worst case we have a veterinarian on place!`,
																																	click: dialog => {
																																		game.dialog = {
																																			character: 'lea',
																																			text: lang == '#fr' ? `Très rassurant...` : `Very reassuring...`,
																																			click: dialog => {
																																				game.dialog = {
																																					character: 'piet',
																																					text: lang == '#fr' ? `Tiens, je vais te montrer.` : `Here, I will show you.`,
																																					click: dialog => {
																																						game.dialog = null;
																																						game.triggerEvent('piet_shoot');
																																					}
																																				};
																																			}
																																		};
																																	}
																																};
																															}
																														};
																													}
																												};
																											}
																										};
																									}
																								};
																							}
																						};
																					}
																				};
																			}
																		};
																	}
																};
															}
														};
													}
												};
											}
										};
									}
								};
							};
						})
					);
				},
				piet_shoot: () => {
					game.player = null;
					game.getHuman('shabyn').target = { x: 280, y: 140, obj: null };
					game.getHuman('eliot').target = { x: 284, y: 156, obj: null };
					game.getHuman('piet').target = { x: 256, y: 148, obj: null };
					game.cam.target = game.getHuman('piet');
					game.events.push(
						new TimeEvent(1000, event => {
							game.getHuman('piet').setWeapon('bow');
						}),
						new TimeEvent(2000, event => {
							game.getHuman('piet').enemies = 'sheeps';
						}),
						new TimeEvent(4000, event => {
							game.getHuman('piet').enemies = 'creatures';
						}),
						new TimeEvent(5000, event => {
							game.dialog = {
								character: lang == '#fr' ? 'mouton' : 'sheep',
								text: `Meh.`,
								click: dialog => {
									game.dialog = {
										character: 'shabyn',
										text: 'Sa té Piet.',
										click: dialog => {
											game.dialog = {
												character: 'piet',
												text: lang == '#fr' ? `Vas-y Eliot, Montre-lui.` : `Come on Eliot, Show her.`,
												click: dialog => {
													game.dialog = null;
													game.triggerEvent('eliot_shoot');
												}
											};
										}
									};
								}
							};
						})
					);
				},
				eliot_shoot: () => {
					game.player = game.getHuman('eliot');
					game.cam.target = game.player;
					game.getHuman('eliot').target = { x: 258, y: 154, obj: null };
					game.getHuman('piet').target = { x: 255, y: 136, obj: null };

					game.mission = {
						text: lang == '#fr' ? `Tapote à droite de l'écran pour changer d'arme et sélectionne ton arc.` : `Tap on the right side of the screen to change weapons and select your bow.`,
						img: './img/missions/shoot.gif',
						pixelated: true,
						click: mission => {
							setScreen('mission', {
								text: lang == '#fr' ? `Utilise le joystick droit pour viser un mouton et lâche pour décocher.` : `Use the right joystick to aim at a sheep and let go to shoot.`,
								img: './img/missions/shoot.gif',
								pixelated: true,
								click: mission => {
									setScreen('mission', {
										text: lang == '#fr' ? `Tu peux ramasser tes flèches pour les réutiliser.` : `You can pick up your arrows to reuse them.`,
										img: './img/missions/shoot.gif',
										pixelated: true,
										click: mission => {
											setScreen('game');
										}
									});
								}
							});
						}
					};

					game.events.push(
						new TimeEvent(3000, event => {
							setScreen('mission', game.mission);
							game.initMissionButton();
							game.player.target = null;
							game.player.weapons.bow = true;
						}),
						new GameEvent(event => {
							if (game.player.arrow && game.player.arrow.victims.length) {
								event.done = true;
								game.events.push(
									new TimeEvent(1000, event => {
										game.dialog = {
											character: 'piet',
											text: lang == '#fr' ? `N'oublie pas de rammasser tes flèches pour ne pas en manquer.` : `Don't forget to pick your arrows up so you don't run out.`,
											click: dialog => {
												game.dialog = null;
											}
										};
									}),
									new GameEvent(event => {
										if (game.player.wood.val >= 8) {
											event.done = true;
											game.events.push(
												new TimeEvent(1000, event => {
													game.triggerEvent('special_shoot');
												})
											);
										}
									})
								);
							}
						}),
						new GameEvent(event => {
							if (game.getHuman('eliot').wood.val == 0) {
								event.done = true;
								game.events.push(
									new TimeEvent(1000, event => {
										game.dialog = {
											character: 'piet',
											text: lang == '#fr' ? `Tu n'as plus de flèches. N'oublie pas de les rammasser pour ne pas en manquer.` : `You have no more arrows. Don't forget to pick them up so you don't run out.`,
											click: dialog => {
												game.dialog = null;
											}
										};
									})
								);
							}
						})
					);
				},
				special_shoot: () => {
					game.mission = {
						text: lang == '#fr' ? `Tapote à droite de l'écran pour changer d'arme et sélectionne ton arc.` : `Tap on the right side of the screen to change weapons and select your bow.`,
						img: './img/missions/shoot.gif',
						pixelated: true,
						click: mission => {
							setScreen('mission', {
								text: lang == '#fr' ? `Utilise le joystick droit pour viser un mouton et lâche pour décocher.` : `Use the right joystick to aim at a sheep and let go to shoot.`,
								img: './img/missions/shoot.gif',
								pixelated: true,
								click: mission => {
									setScreen('mission', {
										text: lang == '#fr' ? `Tu peux ramasser tes flèches pour les réutiliser.` : `You can pick up your arrows to reuse them.`,
										img: './img/missions/shoot.gif',
										pixelated: true,
										click: mission => {
											setScreen('game');
										}
									});
								}
							});
						}
					};

					game.dialog = {
						character: 'piet',
						text: lang == '#fr' ? `Tiens, des perles de mana, on va s'amuser.` : `Here, mana pearls, let's have fun.`,
						click: dialog => {
							game.dialog = null;
						}
					};
				}
			};

			game.initShop();

			game.loop = true;

			for (let mob of [...game.entities.humans, ...game.entities.sheeps])
				mob.weapons = {
					bow: false,
					axe: false,
					fence: false,
					echo: false
				};
		}
	);
};
