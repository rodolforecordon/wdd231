const displayMembers = async () => {
  const cards = document.querySelector('.spotlight');

  try {
    const response = await fetch('members.json');
    const data = await response.json();
    const spotlight = data.filter(({ status }) => status === 'gold' || status === 'silver');
    const randNumber = Math.floor(Math.random() * spotlight.length);
    spotlight.splice(randNumber, 1);
    console.log(spotlight);

    // data.forEach((member) => {
    //   const card = document.createElement('div');
    //   card.setAttribute('class', 'business-card');
    //   card.innerHTML = `
    //   <img src="${member.image}" alt="${member.name} logo" loading="lazy">
    //   <div>
    //     <h3>${member.name}</h3>
    //     <p>${member.tagline}</p>
    //     <p><a href="tel:${member.phone}">${member.phone}</a></p>
    //     <p><a href="${member.url}" target="_blank">${member.url}</a></p>
    //   </div>
    // `;
    //   cards.appendChild(card);
    // });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

document.addEventListener('readystatechange', () => displayMembers());
