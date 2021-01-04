class Game {
	constructor(img_srcs, callback = _ => {}) {
		// Game entities
		this.entities = {
			humans: [],
			trees: [],
			steps: [],
			steps: [],
			drops: [],
			other: [],

			get: (...types) => {
				let l = [];
				for (let type of types) l.push(this.entities[type]);
				return l;
			}
		};

		// Load image and start game
		mge.setOverlay('loading');
		mge.resize();

		this.imgs = [];
		img_srcs = [...img_srcs, 'default_background.png'];

		mge.loadImg(
			img_srcs,
			this.imgs,
			p => (load_bar.front.style.width = `${p * 128}px`),
			src => showError('Could not load "' + src + '"'),
			_ => {
				callback();
				mge.setOverlay(null);
				mge.resize();
				mge.tick(0);
			}
		);
	}
}
