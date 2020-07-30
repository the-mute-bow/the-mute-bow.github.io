var pages = [];

class Game {
	constructor() {
		this.images = [];
		this.sounds = {};
		this.soundtrack = null;
		this.loop = false;
		this.ground = null;
		this.tree_calc = null;
		this.bg_color = 'black';
		this.scale = 1;
		this.speed = 1;
		this.mode = 'normal';

		this.cam = { x: 0, y: 0, h: 100, o: 0, targ_h: 100, targ_o: 0, targ_speed: 1, target: { x: 200, y: 200 } };
		this.strat_fog = 0;

		this.entities = {
			buildings: [],
			trees: [],
			humans: []
		};

		this.foot_steps = [];
		this.player = null;

		this.touches = { L: null, R: null, rin: Math.floor(20 * dpi), rout: Math.floor(50 * dpi) };
		this.touch_events = [];
		this.buttons = [];
		this.overlays = [];
		this.events = [];
		this.can = document.createElement('canvas');
	}

	tick(dtime) {
		this.goTarget(dtime);

		for (let entity of [...this.entities.trees, ...this.entities.humans])
			entity.animate(dtime, [...this.entities.buildings, ...this.entities.trees], [...this.entities.humans]);

		for (let event of this.touch_events) {
			if (event.type == 'tap') {
				let wasButton = false;
				for (let button of this.buttons) {
					if (button.tick(event.end.x, event.end.y)) wasButton = true;
				}

				if (!wasButton && this.player) {
					let hide = () => {
						for (let id of ['bow', 'axe', 'fence', 'none']) this.getButton(id).die_time = time + 100;
					};

					if (this.mode == 'strat') {
						let { x, y } = this.screenToGameCoords(event.end.x, event.end.y);
						let touched_human = false;
						for (let human of this.entities.humans) {
							if (human != this.player) {
								let t = human.getTargCoords();
								let pos = t ? t : human.pos;
								if (
									human != this.player &&
									pos.x + 7 < x &&
									x < pos.x + 17 &&
									pos.y + 10 < y &&
									y < pos.y + 24
								) {
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
			if (event.type == 'drag') {
				if (event.side == 'L' && this.player) this.player.speed = 1;
			}
			if (event.type == 'special') {
				if (event.side == 'L' && this.player) this.player.speed = this.player.speed == 2 ? 1 : 2;
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
								if (
									human != this.player &&
									pos.x + 7 < x &&
									x < pos.x + 17 &&
									pos.y + 10 < y &&
									y < pos.y + 24
								) {
									touch.catch = human;
									break;
								}
							}
						}
					}
				}
			}

			if (this.touches.L && this.mode == 'normal') {
				let move = getTouchMove(this.touches.L);
				this.player.pushTo(move.x, move.y, dtime);
			}

			if (time - this.player.stamina.time > 800 / (this.player.speed * 2 - 1)) {
				this.player.stamina.time = time;
				if (this.player.speed == 2) {
					if (this.player.stamina.val <= 0) this.player.speed = 1;
					else this.player.stamina.val--;
				} else if (this.player.stamina.val < this.player.stamina.max) this.player.stamina.val++;
			}
		}

		for (let event of this.events) event.tick();
		this.events = this.events.filter(event => !event.done);

		for (let button of this.buttons) {
			if (button.die_time && button.die_time - time <= 0) button.done = true;
		}
		this.buttons = this.buttons.filter(button => !button.done);

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
		let ord_ent = [...this.entities.buildings, ...this.entities.humans, ...this.entities.trees].sort(
			(a, b) => a.getFeet().y - b.getFeet().y
		);

		for (let entity of ord_ent) entity.draw(gctx, 'shadow');
		for (let entity of ord_ent) entity.draw(gctx, 'main');

		// Tree calc
		gctx.drawImage(this.tree_calc, 0, 0);

		// Strat fog
		fill(gctx, `rgba(0, 0, 0, ${this.strat_fog * 0.6})`);
		if (this.mode == 'strat') this.strat_fog = this.strat_fog * 0.8 + 0.2;
		else this.strat_fog = this.strat_fog * 0.8;

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
		}
		gctx.globalAlpha = 1;

		// Game canvas draw
		mctx.drawImage(
			this.can,
			-this.cam.x * this.scale + can.width / 2,
			-this.cam.y * this.scale + can.height / 2,
			this.ground.width * game.scale,
			this.ground.height * game.scale
		);

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
			mctx.lineWidth = 4;

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
		if (this.player) {
			let c = can.height / 50;
			let offset = { x: c, y: c };
			let i = this.player.health.val;
			while (i > 0) {
				mctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
				mctx.fillRect(offset.x + 0.5 * c, offset.y + 0.5 * c, 2 * c, 2 * c);

				mctx.fillStyle = i > 1 ? `rgba(192, 48, 48, 0.8)` : `rgba(128, 48, 48, 0.6)`;
				mctx.fillRect(offset.x, offset.y, 2 * c, 2 * c);

				offset.x += 3 * c;
				i -= i > 1 ? 2 : 1;
			}

			mctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
			mctx.fillRect(offset.x + 0.5 * c, offset.y + 0.5 * c, this.player.stamina.val * c, c);
			mctx.fillStyle = `rgba(255, 255, 255, 0.6)`;
			mctx.fillRect(offset.x, offset.y, this.player.stamina.val * c, c);

			offset.y += c;

			mctx.fillStyle = `rgba(0, 0, 0, 0.2)`;
			mctx.fillRect(offset.x + 0.5 * c, offset.y + 0.5 * c, this.player.mana.val * c, c);
			mctx.fillStyle = `rgba(96, 64, 192, 0.6)`;
			mctx.fillRect(offset.x, offset.y, this.player.mana.val * c, c);
		}

		// Black screen
		fill(mctx, `rgba(0, 0, 0, ${this.cam.o})`);
	}

	loadImg(files, index = 0, callback = () => {}) {
		let src = './img/' + files[index];

		// console.log(`${index + 1}/${files.length}: loading`, src);

		let img = new Image();
		img.src = src;

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
}
