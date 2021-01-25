// Create new button in given element
const createButton = (parent, id, options) => {
	options = {
		width: 36,
		height: 12,
		left: '0px',
		right: '0px',
		scale: 1,
		align_h: 'center',
		align_v: 'center',
		mode: 'normal',
		text: '',
		text_color: '#202124',
		bg_color: '#cdcad3',
		img: null,
		onclick: event => {},
		...options
	};

	let selector = 'a#' + id + '.btn';

	// Element
	let btn = document.createElement('a');
	btn.setAttribute('id', id);
	btn.classList.add('btn');
	btn.scale = options.scale;
	parent.appendChild(btn);

	// Image
	let can = document.createElement('canvas');

	if (options.img) {
		can.width = options.img.width;
		can.height = options.img.height;
		setTimeout(() => {
			let ctx = document.querySelector(selector + ' canvas').getContext('2d');
			ctx.drawImage(options.img, 0, 0);
		}, 1);
	} else {
		can.width = options.width;
		can.height = options.height;
		setTimeout(() => {
			let ctx = document.querySelector(selector + ' canvas').getContext('2d');
			ctx.fillStyle = options.bg_color;
			ctx.fillRect(0, 0, can.width, can.height);
			ctx.clearRect(0, 0, 1, 1);
			ctx.clearRect(can.width - 1, 0, 1, 1);
			ctx.clearRect(can.width - 1, can.height - 1, 1, 1);
			ctx.clearRect(0, can.height - 1, 1, 1);
		}, 1);
	}

	can.style.width = '100%';
	can.style.height = '100%';
	btn.appendChild(can);

	// Style
	btn.style.width = can.width * options.scale + 'px';
	btn.style.height = can.height * options.scale + 'px';
	btn.style.left = options.left;
	btn.style.top = options.top;

	let x = 0;
	if (options.align_v == 'center') x = 50;
	if (options.align_v == 'right') x = 100;

	let y = 0;
	if (options.align_h == 'center') y = 50;
	if (options.align_h == 'bottom') y = 100;
	btn.style.transform = 'translate(-' + x + '%, -' + y + '%)';

	// Text
	if (options.text) {
		let text = document.createElement('p');
		text.innerHTML = options.text;
		text.style.color = options.text_color;
		text.style.fontSize = options.scale * 12.5 + 'px';
		text.classList.add('translate');
		btn.appendChild(text);
		translate();
	}

	// click
	btn.ontouchstart = event => {
		if (btn.classList.contains('normal')) {
			setButton(id, 'pressed');
			options.onclick(event);
		}
	};

	// Init
	setButton(id, 'pressed');
	if (options.mode == 'normal') setTimeout(event => setButton(id, 'normal'), 1);

	return btn;
};

const setButton = (id, mode) => {
	let selector = 'a#' + id + '.btn';
	let btn = document.querySelector(selector);
	let can = document.querySelector(selector + ' canvas');
	let p = document.querySelector(selector + ' p');

	// Normal
	if (mode == 'normal') {
		btn.classList.remove('pressed');
		btn.classList.add('normal');

		for (let e of [btn, can, p]) e.style.transition = 'all 0.3s';

		btn.style.opacity = 1;
		btn.style.filter = 'drop-shadow(0px ' + btn.scale + 'px 0px #00000055)';

		can.style.transform = 'translateY(0px)';

		p.style.transform = 'translateY(-' + btn.scale * 0.6 + 'px)';
	}

	// Pressed
	if (mode == 'pressed') {
		btn.classList.remove('normal');
		btn.classList.add('pressed');

		for (let e of [btn, can, p]) e.style.transition = 'all 0.03s';

		btn.style.opacity = 0.5;
		btn.style.filter = 'drop-shadow(0px 0px 0px #00000055)';

		can.style.transform = 'translateY(' + btn.scale + 'px)';

		p.style.transform = 'translateY(' + btn.scale * 0.4 + 'px)';
	}
};
