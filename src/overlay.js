class Overlay {
	constructor(img, getCoords = overlay => ({ x: 0, y: 0 }), fade = 200) {
		this.img = img;
		this.getCoords = getCoords;
		this.done = false;
		this.time = time;
		this.die_time = null;
		this.fade = fade;
	}

	getXYWH() {
		return {
			...this.getCoords(this),
			w: this.img.width * game.scale,
			h: this.img.height * game.scale
		};
	}

	getOp() {
		let op = (time - this.time) / this.fade;
		if (this.die_time) op = (this.die_time - time) / this.fade;
		return op;
	}
}
