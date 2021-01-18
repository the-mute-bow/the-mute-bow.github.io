// 2D coords
const get2dPos = (pos, offx = false) => ({
	// ratio: (0.82, 0.57)

	x: Math.floor(pos.x - pos.z * (offx ? 0.82 : 0)),
	y: Math.floor(pos.y - pos.z * (offx ? 0.57 : 1))
});

class Entity {
	constructor(type = 'any', pos, vel, acc, fric, hitbox) {
		this.type = type;
		this.pos = { x: 0, y: 0, z: 0, ...pos };
		this.vel = { x: 0, y: 0, z: 0, ...vel };
		this.acc = { x: 0, y: 0, z: 0, ...acc };
		this.acc = { x: 0, y: 0, z: 0, ...acc };
		this.fric = { a: 0, g: 0, ...fric };
	}

	// Physics
	physics() {
		for (let c of 'xyz') {
			if (this.vel[c] || this.acc[c]) {
				let f = this.fric[this.pos.z < 0.5 ? 'g' : 'a'];
				let new_v = this.vel[c] + (this.acc[c] * delay) / 1000;
				this.vel[c] = new_v * between(0, 1 - f, 1);
				this.pos[c] += (this.vel[c] * delay) / 1000;
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
