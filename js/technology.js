import { getHTML, getData, turnActive, showNav, addAnimation } from './app.js';

const body = document.body;
const buttons = getHTML.getAll('.button');

const buttonDiv = getHTML.get('.buttonDiv');
const iconMenu = getHTML.get('.iconMenu');

const techImage = getHTML.get('.techImage');
const technologyTextDiv = getHTML.get('.technologyTextDiv');

const attInfos = async button => {
	const { value: id, name: buttonName } = button;
	const endPoint = button.getAttribute('endPoint');

	const { name, description, images } = await getData(endPoint, +id);
	const techName = getHTML.get('.textTechnology .techName');

	const descriptionParagraph = getHTML.get(
		'.textTechnology .descriptionParagraph',
	);
	const imageOrientation = body.clientWidth <= 830 ? 'landscape' : 'portrait';

	techName.textContent = name;
	descriptionParagraph.textContent = description;

	techImage.style.backgroundImage = `url(${images[imageOrientation]})`;

	turnActive(buttonName, buttons);
	addAnimation([technologyTextDiv, techImage], '0');
};

const hideDiv = parameters => {
	const height = body.clientWidth <= 830 ? '-800px' : '-600px';
	const timeline = addAnimation([technologyTextDiv, techImage], height);

	timeline.finished.then(() => attInfos(parameters));
};

const init = () => {
	const [activeButton] = buttons.filter(button =>
		button.classList.contains('active'),
	);
	attInfos(activeButton);
};

const actions = {
	carouselButton(button) {
		hideDiv(button);
	},
};

buttonDiv.addEventListener('click', ({ target }) => {
	const name = target.getAttribute('data-js');
	const func = actions[name];
	func?.(target);
});

iconMenu.addEventListener('click', e => {
	showNav(e);
});

init();
