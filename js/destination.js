import anime from '/node_modules/animejs/lib/anime.es.js';
import { getHTML, getData } from './defautFuntions.js';

const destinationTextDiv = getHTML.get('.destinationTextDiv');
const destinationDiv = getHTML.get('.destinationDiv');
const destinationLis = Array.from(
	getHTML.getAll('.destinationTextDiv .destinationsUl li')
);

const turnActive = nameLi => {
	const [actualLi] = destinationLis.filter(
		li => li.getAttribute('nameDestination') === nameLi
	);

	destinationLis.forEach(li => {
		if (actualLi !== li) {
			li.classList.remove('actualDestination');
		}
	});

	actualLi.classList.add('actualDestination');
};

const addAnimation = (value1, value2) => {
	return anime
		.timeline({ easing: 'easeInOutQuad', duration: 750 })
		.add({
			targets: destinationTextDiv,
			top: value1,
		})
		.add(
			{
				targets: destinationDiv,
				top: value2,
			},
			100
		);
};

const attInfos = async target => {
	const $imageDestination = getHTML.get(
		'.destinationDiv .destinationImage img'
	);
	const $destinationH1 = getHTML.get(
		'.destinationTextDiv [data-js="destinationH1"]'
	);
	const $explanationDestinationP = getHTML.get(
		'.destinationTextDiv [data-js="explanationDestinationP"]'
	);
	const $distance = getHTML.get(
		'.destinationTextDiv .statisticsDestination .distance h2'
	);
	const $travelTime = getHTML.get(
		'.destinationTextDiv .statisticsDestination .travelTime h2'
	);
	const id = +target.getAttribute('destinationID');
	const endPoint = target.getAttribute('endPoint');

	const { images, name, distance, travel, description } = await getData(
		endPoint,
		id
	);
	// const = data;

	$imageDestination.src = images.webp;
	$destinationH1.textContent = name;

	$explanationDestinationP.textContent = description;
	$distance.textContent = distance;
	$travelTime.textContent = travel;

	turnActive(target.getAttribute('nameDestination'));
	addAnimation('0', '0');
};

const hideDiv = target => {
	const timeline = addAnimation('-500px', '-500px');
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
