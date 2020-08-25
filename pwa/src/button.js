class Button extends Overlay {
	constructor(id = null, img, text, getCoords = btn => ({ x: 0, y: 0 }), callcack = btn => {}, fade = 400, mode = 'normal', fontsize = 12, textcolor = '#202124') {
		super(id, game.images[img], getCoords, fade);
		this.shadow = game.images[img + '-shadow'];
		this.text = text;
		this.callcack = callcack;
		this.fontsize = fontsize;
		this.mode = mode;
		this.textcolor = textcolor;
	}

	draw() {
		let mctx = can.getContext('2d');
		let { x, y, w, h } = this.getXYWH();

		let op = this.getOp();

		mctx.globalAlpha = op;
		if (this.mode == 'disabled') mctx.globalAlpha *= 0.5;
		if (this.mode == 'pressed') mctx.globalAlpha *= 0.85;

		mctx.drawImage(this.shadow, x, y + game.scale, w, h);
		mctx.drawImage(this.img, x, this.mode == 'pressed' ? y + game.scale : y, w, h);

		let fs = this.fontsize * game.scale;
		mctx.font = `${fs}px Pixelar`;
		mctx.textAlign = 'center';
		mctx.fillStyle = this.textcolor;
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
				game.sounds.click.play();
				this.callcack(this);
			}

			return true;
		}

		return false;
	}
}