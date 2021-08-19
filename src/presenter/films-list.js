import CommentView from '../view/comment.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-card.js';
import FilmsListView from '../view/film-card.js';
import FooterStatisticsView from '../view/footer-statistics.js';
import GenreView from '../view/genre.js';
import HeaderProfileView from '../view/header-profile.js';
import MenuView from '../view/menu.js';
import NoFilmsView from '../view/no-films.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import SortView from '../view/sort.js';
import {render, RenderPosition, removeElement} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';
import {FILM_COUNT_PER_STEP} from '../const.js';

export default class FilmsList {
  constructor(main, header, footer) {
    this._mainContainer = main;
    this._headerContainer = header;
    this._footerContainer = footer;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._headerProfileComponent = new HeaderProfileView();
    this._menuComponent = new MenuView();
    this._sortComponent = new SortView();
    this._filmsListComponent = new FilmsListView();
    this._footerStatisticsComponent = new FooterStatisticsView();
    this._noFilmsComponent = new NoFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._body = document.body;
  }

  init(films, filters) {
    this._films = films.slice();
    this._filters = filters;
    this._renderFilmsList();
  }

  _renderHeaderProfile() {
    render(this._headerContainer, this._headerProfileComponent, RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    render(this._mainContainer, this._menuComponent(this._filters), RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFooterStatistics() {
    render(this._footerContainer, this._footerStatisticsComponent(this._films), RenderPosition.BEFOREEND);
  }

  _onPopupExit() {
    this._body.querySelector('.film-details').remove();
    this._body.classList.remove('hide-overflow');
  }

  _onEscKeyDown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.onPopupExit();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _renderFilmDetails(film) {
    const filmDetailsComponent = new FilmDetailsView(film);

    render(this._body, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);

    const filmTableCells = filmDetailsComponent.getElement().querySelectorAll('.film-details__cell');
    const commentsList = filmDetailsComponent.getElement().querySelector('.film-details__comments-list');

    const {genre} = film.filmInfo;
    const {comments} = film;

    for (let i = 0; i < genre.length; i++) {
      render(filmTableCells[filmTableCells.length - 1], new GenreView(genre[i]).getElement(), RenderPosition.BEFOREEND);
    }

    for (let i = 0; i < comments.length; i++) {
      render(commentsList, new CommentView(comments[i]).getElement(), RenderPosition.BEFOREEND);
    }

    this._body.classList.add('hide-overflow');

    filmDetailsComponent.setClickHandler(() => {
      this._onPopupExit();
      document.removeEventListener('keydown', this._onEscKeyDown);
    });
  }

  _renderFilm(film) {
    const filmComponent = new FilmCardView(film);

    filmComponent.setClickHandler(() => {
      this._renderFilmDetails(film);
      document.addEventListener('keydown', this._onEscKeyDown);
    });

    const filmsContainers = this._filmsListComponent.getElement().querySelectorAll('.films-list__container');

    render(filmsContainers[0], filmComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films.slice(from, to).forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._mainContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      removeElement(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    const filmsList = this._filmsListComponent.getElement().querySelector('.films-list');
    render(filmsList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderHeaderProfile();
    this._renderMenu();
    this._renderSort();
    this._renderFooterStatistics();
    this._renderFilmsList();
  }
}
