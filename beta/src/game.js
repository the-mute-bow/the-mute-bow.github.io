class Game {
	// --- Default ---

	constructor(img_srcs, callback = _ => {}) {
		// Environment
		this.scene;
		this.time = 0;
		this.delay = 1;
		this.speed = 1;
		this.camera = null;
		this.scene_elements = ['water', 'shadows', 'entities', 'darkness'];

		// Entities
		this.entities = {
			types: [],
			all: [],

			get: (...types) => {
				let l = [];
				for (let type of types) l.push(this.entities[type]);
				return l;
			},

			update: _ => {
				let e = game.entities;
				e.all = [];

				for (let type of e.types) {
					if (type in e) e[type] = e[type].filter(e => !e.dead);
					else e[type] = [];

					e.all.push(...e[type]);
				}

				e.all = e.all.sort((a, b) => a.pos.y > b.pos.y);
			}
		};

		this.events = [];

		// Load image and start game
		mge.setOverlay('loading');
		mge.resize();

		this.imgs = [];
		img_srcs = [...img_srcs, './img/default_background.png'];

		mge.loadImg(
			img_srcs,
			this.imgs,
			p => (load_bar.front.style.width = `${p * 128}px`),
			src => showError('Could not load "' + src + '"'),
			_ => {
				callback();
				mge.setOverlay('blank');
				mge.resize();
				mge.tick(0);
			}
		);
	}

	// Logic loop
	logic() {
		// Time passing
		this.delay = delay * this.speed;
		this.time += this.delay;

		// Events
		this.resolveEvents();

		// Kill and sort entities
		this.entities.update();
	}

	// Graphics loop
	graphics() {
		mge.clear();

		// Draw scene
		for (let elem of this.scene) {
			if (this.scene_elements.includes(elem)) {
				let c = this.scene[elem + '_canvas'];

				if (elem == 'shadows') {
					c.clearRect(0, 0, c.width, c.height);
					for (let entity of this.entities.all) entity.drawShadow();
				}

				if (elem == 'shadows') {
					c.clearRect(0, 0, c.width, c.height);
					for (let entity of this.entities.all) entity.draw();
				}

				mge.ctx.drawImage(c, 0, 0);
			} else mge.ctx.drawImage(this.imgs[elem], 0, 0);
		}

		// Camera
		if (this.camera) mge.camera.set(this.camera, 0.05);
		mge.camera.update();
	}

	// Set canvas and scene elements
	setScene(width, height, background_color, drawn_elements) {
		mge.elem.setAttribute('style', 'background-color: ' + background_color);
		mge.canvas.width = width;
		mge.canvas.height = height;
		this.scene = [];

		for (let elem of drawn_elements) {
			this.scene.push(elem);
			if (this.scene_elements.includes(elem)) {
				let c = document.createElement('canvas');
				c.width = width;
				c.height = height;
				this.scene[elem + '_canvas'] = c;
			}
		}
	}

	// --- Events ---

	resolveEvents() {
		for (let event of this.events) {
			if (event.type == 'lambda') event.callback(event);

			if (event.type == 'timeout' && this.time > event.end_time) {
				event.done = true;
				event.callback(event);
			}
		}

		this.events = this.events.filter(event => !event.done);
	}

	setEvent(id, callback = event => {}) {
		this.events.push({
			id: id,
			start_time: this.time,
			callback: callback,
			type: 'lambda',
			done: false
		});
	}

	setTimeout(id, ms, callback = event => {}) {
		this.events.push({
			id: id,
			start_time: this.time,
			end_time: this.time + ms,
			callback: callback,
			type: 'timeout',
			done: false
		});
	}

	// --- Other ---

	screenshot() {
		let link = document.createElement('a');
		link.download = 'screenshot.png';
		link.href = this.canvas.toDataURL();
		link.click();
	}
}
