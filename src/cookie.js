const val = 10;

const setCookie = (key, val) => {
	document.cookie = `${key}=${val}`;
};

const getCookie = key => {
	for (let cookie of document.cookie.split('; ')) {
		let pair = cookie.split('=');
		if (pair[0] == key) return pair[1];
	}
	return '';
};

const remCookie = key => {
	document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
