class Chapter {
	constructor(name, path, img_list, initFunc) {
		this.name = name;
		this.path = path;
		this.img_list = img_list;
		this.img = [];
		this.initFunc = initFunc;
	}

	init(next) {
		console.log('loading ' + name);
		loadImages(this.img_list, this.img, 0, this.path, true, () => {
			this.initFunc(this);
			this.generateTrees();
			next();
		});
	}

	generateTrees() {
		this.entities.trees = [];
		let ctx = this.gcan.getContext('2d');
		ctx.drawImage(this.img['ground'], 0, 0);

		console.log('Loading trees..');

		for (let y = 0; y < this.gcan.height; y++) {
			for (let x = 0; x < this.gcan.width; x++) {
				let p = ctx.getImageData(x, y, 1, 1).data;
				if (p[0] == 255 && p[1] == 0 && p[2] == 0) {
					console.log(x, y);
					this.entities.trees.push(new Tree(x - 64, y - 125, this.img, Math.floor(Math.random() * 4 + 1), false));
				}
			}
		}
	}
}
