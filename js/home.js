import { showNav, getHTML } from './app.js';
console.log('entrou aqui');
const iconMenu = getHTML.get('.iconMenu');

iconMenu.addEventListener('click', e => {
	showNav(e);
});
