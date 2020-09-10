const setCookie = (key, val) => {
	let d = new Date();
	d.setTime(d.getTime() + 2 * 360 * 24 * 60 * 60 * 1000);
	document.cookie = `${key}=${val};expires=${d.toUTCString()}`;
};

const getCookie = key => {
	for (let cookie of document.cookie.split('; ')) {
		let pair = cookie.split('=');
		if (pair[0] == key) return pair[1];
	}
	return '';
};

const remCookie = key => {
	document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;Secure';
};
