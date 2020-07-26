class Button {
	constructor(img, text, getCoords = btn => ({ x: 0, y: 0 }), callcack = btn => {}, mode = 'normal', fontsize = 12) {
		this.img = game.images[img];
		this.shadow = game.images[img + '-shadow'];
		this.text = text;
		this.getCoords = getCoords;
		this.callcack = callcack;
		this.fontsize = fontsize;
		this.mode = mode;
		this.done = false;
	}

	draw() {
		let mctx = can.getContext('2d');
		let { x, y } = this.getCoords(this);

		let w = this.img.width * game.scale;
		let h = this.img.height * game.scale;

		if (this.mode == 'disabled') mctx.globalAlpha = 0.5;
		if (this.mode == 'pressed') mctx.globalAlpha = 0.85;
		mctx.drawImage(this.shadow, x, y + game.scale, w, h);
		mctx.drawImage(this.img, x, this.mode == 'pressed' ? y + game.scale : y, w, h);

		let fs = this.fontsize * game.scale;
		mctx.font = `${fs}px Pixelar`;
		mctx.textAlign = 'center';
		mctx.fillText(this.text, x + w / 2, y + h / 2 + fs / 4 + (this.mode == 'pressed' ? game.scale : 0));
		mctx.globalAlpha = 1;
	}

	tick(ex, ey) {
		let { x, y } = this.getCoords(this);

		let w = this.img.width * game.scale;
		let h = this.img.height * game.scale;

		if (x < ex && ex < x + w && y < ey && ey < y + h) {
			if (this.mode == 'normal') {
				this.mode = 'pressed';
				game.events.push(new TimeEvent(200, event => this.callcack(this)));
			}

			return true;
		}

		return false;
	}
}
