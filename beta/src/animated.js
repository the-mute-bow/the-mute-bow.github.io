function Sprite(src, tile_w, tile_h) {
	this.src = src;
	this.img = game.imgs[src];
	this.tile = { w: tile_w, h: tile_h };

	if (!this.img) {
		showError('Sprite error: No "' + src + '" in game.img.');
		return;
	}

	this.draw = (ctx, offx = 0, offy = 0, tx = 0, ty = 0, tw = 1, th = 1, op = 1) => {
		ctx.globalAlpha = op;
		ctx.drawImage(this.img, offx + tx * this.tile.w, offy + ty * this.tile.h, tw * this.tile.w, th * this.tile.h);
		ctx.globalAlpha = 1;
	};
}

class Animated extends Entity {
	constructor(type = 'animated', pos, vel, acc, fric, off_x, off_y, sprites) {
		super(type, pos, vel, acc, fric);
		this.offset = { x: off_x, y: off_y };
		this.sprites = sprites;

		let size = this.sprites.main.tile;
		this.canvas = document.createElement('canvas');
		this.canvas.width = size.w;
		this.canvas.height = size.h;
	}

	render() {
		let ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Fog
		if (game.fog) {
			let grd = ctx.createLinearGradient(0, this.canvas.height - game.fog.actual.t, 0, this.canvas.height - game.fog.actual.b);
			grd.addColorStop(0, 'white');
			grd.addColorStop(1, 'transparent');

			ctx.fillStyle = grd;
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			ctx.globalAlpha = 0.5;
			ctx.globalCompositeOperation = 'source-in';
		}

		// ctx.fillStyle = '#322b3f';
		this.sprites.main.draw(ctx);

		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = 'source-over';
	}

	draw(ctx, op = 1) {
		let pos = get2dPos(this.pos);
		ctx.globalAlpha = op;
		ctx.drawImage(this.canvas, pos.x - this.offset.x, pos.y - this.offset.y);
		ctx.globalAlpha = 1;
	}

	drawShadow(ctx) {
		if ('shadow' in this.sprites) {
			let pos = get2dPos(this.pos, true);
			this.sprites.shadow.draw(ctx, pos.x - this.offset.x, pos.y - this.offset.y);
		}
	}
}
