// hiding the default example
document.querySelector('.col-sm-4').style.display = 'none';

function displayAccessory(accessory) {

  let button = document.createElement('button');
  button.className = 'btn btn-outline-danger';
  button.textContent = 'Remove';

  let paragraph = document.createElement('p');
  paragraph.className = 'card-text';
  paragraph.textContent = 'Color: '

  let em = document.createElement('em');
  em.textContent = accessory.color;

  let h5 = document.createElement('h5');
  h5.className = 'card-title';
  h5.textContent = accessory.name;

  let card_body = document.createElement('div');
  card_body.className = 'card-body text-center';

  let image = document.createElement('img');
  image.className = 'card-img-top';
  image.src = accessory.imageHref;
  image.alt = 'Card image ' + accessory.name.toLowerCase();

  let currency = document.createElement('div');
  currency.className = 'currency btn btn-light disabled'
  currency.textContent = accessory.price;

  let card = document.createElement('div');
  card.className = 'card my-3';

  let div = document.createElement('div');
  div.className = 'col-sm-4';

  div.appendChild(card);
  card.appendChild(currency);
  card.appendChild(image);
  card.appendChild(card_body);
  card_body.appendChild(h5);
  card_body.appendChild(paragraph);
  card_body.appendChild(button);
  paragraph.appendChild(em);

  let products = document.getElementById('products');
  products.appendChild(div);
}

if (localStorage.length != 0) {
  // if there is/are item/s that stored in localStorage, page will display them
  for (let i = 1; i < localStorage.length+1; i++) {
    displayAccessory(JSON.parse(localStorage.getItem('accessory'+i)));
  }
} else { 
  // if localStorage is empty, the page will warn the user about that there's no item to show
  let warning = document.querySelector('.container h2');
  warning.style.color = '#dc3545';
  warning.textContent = 'Your wishlist is empty. Please add something first!';
}
