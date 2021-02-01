pages['drm1'] = game => {
	game.images = [];
	game.sounds = {
		click: new Audio('./sounds/click.mp3'),
		piano: new Audio('./sounds/rain-piano.mp3'),
		tense: new Audio('./sounds/piano-tense.mp3')
	};

	game.soundtrack = game.sounds.piano;
	game.soundtrack.currentTime = 8;

	game.sounds.tense.volume = 0.3;

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
				sheeps: [],
				humans: [new Human('eliot', { x: 286, y: 176, z: 0 }), new Human('lea', { x: 276, y: 175, z: 0 })],
				creatures: [],
				particles: []
			};

			for (let coords of treeList) game.entities.trees.push(new Tree(coords, 0));

			game.player = game.getHuman('eliot');
			if (!getCookie('drm1_score')) setCookie('drm1_score', 0);

			game.fog = true;
			game.score = 0;

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

			game.buttons = [];
			game.overlays = [];

			game.events = [];

			game.event_map = {
				title: () => {
					game.events.push(
						new TimeEvent(1000, event => {
							game.initCoinOverlays();
							game.initPauseButton();
							if (lang == '#dev') {
								game.initDevOverlays();
								lang = '#fr';
							}
						}),
						new TimeEvent(5000, event => {
							game.rain = true;
						})
					);

					if (game.checkpoint == 1) {
						game.mode = 'normal';
						game.rain = true;

						game.triggerEvent('dead_lea');
						game.triggerEvent('house');
						return;
					}

					if (game.checkpoint == 2) {
						game.mode = 'normal';
						game.rain = true;

						game.getHuman('lea').die();
						game.getHuman('eliot').pos = { x: 300, y: 150, z: 0 };

						game.triggerEvent('arrows');
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
									overtext => (lang == '#fr' ? `Enfin un peu de sommeil...` : `Finally a little sleep...`),
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

						new TimeEvent(3000, event => {
							for (let o of game.overlays) o.kill(500);
						}),

						new TimeEvent(4000, event => {
							game.overlays.push(
								new OverText(
									'title',
									overtext => (lang == '#fr' ? 'Premier rêve' : 'First Dream'),
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

						new TimeEvent(5000, event => {
							game.overlays.push(
								new OverText(
									'title2',
									overtext => (lang == '#fr' ? 'Rêve lucide.' : 'Lucid dream.'),
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

						new TimeEvent(7000, event => {
							for (let o of game.overlays) o.kill(1000);
						}),

						new TimeEvent(8000, event => {
							game.triggerEvent('start');
						})
					);
				},
				start: () => {
					game.mode = 'normal';

					game.events.push(
						new TimeEvent(1000, event => {
							game.getHuman('lea').event = () => {
								game.getHuman('lea').event = null;

								game.dialog = {
									character: 'eliot',
									text: lang == '#fr' ? `<i class="whisper">Elle est si belle...<i/>` : `<i class="whisper">She is so pretty...<i/>`,
									click: dialog => {
										game.dialog = {
											character: 'eliot',
											text: lang == '#fr' ? `Léa? Mais... pourquoi on est à la maison de Piet? Et où sont les autres?` : `Léa? But... why are we at Piet's house? And where are the others?`,
											click: dialog => {
												game.dialog = {
													character: 'lea',
													text: lang == '#fr' ? `Éliot, j'ai peur...` : `Éliot, I'm scared...`,
													click: dialog => {
														game.dialog = {
															character: 'eliot',
															text:
																lang == '#fr'
																	? `C'est là qu'on a rencontré ces saletés pour la première fois... Ne t'en fais pas Léa, je suis avec toi. Et puis j'ai mon arc et ma hache cette fois. Rentrons dans la maison, les autres y sont sûrement.`
																	: `This is where we met those crap for the first time... Don't worry Léa, I'm with you. And I have my bow and my axe this time. Let's go into the house, the others are surely there.`,
															click: dialog => {
																game.dialog = {
																	character: 'lea',
																	text: lang == '#fr' ? `D'accord...` : `Okay...`,
																	click: dialog => {
																		game.dialog = {
																			character: 'eliot',
																			text: lang == '#fr' ? `<i class="whisper">Mais attend... Je parle?<i/>` : `<i class="whisper">But wait... I can speak?<i/>`,
																			click: dialog => {
																				game.dialog = null;
																				game.triggerEvent('house');
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
				house: () => {
					game.checkpoint = 1;

					game.entities.creatures.push(new Creature({ x: 315, y: 120, z: 0 }));

					game.getHuman('lea').target = { x: 290, y: 151, obj: null };
					game.getHuman('eliot').target = { x: 300, y: 150, obj: null };

					game.events.push(
						new TimeEvent(2000, event => {
							game.player.health.val = 9;
							game.fog_map.fill();
							game.sounds.tense.play();
						}),
						new TimeEvent(4000, event => {
							game.dialog = {
								character: 'lea',
								text: lang == '#fr' ? `Non, pas encore!` : `Not again!`,
								click: dialog => {
									game.dialog = {
										character: 'eliot',
										text: lang == '#fr' ? `Reste derrière moi! Je vais l'abattre.` : `Stay behind me! I'll shoot it down.`,
										click: dialog => {
											game.dialog = null;
										}
									};
								}
							};

							for (let human of game.entities.humans) human.target = null;
						}),
						new GameEvent(event => {
							if (game.entities.creatures.length < 1) {
								event.done = true;
								game.triggerEvent('shoot_down');
							}
						})
					);
				},
				shoot_down: () => {
					game.checkpoint = 2;
					game.triggerEvent('dead_lea');

					game.events.push(
						new TimeEvent(1000, event => {
							game.dialog = {
								character: 'eliot',
								text: lang == '#fr' ? `Mince je n'ai plus de flèches maintenant.` : `Damn I have no more arrows now.`,
								click: dialog => {
									game.dialog = {
										character: 'lea',
										text: `Éliot!`,
										click: dialog => {
											game.dialog = null;
										}
									};
								}
							};

							game.player.target = { x: game.player.pos.x, y: game.player.pos.y, obj: null };
							game.player.wood.val = 0;

							let c = new Creature({ x: 350, y: 100, z: 0 });
							c.view_distance = 500;
							c.target = { x: 0, y: 0, obj: game.getHuman('lea') };
							game.entities.creatures.push(c);
						})
					);
				},
				dead_lea: () => {
					game.events.push(
						new GameEvent(event => {
							if (!game.getHuman('lea')) {
								event.done = true;
								game.entities.creatures = [];

								game.events.push(
									new TimeEvent(1000, event => {
										game.dialog = {
											character: 'eliot',
											text: `Je ne peux plus bouger!`,
											click: dialog => {
												game.dialog = {
													character: 'eliot',
													text: `Léa! Non!`,
													click: dialog => {
														game.dialog = null;
													}
												};
											}
										};

										game.triggerEvent('arrows');
									})
								);
							}
						})
					);
				},
				arrows: () => {
					game.player.target = { x: 286, y: 176, obj: 0 };
					game.player.health.val = 9;
					game.player.wood.val = 0;
					game.player.setWeapon('bow');

					console.log(game.events);

					game.events.push(
						new WalkEvent(298, 198, 6, 1, [game.player], 'all', 'in', null, event => {
							let n = 24;
							for (let i = 0; i < n; i++) {
								game.events.push(
									new TimeEvent(1000 + (i / n + Math.random() / 10) * 2000, event => {
										let a = (i / n) * Math.PI * 2;
										pos = {
											x: game.player.getFeet().x + 36 * Math.cos(a),
											y: game.player.getFeet().y + 36 * Math.sin(a) * 0.7,
											z: game.getBorders().h
										};

										vel = {
											x: (Math.random() - 0.5) / 300,
											y: (Math.random() - 0.5) / 300,
											z: 0
										};
										game.entities.particles.push(new Arrow(pos, vel));
									})
								);
							}
						}),
						new TimeEvent(3000, event => {
							game.player.target = null;
							game.triggerEvent('rand_spawn');
						})
					);
				},
				rand_spawn: () => {
					game.events.push(
						new TimeEvent(Math.random() * 30000, event => {
							if (game.player) {
								let pos = {
									x: Math.random() * 50 - 25,
									y: Math.random() * 50 - 25,
									z: 0
								};

								pos.x += game.player.pos.x + (pos.x > 0 ? 50 : -50);
								pos.y += game.player.pos.y + (pos.y > 0 ? 50 : -50);

								console.log(pos);

								let c = new Creature(pos);
								c.view_distance = 500;

								game.entities.creatures.push(c);

								game.score++;
							}

							game.triggerEvent('rand_spawn');
						})
					);
				},

				creature_chase: () => {
					game.events.push(
						new GameEvent(event => {
							if (game.entities.humans.length < 2) event.done = true;
							else {
								for (let creature of game.entities.creatures) {
									if (creature.target && creature.target.obj && creature.target.obj.name != 'creature') {
										event.done = true;
										game.cam.h *= 0.9;
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
									if (game.entities.humans.length < 2) event.done = true;
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
											game.triggerEvent('creature_chase');
										}
									}
								})
							);
						})
					);
				},
				dead_eliot: () => {
					game.events.push(
						new GameEvent(event => {
							if (!game.getHuman('eliot')) {
								event.done = true;
								if (game.getButton('mission')) game.getButton('mission').kill(400);
								game.dimension = 0;

								game.cam.default_h = 100;

								game.events.push(
									new TimeEvent(1000, event => {
										if (game.getButton('pause')) game.getButton('pause').mode = 'pressed';
										game.pause(false);
										game.player = null;

										setCookie('coins', Math.floor(getCookie('coins')) + game.coins);

										if (game.score > Math.floor(getCookie('drm1_score'))) {
											setCookie('drm1_score', game.score);
										}

										game.overlays = [
											new OverText(
												'dead',
												overtext => (lang == '#fr' ? 'Éliot est mort.' : 'Éliot is dead.'),
												overtext => ({
													x: can.width / 2,
													y: can.height / 4
												}),
												1000,
												18
											),
											new Overlay(
												'coin-img',
												game.images['coin'],
												overlay => ({
													x: can.width / 2 - game.scale * 6.5,
													y: can.height / 2 - game.scale * 6.7
												}),
												800,
												game.scale * 0.55
											),
											new OverText(
												'coin-text',
												overtext => game.coins,
												overtext => ({
													x: can.width / 2,
													y: can.height / 2
												}),
												800,
												8,
												'#fd8',
												null,
												'left'
											),
											new OverText(
												'score',
												overtext => 'score: ' + game.score,
												overtext => ({
													x: can.width / 2,
													y: (can.height / 5) * 3
												})
											),
											new OverText(
												'bscore',
												overtext => 'best: ' + getCookie('drm1_score'),
												overtext => ({
													x: can.width / 2,
													y: (can.height / 5) * 3 + 8 * game.scale
												})
											)
										];

										game.buttons.push(
											new Button(
												'next',
												'menu2-button',
												lang == '#fr' ? 'Quitter' : 'Quit',
												btn => ({
													x: can.width / 2 + 5 * game.scale,
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
															loadPage('drmlist');
														})
													);
												},
												200,
												'normal',
												10
											),
											new Button(
												'next',
												'menu2-button',
												lang == '#fr' ? 'Encore' : 'Try again',
												btn => ({
													x: can.width / 2 - (5 + btn.img.width) * game.scale,
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
															loadPage('drm1');
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
						})
					);
				}
			};

			game.initShop();

			game.loop = true;

			for (let human of game.entities.humans) human.stamina.val = human.stamina.max;

			game.triggerEvent('dead_eliot');
			game.triggerEvent('creature_chase');

			game.player.weapons = {
				bow: true,
				axe: true,
				fence: true,
				echo: false
			};
		}
	);
};
