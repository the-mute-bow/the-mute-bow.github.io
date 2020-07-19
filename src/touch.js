const initTouch = events => {
	can.addEventListener('touchstart', event => {
		event.preventDefault();
		for (let t of event.changedTouches) {
			let touch = {
				frame: frame,
				id: t.identifier,
				start: { x: t.clientX * dpi, y: t.clientY * dpi },
				end: { x: t.clientX * dpi, y: t.clientY * dpi }
			};
			if (getTouchSide(touch) == 'L') game.touches.L = touch;
			else game.touches.R = touch;
		}
		console.log(game.touches);
	});

	can.addEventListener('touchmove', event => {
		event.preventDefault();
		for (let t of event.changedTouches) {
			for (let touch of [game.touches.L, game.touches.R]) {
				if (touch && touch.id == t.identifier) {
					touch.end = { x: t.clientX * dpi, y: t.clientY * dpi };
					let move = getTouchMove(touch);
					if (move.mag > 1) {
						touch.start.x = touch.end.x - (move.x * game.touches.rout) / move.mag;
						touch.start.y = touch.end.y - (move.y * game.touches.rout) / move.mag;
					}
				}
			}
		}
		// console.log(game.touches);
	});

	can.addEventListener('touchend', event => {
		event.preventDefault();
		for (let t of event.changedTouches) {
			for (let side of ['L', 'R']) {
				if (game.touches[side] && game.touches[side].id == t.identifier) {
					let move = getTouchMove(game.touches[side]);

					if (move.mag > 0.2) {
						events.push({ ...move, type: 'drag' });
					} else if (move.frames < 30) {
						events.push({ ...move, type: 'tap' });
					}

					game.touches[side] = null;
				}
			}
		}
	});
};

const getTouchSide = touch => (touch.start.x < can.width / 2 ? 'L' : 'R');

const getTouchMove = touch => {
	let x = (touch.end.x - touch.start.x) / game.touches.rout;
	let y = (touch.end.y - touch.start.y) / game.touches.rout;
	return { x: x, y: y, mag: Math.sqrt(x * x + y * y), frames: frame - touch.frame, side: getTouchSide(touch) };
};
