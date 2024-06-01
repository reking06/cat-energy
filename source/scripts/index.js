import './../vendor/leaflet/leaflet.js';

const buttonMenu = document.querySelector('.main-header__toggle');
const navMenu = document.querySelector('.navigation');
const catsComparison = document.querySelector('.slider__wrapper');
const catsBeforeImage = document.querySelector('.slider__item--before');
const catsAfterImage = document.querySelector('.slider__item--after');
const catsDividerLine = document.querySelector('.slider__line');
const subscribeForm = document.querySelector('.newsletters__form');
const subscribeButton = document.querySelector('.form__button');
const emailInput = document.querySelector('.form__input');
/* eslint-disable */
const mapLocation = L.map('site-map').setView([25.000407903048966, -70.99832631139395], 10);
const myIcon = L.icon({className: 'footer__map-icon', iconUrl: 'vendor/leaflet/map-pin.png'});
const locationMarker = L.marker([25.000407903048966, -70.99832631139395], {icon: myIcon}).addTo(mapLocation);
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapLocation);
/* eslint-enable */

navMenu.classList.remove('navigation--nojs');

function dividerMouseMove(event) {
  const dividerLeftX = catsComparison.offsetLeft;
  const dividerWidth = catsComparison.clientWidth;
  let mouseX = (event.clientX || event.touches[0].clientX) - dividerLeftX;
  if (mouseX < 0) {
    mouseX = 0;
  } else if (mouseX > dividerWidth) {
    mouseX = dividerWidth;
  }
  const size = `${((mouseX / dividerWidth) * 100).toFixed(2)}%`;
  catsBeforeImage.style.width = size;
  catsAfterImage.style.clipPath = `inset(0 0 0 ${size})`;
  catsDividerLine.style.left = size;
}

function emailValidate(event) {
  const inputValue = emailInput.value.trim();
  if (inputValue === '' || inputValue === null || !isValidEmail(inputValue)) {
    event.preventDefault();
    emailInput.classList.add('form__input--error');
  }
}

function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
}

buttonMenu.addEventListener('click', () => {
  if (navMenu.classList.contains('navigation--closed')) {
    navMenu.classList.remove('navigation--closed');
    navMenu.classList.add('navigation--opened');
  } else {
    navMenu.classList.remove('navigation--opened');
    navMenu.classList.add('navigation--closed');
  }
});

if (catsComparison) {
  catsComparison.addEventListener('mousemove', dividerMouseMove);
  catsComparison.addEventListener('touchmove', dividerMouseMove);
}

if (subscribeForm) {
  emailInput.addEventListener('focus', () => {
    emailInput.classList.remove('form__input--error');
  });

  subscribeButton.addEventListener('click', (event) => {
    emailValidate(event);
  });
}
