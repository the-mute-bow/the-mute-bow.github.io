class Particle extends Entity {
	constructor(type, pos, vel, color) {
		super(type, pos, vel);
		this.color = color;
	}

	draw() {
		mge.ctx.fillStyle = this.color;
		mge.fillRect(this.pos.x - this.pos.z, this.pos.y, 1, 1);
	}
}
