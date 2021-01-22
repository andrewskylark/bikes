'use strict';
const MIN_TITLE_LENGTH = 6;

(() => {
  const nav = document.querySelector(`.nav`);
  const navToggle = document.querySelector(`.nav__toggle`);
  const logo = document.querySelector(`.page-header__logo`);

  logo.classList.remove(`page-header__logo--no-js`);
  nav.classList.remove(`nav--no-js`);

  navToggle.addEventListener(`click`, () => {

    if (nav.classList.contains(`nav--closed`)) {
      nav.classList.remove(`nav--closed`);
      nav.classList.add(`nav--opened`);
    } else {
      nav.classList.add(`nav--closed`);
      nav.classList.remove(`nav--opened`);
    }
  });
})();

(() => {
  const form = document.querySelector(`.page-header__form`);
  const submitBtn = document.querySelector(`.form__btn`);
  const inputs = form.querySelectorAll(`input`);
  const name = form.querySelector(`#name`);
  const tel = form.querySelector(`#tel`);

  name.addEventListener(`input`, () => {
    const length = name.value.length;

    if (length < MIN_TITLE_LENGTH) {
      name.setCustomValidity(`Минимальная длина - ${MIN_TITLE_LENGTH}, еще ${(MIN_TITLE_LENGTH - length)}`);
    } else {
      name.setCustomValidity(``);
      name.style.outline = `none`;
    }
    name.reportValidity();
  });

  tel.addEventListener(`input`, () => {
    if (/\D/.test(tel.value)) {
      tel.setCustomValidity(`Введите номер в формате 0012345678`);
    } else {
      tel.setCustomValidity(``);
      tel.style.outline = `none`;
    }
    tel.reportValidity();
  });

  submitBtn.addEventListener(`click`, () => {
    for (let input of inputs) {
      if (input.reportValidity() === false) {
        input.style.outline = `red solid 2px`;
      } else {
        input.style.outline = `none`;
      }
    }
  });
})();
