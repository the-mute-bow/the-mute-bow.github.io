function Sprite(img, tile_w, tile_h) {
	this.img = game.img[img];
	this.tile = { x: x, y: y };

	if (!this.img) {
		showError('Sprite error: No "' + img + '" in game.img.');
		return;
	}

	this.draw = (cx, cy, tx, ty, op) => {
		mge.ctx.drawImage(this.img);
	};
}

class Entity {
	constructor(type, pos, vel, acc) {
		this.type = type;
		this.pos = { x: 0, y: 0, z: 0, ...pos };
		this.vel = { x: 0, y: 0, z: 0, ...vel };
		this.acc = { x: 0, y: 0, z: 0, r: 0, ...acc };
	}

	// Physics
	physics() {
		for (let c of 'xyz') {
			this.vel[c] = (this.vel[c] + this.acc[c]) * between(0, 1 - this.acc.r, 1) * delay;
			this.pos[c] += this.vel[c] * delay;
		}

		if (this.pos.z < 0) {
			this.pos.z = 0;
			this.vel.z = 0;
		}
	}

	// Behavior
	behave() {
		this.physics();
	}

	// To draw on canvas
	draw() {}

	// Shadow drawing
	drawShadow() {}
}
