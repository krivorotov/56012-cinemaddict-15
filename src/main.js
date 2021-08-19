import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {FilmCardCount} from './const.js';
import FilmsListPresenter from './presenter/films-list.js';

const films = new Array(FilmCardCount.ALL).fill(null).map(generateFilm);
const filters = generateFilter(films);

const mainElement = document.querySelector('.main');
const headerProfile = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const filmsListPresenter = new FilmsListPresenter(mainElement, headerProfile, footerStatistics);

filmsListPresenter.init(films, filters);
