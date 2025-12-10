document.addEventListener('DOMContentLoaded', () => {
  const messageCountKey = 'form-submissions-count';

  // Logic for the contact page
  const contactForm = document.querySelector('form[action="thankyou.html"]');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      let currentCount = Number(window.localStorage.getItem(messageCountKey)) || 0;
      currentCount++;
      window.localStorage.setItem(messageCountKey, currentCount);
    });
  }

  // Logic for the thank you page
  const countSpan = document.getElementById('submission-count');
  if (countSpan) {
    const count = window.localStorage.getItem(messageCountKey) || 0;
    countSpan.textContent = count;
  }
});
