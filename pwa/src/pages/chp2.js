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
					new Fence({ x: 218, y: 83, z: 0 }, 0),
					new Fence({ x: 244, y: 82, z: 0 }, 0)
				],
				trees: [],
				sheeps: [new Sheep({ x: 224, y: 108, z: 0 }), new Sheep({ x: 220, y: 150, z: 0 })],
				humans: [new Human('eliot', { x: 325, y: 119, z: 0 }), new Human('lea', { x: 315, y: 118, z: 0 }), new Human('shabyn', { x: 308, y: 119, z: 0 }), new Human('piet', { x: 318, y: 124, z: 0 })],
				creatures: [],
				particles: []
			};

			for (let coords of treeList) game.entities.trees.push(new Tree(coords, 0));

			game.player = game.getHuman('eliot');
			game.player.target = null;

			game.fog = true;

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
				text: lang == '#fr' ? 'Utilise le mode stratégie pour guider tes amis dans la forêt.' : 'Use strategy mode to guide your friends through the forest.',
				img: './img/missions/chp2.gif',
				click: mission => {
					setScreen('game');
				}
			};

			game.mode = 'title';

			game.dimension = 0;
			game.fog = true;

			game.rain = null;

			game.buttons = [];
			game.overlays = [];

			game.events = [
				new TimeEvent(1000, event => {
					game.initCoinOverlays();
					game.initPauseButton();
					// if (lang == '#dev') game.initDevOverlays();
				})
			];

			game.event_map = {
				title: () => {
					if (game.checkpoint == 1) {
						game.mode = 'normal';
						game.entities.sheeps = [];

						game.getHuman('shabyn').target = { x: 318, y: 120, obj: null };
						game.getHuman('eliot').target = { x: 272, y: 128, obj: null };
						game.getHuman('piet').target = { x: 290, y: 140, obj: null };
						game.getHuman('lea').target = { x: 10, y: -6, obj: game.player };

						for (let human of game.entities.humans) {
							human.pos.x = human.getTargCoords().x;
							human.pos.y = human.getTargCoords().y;
						}

						game.triggerEvent('creature_enclosure');
						return;
					}

					if (game.checkpoint == 2) {
						game.mode = 'normal';
						game.entities.sheeps = [];

						game.soundtrack.pause();
						game.soundtrack = game.sounds.dark;

						game.getHuman('shabyn').pos = { x: 260, y: 186, z: 0 };
						game.getHuman('eliot').pos = { x: 242, y: 180, z: 0 };
						game.getHuman('piet').pos = { x: 250, y: 190, z: 0 };
						game.getHuman('lea').pos = { x: 252, y: 178, z: 0 };

						game.cam.x = game.player.pos.x + 12;
						game.cam.y = game.player.pos.y + 12;

						game.getHuman('eliot').health.val = 9;

						game.triggerEvent('creature_chase');
						game.triggerEvent('surrounded');

						return;
					}

					game.checkpoint = 0;

					game.mode = 'title';
					game.strat_fog = 1;

					game.events.push(
						new TimeEvent(1000, event => {
							game.overlays.push(
								new OverText(
									'text',
									overtext => (lang == '#fr' ? `C'est étrange.` : `It's strange.`),
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
									'text',
									overtext => (lang == '#fr' ? `Mes oreilles bourdonnent et mes yeux me font mal.` : `My ears are ringing and my eyes are aching.`),
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
									'text',
									overtext => (lang == '#fr' ? `Il se passe quelque chose.` : `Something is happening.`),
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

						new TimeEvent(9000, event => {
							for (let o of game.overlays) o.kill(500);
						}),

						new TimeEvent(10000, event => {
							for (let o of game.overlays) o.kill(500);

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

						new TimeEvent(11000, event => {
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

						new TimeEvent(14800, event => {
							for (let o of game.overlays) o.kill(1000);
						}),

						new TimeEvent(16000, event => {
							game.triggerEvent('start');
						})
					);
				},
				start: () => {
					game.mode = 'normal';
					// for (let event of ['creature_dead', 'creature_nearby', 'dead_human']) game.triggerEvent(event);

					game.getHuman('eliot').target = { x: 321, y: 128, obj: null };
					game.getHuman('lea').target = { x: 312, y: 118, obj: null };
					game.getHuman('shabyn').target = { x: 300, y: 122, obj: null };
					game.getHuman('piet').target = { x: 304, y: 133, obj: null };

					// game.triggerEvent('lets_see');
					// return;

					game.events.push(
						new TimeEvent(2000, event => {
							game.getHuman('shabyn').event = () => {
								game.getHuman('shabyn').event = null;
								game.dialog = {
									character: 'shabyn',
									text:
										lang == '#fr' ? `On est censé être en pleine lune, mais je ne la vois pas. Le ciel est complètement noir...` : `We're supposed to be on a full moon, but I can't see it. The sky is completely dark...`,
									click: dialog => {
										game.dialog = {
											character: 'lea',
											text: lang == '#fr' ? `Pareil, c'est comme si j'avais un brouillard noir devant les yeux.` : `Same, it's like I have a black fog in front of my eyes.`,
											click: dialog => {
												game.dialog = {
													character: 'piet',
													text: lang == '#fr' ? `Les moutons s'agitent, c'est peut-être la bête.` : `The sheep are agitated, it is perhaps the beast.`,
													click: dialog => {
														game.dialog = {
															character: 'lea',
															text: lang == '#fr' ? `J'en ai entendu un crier!` : `I heard one screaming!`,
															click: dialog => {
																game.dialog = {
																	character: 'shabyn',
																	text: lang == '#fr' ? `Très étrange comme cri... Il s'est arrêté brusquement.` : `Very strange scream... It stopped suddenly.`,
																	click: dialog => {
																		game.dialog = {
																			character: 'piet',
																			text: lang == '#fr' ? `Ils ne font plus aucun bruit. Allons voir.` : `They no longer make any noise. Lets go see.`,
																			click: dialog => {
																				game.dialog = null;
																				game.player.target = null;
																				game.triggerEvent('lets_see');
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
				lets_see: () => {
					game.events.push(
						new TimeEvent(200, event => {
							game.getHuman('piet').target = { x: 258, y: 119, obj: null };
							game.getHuman('eliot').target = null;
						}),
						new TimeEvent(1200, event => {
							game.getHuman('shabyn').target = { x: 248, y: 129, obj: null };
						}),
						new WalkEvent(280, 150, 24, 0.8, [game.player], 'all', 'in', 'white', event => {
							game.getHuman('lea').target = { x: 289, y: 125, obj: null };
							game.events.push(
								new TimeEvent(1000, event => {
									game.getHuman('piet').target = { x: 248, y: 100, obj: null };
									game.getHuman('eliot').target = { x: 260, y: 122, obj: null };
									game.getHuman('lea').target = { x: 270, y: 130, obj: null };
								}),
								new TimeEvent(3000, event => {
									game.getHuman('piet').event = () => {
										game.getHuman('piet').event = null;

										game.dialog = {
											character: 'piet',
											text:
												lang == '#fr'
													? `L'enclos est encore cassé, un moutons est dehors et un autre est absent... Je vois des traces de sang au sol.`
													: `The enclosure is broken again, a sheep is outside and another is absent... I see traces of blood on the ground.`,
											click: dialog => {
												game.dialog = {
													character: 'lea',
													text: lang == '#fr' ? `Vous avez pris vos arcs?` : `Did you take your bows?`,
													click: dialog => {
														game.dialog = {
															character: 'shabyn',
															text: lang == '#fr' ? `Ils sont à l'intérieur.` : `They are inside.`,
															click: dialog => {
																game.dialog = null;
																game.triggerEvent('creature_pass');
															}
														};
													}
												};
											}
										};
									};
								})
							);
						})
					);
				},
				creature_pass: () => {
					c = new Creature({ x: 330, y: 124, z: 0 });
					c.target = { x: 0, y: 0, obj: game.entities.sheeps[1] };
					c.view_distance = 200;
					game.cam.target = c;
					game.entities.creatures.push(c);

					game.events.push(
						new GameEvent(event => {
							if (game.entities.sheeps.length < 2) {
								event.done = true;
								game.entities.creatures = [];
								game.triggerEvent('dead_sheep');
							}
						})
					);
				},
				dead_sheep: () => {
					game.events.push(
						new TimeEvent(1000, event => {
							game.cam.target = game.player;
						}),
						new TimeEvent(2000, event => {
							game.dialog = {
								character: 'piet',
								text: lang == '#fr' ? `Mon mouton!` : `My sheep!`,
								click: dialog => {
									game.dialog = {
										character: 'shabyn',
										text: lang == '#fr' ? `Mais c'est quoi ce truc?!` : `What the hell is that?!`,
										click: dialog => {
											game.dialog = {
												character: 'lea',
												text: lang == '#fr' ? `Grouillez-vous à prendre vos arcs!` : `Hurry to take your bows!`,
												click: dialog => {
													game.dialog = {
														character: 'piet',
														text: lang == '#fr' ? `Shabyn, vas dans la maison prendre nos arcs. Léa, tu restes près d'Éliot.` : `Shabyn, go into the house and get our bows. Lea, you stay near Éliot.`,
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
						}),
						new TimeEvent(2100, event => {
							game.getHuman('piet').target = { x: 250, y: 150, obj: null };
							game.getHuman('shabyn').target = { x: 318, y: 120, obj: null };
							game.getHuman('lea').target = { x: 280, y: 118, obj: null };
						}),
						new TimeEvent(3000, event => {
							game.getHuman('eliot').target = { x: 272, y: 128, obj: null };
						}),
						new TimeEvent(4500, event => {
							game.getHuman('piet').target = { x: 290, y: 140, obj: null };
							game.getHuman('lea').target = { x: 10, y: -6, obj: game.player };
						}),
						new TimeEvent(8000, event => {
							game.dialog = {
								character: 'piet',
								text: lang == '#fr' ? `Mais qu'est ce que tu fous, shabyn?` : `What the hell are you doing, shabyn?`,
								click: dialog => {
									game.dialog = {
										character: 'shabyn',
										text: lang == '#fr' ? `La porte est bloquée!` : `The door is blocked!`,
										click: dialog => {
											game.dialog = {
												character: 'lea',
												text: lang == '#fr' ? `Eh! Je crois qu'il y a du mouvement dans l'enclos!` : `Hey! I think there is movement in the enclosure!`,
												click: dialog => {
													game.dialog = null;
													game.triggerEvent('creature_enclosure');
												}
											};
										}
									};
								}
							};
						})
					);
				},
				creature_enclosure: () => {
					game.checkpoint = 1;
					game.entities.sheeps[0].pos.x += 26;
					game.entities.sheeps[0].pos.y += 10;
					game.entities.sheeps[0].target = { x: 200, y: 200, obj: null };

					game.getHuman('lea').target.y += 8;
					game.getHuman('eliot').target = { x: 224, y: 128, obj: null };
					game.getHuman('piet').target = { x: 250, y: 126, obj: null };
					game.getHuman('shabyn').target = { x: 264, y: 128, obj: null };

					c = new Creature({ x: 224, y: 96, z: 0 });
					c.view_distance = 20;
					game.entities.creatures.push(c);

					game.triggerEvent('creature_chase');

					game.events.push(
						new TimeEvent(2500, event => {
							for (let human of game.entities.humans) human.health.val = 9;
							game.fog_map.fill();
							game.soundtrack.pause();
							game.soundtrack = game.sounds.dark;
						}),
						new TimeEvent(5000, event => {
							game.getHuman('shabyn').event = () => {
								game.getHuman('shabyn').event = null;

								game.dialog = {
									character: 'shabyn',
									text: lang == '#fr' ? `Qu'est ce qu'il se passe? Il fait encore plus sombre!` : `What is happening? It's even darker!`,
									click: dialog => {
										game.dialog = {
											character: 'piet',
											text: lang == '#fr' ? `La bête est là! Léa, tu sais ce que c'est?` : `The beast is here! Léa, do you know what it is?`,
											click: dialog => {
												game.dialog = {
													character: 'lea',
													text: lang == '#fr' ? `Non, on dirait même pas un animal...` : `No, it doesn't even look like an animal...`,
													click: dialog => {
														game.dialog = {
															character: 'piet',
															text: lang == '#fr' ? `On dirait une ombre?` : `Looks like a shadow?`,
															click: dialog => {
																game.dialog = {
																	character: 'shabyn',
																	text:
																		lang == '#fr'
																			? `Une ombre qui possède une ombre, t'es con ou quoi? Ma mère m'a déjà parlé d'un truc comme ça, c'est un soukounian!`
																			: `A shadow that has a shadow, are you stupid or what? My mother told me about something like that, it's a soukounian!`,
																	click: dialog => {
																		game.dialog = {
																			character: 'piet',
																			text:
																				lang == '#fr'
																					? `Arrête tes conneries et suis moi, on va essayer de s'approcher. Éliot, fais attention à Léa.`
																					: `Stop your bullshit and follow me, we'll try to get close. Éliot, take care of Léa.`,
																			click: dialog => {
																				game.dialog = null;
																				game.triggerEvent('approach');
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
				approach: () => {
					game.entities.sheeps = [];
					game.events.push(
						new TimeEvent(1000, event => {
							game.getHuman('piet').target = { x: 245, y: 115, obj: null };
						}),
						new TimeEvent(2000, event => {
							game.getHuman('shabyn').target = { x: 256, y: 124, obj: null };
						}),
						new TimeEvent(2500, event => {
							game.getHuman('piet').target = { x: 0, y: 0, obj: game.entities.creatures[0] };
						}),
						new GameEvent(event => {
							if (game.getHuman('piet').health.val < 8) {
								event.done = true;
								game.entities.creatures[0].view_distance = 40;
								game.entities.creatures[0].target.obj = game.getHuman('eliot');
								game.getHuman('piet').target = { x: 250, y: 190, obj: null };
								game.player.target = null;

								game.events.push(
									new TimeEvent(1000, event => {
										game.dialog = {
											character: 'shabyn',
											text: lang == '#fr' ? `Courez!` : `Run!`,
											click: dialog => {
												game.dialog = null;
											}
										};

										game.getHuman('shabyn').target = { x: 260, y: 186, obj: null };
									}),
									new WalkEvent(260, 200, 24, 0.8, [game.player], 'all', 'in', 'white', event => {
										game.getHuman('lea').target = { x: 252, y: 178, obj: null };
										game.getHuman('eliot').target = { x: 242, y: 180, obj: null };
										game.events.push(
											new TimeEvent(2000, event => {
												game.triggerEvent('surrounded');
											})
										);
									})
								);
							}
						})
					);
				},
				surrounded: () => {
					game.checkpoint = 2;
					for (let human of game.entities.humans) human.target = null;
					game.entities.creatures.push(
						new Creature({ x: 240, y: 130, z: 0 }),
						new Creature({ x: 300, y: 150, z: 0 }),
						new Creature({ x: 180, y: 160, z: 0 }),
						new Creature({ x: 190, y: 100, z: 0 }),
						new Creature({ x: 150, y: 120, z: 0 }),
						new Creature({ x: 150, y: 190, z: 0 }),
						new Creature({ x: 185, y: 200, z: 0 }),
						new Creature({ x: 330, y: 130, z: 0 }),
						new Creature({ x: 325, y: 170, z: 0 }),
						new Creature({ x: 360, y: 150, z: 0 }),
						new Creature({ x: 360, y: 175, z: 0 }),
						new Creature({ x: 200, y: 240, z: 0 }),
						new Creature({ x: 250, y: 230, z: 0 }),
						new Creature({ x: 270, y: 260, z: 0 }),
						new Creature({ x: 290, y: 245, z: 0 }),
						new Creature({ x: 280, y: 285, z: 0 }),
						new Creature({ x: 390, y: 220, z: 0 }),
						new Creature({ x: 388, y: 250, z: 0 }),
						new Creature({ x: 390, y: 300, z: 0 }),
						new Creature({ x: 260, y: 334, z: 0 }),
						new Creature({ x: 234, y: 283, z: 0 }),
						new Creature({ x: 152, y: 226, z: 0 }),
						new Creature({ x: 388, y: 339, z: 0 }),
						new Creature({ x: 236, y: 392, z: 0 }),
						new Creature({ x: 139, y: 148, z: 0 }),
						new Creature({ x: 416, y: 387, z: 0 }),
						new Creature({ x: 313, y: 382, z: 0 }),
						new Creature({ x: 404, y: 436, z: 0 }),
						new Creature({ x: 339, y: 475, z: 0 }),
						new Creature({ x: 216, y: 440, z: 0 }),
						new Creature({ x: 260, y: 438, z: 0 }),
						new Creature({ x: 437, y: 317, z: 0 }),
						new Creature({ x: 254, y: 522, z: 0 }),
						new Creature({ x: 386, y: 523, z: 0 }),
						new Creature({ x: 418, y: 479, z: 0 }),
						new Creature({ x: 204, y: 474, z: 0 }),
						new Creature({ x: 351, y: 574, z: 0 }),
						new Creature({ x: 294, y: 410, z: 0 }),
						new Creature({ x: 232, y: 538, z: 0 }),
						new Creature({ x: 226, y: 614, z: 0 })
					);

					game.events.push(
						new TimeEvent(1000, event => {
							game.dialog = {
								character: 'shabyn',
								text: lang == '#fr' ? `Stop! Il y en a d'autres!` : `Stop! There are others!`,
								click: dialog => {
									game.dialog = {
										character: 'lea',
										text: lang == '#fr' ? `Ils sont partout!` : `They are everywhere!`,
										click: dialog => {
											game.dialog = {
												character: 'piet',
												text:
													lang == '#fr'
														? `Au moins on n'est plus poursuivis. Ça ne sert à rien d'essayer d'ouvrir la porte. On va chez M. Vandebroek, il aura de quoi se défendre.`
														: `At least we are no longer being prosecuted. There's no point in trying to open the door. We're going to Mr. Vandebroek, he will have enough to defend himself.`,
												click: dialog => {
													game.dialog = {
														character: 'shabyn',
														text:
															lang == '#fr'
																? `Faites attention à ne pas trop les approcher, on a réussi à semer le permier grâce à la barière mais là on est à découvert. Le mieux serait de rester serrés.`
																: `Be careful not to get too close to them, we managed to sow the first one thanks to the fence but now we are in the open. It would be best to stay tight.`,
														click: dialog => {
															game.dialog = {
																character: 'piet',
																text:
																	lang == '#fr'
																		? `Éliot, je vois presque rien, on te suit. Prend le chemin de terre d'hier pour traverser la fôret.`
																		: `Éliot, I can hardly see anything, we're following you. Take the dirt road of yesterday to cross the forest.`,
																click: dialog => {
																	game.dialog = null;
																	console.log(game.mission);
																	setScreen('mission', game.mission);
																	game.initMissionButton();
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
						}),

						new WalkEvent(260, 200, 24, 0.8, game.entities.humans, 'any', 'out', null, event => {
							game.overlays.push(
								new OverText(
									'info',
									overtext => (lang == '#fr' ? 'Tes amis doivent venir avec toi, guide-les.' : 'Your friends must come with you, guide them.'),
									overtext => ({
										x: can.width / 2,
										y: 6 * overtext.scale
									}),
									300,
									6,
									'#cdcad3',
									game.scale
								)
							);
						}),
						new WalkEvent(260, 200, 24, 0.8, game.entities.humans, 'all', 'out', null, event => {
							game.getOverlay('info').kill(300);
						}),

						new WalkEvent(197, 608, 24, 0.8, game.entities.humans, 'any', 'in', null, event => {
							game.overlays.push(
								new OverText(
									'info',
									overtext => (lang == '#fr' ? 'Tes amis doivent venir avec toi, guide-les.' : 'Your friends must come with you, guide them.'),
									overtext => ({
										x: can.width / 2,
										y: 6 * overtext.scale
									}),
									300,
									6,
									'#cdcad3',
									game.scale
								)
							);
						}),
						new WalkEvent(197, 608, 24, 0.8, game.entities.humans, 'all', 'in', 'white', event => {
							game.getOverlay('info').kill(300);

							if (game.entities.humans.length == 4) {
								if (getCookie('chapter') < 3) setCookie('chapter', 3);
								if (getCookie('dream') < 1) setCookie('dream', 1);

								for (let c of game.entities.creatures) c.view_distance = 0;

								game.events.push(
									new TimeEvent(1500, event => {
										game.cam.targ_o = 1;
									}),
									new TimeEvent(4000, event => {
										loadPage('chplist');
									})
								);

								for (let h of game.entities.humans) {
									game.events.push(
										new TimeEvent(Math.random() * 1000, event => {
											h.target = { x: 91, y: 622, obj: null };
										})
									);
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
										game.cam.h *= 0.9;
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
									if (game.getButton('mission')) game.getButton('mission').kill(400);
									game.end_caption = name.charAt(0).toUpperCase() + name.slice(1) + (lang == '#fr' ? ' est mort' + (['lea', 'shabyn'].includes(name) ? 'e.' : '.') : ' is dead.');
									game.dimension = 0;

									game.events.push(
										new TimeEvent(1000, event => {
											game.getButton('pause').mode = 'pressed';
											game.pause(false);
											game.player = null;

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
																loadPage('chp2');
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

			// for (let mob of [...game.entities.humans, ...game.entities.sheeps]) mob.target = null;

			game.triggerEvent('dead_human');

			game.player.weapons = {
				bow: false,
				axe: false,
				fence: false,
				echo: false
			};
		}
	);
};
