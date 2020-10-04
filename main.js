let lang = getCookie('lang');

if (!location.hash) {
	if (lang) location.replace(lang);
	else location.replace('#en');
}

if (lang != location.hash) {
	setCookie('lang', location.hash);
	location.reload();
}

const show = () => {
	document.querySelector('main').classList.remove('hidden');
	document.querySelector('#load').classList.add('hidden');
};

for (let text of document.querySelectorAll('.translate')) {
	text.innerHTML = text.innerHTML.split('|')[Math.floor(lang == '#fr')];
}

document.querySelector('#flag').href = lang == '#fr' ? '#en' : '#fr';
document.querySelector('#flag-img').src = `./pwa/img/buttons/${lang == '#fr' ? 'france' : 'usa'}-button.png`;
document.querySelector('#flag-shad').src = `./pwa/img/buttons/${lang == '#fr' ? 'france' : 'usa'}-button-shadow.png`;

let imgs = document.querySelectorAll('img');
let imgs_len = imgs.length;

setTimeout(() => show(), 1000);

for (img of imgs) {
	img.addEventListener('load', event => {
		imgs_len--;
		if (!imgs_len) show();
	});
}

for (let button of document.querySelectorAll('.button')) {
	button.addEventListener('click', event => {
		event.preventDefault();

		let ref = button.getAttribute('href');
		if (ref == '#fr' || ref == '#en') {
			location.replace(ref);
			location.reload();
		} else if (ref.includes('#')) document.querySelector(ref).scrollIntoView({ behavior: 'smooth' });
		else location.replace(ref);

		button.classList.add('pressed');
		setTimeout(() => button.classList.remove('pressed'), 1000);
	});
}

let quotes = {
	default:
		lang == '#fr'
			? `Il y a environ trois ans, des fermiers ont signalé du bétail dévoré par une bête étrange dificile à identifier. Eliot, ses amis ainsi qu'un vétérinaire, sont allés voir sur place. Ils se sont réveillés dans un endroit étrange sans aucun souvenir. Aujourd'hui, des fermiers de la région ont signalé la mort de leur bétail et Piet lui-même a perdu un de ses moutons cette nuit. Encore une fois, cela semble être la faute d'une bête inconnue. Cela ressemble beaucoup au scénario d'il y a trois ans, et cette fois, ils comptent bien découvrir ce qui s'est passé.`
			: `About three years ago, farmers reported cattle being eaten by a strange beast that is difficult to identify. Eliot, his friends and a veterinarian, went to see on the spot. They woke up in a strange place with no memory. Nowadays, farmers in the area reported the deaths of their cattle and Piet himself lost one of his sheep that night. Again, this seems to be the fault of an unknown beast. It is similar to the scenario from three years ago, and this time, they intend to find out what happened.`,
	Eliot:
		lang == '#fr'
			? `Depuis les évènements d'il y a trois ans, Eliot n'entend plus et ne peut plus parler. Mais ses talents au maniment de l'arc, eux, n'ont pas dépéri. Au contraire, il s'est découvert des talent encore plus impressionnants que mystérieux. Grâce à ce que Piet a nommé des perles de mana - des perles violettes trouvées dans les poches de nos amis après avoir repris conscience il y a trois ans - Eliot est capable de manier ses flèches dans les airs. Depuis, les gens de la région l'ont surnommé "l'arc muet".`
			: `Since the events of three years ago, Eliot no longer hears and cannot speak. But his talents with the bow have not withered away. On the contrary, he discovered talents even more impressive and mysterious. Thanks to what Piet called mana pearls - purple pearls found in our friends' pockets after regaining consciousness three years ago - Eliot is able to wield his arrows in the air. People of the region have since nicknamed him "the mute bow".`,
	Shabyn:
		lang == '#fr'
			? `Originaire des antilles françaises, Shabyn est le boute-en-train du groupe. Son vrai nom est Sharyn mais quand ils se sont rencontrés pour la première fois il y a 15 ans, Piet a fait ce jeu de mot qui a eu le mérite de la faire pleurer de rire et est devenu son surnom. Il ne le sait pas, mais ce jour là, il a conquis sont coeur.`
			: `Originally from the French West Indies, Shabyn is the teaser of the group. Her real name is Sharyn but when they first met 15 years ago, Piet made this pun which had the merit of making her cry with laughter and became her nickname. He doesn't know it, but that day he won her heart.`
};

for (let element of document.querySelectorAll('.hovering')) {
	element.addEventListener('mouseover', event => {
		document.querySelector('#background-bottom-strat-desk').classList.remove('transparent');
	});

	element.addEventListener('mouseout', event => {
		document.querySelector('#background-bottom-strat-desk').classList.add('transparent');
	});
}
