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

// --------------------- Creating Buttons
// creating 'All' button
const buttonAll = document.createElement('button');
buttonAll.className = 'btn btn-outline-secondary';
buttonAll.type = 'button';
buttonAll.textContent = 'All';
document.querySelector('.btn-group').appendChild(buttonAll);

// creating 'Gloves' button
const buttonGloves = document.createElement('button');
buttonGloves.className = 'nav-link btn btn-outline-secondary mr-3';
buttonGloves.textContent = 'Gloves';
const listItem = document.createElement('li');
listItem.className = 'nav-item';
listItem.appendChild(buttonGloves);
document.querySelector('.navbar-nav').appendChild(listItem);

// --------------------- General Declerations
// the NodeList that contains all of the color-filter-buttons (included All button)
const filterByColorNodeList = document.querySelectorAll('.btn-group button');

// HatNodeList -> from static HTML
const HatArray = [];
const HatsNodeList = document.querySelectorAll('.accessory');
let HTMLname, HTMLprice, HTMLcolor, HTMLimageHref;

let accessoryArray = [];
let storeArray = [];
let accessory;

for (let i = 0; i < HatsNodeList.length; i++) {
  HatsNodeList[i].style.display = 'none';
  HatArray.push(createObjectFromHTML(HatsNodeList[i]));
}

function splitting(splitArray) {
  splitArray = splitArray.split('/');
  splitArray = splitArray.slice(splitArray.length - 5);
  splitArray = splitArray.join("/");
  return splitArray;
}

// it's taking one accessory object and creating HTML component
function displayAccessory(accessory, type) {

  const filterByColorNodeList = document.querySelectorAll('.btn-group button');
  // making 'active' the chosen color's button
  for (let i = 0; i < filterByColorNodeList.length; i++) {
    if (filterByColorNodeList[i].classList.contains('active')) {
      filterByColorNodeList[i].classList.remove('active');
    }
  }
  filterByColorNodeList[filterByColorNodeList.length - 1].classList.add('active')

  // adding all the items 'add to wishlist!' button
  const button = document.createElement('button');
  button.className = 'btn btn-outline-primary';
  button.textContent = 'Add to wishlist!';
  let arrImageHref = [];

  // checking that if the item has added to the wish list
  // if yes, adding a 'remove' button instead of 'add to wish list'
  for (let i = 1; i < localStorage.length + 1; i++) {
    arrImageHref = splitting(JSON.parse(localStorage.getItem('accessory' + i)).imageHref);
    let splitArr = splitting(accessory.imageHref);

    if (arrImageHref == splitArr) {
      button.className = 'btn btn-outline-danger clicked';
      button.textContent = 'Remove';
    }
  }

  const paragraph = document.createElement('p');
  paragraph.className = 'card-text';
  paragraph.textContent = 'Color: '

  const em = document.createElement('em');
  em.textContent = accessory.color;

  const h5 = document.createElement('h5');
  h5.className = 'card-title';
  h5.textContent = accessory.name;

  const card_body = document.createElement('div');
  card_body.className = 'card-body text-center';

  const image = document.createElement('img');
  image.className = 'card-img-top';
  image.src = accessory.imageHref;
  image.alt = 'Image of ' + accessory.name.toLowerCase();

  const currency = document.createElement('div');
  currency.className = 'currency btn btn-light disabled'
  currency.textContent = accessory.price;

  const card = document.createElement('div');
  card.className = 'card my-3';

  const div = document.createElement('div');
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

  // checking if the image of the item is exist
  // if not, giving it a new src to show up as default
  image.onerror = function () {
    image.src = "https://via.placeholder.com/350x250";
  }

  const products = document.getElementById('products');
  products.appendChild(div);
}

// for getting informations form HTML part
function createObjectFromHTML(NodeList) {
  HTMLprice = NodeList.getElementsByClassName('currency')[0].textContent;
  HTMLimageHref = NodeList.getElementsByClassName('card-img-top')[0].src;
  HTMLname = NodeList.getElementsByClassName('card-body')[0].querySelector('h5').textContent;
  HTMLcolor = NodeList.getElementsByClassName('card-body')[0].querySelector('em').textContent;

  // creating an Accessory object
  const accessory = new Accessory(HTMLname, HTMLprice, HTMLcolor, HTMLimageHref);
  return accessory;
}

// for displaying Hats 
function HatDisplay() {
  for (let i = 0; i < HatArray.length; i++) {
    displayAccessory(HatArray[i], 'hat');
  }
  wish();
}
// when page is opened, hat will display automatically.
HatDisplay();

// Listening to all of the color-filter buttons to detect whether any of them is clicked.  
filterByColorNodeList.forEach(function (colorFilterButton) {
  colorFilterButton.addEventListener('click', function () {
    highlightSelectedFilter(colorFilterButton);
  });
});

// for changing 'active' class for color filter button
function highlightSelectedFilter(button) {
  if (button.classList.contains('nav-link')) {
    for (let i = 0; i < filterByAccessoriesNodeList.length; i++) {
      filterByAccessoriesNodeList[i].classList.remove('active');
    }
    cleanDOM();
    if (button.textContent.toLowerCase() == 'hats') {
      HatDisplay();
    }
  } else {
    for (let i = 0; i < filterByColorNodeList.length; i++) {
      filterByColorNodeList[i].classList.remove('active');
    }
    filterAccessoriesByColor(button.textContent);
  }
  button.classList.add('active');
}

function filterAccessoriesByColor(filter) {
  const HTMLNodeList = document.querySelectorAll('.fromData');
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

// the NodeList that contains all of the color-filter-buttons (included Gloves button)
const filterByAccessoriesNodeList = document.querySelectorAll('.navbar-nav button');
filterByAccessoriesNodeList[0].classList.add('active');

// Listening to all of the type-filter buttons to detect whether any of them is clicked.  
filterByAccessoriesNodeList.forEach(function (typeFilterButton) {
  typeFilterButton.addEventListener('click', function () {
    highlightSelectedFilter(typeFilterButton);
    if (typeFilterButton.textContent != 'Hats')
      loadRemoteAccessories(typeFilterButton.textContent.toLowerCase());
  });
});

// making XML request to read the responsible file
function loadRemoteAccessories(filter) {
	fetch(`./${filter}.json`)
		.then(response => response.json())
		.then(accessoriesArray  => {
			const accessoryComponents = [];

			for (let i = 0; i < accessoriesArray.length; i++) {
				accessory = new Accessory(accessoriesArray[i].name, accessoriesArray[i].price, accessoriesArray[i].color, accessoriesArray[i].imageHref);
				accessoryComponents.push(accessory);
			}

			showAccessories(accessoryComponents , filter);

			wish();
		})
		.catch(e => {
			console.log(e);
			alert('Something went wrong about file\'s path or name, please be sure you\'ve put your files under to the the right path with right name!');
		});
}

// taking an array and sending one-by-one to the displayAccessory function
function showAccessories(accessoriesArray, type) {
  for (let i = 0; i < accessoriesArray.length; i++) {
    displayAccessory(accessoriesArray[i], type);
  }
}

// for cleaning the DOM, otherwise the objects will show up more than one time.
// with each click to the accessory type, it will run
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

// when the user clicked 'add to wish list' or 'remove' on the product.html:
function wish() {
  let NodeButton = document.querySelectorAll('.card-body button');
  NodeButton.forEach(function (wishedButton) {
    wishedButton.addEventListener('click', function () {
      let wishedItem = wishedButton.parentNode.parentNode.parentNode;
      if (wishedButton.classList.contains('clicked')) {
        wishedButton.textContent = 'Add to wishlist!';
        wishedButton.classList.remove('clicked', 'btn-outline-danger');
        wishedButton.classList.add('btn-outline-primary');
        let imageHrefHTML = wishedItem.querySelector('img').src;
        removingItems(imageHrefHTML);
        // function for deleting element from DOM and wishlist
      } else if (localStorage.length < 3) {
        wishedButton.textContent = 'Remove';
        wishedButton.classList.remove('btn-outline-primary');
        wishedButton.classList.add('clicked', 'btn-outline-danger');
        addToWishList(createObjectFromHTML(wishedItem));
      } else {
        alert('Please remove an item from wish list first!');
      }
    });
  });
}

// if there is less then 3 item in the wishlist/localStorage,
// it will be added to the wish list
function addToWishList(wantedAccessory) {
  if (localStorage.length == 0) {
    localStorage.setItem('accessory1', JSON.stringify(wantedAccessory));
  } else {
    // adding the item by sorting other items first
    for (let i = localStorage.length; i > 0; i--) {
      localStorage.setItem('accessory' + (i + 1), localStorage.getItem('accessory' + i));
      if (i == 1) {
        localStorage.setItem('accessory1', JSON.stringify(wantedAccessory));
      }
    }
  }
}

// removing the items from wishlist
function removingItems(imageHrefHTML) {
  for (let i = localStorage.length; i > 0; i--) {
    let imageHrefLocalStorage = JSON.parse(localStorage.getItem('accessory' + i)).imageHref;
    if (imageHrefHTML.toString() == imageHrefLocalStorage.toString()) {
      localStorage.removeItem('accessory' + i);

      // givin new keys that start from 1 to all elements that stored in localStorage
      for (let k = i; k < 3; k++) {
        if (localStorage.getItem('accessory' + (k + 1)) != null) {
          localStorage.setItem('accessory' + k, localStorage.getItem('accessory' + (k + 1)));
          localStorage.removeItem('accessory' + (k + 1));
        }
      }
    }
  }
}
