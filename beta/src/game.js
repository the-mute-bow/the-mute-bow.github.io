class Game {
	constructor(img_srcs, callback = _ => {}) {
		// Environment
		this.canvas;
		this.ctx;
		this.scene;

		// Entities
		this.entities = {
			humans: [],
			trees: [],
			steps: [],
			drops: [],
			other: [],

			get: (...types) => {
				let l = [];
				for (let type of types) l.push(this.entities[type]);
				return l;
			},

			kill: _ => {
				for (let type of ['humans', 'trees', 'steps', 'drops', 'other']) this.entities[type] = this.entities[type].filter(e => !e.dead);
			}
		};

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
				this.setScene(256, 256, '#7d8f6c', 'default_background');
				callback();
				mge.setOverlay(null);
				mge.resize();
				mge.tick(0);
			}
		);
	}

	// Logic loop
	logic() {}

	// Graphics loop
	graphics() {
		// Clear canvas
		this.ctx.clearRect(0, 0, this.width, this.height);

		// Draw scene
		for (let elem of this.scene) this.ctx.drawImage(this.imgs[elem], 0, 0);

		// Draw canvas
		mge.ctx.drawImage(this.canvas, 0, 0);
	}

	// Set canvas and scene elements
	setScene(width, height, background_color, ...drawn_elements) {
		mge.canvas.setAttribute('style', 'background-color: ' + background_color);
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx = this.canvas.getContext('2d');
		this.scene = [];

		for (let elem of drawn_elements) this.scene.push(elem);
	}

	screenshot() {
		let link = document.createElement('a');
		link.download = 'screenshot.png';
		link.href = this.canvas.toDataURL();
		link.click();
	}
}
