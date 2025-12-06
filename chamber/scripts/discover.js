import { items } from '../data/discover-items.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const messageContainer = document.getElementById('visit-message');

  if (!lastVisit) {
    messageContainer.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const timeSinceLastVisit = now - lastVisit;
    if (timeSinceLastVisit < oneDay) {
      messageContainer.textContent = 'Back so soon! Awesome!';
    } else {
      const daysSinceLastVisit = Math.floor(timeSinceLastVisit / oneDay);
      const dayText = daysSinceLastVisit === 1 ? 'day' : 'days';
      messageContainer.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);

  const grid = document.querySelector('.discover-grid');
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'discover-card';
    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;
    grid.appendChild(card);
  });
});