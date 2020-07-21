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
			this.tile.w,
			this.tile.h,
			coords.x,
			coords.y,
			this.tile.w,
			this.tile.h
		);
	}
}

class Entity {
	constructor(pos, sprites, feet) {
		this.pos = pos;
		this.sprites = sprites;
		this.feet = feet;
	}

	draw(ctx, sprite_name, coords = this.intPos()) {
		let sprite = this.sprites[sprite_name];
		if (sprite) sprite.draw(ctx, coords);
	}

	intPos() {
		return { x: Math.floor(this.pos.x), y: Math.floor(this.pos.y) };
	}

	getFeet() {
		let { x, y } = this.intPos();
		return { x: x + this.feet.x, y: y + this.feet.y };
	}
}

class Human extends Entity {
	constructor(name, pos) {
		super(
			pos,
			{
				main: new Sprite(game.images[name], { x: 0, y: 0, w: 24, h: 24 }),
				shadow: new Sprite(game.images['human-shadow'], { x: 0, y: 0, w: 24, h: 24 })
			},
			{ x: 12, y: 24 }
		);

		this.name = name;
	}
}

class Tree extends Entity {
	constructor(pos, type = 0) {
		type = type ? type : Math.floor(Math.random() * 4) + 1;

		pos.x -= 62;
		pos.y -= 120;

		super(
			pos,
			{
				main: new Sprite(game.images['pine' + type], { x: 0, y: 0, w: 128, h: 128 }),
				shadow: new Sprite(game.images['pine' + type + '-shadow'], { x: 0, y: 0, w: 128, h: 128 })
			},
			{ x: 65, y: 122 }
		);

		this.sprites.main.tile.x = Math.floor(Math.random() * 4);
		this.nextFrame = Math.random() * 160;
	}

	animate() {
		if (frame >= this.nextFrame) {
			this.sprites.main.tile.x += 1;
			this.sprites.main.tile.x %= 4;

			console.log(this.sprites.main.tile.x);

			this.nextFrame += Math.random() * 40 + 120;
		}
	}
}
