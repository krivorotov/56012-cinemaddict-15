import dayjs from 'dayjs';
import {getRandomInteger, shuffle} from '../utils.js';
import {FILMS, EMOTIONS, MAX_SENTENCES, MAX_COMMENTS, COMMENT_AUTHORS, COMMENT_TEXTS} from '../const.js';

let filmId = 1;
let commentId = 1;

const generateDescription = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const textArray = text.match(/\S.*?\."?(?=\s|$)/g);
  const randomTextArray = shuffle(textArray);

  const randomCount = getRandomInteger(0, MAX_SENTENCES);
  const descriptionArray = randomTextArray.slice(0, randomCount);
  const description = descriptionArray.join(' ');

  return description;
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateComments = () => {

  const generateComment = () => ({
    id: commentId++,
    author: COMMENT_AUTHORS[getRandomInteger(0, COMMENT_AUTHORS.length - 1)],
    text: COMMENT_TEXTS[getRandomInteger(0, COMMENT_TEXTS.length - 1)],
    date: generateDate(),
    emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)],
  });

  const randomCommentsCount = getRandomInteger(0, MAX_COMMENTS);
  const comments = new Array(randomCommentsCount).fill().map(generateComment);

  return comments;
};

const generateFilm = () => {
  const randomIndex = getRandomInteger(0, FILMS.length - 1);

  const isAlreadyWatched = Boolean(getRandomInteger(0, 1));
  const watchingDate = isAlreadyWatched ? generateDate() : '';

  return {
    id: filmId++,
    comments: generateComments(),
    filmInfo: {
      title: FILMS[randomIndex].title,
      alternativeTitle: FILMS[randomIndex].title,
      totalRating: FILMS[randomIndex].rating,
      poster: FILMS[randomIndex].poster,
      ageRating: FILMS[randomIndex].ageRating,
      director: FILMS[randomIndex].director,
      writers: FILMS[randomIndex].writers,
      actors: FILMS[randomIndex].actors,
      release: {
        date: FILMS[randomIndex].date,
        releaseCountry: FILMS[randomIndex].country,
      },
      runtime: FILMS[randomIndex].duration,
      genre: FILMS[randomIndex].genre,
      description: generateDescription(),
    },
    userDetails: {
      isWatchlist: Boolean(getRandomInteger(0, 1)),
      isAlreadyWatched,
      watchingDate,
      isFavorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};

export {generateFilm};
