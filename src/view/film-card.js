import dayjs from 'dayjs';
import {createElement} from '../utils.js';

const showYear = (date) => dayjs(date).format('YYYY');

const createFilmCardTemplate = (film) => {
  const {title, totalRating, genre, runtime, poster, description} = film.filmInfo;
  const {comments} = film;
  const {date} = film.filmInfo.release;
  const {isWatchlist, isAlreadyWatched, isFavorite} = film.userDetails;

  const watchlistClassName = isWatchlist ? 'film-card__controls-item--active' : '';
  const alreadyWatchedClassName = isAlreadyWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = isFavorite ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${showYear(date)}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre.join(', ')}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
