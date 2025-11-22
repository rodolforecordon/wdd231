const gridViewButton = document.getElementById('grid-view');
const listViewButton = document.getElementById('list-view');
const membersSection = document.querySelector('.members');

gridViewButton.addEventListener('click', () => {
  membersSection.classList.remove('list-view');
  gridViewButton.classList.add('active');
  listViewButton.classList.remove('active');
});

listViewButton.addEventListener('click', () => {
  membersSection.classList.add('list-view');
  listViewButton.classList.add('active');
  gridViewButton.classList.remove('active');
});
