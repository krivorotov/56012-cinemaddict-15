import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {FilmCardCount} from './const.js';
import {render, RenderPosition} from './utils/render.js';
import HeaderProfileView from './view/header-profile.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmBoardPresenter from './presenter/film-board.js';
import FilmsModel from './model/films.js';

const films = new Array(FilmCardCount.ALL).fill(null).map(generateFilm);
const filters = generateFilter(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const mainElement = document.querySelector('.main');
const headerProfile = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

render(headerProfile, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(footerStatistics, new FooterStatisticsView(films), RenderPosition.BEFOREEND);

const filmBoardPresenter = new FilmBoardPresenter(mainElement, filmsModel);

filmBoardPresenter.init(filters);
