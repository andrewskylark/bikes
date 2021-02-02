'use strict';
const PHONE_PATTERN = /^[\+]?[0-9]{0,11}$/;
const NUMS_ONLY = /\d/g;
const PHONE_LENGTH = 11;

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

        document.body.style.position = `fixed`;
        document.body.style.top = `-${window.scrollY}px`;
      } else {
        nav.classList.add(`nav--closed`);
        nav.classList.remove(`nav--opened`);

        const scrollY = document.body.style.top;
        document.body.style.position = ``;
        document.body.style.top = ``;
        window.scrollTo(0, parseInt(scrollY || `0`, 10) * -1);
      }
    });
  }
})();

(() => {
  const form = document.querySelector(`.page-header__form form`);
  const submitBtn = document.querySelector(`.form__btn`);
  const inputs = form.querySelectorAll(`input`);
  const tel = form.querySelector(`#tel`);

  if (tel) {
    tel.addEventListener(`input`, () => {

      if (PHONE_PATTERN.test(tel.value) === false) {
        tel.setCustomValidity(`введите номер в формате +7xxxxxxxxxxx или 8xxxxxxxxxxx`);
      } else {
        tel.setCustomValidity(``);
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

      if (tel.value.length === 0) {
        tel.setCustomValidity(`Введите свой номер телефона!`);
        tel.classList.add(`input-invalid`);
      } else if (tel.value.match(NUMS_ONLY).length !== PHONE_LENGTH) {
        tel.setCustomValidity(`Длина номера телефона - ${PHONE_LENGTH} знаков; осталось ввести: ${PHONE_LENGTH - tel.value.match(NUMS_ONLY).length}`);
        tel.classList.add(`input-invalid`);
      } else {
        tel.setCustomValidity(``);
        tel.classList.remove(`input-invalid`);
      }
    });
  }
})();
