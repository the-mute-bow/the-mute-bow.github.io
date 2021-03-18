class Game {
	// --- Default ---

	constructor(img_srcs, callback = _ => {}) {
		// Environment
		this.scene;
		this.time = 0;
		this.delay = 1;
		this.speed = 1;
		this.camera = null;
		this.scene_elements = ['water', 'wind', 'shadows', 'entities', 'darkness', 'light'];
		this.wind_allowed = getCookie('#wind') == 'yes';
		this.hide_glow = getCookie('#light_quality') == 'high';
		this.water_color = { r: 0, g: 0, b: 0, a: 64 };
		this.shadow_color = { r: 0, g: 0, b: 0, a: 64 };
		this.darkness_color = { r: 0, g: 0, b: 0, a: 0 };
		this.light_color = { r: 255, g: 255, b: 255, a: 0 };
		this.wood_color = { r: 80, g: 66, b: 49, a: 255 };
		this.leave_color = { r: 50, g: 67, b: 51, a: 255 };

		// random spawns
		this.fireflies = false;

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
				for (let type of types) if (type in e) l.push(...e[type]);
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
				// FPS
				if ((urlParams.has('fps') || beta) && urlParams.get('scene') != 'wallpaper') {
					this.setTimeout('fps-btn-spawn', 1000, event => {
						document.querySelector('section#blank').innerHTML += '<span class="fadein" id="fps">0<span/>';
						this.fps = { elem: document.querySelector('span#fps'), val: 0 };
					});
				}

				this.initVegetation();
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
			let ratio = 0.02;
			this.fps.val = this.fps.val * (1 - ratio) + delay * ratio;
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
		// Clear canvas
		mge.clear();

		// Temp background color
		let bg_color = game.leave_color;

		// Draw scene
		for (let elem of this.scene) {
			if (this.scene_elements.includes(elem)) {
				// Some context
				let c = this.scene[elem + '_canvas'];
				let cctx = c.getContext('2d');
				let entire_canvas = [0, 0, c.width, c.height];

				cctx.imageSmoothingEnabled = false;

				// Wind element
				if (elem == 'wind') {
					cctx.clearRect(...entire_canvas);
					cctx.fillStyle = 'white';
					let w = this.entities.get('wind')[0];

					for (let y = 0; y < c.height; y += 3) {
						for (let x = 0; x < c.height; x += 3) {
							cctx.globalAlpha = w.get({ x: x, y: y, z: 0 }, 40);
							cctx.fillRect(x, y, 2, 2);
						}
					}
				}

				// Shadows element
				if (elem == 'shadows') {
					cctx.clearRect(...entire_canvas);
					for (let ent of this.entities.all) ent.drawShadow(cctx);

					cctx.globalCompositeOperation = 'source-in';
					cctx.fillStyle = this.toColorStr(this.shadow_color);
					cctx.fillRect(...entire_canvas);
					cctx.globalCompositeOperation = 'source-over';
				}

				// Entities element
				if (elem == 'entities') {
					cctx.clearRect(...entire_canvas);
					for (let ent of this.entities.all) ent.draw(cctx);
				}

				// Light
				if (elem == 'light') {
					cctx.clearRect(...entire_canvas);
					cctx.fillStyle = this.toColorStr(this.light_color);
					cctx.fillRect(...entire_canvas);
					bg_color = game.blendColor(game.light_color, bg_color);
				}

				// Darkness
				if (elem == 'darkness') {
					cctx.clearRect(...entire_canvas);
					bg_color = game.blendColor(game.darkness_color, bg_color);

					cctx.fillStyle = 'black';
					cctx.globalCompositeOperation = 'source-over';
					cctx.fillRect(...entire_canvas);

					let glow = [];

					for (let ent of this.entities.all.filter(e => e.type != 'herb')) {
						if (ent.glowing) {
							cctx.globalCompositeOperation = 'destination-out';
							let { x, y } = get2dPos(ent.pos);
							cctx.drawImage(ent.glowing.canvas, x - ent.glowing.m, y - ent.glowing.m);
							glow.push({ x: x, y: y });
						} else if (game.hide_glow && glow) {
							cctx.globalCompositeOperation = 'source-over';
							ent.draw(cctx);
						}
					}

					cctx.globalCompositeOperation = 'source-in';
					cctx.fillStyle = this.toColorStr(this.darkness_color);
					cctx.fillRect(...entire_canvas);
				}

				mge.ctx.drawImage(c, 0, 0);
				mge.ctx.globalAlpha = 1;
			} else mge.ctx.drawImage(this.imgs[elem], 0, 0);
		}

		// Apply background color
		game.setBackground(game.toColorStr(bg_color));

		// Camera
		if (this.camera) mge.camera.set(this.camera, 0.05);
		mge.camera.update();
	}

	// Set canvas and scene elements
	setScene(width, height, drawn_elements) {
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

	// Set vegetation
	initVegetation() {
		for (let veg of vegetation_entities) {
			let args = [];
			for (let a of veg.split(' ').slice(1)) args.push(parseInt(a));
			if (veg.includes('pine')) this.entities.add(new Pine(...args));

			if (veg.includes('herb')) this.entities.add(new Herb(...args));
		}
	}

	// --- Colors ---

	setBackground(color) {
		mge.elem.setAttribute('style', 'background-color: ' + color);
	}

	toColorStr(obj) {
		return `rgba(${Math.floor(obj.r)}, ${Math.floor(obj.g)}, ${Math.floor(obj.b)}, ${obj.a / 255})`;
	}

	toColorObj(str) {
		let sub = i => parseInt(str.substr(i * 2 + 1, 2), 16);
		return { r: sub(0), g: sub(1), b: sub(2), a: 255 };
	}

	blendColor(c1, c2, a = -1) {
		if (a < 0) a = c1.a;
		a /= 255;

		return {
			r: c1.r * a + c2.r * (1 - a),
			g: c1.g * a + c2.g * (1 - a),
			b: c1.b * a + c2.b * (1 - a),
			a: c2.a
		};
	}

	transitionColor(c1, c2, a) {
		return {
			r: c2.r * a + c1.r * (1 - a),
			g: c2.g * a + c1.g * (1 - a),
			b: c2.b * a + c1.b * (1 - a),
			a: c2.a * a + c1.a * (1 - a)
		};
	}

	// --- Events ---

	resolveEvents() {
		for (let event of this.events) {
			if (event.type == 'lambda') event.callback(event);

			if (event.type == 'timeout' && this.time > event.end_time) {
				event.done = true;
				if (event.args) event.callback(...event.args);
				else event.callback(event);
			}
		}

		this.events = this.events.filter(event => !event.done);
	}

	setEvent(id, callback = event => {}) {
		game.events.push({
			id: id,
			start_time: game.time,
			callback: callback,
			type: 'lambda',
			done: false
		});
	}

	setTimeout(id, ms, callback = event => {}, ...args) {
		game.events.push({
			id: id,
			start_time: game.time,
			end_time: game.time + ms,
			callback: callback,
			args: args,
			type: 'timeout',
			done: false
		});
	}

	// --- Other ---

	// Take a screenshot of whole canvas
	screenshot() {
		let link = document.createElement('a');
		link.download = 'screenshot.png';
		link.href = mge.canvas.toDataURL();
		link.click();
	}
}
