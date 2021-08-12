import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const showFullDate = (date) => dayjs(date).format('D MMMM YYYY');

//Функция для добавления окончания "s", если существительное во множественном числе
const isMultiple = (data) => data.length > 1 ? 's' : '';

export {generateDate, showFullDate, isMultiple};
