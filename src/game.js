var pages = [];

class Game {
	constructor() {
		this.loop = false;
		this.title = null;

		this.best_perf = 40;
		this.average_dtime = 40;

		this.images = [];
		this.sounds = {};
		this.soundtrack = null;

		this.ground = null;
		this.tree_calc = null;
		this.fog_map = null;

		this.bg_color = 'black';
		this.scale = 1;
		this.speed = 1;
		this.mode = 'normal';
		this.pause_time = 0;
		this.fps = { frames: 0, duration: 0, value: 0 };

		this.cam = { x: 0, y: 0, h: 100, o: 0, targ_h: 100, default_h: 100, targ_o: 0, targ_speed: 1, target: { x: 200, y: 200 } };
		this.strat_fog = 0;

		this.entities = {
			buildings: [],
			trees: [],
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

		this.can = document.createElement('canvas');
		this.borders = null;
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

	tick(dtime) {
		this.goTarget(dtime);

		this.average_dtime = (dtime + this.average_dtime * 99) / 100;
		if (this.average_dtime < this.best_perf) this.best_perf = Math.max(dtime, 16.6);

		this.touches.rin = Math.floor(can.height / 16);
		this.touches.rout = Math.floor(can.height / 7);

		if (this.soundtrack) {
			if (this.mode == 'normal') this.soundtrack.volume = 0.3;
			else if (this.title != 'menu') this.soundtrack.volume = 0.1;
		}

		if (this.fog_map) this.fog_map.animate(dtime);

		this.entities.humans = this.entities.humans.filter(human => !human.dead);
		this.entities.creatures = this.entities.creatures.filter(creature => !creature.dead);

		for (let entity of [...this.entities.trees, ...this.entities.humans, ...this.entities.creatures, ...this.entities.particles])
			entity.animate(dtime, [...this.entities.buildings, ...this.entities.trees], [...this.entities.humans, ...this.entities.creatures]);

		this.ord_ent = [...this.entities.buildings, ...this.entities.humans, ...this.entities.creatures, ...this.entities.trees, ...this.entities.particles].filter(entity => entity.inScreen()).sort((a, b) => a.getFeet().y - b.getFeet().y);

		for (let event of this.touch_events) {
			if (event.type == 'tap') {
				let wasButton = false;
				for (let button of this.buttons) {
					if (button.tick(event.end.x, event.end.y)) wasButton = true;
				}

				if (!wasButton && this.player && game.mode != 'pause') {
					let hide = () => {
						for (let id of ['bow', 'axe', 'fence', 'none']) this.getButton(id).kill(100);
					};

					if (this.mode == 'strat') {
						let { x, y } = this.screenToGameCoords(event.end.x, event.end.y);
						let touched_human = false;
						for (let human of this.entities.humans) {
							if (human != this.player) {
								let t = human.getTargCoords();
								let pos = t ? t : human.pos;
								if (human != this.player && pos.x + 7 < x && x < pos.x + 17 && pos.y + 10 < y && y < pos.y + 24) {
									touched_human = true;
									if (human.target) {
										if (human.target.obj) {
											human.target.x = human.target.obj.pos.x + human.target.x;
											human.target.y = human.target.obj.pos.y + human.target.y;
											human.target.obj = null;
										} else {
											human.target = null;
										}
									} else {
										human.target = {
											x: human.pos.x - this.player.pos.x,
											y: human.pos.y - this.player.pos.y,
											obj: this.player
										};
									}
								}
							}
						}

						if (!touched_human) {
							this.mode = 'normal';
							this.speed = 1;
						}
					} else if (event.side == 'L') {
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
										x: event.start.x - (btn.img.width / 2) * game.scale,
										y: event.start.y - (btn.img.height / 2 + 10) * game.scale
									}),
									btn => {
										hide();
										game.player.setWeapon('bow');
									},
									100,
									'normal',
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
										x: event.start.x - (btn.img.width / 2 - 10) * game.scale,
										y: event.start.y - (btn.img.height / 2) * game.scale
									}),
									btn => {
										hide();
										game.player.setWeapon('fence');
									},
									100,
									'normal',
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
										x: event.start.x - (btn.img.width / 2 + 10) * game.scale,
										y: event.start.y - (btn.img.height / 2) * game.scale
									}),
									btn => {
										hide();
										game.player.setWeapon('axe');
									},
									100,
									'normal',
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
										x: event.start.x - (btn.img.width / 2) * game.scale,
										y: event.start.y - (btn.img.height / 2 - 10) * game.scale
									}),
									btn => {
										hide();
										game.player.setWeapon('none');
									},
									100,
									'normal',
									12,
									'none'
								)
							);
						}
					}
				}
			}
			if (event.type == 'drag' && this.player) {
				if (event.side == 'L') this.player.speed = 1;
				else if (this.player.look.aim) this.player.shoot(event, 1);
			}
			if (event.type == 'special' && this.player) {
				if (event.side == 'L') this.player.speed = this.player.speed == 2 ? 1 : 2;
				if (event.side == 'R' && this.player.look.aim) {
					this.player.shoot(event, 2);
					this.player.look.aim = false;
					this.touches.R = null;
				}
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
							for (let human of this.entities.humans) {
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

				let aim = false;
				if (this.touches.R) {
					let move = getTouchMove(this.touches.R);
					if (move.mag > 0.2) {
						this.player.look.x = move.x;
						this.player.look.y = move.y;
						if (this.player.stamina.val) {
							if (this.player.wood.val) aim = true;
							else if (!this.player.alert) this.player.setAlert('noamo', 1800);
						}
					}
				}

				this.player.look.aim = aim;
			}

			if (this.player.wood.val < this.player.wood.max) {
				let { x, y } = this.player.getFeet();
				for (let part of this.entities.particles) {
					let dx = part.pos.x - x;
					let dy = part.pos.y - y;
					if (part instanceof Arrow && part.stuck && Math.sqrt(dx * dx + dy * dy) < 5) {
						part.dead = true;
						this.player.wood.val++;
						this.player.setAlert('plus', 600);
					}
				}
			}
		}

		for (let creature of this.entities.creatures) {
			let trig_dist = 40;

			if (creature.target && creature.target.obj) {
				let dx = Math.abs(creature.target.obj.pos.x - creature.pos.x);
				let dy = Math.abs(creature.target.obj.pos.y - creature.pos.y);
				if (dx > trig_dist || dy > trig_dist || Math.sqrt(dx * dx + dy * dy) > trig_dist) creature.target = null;
			}

			if (!creature.target || !creature.target.obj || creature.target.obj.health.val <= 0) {
				for (let human of this.entities.humans) {
					let dx = Math.abs(human.pos.x - creature.pos.x);
					let dy = Math.abs(human.pos.y - creature.pos.y);
					if (dx < trig_dist && dy < trig_dist && Math.sqrt(dx * dx + dy * dy) < trig_dist) {
						creature.setAlert('exclam', 600);
						creature.target = { obj: human, x: 0, y: 0 };
					}
				}
			}
		}

		for (let event of this.events) event.tick();
		this.events = this.events.filter(event => !event.done);

		for (let overlay of [...this.overlays, ...this.buttons]) {
			if (overlay.die_time && overlay.die_time - time <= 0) overlay.done = true;
		}

		this.buttons = this.buttons.filter(button => !button.done);
		this.overlays = this.overlays.filter(overlay => !overlay.done);
		this.entities.particles = this.entities.particles.filter(part => !part.dead);

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

		// Entities
		for (let entity of this.ord_ent) entity.draw(gctx, 'shadow');
		for (let entity of this.ord_ent) entity.draw(gctx, 'main');

		// Tree calc
		gctx.drawImage(this.tree_calc, 0, 0);

		// fog_map
		if (this.fog_map) gctx.drawImage(this.fog_map.img, 0, 0);

		// Strat fog
		fill(gctx, `rgba(0, 0, 0, ${this.strat_fog * 0.6})`);
		if (this.mode == 'strat') this.strat_fog = this.strat_fog * 0.8 + 0.2;
		else this.strat_fog = this.strat_fog * 0.8;

		// Particle ghost
		for (let particle of [...this.entities.particles].sort((a, b) => a.getFeet().y - b.getFeet().y)) particle.draw(gctx, 'main', this.fog_map ? 0.5 : 0.1);

		// Human ghost
		for (let human of [...this.entities.humans].sort((a, b) => a.getFeet().y - b.getFeet().y)) {
			gctx.globalAlpha = 0.2 + 0.8 * this.strat_fog;
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

			if (game.mode == 'normal' && human.alert) {
				gctx.globalAlpha = human.alert.duration ? (human.alert.timeout - time) / human.alert.duration : 1;
				human.draw(gctx, human.alert.icon, { x: x, y: y, z: z });
			} else if (human.target && human != this.player) {
				if (human.target.obj == this.player) human.draw(gctx, 'icon-follow', { x: x, y: y, z: z });
				else human.draw(gctx, 'icon-stay', { x: x, y: y, z: z });
			} else human.draw(gctx, 'icon-null', { x: x, y: y, z: z });

			if (human.look.aim) {
				gctx.globalAlpha = 1;
				gctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
				let x = Math.floor(human.pos.x + 11.5 + human.look.x * 15);
				let y = Math.floor(human.pos.y + 16.5 + human.look.y * 15);
				gctx.fillRect(x, y, 1, 1);
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
		mctx.drawImage(this.can, -this.cam.x * this.scale + can.width / 2, -this.cam.y * this.scale + can.height / 2, this.ground.width * game.scale, this.ground.height * game.scale);

		for (let overlay of this.overlays) overlay.draw();
		for (let button of this.buttons) button.draw();

		// Joysticks
		let touch_colors = {
			L: `rgba(255, 255, 255, 0.3)`,
			R: `rgba(255, 255, 255, 0.3)`
		};

		for (let side of ['L', 'R']) {
			let touch = this.touches[side];

			mctx.fillStyle = touch_colors[side];
			mctx.strokeStyle = touch_colors[side];
			mctx.lineWidth = this.touches.rin / 16;

			if (touch) {
				if (game.player && this.mode == 'normal') {
					mctx.beginPath();
					mctx.arc(touch.start.x, touch.start.y, game.touches.rout, 0, 2 * Math.PI);
					mctx.stroke();
				}

				mctx.beginPath();
				mctx.arc(touch.end.x, touch.end.y, game.touches.rin, 0, 2 * Math.PI);
				mctx.fill();
			}
		}

		// health, stamina, mana
		// if (this.player && this.mode != 'pause') {
		// 	let c = can.height / 50;
		// 	let offset = { x: c, y: c };
		// 	let i = this.player.health.val;
		// 	while (i > 0) {
		// 		mctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
		// 		mctx.fillRect(offset.x + 0.5 * c, offset.y + 0.5 * c, 2 * c, 2 * c);

		// 		mctx.fillStyle = i > 1 ? `rgba(192, 48, 48, 0.8)` : `rgba(128, 48, 48, 0.6)`;
		// 		mctx.fillRect(offset.x, offset.y, 2 * c, 2 * c);

		// 		offset.x += 3 * c;
		// 		i -= i > 1 ? 2 : 1;
		// 	}

		// 	mctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
		// 	mctx.fillRect(offset.x + 0.5 * c, offset.y + 0.5 * c, this.player.stamina.val * c, c);
		// 	mctx.fillStyle = `rgba(255, 255, 255, 0.6)`;
		// 	mctx.fillRect(offset.x, offset.y, this.player.stamina.val * c, c);

		// 	offset.y += c;

		// 	mctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
		// 	mctx.fillRect(offset.x + 0.5 * c, offset.y + 0.5 * c, this.player.mana.val * c, c);
		// 	mctx.fillStyle = `rgba(96, 64, 192, 0.6)`;
		// 	mctx.fillRect(offset.x, offset.y, this.player.mana.val * c, c);
		// }

		// Black screen
		fill(mctx, `rgba(0, 0, 0, ${this.cam.o})`);
	}

	loadImg(files, index = 0, callback = () => {}) {
		let src = './img/' + files[index];

		load_bar.front.style.width = `${(index / (files.length - 1)) * 128}px`;

		// console.log(`${index + 1}/${files.length}: loading`, src);

		let img = new Image();
		img.src = src;

		img.addEventListener('error', event => {
			if (lang == '#dev') dev_log = src;
			setScreen('error', lang == '#fr' ? 'Erreur de chargement.' : 'Loading error.');
		});

		img.addEventListener('load', event => {
			let key = src.split('/')[src.split('/').length - 1].split('.')[0];
			this.images[key] = img;

			if (index + 1 < files.length) this.loadImg(files, index + 1, callback);
			else {
				// console.log('Loaded', this.images);
				callback();
			}
		});
	}

	goTarget(dtime) {
		if (this.mode == 'pause') this.cam.targ_h = 100;
		else if (this.fog_map && this.player) this.cam.targ_h = Math.min(Math.max(64, this.player.view_distance * 2), 72);
		else this.cam.targ_h = this.cam.default_h;

		let t = this.cam.target;
		let x, y;
		let s = this.cam.targ_speed / (this.speed * dtime);

		if (t.pos) {
			x = t.pos.x + 12;
			y = t.pos.y + 12;
		} else {
			x = t.x;
			y = t.y;
		}

		this.cam.x += (x - this.cam.x) / s;
		this.cam.y += (y - this.cam.y) / s;
		this.cam.h += (this.cam.targ_h - this.cam.h) / s;
		this.cam.o += (this.cam.targ_o - this.cam.o) / s;
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

	screenshot() {
		document.documentElement.innerHTML = `<img src='${this.can.toDataURL()}'></img>`;
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
		this.ctx().fillStyle = '#212423';
		this.ctx().fillRect(0, 0, this.img.width, this.img.height);
	}

	animate(dtime) {
		let ctx = this.ctx();
		ctx.fillStyle = '#212423';

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

		for (let i = 0; i < Math.max(200, (dtime * game.speed * this.humans[0].view_distance * 5000) / (w * h)) / (this.pix_size * this.pix_size); i++) {
			let p = {
				x: Math.floor(l + Math.random() * w),
				y: Math.floor(t + Math.random() * h)
			};

			let mag = Infinity;

			for (let human of this.humans) {
				let h = {
					x: Math.floor(human.pos.x + 12),
					y: Math.floor(human.pos.y + 12)
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
