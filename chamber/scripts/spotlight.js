const displayMembers = async () => {
  const cards = document.querySelector('#spotlight');

  try {
    const response = await fetch('members.json');
    const data = await response.json();
    const spotlight = data.filter(({ status }) => status === 'gold' || status === 'silver');
    const randNumber = Math.floor(Math.random() * spotlight.length);
    spotlight.splice(randNumber, 1);
    console.log(spotlight);

    spotlight.forEach((member) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'spotlight-card');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <p><a href="tel:${member.phone}">${member.phone}</a></p>
        <p>${member.address}</p>
        <p><a href="${member.url}" target="_blank">${member.url}</a></p>
        <p>${member.status} member</p>
      `;
      cards.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

displayMembers();
