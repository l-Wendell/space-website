import anime from '/node_modules/animejs/lib/anime.es.js';
import { getHTML, getData, Timer, turnActive, showNav } from './app.js';

const buttons = getHTML.getAll('.button');
const carouselButtons = getHTML.get('.carouselButtons');

const crewTextDiv = getHTML.get('.crewTextDiv');
const personImage = getHTML.get('.personImage');

const iconMenu = getHTML.get('.iconMenu');

// Não usei a função addAnimation do arquivo app.js por conta de um erro na biblioteca de animação
// que eu não consegui resolver, a unica forma que encontrei foi refazer a função nesse arquivo
const addAnimation = height => {
	return anime
		.timeline({ easing: 'easeInOutQuad', duration: 750 })
		.add({
			targets: personImage,
			top: height,
		})
		.add(
			{
				targets: crewTextDiv,
				top: height,
			},
			100,
		);
};

const attInfos = async target => {
	const endPoint = target.getAttribute('endPoint');
	const id = +target.value;

	const roleh2 = getHTML.get('.crewTextBio h2');
	const nameH1 = getHTML.get('.crewTextBio h1');

	const bioParagraph = getHTML.get('.crewTextBio p');
	const personImage = getHTML.get('.personImage img');

	const { bio, images, name, role } = await getData(endPoint, id);

	roleh2.textContent = role;
	nameH1.textContent = name;

	bioParagraph.textContent = bio;
	personImage.src = images.webp;

	addAnimation('0');
	turnActive(target.name, buttons);
};

const hideDiv = target => {
	const height = '-620px';
	const timeline = addAnimation(height);

	timeline.finished.then(() => attInfos(target));
};

const carouselFunction = () => {
	const [actualButton] = buttons.filter(button =>
		button.classList.contains('active'),
	);

	const [nextButton] = buttons.filter(button => {
		const lastButtonValue = buttons[buttons.length - 1].value;
		const actualButtonValue = +actualButton.value + 1;

		if (actualButtonValue > lastButtonValue) {
			return +button.value === 1;
		}

		return +button.value === +actualButton.value + 1;
	});

	hideDiv(nextButton);
};

const _6seconds = 6000;
const carouselInterval = new Timer(carouselFunction, _6seconds);

const actions = {
	async carouselButton(target) {
		hideDiv(target);
		carouselInterval.reset(_6seconds);
	},
};

carouselButtons.addEventListener('click', ({ target }) => {
	const name = target.getAttribute('data-js');
	const func = actions[name];
	func?.(target);
});

iconMenu.addEventListener('click', e => {
	showNav(e);
});

carouselInterval.start();
