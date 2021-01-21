'use strict';
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
