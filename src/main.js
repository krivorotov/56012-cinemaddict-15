import {createHeaderProfileTemplate} from './view/header-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {createFilmDetailsTemplate} from './view/film-details.js';

const FILM_COUNT = 5;
const RATED_FILM_COUNT = 2;
const COMMENTED_FILM_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const body = document.body;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatistics = document.querySelector('.footer__statistics');

render(headerElement, createHeaderProfileTemplate(), 'beforeend');
render(mainElement, createMenuTemplate(), 'beforeend');
render(mainElement, createSortTemplate(), 'beforeend');
render(mainElement, createFilmsListTemplate(), 'beforeend');

const filmsList = mainElement.querySelector('.films-list');
const filmsContainers = mainElement.querySelectorAll('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsContainers[0], createFilmCardTemplate(), 'beforeend');
}

for (let i = 0; i < RATED_FILM_COUNT; i++) {
  render(filmsContainers[1], createFilmCardTemplate(), 'beforeend');
}

for (let i = 0; i < COMMENTED_FILM_COUNT; i++) {
  render(filmsContainers[2], createFilmCardTemplate(), 'beforeend');
}

render(filmsList, createShowMoreButtonTemplate(), 'beforeend');
render(footerStatistics, createFooterStatisticsTemplate(), 'beforeend');
render(body, createFilmDetailsTemplate(), 'beforeend');
