const initTouch = () => {
	can.addEventListener('touchstart', event => {
		event.preventDefault();
		for (let t of event.changedTouches) {
			let touch = {
				time: time,
				id: t.identifier,
				start: { x: t.clientX * dpi, y: t.clientY * dpi },
				end: { x: t.clientX * dpi, y: t.clientY * dpi },
				prev: { x: t.clientX * dpi, y: t.clientY * dpi }
			};

			if (can.width / 40 < touch.start.x && touch.start.x < (can.width / 40) * 39 && can.height / 20 < touch.start.y) {
				if (getTouchSide(touch) == 'L') game.touches.L = touch;
				else game.touches.R = touch;
			}
		}
	});

	can.addEventListener('touchmove', event => {
		event.preventDefault();
		for (let t of event.changedTouches) {
			for (let touch of [game.touches.L, game.touches.R]) {
				if (touch && touch.id == t.identifier) {
					touch.prev = { ...touch.end };
					touch.end = { x: t.clientX * dpi, y: t.clientY * dpi };

					let move = getTouchMove(touch);

					if (game.getButton('bow') && !game.getButton('bow').die_time && (move.mag > 0.2 || move.duration > 200)) {
						for (let id of ['bow', 'axe', 'fence', 'none']) game.getButton(id).die_time = time + 100;
					}

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
			for (let sides of [
				{ a: 'L', b: 'R' },
				{ a: 'R', b: 'L' }
			]) {
				if (game.touches[sides.a] && game.touches[sides.a].id == t.identifier) {
					let move = getTouchMove(game.touches[sides.a]);

					if (move.mag > 0.2) game.touch_events.push({ ...game.touches[sides.a], ...move, type: 'drag' });
					else if (move.duration < 200) {
						let special = false;

						if (game.touches[sides.b]) {
							let moveb = getTouchMove(game.touches[sides.b]);
							if (moveb.mag > 0.2) {
								game.touch_events.push({ ...game.touches[sides.b], ...moveb, type: 'special' });
								special = true;
							}
						}

						if (!special) game.touch_events.push({ ...game.touches[sides.a], ...move, type: 'tap' });
					}

					game.touches[sides.a] = null;
				}
			}
		}
	});
};

const getTouchSide = touch => (touch.start.x < can.width / 2 ? 'L' : 'R');

const getTouchMove = touch => {
	let x = (touch.end.x - touch.start.x) / game.touches.rout;
	let y = (touch.end.y - touch.start.y) / game.touches.rout;
	return { x: x, y: y, mag: Math.sqrt(x * x + y * y), duration: time - touch.time, side: getTouchSide(touch) };
};
