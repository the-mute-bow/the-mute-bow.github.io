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
		if (options.includes('all')) return true;

		if (game.borders) {
			let { l, t, w, h } = game.borders;
			let tile = this.sprites.main.tile;
			let pos = this.pos;

			return !(pos.x + tile.w < l || pos.y + tile.h < t || l + w < pos.x || t + h < pos.y);
		} else return false;
	}

	animate() {}

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

class Mob extends Entity {
	constructor(pos, sprites, hitbox) {
		super(pos, sprites, hitbox, { x: 12, y: 24 });

		this.dead = false;
		this.health = { val: 9, max: 9 };
		this.move = { x: 0, y: 0, time: null };
		this.look = { x: 0, y: 1, aim: 0 };
		this.alert = null;
		this.speed = 1;
		this.target = { obj: null, x: this.pos.x, y: this.pos.y };
		this.foot_step = 0;
		this.still_tile = 0;
		this.aura = null;
	}

	die() {
		for (let i = 0; i < 20; i++) this.createAura('blood', 0);
		this.dead = true;
	}

	createAura(color, gravity) {
		let { x, y } = this.getFeet();
		let r = () => Math.random() - 0.5;
		x += r() * 8 + 0.5;
		y += r() * 6;
		let z = Math.random() * 8 + 4;
		game.entities.particles.push(new Particle({ x: x, y: y, z: z }, { x: 0, y: 0, z: 0 }, 1, 1, false, color, gravity, -500));
	}

	getOrient(divs, dir = this.look) {
		let o = Math.atan2(dir.y, dir.x) + Math.PI;
		if (divs == 8) o = (o + Math.PI / 8) % (2 * Math.PI);
		return Math.floor((o / Math.PI / 2) * divs) | 0;
	}

	touchMob(mob, dtime) {
		let h = this.getFeet();
		let m = mob.getFeet();
		let v = { x: m.x - h.x, y: m.y - h.y };
		let mag = Math.sqrt(v.x * v.x + v.y * v.y);
		mob.pushTo(v.x / mag, v.y / mag, dtime);
	}

	getStep() {
		return (Math.floor((time - this.move.time) / 200) % 2) + 1;
	}

	moveOn(dtime, solids, mobs) {
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

			let step = this.getStep();
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
			this.sprites.main.tile.x = this.still_tile;
		}

		this.sprites.main.tile.y = this.getOrient(4);
	}

	animate(dtime, solids, mobs) {
		if (this.alert && this.alert.timeout && time > this.alert.timeout) this.alert = null;
		this.moveOn(dtime, solids, mobs);
		if (this.health.val <= 0) this.die();
	}

	pushTo(x, y, dtime) {
		this.move.x += (x * game.speed * (dtime | 1)) / 4;
		this.move.y += (y * game.speed * (dtime | 1)) / 4;
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

	setAlert(icon, duration) {
		if (duration) this.alert = { icon: 'icon-' + icon, duration: duration, timeout: time + duration };
		else this.alert = { icon: 'icon-' + icon, duration: null, timeout: null };
	}
}

class Human extends Mob {
	constructor(name, pos, variant = name == 'creature' ? '' : game.variant) {
		super(
			pos,
			{
				main: new Sprite(game.images[name + variant], { x: 0, y: 0, w: 24, h: 24 }),
				ghost: new Sprite(game.images['creature-light'], { x: 0, y: 0, w: 24, h: 24 }),
				shadow: new Sprite(game.images['human-shadow'], { x: 0, y: 0, w: 24, h: 24 }),
				axe: new Sprite(game.images['axe-hold'], { x: 0, y: 0, w: 24, h: 24 }),
				axe_hit: new Sprite(game.images['axe-hit'], { x: 0, y: 0, w: 24, h: 24 }),
				bow: new Sprite(game.images['bow-hold'], { x: 0, y: 0, w: 24, h: 24 }),
				bow_aim: new Sprite(game.images['bow-aim'], { x: 0, y: 0, w: 24, h: 24 })
			},
			new Hitbox(9, 21, 6, 5, 13)
		);

		for (let s of [
			'icon-null',
			'icon-stay',
			'icon-follow',
			'icon-bow',
			'icon-axe',
			'icon-fence',
			'icon-noamo',
			'icon-plus',
			'icon-none',
			'icon-exclam',
			'icon-message',
			'icon-stamina-red',
			'icon-stamina-green',
			'icon-stamina-use',
			'icon-mana0',
			'icon-mana1',
			'icon-mana2',
			'icon-mana3',
			'icon-mana4'
		]) {
			this.sprites[s] = new Sprite(game.images[s], { x: 0, y: 0, w: 24, h: 24 });
		}

		this.name = name;
		this.health = { val: 12, max: 9 };
		this.stamina = { val: 0, max: 9, time: 0 };
		this.mana = { val: 0, max: 4 };
		this.wood = { val: 8, max: 32 };
		this.weapon = 'none';
		this.attack = null;
		this.arrow = null;
		this.view_distance = 80;
		this.aim_distance = 40;
		this.tired = false;
		this.enemies = null;
		this.shoot_time = null;
		this.aim_level = 0;
		this.damage = 1;

		this.aura = { color: '#202124', delay: 100, last: time };

		this.weapons = {
			bow: true,
			axe: true,
			fence: true,
			echo: true
		};
	}

	die() {
		for (let i = 0; i < 20; i++) this.createAura('blood', 0);
		this.view_distance = 0;
		this.dead = true;
	}

	animate(dtime, solids, mobs) {
		if (this.alert && this.alert.timeout && time > this.alert.timeout) this.alert = null;
		if (this.event && !this.alert) this.setAlert('message');
		if (!this.event && this.alert && this.alert.icon == 'icon-message' && !this.alert.timeout) this.setAlert('message', 200);

		if (this.enemies) this.autoAim(game.entities[this.enemies]);

		if (this.look.aim == 2 && this.weapon == 'axe') {
			this.shoot();
			game.touches.R = null;
		}

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

		this.moveOn(dtime, solids, mobs);

		let stamina_dtime = 900 / (this.speed * 2 - 1);
		if (game.dimension > 2) stamina_dtime *= 2;

		if (this.name != 'creature' && time - this.stamina.time > stamina_dtime) {
			this.stamina.time = time;
			if (this.speed > 1) {
				if (this.stamina.val <= 0 || this.look.aim) {
					this.speed = 1;
					if (game.dimension > 1) game.dimension = 0;
				} else this.stamina.val--;
			} else if (this.stamina.val < this.stamina.max) this.stamina.val++;
		}

		if (this.aura && (this.name == 'creature' || game.dimension > 2) && time - this.aura.last > this.aura.delay && this.inScreen()) {
			this.createAura(game.dimension > 1 ? '#cdcad3' : this.aura.color, 0);
			this.aura.last = time + this.aura.delay * Math.random() * 0.5;
		}

		if (game.fog_map || game.dimension > 1) this.aura.delay = 10;
		else this.aura.delay = 100;

		if (!this.tired && this.stamina.val < 1 && this.name != 'creature') {
			this.tired = true;
			this.setAlert('stamina-red', 1000);
		}

		if (this.tired && this.stamina.val == this.stamina.max) {
			this.tired = false;
			this.setAlert('stamina-green', 1000);
		}

		if (this.look.aim > this.aim_level) this.aim_level = this.look.aim;

		if (this.name != 'creature') this.view_distance = 12 + this.health.val * 5.7;
		if (this.health.val <= 0) this.die();
	}

	draw(ctx, sprite_name = 'main', coords = null) {
		this.sprites.ghost.tile.x = this.sprites.main.tile.x;
		this.sprites.ghost.tile.y = this.sprites.main.tile.y;

		let { x, y, z } = coords ? coords : { x: Math.floor(this.pos.x + 0.5), y: Math.floor(this.pos.y + 0.5), z: this.pos.z };

		if (this.name != 'creature' || game.dimension > 1 || (game.fog_map && game.player && game.player.view_distance < 80)) {
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
				let body = this.sprites[game.dimension > 1 ? 'ghost' : sprite_name];
				body.tile.y = Math.min(Math.max(0, body.tile.y), 3);

				if (['bow', 'axe', 'fence'].includes(this.weapon) || (this.name == 'creature' && this.attack)) {
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
						} else if (this.weapon == 'fence') {
							let fence = this.getFence();
							let alpha = ctx.globalAlpha;

							ctx.globalAlpha *= fence.red ? 0.2 : 0.6;
							fence.draw(ctx, 'main');
							ctx.globalAlpha = alpha;
							body.draw(ctx, { x: x, y: y, z: z });
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
						} else if (this.weapon == 'fence') {
							body.draw(ctx, { x: x, y: y, z: z });
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

	getFence() {
		let side = Math.abs(this.look.x) > Math.abs(this.look.y);
		let pos = {
			x: this.pos.x + (side ? -5 : -7) + this.look.x * 16,
			y: this.pos.y + (side ? 4 : 3) + this.look.y * 16,
			z: 0
		};

		let fence = new Fence(pos, side);

		for (let build of game.entities.buildings) {
			if (fence.collideGround(build)) fence.setRed();
		}

		return fence;
	}

	setMana(mode = '+') {
		let done = false;
		if (mode == '+' && this.mana.val < this.mana.max) {
			this.mana.val++;
			done = true;
		} else if (mode == '-' && this.mana.val) {
			this.mana.val--;
			done = true;
		}

		if (done) this.setAlert('mana' + this.mana.val, 1800);
		return done;
	}

	setWeapon(weapon) {
		this.weapon = weapon;
		this.setAlert(weapon, 1000);
	}

	autoAim(mobs) {
		let best = null;
		for (let mob of mobs) {
			let d = {
				x: mob.getFeet().x - this.getFeet().x,
				y: mob.getFeet().y - this.getFeet().y
			};

			let r = this.aim_distance;
			if (Math.abs(d.x) < r && Math.abs(d.y) < r) {
				let mag = Math.sqrt(d.x * d.x + d.y * d.y);
				if (mag < r && (!best || mag < best.mag)) best = { d: d, mag: mag };
			}
		}

		if (best) {
			if (this.name != 'creature') {
				this.look = { x: best.d.x / best.mag, y: best.d.y / best.mag, aim: 1 };
				if (!this.shoot_time) this.shoot_time = this.shoot_time = time + Math.random() * 1000 + 500;
				if (this.stamina.val > 0 && time - this.shoot_time > 0) {
					this.shoot();
					this.shoot_time = time + Math.random() * 1000 + 500;
				}
			}
		} else {
			this.look.aim = 0;
			this.shoot_time = null;
		}
	}

	shoot(dir = { ...this.look }) {
		if (!this.dead) {
			this.stamina.val--;

			if (this.weapon == 'bow') {
				let v = this.aim_level > 1 ? 16 : 8;
				this.arrow = new Arrow({ ...this.getFeet(), z: 10 }, { x: dir.x / v, y: dir.y / v, z: 0 }, this.name == 'eliot' ? null : -5000, this.aim_level, this.damage);
				game.entities.particles.push(this.arrow);
				this.wood.val--;
			} else if (this.weapon == 'axe' || this.name == 'creature') {
				this.attack = {
					dir: dir,
					level: this.aim_level,
					progression: -1,
					next_time: 0,
					delay: 30
				};

				let pos = this.getFeet();
				let x1 = pos.x + dir.x * 2;
				let y1 = pos.y + dir.y * 2 - 9;
				let x2 = pos.x + dir.x * 9;
				let y2 = pos.y + dir.y * 9 - 9;

				for (let entity of [...game.entities.creatures, ...game.entities.trees].filter(entity => !entity.dead && entity.name != this.name)) {
					let d = {
						x: entity.getFeet().x - pos.x,
						y: entity.getFeet().y - pos.y
					};

					let r = 9;

					if (Math.abs(d.x) < r && Math.abs(d.y) < r && Math.sqrt(d.x * d.x + d.y * d.y) < r) {
						let atan = Math.abs(Math.atan2(dir.x, dir.y) + Math.PI) - Math.abs(Math.atan2(d.x, d.y) + Math.PI);
						if (this.aim_level == 2 || atan < 0.1) {
							entity.health.val--;
							if (entity.name) entity.pushTo(d.x, d.y, 100 * this.aim_level);
							else {
								for (let i = 0; i < 20; i++)
									game.entities.particles.push(
										new Particle(
											{ x: entity.getFeet().x + (Math.random() - 0.5) * 12, y: entity.getFeet().y + (Math.random() - 0.5) * 12, z: 3 + Math.random() * 6 },
											{ x: 0, y: 0, z: 0 },
											1,
											Math.random(),
											false,
											'white',
											0,
											-500
										)
									);
							}
						}
					}
				}
			} else if (this.weapon == 'fence') {
				let fence = this.getFence();
				if (!fence.red) {
					game.entities.buildings.push(fence);
					this.wood.val -= 0;
				}
			}

			this.aim_level = 0;
		}
	}
}

class Creature extends Human {
	constructor(pos) {
		super('creature', pos);
		this.aura = { color: '#202124', delay: 100, last: time };
		this.speed = 1.2;
		this.target = null;
		this.can_see = true;
		this.view_distance = 25;
	}

	die() {
		for (let i = 0; i < 20; i++) this.createAura('blood', 0);
		for (let i = 0; i < 10; i++) this.createAura(this.aura.color, 0);

		if (Math.random() < 0.1) game.entities.particles.push(new Drop({ ...this.getFeet(), z: Math.random() * 3 + 3 }, 'mana'));
		for (let i = 0; i < Math.random() * 5; i++) game.entities.particles.push(new Drop({ ...this.getFeet(), z: Math.random() * 3 + 3 }, 'coin'));

		this.dead = true;
	}

	touchMob(mob, dtime) {
		let h = this.getFeet();
		let m = mob.getFeet();
		let v = { x: m.x - h.x, y: m.y - h.y };
		let mag = Math.sqrt(v.x * v.x + v.y * v.y);
		if (mob.name == 'creature' || this.attack) mob.pushTo(v.x / mag, v.y / mag, dtime);
		else if (!this.attack) {
			mob.pushTo(v.x / mag, v.y / mag, 500);
			mob.health.val -= 1;

			if (mob == game.player) {
				game.cam.h *= 1.1;
				game.mode = 'normal';
			}

			this.aim_level = 1;
			this.shoot();
		}
	}
}

class Sheep extends Mob {
	constructor(pos, variant = '') {
		super(
			pos,
			{
				main: new Sprite(game.images['sheep' + variant], { x: 0, y: 0, w: 24, h: 24 }),
				shadow: new Sprite(game.images['sheep-shadow'], { x: 0, y: 0, w: 24, h: 24 })
			},
			new Hitbox(7, 21, 11, 5, 10)
		);

		this.still_tile = Math.floor(Math.random() * 2);
		this.peek_time = { lonely: 0, people: 0 };
	}

	getStep() {
		return (Math.floor((time - this.move.time) / 200) % 4) + 2;
	}

	animate(dtime, solids, mobs) {
		if (this.alert && this.alert.timeout && time > this.alert.timeout) this.alert = null;
		this.moveOn(dtime, solids, mobs);

		if (this.sprites.main.tile.x < 2) {
			if (time - this.peek_time.people > 0) {
				this.peek_time.people = time + 500 + Math.random() * 500;

				let away = true;
				for (let mob of mobs) {
					if (mob instanceof Human) {
						let h = this.getFeet();
						let m = mob.getFeet();
						let v = { x: m.x - h.x, y: m.y - h.y };
						let mag = Math.sqrt(v.x * v.x + v.y * v.y);

						if (mag < 32) {
							this.still_tile = 1;
							away = false;
							break;
						}
					}
				}

				if (away && time - this.peek_time.lonely > 0) {
					this.peek_time.lonely = time + Math.random() * 19000 + 1000;
					this.still_tile = this.still_tile ? 0 : 1;
				}
			}
		}

		if (this.health.val <= 0) this.die();
	}
}

class Tree extends Entity {
	constructor(pos, type = 0, variant = game.variant) {
		type = type ? type : Math.floor(Math.random() * 4) + 1;

		pos.x -= 62;
		pos.y -= 120;

		let hitboxes = {
			1: new Hitbox(63, 118, 5, 4, 70),
			2: new Hitbox(62, 118, 4, 3, 70),
			3: new Hitbox(62, 119, 3, 2, 70),
			4: new Hitbox(61, 118, 4, 3, 70)
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
		this.health = { val: 24, max: 24 };
		this.dead = false;
	}

	animate() {
		if (!this.dead) {
			if (time >= this.moveTime) {
				this.sprites.main.tile.x += 1;
				this.sprites.main.tile.x %= 4;

				this.moveTime = time + Math.random() * 1000 + 2000;
			}

			if (this.health.val <= 0) this.die();
		}
	}

	die() {
		this.dead = true;
		this.sprites.main.tile.y = 1;
		this.sprites.shadow.tile.y = 1;
		this.hitbox.h = 4;
		for (let i = 0; i < Math.random() * 4 + 6; i++)
			game.entities.particles.push(
				new Arrow(
					{ x: this.getFeet().x + (Math.random() - 0.5) * 24, y: this.getFeet().y + (Math.random() - 0.5) * 24, z: 8 + Math.random() * 32 },
					{ x: (Math.random() - 0.5) / 50, y: (Math.random() - 0.5) / 50, z: (Math.random() - 0.5) / 50 }
				)
			);
	}
}

class Fence extends Entity {
	constructor(pos, orient = 0, variant = game.variant) {
		super(
			pos,
			{
				main: new Sprite(game.images['fence' + variant], { x: 0, y: 0, w: 32, h: 32 }),
				red: new Sprite(game.images['fence-red'], { x: 0, y: 0, w: 32, h: 32 }),
				shadow: new Sprite(game.images['fence-shadow'], { x: 0, y: 0, w: 32, h: 32 })
			},
			orient ? new Hitbox(15, 11, 3, 18, 8) : new Hitbox(7, 19, 24, 2, 8),
			orient ? { x: 16, y: 28 } : { x: 19, y: 20 }
		);

		this.sprites.main.tile.x = orient;
		this.sprites.red.tile.x = orient;
		this.sprites.shadow.tile.x = orient;
		this.red = false;
	}

	setRed() {
		this.sprites.main = this.sprites.red;
		this.red = true;
	}
}

class House extends Entity {
	constructor(pos, type = 1, variant = game.variant) {
		let types = {
			1: { s: { x: 0, y: 0, w: 73, h: 49 }, h: new Hitbox(18, 26, 54, 22, 50), f: { x: 18, y: 48 } }
		};

		super(
			pos,
			{
				main: new Sprite(game.images['small-house' + type + game.variant], types[type].s),
				shadow: new Sprite(game.images['small-house' + type + '-shadow'], types[type].s)
			},

			types[type].h,
			types[type].f
		);
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
		this.stuck = false;
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

		if (this.color == 'wool') {
			let c = Math.random();
			let r = Math.floor(209 * c + 186 * (1 - c));
			let g = Math.floor(208 * c + 188 * (1 - c));
			let b = Math.floor(203 * c + 186 * (1 - c));
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
		this.stuck = this.pos.z < 0;
		if (!this.stuck) {
			for (let c of 'xyz') this.pos[c] += this.vel[c] * dtime * game.speed;
			this.vel.z -= (this.gravity * dtime * game.speed) / 10000;
		}

		if (this.timeout && this.time + this.timeout - time <= 0) this.dead = true;
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
				let color = this instanceof Arrow ? this.endPoint : this.color;
				if (color) game.entities.particles.push(new Particle(ex.tail, { x: 0, y: 0, z: 0 }, 1, Math.random() / 2 + 0.5, true, color, 0, -500));
			}

			this.onLevel();
		}
	}

	onContact(mob) {}

	onLevel() {}

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
	constructor(pos, vel, timeout = null, level = 0, damage = 1) {
		super(pos, vel, 8, 1, true, game.variant == 'night' ? '474544' : '#4e443a', 0.5, true, timeout, 0.0001);
		this.endPoint = [null, 'white', '#ccf', '#ccf'][level];
		this.victims = [];
		this.start_coords = { ...pos };
		this.level = level;
		this.damage = damage;
		this.hits = 0;
	}

	onContact(mob) {
		if ((mob.name == 'creature' || mob instanceof Sheep) && !this.victims.includes(mob)) {
			let arr_mag = this.getMag();
			this.victims.push(mob);
			this.hits++;
			if (!(mob instanceof Sheep)) {
				if (this.level > 2) mob.health.val = 0;
				else mob.health.val -= arr_mag * 20 * this.level * this.damage;

				if (!mob.target || !mob.target.obj) {
					mob.setAlert('exclam', 200);
					mob.target = {
						x: this.start_coords.x - 12 + (Math.random() - 0.5) * 48,
						y: this.start_coords.y - 24 + (Math.random() - 0.5) * 48,
						obj: null
					};
				}
			}

			let r = 0.07;

			for (let c of 'xyz') this.vel[c] *= 0.5;
			game.events.push(
				new TimeEvent(mob instanceof Sheep ? 100 : 0, event => {
					for (let i = 0; i < 50 * arr_mag; i++) {
						game.entities.particles.push(
							new Trail(
								{ ...this.pos },
								{
									x: this.vel.x + (Math.random() - 0.5) * r,
									y: this.vel.y + (Math.random() - 0.5) * r,
									z: this.vel.z + (Math.random() - 0.5) * r
								},
								1,
								1,
								true,
								mob instanceof Sheep ? 'wool' : 'blood',
								0.1,
								true,
								-1000,
								0.01
							)
						);
					}
				})
			);
		}
	}

	onLevel() {
		if (!this.stuck && game.player) {
			if (this.level == 2 && this.hits < 8) {
				if (game.touches.R) {
					let move = {
						x: game.touches.R.end.x - game.touches.R.prev.x,
						y: game.touches.R.end.y - game.touches.R.prev.y
					};

					this.vel.x = this.vel.x * 0.95 + game.player.move.x / 8000 + move.x / 1500;
					this.vel.y = this.vel.y * 0.95 + game.player.move.y / 8000 + move.y / 1500;
					this.vel.z = this.pos.z < 9 ? 0.001 : 0;
				}

				let h = this.get3DEx().head;
				this.victims = this.victims.filter(v => v.collidePoint(h.x, h.y, h.z));
			}

			if (this.level == 3 && this.victims.length < 6) {
				let best = null;
				for (let creature of game.entities.creatures.filter(mob => !this.victims.includes(mob))) {
					let d = {
						mob: creature,
						x: creature.getFeet().x - this.pos.x,
						y: creature.getFeet().y - this.pos.y
					};

					d.m = Math.sqrt(d.x * d.x + d.y * d.y);

					if (d.m < 64 && (!best || d.m < best.m)) best = d;
				}

				if (best) {
					this.vel.x = this.vel.x * 0.5 + best.x / best.m / 20;
					this.vel.y = this.vel.y * 0.5 + best.y / best.m / 20;
					this.vel.z = 0;
				}
			}
		} else if (this.level > 1 && game.player && this == game.player.arrow) {
			game.player.arrow = null;
			game.touches.R = null;
		}
	}
}

class Drop extends Particle {
	constructor(pos, type) {
		let vel = { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: Math.random() * 0.01 + 0.01 };
		let color = { mana: '#ccf', coin: '#fd8', rain: `rgba(240, 240, 255, 0.2)` }[type];

		super(pos, vel, 1, 1, true, color, 0.8);
		this.type = type;

		if (type == 'rain') {
			vel.z = -0.1;
			this.timeout = 1000;
			this.shadow = false;
		}
	}
}
