import anime from '/node_modules/animejs/lib/anime.es.js';
import { getHTML, getData, turnActive } from './app.js';

const buttonDiv = getHTML.get('.buttonDiv');
const technologyTextDiv = getHTML.get('.technologyTextDiv');

const techImage = getHTML.get('.techImage');
const buttons = [...getHTML.getAll('.button')];

const addAnimation = (value1, value2) => {
	return anime
		.timeline({ easing: 'easeInOutQuad', duration: 750 })
		.add({
			targets: technologyTextDiv,
			top: value1,
		})
		.add(
			{
				targets: techImage,
				top: value2,
			},
			100
		);
};

const attInfos = async target => {
	const endPoint = target.getAttribute('endPoint');
	const id = +target.value;
	const { name, description, images } = await getData(endPoint, id);

	const techName = getHTML.get('.textTechnology .techName');
	const descriptionParagraph = getHTML.get(
		'.textTechnology .descriptionParagraph'
	);
	const techImage = getHTML.get('.techImage img');

	techName.textContent = name;
	descriptionParagraph.textContent = description;
	techImage.src = images.portrait;

	turnActive(target.name, buttons);
	addAnimation('0', '0');
};

const hideDiv = target => {
	const timeline = addAnimation('-600px', '-600px');
	timeline.finished.then(() => attInfos(target));
};

const actions = {
	carouselButton(target) {
		hideDiv(target);
	},
};

buttonDiv.addEventListener('click', ({ target }) => {
	const name = target.getAttribute('data-js');
	const func = actions[name];
	func?.(target);
});
