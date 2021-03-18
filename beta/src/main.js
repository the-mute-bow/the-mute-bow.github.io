class GameElement extends GameEngineElement {
	constructor() {
		super();

		this.params = new URLSearchParams(location.search);
		if (!this.params.has('scene')) location.search = 'scene=test';

		addEventListener('load', e => {
			let path = './scenes/' + this.params.get('scene');
			this.addScript(path + '/map.js');
			this.addScript(path + '/script.js');
		});
	}

	addScript(src) {
		let script = document.createElement('script');
		script.src = src;

		let err = src + ' does not exist.';
		script.addEventListener('error', e => console.error(err));

		document.body.appendChild(script);
	}
}

customElements.define('pwa-mge', GameElement);
