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

		super('leave', wind, pos, vel, { z: -0.01 }, 10, 20000, game.leave_color);
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
