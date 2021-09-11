import SmartView from './smart-view.js';
import {showFullDate, isMultiple} from '../utils/common.js';
import dayjs from 'dayjs';

const createFilmDetailsTemplate = (film) => {
  const {title, alternativeTitle, totalRating, poster, ageRating, director, writers, actors, runtime, genre, description} = film.filmInfo;
  const {comments, isEmotion, newCommentEmotionSource = null} = film;
  const {date, releaseCountry} = film.filmInfo.release;
  const {isWatchlist, isAlreadyWatched, isFavorite} = film.userDetails;

  const watchlistClassName = isWatchlist ? 'film-details__control-button--active' : '';
  const alreadyWatchedClassName = isAlreadyWatched ? 'film-details__control-button--active' : '';
  const favoriteClassName = isFavorite ? 'film-details__control-button--active' : '';

  const renderDetailsGenre = (genres) => genres.map((el) => `<span class="film-details__genre">${el}</span>`).join('');

  const renderDetailsComments = (commentsList) => commentsList.map(({author, text, commentDate, emotion}) =>
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dayjs(commentDate).format('YYYY/MM/DD hh:mm')}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`).join('');

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${showFullDate(date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genre${isMultiple(genre)}</td>
                <td class="film-details__cell">${renderDetailsGenre(genre)}</td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">${renderDetailsComments(comments)}</ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${isEmotion ? `<img src=${newCommentEmotionSource} width="55" height="55" alt="emoji-smile">` : ''}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile" data-src="./images/emoji/smile.png">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping" data-src="./images/emoji/sleeping.png">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke" data-src="./images/emoji/puke.png">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry" data-src="./images/emoji/angry.png">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetails extends SmartView {
  constructor(film) {
    super();
    this._film = FilmDetails.addNewCommentEmotion(film);

    this._emotionChangeHandler = this._emotionChangeHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._clickCloseButtonHandler = this._clickCloseButtonHandler.bind(this);
    this._watchlistDetailsClickHandler = this._watchlistDetailsClickHandler.bind(this);
    this._watchedDetailsClickHandler = this._watchedDetailsClickHandler.bind(this);
    this._favoriteDetailsClickHandler = this._favoriteDetailsClickHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(film) {
    this.updateData(FilmDetails.restoreChanges(film));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.watchlistDetailsClick);
    this.setWatchlistDetailsClickHandler(this._callback.watchlistDetailsClick);
    this.setWatchedDetailsClickHandler(this._callback.watchedDetailsClick);
    this.setFavoriteDetailsClickHandler(this._callback.favoriteDetailsClick);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.film-details__emoji-label').forEach((emotion) => emotion.addEventListener('click', this._emotionChangeHandler));
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
  }

  _emotionChangeHandler(evt) {
    if (this._film.newCommentEmotionSource === evt.target.src) {
      return;
    }

    this.updateData({newCommentEmotionSource: evt.target.src || evt.target.dataset.src, isEmotion: true, scroll: this.getElement().scrollTop});
    this.getElement().scrollTop = this._film.scroll;

    if(!this._film.commentInput) {
      return;
    }

    this.getElement().querySelector('.film-details__comment-input').value = this._film.commentInput;
  }

  _commentInputHandler(evt) {
    this.updateData({commentInput: evt.target.value}, true);
  }

  _clickCloseButtonHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchlistDetailsClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistDetailsClick();
  }

  _watchedDetailsClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedDetailsClick();
  }

  _favoriteDetailsClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteDetailsClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickCloseButtonHandler);
  }

  setWatchlistDetailsClickHandler(callback) {
    this._callback.watchlistDetailsClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistDetailsClickHandler);
  }

  setWatchedDetailsClickHandler(callback) {
    this._callback.watchedDetailsClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedDetailsClickHandler);
  }

  setFavoriteDetailsClickHandler(callback) {
    this._callback.favoriteDetailsClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteDetailsClickHandler);
  }

  static restoreChanges(data) {
    return Object.assign({}, data, {isEmotion: false, newCommentEmotionSource: null, commentInput: null});
  }

  static addNewCommentEmotion(data) {
    return Object.assign(
      {},
      data,
      {
        isEmotion: false,
        newCommentEmotionSource: null,
      },
    );
  }
}
