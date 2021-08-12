import HeaderProfileView from './view/header-profile.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import FilmsListView from './view/films-list.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooterStatisticsView from './view/footer-statistics.js';
import NoFilmsView from './view/no-films.js';

import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {FILM_COUNT_PER_STEP, FilmCardCount} from './const.js';
import {RenderPosition, render, remove} from './utils/render.js';
import {renderFilmCard} from './view/film-card.js';

const films = new Array(FilmCardCount.ALL).fill(null).map(generateFilm);
const filters = generateFilter(films);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatistics = document.querySelector('.footer__statistics');

render(headerElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(mainElement, new MenuView(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortView(), RenderPosition.BEFOREEND);
render(footerStatistics, new FooterStatisticsView(films), RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsListView();
const noFilmsComponent = new NoFilmsView();

if (films.length === 0) {
  render(mainElement, noFilmsComponent, RenderPosition.BEFOREEND);
} else {
  render(mainElement, filmsListComponent, RenderPosition.BEFOREEND);

  const filmsList = filmsListComponent.getElement().querySelector('.films-list');
  const filmsContainers = filmsListComponent.getElement().querySelectorAll('.films-list__container');

  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilmCard(filmsContainers[0], films[i]);
  }

  for (let i = 0; i < FilmCardCount.RATED; i++) {
    renderFilmCard(filmsContainers[1], films[i]);
  }

  for (let i = 0; i < FilmCardCount.COMMENTED; i++) {
    renderFilmCard(filmsContainers[2], films[i]);
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();

    render(filmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP).forEach((film) => renderFilmCard(filmsContainers[0], film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        remove(showMoreButtonComponent);
      }
    });
  }
}
