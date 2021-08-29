import FilmsListView from '../view/films-list.js';
import FooterStatisticsView from '../view/footer-statistics.js';
import HeaderProfileView from '../view/header-profile.js';
import MenuView from '../view/menu.js';
import NoFilmsView from '../view/no-films.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
import {render, RenderPosition, removeElement} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {FILM_COUNT_PER_STEP} from '../const.js';
import FilmPresenter from '../presenter/film.js';

export default class FilmBoard {
  constructor(main, header, footer) {
    this._mainContainer = main;
    this._headerContainer = header;
    this._footerContainer = footer;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._filmPresenterMap = new Map();

    this._headerProfileView = new HeaderProfileView();
    this._sortView = new SortView();
    this._filmsListView = new FilmsListView();
    this._noFilmsView = new NoFilmsView();
    this._showMoreButtonView = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films, filters) {
    this._films = films.slice();
    this._filters = filters;
    this._renderBoard();
  }

  _handleModeChange() {
    this._filmPresenterMap.forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenterMap.get(updatedFilm.id).init(updatedFilm);
  }

  _renderHeaderProfile() {
    render(this._headerContainer, this._headerProfileView, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    render(this._mainContainer, new MenuView(this._filters), RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._mainContainer, this._sortView, RenderPosition.BEFOREEND);
  }

  _renderFooterStatistics() {
    render(this._footerContainer, new FooterStatisticsView(this._films), RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmsContainer = this._filmsListView.getElement().querySelector('.films-list__container');
    const filmPresenter = new FilmPresenter(filmsContainer, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenterMap.set(film.id, filmPresenter);
  }

  _renderFilmsContainer() {
    render(this._mainContainer, this._filmsListView.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films.slice(from, to).forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._mainContainer, this._noFilmsView, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      removeElement(this._showMoreButtonView);
    }
  }

  _renderShowMoreButton() {
    const filmsList = this._filmsListView.getElement().querySelector('.films-list');
    render(filmsList, this._showMoreButtonView, RenderPosition.BEFOREEND);

    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmsList() {
    this._filmPresenterMap.forEach((presenter) => presenter.destroy());
    this._filmPresenterMap.clear();
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    removeElement(this._showMoreButtonView);
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderHeaderProfile();
    this._renderMenu();
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFooterStatistics();
    this._renderFilmsList();
  }
}
