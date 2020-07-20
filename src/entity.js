class Sprite {
	constructor(img, tile = { x: 0, y: 0, w: 16, h: 16 }) {
		this.img = img;
		this.tile = tile;
	}

	draw(ctx, coords) {
		ctx.drawImage(
			this.img,
			this.tile.x * this.tile.w,
			this.tile.y * this.tile.h,
			(this.tile.x + 1) * this.tile.w,
			(this.tile.y + 1) * this.tile.h,
			coords.x,
			coords.y,
			this.tile.w,
			this.tile.h
		);
	}
}

class Entity {
	constructor(pos, sprites) {
		this.pos = pos;
		this.sprites = sprites;
	}

	draw(ctx, sprite_name, coords = this.intPos()) {
		let sprite = this.sprites[sprite_name];
		if (sprite) sprite.draw(ctx, coords);
	}

	intPos() {
		return { x: Math.floor(this.pos.x), y: Math.floor(this.pos.y) };
	}
}

class Human extends Entity {
	constructor(name, pos) {
		super(pos, {
			main: new Sprite(game.images[name], { x: 0, y: 0, w: 24, h: 24 }),
			shadow: new Sprite(game.images['human-shadow'], { x: 0, y: 0, w: 24, h: 24 })
		});

		this.name = name;
	}
}
