class Sprite {
	constructor(img, tile = { x: 0, y: 0, w: 16, h: 16 }) {
		this.img = img;
		this.tile = tile;
	}

	draw(ctx, coords) {
		ctx.drawImage(this.img, this.tile.x * this.tile.w, this.tile.y * this.tile.h, this.tile.w, this.tile.h, coords.x, coords.y, this.tile.w, this.tile.h);
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

	inScreen() {
		if (game.borders) {
			let { l, t, w, h } = game.borders;
			let tile = this.sprites.main.tile;
			let pos = this.pos;

			return !(pos.x + tile.w < l || pos.y + tile.h < t || l + w < pos.x || t + h < pos.y);
		} else return false;
	}

	draw(ctx, sprite_name = 'main', coords = null) {
		let sprite = this.sprites[sprite_name];
		let { x, y, z } = coords ? coords : { x: Math.floor(this.pos.x + 0.5), y: Math.floor(this.pos.y + 0.5), z: this.pos.z };

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

	collideGround(other, restrict = true, correction = false) {
		let e = this.hitbox.getSides(this.pos.x, this.pos.y);
		let o = other.hitbox.getSides(other.pos.x, other.pos.y);

		if (!(e.R < o.L || e.B < o.T || o.R < e.L || o.B < e.T)) {
			if (correction) {
				let ce = { x: (e.L + e.R) / 2, y: (e.T + e.B) / 2 };
				let co = { x: (o.L + o.R) / 2, y: (o.T + o.B) / 2 };
				let cd = { x: co.x - ce.x, y: co.y - ce.y };

				let d = { x: 0, y: 0 };

				if (cd.x > 0) d.x = e.R - o.L;
				else d.x = e.L - o.R;

				if (cd.y > 0) d.y = e.B - o.T;
				else d.y = e.T - o.B;

				if (restrict) {
					if (Math.abs(d.x) < Math.abs(d.y)) d.y = 0;
					else d.x = 0;
				}

				return d;
			} else return true;
		} else return false;
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
	constructor(name, pos, variant = '') {
		super(
			pos,
			{
				main: new Sprite(game.images[name + variant], { x: 0, y: 0, w: 24, h: 24 }),
				shadow: new Sprite(game.images['human-shadow'], { x: 0, y: 0, w: 24, h: 24 }),
				axe: new Sprite(game.images['axe-hold'], { x: 0, y: 0, w: 24, h: 24 }),
				axe_hit: new Sprite(game.images['axe-hit'], { x: 0, y: 0, w: 24, h: 24 }),
				bow: new Sprite(game.images['bow-hold'], { x: 0, y: 0, w: 24, h: 24 }),
				bow_aim: new Sprite(game.images['bow-aim'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-null': new Sprite(game.images['icon-null'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-stay': new Sprite(game.images['icon-stay'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-follow': new Sprite(game.images['icon-follow'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-bow': new Sprite(game.images['icon-bow'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-axe': new Sprite(game.images['icon-axe'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-fence': new Sprite(game.images['icon-fence'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-noamo': new Sprite(game.images['icon-noamo'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-plus': new Sprite(game.images['icon-plus'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-none': new Sprite(game.images['icon-none'], { x: 0, y: 0, w: 24, h: 24 }),
				'icon-exclam': new Sprite(game.images['icon-exclam'], { x: 0, y: 0, w: 24, h: 24 })
			},
			new Hitbox(9, 21, 6, 5, 13),
			{ x: 12, y: 24 }
		);

		this.name = name;
		this.dead = false;
		this.health = { val: 12, max: 9 };
		this.stamina = { val: 0, max: 9, time: 0 };
		this.mana = { val: 3, max: 9 };
		this.wood = { val: 16, max: 32 };
		this.move = { x: 0, y: 0, time: null };
		this.look = { x: 0, y: 1, aim: false };
		this.weapon = 'none';
		this.attack = null;
		this.arrow = null;
		this.alert = null;
		this.speed = 1;
		this.target = { obj: null, x: this.pos.x, y: this.pos.y };
		this.foot_step = 0;
		this.aura = null;
		this.view_distance = 80;
	}

	createAura(color, gravity) {
		let { x, y } = this.getFeet();
		let r = () => Math.random() - 0.5;
		x += r() * 8 + 0.5;
		y += r() * 6;
		let z = Math.random() * 8 + 4;
		game.entities.particles.push(new Particle({ x: x, y: y, z: z }, { x: 0, y: 0, z: 0 }, 1, 1, false, color, gravity, -500));
	}

	die() {
		for (let i = 0; i < 20; i++) this.createAura('blood', 0);
		this.view_distance = 0;
		this.dead = true;
	}

	getOrient(divs, dir = this.look) {
		let o = Math.atan2(dir.y, dir.x) + Math.PI;
		if (divs == 8) o = (o + Math.PI / 8) % (2 * Math.PI);
		return Math.floor((o / Math.PI / 2) * divs);
	}

	touchMob(mob, dtime) {
		let h = this.getFeet();
		let m = mob.getFeet();
		let v = { x: m.x - h.x, y: m.y - h.y };
		let mag = Math.sqrt(v.x * v.x + v.y * v.y);
		mob.pushTo(v.x / mag, v.y / mag, dtime);
	}

	animate(dtime, solids, mobs) {
		if (this.alert && this.alert.timeout && time > this.alert.timeout) this.alert = null;

		if (this.attack) {
			if (time > this.attack.next_time) {
				this.attack.progression++;
				this.attack.next_time = time + this.attack.delay;
			}

			if (this.weapon == 'axe' || this.name == 'creature') {
				let tile = this.sprites.axe_hit.tile;
				if (this.attack.level == 1) {
					tile.x = this.attack.progression;
					tile.y = this.getOrient(8, this.attack.dir);
					if (this.attack.progression > 3) this.attack = null;
				} else {
					if (this.attack.progression > 10) this.attack = null;
					else if (this.attack.progression > 9) {
						tile.x = 3;
						tile.y = 7;
					} else if (this.attack.progression > 1) {
						tile.x = 2;
						tile.y = this.attack.progression - 2;
					} else {
						tile.x = this.attack.progression;
						tile.y = 0;
					}
				}
			}
		}

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
				let d = this.collideGround(solid, true, true);
				if (d) {
					this.pos.x -= d.x;
					this.pos.y -= d.y;
				}
			}
		}

		for (let mob of mobs) {
			if (mob != this && this.collideGround(mob, false)) this.touchMob(mob, dtime);
		}

		if (move_mag > 0.4) {
			if (!this.look.aim) {
				this.look.x = this.move.x;
				this.look.y = this.move.y;
			}

			if (!this.move.time) this.move.time = time;

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

		this.sprites.main.tile.y = this.getOrient(4);

		if (time - this.stamina.time > 900 / (this.speed * 2 - 1)) {
			this.stamina.time = time;
			if (this.speed == 2) {
				if (this.stamina.val <= 0 || this.look.aim) this.speed = 1;
				else this.stamina.val--;
			} else if (this.stamina.val < this.stamina.max) this.stamina.val++;
		}

		if (this.aura && time - this.aura.last > this.aura.delay && this.inScreen()) {
			this.createAura(this.aura.color, 0);
			this.aura.last = time + this.aura.delay * Math.random() * 0.5;
			if (this.name == 'creature' && game.fog_map) this.aura.delay = 10;
		}

		this.view_distance = 12 + this.health.val * 5.7;
		if (this.health.val <= 0) this.die();
	}

	draw(ctx, sprite_name = 'main', coords = null) {
		let { x, y, z } = coords ? coords : { x: Math.floor(this.pos.x + 0.5), y: Math.floor(this.pos.y + 0.5), z: this.pos.z };

		if (this.name != 'creature' || (game.fog_map && game.player && game.player.view_distance < 80)) {
			if (sprite_name == 'shadow') {
				let shadow = this.sprites[sprite_name];
				y -= z * 0.5;
				x -= z * 0.65;
				x = Math.floor(x);
				y = Math.floor(y);
				z = Math.floor(z);
				shadow.draw(ctx, { x: x, y: y, z: z });
			} else if (sprite_name == 'main') {
				y -= z;
				x = Math.floor(x);
				y = Math.floor(y);
				z = Math.floor(z);
				let body = this.sprites[sprite_name];
				body.tile.y = Math.min(Math.max(0, body.tile.y), 3);

				if (this.weapon == 'bow' || this.weapon == 'axe' || (this.name == 'creature' && this.attack)) {
					if (this.look.aim) {
						if (this.weapon == 'bow') {
							this.sprites.bow_aim.tile.x = this.getOrient(8);
							if (this.look.y < 0) {
								this.sprites.bow_aim.draw(ctx, { x: x, y: y, z: z });
								body.draw(ctx, { x: x, y: y, z: z });
							} else {
								body.draw(ctx, { x: x, y: y, z: z });
								this.sprites.bow_aim.draw(ctx, { x: x, y: y, z: z });
							}
						} else {
							body.draw(ctx, { x: x, y: y, z: z });
						}
					} else {
						if ((this.weapon == 'axe' || this.name == 'creature') && this.attack) {
							let hit = this.sprites.axe_hit;

							if (hit.tile.y < 2) {
								hit.draw(ctx, { x: x, y: y, z: z });
								body.draw(ctx, { x: x, y: y, z: z });
							} else {
								body.draw(ctx, { x: x, y: y, z: z });
								hit.draw(ctx, { x: x, y: y, z: z });
							}
						} else if (this.weapon == 'bow' || this.weapon == 'axe') {
							let o = body.tile.y;
							let weapon = this.sprites[this.weapon];
							weapon.tile.x = o == 1 || o == 2;

							if (o < 2) {
								weapon.draw(ctx, { x: x, y: y, z: z });
								body.draw(ctx, { x: x, y: y, z: z });
							} else {
								body.draw(ctx, { x: x, y: y, z: z });
								weapon.draw(ctx, { x: x, y: y, z: z });
							}
						}
					}
				} else body.draw(ctx, { x: x, y: y, z: z });
			} else {
				y -= z;
				x = Math.floor(x);
				y = Math.floor(y);
				z = Math.floor(z);
				let sprite = this.sprites[sprite_name];
				sprite.draw(ctx, { x: x, y: y, z: z });
			}
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

	setWeapon(weapon) {
		this.weapon = weapon;
		this.setAlert(weapon, 1000);
	}

	setAlert(icon, duration) {
		if (duration) this.alert = { icon: 'icon-' + icon, duration: duration, timeout: time + duration };
		else this.alert = { icon: 'icon-' + icon, duration: null, timeout: null };
	}

	shoot(event, level) {
		if (!this.dead) {
			if (this.weapon == 'bow') {
				this.arrow = new Arrow({ ...this.getFeet(), z: 10 }, { x: event.x / 8, y: event.y / 8, z: 0 });
				game.entities.particles.push(this.arrow);
				this.stamina.val--;
				this.wood.val--;
			} else if (this.weapon == 'axe' || this.name == 'creature') {
				this.attack = {
					dir: { ...this.look },
					level: level,
					progression: -1,
					next_time: 0,
					delay: 30
				};
			}
		}
	}
}

class Creature extends Human {
	constructor(pos) {
		super('creature', pos);
		this.aura = { color: '#212423', delay: 100, last: time };
		this.speed = 1.2;
		this.target = null;
	}

	die() {
		for (let i = 0; i < 20; i++) this.createAura('blood', 0);
		for (let i = 0; i < 10; i++) this.createAura(this.aura.color, 0);
		this.dead = true;
	}

	touchMob(mob, dtime) {
		let h = this.getFeet();
		let m = mob.getFeet();
		let v = { x: m.x - h.x, y: m.y - h.y };
		let mag = Math.sqrt(v.x * v.x + v.y * v.y);
		if (mob.name == 'creature') mob.pushTo(v.x / mag, v.y / mag, dtime);
		else if (!this.attack) {
			mob.pushTo((v.x / mag) * 10, (v.y / mag) * 10, dtime);
			mob.health.val -= 1;
			mob.view_distance = 96;
			this.shoot(null, 1);
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

			this.moveTime = time + Math.random() * 1000 + 2000;
		}
	}
}

class Particle {
	constructor(pos, vel, width = 1, opacity = 1, shadow = true, color = 'white', gravity = 0, timeout = null) {
		this.pos = pos;
		this.vel = vel;
		this.width = width;
		this.opacity = opacity;
		this.shadow = shadow;
		this.color = color;
		this.dead = false;
		this.gravity = gravity;
		this.timeout = timeout;
		if (timeout && timeout < -1) this.timeout = Math.random() * Math.abs(timeout) + Math.abs(timeout) / 10;
		this.time = time;

		if (this.color == 'blood') {
			let r = Math.floor(192 + Math.random() * 63);
			let g = Math.floor(64 + Math.random() * 32);
			let b = Math.floor(64 + Math.random() * 32);
			this.color = `rgba(${r}, ${g}, ${b}, 1)`;
		}

		if (this.color == 'spit') {
			let r = Math.floor(64 + Math.random() * 32);
			let g = Math.floor(128 + Math.random() * 28);
			let b = Math.floor(96 + Math.random() * 32);
			this.color = `rgba(${r}, ${g}, ${b}, 1)`;
		}
	}

	inScreen() {
		let { l, t, w, h } = game.borders;
		return l < this.pos.x && t < this.pos.y && this.pos.x < l + w && this.pos.y < t + h;
	}

	animate(dtime) {
		if (this.timeout && this.time + this.timeout - time <= 0) this.dead = true;

		for (let c of 'xyz') this.pos[c] += this.vel[c] * dtime * game.speed;
		this.vel.z -= (this.gravity * dtime * game.speed) / 10000;
	}

	draw(ctx, mode, alpha = 1) {
		ctx.globalAlpha = this.opacity * alpha;
		if (mode == 'main') {
			ctx.fillStyle = this.color;

			let x = Math.floor(this.pos.x - this.width / 2);
			let y = Math.floor(this.pos.y - this.width / 2 - this.pos.z);

			ctx.fillRect(x, y, this.width, this.width);
		} else if (mode == 'shadow' && this.shadow) {
			ctx.globalAlpha *= 0.2;
			ctx.fillStyle = 'black';

			let { x, y } = this.getShad(this.pos);
			ctx.fillRect(x, y, this.width, this.width);
		}
		ctx.globalAlpha = 1;
	}

	getShad(pos) {
		return {
			x: Math.floor(pos.x - pos.z * 0.65),
			y: Math.floor(pos.y - pos.z * 0.5)
		};
	}

	getFeet() {
		return { x: this.pos.x, y: this.pos.y, z: 0 };
	}
}

class Trail extends Particle {
	constructor(pos, vel, width = 10, opacity = 1, shadow = true, color = 'white', gravity = 0, trailing = false, timeout = null, slowness = 0) {
		super(pos, vel, width, opacity, shadow, color, gravity, timeout);
		this.endPoint = null;
		this.stuck = false;
		this.trailing = trailing;
		this.trail_time = time;
		this.slowness = slowness;
	}

	animate(dtime, solids, mobs) {
		if (this.timeout && this.time + this.timeout - time <= 0) this.dead = true;
		else {
			let ex = this.get3DEx();
			let h = ex.head;

			this.stuck = h.z < 0.5;

			if (!this.stuck) {
				for (let solid of solids) {
					if (solid.collidePoint(h.x, h.y, h.z)) {
						this.stuck = true;
						break;
					}
				}
			}

			if (!this.stuck) {
				for (let c of 'xyz') {
					this.pos[c] += this.vel[c] * dtime * game.speed;
					this.vel[c] *= 1 - this.slowness * dtime;
				}
				this.vel.z -= (this.gravity * dtime * game.speed) / 10000;

				for (let mob of mobs) {
					if (mob.collidePoint(h.x, h.y, h.z)) this.onContact(mob);
				}
			}

			if (this.trailing && !this.stuck && this.trail_time - time < 0) {
				this.trail_time = time + 30;
				game.entities.particles.push(new Particle(ex.tail, { x: 0, y: 0, z: 0 }, 1, Math.random() / 2 + 0.5, true, this instanceof Arrow ? 'white' : this.color, 0, -500));
			}
		}
	}

	onContact(mob) {}

	get3DEx() {
		let mag = this.getMag();
		return {
			head: {
				x: this.pos.x + ((this.vel.x / mag) * this.width) / 2,
				y: this.pos.y + ((this.vel.y / mag) * this.width) / 2,
				z: this.pos.z + ((this.vel.z / mag) * this.width) / 2
			},

			tail: {
				x: this.pos.x - ((this.vel.x / mag) * this.width) / 2,
				y: this.pos.y - ((this.vel.y / mag) * this.width) / 2,
				z: this.pos.z - ((this.vel.z / mag) * this.width) / 2
			}
		};
	}

	get2DEx(mode) {
		let { head, tail } = this.get3DEx();
		let mag = this.getMag();

		if (mode == 'shadow') {
			let tail_shad = this.getShad(tail);
			let head_shad = this.getShad(head);
			return {
				x1: tail_shad.x,
				y1: tail_shad.y,
				x2: head_shad.x,
				y2: head_shad.y
			};
		} else {
			return {
				x1: tail.x,
				y1: tail.y - tail.z,
				x2: head.x,
				y2: head.y - head.z
			};
		}
	}

	draw(ctx, mode, alpha = 1) {
		if (this.getMag()) {
			ctx.globalAlpha = this.opacity * alpha;
			ctx.fillStyle = mode == 'shadow' ? 'black' : this.color;
			if (mode == 'shadow') ctx.globalAlpha *= 0.2;

			let { x1, y1, x2, y2 } = this.get2DEx(mode);
			for (let p of game.getLine(x1, y1, x2, y2)) {
				ctx.fillRect(p[0], p[1], 1, 1);
			}

			if (mode != 'shadow' && this.endPoint) {
				ctx.fillStyle = this.endPoint;
				ctx.fillRect(Math.floor(x2), Math.floor(y2), 1, 1);
			}

			ctx.globalAlpha = 1;
		}
	}

	getMag() {
		let v = this.vel;
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
	}
}

class Arrow extends Trail {
	constructor(pos, vel) {
		super(pos, vel, 8, 1, true, '#4e443a', 0.5, true, null, 0.0001);
		this.endPoint = 'white';
		this.victims = [];
		this.start_coords = { ...pos };
		console.log(pos, game.player.pos);
	}

	onContact(mob) {
		if (mob.name == 'creature' && !this.victims.includes(mob)) {
			let arr_mag = this.getMag();
			mob.health.val -= arr_mag * 20;
			this.victims.push(mob);

			if (!mob.target || !mob.target.obj) {
				mob.setAlert('exclam', 200);
				mob.target = {
					x: this.start_coords.x - 12 + (Math.random() - 0.5) * 48,
					y: this.start_coords.y - 24 + (Math.random() - 0.5) * 48,
					obj: null
				};
			}

			for (let c of 'xyz') this.vel[c] *= 0.5;
			for (let i = 0; i < 50 * arr_mag; i++) {
				game.entities.particles.push(
					new Trail(
						{ ...this.pos },
						{
							x: this.vel.x + (Math.random() - 0.5) * 0.07,
							y: this.vel.y + (Math.random() - 0.5) * 0.07,
							z: this.vel.z + (Math.random() - 0.5) * 0.07
						},
						1,
						1,
						true,
						'blood',
						0.1,
						true,
						-1000,
						0.01
					)
				);
			}
		}
	}
}
