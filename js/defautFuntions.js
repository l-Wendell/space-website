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
