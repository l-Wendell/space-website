import { showNav, getHTML } from './app.js';
const iconMenu = getHTML.get('.iconMenu');

iconMenu.addEventListener('click', e => {
	showNav(e);
});
