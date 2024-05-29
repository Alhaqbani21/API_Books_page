let userName = document.getElementById('userNameHeader');
let cardsSection = document.getElementById('cardsSection');

if (localStorage.length == 3) {
  console.log(1);
  userName.innerText = `Welcome: `;
  userNameText = document.createElement('span');
  userNameText.innerText = localStorage.getItem('userName');
  userNameText.style.color = 'green';
  userName.append(userNameText);
  fetchBooks();
} else {
  let flexSection = document.createElement('div');
  flexSection.classList.add('flexSection');
  let textAuthorized = document.createElement('h1');
  textAuthorized.innerText = 'Access not authorized';
  textAuthorized.classList.add('text-danger');
  textAuthorized.classList.add('bg-light-subtle');
  textAuthorized.style.padding = '1rem';
  textAuthorized.style.borderRadius = '10px';
  flexSection.appendChild(textAuthorized);
  cardsSection.appendChild(flexSection);
}

async function fetchBooks() {
  let url = 'https://freetestapi.com/api/v1/books';

  let res = await fetch(url, { method: 'GET' });
  let data = await res.json();
  console.log(data);
  data.forEach((element) => {
    let card = document.createElement('div');
    card.style.width = '18rem';
    card.classList.add('card');
    let img = document.createElement('img');
    img.style.height = '25rem';
    img.src = element.cover_image;
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    let title = document.createElement('h3');
    title.style.fontSize = '1em';
    title.innerText = element.title;
    let cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerText = element.description;

    cardBody.append(title);
    cardBody.append(cardText);
    card.append(img);
    card.append(cardBody);
    cardsSection.append(card);
  });
}

let signOut = document.getElementById('signOut');

signOut.addEventListener('click', () => {
  localStorage.clear();
  cardsSection.remove();
  window.location.reload();
});
