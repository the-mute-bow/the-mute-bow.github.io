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

class Hitbox {
	constructor(x, y, w, l, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.l = l;
		this.h = h;
	}

	getSides(x, y) {
		return { L: x + this.x, T: y + this.y, R: x + this.x + this.w, B: y + this.y + this.l };
	}
}

class Entity {
	constructor(pos, sprites, hitbox, feet) {
		this.pos = pos;
		this.sprites = sprites;
		this.hitbox = hitbox;
		this.feet = feet;
	}

	draw(ctx, sprite_name = 'main', coords = null) {
		let sprite = this.sprites[sprite_name];
		let { x, y, z } = coords
			? coords
			: { x: Math.floor(this.pos.x + 0.5), y: Math.floor(this.pos.y + 0.5), z: this.pos.z };

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

	collideGround(other, restrict = true) {
		let this_sides = this.hitbox.getSides(this.pos.x, this.pos.y);
		let other_sides = other.hitbox.getSides(other.pos.x, other.pos.y);

		let this_center = { x: (this_sides.L + this_sides.R) / 2, y: (this_sides.T + this_sides.B) / 2 };
		let other_center = { x: (other_sides.L + other_sides.R) / 2, y: (other_sides.T + other_sides.B) / 2 };

		let dc = { x: other_center.x - this_center.x, y: other_center.y - this_center.y };

		if (Math.abs(dc.x) < 40 && Math.abs(dc.y) < 40) {
			let collision = false;

			if (
				(other_sides.T < this_sides.B && this_sides.B < other_sides.B) ||
				(other_sides.T < this_sides.T && this_sides.T < other_sides.B)
			) {
				if (
					(other_sides.L < this_sides.R && this_sides.R < other_sides.R) ||
					(other_sides.L < this_sides.L && this_sides.L < other_sides.R)
				) {
					collision = true;
				}
			}

			if (
				(!collision && this_sides.T <= other_sides.B && other_sides.B <= this_sides.B) ||
				(this_sides.T <= other_sides.T && other_sides.T <= this_sides.B)
			) {
				if (
					(this_sides.L <= other_sides.R && other_sides.R <= this_sides.R) ||
					(this_sides.L <= other_sides.L && other_sides.L <= this_sides.R)
				) {
					collision = true;
				}
			}

			if (
				!collision &&
				other_sides.L <= this_sides.L &&
				this_sides.R <= other_sides.R &&
				this_sides.T <= other_sides.T &&
				other_sides.B <= this_sides.B
			) {
				collision = true;
			}

			if (
				!collision &&
				this_sides.L <= other_sides.L &&
				other_sides.R <= this_sides.R &&
				other_sides.T <= this_sides.T &&
				this_sides.B <= other_sides.B
			) {
				collision = true;
			}

			if (collision) {
				let d = { x: 0, y: 0 };

				if (dc.x > 0) {
					d.x = this_sides.R - other_sides.L;
				} else {
					d.x = this_sides.L - other_sides.R;
				}

				if (dc.y > 0) {
					d.y = this_sides.B - other_sides.T;
				} else {
					d.y = this_sides.T - other_sides.B;
				}

				if (restrict) {
					if (Math.abs(d.x) < Math.abs(d.y)) {
						d.y = 0;
					} else {
						d.x = 0;
					}
				}

				return d;
			}
		}
	}

	collidePoint(x, y, z) {
		if (this.pos.z <= z && z <= this.pos.z + this.hitbox.h) {
			let { T, B, L, R } = this.hitbox.getSides(this.pos.x, this.pos.y);
			if (T < y && y < B && L < x && x < R) {
				return true;
			}
		}
		return false;
	}
}

class Human extends Entity {
	constructor(name, pos) {
		super(
			pos,
			{
				main: new Sprite(game.images[name], { x: 0, y: 0, w: 24, h: 24 }),
				shadow: new Sprite(game.images['human-shadow'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-null': new Sprite(game.images['icon-null'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-stay': new Sprite(game.images['icon-stay'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-follow': new Sprite(game.images['icon-follow'], { x: 0, y: 0, w: 24, h: 24 })
			},
			new Hitbox(9, 22, 6, 3, 13),
			{ x: 12, y: 24 }
		);

		this.name = name;
		this.health = { val: 6, max: 6 };
		this.stamina = { val: 0, max: 12, time: 0 };
		this.mana = { val: 3, max: 9 };
		this.move = { x: 0, y: 0, time: null };
		this.look = { x: 0, y: 1, aim: false };
		this.speed = 1;
		this.target = { obj: null, x: this.pos.x, y: this.pos.y };
		this.foot_step = 0;
	}

	getOrient(divs) {
		return Math.floor(((Math.atan2(this.look.y, this.look.x) + Math.PI) / Math.PI / 2) * divs);
	}

	animate(dtime, solids, mobs) {
		if (this.target) {
			let { x, y } = this.getTargCoords();

			let dx = x - this.pos.x;
			let dy = y - this.pos.y;

			let targ_mag = Math.sqrt(dx * dx + dy * dy);
			if (targ_mag > 0.5) this.pushTo((dx / targ_mag) * 0.8, (dy / targ_mag) * 0.8, dtime);
		}

		let move_mag = Math.sqrt(this.move.x * this.move.x + this.move.y * this.move.y);

		if (this.move.x || this.move.y) {
			let boost = this.look.aim ? 2800 : 1400;
			this.pos.x += (this.move.x * game.speed * dtime) / boost;
			this.pos.y += (this.move.y * game.speed * dtime) / boost;

			this.move.x -= ((this.move.x / 100) * game.speed * dtime) / this.speed;
			this.move.y -= ((this.move.y / 100) * game.speed * dtime) / this.speed;

			for (let solid of solids) {
				let d = this.collideGround(solid);
				if (d) {
					this.pos.x -= d.x;
					this.pos.y -= d.y;
				}
			}
		}

		for (let mob of mobs) {
			if (mob != this) {
				let d = this.collideGround(mob, false);
				if (d) mob.pushTo(d.x / 2, d.y / 2, dtime);
			}
		}

		if (move_mag > 0.4) {
			this.look = { x: this.move.x, y: this.move.y, aim: false };
			if (!this.move.time) this.move.time = time;
			this.sprites.main.tile.y = this.getOrient(4);

			let step = (Math.floor((time - this.move.time) / 200) % 2) + 1;
			this.sprites.main.tile.x = step;
			if (this.foot_step != step) {
				this.foot_step = step;

				let { x, y } = this.getFeet();
				game.foot_steps.push({
					x: x + Math.floor(Math.random() * 4 - 2),
					y: y + Math.floor(Math.random() * 4 - 2),
					time: time
				});
			}
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

	getTargCoords() {
		if (this.target) {
			let x = this.target.x;
			let y = this.target.y;

			if (this.target.obj) {
				x += this.target.obj.pos.x;
				y += this.target.obj.pos.y;
			}

			return { x: x, y: y };
		}
	}
}

class Tree extends Entity {
	constructor(pos, type = 0, variant = '') {
		type = type ? type : Math.floor(Math.random() * 4) + 1;

		pos.x -= 62;
		pos.y -= 120;

		let hitboxes = {
			1: new Hitbox(63, 118, 5, 4, 100),
			2: new Hitbox(62, 118, 4, 3, 100),
			3: new Hitbox(62, 119, 3, 2, 100),
			4: new Hitbox(61, 118, 4, 3, 100)
		};

		super(
			pos,
			{
				main: new Sprite(game.images['pine' + type + variant], { x: 0, y: 0, w: 128, h: 128 }),
				shadow: new Sprite(game.images['pine' + type + '-shadow' + variant], { x: 0, y: 0, w: 128, h: 128 })
			},
			hitboxes[type],
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
