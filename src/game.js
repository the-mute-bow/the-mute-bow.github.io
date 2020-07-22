var pages = [];

class Game {
	constructor() {
		this.images = [];
		this.loop = false;
		this.ground = null;
		this.bg_color = 'black';
		this.scale = 1;
		this.speed = 1;

		this.cam = { x: 0, y: 0, h: 100, o: 0, targ_h: 100, targ_o: 0, targ_speed: 1, target: { x: 200, y: 200 } };

		this.entities = {
			buildings: [],
			trees: [],
			humans: []
		};

		this.player = null;

		this.touches = { L: null, R: null, rin: Math.floor(20 * dpi), rout: Math.floor(50 * dpi) };
		this.touch_events = [];
		this.can = document.createElement('canvas');
	}

	tick(dtime) {
		this.goTarget(dtime);

		for (let entity of [...this.entities.trees, ...this.entities.humans]) entity.animate(dtime);

		if (game.player) {
			for (let event of this.touch_events) {
				if (event.type == 'special') {
					if (event.side == 'L') {
						if (this.player.stamina.val > 6) {
							this.player.speed = 5;
							this.player.pushTo(event.x * 20, event.y * 20, dtime);
							this.player.stamina.val -= 6;
						}
					}
				}
			}

			if (this.touches.L) {
				let move = getTouchMove(this.touches.L);
				this.player.pushTo(move.x, move.y, dtime);
			}

			if (time - this.player.stamina.time > 800) {
				this.player.stamina.time = time;
				if (this.player.stamina.val < this.player.stamina.max) this.player.stamina.val++;
			}
		}

		this.touch_events = [];
	}

	graphics(dtime) {
		let mctx = can.getContext('2d');
		let gctx = this.can.getContext('2d');

		mctx.imageSmoothingEnabled = false;

		const fill = color => {
			mctx.fillStyle = color;
			mctx.fillRect(0, 0, can.width, can.height);
		};

		// Background
		fill(this.bg_color);

		// Ground
		gctx.drawImage(this.ground, 0, 0);

		// Entities
		let ord_ent = [...this.entities.buildings, ...this.entities.humans, ...this.entities.trees].sort(
			(a, b) => a.getFeet().y - b.getFeet().y
		);

		for (let entity of ord_ent) entity.draw(gctx, 'shadow');
		for (let entity of ord_ent) entity.draw(gctx, 'main');

		gctx.globalAlpha = 0.2;
		for (let human of [...this.entities.humans].sort((a, b) => a.getFeet().y - b.getFeet().y))
			human.draw(gctx, 'main');
		gctx.globalAlpha = 1;

		// Tree calc
		gctx.drawImage(this.images['tree-calc'], 0, 0);

		// Game canvas draw
		mctx.drawImage(
			this.can,
			-this.cam.x * this.scale + can.width / 2,
			-this.cam.y * this.scale + can.height / 2,
			this.ground.height * game.scale,
			this.ground.width * game.scale
		);

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
				if (game.player) {
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
		fill(`rgba(0, 0, 0, ${this.cam.o})`);
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
}
