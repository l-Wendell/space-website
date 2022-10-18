import anime from '/node_modules/animejs/lib/anime.es.js';
import { getHTML, getData } from './defautFuntions.js';

const buttons = getHTML.getAll('.button');
const carouselButtons = getHTML.get('.carouselButtons');
const crewTextDiv = getHTML.get('.crewTextDiv');
const personImage = getHTML.get('.personImage');

const addAnimation = (value1, value2) => {
	return anime
		.timeline({ easing: 'easeInOutQuad', duration: 750 })
		.add({
			targets: personImage,
			top: value1,
		})
		.add(
			{
				targets: crewTextDiv,
				top: value2,
			},
			100
		);
};

const turnActive = nameButton => {
	const [actualButton] = buttons.filter(button => button.name === nameButton);

	buttons.forEach(button => {
		if (actualButton !== button) {
			button.classList.remove('actualButton');
		}
	});

	actualButton.classList.add('actualButton');
};

const attInfos = async target => {
	const endPoint = target.getAttribute('endPoint');
	const id = +target.value;
	const { bio, images, name, role } = await getData(endPoint, id);

	const roleh2 = getHTML.get('.crewTextBio h2');
	const nameH1 = getHTML.get('.crewTextBio h1');

	const bioParagraph = getHTML.get('.crewTextBio p');
	const personImage = getHTML.get('.personImage img');

	roleh2.textContent = role;
	nameH1.textContent = name;

	bioParagraph.textContent = bio;
	personImage.src = images.webp;

	addAnimation('0', '0');
};

const hideDiv = target => {
	const timeline = addAnimation('-600px', '-600px');
	timeline.finished.then(() => attInfos(target));
};

const actions = {
	async carouselButton(target) {
		turnActive(target.name);
		hideDiv(target);
	},
};

carouselButtons.addEventListener('click', ({ target }) => {
	const name = target.getAttribute('data-js');
	const func = actions[name];
	func?.(target);
});
