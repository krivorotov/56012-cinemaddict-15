const filmToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films.filter((film) => film.userDetails.isWatchlist).length,
  history: (films) => films.filter((film) => film.userDetails.isAlreadyWatched).length,
  favorites: (films) => films.filter((film) => film.userDetails.isFavorite).length,
};

const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);

export {generateFilter};
