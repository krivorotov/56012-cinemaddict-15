import {createHeaderProfileTemplate} from './view/header-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {getGenres, getComments, createGenresTemplate, createCommentsTemplate, createFilmDetailsTemplate} from './view/film-details.js';
import {generateFilm} from './mock/film.js';

const FilmCardCount = {
  ALL: 20,
  RATED: 2,
  COMMENTED: 2,
};

const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const films = new Array(FilmCardCount.ALL).fill().map(generateFilm);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const body = document.body;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatistics = document.querySelector('.footer__statistics');

render(headerElement, createHeaderProfileTemplate(), RenderPosition.BEFORE_END);
render(mainElement, createMenuTemplate(), RenderPosition.BEFORE_END);
render(mainElement, createSortTemplate(), RenderPosition.BEFORE_END);
render(mainElement, createFilmsListTemplate(), RenderPosition.BEFORE_END);

const filmsList = mainElement.querySelector('.films-list');
const filmsContainers = mainElement.querySelectorAll('.films-list__container');

for (let i = 0; i < FilmCardCount.ALL; i++) {
  render(filmsContainers[0], createFilmCardTemplate(films[i]), RenderPosition.BEFORE_END);
}

for (let i = 0; i < FilmCardCount.RATED; i++) {
  render(filmsContainers[1], createFilmCardTemplate(films[i]), RenderPosition.BEFORE_END);
}

for (let i = 0; i < FilmCardCount.COMMENTED; i++) {
  render(filmsContainers[2], createFilmCardTemplate(films[i]), RenderPosition.BEFORE_END);
}

render(filmsList, createShowMoreButtonTemplate(), RenderPosition.BEFORE_END);
render(footerStatistics, createFooterStatisticsTemplate(), RenderPosition.BEFORE_END);
render(body, createFilmDetailsTemplate(films[0]), RenderPosition.BEFORE_END);

const filmTableCells = document.querySelectorAll('.film-details__cell');

const genres = getGenres();

for (let i = 0; i < genres.length; i++) {
  render(filmTableCells[filmTableCells.length - 1], createGenresTemplate(genres[i]), RenderPosition.BEFORE_END);
}

const commentsList = document.querySelector('.film-details__comments-list');

const comments = getComments();
console.log(comments);

for (let i = 0; i < comments.length; i++) {
  render(commentsList, createCommentsTemplate(comments[i]), RenderPosition.BEFORE_END);
}
