import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Источник – https://learn.javascript.ru/task/shuffle
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const showFullDate = (date) => dayjs(date).format('D MMMM YYYY');

//Функция для добавления окончания "s", если существительное во множественном числе
const isMultiple = (data) => data.length > 1 ? 's' : '';

const RenderPosition = {
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  if (place === RenderPosition.BEFOREEND) {
    container.append(element);
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {getRandomInteger, shuffle, generateDate, showFullDate, isMultiple, RenderPosition, render, createElement};
