class Overlay {
	constructor(id = null, img, getCoords = overlay => ({ x: 0, y: 0 }), fade = 400, scale = null) {
		this.id = id;
		this.img = img;
		this.getCoords = getCoords;
		this.done = false;
		this.time = time;
		this.die_time = null;
		this.fade = fade;
		this.scale = scale;
	}

	getScale() {
		return this.scale ? this.scale : game.scale;
	}

	getXYWH() {
		return {
			...this.getCoords(this),
			w: this.img.width * this.getScale(),
			h: this.img.height * this.getScale()
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
	constructor(id = null, getText = overtext => 'text', getCoords = overtext => ({ x: 0, y: 0 }), fade = 400, fontsize = 10, color = '#cdcad3', scale = null, align = 'center') {
		this.id = id;
		this.getText = getText;
		this.getCoords = getCoords;
		this.fade = fade;
		this.time = time;
		this.die_time = null;
		this.done = false;
		this.fontsize = fontsize;
		this.color = color;
		this.scale = scale;
		this.align = align;
	}

	getOp() {
		let op = (time - this.time) / this.fade;
		if (this.die_time) op = (this.die_time - time) / this.fade;
		return op;
	}

	draw() {
		let mctx = can.getContext('2d');
		let { x, y } = this.getCoords(this);

		let fs = this.fontsize * (this.scale ? this.scale : game.scale);
		mctx.font = `${fs}px Pixelar`;
		mctx.textAlign = this.align;
		mctx.fillStyle = this.color;

		mctx.globalAlpha = this.getOp();
		mctx.fillText(this.getText(this), x, y);
		mctx.globalAlpha = 1;
	}

	kill(delay) {
		this.die_time = time + delay;
	}
}
