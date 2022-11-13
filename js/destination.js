import { getHTML, getData, turnActive, showNav, addAnimation } from './app.js';

const body = document.body;
const iconMenu = getHTML.get('.iconMenu');

const destinationTextDiv = getHTML.get('.destinationTextDiv');
const destinationDiv = getHTML.get('.destinationDiv');

const attInfos = async target => {
	const id = +target.getAttribute('destinationID');
	const endPoint = target.getAttribute('endPoint');

	const $imageDestination = getHTML.get(
		'.destinationDiv .destinationImage img',
	);
	const $destinationH1 = getHTML.get(
		'.destinationTextDiv [data-js="destinationH1"]',
	);

	const $explanationDestinationP = getHTML.get(
		'.destinationTextDiv [data-js="explanationDestinationP"]',
	);
	const $distance = getHTML.get(
		'.destinationTextDiv .statisticsDestination .distance h2',
	);

	const $travelTime = getHTML.get(
		'.destinationTextDiv .statisticsDestination .travelTime h2',
	);
	const { images, name, distance, travel, description } = await getData(
		endPoint,
		id,
	);

	const destinationLis = getHTML.getAll(
		'.destinationTextDiv .destinationsUl li',
	);

	$imageDestination.src = images.webp;
	$destinationH1.textContent = name;

	$explanationDestinationP.textContent = description;
	$distance.textContent = distance;

	$travelTime.textContent = travel;

	addAnimation([destinationTextDiv, destinationDiv], '0');
	turnActive(target.getAttribute('name'), destinationLis);
};

const hideDiv = target => {
	const height = body.clientWidth <= 830 ? '-650px' : '-500px';
	const timeline = addAnimation([destinationTextDiv, destinationDiv], height);
	timeline.finished.then(() => attInfos(target));
};

const actions = {
	destinationLi(target) {
		hideDiv(target);
	},
};

destinationTextDiv.addEventListener('click', ({ target }) => {
	const targetName = target.getAttribute('data-js');
	const func = actions[targetName];
	func?.(target);
});

iconMenu.addEventListener('click', e => {
	showNav(e);
});
