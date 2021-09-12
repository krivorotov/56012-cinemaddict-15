import dayjs from 'dayjs';

const renderYear = (year) => dayjs(year).format('YYYY');

const renderRuntime = (runtimeInMin) => dayjs().startOf('day').add(runtimeInMin, 'minute').format('h[h] mm[m]');

const renderCommentDate = (commentDate) => dayjs(commentDate).format('YYYY/MM/DD hh:mm');

const renderFullDate = (date) => dayjs(date).format('D MMMM YYYY');

export {renderYear, renderRuntime, renderCommentDate, renderFullDate};
