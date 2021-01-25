var chapter1 = new Chapter('Tutorial', './chapters/chapter 1/img/', ['characters/player.png', 'characters/player_bow.png', 'characters/player_axe.png', 'characters/karmen.png', 'characters/karmen_bow.png', 'characters/karmen_axe.png', 'characters/scott.png', 'characters/scott_bow.png', 'characters/scott_axe.png', 'characters/lea.png', 'characters/lea_bow.png', 'characters/lea_axe.png', 'characters/human_shadow.png', 'characters/bow_aim.png', 'characters/axe_hit.png', 'characters/pnj_icons.png', 'sheep.png', 'sheep_shadow.png', 'house.png', 'house_shadow.png', 'fence.png', 'fence_translucid.png', 'red_fence.png', 'fence_shadow.png', 'trap.png', 'trees/pine_1.png', 'trees/pine_1_shadow.png', 'trees/pine_2.png', 'trees/pine_2_shadow.png', 'trees/pine_3.png', 'trees/pine_3_shadow.png', 'trees/pine_4.png', 'trees/pine_4_shadow.png', 'trees/tree_calc.png', 'ground.png', 'water.png'], chap => {
	console.log('Init ' + chap.name);
	chap.gcan = document.createElement('canvas');
	chap.gcan.width = chap.img['ground'].width;
	chap.gcan.height = chap.img['ground'].height;
	chap.message = '';
	chap.title = ['Chapitre 1', 'Retour à la maison.'];
	chap.bg_color = '#323c2e';
	chap.def_cam = { x: -2200, y: -1400 };
	chap.allow_traps = false;

	chap.entities = {
		over: [],
		infected: [],
		particles: [],
		buttons: [],
		player: new Player(335, 335, chap.img),
		arrows: [],
		traps: [],
		buildings: [new Entity(256, 79, 0, chap.img['house'], chap.img['house_shadow'], 96, 96, 0, 0, 60, new Hitbox(33, 40, 48, 19, 0, 50)), new Fence(190, 95, 1, chap.img), new Fence(190, 114, 1, chap.img), new Fence(244, 95, 1, chap.img), new Fence(244, 114, 1, chap.img), new Fence(202, 122, 0, chap.img), new Fence(227, 87, 0, chap.img), new Fence(202, 87, 0, chap.img)],
		sheeps: [new Mob(230, 94, chap.img['sheep'], chap.img['sheep_shadow'], 24, 24, 0, 0, 24, new Hitbox(6, 21, 12, 4, 2, 9)), new Mob(215, 100, chap.img['sheep'], chap.img['sheep_shadow'], 24, 24, 0, 0, 24, new Hitbox(6, 21, 12, 4, 2, 9))],
		allies: [
			new Ally(236, 142, 'scott', chap.img, 1),
			new Ally(216, 148, 'lea', chap.img),
			new Ally(325, 320, 'karmen', chap.img, 1, null, game => {
				game.dialog = new Dialog('karmen', ['Dépèche-toi Eliot! Je suis pressée de revoir Scott!'], game => {
					game.dialog = null;
					game.getAlly('karmen').event = null;
					game.message = '';
					game.entities.player.canmove = true;

					game.game_events = [
						new basicEvent((event, game) => {
							if (game.entities.player.vel.y != 0) {
								game.message = 'Rejoins le cerlce.';
							}
						}),
						new timeEvent(60, (event, game) => {
							game.message = 'Bouge le joystick gauche pour te déplacer.';
						}),
						new walkEvent(330, 300, 15, (event, game) => {
							let dx = event.pos.x - game.entities.player.pos.x - 12;
							let dy = event.pos.y - game.entities.player.getFoot();
							if (Math.sqrt(dx * dx + dy * dy) < event.pos.r) {
								game.message = "Tapotte à gauche de l'écran pour contrôler tes alliés.";
								game.entities.player.canmove = false;
								game.game_events = [
									new basicEvent((event, game) => {
										if (game.controls.L == 3) {
											game.message = 'Déplace Karmen dans le cercle avec ton doigt.';

											game.game_events = [
												new walkEvent(330, 300, 15, (event, game) => {
													let k = game.getAlly('karmen');
													let dx = event.pos.x - k.getTarget().x - 12;
													let dy = event.pos.y - k.getTarget().y - 12;
													if (Math.sqrt(dx * dx + dy * dy) < event.pos.r) {
														game.message = "Tapotte sur l'écran pour continuer.";
														game.game_events = [
															new walkEvent(330, 300, 15, (event, game) => {}),
															new basicEvent((event, game) => {
																if (game.controls.L != 3) {
																	game.message = '';

																	game.game_events = [
																		new walkEvent(330, 300, 15, (event, game) => {
																			let k = game.getAlly('karmen');
																			let dx = event.pos.x - k.pos.x - 12;
																			let dy = event.pos.y - k.getFoot();
																			if (Math.sqrt(dx * dx + dy * dy) < event.pos.r) {
																				k.target = { x: k.pos.x, y: k.pos.y, obj: null };
																				game.message = "Tapotte à nouveau la gauche de l'écran.";
																				game.game_events = [
																					new basicEvent((event, game) => {
																						if (game.controls.L == 3) {
																							game.message = "Tapotte sur Karmen pour qu'elle te suive.";
																							game.game_events = [
																								new basicEvent((event, game) => {
																									if (game.getAlly('karmen').target.obj) {
																										game.message = "Tapotte sur l'écran pour continuer.";
																										game.game_events = [
																											new basicEvent((event, game) => {
																												if (game.controls.L != 3) {
																													game.entities.player.canmove = true;
																													game.message = "En te déplaçant, Tapotte à droite de l'écran pour booster ta vitesse.";

																													game.game_events = [
																														new basicEvent((event, game) => {
																															let v = game.entities.player.vel;
																															if (Math.sqrt(v.x * v.x + v.y * v.y) > 1) {
																																game.message = 'Cours rejoindre Scott!';
																																game.game_events = [
																																	new walkEvent(240, 170, 20, (event, game) => {
																																		let dx = event.pos.x - game.entities.player.pos.x - 12;
																																		let dy = event.pos.y - game.entities.player.getFoot();
																																		if (Math.sqrt(dx * dx + dy * dy) < event.pos.r) {
																																			game.game_events = [];
																																			game.message = '';
																																			game.getAlly('karmen').target = { x: 230, y: 170, obj: null };

																																			game.getAlly('scott').event = game => {
																																				game.entities.player.canmove = false;
																																				game.getAlly('scott').event = null;
																																				game.dialog = new Dialog('scott', ['Karmen! Eliot! Content de vous revoir!'], game => {
																																					game.dialog = new Dialog('karmen', ["Salut Scott! Tu m'as... Tu nous as manqué!"], game => {
																																						game.dialog = new Dialog('scott', ['Je vous présente Lea, ma cousine. Elle est nulle avec', "un arc mais elle sait soigner n'importe quoi!"], game => {
																																							game.dialog = new Dialog('lea', ['Bonjour... Je sais seulement me débrouiller avec des', 'attelles et un bandage haha.'], game => {
																																								game.dialog = new Dialog('scott', ["En plus d'être timide elle est modeste. On a signalé", "plusieurs personnes atteintes d'une maladie inconnue", 'dans la région. Lea a été envoyée ici pour étudier la', 'maladie car elle connaît bien la région.'], game => {
																																									game.dialog = new Dialog('karmen', ['Tu ne sais pas du tout manier un arc?'], game => {
																																										game.dialog = new Dialog('lea', ["Non... Scott a souvent essayé de m'apprendre mais", 'impossible, je suis un danger publique. Au fait... il parle', 'souvent de toi, Eliot... Il dit que tu as beaucoup de talent.'], game => {
																																											game.dialog = new Dialog('karmen', ["Ne t'attend pas à ce qu'il te réponde. Il est muet depuis", "l'enfance."], game => {
																																												game.dialog = new Dialog('scott', ['Allez prince charmant, montre lui ce que tu sais faire!'], game => {
																																													game.dialog = null;
																																													game.message = "Tapotte à droite sans te déplacer pour changer d'arme.";
																																													game.game_events = [
																																														new basicEvent((event, game) => {
																																															if (game.entities.player.getWeapon() == 'bow') {
																																																game.message = 'Vise avec le joystick droit et lâche pour tirer.';
																																																game.entities.player.wood = 1;
																																																game.game_events = [
																																																	new basicEvent((event, game) => {
																																																		if (!game.entities.player.wood) {
																																																			game.game_events = [
																																																				new timeEvent(30, (event, game) => {
																																																					game.game_events = [];
																																																					game.dialog = new Dialog('karmen', ['Montre-lui ta flèche spéciale!'], game => {
																																																						game.message = 'Vise avec ton arc et appuie sur le joystick gauche.';
																																																						game.dialog = null;
																																																						game.entities.player.wood = 100;
																																																						game.game_events = [
																																																							new basicEvent((event, game) => {
																																																								if (game.controls.L == 2 && game.entities.player.stamina < 12) {
																																																									game.game_events = [
																																																										new basicEvent((event, game) => {
																																																											game.message = 'Maintenant essaye de contrôler ta flèche avec la visée.';
																																																											if (game.controls.L == 2 && game.entities.player.stamina < 2) {
																																																												game.game_events = [];
																																																												game.entities.player.wood = 8;
																																																												game.dialog = new Dialog('lea', ['Wow!'], game => {
																																																													game.dialog = new Dialog('scott', ['Il est doué pas vrai? Pense à récupérer les flèches', 'tombées par terre ou plantées dans les arbres.'], game => {
																																																														game.dialog = new Dialog('karmen', ["C'est moi ou il manque une barrière à l'enclos de tes", 'moutons?'], game => {
																																																															game.dialog = new Dialog('scott', ['Oui, une bête est venue cette nuit. Elle a cassé la barrière', 'et a tué un de nos moutons. Eliot, voilà un piège à loup. Tu', "te souviens de la façon dont on l'utilise?"], game => {
																																																																game.dialog = null;
																																																																game.message = "Va poser un piège dans l'enclos.";
																																																																game.entities.player.canmove = true;
																																																																game.game_events = [
																																																																	new walkEvent(236, 125, 15, (event, game) => {
																																																																		let dx = event.pos.x - game.entities.player.pos.x - 12;
																																																																		let dy = event.pos.y - game.entities.player.getFoot();
																																																																		if (Math.sqrt(dx * dx + dy * dy) < event.pos.r) {
																																																																			game.message = "Tapotte à droite sans te déplacer pour changer d'arme et prendre ton piège.";
																																																																			game.game_events = [
																																																																				new basicEvent((event, game) => {
																																																																					if (game.entities.player.getWeapon() == 'trap') {
																																																																						game.entities.player.traps++;
																																																																						game.message = "Vise l'endroit où tu veux poser le piège puis lâche.";
																																																																						game.game_events = [
																																																																							new basicEvent((event, game) => {
																																																																								if (game.entities.player.traps < 1) {
																																																																									game.game_events = [
																																																																										new timeEvent(30, (event, game) => {
																																																																											game.game_events = [];
																																																																											game.dialog = new Dialog('scott', ["Je pense qu'on fera mieux de le replacer.. Tu peux", "m'aider à reconstruire la barière? Va couper un arbre", 'pour récupérer du bois.'], game => {
																																																																												game.dialog = null;
																																																																												game.message = "Tapotte à droite sans te déplacer pour changer d'arme et prendre ta hache.";
																																																																												game.game_events = [
																																																																													new basicEvent((event, game) => {
																																																																														if (game.entities.player.getWeapon() == 'axe') {
																																																																															game.message = 'Colle-toi à un arbre et utilise la hache en visant.';
																																																																															game.game_events = [
																																																																																new basicEvent((event, game) => {
																																																																																	if (game.entities.player.wood >= 16) {
																																																																																		game.message = 'Retourne voir tes amis.';
																																																																																		game.game_events = [
																																																																																			new walkEvent(240, 170, 20, (event, game) => {
																																																																																				let dx = event.pos.x - game.entities.player.pos.x - 12;
																																																																																				let dy = event.pos.y - game.entities.player.getFoot();
																																																																																				if (Math.sqrt(dx * dx + dy * dy) < event.pos.r) {
																																																																																					game.message = "Tapotte à droite sans te déplacer pour changer d'arme et prendre les barrières.";
																																																																																					game.game_events = [
																																																																																						new basicEvent((event, game) => {
																																																																																							if (game.entities.player.getWeapon() == 'fence') {
																																																																																								game.message = 'Vise pour placer une barrière.';
																																																																																								game.game_events = [
																																																																																									new basicEvent((event, game) => {
																																																																																										if (game.entities.player.wood < 16) {
																																																																																											game.message = '';
																																																																																											game.game_events = [
																																																																																												new timeEvent(30, (event, game) => {
																																																																																													game.game_events = [];
																																																																																													game.dialog = new Dialog('scott', ['Ca aussi on fera mieux de le replacer... Bon! Allons manger.'], game => {
																																																																																														game.dialog = null;
																																																																																														game.entities.player.wood = 0;
																																																																																														game.entities.player.canmove = false;

																																																																																														game.game_events = [
																																																																																															new timeEvent(60, (event, game) => {
																																																																																																game.loadChapter(2);
																																																																																															})
																																																																																														];
																																																																																													});
																																																																																												})
																																																																																											];
																																																																																										}
																																																																																									})
																																																																																								];
																																																																																							}
																																																																																						})
																																																																																					];
																																																																																				}
																																																																																			})
																																																																																		];
																																																																																	}
																																																																																})
																																																																															];
																																																																														}
																																																																													})
																																																																												];
																																																																											});
																																																																										})
																																																																									];
																																																																								}
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
																																																													});
																																																												});
																																																											}
																																																										})
																																																									];
																																																								}
																																																							})
																																																						];
																																																					});
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
																																										});
																																									});
																																								});
																																							});
																																						});
																																					});
																																				});
																																			};
																																		}
																																	})
																																];
																															}
																														})
																													];
																												}
																											})
																										];
																									}
																								})
																							];
																						}
																					})
																				];
																			}
																		})
																	];
																}
															})
														];
													}
												})
											];
										}
									})
								];
							}
						})
					];
				});
			})
		]
	};

	chap.entities.player.canmove = false;
	chap.entities.player.wood = 0;
	chap.game_events = [
		new timeEvent(180, (event, game) => {
			game.message = 'Appuie sur Karmen pour lui parler.';
		})
	];
});
