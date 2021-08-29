import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {FilmCardCount} from './const.js';
import FilmBoardPresenter from './presenter/film-board.js';

const films = new Array(FilmCardCount.ALL).fill(null).map(generateFilm);
const filters = generateFilter(films);

const mainElement = document.querySelector('.main');
const headerProfile = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

const filmBoardPresenter = new FilmBoardPresenter(mainElement, headerProfile, footerStatistics);

filmBoardPresenter.init(films, filters);
