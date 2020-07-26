class GameEvent {
	constructor(callback = event => {}) {
		this.callback = callback;
		this.done = false;
	}

	tick() {}
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
