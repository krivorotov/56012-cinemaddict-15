import AbstractView from './abstract.js';

const createMenuTemplate = (filters) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filters[1].count}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filters[2].count}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filters[3].count}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
  </nav>`
);

export default class Menu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}
