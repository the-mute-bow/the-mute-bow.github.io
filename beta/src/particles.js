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

class Leave extends Particle {
	constructor(pos, wind) {
		let r = s => (Math.random() - 0.5) * s * 2;

		pos = {
			x: pos.x + r(20),
			y: pos.y + r(20),
			z: 20 + Math.random() * 40
		};

		let vel = {
			x: -wind.vel.x / 5,
			y: -wind.vel.y / 5,
			z: r(10)
		};

		super('leave', pos, vel, { z: -0.01 }, { a: 0.01, g: 0.5 }, '#324333');
		this.wind = wind;
		this.time = game.time + 20000 + Math.random() * 20000;
	}

	behave() {
		let r = s => (Math.random() - 0.5) * s * 2;
		let n = this.wind.get(this.pos);

		this.acc = {
			x: -this.wind.vel.x * (n - 0.7) * 0.1 + r(10),
			y: -this.wind.vel.y * (n - 0.7) * 0.1 + r(10),
			z: (n - 0.75) * 10 + r(10)
		};

		this.physics();

		if (game.time - this.time > 0 || this.pos.x < 0 || this.pos.x > mge.canvas.width || this.pos.y < 0 || this.pos.y > mge.canvas.height) this.die();
	}
}
