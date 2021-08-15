import Abstract from '../view/abstract-view.js';

const RenderPosition = {
  BEFOREEND: 'beforeend',
};

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (place === RenderPosition.BEFOREEND) {
    container.append(child);
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const removeElement = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export {RenderPosition, render, createElement, removeElement};
