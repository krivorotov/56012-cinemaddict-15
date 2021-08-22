import CommentView from '../view/comment.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import FilmsListView from '../view/films-list.js';
import FooterStatisticsView from '../view/footer-statistics.js';
import GenreView from '../view/genre.js';
import HeaderProfileView from '../view/header-profile.js';
import MenuView from '../view/menu.js';
import NoFilmsView from '../view/no-films.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
import {render, RenderPosition, removeElement, replaceElement} from '../utils/render.js';
import {isEscEvent, updateItem} from '../utils/common.js';
import {FILM_COUNT_PER_STEP} from '../const.js';

export default class FilmBoard {
  constructor(main, header, footer) {
    this._mainContainer = main;
    this._headerContainer = header;
    this._footerContainer = footer;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._filmPresenter = new Map();

    this._headerProfileView = new HeaderProfileView();
    this._sortView = new SortView();
    this._filmsListView = new FilmsListView();
    this._noFilmsView = new NoFilmsView();
    this._showMoreButtonView = new ShowMoreButtonView();
    this._filmView = null;

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    //this._handleWatchlistClick = this._handleWatchlistClick(this);

    this._body = document.body;
  }

  init(films, filters) {
    this._films = films.slice();
    this._filters = filters;
    this._renderBoard();
  }

  destroy() {
    removeElement(this._filmPresenter);
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

  _onPopupExit() {
    this._body.querySelector('.film-details').remove();
    this._body.classList.remove('hide-overflow');
  }

  _onEscKeyDown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._onPopupExit();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _renderFilmDetails(film) {
    const filmDetailsView = new FilmDetailsView(film);

    render(this._body, filmDetailsView.getElement(), RenderPosition.BEFOREEND);

    const filmTableCells = filmDetailsView.getElement().querySelectorAll('.film-details__cell');
    const commentsList = filmDetailsView.getElement().querySelector('.film-details__comments-list');

    const {genre} = film.filmInfo;
    const {comments} = film;

    for (let i = 0; i < genre.length; i++) {
      render(filmTableCells[filmTableCells.length - 1], new GenreView(genre[i]).getElement(), RenderPosition.BEFOREEND);
    }

    for (let i = 0; i < comments.length; i++) {
      render(commentsList, new CommentView(comments[i]).getElement(), RenderPosition.BEFOREEND);
    }

    this._body.classList.add('hide-overflow');

    filmDetailsView.setClickHandler(() => {
      this._onPopupExit();
      document.removeEventListener('keydown', this._onEscKeyDown);
    });
  }

  _renderFilm(film) {
    const prevFilmView = this._filmView;

    this._filmView = new FilmCardView(film);

    this._filmView.setClickHandler(() => {
      this._renderFilmDetails(film);
      document.addEventListener('keydown', this._onEscKeyDown);
    });

    const filmsContainers = this._filmsListView.getElement().querySelectorAll('.films-list__container');

    if (prevFilmView === null) {
      render(filmsContainers[0], this._filmView.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    if (filmsContainers[0].contains(prevFilmView.getElement())) {
      replaceElement(this._filmView, prevFilmView);
    }

    this._filmPresenter.set(film.id, this._filmView);

    this._filmView.setWatchlistClickHandler(this._handleWatchlistClick);
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
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
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

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _handleWatchlistClick() {
    this._handleFilmChange(Object.assign({}, this._film, { isWatchlist: !this.isWatchlist }));
  }

  _handleWatchedClick() {
    this._handleFilmChange(Object.assign({}, this._film, { isAlreadyWatched: !this.isAlreadyWatched }));
  }

  _handleFavoriteClick() {
    this._handleFilmChange(Object.assign({}, this._film, { isFavorite: !this.isFavorite }));
  }
}
