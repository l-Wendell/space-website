import anime from '/node_modules/animejs/lib/anime.es.js';

export const getHTML = {
	get(element) {
		return document.querySelector(element);
	},
	getAll(element) {
		return [...document.querySelectorAll(element)];
	},
};

export const getData = async (endPoint, id) => {
	const response = await fetch('/data.json');
	const json = await response.json();
	const [data] = json[endPoint].filter(item => item.id === id);

	return data;
};

export const turnActive = (nameItem, arrayOfItems) => {
	const [actualItem] = arrayOfItems.filter(
		item => item.getAttribute('name') === nameItem
	);

	arrayOfItems.forEach(item => {
		if (actualItem !== item) {
			item.classList.remove('active');
		}
	});

	actualItem.classList.add('active');
};

export class Timer {
	constructor(fn, time) {
		this.time = time;
		this.fn = fn;
		// this.timerObj = setInterval(fn, time);
		this.timerObj = undefined;
	}

	stop() {
		if (this.timerObj) {
			clearInterval(this.timerObj);
			this.timerObj = null;
		}
		return this;
	}

	// start timer using current settings (if it's not already running)
	start() {
		if (!this.timerObj) {
			this.stop();
			this.timerObj = setInterval(this.fn, this.time);
		}
		return this;
	}

	// start with new or original interval, stop current interval
	reset(newTime = this.time) {
		this.time = newTime;
		return this.stop().start();
	}
}
