class Sprite {
	constructor(img, tileW, tileH) {
		this.img = img;
		this.tile = { w: tileW, h: tileH };
	}

	draw(ctx, x, y, dx, dy, scale = 1) {
		if (this.img) {
			ctx.drawImage(this.img, Math.floor(dx) * this.tile.w, Math.floor(dy) * this.tile.h, this.tile.w, this.tile.h, Math.floor(x), Math.floor(y), this.tile.w * scale, this.tile.h * scale);
		}
	}
}

class Hitbox {
	constructor(x, y, w, l, h1 = null, h2 = null) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.l = l;
		this.h1 = h1;
		this.h2 = h2;
	}

	getSides(x, y) {
		return { L: x + this.x, T: y + this.y, R: x + this.x + this.w, B: y + this.y + this.l };
	}

	draw(ctx, x, y) {
		let s = this.getSides(x, y);
		ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
		ctx.fillRect(s.L, s.T, this.w, this.l);
	}
}

class Entity {
	constructor(x, y, z, sprite, shadow, tw, th, defw, defh, foot, hitbox) {
		this.pos = { x: x, y: y, z: 0 };
		this.sprite = new Sprite(sprite, tw, th);
		this.shadow = new Sprite(shadow, tw, th);
		this.defw = defw;
		this.defh = defh;
		this.foot = foot;
		this.hitbox = hitbox;
	}

	intPos() {
		return {
			x: Math.floor(this.pos.x),
			y: Math.floor(this.pos.y)
		};
	}

	getFoot() {
		return this.pos.y + this.foot;
	}

	collideGround(other) {
		if (!this.hitbox || !other.hitbox) {
			return false;
		}

		let this_sides = this.hitbox.getSides(this.pos.x, this.pos.y);
		let other_sides = other.hitbox.getSides(other.pos.x, other.pos.y);

		let this_center = { x: (this_sides.L + this_sides.R) / 2, y: (this_sides.T + this_sides.B) / 2 };
		let other_center = { x: (other_sides.L + other_sides.R) / 2, y: (other_sides.T + other_sides.B) / 2 };

		let dc = { x: other_center.x - this_center.x, y: other_center.y - this_center.y };

		let dm = null;

		if (Math.abs(dc.x) < 40 && Math.abs(dc.y) < 40) {
			let collision = false;

			if ((other_sides.T < this_sides.B && this_sides.B < other_sides.B) || (other_sides.T < this_sides.T && this_sides.T < other_sides.B)) {
				if ((other_sides.L < this_sides.R && this_sides.R < other_sides.R) || (other_sides.L < this_sides.L && this_sides.L < other_sides.R)) {
					collision = true;
				}
			}

			if ((!collision && this_sides.T <= other_sides.B && other_sides.B <= this_sides.B) || (this_sides.T <= other_sides.T && other_sides.T <= this_sides.B)) {
				if ((this_sides.L <= other_sides.R && other_sides.R <= this_sides.R) || (this_sides.L <= other_sides.L && other_sides.L <= this_sides.R)) {
					collision = true;
				}
			}

			if (!collision && other_sides.L <= this_sides.L && this_sides.R <= other_sides.R && this_sides.T <= other_sides.T && other_sides.B <= this_sides.B) {
				collision = true;
			}

			if (!collision && this_sides.L <= other_sides.L && other_sides.R <= this_sides.R && other_sides.T <= this_sides.T && this_sides.B <= other_sides.B) {
				collision = true;
			}

			if (collision) {
				dm = { dx: 0, dy: 0 };

				if (dc.x > 0) {
					dm.dx = this_sides.R - other_sides.L;
				} else {
					dm.dx = this_sides.L - other_sides.R;
				}

				if (dc.y > 0) {
					dm.dy = this_sides.B - other_sides.T;
				} else {
					dm.dy = this_sides.T - other_sides.B;
				}

				if (Math.abs(dm.dx) < Math.abs(dm.dy)) {
					dm.dy = 0;
				} else {
					dm.dx = 0;
				}

				return dm;
			}
		}
	}

	collidePoint(x, y, z) {
		if (!this.hitbox) {
			return false;
		}
		if (this.hitbox.h2 && this.hitbox.h1 + this.pos.z <= z && z <= this.hitbox.h2 + this.pos.z) {
			let sides = this.hitbox.getSides(this.pos.x, this.pos.y);
			if (sides.T < y && y < sides.B && sides.L < x && x < sides.R) {
				return true;
			}
		}
		return false;
	}

	draw(ctx, shadow = false) {
		let pos = this.intPos();

		if (shadow) {
			this.shadow.draw(ctx, pos.x - this.pos.z / 1.4, pos.y - this.pos.z / 1.4, this.defw, this.defh, 1);
		} else {
			this.sprite.draw(ctx, pos.x, pos.y - this.pos.z, this.defw, this.defh, 1);
		}
	}
}

class Trap extends Entity {
	constructor(x, y, img) {
		super(x, y, 0, img['trap'], null, 16, 16, 0, 0, 11, new Hitbox(6, 12, 4, 3));
		this.traped = null;
	}

	close() {
		this.foot = 16;
		if (this.defw < 3) {
			this.defw++;
		}
	}
}

class Fence extends Entity {
	constructor(x, y, pos, images, iscut = false) {
		let hb = pos ? new Hitbox(15, 11, 3, 18, 0, 7) : new Hitbox(7, 19, 24, 2, 0, 7);
		super(x, y, 0, images['fence'], images['fence_shadow'], 32, 32, pos, 0, pos ? 30 : 22, hb);
		this.health = 12;
		if (iscut) {
			this.cut();
		}
	}

	cut() {
		this.iscut = true;
		this.defh = 1;
		this.hitbox = null;
	}
}

class Tree extends Entity {
	constructor(x, y, images, type, iscut = false) {
		let hb = [new Hitbox(62, 123, 6, 4, 0, 50), new Hitbox(62, 124, 4, 3, 0, 50), new Hitbox(62, 125, 3, 2, 0, 50), new Hitbox(61, 124, 5, 3, 0, 50)];
		super(x, y, 0, images['pine_' + type], images['pine_' + type + '_shadow'], 128, 256, 0, 0, 128, hb[type - 1]);
		if (iscut) {
			this.cut();
		}
		this.health = 24;
	}

	cut() {
		this.iscut = true;
		this.defw = 1;
	}
}

class Mob extends Entity {
	constructor(x, y, sprite, shadow, tw, th, defw, defh, foot, hitbox) {
		super(x, y, 0, sprite, shadow, tw, th, defw, defh, foot, hitbox);
		this.vel = { x: 0, y: 0, z: 0 };
		this.walk = { state: 0, look: 0 };
		this.anim_speed = 0;
		this.walk_frame = 0;
		this.canmove = true;
	}

	get_orient(dx, dy, precise = false) {
		if (precise) {
			return Math.floor(((Math.atan2(dx, dy) / Math.PI) * 4 + 2.75 * Math.PI) % 8);
		} else {
			if (dx >= 0 && dy >= 0) {
				return 0;
			}
			if (dx >= 0 && dy <= 0) {
				return 1;
			}
			if (dx <= 0 && dy <= 0) {
				return 2;
			}
			if (dx <= 0 && dy >= 0) {
				return 3;
			}
		}
	}

	orient(dx, dy) {
		this.walk.look = this.get_orient(dx, dy);
	}

	intertia() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.pos.z += this.vel.z;

		let slow = 0.9;
		this.vel.x *= slow;
		this.vel.y *= slow;
		this.vel.z *= slow;
	}

	move(dx, dy, avoid_entities, frame, _static = false) {
		if (this.canmove) {
			if (!this.walk.state) {
				this.walk_frame = frame;
				this.walk.state = 1;
			}

			if (!_static) {
				this.vel.x += dx / 600;
				this.vel.y += dy / 600;

				this.intertia();

				this.anim_speed = Math.sqrt(dx * dx + dy * dy);

				for (let entity of avoid_entities) {
					let dm = this.collideGround(entity);
					if (dm) {
						this.pos.x -= dm.dx;
						this.pos.y -= dm.dy;
					}
				}
			}
		}
	}

	animate(frame) {
		let df = frame - this.walk_frame;
		if (this.walk.state && df && df % Math.max(1, Math.floor(30 - this.anim_speed)) == 0) {
			this.walk.state++;
			if (this.walk.state > 6) {
				this.walk.state = 1;
			}
		}
	}

	draw(ctx, shadow = false) {
		let pos = { x: Math.floor(this.pos.x + 0.5), y: Math.floor(this.pos.y + 0.5) };
		(shadow ? this.shadow : this.sprite).draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
	}
}

class Human extends Mob {
	constructor(x, y, name, img, health = 10, weapon = 0) {
		super(x, y, img[name], img['human_shadow'], 24, 24, 0, 0, 20, new Hitbox(9, 18, 6, 3, null));
		this.name = name;
		this.health = health;
		this.bow_sprite = new Sprite(img[name + '_bow'], 24, 24);
		this.axe_sprite = new Sprite(img[name + '_axe'], 24, 24);
		this.bow_aim_sprite = new Sprite(img['bow_aim'], 24, 24);
		this.axe_hit_sprite = new Sprite(img['axe_hit'], 24, 24);
		this.fence_sprite = new Sprite(img['fence_translucid'], 32, 32);
		this.red_fence_sprite = new Sprite(img['red_fence'], 32, 32);
		this.trap_sprite = new Sprite(img['trap'], 16, 16);
		this.icons = new Sprite(img['pnj_icons'], 24, 24);

		this.weapon = weapon;
		this.weapons = ['none', 'bow', 'axe', 'fence', 'trap'];
		this.weapon_frame = 0;
		this.aiming = null;
		this.axe_attack = null;
		this.fence_place = false;

		this.health = 6;
		this.stamina = 0;
		this.max_stamina = 12;
		this.wood = 12;
		this.traps = 0;
	}

	getWeapon() {
		return this.weapons[this.weapon];
	}

	aim(dx, dy) {
		this.aiming = { dx: dx, dy: dy };
	}

	checkFence(entities, img) {
		if (this.wood < 16) {
			return false;
		}

		let pos = { x: Math.floor(this.pos.x + 0.5), y: Math.floor(this.pos.y + 0.5) };
		let o = this.get_orient(this.aiming.dx, this.aiming.dy, true);
		let f = null;

		if (o == 0) {
			f = new Fence(pos.x - 7, pos.y + 5, 0, img);
		}
		if (o == 2) {
			f = new Fence(pos.x + 3, pos.y - 2, 1, img);
		}
		if (o == 4) {
			f = new Fence(pos.x - 7, pos.y - 8, 0, img);
		}
		if (o == 6) {
			f = new Fence(pos.x - 13, pos.y - 2, 1, img);
		}

		if (!f) {
			return false;
		}

		for (let entity of entities) {
			if (entity.collideGround(f)) {
				return false;
			}
		}
		return true;
	}

	draw(ctx, shadow = false, icon = 0, pos = null) {
		if (!pos) {
			pos = { x: Math.floor(this.pos.x + 0.5), y: Math.floor(this.pos.y + 0.5) };
		} else {
			pos = { x: Math.floor(pos.x + 0.5), y: Math.floor(pos.y + 0.5) };
		}

		if (shadow) {
			this.shadow.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
		} else if (icon) {
			this.icons.draw(ctx, pos.x, pos.y, icon - 1, 0, 1);
		} else {
			if (this.getWeapon() == 'bow') {
				if (this.aiming) {
					let o = this.get_orient(this.aiming.dx, this.aiming.dy, true);

					let ipos = this.intPos();

					let x = ipos.x + 12 + this.aiming.dx / 2;
					let y = ipos.y + 12 + this.aiming.dy / 2;

					ctx.fillStyle = '#cecece';
					ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);

					if (2 < o && o < 6) {
						this.bow_aim_sprite.draw(ctx, pos.x, pos.y, 0, o, 1);
						this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
					} else {
						if (this.walk.look == 2) {
							this.walk.look = 3;
						}
						if (this.walk.look == 1) {
							this.walk.look = 0;
						}
						this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
						this.bow_aim_sprite.draw(ctx, pos.x, pos.y, 0, o, 1);
					}
				} else {
					this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
					this.bow_sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
				}
			} else if (this.getWeapon() == 'axe') {
				this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
				if (this.aiming) {
					ctx.fillStyle = '#cecece';

					let ipos = this.intPos();

					let x = ipos.x + 12 + this.aiming.dx / 2;
					let y = ipos.y + 12 + this.aiming.dy / 2;

					ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
				} else if (this.axe_attack) {
					this.axe_hit_sprite.draw(ctx, pos.x, pos.y, this.axe_attack.f, this.axe_attack.o, 1);
				} else {
					this.axe_sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
				}
			} else if (this.getWeapon() == 'fence' && this.aiming) {
				let o = this.get_orient(this.aiming.dx, this.aiming.dy, true);

				if (o == 0) {
					this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
					if (this.fence_place) {
						this.fence_sprite.draw(ctx, pos.x - 7, pos.y + 5, 0, 0);
					} else {
						this.red_fence_sprite.draw(ctx, pos.x - 7, pos.y + 5, 0, 0);
					}
				} else if (o == 2) {
					this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
					if (this.fence_place) {
						this.fence_sprite.draw(ctx, pos.x + 3, pos.y - 2, 1, 0);
					} else {
						this.red_fence_sprite.draw(ctx, pos.x + 3, pos.y - 2, 1, 0);
					}
				} else if (o == 4) {
					if (this.fence_place) {
						this.fence_sprite.draw(ctx, pos.x - 7, pos.y - 8, 0, 0);
					} else {
						this.red_fence_sprite.draw(ctx, pos.x - 7, pos.y - 8, 0, 0);
					}
					this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
				} else if (o == 6) {
					this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
					if (this.fence_place) {
						this.fence_sprite.draw(ctx, pos.x - 13, pos.y - 2, 1, 0);
					} else {
						this.red_fence_sprite.draw(ctx, pos.x - 13, pos.y - 2, 1, 0);
					}
				} else {
					this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
				}
			} else if (this.getWeapon() == 'trap' && this.aiming) {
				if (this.aiming.dy < 0) {
					this.trap_sprite.draw(ctx, pos.x + 4 + this.aiming.dx / 4, pos.y + 4 + this.aiming.dy / 4, 0, 0, 1);
					this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
				} else {
					this.trap_sprite.draw(ctx, pos.x + 4 + this.aiming.dx / 4, pos.y + 4 + this.aiming.dy / 4, 0, 0, 1);
					this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
				}
			} else {
				this.sprite.draw(ctx, pos.x, pos.y, this.walk.state, this.walk.look, 1);
			}
		}
	}
}

class Infected extends Human {
	constructor(x, y, img, target = null) {
		super(x, y, 'infected1', img, 10, 2);
		this.target = target;
	}

	getTarget() {
		if (this.target.pos) return this.target.pos;
		else return this.target;
	}
}

class Ally extends Human {
	constructor(x, y, name, img, weapon = 0, target = null, event = null) {
		super(x, y, name, img, weapon);
		this.target = { x: target ? target.x : x, y: target ? target.y : y, obj: target };
		this.event = event;
	}

	getTarget() {
		if (this.target.obj) {
			return { x: this.target.obj.pos.x + this.target.x, y: this.target.obj.pos.y + this.target.y };
		} else {
			return this.target;
		}
	}
}

class Player extends Human {
	constructor(x, y, img, weapon = 1) {
		super(x, y, 'player', img, weapon);
	}
}

class Particle {
	constructor(x, y, z, vx, vy, vz, color, opacity) {
		this.pos = { x: x, y: y, z: z };
		this.trail = { x: x, y: y, z: z };
		this.vel = { x: vx, y: vy, z: vz };
		this.color = color;
		this.opacity = opacity;
	}

	move() {
		this.trail = { x: this.pos.x, y: this.pos.y, z: this.pos.z };
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.pos.z += this.vel.z;

		let c = 0.97;
		this.vel.x *= c;
		this.vel.y *= c;
		this.vel.z *= c;
		this.opacity *= c;
	}

	draw(ctx, shadow = false) {
		if (shadow) {
			let x1 = this.trail.x - this.trail.z / 1.4;
			let y1 = this.trail.y - this.trail.z / 1.4;
			let x2 = this.pos.x - this.pos.z / 1.4;
			let y2 = this.pos.y - this.pos.z / 1.4;
			let len = Math.floor(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
			ctx.globalAlpha = 0.1;
			line(ctx, x1, y1, x2, y2, len, 'black');
			ctx.globalAlpha = 1;
		} else {
			let x1 = this.trail.x;
			let y1 = this.trail.y - this.trail.z;
			let x2 = this.pos.x;
			let y2 = this.pos.y - this.pos.z;
			let len = Math.floor(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
			ctx.globalAlpha = this.opacity;
			line(ctx, x1, y1, x2, y2, len, this.color);
			ctx.globalAlpha = 1;
		}
	}

	getFoot() {
		return this.pos.y;
	}
}

class Arrow {
	constructor(x, y, z, vx, vy, vz, len, pts, color1, color2) {
		this.pos = { x: x, y: y, z: z };
		this.vel = { x: vx, y: vy, z: vz };

		this.pts = pts;
		this.len = len;
		this.color1 = color1;
		this.color2 = color2;

		this.stuck = false;
		this.dead = false;

		this.hp = 100;
	}

	getFoot() {
		return this.pos.y;
	}

	move(solid) {
		if (!this.stuck) {
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
			this.pos.z += this.vel.z;

			this.vel.x *= 0.99;
			this.vel.y *= 0.99;
			this.vel.z *= 0.99;

			this.vel.z -= 0.022;

			if (this.pos.z <= 0) {
				this.stuck = true;
			} else {
				let ex = this.getEx();
				for (let entity of solid) {
					if (entity.collidePoint(ex.x2, ex.y2, this.pos.z)) {
						this.stuck = true;
					}
				}
			}
		}
	}

	getEx(mode = 'flat') {
		let mag = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
		if (mode == 'flat') {
			return {
				x1: this.pos.x - (this.vel.x / mag) * this.len,
				y1: this.pos.y - (this.vel.y / mag) * this.len,
				x2: this.pos.x + (this.vel.x / mag) * this.len,
				y2: this.pos.y + (this.vel.y / mag) * this.len
			};
		} else if (mode == 'shadow') {
			return {
				x1: this.pos.x - this.pos.z / 1.4 - (this.vel.x / mag) * this.len,
				y1: this.pos.y - this.pos.z / 1.4 - (this.vel.y / mag) * this.len,
				x2: this.pos.x - this.pos.z / 1.4 + (this.vel.x / mag) * this.len,
				y2: this.pos.y - this.pos.z / 1.4 + (this.vel.y / mag) * this.len
			};
		} else {
			return {
				x1: this.pos.x - (this.vel.x / mag) * this.len,
				y1: this.pos.y - this.pos.z - (this.vel.y / mag) * this.len + this.vel.z,
				x2: this.pos.x + (this.vel.x / mag) * this.len,
				y2: this.pos.y - this.pos.z + (this.vel.y / mag) * this.len - this.vel.z
			};
		}
	}

	draw(ctx, mode) {
		let ex = this.getEx(mode);
		if (mode == 'shadow') {
			ctx.globalAlpha = 0.1;
			line(ctx, ex.x1, ex.y1, ex.x2, ex.y2, Math.floor(this.len * 1.6), 'black');
		} else {
			line(ctx, ex.x1, ex.y1, ex.x2, ex.y2, Math.floor(this.pts), this.color1);
			ctx.fillStyle = this.color2;
			ctx.fillRect(Math.floor(ex.x2), Math.floor(ex.y2), 1, 1);
		}
		ctx.globalAlpha = 1;
	}
}

function line(ctx, x1, y1, x2, y2, steps, color) {
	ctx.fillStyle = color;
	let i = 0;
	while (i < steps) {
		ctx.fillRect(Math.floor((x1 * i + x2 * (steps - i)) / steps), Math.floor((y1 * i + y2 * (steps - i)) / steps), 1, 1);
		i++;
	}
}
