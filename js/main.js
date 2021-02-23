'use strict';
const PHONE_PATTERN = /^[\+]?[0-9]{0,11}$/;
const NUMS_ONLY = /\d/g;
const PHONE_LENGTH = 11;
const ESC_KEY = `Escape`;

(() => {
  const nav = document.querySelector(`.nav`);
  const navToggle = document.querySelector(`.nav__toggle`);

  const isEscEvt = (evt, action) => {
    if (evt.key === ESC_KEY) {
      action();
    }
  };
  const onMenuEscPress = (evt) => {
    isEscEvt(evt, closeNav);
  };
  const onElemEnableJs = (elemClass) => {
    document.querySelector(`.${elemClass}`).classList.remove(`${elemClass}--no-js`);
  };
  const openNav = () => {
    nav.classList.remove(`nav--closed`);
    nav.classList.add(`nav--opened`);
    nav.style.position = `fixed`;
    nav.style.height = `100vh`;
    nav.style.width = `100vw`;
    nav.style.overflowY = `scroll`;
  };
  const closeNav = () => {
    nav.classList.remove(`nav--opened`);
    nav.classList.add(`nav--closed`);
    nav.style.position = ``;
    nav.style.height = ``;
    nav.style.width = ``;
    nav.style.overflowY = ``;

    document.body.style.position = ``;
    document.body.style.top = ``;

    window.removeEventListener(`resize`, closeNav);
    document.removeEventListener(`keydown`, closeNav);
  };

  onElemEnableJs(`page-header__logo`);
  onElemEnableJs(`nav`);

  if (navToggle) {
    navToggle.addEventListener(`click`, () => {

      if (nav.classList.contains(`nav--closed`)) {
        const links = document.querySelectorAll(`.site-list__link`);
        const firstLink = document.querySelector(`.site-list__link:first-of-type`);

        document.body.style.position = `fixed`;
        document.body.style.top = `-${window.scrollY}px`;

        openNav();
        firstLink.focus();

        for (let link of links) {
          link.addEventListener(`click`, closeNav);
        }

        window.addEventListener(`resize`, closeNav);
        document.addEventListener(`keydown`, onMenuEscPress);

      } else {
        const scrollY = document.body.style.top;

        window.scrollTo(0, parseInt(scrollY || `0`, 10) * -1);

        closeNav();
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
        tel.setCustomValidity(`Numbers only!`);
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
        tel.setCustomValidity(`It seems you forgot to leave your phone number!`);
        tel.classList.add(`input-invalid`);
      } else if (tel.value.match(NUMS_ONLY).length < PHONE_LENGTH) {
        tel.setCustomValidity(`Phone number should be ${PHONE_LENGTH} digits, ${PHONE_LENGTH - tel.value.match(NUMS_ONLY).length} left`);
        tel.classList.add(`input-invalid`);
      } else if (tel.value.match(NUMS_ONLY).length > PHONE_LENGTH) {
        tel.setCustomValidity(`Phone number should be ${PHONE_LENGTH} digits, now ${tel.value.match(NUMS_ONLY).length}`);
        tel.classList.add(`input-invalid`);
      } else {
        tel.setCustomValidity(``);
        tel.classList.remove(`input-invalid`);
      }
    });
  }
})();
