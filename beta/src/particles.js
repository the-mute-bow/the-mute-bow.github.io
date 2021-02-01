class Particle extends Entity {
	constructor(type = 'particle', pos, vel, acc, fric, color) {
		super(type, pos, vel, acc, fric);
		this.color = color;
	}

	draw(ctx, op = 1) {
		let pos = get2dPos(this.pos);
		ctx.globalAlpha = op;
		ctx.fillStyle = this.color;
		ctx.fillRect(pos.x, pos.y, 1, 1);
		ctx.globalAlpha = 1;
	}

	drawShadow(ctx) {
		let pos = get2dPos(this.pos, true);
		ctx.fillStyle = 'black';
		ctx.fillRect(pos.x, pos.y, 1, 1);
	}
}

class Floating extends Particle {
	constructor(type = 'floating', wind, pos, vel, forces, rand, time, color) {
		super(type, pos, vel, {}, { a: 0.01, g: 0.5 }, color);
		this.wind = wind;
		this.rand = rand;
		this.forces = { x: 0, y: 0, z: 0, ...forces };
		this.time = game.time + time + Math.random() * time;
	}

	behave() {
		let r = s => (Math.random() - 0.5) * s * 2;
		let n = this.wind.get(this.pos);

		this.acc = {
			x: -this.wind.vel.x * (n - 0.6) * 0.05 + r(this.rand) + this.forces.x,
			y: -this.wind.vel.y * (n - 0.6) * 0.05 + r(this.rand) + this.forces.y,
			z: (n - 0.6) * 0.5 * this.rand + r(this.rand) + this.forces.z
		};

		this.physics();

		if (game.time - this.time > 0 || this.pos.x < 0 || this.pos.x > mge.canvas.width || this.pos.y < 0 || this.pos.y > mge.canvas.height) this.die();
	}
}

class Leave extends Floating {
	constructor(pos, wind) {
		let r = s => (Math.random() - 0.5) * s * 2;

		pos = {
			x: pos.x + r(20),
			y: pos.y + r(20),
			z: 10 + Math.random() * 30
		};

		let vel = {
			x: -wind.vel.x / 5,
			y: -wind.vel.y / 5,
			z: r(10)
		};

		super('leave', wind, pos, vel, { z: -0.01 }, 10, 20000, game.toColorStr(game.leave_color));
	}
}

class Smoke extends Floating {
	constructor(pos, wind, rad = 2) {
		let r = s => (Math.random() - 0.5) * s * 2;

		pos.x += r(rad);
		pos.y += r(rad);
		pos.z += r(rad);

		let c = Math.floor(100 + Math.random() * 50);
		super('smoke', wind, pos, { z: 5 }, { z: 1 }, 10, 1000, `rgba(230, 230, 230, ${c})`);
	}
}

class Firefly extends Floating {
	constructor(pos, wind) {
		let r = s => (Math.random() - 0.5) * s * 2;

		pos = {
			x: pos.x + r(20),
			y: pos.y + r(20),
			z: 10 + Math.random() * 30
		};

		super('firefly', wind, pos, {}, {}, 30, 20000, '#ffeedd');
		this.glowing = { m: 8, r: 0, b: 0, t: 0 };
		this.glowing.canvas = document.createElement('canvas');
		this.glowing.canvas.width = this.glowing.m * 2;
		this.glowing.canvas.height = this.glowing.m * 2;
		this.glowing.ctx = this.glowing.canvas.getContext('2d');

		this.time = 0;
		this.dying = null;
	}

	behave() {
		let r = s => (Math.random() - 0.5) * s * 2;
		let n = this.wind.get(this.pos);

		if (game.time > this.time) {
			let rand = Math.random();
			this.time = game.time + rand * 200 + 200;

			if (this.dying) {
				this.glowing.t = 0;
			} else {
				let s = 5;
				let n2 = this.wind.get({
					x: this.pos.y * s,
					y: this.pos.x * s,
					z: this.pos.z * s
				});

				let nint = Math.floor((n2 - 0.5) * 2 * this.glowing.m);
				if (nint != this.glowing.t) this.glowing.t = nint;
			}

			let precision = 4;

			let last = Math.floor(this.glowing.r * precision);
			let ratio = 0.1;
			this.glowing.r = this.glowing.r * (1 - ratio) + this.glowing.t * ratio;
			this.glowing.b = this.glowing.r / this.glowing.m;

			if (Math.floor(this.glowing.r * precision) != last) this.render();

			if (this.dying && game.time > this.dying) this.dead = true;
		}

		this.acc = {
			x: -this.wind.vel.x * (n - 0.75) * 0.01 + r(this.rand) + this.forces.x,
			y: -this.wind.vel.y * (n - 0.75) * 0.01 + r(this.rand) + this.forces.y,
			z: (n - 0.8) * 0.05 * this.rand + r(this.rand) + this.forces.z
		};

		this.physics();

		if (game.time - this.time > 0 || this.pos.x < 0 || this.pos.x > mge.canvas.width || this.pos.y < 0 || this.pos.y > mge.canvas.height) this.die();
	}

	die() {
		this.dying = game.time + 7000 + 3000 * Math.random();
	}

	render() {
		// Clear
		this.glowing.ctx.globalAlpha = 1;
		this.glowing.ctx.clearRect(0, 0, this.glowing.m * 2, this.glowing.m * 2);

		// Draw
		this.glowing.ctx.globalAlpha = this.glowing.b;
		this.glowing.ctx.fillStyle = 'black';
		this.glowing.ctx.beginPath();
		let off = 0.5;
		this.glowing.ctx.arc(this.glowing.m + off, this.glowing.m + off, this.glowing.r, 0, 2 * Math.PI);
		this.glowing.ctx.fill();
	}
}
