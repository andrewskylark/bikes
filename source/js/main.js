'use strict';
const MIN_TITLE_LENGTH = 6;

(() => {
  const nav = document.querySelector(`.nav`);
  const navToggle = document.querySelector(`.nav__toggle`);

  const onElemEnableJs = (elemClass) => {
    document.querySelector(`.${elemClass}`).classList.remove(`${elemClass}--no-js`);
  };

  onElemEnableJs(`page-header__logo`);
  onElemEnableJs(`nav`);

  if (navToggle) {
    navToggle.addEventListener(`click`, () => {
      if (nav.classList.contains(`nav--closed`)) {
        nav.classList.remove(`nav--closed`);
        nav.classList.add(`nav--opened`);
      } else {
        nav.classList.add(`nav--closed`);
        nav.classList.remove(`nav--opened`);
      }
    });
  }
})();

(() => {
  const form = document.querySelector(`.page-header__form form`);
  const submitBtn = document.querySelector(`.form__btn`);
  const inputs = form.querySelectorAll(`input`);
  const name = form.querySelector(`#name`);
  const tel = form.querySelector(`#tel`);

  if (name) {
    name.addEventListener(`input`, () => {
      const length = name.value.length;

      if (length < MIN_TITLE_LENGTH) {
        name.setCustomValidity(`Минимальная длина - ${MIN_TITLE_LENGTH}, еще ${(MIN_TITLE_LENGTH - length)}`);
      } else {
        name.setCustomValidity(``);
        name.classList.remove(`input-invalid`);
      }
      name.reportValidity();
    });
  }

  if (tel) {
    tel.addEventListener(`input`, () => {
      if (/\D/.test(tel.value)) {
        tel.setCustomValidity(`Введите номер в формате 0012345678`);
      } else {
        tel.setCustomValidity(``);
        tel.classList.remove(`input-invalid`);
      }
      tel.reportValidity();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener(`click`, () => {
      for (let input of inputs) {
        if (input.reportValidity() === false) {
          input.classList.add(`input-invalid`);
        } else {
          input.classList.remove(`input-invalid`);
        }
      }
    });
  }
})();
