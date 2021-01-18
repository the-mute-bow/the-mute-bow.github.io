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
