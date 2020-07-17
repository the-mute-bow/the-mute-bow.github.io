var pages = [];

class Game {
	constructor() {
		this.images = [];
		this.loop = false;
		this.ground = null;
		this.bg_color = 'black';
		this.scale = 1;
		this.height = 128;
		this.can = document.createElement('canvas');
	}

	tick(frame) {}

	graphics(frame) {
		let mctx = can.getContext('2d');
		let gctx = this.can.getContext('2d');

		mctx.imageSmoothingEnabled = false;

		mctx.fillStyle = this.bg_color;
		mctx.fillRect(0, 0, can.width, can.height);

		gctx.drawImage(this.ground, -100, -100);

		mctx.drawImage(this.can, 0, 0, this.ground.height * game.scale, this.ground.width * game.scale);
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
}
