// construction function for Accessories
function Accessory(name, price, color, imageHref) {
  this.name = name,
  this.price = price,
  this.color = color,
  this.imageHref = imageHref
}

Accessory.prototype.toString = function () {
  return 'name <' + this.name + '>, color <' + this.color + '>, price <' + this.price + '>, image: <' + this.imageHref + '>';
}

// it's taking one accessory object and creating HTML component
function displayAccessory(accessory, type) {
  let button = document.createElement('button');
  button.className = 'btn btn-outline-primary';
  button.textContent = 'Add to wishlist!';

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
  image.alt = 'Image of ' + accessory.name.toLowerCase();

  let currency = document.createElement('div');
  currency.className = 'currency btn btn-light disabled'
  currency.textContent = accessory.price;

  let card = document.createElement('div');
  card.className = 'card my-3';

  let div = document.createElement('div');
  div.className = 'accessory col-sm-4 fromData';
  div.classList.add(accessory.color);
  div.classList.add(type);

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

// for display all the hat objects.
function displayHats() {
  for (let i = 0; i < HatArray.length; i++) {
    displayAccessory(HatArray[i], 'hat');
  }
  wish();
}

// HatNodeList -> from static HTML
const HatArray = [];
const HatsNodeList = document.querySelectorAll('.accessory');
let HTMLname, HTMLprice, HTMLcolor, HTMLimageHref;

// for getting informations about hats form HTML part
function createObjectFromHTML (NodeList) {
  HTMLprice = NodeList.getElementsByClassName('currency')[0].textContent;
  HTMLimageHref = NodeList.getElementsByClassName('card-img-top')[0].src;
  HTMLname = NodeList.getElementsByClassName('card-body')[0].querySelector('h5').textContent;
  HTMLcolor = NodeList.getElementsByClassName('card-body')[0].querySelector('em').textContent;

  // creating a Hat object and adding it to the HatArray for storing the hats-data
  const accessory = new Accessory(HTMLname, HTMLprice, HTMLcolor, HTMLimageHref);
  return accessory;
  
}
for (let i = 0; i < HatsNodeList.length; i++) {
  HatsNodeList[i].style.display = 'none';
  HatArray.push(createObjectFromHTML(HatsNodeList[i]));
}
displayHats();

/* ----------------- Filter By Color ----------------- */
// creating 'All' button
let buttonAll = document.createElement('button');
buttonAll.className = 'btn btn-outline-secondary';
buttonAll.type = 'button';
buttonAll.textContent = 'All';
document.querySelector('.btn-group').appendChild(buttonAll);

// the NodeList that contains all of the color-filter-buttons (included All button)
const filterByColorNodeList = document.querySelectorAll('.btn-group button');

// for changing 'active' class for color filter button
function highlightSelectedFilter(button) {
  if (button.classList.contains('nav-link')) {
    for (let i = 0; i < filterByAccessoriesNodeList.length; i++) {
      filterByAccessoriesNodeList[i].classList.remove('active');
    }
    cleanDOM();
    if (button.textContent.toLowerCase() == 'hats') {
      displayHats();
    }
  } else {
    for (let i = 0; i < filterByColorNodeList.length; i++) {
      filterByColorNodeList[i].classList.remove('active');
    }
    filterAccessoriesByColor(button.textContent);
  }
  button.classList.add('active');
}

// Listening to all of the color-filter buttons to detect whether any of them is clicked.  
filterByColorNodeList.forEach(function (colorFilterButton) {
  colorFilterButton.addEventListener('click', function () {
    highlightSelectedFilter(colorFilterButton);
  });
});

function filterAccessoriesByColor(filter) {
  let HTMLNodeList = document.querySelectorAll('.fromData');
  // all accessories will be removed from page
  for (let i = 0; i < HTMLNodeList.length; i++) {
    HTMLNodeList[i].style.display = 'none';
  }

  // if the accoessories' color is the same with choosen filter, they will display on the page
  for (let i = 0; i < HTMLNodeList.length; i++) {
    if (HTMLNodeList[i].classList.contains(filter.toLowerCase())) {
      HTMLNodeList[i].style.display = 'inline';
    } else if (filter === 'All') {
      HTMLNodeList[i].style.display = 'inline';
    }
  }
}

/* ----------------- Socks and Sunglasses ----------------- */
let accessoryArray = [];
let accessory;

// creating 'Gloves' button
let buttonGloves = document.createElement('button');
buttonGloves.className = 'nav-link btn btn-outline-secondary mr-3';
buttonGloves.textContent = 'Gloves';
let listItem = document.createElement('li');
listItem.className = 'nav-item';
listItem.appendChild(buttonGloves);
document.querySelector('.navbar-nav').appendChild(listItem);

// the NodeList that contains all of the color-filter-buttons (included Gloves button)
const filterByAccessoriesNodeList = document.querySelectorAll('.navbar-nav button');

// Listening to all of the type-filter buttons to detect whether any of them is clicked.  
filterByAccessoriesNodeList.forEach(function (typeFilterButton) {
  typeFilterButton.addEventListener('click', function () {
    highlightSelectedFilter(typeFilterButton);
    if (typeFilterButton.textContent != 'Hats')
      loadRemoteAccessories(typeFilterButton.textContent.toLowerCase());
  });
});

// 
function loadRemoteAccessories(filter) {

  let request = new XMLHttpRequest();
  request.open('GET', './' + filter + '.json');
  request.onload = function () {
    let accessoriesArray = JSON.parse(request.responseText);
    for (let i = 0; i < accessoriesArray.length; i++) {
      accessory = new Accessory(accessoriesArray[i].name, accessoriesArray[i].price, accessoriesArray[i].color, accessoriesArray[i].imageHref);
      accessoryArray.push(accessory);
    }
    showAccessories(accessoryArray, filter);
    accessoryArray = [];
    wish();
  };
  request.send();
}

function showAccessories(accessoriesArray, type) {
  for (let i = 0; i < accessoriesArray.length; i++) {
    displayAccessory(accessoriesArray[i], type);
  }
}

// for cleaning the DOM, otherwise the objects will show up more than one time.
function cleanDOM() {
  removeElementsFromDOM('hat');
  removeElementsFromDOM('socks');
  removeElementsFromDOM('sunglasses');
  removeElementsFromDOM('gloves');
}

function removeElementsFromDOM(type) {
  let removeElement = document.querySelectorAll('.' + type);
  for (let i = 0; i < removeElement.length; i++) {
    removeElement[i].remove();
  }
}


/* ----------------- The wishlist ----------------- */
let storeArray = [];
function wish () {
  let NodeButton = document.querySelectorAll('.card-body button');
  NodeButton.forEach(function(wishedButton){
    wishedButton.addEventListener('click', function() {
      let wishedItem = wishedButton.parentNode.parentNode.parentNode;
      if (wishedButton.classList.contains('clicked'))
      {
        wishedButton.textContent = 'Add to wishlist!';
        wishedButton.classList.remove('clicked', 'btn-outline-danger');
        wishedButton.classList.add('btn-outline-primary');
        // function for deleting element from DOM and wishlist
      } else if (localStorage.length < 4) {
        wishedButton.textContent = 'Remove';
        wishedButton.classList.remove('btn-outline-primary');
        wishedButton.classList.add('clicked', 'btn-outline-danger'); 
        addToWishList(createObjectFromHTML(wishedItem));
      } else {
        // wish list is full
      }
    });
  });
}

function addToWishList(wantedAccessory) {
  if (localStorage.length == 0)
  {
    localStorage.setItem('accessory1', JSON.stringify(wantedAccessory));
  } else {
    for (let i = localStorage.length; i > 0; i--){
      localStorage.setItem('accessory'+ (i+1), localStorage.getItem('accessory'+i));
      if ( i == 1 )
      {
        localStorage.setItem('accessory1', JSON.stringify(wantedAccessory));
      }
    }
  }
}

if (localStorage.length == 0) {
  console.log('no products storing')
}
