const displayMembers = async () => {
  const cards = document.querySelector('.business-cards');
  cards.innerHTML = '';

  try {
    const response = await fetch('members.json');
    const data = await response.json();
    console.log(data);

    data.forEach((member) => {
      const card = document.createElement('section');
      card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy">
      <div>
        <h3>${member.name}</h3>
        <p>${member.tagline}</p>
        <p><a href="tel:${member.phone}">${member.phone}</a></p>
        <p><a href="${member.url}" target="_blank">${member.url}</a></p>
      </div>
    `;
      cards.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

displayMembers();
