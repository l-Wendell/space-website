export const getHTML = {
	get(element) {
		return document.querySelector(element);
	},
	getAll(element) {
		return [...document.querySelectorAll(element)];
	},
};
