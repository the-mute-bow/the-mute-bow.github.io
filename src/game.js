var pages = [];

class Game {
	constructor() {
		this.images = [];
		this.loop = false;
		this.ground = null;
		this.bg_color = 'black';
		this.scale = 1;
		this.speed = 1;

		this.cam = { x: 0, y: 0, h: 16, o: 1, targ_h: 16, targ_o: 1, targ_speed: 1, target: { x: 0, y: 0 } };

		this.entities = {
			buildings: [],
			humans: []
		};

		this.player = new Entity({ x: 0, y: 0, z: 0 }, {});

		this.touches = { L: null, R: null, rin: Math.floor(20 * dpi), rout: Math.floor(50 * dpi) };
		this.touch_events = [];
		this.can = document.createElement('canvas');
	}

	tick(frame) {
		this.goTarget();

		if (this.touches.L) {
			let move = getTouchMove(this.touches.L);
			this.player.pos.x += move.x * this.speed;
			this.player.pos.y += move.y * this.speed;
		}

		this.touch_events = [];
	}

	graphics(frame) {
		let mctx = can.getContext('2d');
		let gctx = this.can.getContext('2d');

		mctx.imageSmoothingEnabled = false;

		const fill = color => {
			mctx.fillStyle = color;
			mctx.fillRect(0, 0, can.width, can.height);
		};

		// Background fill
		fill(this.bg_color);

		// Ground draw
		gctx.drawImage(this.ground, 0, 0);

		// Entities draw
		let ord_ent = [...game.entities.buildings, ...game.entities.humans];
		for (let entity of ord_ent) {
			entity.draw(gctx, 'main');
		}

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
				mctx.beginPath();
				mctx.arc(touch.start.x, touch.start.y, game.touches.rout, 0, 2 * Math.PI);
				mctx.stroke();

				mctx.beginPath();
				mctx.arc(touch.end.x, touch.end.y, game.touches.rin, 0, 2 * Math.PI);
				mctx.fill();
			}
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

	goTarget() {
		let t = this.cam.target;
		let x, y;
		if (t.pos) {
			x = t.pos.x + 12;
			y = t.pos.y + 12;
		} else {
			x = t.x;
			y = t.y;
		}

		this.cam.x += (x - this.cam.x) / this.cam.targ_speed;
		this.cam.y += (y - this.cam.y) / this.cam.targ_speed;
		this.cam.h += (this.cam.targ_h - this.cam.h) / this.cam.targ_speed;
		this.cam.o += (this.cam.targ_o - this.cam.o) / this.cam.targ_speed;
	}

	getHuman(name) {
		for (let human of game.entities.humans) {
			if (human.name == name) return human;
		}
	}
}
