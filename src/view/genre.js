import AbstractView from './abstract.js';

const createGenreTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

export default class Genre extends AbstractView {
  constructor(genre) {
    super();
    this._genre = genre;
  }

  getTemplate() {
    return createGenreTemplate(this._genre);
  }
}
