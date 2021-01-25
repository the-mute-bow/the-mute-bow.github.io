class GameEvent {
	constructor(callback = event => {}) {
		this.callback = callback;
		this.done = false;
	}

	tick() {
		this.callback(this);
	}

	draw(ctx) {}
}

class TimeEvent extends GameEvent {
	constructor(timeout, callback = event => {}) {
		super(callback);
		this.timeout = time + timeout;
	}

	tick() {
		if (time >= this.timeout) {
			this.callback(this);
			this.done = true;
		}
	}
}

class WalkEvent extends GameEvent {
	constructor(x, y, r, rs, mobs, trigger = 'any', mode = 'in', color = null, callback = event => {}) {
		super(callback);
		this.pos = { x: x, y: y, r: r };
		this.rs = rs;
		this.mobs = mobs;
		this.trigger = trigger;
		this.mode = mode;
		this.color = color;
	}

	tick() {
		let good = this.trigger == 'all';

		for (let mob of this.mobs) {
			let d = {
				x: mob.getFeet().x - this.pos.x,
				y: mob.getFeet().y - this.pos.y
			};

			if (Math.abs(d.x) < this.pos.r * this.rs && Math.abs(d.y) < this.pos.r * this.rs && Math.sqrt(d.x * d.x + d.y * d.y) < this.pos.r * this.rs) {
				if (this.mode == 'in' && this.trigger == 'any') {
					good = true;
					break;
				}

				if (this.mode == 'out' && this.trigger == 'all') {
					good = false;
					break;
				}
			} else {
				if (this.mode == 'out' && this.trigger == 'any') {
					good = true;
					break;
				}

				if (this.mode == 'in' && this.trigger == 'all') {
					good = false;
					break;
				}
			}
		}

		if (good) {
			this.done = true;
			this.callback(this);
		}
	}

	draw(ctx) {
		if (this.color) {
			ctx.fillStyle = this.color;
			ctx.globalAlpha = 0.5;

			let { x, y, r } = this.pos;
			for (let i = 0; i < r; i++) {
				let a = (i / r) * Math.PI * 2 + time / 10000;
				let px = Math.floor(x + Math.cos(a) * r);
				let py = Math.floor(y + Math.sin(a) * r);
				ctx.fillRect(px, py, 1, 1);
			}

			ctx.globalAlpha = 1;
		}
	}
}
