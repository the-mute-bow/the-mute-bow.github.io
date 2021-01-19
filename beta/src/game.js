class Game {
	// --- Default ---

	constructor(img_srcs, callback = _ => {}) {
		// Environment
		this.scene;
		this.shadow_opacity = 1;
		this.time = 0;
		this.delay = 1;
		this.speed = 1;
		this.camera = null;
		this.fog = null;
		this.scene_elements = ['water', 'wind', 'shadows', 'entities', 'darkness'];

		// FPS
		this.fps = null;

		// Entities
		this.entities = {
			types: [],
			all: [],

			add: (...ents) => {
				let e = game.entities;
				for (let ent of ents) {
					if (!(ent.type in e)) {
						e.types.push(ent.type);
						e[ent.type] = [];
					}

					e[ent.type].push(ent);
				}
			},

			get: (...types) => {
				let e = game.entities;
				let l = [];
				for (let type of types) {
					if (type in e) l.push(...e[type]);
					else console.warn(type + ' type not in entities.');
				}
				return l;
			},

			update: _ => {
				let e = game.entities;
				e.all = [];

				for (let type of e.types) {
					e[type] = e[type].filter(e => !e.dead);
					e.all.push(...e[type]);
				}

				e.all = e.all.sort((a, b) => a.pos.y - b.pos.y);
			}
		};

		this.events = [];

		// Load image and start game
		mge.setOverlay('loading');
		mge.resize();

		this.imgs = [];
		img_srcs = [...img_srcs, './img/maps/default/default_grass.png'];

		mge.loadImg(
			img_srcs,
			this.imgs,
			p => (load_bar.front.style.width = `${p * 128}px`),
			src => showError('Could not load "' + src + '"'),
			_ => {
				if (urlParams.has('fps')) {
					document.querySelector('section#blank').innerHTML += '<span id="fps">0<span/>';
					this.fps = { elem: document.querySelector('span#fps'), val: 0 };
				}

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
		this.delay = between(10, delay, 50) * this.speed;
		this.time += this.delay;

		// FPS
		if (this.fps) {
			this.fps.val = this.fps.val * 0.9 + delay * 0.1;
			this.fps.elem.innerHTML = Math.floor(1000 / this.fps.val);
		}

		// Events
		this.resolveEvents();

		for (let ent of this.entities.all) ent.behave();

		// Kill and sort entities
		this.entities.update();
	}

	// Graphics loop
	graphics() {
		mge.clear();

		// Update fog
		if (this.fog) {
			this.fog.actual.b = this.fog.actual.b * (1 - this.fog.ratio) + this.fog.target.b * this.fog.ratio;
			this.fog.actual.t = this.fog.actual.t * (1 - this.fog.ratio) + this.fog.target.t * this.fog.ratio;
		}

		// Render entities
		for (let ent of this.entities.all) ent.render();

		// Draw scene
		for (let elem of this.scene) {
			if (this.scene_elements.includes(elem)) {
				let c = this.scene[elem + '_canvas'];
				let cctx = c.getContext('2d');

				if (elem == 'wind') {
					cctx.clearRect(0, 0, c.width, c.height);
					cctx.fillStyle = 'white';
					let w = this.entities.get('wind')[0];

					for (let y = 0; y < c.height; y += 3) {
						for (let x = 0; x < c.height; x += 3) {
							cctx.globalAlpha = w.get({ x: x, y: y, z: 0 }, 40);
							cctx.fillRect(x, y, 2, 2);
						}
					}
				}

				if (elem == 'shadows') {
					cctx.clearRect(0, 0, c.width, c.height);
					for (let ent of this.entities.all) ent.drawShadow(cctx);
					mge.ctx.globalAlpha = this.shadow_opacity;
				}

				if (elem == 'entities') {
					cctx.clearRect(0, 0, c.width, c.height);
					for (let ent of this.entities.all) ent.draw(cctx);
				}

				mge.ctx.drawImage(c, 0, 0);
				mge.ctx.globalAlpha = 1;
			} else mge.ctx.drawImage(this.imgs[elem], 0, 0);
		}

		// Camera
		if (this.camera) mge.camera.set(this.camera, 0.05);
		mge.camera.update();
	}

	// Set canvas and scene elements
	setScene(width, height, background_color, shadow_opacity, drawn_elements) {
		this.shadow_opacity = shadow_opacity;
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
		link.href = mge.canvas.toDataURL();
		link.click();
	}
}
