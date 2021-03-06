import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {RenderPosition, render, removeElement, replaceElement} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';

export default class Film {
  constructor(filmsListContainer, changeData, changeMode) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmView = null;
    this._filmDetailsView = null;

    this._openFilmDetails = this._openFilmDetails.bind(this);
    this._onDetailsPopupClose = this._onDetailsPopupClose.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmDetailsContainer = document.body;

    const prevFilmView = this._filmView;
    const prevFilmDetailsView = this._filmDetailsView;

    this._filmView = new FilmCardView(film);
    this._filmDetailsView = new FilmDetailsView(film);

    this._filmView.setClickHandler(this._openFilmDetails);
    this._filmDetailsView.setCloseButtonClickHandler(this._onDetailsPopupClose);

    this._filmView.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmView.setWatchedClickHandler(this._handleWatchedClick);
    this._filmView.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsView.setWatchlistDetailsClickHandler(this._handleWatchlistClick);
    this._filmDetailsView.setWatchedDetailsClickHandler(this._handleWatchedClick);
    this._filmDetailsView.setFavoriteDetailsClickHandler(this._handleFavoriteClick);

    if (prevFilmView === null || prevFilmDetailsView === null) {
      render(this._filmsListContainer, this._filmView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmsListContainer.contains(prevFilmView.getElement())) {
      replaceElement(this._filmView, prevFilmView);
    }

    if (this._filmDetailsContainer.contains(prevFilmDetailsView.getElement())) {
      replaceElement(this._filmDetailsView, prevFilmDetailsView);
    }
  }

  destroy() {
    removeElement(this._filmView);
    removeElement(this._filmDetailsView);
  }

  resetView() {
    this._onDetailsPopupClose();
  }

  _openFilmDetails() {
    this._changeMode();
    this._renderFilmDetails();
  }

  _onDetailsPopupClose() {
    document.body.classList.remove('hide-overflow');
    this._filmDetailsView.getElement().remove();
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _renderFilmDetails() {
    render(this._filmDetailsContainer, this._filmDetailsView.getElement(), RenderPosition.BEFOREEND);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._filmDetailsView.reset(this._film);
      this._onDetailsPopupClose();
    }
  }

  _handleWatchlistClick() {
    this._changeData(Object.assign({}, this._film, { userDetails: { ...this._film.userDetails, isWatchlist: !this._film.userDetails.isWatchlist } }));
  }

  _handleWatchedClick() {
    this._changeData(Object.assign({}, this._film, { userDetails: { ...this._film.userDetails, isAlreadyWatched: !this._film.userDetails.isAlreadyWatched } }));
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._film, { userDetails: { ...this._film.userDetails, isFavorite: !this._film.userDetails.isFavorite } }));
  }
}
