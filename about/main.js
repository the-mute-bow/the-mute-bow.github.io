let lang = getCookie('lang');

if (!location.hash) {
	if (lang) location.replace(lang);
	else location.replace('#en');
}

if (lang != location.hash) {
	setCookie('lang', location.hash);
	location.reload();
}

for (let text of document.querySelectorAll('.translate')) {
	text.innerHTML = text.innerHTML.split('|')[Math.floor(lang == '#fr')];
}

document.querySelector('#flag').href = lang == '#fr' ? '#en' : '#fr';
document.querySelector('#flag-img').src = `../pwa/img/buttons/${lang == '#fr' ? 'france' : 'usa'}-button.png`;
document.querySelector('#flag-shad').src = `../pwa/img/buttons/${lang == '#fr' ? 'france' : 'usa'}-button-shadow.png`;

for (let button of document.querySelectorAll('.button')) {
	button.addEventListener('click', event => {
		event.preventDefault();

		let ref = button.getAttribute('href');
		if (ref == '#fr' || ref == '#en') {
			location.replace(ref);
			location.reload();
		} else if (ref.includes('#')) document.querySelector(ref).scrollIntoView({ behavior: 'smooth' });
		else location.assign(ref);

		button.classList.add('pressed');
		setTimeout(() => button.classList.remove('pressed'), 1000);
	});
}

let quotes = {
	default:
		lang == '#fr'
			? `Il y a environ trois ans, des fermiers ont signalé qu'une partie de leur bétail avait été tué par une ou plusieurs bêtes mais impossible d'identifier l'espèce. Eliot, ses amis ainsi qu'un vétérinaire, sont allés voir sur place. Ils se sont réveillés dans un endroit étrange sans aucun souvenir.<br/><br/>Aujourd'hui, des fermiers de la région ont signalé la mort de leur bétail et Piet lui-même a perdu un de ses moutons cette nuit. Encore une fois, cela semble être la faute d'une bête inconnue. Ça ressemble beaucoup au scénario d'il y a trois ans, et cette fois, ils comptent bien découvrir ce qui s'est passé.<br/><br/><span style="opacity:0.5">Survole les personnages pour plus d'infos sur eux.</span>`
			: `About three years ago, farmers reported that part of their cattle had been killed by one or more animals but could not identify the species. Eliot, his friends and a veterinarian, went to see on the spot. They woke up in a strange place with no memory.<br/><br/>Nowadays, farmers in the area reported the deaths of their cattle and Piet himself lost one of his sheep that night. Again, this seems to be the fault of an unknown beast. It is similar to the scenario from three years ago, and this time, they intend to find out what happened.<br/><br/><span style="opacity:0.5">Hover over the characters for more information about them.</span>`,
	eliot:
		lang == '#fr'
			? `Eliot:<br/>Depuis les évènements d'il y a trois ans, Eliot n'entend plus et ne peut plus parler. Mais ses talents au maniment de l'arc, eux, n'ont pas dépéri. Au contraire, il s'est découvert des talent encore plus impressionnants que mystérieux.<br/><br/>Grâce à ce que Piet a nommé des perles de mana - des perles violettes trouvées dans les poches de nos amis après avoir repris conscience il y a trois ans - Eliot est capable de manier ses flèches dans les airs. Depuis, les gens de la région l'ont surnommé "l'arc muet".`
			: `Eliot:<br/>Since the events of three years ago, Eliot no longer hears and cannot speak. But his talents with the bow have not withered away. On the contrary, he discovered talents even more impressive and mysterious.<br/><br/>Thanks to what Piet called mana pearls - purple pearls found in our friends' pockets after regaining consciousness three years ago - Eliot is able to wield his arrows in the air. People of the region have since nicknamed him "the mute bow".`,
	shabyn:
		lang == '#fr'
			? `Shabyn:<br/>Originaire des antilles françaises, Shabyn est le boute-en-train du groupe. Son vrai nom est Sharyn mais quand ils se sont rencontrés pour la première fois il y a quinze ans, Piet a fait ce jeu de mot qui a eu le mérite de la faire pleurer de rire et est devenu son surnom. Il ne le sait pas, mais ce jour là, il a conquis sont coeur.<br/><br/>Elle a remarqué que Piet ne visait plus aussi bien qu'avant. Elle pense qu'il s'est passé quelque chose avec ses yeux il y a trois ans car leur couleur est plus claire.`
			: `Shabyn:<br/>Originally from the French West Indies, Shabyn is the teaser of the group. Her real name is Sharyn but when they first met fifteen years ago, Piet made this pun which had the merit of making her cry with laughter and became her nickname. He doesn't know it, but that day he won her heart.<br/><br/>She noticed that Piet wasn't aiming as well as before. She thinks something happened with his eyes three years ago because their color is lighter.`,
	piet:
		lang == '#fr'
			? `Piet:<br/>Meilleurs amis depuis l'enfance, Piet et Eliot ont grandi ensemble, jouant dans la forêt avec des arcs fabriqués à l'aide de bouts de bois et de leurs lacets. Piet regrette de ne plus pouvoir entendre la voix de son ami et compte bien découvrir ce qui s'est passé il y a trois ans.<br/><br/> En voyant les yeux blancs du cadavre de son mouton mort pendant la nuit, il a tout de suite fait le lien avec les évènements d'il y a trois ans et a contacté ses amis ainsi que sa cousine léa pour traquer le coupable.`
			: `Piet:<br/>Best friends since childhood, Piet and Eliot grew up together, playing in the forest with bows made with sticks and their laces. Piet regrets not being able to hear his friend's voice anymore and intends to find out what happened three years ago.<br/><br/>Seeing the white eyes of the corpse of his dead sheep during the night, he immediately made the connection with the events of three years ago and contacted his friends as well as his cousin Léa to track down the culprit.`,
	lea:
		lang == '#fr'
			? `Léa:<br/>La meilleure vétérinaire de la région. Face à la complexité de la situation, Piet a préféré la contacter pour les aider à identifier la bête qui dévore le bétail des fermiers. Ce qui lui semble le plus étrange, c'est la couleur des yeux des cadavres.<br/><br/>Piet lui a beaucoup vanté les talents d'Eliot avec un arc. En le voyant pour la première fois, elle était impressionnée. Piet ne l'avais pas vue sourire autant depuis lontemps.`
			: `Léa:<br/>The best veterinarian in the region. Faced with the complexity of the situation, Piet preferred to contact her to help them identify the beast that devours the farmers' cattle. What intrigues her the most is the eye color of the corpses.<br/><br/>Piet told her a lot about Eliot's talents with a bow. Seeing him for the first time, she was impressed. Piet hadn't seen her smile so much in a long time.`,
	sheep: lang == '#fr' ? `Mouton:<br/>Meh.` : `Sheep:<br/>Meh.`,
	creature: `¤ŽÅ °–£] =ÛYf mÛ2 ›6í …º[4¬ ÌÎí £ ¢òš fì 1Ôx 3ÝË cÂ ™ÕT4 d ê€)À È¾– Üc„° ”‰¨¯pÅb ÅØ<’ B¹$‚ uh¡_ý oæ C!ä šm¼ Õê AÈ:¸ ;c‚‚†8_äÉŠ s 5”)3 d «ów× ›X á T%ƒž¨/¦ AB<1 4H*ƒ(n R–b¯îÕ 5Í YÄ‘’2#% 4Y §AÅ ìŠWå|’<  …Çò# .ö/¥ ^K"zq ;ÿL ÷¦? Ðï ð2¿ ÿ ÿÿÿ ÿ], ‘ ì% €€= ñà¶T ¸¢ áe‹=Æ_ Ý6Kp»^3‚}›-°ù­xT ;ã0 ß¼ »‰Î Æ àÖ }…Îž žA Ë‰ ÛÃ û”. »ˆ« ã‹š âdY ‘û ,ª¡õj¯ÛSØ à9 ü£T g76 ÿûd‹ÐaVÛ b9â ëoa"Le Y¬,oÈ Ím tõ‰6«” ˜X fêU B† :åð Ã·: zd L8V Y(Û‰¸ @›{ ™âr– 9ÆÐ cíï Qž[[ as·Á)D 9 Ðý }_¿Á 1™Hp‘ #º œC] C– h£À$ ka°Â«l¸NÉ PWZ FÅÕ ±B< œ>_ûÙÓ Cè–žÉb µ¿?Ö# í8Í}W> ó4á ÁÆƒ .êEâ 1{TŸqx…$³Êz¤ ¶“%A…³t q4•`
};

for (let element of document.querySelectorAll('.hovering')) {
	element.addEventListener('mouseover', event => {
		document.querySelector('#background-about-strat-desk').classList.remove('transparent');
		document.querySelector('#background-about-strat-mobile').classList.remove('transparent');
		let id = element.getAttribute('id').split('-')[0];
		document.querySelector('#presentation').innerHTML = quotes[id];
	});

	element.addEventListener('mouseout', event => {
		document.querySelector('#background-about-strat-desk').classList.add('transparent');
		document.querySelector('#background-about-strat-mobile').classList.add('transparent');
		document.querySelector('#presentation').innerHTML = quotes.default;
	});
}

document.querySelector('#presentation').innerHTML = quotes.default;

window.onload = () => {
	setTimeout(() => {
		document.querySelector('#title').classList.remove('transparent');
	}, 1000);

	setTimeout(() => {
		document.querySelector('#play-btn').classList.remove('transparent');
	}, 2000);
};
