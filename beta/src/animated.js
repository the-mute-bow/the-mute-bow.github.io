function Sprite(src, tile_w, tile_h) {
	this.src = src;
	this.img = game.imgs[src];
	this.tile = { w: tile_w, h: tile_h };

	if (!this.img) showError('Sprite error: No "' + src + '" in game.img.');

	this.draw = (ctx, dx = 0, dy = 0, tx = 0, ty = 0, tw = 1, th = 1, op = 1) => {
		ctx.globalAlpha = op;

		let sx = tx * this.tile.w;
		let sy = ty * this.tile.h;

		let sw = tw * this.tile.w;
		let sh = th * this.tile.h;

		ctx.drawImage(this.img, sx, sy, sw, sh, dx, dy, sw, sh);
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
		this.ctx = this.canvas.getContext('2d');

		this.render();
	}

	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.sprites.main.draw(this.ctx);
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

class Fixed extends Animated {
	constructor(type = 'fixed', x, y, offx, offy, sprites) {
		super(type, { x: x, y: y }, {}, {}, {}, offx, offy, sprites);
	}

	behave() {}
}

class Herb extends Fixed {
	constructor(x, y, id) {
		super('herb', x, y, 4, 8, {
			main: new Sprite('herb_' + id, 8, 8),
			shadow: new Sprite('herb_' + id + '_shadow', 8, 8)
		});

		this.id = id;
	}
}

class Pine extends Fixed {
	constructor(x, y, id) {
		super('pine', x, y, 96, 168, {
			main: new Sprite('pine_' + id, 192, 192),
			shadow: new Sprite('pine_' + id + '_shadow', 192, 192)
		});

		this.id = id;
		this.time = 0;
		this.angle = 0;
	}

	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.sprites.main.draw(this.ctx, 0, 0, this.angle);
	}

	drawShadow(ctx) {
		if ('shadow' in this.sprites) {
			let pos = get2dPos(this.pos, true);
			this.sprites.shadow.draw(ctx, pos.x - this.offset.x, pos.y - this.offset.y, this.angle);
		}
	}

	behave() {
		if (game.time > this.time) {
			this.time = game.time + Math.random() * 50 + 50;
			let w = game.entities.get('wind')[0];

			let n = w.get(this.pos, 40);
			let nint = Math.floor(n * 20);
			if (nint != this.angle) {
				this.angle = nint;
				this.render();
			}

			if (n > 0.9 && Math.random() > 0.9) game.entities.add(new Leave(this.pos, w));
		}
	}
}

class House extends Fixed {
	constructor(x, y, t) {
		let offset = {
			0: [72, 144]
		}[t];

		super('house', x, y, ...offset, {
			main: new Sprite('house_' + t, 144, 144),
			shadow: new Sprite('house_' + t + '_shadow', 144, 144)
		});
	}

	behave() {}
}
