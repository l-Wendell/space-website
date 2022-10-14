import anime from '/node_modules/animejs/lib/anime.es.js';
const destinationTextDiv = document.querySelector('.destinationTextDiv');
const destinationDiv = document.querySelector('.destinationDiv');

const timeline = anime.timeline({ easing: 'easeOutExpo', duration: 750 });

timeline.add({
	targets: destinationTextDiv,
	top: '-500px',
});

timeline.add(
	{
		targets: destinationDiv,
		top: '-500px',
	},
	100
);
// anime({
// 	targets: destinationTextDiv,
// 	top: '-500px',
// 	easing: 'spring(1, 80, 10, 0)',
// });
