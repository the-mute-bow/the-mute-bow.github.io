// 2D coords
const get2dPos = (pos, offx = false) => ({
	// ratio: (0.82, 0.57)

	x: Math.floor(pos.x - pos.z * (offx ? 0.82 : 0)),
	y: Math.floor(pos.y - pos.z * (offx ? 0.57 : 1))
});

class Entity {
	constructor(type = 'any', pos, vel, acc, fric, glowing = null) {
		this.type = type;
		this.pos = { x: 0, y: 0, z: 0, ...pos };
		this.vel = { x: 0, y: 0, z: 0, ...vel };
		this.acc = { x: 0, y: 0, z: 0, ...acc };
		this.fric = { a: 0, g: 0, ...fric };
		this.glowing = glowing;
		this.dead = false;
	}

	die() {
		this.dead = true;
	}

	// Physics
	physics() {
		for (let c of 'xyz') {
			if (this.vel[c] || this.acc[c]) {
				let f = this.fric[this.pos.z < 0.5 ? 'g' : 'a'];
				let new_v = this.vel[c] + this.acc[c] / 10;
				this.vel[c] = new_v * between(0, 1 - f, 1);
				this.pos[c] += (this.vel[c] * game.delay) / 1000;
			}
		}

		if (this.pos.z < 0) this.pos.z = 0;
	}

	// Behavior
	behave() {
		this.physics();
	}

	// Rendering before drawing
	render() {}

	// To draw on canvas
	draw(ctx, op = 1) {}

	// Shadow drawing
	drawShadow(ctx) {}
}

noise.seed(Math.random());
class Wind extends Entity {
	constructor(acc, min = 0, max = 1, scale = 500) {
		super('wind', {}, {}, acc, { a: 0.01 });
		this.min = min;
		this.max = max;
		this.scale = scale;
	}

	get(pos, offz = 0) {
		if (!game.wind_allowed) return 0.5;

		let x = (pos.x + this.pos.x) / this.scale;
		let y = (pos.y + this.pos.y) / this.scale;
		let z = (pos.z + this.pos.z + offz) / this.scale;
		let n = (noise.simplex3(x, y, z) + 1) / 2;
		return this.min + (this.max - this.min) * (1 - n);
	}
}
