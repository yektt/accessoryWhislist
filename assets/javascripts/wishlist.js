// hiding the default example
function hideDefault () {
  document.querySelector('.col-sm-4').style.display = 'none';
}

// it's taking one accessory object and creating HTML component
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

// first hiding the default example
// later sending all the elements that have stored in localStorage 
// to the displayAccessory function to show on the page
function displayWishList () {
  hideDefault();
  let item ;
  for (let i = 1; i < localStorage.length+1; i++) {
    item = JSON.parse(localStorage.getItem('accessory'+i));
    displayAccessory(item);
  }
}

// if there is not any element to show in the localStorage
function warning() {
  let warning = document.querySelector('.container h2');
  warning.style.color = '#dc3545';
  warning.textContent = 'Your wishlist is empty. Please add something first!';
}

if (localStorage.length != 0) {
  // if there is/are item/s that stored in localStorage, page will display them
  displayWishList();
} else { 
  // if localStorage is empty, the page will warn the user about that there's no item to show
  hideDefault();
  warning();
}

// removing from the localStorage/wishlist
function removeFromWishList(key, HTMLcomponent) {
  let i = key.slice(-1);
  i = parseInt(i);
  localStorage.removeItem(key);
  // givin new keys that start from 1 to all elements that stored in localStorage
  for (let k = i; k < 3; k++){
    if (localStorage.getItem('accessory'+(k+1)) != null ){
      localStorage.setItem('accessory'+k, localStorage.getItem('accessory'+(k+1)));
      localStorage.removeItem('accessory'+(k+1));
    }
  }
  HTMLcomponent.parentNode.removeChild(HTMLcomponent);
} 

// listening all the 'remove' button
document.querySelectorAll('.btn-outline-danger').forEach(function (removeBtn) {
 
  removeBtn.addEventListener('click', function () {
  let item = removeBtn.parentNode.parentNode.parentNode;
  let imageHrefHTML =item.querySelector('img').src;
  // removing the item that user would like to remove from wishlist and localStorage
  for (let i = localStorage.length; i > 0; i--){
    let imageHrefLocalStorage = JSON.parse(localStorage.getItem('accessory'+i)).imageHref;
    if (imageHrefHTML.toString() == imageHrefLocalStorage.toString()) {
      removeFromWishList('accessory'+i, item);
    }
  }
  // after every removing action, localStorage will be checked to give warning
  if ( localStorage.length == 0)
    warning();
  });
});


