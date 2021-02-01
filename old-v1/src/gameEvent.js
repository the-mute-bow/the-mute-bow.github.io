
class basicEvent {
	constructor(func) {
		this.func = func
	}

	update(game) {
		this.func(this, game);
	}

	draw(ctx, frame) {}
}


class timeEvent {
	constructor(t, func) {
		this.t = t;
		this.func = func;
	}
	
	update(game) {
		if (!this.t) { this.func(this, game); }
		this.t--;
	}
	
	draw(ctx, frame) {}
}


class walkEvent {
	constructor(x, y, r, func) {
		this.pos = {'x': x, 'y': y, 'r': r};
		this.func = func
	}

	update(game) {
		this.func(this, game);
	}

	draw(ctx, frame) {
		let i = 0;
		ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
		while (i < Math.PI*2) {
			let x = Math.floor(this.pos.x + Math.sin(i+frame/500)*this.pos.r);
			let y = Math.floor(this.pos.y + Math.cos(i+frame/500)*this.pos.r);
			ctx.fillRect(x, y, 1, 1);
			i += 6/this.pos.r;
		}
	}
}


class Dialog {
	constructor(character, message, end) {
		this.character = character;
		this.message = message;
		this.end = end;
	}
}