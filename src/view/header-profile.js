import AbstractView from './abstract-view.js';

const createHeaderProfileTemplate = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">Movie buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class HeaderProfile extends AbstractView {
  getTemplate() {
    return createHeaderProfileTemplate();
  }
}
