import AbstractView from './abstract-view.js';

const createFooterStatisticsTemplate = (films) => `<p>${films.length} movies inside</p>`;

export default class FooterStatistics extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._films);
  }
}
