var pages = [];
var ads = false;

class Game {
	constructor() {
		this.loop = false;
		this.title = null;

		this.best_perf = 40;
		this.average_dtime = 40;

		this.variant = '';

		this.images = [];
		this.sounds = {};
		this.soundtrack = null;
		this.play_soundtrack = true;

		this.ground = null;
		this.tree_calc = null;
		this.fog_map = null;
		this.fog = false;

		this.rain = null;

		this.bg_color = 'black';
		this.leave_color = 'green';
		this.scale = 1;
		this.speed = 1;
		this.mode = 'normal';
		this.dimension = 0;
		this.checkpoint = 0;
		this.pause_time = 0;
		this.fps = { frames: 0, duration: 0, value: 0 };

		this.cam = { x: 0, y: 0, h: 100, o: 0, targ_h: 100, default_h: 100, targ_o: 0, targ_speed: 1, target: { x: 200, y: 200 } };
		this.strat_fog = 0;

		this.entities = {
			buildings: [],
			trees: [],
			sheeps: [],
			humans: [],
			creatures: [],
			particles: []
		};

		this.ord_ent = [];

		this.foot_steps = [];
		this.player = null;

		this.touches = { L: null, R: null, rin: 20, rout: 50 };
		this.touch_events = [];
		this.buttons = [];
		this.overlays = [];
		this.events = [];
		this.event_map = {};

		this.dialog = null;
		this.mission = null;

		this.can = document.createElement('canvas');
		this.borders = null;

		this.coins = 0;
	}

	triggerEvent(name) {
		this.event_map[name]();
	}

	pause(given) {
		if (given != undefined) {
			var newmode;
			if (given) newmode = 'pause';
			else newmode = 'normal';
			if (newmode != this.mode) {
				this.mode = newmode;
				this.pause_time = time;
			}
		} else {
			this.pause_time = time;
			this.mode = this.mode == 'pause' ? 'normal' : 'pause';
		}

		if (this.mode == 'normal') this.speed = 1;
		else {
			this.speed = 1;
			this.events.push(
				new TimeEvent(2000, event => {
					if (this.getButton('pause').mode == 'pressed') this.speed = 0.1;
				})
			);
		}
	}

	initPauseButton() {
		this.events.push(
			new GameEvent(event => {
				if (game.mode == 'normal') {
					event.done = true;
					this.buttons.push(
						new Button(
							'pause',
							'pause-button',
							'',
							btn => ({
								x: can.width - (btn.img.width + 3) * btn.scale,
								y: btn.scale * 3
							}),
							btn => {
								this.pause(true);

								this.overlays.push(
									new OverText(
										'pause',
										overtext => 'Pause',
										overtext => ({ x: can.width / 2, y: can.height / 3 }),
										200,
										18
									)
								);

								this.buttons.push(
									new Button(
										'resume',
										'menu2-button',
										lang == '#fr' ? 'Reprendre' : 'Resume',
										btn => ({
											x: (can.width - btn.img.width * this.scale) / 2,
											y: (can.height / 3) * 2 - btn.img.height * this.scale
										}),
										btn => {
											this.pause();
											this.getOverlay('pause').kill(400);
											this.getButton('pause').mode = 'normal';
											this.getButton('quit').kill(400);
											btn.kill(400);
											this.speed = 1;
										},
										200,
										'normal',
										10
									)
								);

								this.buttons.push(
									new Button(
										'quit',
										'menu2-button',
										lang == '#fr' ? 'Quitter' : 'Quit',
										btn => ({
											x: (can.width - btn.img.width * this.scale) / 2,
											y: (can.height / 3) * 2 + 2 * this.scale
										}),
										btn => {
											this.getOverlay('pause').kill(400);
											this.getButton('pause').mode = 'normal';
											this.getButton('pause').kill(400);
											this.getButton('resume').kill(400);
											btn.kill(400);
											this.speed = 1;
											this.events.push(
												new TimeEvent(500, event => {
													this.speed = 1;
													this.pause(false);
													loadPage('menu');
												})
											);
										},
										200,
										'normal',
										10
									)
								);
							},
							400,
							'normal',
							12,
							'white',
							this.scale
						)
					);
				}
			})
		);
	}

	initDevOverlays() {
		this.events.push(
			new GameEvent(event => {
				if (game.mode == 'normal') {
					event.done = true;

					this.overlays.push(
						new OverText(
							'fps',
							overtext => `${Math.floor(1000 / this.average_dtime)}`,
							overtext => ({
								x: 8 * overtext.scale,
								y: can.height - 2 * overtext.scale
							}),
							400,
							6,
							'#cdcad3',
							this.scale
						),
						new OverText(
							'best',
							overtext => `${Math.floor(1000 / this.best_perf)}`,
							overtext => ({
								x: 16 * overtext.scale,
								y: can.height - 2 * overtext.scale
							}),
							400,
							6,
							'#cdcad3',
							this.scale
						),
						new OverText(
							'speed',
							overtext => `${this.speed}`,
							overtext => ({
								x: 24 * overtext.scale,
								y: can.height - 2 * overtext.scale
							}),
							400,
							6,
							'#cdcad3',
							this.scale
						),
						new OverText(
							'fog',
							overtext => (this.fog_map ? `${this.fog_map.pix_size}` : '*'),
							overtext => ({
								x: 32 * overtext.scale,
								y: can.height - 2 * overtext.scale
							}),
							400,
							6,
							'#cdcad3',
							this.scale
						),
						new OverText(
							'attack-sprite',
							overtext => (this.player && this.player.attack ? `[${this.player.sprites.axe_hit.tile.x}, ${this.player.sprites.axe_hit.tile.y}]` : ''),
							overtext => ({
								x: 12 * overtext.scale,
								y: can.height - 8 * overtext.scale
							}),
							400,
							6,
							'#cdcad3',
							this.scale
						)
					);
				}
			})
		);
	}

	initMissionButton() {
		this.buttons.push(
			new Button(
				'mission',
				'mission-button',
				lang == '#fr' ? 'Aide' : 'Help',
				btn => ({
					x: (can.width - btn.img.width * btn.scale) / 2,
					y: can.height - btn.img.height * btn.scale
				}),
				btn => {
					btn.kill(200);
					this.events.push(
						new TimeEvent(300, event => {
							setScreen('mission', this.mission);
						}),
						new TimeEvent(1000, event => {
							game.initMissionButton();
						})
					);
				},
				200,
				'normal',
				10,
				'#cdcad3',
				this.scale * 0.6
			)
		);
	}

	initCoinOverlays() {
		this.events.push(
			new GameEvent(event => {
				if (this.coins) {
					event.done = true;
					this.overlays.push(
						new Overlay(
							'coins_img',
							this.images['coin'],
							overlay => ({
								x: 4 * overlay.scale,
								y: 1.5 * overlay.scale
							}),
							800,
							this.scale * 0.64
						),
						new OverText(
							'coins_text',
							overtext => `${this.coins}`,
							overtext => ({
								x: 7.2 * overtext.scale,
								y: 6 * overtext.scale
							}),
							800,
							6,
							'#fd8',
							this.scale,
							'left'
						)
					);
				}
			})
		);
	}

	initShop() {
		if (getCookie('coins') != '0') {
			console.log(getCookie('coins'));
			this.mode = 'pause';
			this.pause_time = time - 200;

			this.events = [
				new TimeEvent(500, event => {
					this.overlays.push(
						new OverText(
							'shop-title',
							overtext => (lang == '#fr' ? 'Magasin' : 'Shop'),
							overtext => ({
								x: can.width / 2,
								y: this.scale * 14
							}),
							1000,
							16,
							'#cdcad3'
						),
						new Overlay(
							'coins_img',
							this.images['coin'],
							overlay => ({
								x: 4 * overlay.scale,
								y: 1.5 * overlay.scale
							}),
							800,
							this.scale * 0.64
						),
						new OverText(
							'coins_text',
							overtext => getCookie('coins'),
							overtext => ({
								x: 7.2 * overtext.scale,
								y: 6 * overtext.scale
							}),
							800,
							6,
							'#fd8',
							this.scale,
							'left'
						)
					);
				}),

				new TimeEvent(1000, event => {
					this.overlays.push(
						new Overlay(
							'arrow-bonus-img',
							this.images['arrow-bonus'],
							overlay => ({
								x: can.width * 0.06,
								y: this.scale * 18.3
							}),
							800,
							this.scale * 0.86
						),

						new OverText(
							'arrow-bonus-text',
							overtext => (lang == '#fr' ? '32 flèches au lieu de 8.' : '32 arrows instead of 8.'),
							overtext => ({
								x: can.width * 0.37,
								y: this.scale * 25
							}),
							1000,
							8,
							'#cdcad3'
						),

						new Overlay(
							'arrow-bonus-coins-img',
							this.images['coin'],
							overlay => ({
								x: can.width * 0.66 - this.scale * 6.5,
								y: this.scale * 18.3
							}),
							800,
							this.scale * 0.86
						),

						new OverText(
							'arrow-bonus-coins-text',
							overtext => '35',
							overtext => ({
								x: can.width * 0.66,
								y: this.scale * 25
							}),
							800,
							8,
							'#fd8',
							null,
							'left'
						)
					);

					this.buttons.push(
						new Button(
							'arrow-buy',
							'buy-button',
							lang == '#fr' ? 'Acheter' : 'Buy',
							btn => {
								if (btn.mode == 'normal' && Math.floor(getCookie('coins')) < 35) btn.mode = 'disabled';

								return {
									x: can.width * 0.85 - (btn.img.width * this.scale) / 2,
									y: this.scale * 17.4
								};
							},
							btn => {
								this.getHuman('eliot').wood.val = 32;
								setCookie('coins', Math.floor(getCookie('coins')) - 35);
								btn.kill(400);
							},
							200,
							'normal',
							10
						)
					);
				}),

				new TimeEvent(1250, event => {
					this.overlays.push(
						new Overlay(
							'mana-bonus-img',
							this.images['icon-mana4'],
							overlay => ({
								x: can.width * 0.06 - this.scale * 14,
								y: this.scale * (12 + 15)
							}),
							800,
							this.scale * 1.6
						),

						new OverText(
							'mana-bonus-text',
							overtext => (lang == '#fr' ? 'Mana complet.' : 'Full mana.'),
							overtext => ({
								x: can.width * 0.37,
								y: this.scale * (25 + 15)
							}),
							1000,
							8,
							'#cdcad3'
						),

						new Overlay(
							'mana-bonus-coins-img',
							this.images['coin'],
							overlay => ({
								x: can.width * 0.66 - this.scale * 6.5,
								y: this.scale * (18.3 + 15)
							}),
							800,
							this.scale * 0.86
						),

						new OverText(
							'mana-bonus-coins-text',
							overtext => '40',
							overtext => ({
								x: can.width * 0.66,
								y: this.scale * (25 + 15)
							}),
							800,
							8,
							'#fd8',
							null,
							'left'
						)
					);

					this.buttons.push(
						new Button(
							'mana-buy',
							'buy-button',
							lang == '#fr' ? 'Acheter' : 'Buy',
							btn => {
								if (btn.mode == 'normal' && Math.floor(getCookie('coins')) < 40) btn.mode = 'disabled';

								return {
									x: can.width * 0.85 - (btn.img.width * this.scale) / 2,
									y: this.scale * (17.4 + 15)
								};
							},
							btn => {
								this.getHuman('eliot').mana.val = 4;
								setCookie('coins', Math.floor(getCookie('coins')) - 40);
								btn.kill(400);
							},
							200,
							'normal',
							10
						)
					);
				}),

				new TimeEvent(1500, event => {
					this.overlays.push(
						new Overlay(
							'stamina-bonus-img',
							this.images['icon-stamina-green'],
							overlay => ({
								x: can.width * 0.06 - this.scale * 14,
								y: this.scale * (12 + 30)
							}),
							800,
							this.scale * 1.6
						),

						new OverText(
							'stamina-bonus-text',
							overtext => (lang == '#fr' ? 'Double endurance.' : 'Double stamina.'),
							overtext => ({
								x: can.width * 0.37,
								y: this.scale * (25 + 30)
							}),
							1000,
							8,
							'#cdcad3'
						),

						new Overlay(
							'stamina-bonus-coins-img',
							this.images['coin'],
							overlay => ({
								x: can.width * 0.66 - this.scale * 6.5,
								y: this.scale * (18.3 + 30)
							}),
							800,
							this.scale * 0.86
						),

						new OverText(
							'stamina-bonus-coins-text',
							overtext => '30',
							overtext => ({
								x: can.width * 0.66,
								y: this.scale * (25 + 30)
							}),
							800,
							8,
							'#fd8',
							null,
							'left'
						)
					);

					this.buttons.push(
						new Button(
							'stamina-buy',
							'buy-button',
							lang == '#fr' ? 'Acheter' : 'Buy',
							btn => {
								if (btn.mode == 'normal' && Math.floor(getCookie('coins')) < 30) btn.mode = 'disabled';

								return {
									x: can.width * 0.85 - (btn.img.width * this.scale) / 2,
									y: this.scale * (17.4 + 30)
								};
							},
							btn => {
								this.getHuman('eliot').stamina.max *= 2;
								setCookie('coins', Math.floor(getCookie('coins')) - 30);
								btn.kill(400);
							},
							200,
							'normal',
							10
						)
					);
				}),

				new TimeEvent(1750, event => {
					this.overlays.push(
						new Overlay(
							'damage-bonus-img',
							this.images['icon-bow'],
							overlay => ({
								x: can.width * 0.06 - this.scale * 14,
								y: this.scale * (13 + 45)
							}),
							800,
							this.scale * 1.6
						),

						new OverText(
							'damage-bonus-text',
							overtext => (lang == '#fr' ? "2x dégats à l'arc." : '2x bow damages.'),
							overtext => ({
								x: can.width * 0.37,
								y: this.scale * (25 + 45)
							}),
							1000,
							8,
							'#cdcad3'
						),

						new Overlay(
							'damage-bonus-coins-img',
							this.images['coin'],
							overlay => ({
								x: can.width * 0.66 - this.scale * 6.5,
								y: this.scale * (18.3 + 45)
							}),
							800,
							this.scale * 0.86
						),

						new OverText(
							'damage-bonus-coins-text',
							overtext => '50',
							overtext => ({
								x: can.width * 0.66,
								y: this.scale * (25 + 45)
							}),
							800,
							8,
							'#fd8',
							null,
							'left'
						)
					);

					this.buttons.push(
						new Button(
							'damage-buy',
							'buy-button',
							lang == '#fr' ? 'Acheter' : 'Buy',
							btn => {
								if (btn.mode == 'normal' && Math.floor(getCookie('coins')) < 50) btn.mode = 'disabled';

								return {
									x: can.width * 0.85 - (btn.img.width * this.scale) / 2,
									y: this.scale * (17.4 + 45)
								};
							},
							btn => {
								this.getHuman('eliot').damage = 2;
								setCookie('coins', Math.floor(getCookie('coins')) - 50);
								btn.kill(400);
							},
							200,
							'normal',
							10
						)
					);
				}),

				new TimeEvent(2000, event => {
					this.buttons.push(
						new Button(
							'play',
							'menu-button',
							lang == '#fr' ? 'Jouer' : 'Play',
							btn => ({
								x: (can.width - btn.img.width * this.scale) / 2,
								y: can.height - (btn.img.height + 5) * this.scale
							}),
							btn => {
								for (let overlay of [...this.overlays, ...this.buttons]) overlay.kill(300);

								game.events.push(
									new TimeEvent(200, event => {
										this.pause(false);
										this.triggerEvent('title');
										this.play_soundtrack = true;
									})
								);
							}
						)
					);
				})
			];
		} else {
			this.pause(false);
			this.triggerEvent('title');
			this.play_soundtrack = true;
		}
	}

	forTouch(x, y, mobs, callback = mob => {}) {
		for (let mob of mobs.sort((a, b) => a.getFeet().y - b.getFeet().y)) {
			if (mob != this.player) {
				let t = mob.getTargCoords();
				let pos = t && this.mode == 'strat' ? t : mob.pos;
				if (mob != this.player && pos.x + 7 < x && x < pos.x + 17 && pos.y + 10 < y && y < pos.y + 24) callback(mob);
			}
		}
	}

	tick(dtime) {
		this.goTarget(dtime);

		let coef = this.average_dtime < dtime ? 10 : 100;
		this.average_dtime = (dtime + this.average_dtime * (coef - 1)) / coef;
		if (this.average_dtime < this.best_perf) this.best_perf = Math.max(this.average_dtime, 16.6);

		this.touches.rin = Math.floor(can.height / 16);
		this.touches.rout = Math.floor(can.height / 7);

		if (this.soundtrack) {
			if (options.includes('nsound')) this.soundtrack.volume = 0;
			else if (['normal', 'title'].includes(this.mode)) this.soundtrack.volume = 1;
			else if (this.title != 'menu') this.soundtrack.volume = 0.3;
		}

		if (this.fog_map) this.fog_map.animate(dtime);

		if (this.rain) {
			// for (let i = 1; i < this.rain.amount * Math.random(); i++) {}
			let { l, t, w, h } = this.getBorders();
			let pos = { x: l + w * Math.random(), y: t + h * Math.random(), z: h };
			this.entities.particles.push(new Drop(pos, 'rain'));
		}

		this.entities.sheeps = this.entities.sheeps.filter(sheep => !sheep.dead);
		this.entities.humans = this.entities.humans.filter(human => !human.dead);
		this.entities.creatures = this.entities.creatures.filter(creature => !creature.dead);
		this.entities.particles = this.entities.particles.filter(particle => !particle.dead);

		let all_entities = [...this.entities.buildings, ...this.entities.trees, ...this.entities.sheeps, ...this.entities.humans, ...this.entities.creatures, ...this.entities.particles];
		this.ord_ent = all_entities.filter(entity => entity.inScreen()).sort((a, b) => a.getFeet().y - b.getFeet().y);

		for (let entity of all_entities) entity.animate(dtime, [...this.entities.buildings, ...this.entities.trees], [...this.entities.sheeps, ...this.entities.humans, ...this.entities.creatures]);

		for (let event of this.touch_events) {
			if (event.type == 'tap') {
				let wasButton = false;
				for (let button of this.buttons) {
					if (button.tick(event.end.x, event.end.y)) wasButton = true;
				}

				if (!wasButton && this.player && this.mode != 'pause' && this.mode != 'title') {
					let hide = () => {
						for (let id of ['bow', 'axe', 'fence', 'none']) this.getButton(id).kill(100);
					};

					let { x, y } = this.screenToGameCoords(event.end.x, event.end.y);
					let touched_human = false;

					if (this.mode == 'strat') {
						this.forTouch(
							x,
							y,
							this.entities.humans.filter(h => !h.event),
							human => {
								touched_human = true;

								if (human.target) {
									if (human.target.obj) {
										human.target = null;
									} else {
										human.target = {
											x: human.target.x - this.player.pos.x,
											y: human.target.y - this.player.pos.y,
											obj: this.player
										};
									}
								} else {
									human.target = { x: human.pos.x, y: human.pos.y, obj: null };
								}
							}
						);

						if (!touched_human) {
							this.mode = 'normal';
							this.speed = 1;
						}
					} else {
						this.forTouch(
							x,
							y,
							this.entities.humans.filter(h => h.event),
							h => {
								h.event();
								touched_human = true;
							}
						);

						if (!touched_human) {
							if (event.side == 'L') {
								if (this.getButton('bow')) hide();
								this.mode = 'strat';
								this.speed = 0.1;
								this.catched = null;
							} else {
								if (this.getButton('bow')) hide();
								else {
									this.buttons.push(
										new Button(
											'bow',
											'bow-button',
											'',
											btn => ({
												x: event.start.x - (btn.img.width / 2) * this.scale,
												y: event.start.y - (btn.img.height / 2 + 10) * this.scale
											}),
											btn => {
												hide();
												this.player.setWeapon('bow');
											},
											100,
											this.player.weapons.bow ? 'normal' : 'disabled',
											12,
											'bow'
										)
									);
									this.buttons.push(
										new Button(
											'fence',
											'fence-button',
											'',
											btn => ({
												x: event.start.x - (btn.img.width / 2 - 10) * this.scale,
												y: event.start.y - (btn.img.height / 2) * this.scale
											}),
											btn => {
												hide();
												game.player.setWeapon('fence');
											},
											100,
											this.player.weapons.fence ? 'normal' : 'disabled',
											12,
											'fence'
										)
									);
									this.buttons.push(
										new Button(
											'axe',
											'axe-button',
											'',
											btn => ({
												x: event.start.x - (btn.img.width / 2 + 10) * this.scale,
												y: event.start.y - (btn.img.height / 2) * this.scale
											}),
											btn => {
												hide();
												game.player.setWeapon('axe');
											},
											100,
											this.player.weapons.axe ? 'normal' : 'disabled',
											12,
											'axe'
										)
									);
									this.buttons.push(
										new Button(
											'none',
											'none-button',
											'',
											btn => ({
												x: event.start.x - (btn.img.width / 2) * this.scale,
												y: event.start.y - (btn.img.height / 2 - 10) * this.scale
											}),
											btn => {
												hide();
												for (let c of game.entities.creatures.filter(c => c.inScreen())) {
													let d = { x: c.pos.x - game.player.pos.x, y: c.pos.y - game.player.pos.y };
													this.events.push(
														new TimeEvent(Math.sqrt(d.x * d.x + d.y * d.y) * 10, event => {
															c.sprites.ghost.draw(this.fog_map.img.getContext('2d'), { x: Math.floor(c.pos.x + 0.5), y: Math.floor(c.pos.y + 0.5) });
														})
													);
												}
											},
											100,
											this.player.weapons.echo ? 'normal' : 'disabled',
											12,
											'none'
										)
									);
								}
							}
						}
					}
				}
			}
			if (event.type == 'drag' && this.player) {
				if (event.side == 'L') this.player.speed = 1;
				else if (this.player.look.aim) this.player.shoot();
			}
			if (event.type == 'special' && this.player) {
				if (event.side == 'L') {
					if (this.player.speed == 1) {
						this.player.speed = 1.6;
						this.player.setAlert('stamina-use', 600);
					} else if (this.player.speed < 2 && this.player.setMana('-')) {
						this.player.speed = 2.2;
						this.dimension = 2;
					}
				}
				if (event.side == 'R' && this.player.look.aim && this.player.look.aim < 3 && (this.player.weapon != 'bow' || this.player.setMana('-'))) this.player.look.aim++;
			}
		}

		if (this.player) {
			if (this.mode == 'strat') {
				for (let touch of [this.touches.L, this.touches.R]) {
					if (touch) {
						let { x, y } = this.screenToGameCoords(touch.end.x, touch.end.y);
						if (touch.catch) {
							if (touch.catch.target) {
								let t = touch.catch.getTargCoords();
								let dx = x - t.x - 12;
								let dy = y - t.y - 18;
								touch.catch.target.x += dx;
								touch.catch.target.y += dy;
							}
						} else {
							for (let human of this.entities.humans.filter(h => !h.event)) {
								let t = human.getTargCoords();
								let pos = t ? t : human.pos;
								if (human != this.player && pos.x + 7 < x && x < pos.x + 17 && pos.y + 10 < y && y < pos.y + 24) {
									touch.catch = human;
									break;
								}
							}
						}
					}
				}
			}

			if (this.mode == 'normal') {
				if (this.touches.L) {
					let move = getTouchMove(this.touches.L);
					this.player.pushTo(move.x, move.y, dtime);
				}

				let aim = 0;

				if (this.touches.R && !(this.player.arrow && this.player.arrow.level > 1 && !this.player.arrow.stuck)) {
					let move = getTouchMove(this.touches.R);
					if (move.mag > 0.5) {
						this.player.look.x = move.x;
						this.player.look.y = move.y;
						if (this.player.stamina.val) {
							if (this.player.weapon == 'axe' || this.player.weapon == 'none' || (this.player.weapon == 'bow' && this.player.wood.val) || (this.player.weapon == 'fence' && this.player.wood.val >= 10)) aim = 1;
							else if (!this.player.alert) this.player.setAlert('noamo', 300);
						}
					}
				}
				if (!this.player.look.aim || !aim) this.player.look.aim = aim;
			}

			let { x, y } = this.player.getFeet();
			for (let part of this.entities.particles) {
				let dx = part.pos.x - x;
				let dy = part.pos.y - y;
				if (!part.timeout && part.stuck && Math.sqrt(dx * dx + dy * dy) < 5) {
					if (part instanceof Arrow) {
						this.player.wood.val++;
						this.player.setAlert('plus', 600);
						part.dead = true;
					} else if (part instanceof Drop) {
						if (part.type == 'mana' && this.player.setMana('+')) part.dead = true;
						if (part.type == 'coin') {
							game.coins++;
							part.dead = true;
						}
					}
				}
			}
		}

		for (let creature of this.entities.creatures) {
			if (creature.can_see) {
				if (creature.target && creature.target.obj) {
					let dx = Math.abs(creature.target.obj.pos.x - creature.pos.x);
					let dy = Math.abs(creature.target.obj.pos.y - creature.pos.y);
					if (dx > creature.view_distance || dy > creature.view_distance || Math.sqrt(dx * dx + dy * dy) > creature.view_distance) creature.target = null;
				}

				if (!creature.target || !creature.target.obj || creature.target.obj.health.val <= 0) {
					for (let mob of [...this.entities.humans, ...this.entities.sheeps]) {
						let dx = Math.abs(mob.pos.x - creature.pos.x);
						let dy = Math.abs(mob.pos.y - creature.pos.y);
						if (dx < creature.view_distance && dy < creature.view_distance && Math.sqrt(dx * dx + dy * dy) < creature.view_distance) {
							creature.setAlert('exclam', 600);
							// creature.sprites.ghost.draw(this.fog_map.img.getContext('2d'), { x: Math.floor(creature.pos.x + 0.5), y: Math.floor(creature.pos.y + 0.5) });
							creature.target = { obj: mob, x: 0, y: 0 };
						}
					}
				}
			} else creature.target = null;
		}

		for (let event of this.events) event.tick();
		this.events = this.events.filter(event => !event.done);

		for (let overlay of [...this.overlays, ...this.buttons]) {
			if (overlay.die_time && overlay.die_time - time <= 0) overlay.done = true;
		}

		this.buttons = this.buttons.filter(button => !button.done);
		this.overlays = this.overlays.filter(overlay => !overlay.done);

		this.touch_events = [];
	}

	graphics(dtime) {
		let mctx = can.getContext('2d');
		let gctx = this.can.getContext('2d');

		mctx.imageSmoothingEnabled = false;

		const fill = (ctx, color) => {
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, can.width, can.height);
		};

		this.borders = this.getBorders();

		// Background
		fill(mctx, this.bg_color);

		// Ground
		gctx.drawImage(this.ground, 0, 0);

		// Foot steps
		for (let fs of this.foot_steps) {
			let op = 0.2 - (time - fs.time) / 10000;
			if (op > 0) {
				gctx.fillStyle = `rgba(0, 0, 0, ${op})`;
				gctx.fillRect(fs.x, fs.y, 1, 1);
			} else fs.time = null;
		}

		this.foot_steps = this.foot_steps.filter(fs => fs.time);

		// Events
		for (let event of this.events) event.draw(gctx);

		// Entities
		for (let entity of this.ord_ent) entity.draw(gctx, 'shadow');
		for (let entity of this.ord_ent) entity.draw(gctx, 'main');

		// Tree calc
		if (this.tree_calc) gctx.drawImage(this.tree_calc, 0, 0);

		// fog_map
		if (this.fog_map) gctx.drawImage(this.fog_map.img, 0, 0);

		// strat/title calc
		fill(gctx, `rgba(0, 0, 0, ${this.strat_fog * (this.mode == 'title' ? 1 : 0.6)})`);
		if (['strat', 'title'].includes(this.mode)) this.strat_fog = this.strat_fog * 0.8 + 0.2;
		else this.strat_fog = this.strat_fog * 0.8;

		// Particle ghost
		for (let particle of [...this.entities.particles].sort((a, b) => a.getFeet().y - b.getFeet().y)) {
			if (particle.color != '#202124') particle.draw(gctx, 'main', this.fog_map ? 0.5 : 0.1);
		}

		// Human ghost
		if (game.getHuman('eliot')) {
			for (let human of [...this.entities.humans].sort((a, b) => a.getFeet().y - b.getFeet().y)) {
				if (this.mode == 'title') gctx.globalAlpha = 0.2 * (1 - this.strat_fog);
				else gctx.globalAlpha = 0.2 + 0.8 * this.strat_fog;

				if (game.mode == 'strat' && human.target) {
					let { x, y } = human.getTargCoords();
					human.draw(gctx, 'main', { x: Math.floor(x + 0.5), y: Math.floor(y + 0.5), z: human.pos.z });
				} else human.draw(gctx, 'main');

				let { x, y, z } = human.pos;
				let t = human.getTargCoords();
				if (this.mode == 'strat' && t) {
					x = t.x;
					y = t.y;
				}

				x += 0.5;
				y += 0.5;

				if (human.alert && game.mode != 'title') {
					gctx.globalAlpha = human.alert.duration ? (human.alert.timeout - time) / human.alert.duration : 1;
					if (human.event && game.mode != 'normal') gctx.globalAlpha = 1 - gctx.globalAlpha;
					human.draw(gctx, human.alert.icon, { x: x, y: y, z: z });
				} else if (game.mode == 'strat' && human.target && human != this.player) {
					if (human.target.obj == this.player) human.draw(gctx, 'icon-follow', { x: x, y: y, z: z });
					else human.draw(gctx, 'icon-stay', { x: x, y: y, z: z });
				} else human.draw(gctx, 'icon-null', { x: x, y: y, z: z });

				if (human.look.aim && human.weapon != 'fence') {
					gctx.globalAlpha = 0.5;
					gctx.fillStyle = `white`;

					let i1 = human.weapon == 'bow' ? 12 : 6;
					let i2 = human.weapon == 'bow' ? 16 : 9;
					let pos = human.getFeet();

					let x1 = Math.floor(pos.x + human.look.x * i1);
					let y1 = Math.floor(pos.y + human.look.y * i1 - 8);
					let x2 = Math.floor(pos.x + human.look.x * i2);
					let y2 = Math.floor(pos.y + human.look.y * i2 - 8);

					for (let p of this.getLine(x1, y1, x2, y2)) gctx.fillRect(p[0], p[1], 1, 1);
				}
			}
		}

		// Creature alert
		for (let creature of this.entities.creatures) {
			let a = creature.alert;
			if (a) {
				let { x, y, z } = creature.pos;
				x += 0.5;
				y += 0.5;
				gctx.globalAlpha = a.duration ? (a.timeout - time) / a.duration : 1;
				creature.draw(gctx, a.icon, { x: x, y: y, z: z });
			}
		}

		// pause mode
		let pause_duration = time - this.pause_time;
		if (pause_duration < 200) {
			gctx.globalAlpha = this.mode != 'pause' ? 1 - pause_duration / 200 : pause_duration / 200;
			fill(gctx, '#202124');
		} else if (this.mode == 'pause') {
			gctx.globalAlpha = 1;
			fill(gctx, '#202124');
		}

		gctx.globalAlpha = 1;

		// Game canvas draw
		mctx.drawImage(this.can, -this.cam.x * this.scale + can.width / 2, -this.cam.y * this.scale + can.height / 2, this.ground.width * this.scale, this.ground.height * this.scale);

		// Overlays and buttons
		for (let overlay of this.overlays) overlay.draw();
		for (let button of this.buttons) button.draw();

		// Joysticks
		let onSpecial = this.player && this.player.arrow && this.player.arrow.level > 1 && !this.player.arrow.stuck;
		let touch_colors = {
			L: `rgba(255, 255, 255, 0.3)`,
			R: onSpecial ? `rgba(154, 154, 255, 0.4)` : `rgba(255, 255, 255, 0.3)`
		};

		for (let side of ['L', 'R']) {
			let touch = this.touches[side];

			mctx.fillStyle = touch_colors[side];
			mctx.strokeStyle = touch_colors[side];
			mctx.lineWidth = this.touches.rin / 16;

			if (touch) {
				if (game.player && this.mode == 'normal' && !(onSpecial && side == 'R')) {
					mctx.beginPath();
					mctx.arc(touch.start.x, touch.start.y, game.touches.rout, 0, 2 * Math.PI);
					mctx.stroke();
				}

				mctx.beginPath();
				mctx.arc(touch.end.x, touch.end.y, game.touches.rin, 0, 2 * Math.PI);
				mctx.fill();
			}
		}

		// Black screen
		fill(mctx, `rgba(0, 0, 0, ${this.cam.o})`);
	}

	loadImg(files, callback = () => {}) {
		let load_num = 0;
		for (let file of files) {
			let src = './img/' + file;

			let img = new Image();
			img.src = src;

			img.addEventListener('error', event => {
				if (lang == '#dev') dev_log = src;
				setScreen('error', lang == '#fr' ? 'Erreur de chargement.' : 'Loading error.');
			});

			img.addEventListener('load', event => {
				if (mode != 'error') {
					load_num++;
					load_bar.front.style.width = `${(load_num / files.length) * 128}px`;
					setScreen('loading', `Loading...<br/><br/>${src}`);

					let key = src.split('/')[src.split('/').length - 1].split('.')[0];
					this.images[key] = img;

					if (load_num == files.length) callback();
				}
			});
		}

		// console.log(`${index + 1}/${files.length}: loading`, src);
	}

	goTarget(dtime) {
		if (this.mode == 'pause') this.cam.targ_h = 100;
		else if (this.mode == 'title') this.cam.targ_h = 64;
		else if (this.fog_map && this.player) this.cam.targ_h = Math.min(Math.max(64, this.player.view_distance * 2), 72);
		else this.cam.targ_h = this.cam.default_h;

		let t = this.cam.target;
		let x, y;
		let s = this.cam.targ_speed / (this.speed * dtime);

		if (t.pos) {
			x = t.pos.x + 12;
			y = t.pos.y + 16;
		} else {
			x = t.x;
			y = t.y;
		}

		this.cam.x += (x - this.cam.x) / s;
		this.cam.y += (y - this.cam.y) / s;
		this.cam.h += (this.cam.targ_h - this.cam.h) / s;
		this.cam.o += (this.cam.targ_o - this.cam.o) / s;

		if (this.dimension == 0) {
			this.dimension++;
			can.classList.remove('grayscale');
			if (this.fog) {
				this.fog_map = new FogMap(this.ground.width, this.ground.height);
				game.fog_map.humans.push(this.player);
				this.fog_map.fill();
			}
		}

		if (this.dimension == 2) {
			this.dimension++;
			this.fog_map = null;
			can.classList.add('grayscale');
		}

		if (this.dimension == 3) {
			this.cam.x += ((Math.random() * 2 - 1) / 20) * this.scale;
			this.cam.y += ((Math.random() * 2 - 1) / 20) * this.scale;
			if (this.player.speed < 2) this.dimension = 0;
		}
	}

	getHuman(name) {
		for (let human of game.entities.humans) {
			if (human.name == name) return human;
		}
	}

	getButton(id) {
		for (let button of this.buttons) {
			if (button.id == id) return button;
		}
	}

	getOverlay(id) {
		for (let overlay of this.overlays) {
			if (overlay.id == id) return overlay;
		}
	}

	getTrees(img) {
		let canvas = document.createElement('canvas');
		canvas.height = img.height;
		canvas.width = img.width;

		let ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);

		console.log('Loading trees..');
		let trees = [];

		for (let y = 0; y < canvas.height; y++) {
			for (let x = 0; x < canvas.width; x++) {
				let p = ctx.getImageData(x, y, 1, 1).data;
				if (p[0] == 255 && p[1] == 0 && p[2] == 0) {
					console.log(x, y);
					trees.push({ x: x, y: y, z: 0 });
				}
			}
		}

		console.log(trees);
	}

	screenToGameCoords(x, y) {
		return {
			x: this.cam.x + (x - can.width / 2) / this.scale + 0.5,
			y: this.cam.y + (y - can.height / 2) / this.scale + 0.5
		};
	}

	TvSnow() {
		let light = { r: 205, g: 202, b: 211 };
		let dark = { r: 32, g: 33, b: 36 };

		this.can.width = 128;
		this.can.height = 64 * 8;

		let ctx = this.can.getContext('2d');

		for (let y = 0; y < this.can.height; y++) {
			for (let x = 0; x < this.can.width; x++) {
				let color = { r: 0, g: 0, b: 0 };
				let c = Math.random();
				for (let p of 'rgb') color[p] = light[p] * c + dark[p] * (1 - c);

				ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 255)`;
				ctx.fillRect(x, y, 1, 1);
			}
		}

		this.screenshot();
	}

	screenshot() {
		var link = document.createElement('a');
		link.download = 'screenshot.png';
		link.href = this.can.toDataURL();
		link.click();
	}

	getLine(x1, y1, x2, y2) {
		let points = [];
		let strpts = [];

		let dx = x2 - x1;
		let dy = y2 - y1;

		let mag = Math.sqrt(dx * dx + dy * dy);
		let n = Math.floor(mag * 1.2);

		for (let i = 0; i < n; i++) {
			let c = i / n;
			let p = [Math.floor(x1 + dx * c), Math.floor(y1 + dy * c)];
			let str = p.toString();
			if (!strpts.includes(str)) {
				points.push(p);
				strpts.push(str);
			}
		}

		return points;
	}

	getBorders() {
		let tl = this.screenToGameCoords(0, 0);
		let br = this.screenToGameCoords(can.width, can.height);

		let border = 5;

		return {
			l: -border + tl.x,
			t: -border + tl.y,
			w: br.x - tl.x + border * 2,
			h: br.y - tl.y + border * 2
		};
	}
}

class FogMap {
	constructor(gw, gh) {
		this.img = document.createElement('canvas');
		this.img.width = gw;
		this.img.height = gh;

		this.pix_size = 1;
		this.pix_time = time;
		this.humans = [];
	}

	ctx() {
		return this.img.getContext('2d');
	}

	fill() {
		this.ctx().fillStyle = '#202124';
		this.ctx().fillRect(0, 0, this.img.width, this.img.height);
	}

	animate(dtime) {
		let ctx = this.ctx();
		ctx.fillStyle = '#202124';

		let drawPix = (pixel, mag, view_distance) => {
			ctx.globalAlpha = 1;
			if (mag < view_distance) {
				ctx.clearRect(pixel.x, pixel.y, this.pix_size, this.pix_size);
				ctx.globalAlpha = mag / view_distance + ((mag / view_distance) * Math.random()) / 4;
			}
			ctx.fillRect(pixel.x, pixel.y, this.pix_size, this.pix_size);
		};

		if (time - this.pix_time > 500) {
			if (this.pix_size < 4 && game.average_dtime > game.best_perf * 2.5) this.pix_size++;
			else if (this.pix_size > 1 && game.average_dtime < game.best_perf * 1.6) this.pix_size--;

			this.pix_time = time;
		}

		let { l, t, w, h } = game.getBorders();

		for (let i = 0; i < Math.max(200, dtime * game.speed * this.humans[0].view_distance * 0.2) / (this.pix_size * this.pix_size); i++) {
			let p = {
				x: Math.floor(l + Math.random() * w),
				y: Math.floor(t + Math.random() * h)
			};

			let mag = Infinity;

			for (let human of this.humans) {
				let h = {
					x: Math.floor(human.pos.x + 12),
					y: Math.floor(human.pos.y + 16)
				};

				let d = {
					x: p.x - h.x,
					y: p.y - h.y
				};

				let new_mag = Math.sqrt(d.x * d.x + d.y * d.y);
				if (new_mag < mag) {
					mag = new_mag;
				}
			}

			drawPix(p, mag, this.humans[0].view_distance);
		}

		ctx.globalAlpha = 1;
	}
}
