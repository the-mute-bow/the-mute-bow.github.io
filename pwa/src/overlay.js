class Overlay {
	constructor(id = null, img, getCoords = overlay => ({ x: 0, y: 0 }), fade = 200) {
		this.id = id;
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

	draw() {
		let mctx = can.getContext('2d');
		let { x, y, w, h } = this.getXYWH();

		mctx.globalAlpha = this.getOp();
		mctx.drawImage(this.img, x, y, w, h);
		mctx.globalAlpha = 1;
	}

	kill(delay) {
		this.die_time = time + delay;
	}
}

class OverText {
	constructor(id = null, getText = overtext => 'text', getCoords = overtext => ({ x: 0, y: 0 }), fade = 200, fontsize = 10, color = '#cdcad3') {
		this.id = id;
		this.getText = getText;
		this.getCoords = getCoords;
		this.fade = fade;
		this.time = time;
		this.die_time = null;
		this.done = false;
		this.fontsize = fontsize;
		this.color = color;
	}

	getOp() {
		let op = (time - this.time) / this.fade;
		if (this.die_time) op = (this.die_time - time) / this.fade;
		return op;
	}

	draw() {
		let mctx = can.getContext('2d');
		let { x, y } = this.getCoords(this);

		let fs = this.fontsize * game.scale;
		mctx.font = `${fs}px Pixelar`;
		mctx.textAlign = 'center';
		mctx.fillStyle = this.color;

		mctx.globalAlpha = this.getOp();
		mctx.fillText(this.getText(this), x, y);
		mctx.globalAlpha = 1;
	}

	kill(delay) {
		this.die_time = time + delay;
	}
}
