const MAX_SENTENCES = 5;
const MAX_COMMENTS = 5;

const FILM_COUNT_PER_STEP = 5;

const FilmCardCount = {
  ALL: 20,
  RATED: 2,
  COMMENTED: 2,
};

const FILMS = [
  {
    title: 'Made For Each Other',
    poster: 'made-for-each-other.png',
    rating: 5.8,
    date: '1939-05-11T00:00:00.000Z',
    duration: 60,
    genre: ['Comedy'],
    ageRating: 18,
    additionalTitle: 'Original: The Great Flamarion',
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    country: 'USA',
  },
  {
    title: 'Popeye Meets Sinbad',
    poster: 'popeye-meets-sinbad.png',
    rating: 6.3,
    date: '1936-05-11T00:00:00.000Z',
    duration: 65,
    genre: ['Cartoon'],
    ageRating: 18,
    additionalTitle: 'Original: The Great Flamarion',
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    country: 'USA',
  },
  {
    title: 'Sagebrush Trail',
    poster: 'sagebrush-trail.jpg',
    rating: 3.2,
    date: '1933-05-11T00:00:00.000Z',
    duration: 70,
    genre: ['Western'],
    ageRating: 18,
    additionalTitle: 'Original: The Great Flamarion',
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    country: 'USA',
  },
  {
    title: 'Santa Claus Conquers The Martians',
    poster: 'santa-claus-conquers-the-martians.jpg',
    rating: 2.3,
    date: '1964-05-11T00:00:00.000Z',
    duration: 75,
    genre: ['Comedy'],
    ageRating: 18,
    additionalTitle: 'Original: The Great Flamarion',
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    country: 'USA',
  },
  {
    title: 'The Dance Of Life',
    poster: 'the-dance-of-life.jpg',
    rating: 8.3,
    date: '1929-05-11T00:00:00.000Z',
    duration: 80,
    genre: ['Musical'],
    ageRating: 18,
    additionalTitle: 'Original: The Great Flamarion',
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    country: 'USA',
  },
  {
    title: 'The Great Flamarion',
    poster: 'the-great-flamarion.jpg',
    rating: 8.9,
    date: '1945-05-11T00:00:00.000Z',
    duration: 85,
    genre: ['Drama', 'Film-Noir', 'Mystery'],
    ageRating: 18,
    additionalTitle: 'Original: The Great Flamarion',
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    country: 'USA',
  },
  {
    title: 'The Man With The Golden Arm',
    poster: 'the-man-with-the-golden-arm.jpg',
    rating: 9.0,
    date: '1955-05-11T00:00:00.000Z',
    duration: 90,
    genre: ['Drama'],
    ageRating: 18,
    additionalTitle: 'Original: The Great Flamarion',
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    country: 'USA',
  },
];

const COMMENT_AUTHORS = ['Tim Macoveev', 'John Doe'];
const COMMENT_TEXTS = ['Interesting setting and a good cast', 'Booooooooooring', 'Very very old. Meh', 'Almost two hours? Seriously?'];

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export {FILMS, EMOTIONS, MAX_SENTENCES, MAX_COMMENTS, COMMENT_AUTHORS, COMMENT_TEXTS, FILM_COUNT_PER_STEP, FilmCardCount, SortType};
