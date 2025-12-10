// Hamburger Menu
const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
  mainnav.classList.toggle('open');
  hambutton.classList.toggle('open');
});

// Set current year in footer
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}
