function setFingers(UIelement, finger_list, event_list, scale) {
	UIelement.addEventListener('touchstart', event => {
		event.preventDefault();
		for (let i = 0; i < event.changedTouches.length; i++) {
			let t = event.changedTouches[i];

			let x = t.clientX * scale,
				y = t.clientY * scale;
			finger_list[t.identifier] = new Finger(x, y, x < UIelement.width / 2 ? 'L' : 'R', scale);
		}
	});

	UIelement.addEventListener('touchmove', event => {
		event.preventDefault();
		for (let i = 0; i < event.changedTouches.length; i++) {
			let t = event.changedTouches[i];
			let f = finger_list[t.identifier];

			if (f) {
				f.moveTo(t.clientX * scale, t.clientY * scale);
			}
		}
	});

	UIelement.addEventListener('touchend', event => {
		event.preventDefault();
		for (let i = 0; i < event.changedTouches.length; i++) {
			let t = event.changedTouches[i];
			let f = finger_list[t.identifier];

			if (f) {
				event_list.push({ type: f.getDist() < 10 ? 'tap' : 'drag_end', finger: f });
				finger_list.splice(t.identifier, 1);
			}
		}
		finger_list.length = event.touches.length;
	});
}

class Finger {
	constructor(x, y, side, scale) {
		this.start = { x: x, y: y };
		this.end = { x: x, y: y };
		this.side = side;
		this.size = { in: 20 * scale, out: 50 * scale };
	}

	getVec() {
		return { x: this.end.x - this.start.x, y: this.end.y - this.start.y };
	}

	getDist() {
		let v = this.getVec();
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}

	moveTo(x, y) {
		this.end.x = x;
		this.end.y = y;

		let v = this.getVec();
		let d = this.getDist();

		if (d > this.size.out) {
			this.start.x = this.end.x - (v.x / d) * this.size.out;
			this.start.y = this.end.y - (v.y / d) * this.size.out;
		}
	}

	draw(ctx, color) {
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = 4;

		ctx.beginPath();
		ctx.arc(this.start.x, this.start.y, this.size.out, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(this.end.x, this.end.y, this.size.in, 0, 2 * Math.PI);
		ctx.fill();
	}
}

class Button {
	constructor(x, y, main_image, pressed_image, callBack) {
		this.mimg = main_image;
		this.pimg = pressed_image;
		this.img = this.mimg;

		this.x = x;
		this.y = y;

		this.callBack = callBack;
	}

	click(game, x, y, scale, can) {
		let { bx, by, bw, bh } = this.getCoords(can.width, can.height, scale);
		if (bx < x && x < bx + bw && by < y && y < by + bh) {
			this.img = this.pimg;
			setTimeout(() => this.callBack(game), 200);
		}
	}

	display(ctx, scale) {
		let { bx, by, bw, bh } = this.getCoords(ctx.canvas.width, ctx.canvas.height, scale);
		ctx.drawImage(this.img, bx, by, bw, bh);
	}

	getCoords(w, h, scale) {
		let bw = Math.floor(this.img.width * scale);
		let bh = Math.floor(this.img.height * scale);
		let bx = Math.floor(this.x * scale + w / 2) - bw / 2;
		let by = Math.floor(this.y * scale + h / 2) - bh / 2;
		return { bx: bx, by: by, bw: bw, bh: bh };
	}
}
