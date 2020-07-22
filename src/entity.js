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

	draw(ctx, sprite_name = main, coords = this.intPos()) {
		let sprite = this.sprites[sprite_name];
		let { x, y, z } = coords;
		if (sprite) {
			if (sprite_name == 'main') y -= z;
			if (sprite_name == 'shadow') {
				y -= z * 0.5;
				x -= z * 0.65;
			}
			sprite.draw(ctx, { x: Math.floor(x), y: Math.floor(y), z: Math.floor(z) });
		}
	}

	intPos() {
		return { x: Math.floor(this.pos.x), y: Math.floor(this.pos.y), z: Math.floor(this.pos.z) };
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
		this.health = { val: 6, max: 6 };
		this.stamina = { val: 0, max: 12, time: 0 };
		this.mana = { val: 3, max: 9 };
		this.move = { x: 0, y: 0, time: null };
		this.look = { x: 0, y: 1, aim: false };
		this.speed = 1;
	}

	getOrient(divs) {
		return Math.floor(((Math.atan2(this.look.y, this.look.x) + Math.PI) / Math.PI / 2) * divs);
	}

	animate(dtime) {
		let move_mag = Math.sqrt(this.move.x * this.move.x + this.move.y * this.move.y);

		this.pos.x += (this.move.x * game.speed * dtime) / 1400;
		this.pos.y += (this.move.y * game.speed * dtime) / 1400;

		this.move.x -= ((this.move.x / 100) * game.speed * dtime) / this.speed;
		this.move.y -= ((this.move.y / 100) * game.speed * dtime) / this.speed;

		this.speed = this.speed * 0.9 + 0.1;

		if (move_mag > 0.3) {
			this.look = { x: this.move.x, y: this.move.y, aim: false };
			if (!this.move.time) this.move.time = time;
			this.sprites.main.tile.y = this.getOrient(4);
			this.sprites.main.tile.x = (Math.floor((time - this.move.time) / 200) % 2) + 1;
		} else {
			this.move.x = 0;
			this.move.y = 0;
			this.move.time = null;
			this.sprites.main.tile.x = 0;
		}
	}

	pushTo(x, y, dtime) {
		this.move.x += (x * game.speed * dtime) / 4;
		this.move.y += (y * game.speed * dtime) / 4;
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
		this.moveTime = Math.random() * 3000;
	}

	animate() {
		if (time >= this.moveTime) {
			this.sprites.main.tile.x += 1;
			this.sprites.main.tile.x %= 4;

			this.moveTime += Math.random() * 1000 + 2000;
		}
	}
}
