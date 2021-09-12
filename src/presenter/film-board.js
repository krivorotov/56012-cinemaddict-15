import FilmsListView from '../view/films-list.js';
import FooterStatisticsView from '../view/footer-statistics.js';
import HeaderProfileView from '../view/header-profile.js';
import MenuView from '../view/menu.js';
import NoFilmsView from '../view/no-films.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
import {render, RenderPosition, removeElement} from '../utils/render.js';
import {sortByDate, sortByRating} from '../utils/common.js';
import {FILM_COUNT_PER_STEP, SortType, UpdateType, UserAction} from '../const.js';
import FilmPresenter from '../presenter/film.js';

export default class FilmBoard {
  constructor(main, header, footer, filmsModel) {
    this._filmsModel = filmsModel;
    this._mainContainer = main;
    this._headerContainer = header;
    this._footerContainer = footer;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._filmPresenterMap = new Map();

    this._sortView = null;
    this._showMoreButtonView = null;

    this._headerProfileView = new HeaderProfileView();
    this._filmsListView = new FilmsListView();
    this._noFilmsView = new NoFilmsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(filters) {
    this._filters = filters;
    this._renderBoard();
  }

  _getFilms() {
    switch(this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRating);
    }

    return this._filmsModel.getFilms();
  }

  _handleModeChange() {
    this._filmPresenterMap.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._filmPresenterMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _renderHeaderProfile() {
    render(this._headerContainer, this._headerProfileView, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    render(this._mainContainer, new MenuView(this._filters), RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._renderSort();
    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortView !== null) {
      this._sortView = null;
    }

    this._sortView = new SortView(this._currentSortType);
    this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._mainContainer, this._sortView, RenderPosition.BEFOREEND);
  }

  _renderFooterStatistics() {
    render(this._footerContainer, new FooterStatisticsView(this._filmsModel.getFilms()), RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmsContainer = this._filmsListView.getElement().querySelector('.films-list__container');
    const filmPresenter = new FilmPresenter(filmsContainer, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenterMap.set(film.id, filmPresenter);
  }

  _renderFilmsContainer() {
    render(this._mainContainer, this._filmsListView.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._mainContainer, this._noFilmsView, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      removeElement(this._showMoreButtonView);
    }
  }

  _renderShowMoreButton() {
    const filmsList = this._filmsListView.getElement().querySelector('.films-list');

    if (this._showMoreButtonView !== null) {
      this._showMoreButtonView = null;
    }

    this._showMoreButtonView = new ShowMoreButtonView();
    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);

    render(filmsList, this._showMoreButtonView, RenderPosition.BEFOREEND);
  }

  _renderFilmsList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmsList() {
    this._filmPresenterMap.forEach((presenter) => presenter.destroy());
    this._filmPresenterMap.clear();
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    removeElement(this._showMoreButtonView);
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmPresenterMap.forEach((presenter) => presenter.destroy());
    this._filmPresenterMap.clear();

    removeElement(this._sortView);
    removeElement(this._noFilmsView);
    removeElement(this._showMoreButtonView);

    if (resetRenderedTaskCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderHeaderProfile();
    this._renderMenu();
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFooterStatistics();

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }
}
