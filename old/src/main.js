var images = [];
var frame = 0;
var game;

var rotate_div = document.getElementById('rotate_screen');
var loading_div = document.getElementById('loading_screen');
var touch_div = document.getElementById('touch_screen');

var scan = document.querySelector('canvas');

function toggle(div, mode = null) {
	if (mode == 'on') {
		div.classList.remove('hide');
		div.classList.add('show');
	} else if (mode == 'off') {
		div.classList.remove('show');
		div.classList.add('hide');
	} else {
		div.classList.toggle('show');
		div.classList.toggle('hide');
	}
}

function toggled(div) {
	return div.classList[1] == 'show';
}

function loadImages(input, output, index, path, remove_path, end_func) {
	let src = path + input[index];

	console.log(`${index + 1}/${input.length}: loading`, src);

	let img = new Image();
	img.src = src;

	img.addEventListener('load', event => {
		if (remove_path) {
			src = src.split('/')[src.split('/').length - 1];
		}
		key = src.split('.')[0];
		output[key] = img;

		if (index + 1 < input.length) {
			loadImages(input, output, index + 1, path, remove_path, end_func);
		} else {
			console.log(output);
			end_func();
		}
	});
}

function mainLoop() {
	toggle(rotate_div, 'off');
	toggle(touch_div, 'off');
	toggle(scan, 'off');

	if (!toggled(loading_div)) {
		if (screen.width < screen.height) {
			toggle(rotate_div, 'on');
		} else if (/Android/i.test(navigator.userAgent) && !document.fullscreenElement) {
			// } else if (!document.fullscreenElement) {
			toggle(touch_div, 'on');
			scan.requestFullscreen();
		} else {
			frame++;
			toggle(scan, 'on');
			game.tick(frame);
		}
	}

	window.requestAnimationFrame(mainLoop);
}

window.onload = () => {
	console.log('loaded');
	toggle(loading_div, 'on');
	game = new Game();
	mainLoop();
};
