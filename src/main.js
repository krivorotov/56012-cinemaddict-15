import HeaderProfileView from './view/header-profile.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import FilmsListView from './view/films-list.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmDetailsView from './view/film-details.js';
import Comment from './view/comment.js';
import Genre from './view/genre.js';

import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {FILM_COUNT_PER_STEP, FilmCardCount} from './const.js';
import {RenderPosition, render} from './utils.js';

const films = new Array(FilmCardCount.ALL).fill(null).map(generateFilm);
const filters = generateFilter(films);

const body = document.body;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatistics = document.querySelector('.footer__statistics');

const renderFilmDetails = (film) => {
  const FilmDetailsComponent = new FilmDetailsView(film);

  render(body, FilmDetailsComponent.getElement(), RenderPosition.BEFOREEND);

  const filmTableCells = FilmDetailsComponent.getElement().querySelectorAll('.film-details__cell');
  const commentsList = FilmDetailsComponent.getElement().querySelector('.film-details__comments-list');

  const {genre} = film.filmInfo;
  const {comments} = film;

  for (let i = 0; i < genre.length; i++) {
    render(filmTableCells[filmTableCells.length - 1], new Genre(genre[i]).getElement(), RenderPosition.BEFOREEND);
  }

  for (let i = 0; i < comments.length; i++) {
    render(commentsList, new Comment(comments[i]).getElement(), RenderPosition.BEFOREEND);
  }

  body.classList.add('hide-overflow');

  FilmDetailsComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    FilmDetailsComponent.getElement().remove();
    body.classList.remove('hide-overflow');
  });
};

const renderFilmCard = (filmListElement, film) => {
  const FilmComponent = new FilmCardView(film);

  FilmComponent.getElement().addEventListener('click', () => renderFilmDetails(film));

  render(filmListElement, FilmComponent.getElement(), RenderPosition.BEFOREEND);
};

render(headerElement, new HeaderProfileView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(footerStatistics, new FooterStatisticsView(films).getElement(), RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsListView();
render(mainElement, filmsListComponent.getElement(), RenderPosition.BEFOREEND);

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

  render(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();

    films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP).forEach((film) => renderFilmCard(filmsContainers[0], film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}
