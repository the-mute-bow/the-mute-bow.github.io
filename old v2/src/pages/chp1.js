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

			game.fog = false;

			game.rain = null;

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

			game.events = [
				new TimeEvent(1000, event => {
					// if (lang == '#dev') game.initDevOverlays();
				})
			];
			game.event_map = {
				title: () => {
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
				},
				start: () => {
					game.getHuman('eliot').target = { x: 185, y: 590, obj: null };
					game.events.push(
						new TimeEvent(200, event => {
							game.mode = 'normal';
						}),
						new TimeEvent(1000, event => {
							game.initPauseButton();
							game.initCoinOverlays();
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
						click: mission => {
							setScreen('mission', {
								text: lang == '#fr' ? 'Clique sur le bouton <b>aide</b> pour revoir ce message.' : 'Click on the <b>help</b> button to see this message again.',
								img: './img/missions/move.gif',
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
									game.player.target = null;

									game.mission = {
										text:
											lang == '#fr'
												? `Pendant que tu te déplaces, tapote à droite de l'écran pour courrir. Un symbole <font color="#ccf">bleu</font> apparaît au dessus de toi.`
												: `Tap on the left side of the screen while you're moving to run. A <font color="#ccf">blue</font> symbol will appear above you.`,
										img: './img/missions/run.gif',
										click: mission => {
											setScreen('mission', {
												text:
													lang == '#fr'
														? `Courrir épuise ton endurance. Si tu es à bout de souffle, un symbole <font color="#e88">rouge</font> apparaît au dessus de toi.`
														: `Running uses your stamina. When out of breath, a <font color="#e88">red</font> symbol appears above you.`,
												img: './img/missions/run.gif',
												click: mission => {
													setScreen('mission', {
														text:
															lang == '#fr'
																? `Quand tu as repris ton souffle, un symbole <font color="#cfc">vert</font> apparaît au dessus de toi.`
																: `When you have caught your breath, a <font color="#cfc">green</font> symbol appears above you.`,
														img: './img/missions/run.gif',
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

					game.mission = {
						text:
							lang == '#fr'
								? `Tapote à gauche de l'écran quand tu ne bouges pas pour activer le mode stratégie et indiquer à tes amis où aller.`
								: `Tap the left side of the screen when you're not moving to trun on strategy mode and tell your friends where to go.`,
						img: './img/missions/strat.gif',
						click: mission => {
							setScreen('mission', {
								text:
									lang == '#fr'
										? `Tapote une fois sur Shabyn pour lui demander d'aller quelque part. Fais la glisser avec ton doigt pour lui indiquer où aller et amène-la dans le cercle.`
										: `Tap Shabyn once to ask her to go somewhere. Slide her with your finger to tell her where to go and bring her into the circle.`,
								img: './img/missions/strat.gif',
								click: mission => {
									setScreen('mission', {
										text: lang == '#fr' ? `Pour quitter le mode stratégie tapotte à nouveau sur l'écran.` : `To exit strategy mode tap again on the screen.`,
										img: './img/missions/strat.gif',
										click: mission => {
											setScreen('game');
										}
									});
								}
							});
						}
					};

					game.events.push(
						new TimeEvent(1000, event => {
							game.dialog = {
								character: 'shabyn',
								text: lang == '#fr' ? "C'est pas juste! Tu cours trop vite! Bref, c'est dans quelle direction?" : "It's not fair! You run too fast! Anyway, which direction is it?",
								click: dialog => {
									game.dialog = null;
									game.player.target = { x: 305, y: 425, obj: null };
									game.getHuman('shabyn').target = null;

									setScreen('mission', game.mission);
								}
							};
						}),
						new WalkEvent(346, 410, 14, 0.9, [game.getHuman('shabyn')], 'all', 'in', 'white', event => {
							game.triggerEvent('follow');
						})
					);
				},
				follow: () => {
					game.getHuman('shabyn').target = { x: 340, y: 394, obj: null };
					game.player.target = { x: 328, y: 388, obj: null };

					game.mission = {
						text: lang == '#fr' ? `Utilise à nouveau le mode stratégie pour demander à Shabyn de te suivre en tapotant un nouvelle fois sur elle.` : `Use strategy mode again to ask Shabyn to follow you by tapping on her again.`,
						img: './img/missions/follow.gif',
						click: mission => {
							setScreen('game');
						}
					};

					game.events.push(
						new WalkEvent(346, 410, 14, 0.7, [game.player, game.getHuman('shabyn')], 'all', 'in', 'white', event => {
							game.dialog = {
								character: 'shabyn',
								text: lang == '#fr' ? 'Bon, je te suis.' : 'Well, I follow you.',
								click: dialog => {
									game.dialog = null;
									game.player.target = null;

									setScreen('mission', game.mission);
								}
							};
						}),
						new WalkEvent(330, 300, 16, 0.9, [game.player, game.getHuman('shabyn')], 'all', 'in', 'white', event => {
							game.triggerEvent('reunion');
						})
					);
				},
				reunion: () => {
					game.getButton('mission').kill(500);
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
						click: mission => {
							setScreen('mission', {
								text: lang == '#fr' ? `Utilise le joystick droit pour viser un mouton et lâche pour décocher.` : `Use the right joystick to aim at a sheep and let go to shoot.`,
								img: './img/missions/shoot.gif',
								click: mission => {
									setScreen('mission', {
										text: lang == '#fr' ? `Tu peux ramasser tes flèches pour les réutiliser.` : `You can pick up your arrows to reuse them.`,
										img: './img/missions/shoot.gif',
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
											game.triggerEvent('special_shoot');
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
						text: lang == '#fr' ? `Ramasse les perles de mana, elles sont précieuses.` : `Pick up the mana pearls, they are precious.`,
						img: './img/missions/mana.gif',
						click: mission => {
							setScreen('mission', {
								text: lang == '#fr' ? `Pendant que tu vises, tapote à gauche de l'écran pour transférer du mana à ta flèche.` : `While aiming, tap the left side of the screen to transfer mana to your arrow.`,
								img: './img/missions/mana.gif',
								click: mission => {
									setScreen('mission', {
										text:
											lang == '#fr'
												? `Ensuite replace ton doigt sur la droite de l'écran après avoir décoché. La flèche suivra les mouvements de ton doigt.`
												: `Then replace your finger on the right of the screen after letting go. The arrow will follow the movements of your finger.`,
										img: './img/missions/mana.gif',
										click: mission => {
											setScreen('mission', {
												text: lang == '#fr' ? `Touche plusieurs fois les moutons avec une seule flèche pour continuer.` : `Hit the sheeps several times with one arrow to continue.`,
												img: './img/missions/mana.gif',
												click: mission => {
													setScreen('game');
												}
											});
										}
									});
								}
							});
						}
					};

					game.events.push(
						new TimeEvent(1000, event => {
							game.dialog = {
								character: 'piet',
								text: lang == '#fr' ? `Tiens, des perles de mana, on va s'amuser.` : `Here, mana pearls, let's have fun.`,
								click: dialog => {
									game.dialog = null;
									setScreen('mission', game.mission);
									let pos = game.getHuman('piet').getFeet();
									game.entities.particles.push(new Drop({ x: pos.x, y: pos.y + 10, z: Math.random() * 3 + 3 }, 'mana'));

									game.events.push(
										new GameEvent(event => {
											if (game.player.arrow && game.player.arrow.hits >= 4) {
												game.touches.R = null;
												game.events.push(
													new TimeEvent(1000, event => {
														game.events = [];
														game.triggerEvent('explanations');
													})
												);
											}
										}),

										new GameEvent(event => {
											if (game.player.arrow) event.arrow = game.player.arrow;

											if (event.arrow && event.arrow.level == 2 && event.arrow.stuck) {
												event.arrow = null;
												game.events.push(
													new TimeEvent(1000, event => {
														game.dialog = {
															character: 'piet',
															text: lang == '#fr' ? `Pas grave, ça fait longtemps. Tiens, réessaye.` : `It's okay, it's been a long time. Here, try again.`,
															click: dialog => {
																game.dialog = null;
																let pos = game.getHuman('piet').getFeet();
																game.entities.particles.push(new Drop({ x: pos.x, y: pos.y + 10, z: Math.random() * 3 + 3 }, 'mana'));
															}
														};
													})
												);
											}
										})
									);
								}
							};
						})
					);
				},
				explanations: () => {
					game.dialog = {
						character: 'lea',
						text: lang == '#fr' ? 'Wow... comment tu fais ça?' : 'Wow... how do you do that?',
						click: dialog => {
							game.dialog = {
								character: 'shabyn',
								text:
									lang == '#fr'
										? `Il y a environ trois ans, des fermiers ont signalé qu'une partie de leur bétail avait été tué par une ou plusieurs bêtes. Au départ on avait pensé à des loups mais ça fait des années qu'ils ont disparus de la région du coup on est allés voir sur place avec un vétérinaire.`
										: `About three years ago, farmers reported that part of their cattle had been killed by one or more animals. At first we thought of wolves but it's been years since they disappeared from the region so we went to see on site with a veterinarian.`,
								click: dialog => {
									game.dialog = {
										character: 'lea',
										text: lang == '#fr' ? `Et alors? C'était quoi?` : `So? What was it?`,
										click: dialog => {
											game.dialog = {
												character: 'piet',
												text:
													lang == '#fr' ? `On ne se souvient de rien. On s'est réveillés dans un endroit étrange sans aucun souvenir.` : `We don't remember anything. We woke up in a strange place with no memory.`,
												click: dialog => {
													game.dialog = {
														character: 'shabyn',
														text:
															lang == '#fr'
																? `C'est là qu'on s'est rendus compte qu'Eliot n'entendais plus rien... Et dans les semaines qui on suivi il s'est découvert des talents spéciaux. Comme ce qu'il vient de faire avec cette perle violette.`
																: `That's when we realized that Eliot couldn't hear anything anymore... And in the weeks that followed he discovered himself some special talents. Like what he just did with that purple pearl.`,
														click: dialog => {
															game.dialog = {
																character: 'lea',
																text: lang == '#fr' ? `Et le vetérinaire?` : `What about the vet?`,
																click: dialog => {
																	game.dialog = {
																		character: 'shabyn',
																		text:
																			lang == '#fr'
																				? `Disparu... On ne se souvient même plus de qui il était. Au fait Piet, pourquoi il manque une barrière à ton enclos?`
																				: `Gone... We don't even remember who he was. By the way Piet, why is a fence missing to your enclosure?`,
																		click: dialog => {
																			game.dialog = {
																				character: 'piet',
																				text:
																					lang == '#fr'
																						? `Justement c'est pour ça que je nous ai réunis. J'ai perdu un mouton cette nuit et je ne suis pas le seul dans la région. Encore une fois, on dirait qu'ils ont étés tués par une bête mais impossible de dire laquelle. Tout ce que je sais c'est qu'elle a réussi à casser la barrière.`
																						: `That's why I brought us together. I lost a sheep last night and I'm not the only one in the area. Again it looks like they were killed by a beast but can't tell which one. All I know is that it was able to break the fence.`,
																				click: dialog => {
																					game.dialog = {
																						character: 'lea',
																						text:
																							lang == '#fr'
																								? `J'ai examiné le cadavre, il y a un détail qui m'a laissée perplexe: ses yeux sont blancs.`
																								: `I examined the corpse, there is one detail that left me perplexed: its eyes are white.`,
																						click: dialog => {
																							game.dialog = {
																								character: 'shabyn',
																								text: lang == '#fr' ? `Étrange...` : `That's stange...`,
																								click: dialog => {
																									game.dialog = {
																										character: 'piet',
																										text:
																											lang == '#fr'
																												? `Eliot tu peux m'aider à réparer l'enclos? Je vais faire entrer les moutons.`
																												: `Eliot can you help me fix the enclosure? I'll bring in the sheep.`,
																										click: dialog => {
																											game.dialog = {
																												character: 'piet',
																												text: lang == '#fr' ? `<b>Siffle</b> Allez les moutons on rentre!` : `<b>Whistles</b> Come on sheep, get in!`,
																												click: dialog => {
																													game.dialog = null;
																													game.triggerEvent('push_sheep');
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
				},
				push_sheep: () => {
					game.mission = {
						text: lang == '#fr' ? `Pousse le mouton dans l'enclos pour le refermer.` : `Push the sheep into the enclosure in order to close it.`,
						img: './img/missions/sheep.gif',
						click: mission => {
							setScreen('game');
						}
					};

					game.getHuman('lea').target = { x: 214, y: 130, obj: null };
					game.getHuman('piet').target = { x: 230, y: 128, obj: null };
					game.getHuman('shabyn').target = { x: 274, y: 132, obj: null };

					game.entities.sheeps[0].target = { x: 260, y: 132, obj: null };
					game.entities.sheeps[2].target = null;

					game.events.push(
						new WalkEvent(251, 121, 26, 0.7, game.entities.sheeps, 'all', 'in', 'white', event => {
							game.triggerEvent('cut_tree');
						}),
						new TimeEvent(1000, event => {
							game.entities.sheeps[1].target = { x: 260, y: 130, obj: null };
						}),
						new TimeEvent(3000, event => {
							game.entities.sheeps[0].target = { x: 246, y: 92, obj: null };
							game.entities.sheeps[1].target = { x: 246, y: 92, obj: null };
						}),
						new TimeEvent(5000, event => {
							game.entities.sheeps[1].target = { x: 226, y: 96, obj: null };
							game.dialog = {
								character: 'piet',
								text: lang == '#fr' ? `Tiens... On dirait qu'il y en a un qui n'entend pas. Tu peux le pousser à l'intérieur?` : `Look... Seems like this one doesn't hear. Can you push him inside?`,
								click: dialog => {
									game.dialog = null;
									setScreen('mission', game.mission);
								}
							};
						})
					);
				},
				cut_tree: () => {
					game.mission = {
						text:
							lang == '#fr'
								? `Tapote à droite de l'écran pour changer d'arme et sélectionne la hache. Approche-toi d'un arbre, vise et relâche pour donner un coup de hache.`
								: `Tap to the right side of the screen to change weapons and select the axe. Approach a tree then aim and release to chop it.`,
						img: './img/missions/axe1.gif',
						click: mission => {
							setScreen('mission', {
								text: lang == '#fr' ? `Continue jusqu'à ce que l'arbre soit coupé puis ramasse les branches au sol.` : `Continue until the tree is cut, then pick up the branches on the ground.`,
								img: './img/missions/axe2.gif',
								click: mission => {
									setScreen('game');
								}
							});
						}
					};

					game.player.weapons.axe = true;

					game.events.push(
						new TimeEvent(1000, event => {
							game.dialog = {
								character: 'piet',
								text: lang == '#fr' ? `Mince on n'a pas assez de bois. Il faut aller en chercher.` : `Oh crap, we don't have enough wood. You have to go get some.`,
								click: dialog => {
									game.dialog = null;
									setScreen('mission', game.mission);
								}
							};
						}),
						new GameEvent(event => {
							if (game.player.wood.val >= 10) {
								event.done = true;
								game.events.push(
									new TimeEvent(1000, event => {
										game.dialog = {
											character: 'piet',
											text: lang == '#fr' ? `Je crois que ça va suffire, reviens!` : `I think that's enough, come back!`,
											click: dialog => {
												game.dialog = null;
												game.triggerEvent('fence');
											}
										};
									})
								);
							}
						})
					);
				},
				fence: () => {
					game.mission = {
						text:
							lang == '#fr'
								? `Tu as une réserve limitée de bois. Une flèche te coûte 1 bout de bois, et pour poser une barrière il t'en faut 10.`
								: `You have a limited supply of wood. An arrow costs you 1 piece of wood, and to place a fence you need 10.`,
						img: './img/missions/fence.gif',
						click: mission => {
							setScreen('mission', {
								text: lang == '#fr' ? `Vise l'endroit où tu veux mettre la barrière avec le joystick droit et relâche pour poser.` : `Aim where you want the fence to be with the right joystick and let go to place it.`,
								img: './img/missions/fence.gif',
								click: mission => {
									setScreen('game');
								}
							});
						}
					};

					game.player.weapons.fence = true;
					game.player.wood.val = 10;

					game.events.push(
						new WalkEvent(260, 160, 32, 1, [game.player], 'all', 'in', null, event => {
							game.getHuman('piet').event = () => {
								game.getHuman('piet').event = null;
								game.getHuman('eliot').weapons.fence = true;

								game.dialog = {
									character: 'piet',
									text: lang == '#fr' ? `Bien, maintenant tu peux refermer l'enclos.` : 'Okay, now you can close the enclosure.',
									click: dialog => {
										game.dialog = null;
										setScreen('mission', game.mission);
									}
								};
							};
						})
					);

					game.events.push(
						new GameEvent(event => {
							if (game.entities.buildings.length > 8) {
								event.done = true;
								game.triggerEvent('end');
							}
						})
					);
				},
				end: () => {
					game.events.push(
						new TimeEvent(1000, event => {
							game.events.push(
								new TimeEvent(1500, event => {
									game.cam.targ_o = 1;
								}),
								new TimeEvent(4000, event => {
									if (getCookie('chapter') < 2) setCookie('chapter', 2);
									loadPage('chplist');
								})
							);

							for (let h of game.entities.humans) {
								game.events.push(
									new TimeEvent(Math.random() * 1000, event => {
										h.target = { x: 400, y: 130, obj: null };
									})
								);
							}

							game.dialog = {
								character: 'piet',
								text: lang == '#fr' ? `Parfait! Ou presque...` : `Perfect! Or almost...`,
								click: dialog => {
									game.dialog = {
										character: 'shabyn',
										text: lang == '#fr' ? `C'est bien tout ça mais moi j'ai faim!` : `All that is good but I'm hungry!`,
										click: dialog => {
											game.dialog = {
												character: 'lea',
												text: lang == '#fr' ? `Je suis d'accord! Venez à l'intérieur, Piet a tenté de cuisiner.` : `I agree! Come inside, Piet tried to cook.`,
												click: dialog => {
													game.dialog = null;
													game.dialog = {
														character: 'piet',
														text:
															lang == '#fr'
																? `Elle m'a empêché de brûler la cuisine... Prenons des forces, demain on va voir le vieux M. Vandebroek. Il a le plus grand troupeau de moutons du village. C'est là qu'on devrait avoir le plus de chances de trouver la bête.`
																: `She kept me from burning the kitchen... Let's get some strength, tomorrow we're going to see old Mr. Vandebroek. He has the largest flock of sheep in the village. This is where we should have the best chance of finding the beast.`,
														click: dialog => {
															game.dialog = null;
														}
													};
												}
											};
										}
									};
								}
							};
						})
					);
				}
			};

			game.initShop();

			game.loop = true;

			for (let mob of game.entities.humans)
				mob.weapons = {
					bow: false,
					axe: false,
					fence: false,
					echo: false
				};
		}
	);
};
