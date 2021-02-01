// Create new button in given element
const createButton = (parent_id, btn_id, options) => {
	options = {
		width: 36,
		height: 12,
		scale: 1,
		align_h: 'center',
		align_v: 'center',
		margin: '0px 0px',
		mode: 'normal',
		text: '',
		text_color: '#202124',
		bg_color: '#cdcad3',
		fade: true,
		temp: true,
		img: null,
		onclick: event => {},
		...options
	};

	let selector = 'a#' + btn_id + '.btn';

	// Element
	let btn = document.createElement('a');
	btn.setAttribute('id', btn_id);
	btn.classList.add('btn');
	if (options.temp) btn.classList.add('temp');
	btn.scale = options.scale;
	btn.fade = options.fade;
	document.querySelector('#' + parent_id).appendChild(btn);

	// Image
	let can = document.createElement('canvas');
	let shad = document.createElement('canvas');

	can.setAttribute('id', 'main');
	shad.setAttribute('id', 'shad');

	can.width = options.width;
	can.height = options.height;
	setTimeout(() => {
		// Background
		let ctx = document.querySelector(selector + ' canvas#main').getContext('2d');
		ctx.fillStyle = options.bg_color;
		ctx.fillRect(0, 0, can.width, can.height);

		// Corners
		ctx.clearRect(0, 0, 1, 1);
		ctx.clearRect(can.width - 1, 0, 1, 1);
		ctx.clearRect(can.width - 1, can.height - 1, 1, 1);
		ctx.clearRect(0, can.height - 1, 1, 1);

		// image
		if (options.img) ctx.drawImage(options.img, 0, 0);
	}, 1);

	can.style.width = '100%';
	can.style.height = '100%';

	// Shadow
	shad.width = can.width;
	shad.height = can.height;

	setTimeout(() => {
		let ctx = document.querySelector(selector + ' canvas#shad').getContext('2d');
		ctx.drawImage(document.querySelector(selector + ' canvas#main'), 0, 0);
		ctx.fillStyle = '#00000055';
		ctx.globalCompositeOperation = 'source-in';
		ctx.fillRect(0, 0, can.width, can.height);
	}, 2);

	shad.style.width = '100%';
	shad.style.height = '100%';
	shad.style.transform = 'translateY(' + btn.scale + 'px)';

	// Append can and shad
	btn.appendChild(shad);
	btn.appendChild(can);

	// Style
	btn.style.width = can.width * options.scale + 'px';
	btn.style.height = can.height * options.scale + 'px';

	if (options.left) btn.style.left = options.left;
	if (options.top) btn.style.top = options.top;

	btn.style.margin = options.margin;

	let x = 0;
	if (options.align_h == 'center') x = 50;
	if (options.align_h == 'right') x = 100;

	let y = 0;
	if (options.align_v == 'center') y = 50;
	if (options.align_v == 'bottom') y = 100;
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
			setButton(btn_id, 'pressed');
			options.onclick(event);
		}
	};

	// Init
	setButton(btn_id, 'normal');

	return btn;
};

// Set button state
const setButton = (id, mode) => {
	let selector = 'a#' + id + '.btn';
	let btn = document.querySelector(selector);
	let can = document.querySelector(selector + ' canvas#main');
	let p = document.querySelector(selector + ' p');

	// Normal
	if (mode == 'normal') {
		btn.classList.remove('pressed');
		btn.classList.add('normal');

		btn.classList.remove('fadeout');
		if (btn.fade) btn.classList.add('fadein');

		can.style.transform = 'none';
		if (p) p.style.transform = 'translateY(-' + btn.scale * 0.6 + 'px)';
	}

	// Pressed
	if (mode == 'pressed') {
		btn.classList.remove('normal');
		btn.classList.add('pressed');

		btn.classList.remove('fadeout');
		if (btn.fade) btn.classList.add('fadein');

		can.style.transform = 'translateY(' + btn.scale + 'px)';
		if (p) p.style.transform = 'translateY(' + btn.scale * 0.4 + 'px)';
	}

	if (mode == 'dead') {
		btn.classList.remove('fadein');
		if (btn.fade) {
			btn.classList.add('fadeout');
			setTimeout(() => {
				btn.parentElement.removeChild(btn);
			}, 500);
		} else btn.parentElement.removeChild(btn);
	}
};

// Kill all temp buttons in a given section
const killTempBtns = section_id => {
	for (let btn of document.querySelectorAll('section#' + section_id + ' a.btn.temp')) {
		setButton(btn.id, 'dead');
	}
};

// Pause button
const showPauseBtn = () => {
	if (!document.querySelector('section#blank a#pause.btn')) {
		createButton('blank', 'pause', {
			width: 8,
			height: 8,
			left: 100 + 'vw',
			align_h: 'right',
			align_v: 'top',
			margin: '5vh -5vh',
			bg_color: '#20212400',
			temp: false,
			img: game.imgs['pause-button'],
			scale: mge.elem.clientHeight / 100,
			onclick: event => game.setTimeout('pause-btn-dying', 1000, event => setButton('pause', 'dead'))
		});
	}
};

// Show language buttons
const showLangBtns = () => {
	let loaded = id => {
		if (id == 'fr') loaded_fr = true;
		if (id == 'en') loaded_en = true;

		if (loaded_en && loaded_fr) {
			createButton('menu', 'french', {
				width: 12,
				height: 7,
				left: 40 + 'vw',
				top: 50 + 'vh',
				img: fr_img,
				bg_color: '#20212400',
				scale: 8,
				onclick: event => {
					setCookie('lang', 'fr');
					setTimeout(() => killTempBtns('menu'), 200);
					setTimeout(() => loadScene(), 400);
				}
			});

			createButton('menu', 'english', {
				width: 12,
				height: 7,
				left: 60 + 'vw',
				top: 50 + 'vh',
				img: en_img,
				bg_color: '#20212400',
				scale: 8,
				onclick: event => {
					setCookie('lang', 'en');
					setTimeout(() => killTempBtns('menu'), 200);
					setTimeout(() => loadScene(), 400);
				}
			});
		}
	};

	// FR
	let fr_img = new Image();
	let loaded_fr = false;
	fr_img.src = './img/buttons/france-button.png';
	fr_img.addEventListener('load', event => loaded('fr'));

	// EN
	let en_img = new Image();
	let loaded_en = false;
	en_img.src = './img/buttons/usa-button.png';
	en_img.addEventListener('load', event => loaded('en'));
};
