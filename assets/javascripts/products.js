// construction function for Hats
function Hat(name, price, color, imageHref) {
  this.name = name,
  this.price = price,
  this.color = color,
  this.imageHref = imageHref
}

Hat.prototype.toString = function () {
  return 'name <' + this.name + '>, color <' + this.color + '>, price <' + this.price + '>, image: <' + this.imageHref + '>';
}

// it's taking one hat object and creating HTML component
function displayHat(hat) {
  let button = document.createElement('button');
  button.className = 'btn btn-outline-primary';
  button.textContent = 'Add to whislist!';

  let paragraph = document.createElement('p');
  paragraph.className = 'card-text';
  paragraph.textContent = 'Color: '

  let em = document.createElement('em');
  em.textContent = hat.color;

  let h5 = document.createElement('h5');
  h5.className = 'card-title';
  h5.textContent = hat.name;

  let card_body = document.createElement('div');
  card_body.className = 'card-body text-center';

  let image = document.createElement('img');
  image.className = 'card-img-top';
  image.src = hat.imageHref;
  image.alt = 'Image of ' + hat.name.toLowerCase();

  let currency = document.createElement('div');
  currency.className = 'currency btn btn-light disabled'
  currency.textContent = hat.price;

  let card = document.createElement('div');
  card.className = 'card my-3';

  let accessory = document.createElement('div');
  accessory.className = 'accessory col-sm-4 fromData';
  accessory.classList.add(hat.color);

  accessory.appendChild(card);
  card.appendChild(currency);
  card.appendChild(image);
  card.appendChild(card_body);
  card_body.appendChild(h5);
  card_body.appendChild(paragraph);
  card_body.appendChild(button);
  paragraph.appendChild(em);

  let products = document.getElementById('products');
  products.appendChild(accessory);
}

// HatNodeList -> from static HTML
const HatArray = [];
const HatsNodeList = document.querySelectorAll('.accessory');
let HTMLname, HTMLprice, HTMLcolor, HTMLimageHref;

// for getting informations about hats form HTML part
for (let i = 0; i < HatsNodeList.length; i++) {
  HTMLprice = HatsNodeList[i].getElementsByClassName('currency')[0].textContent;
  HTMLimageHref = HatsNodeList[i].getElementsByClassName('card-img-top')[0].src;
  HTMLname = HatsNodeList[i].getElementsByClassName('card-body')[0].querySelector('h5').textContent;
  HTMLcolor = HatsNodeList[i].getElementsByClassName('card-body')[0].querySelector('em').textContent;

  // static hats won't show up our page any more
  HatsNodeList[i].style.display = 'none';

  // creating a Hat object and adding it to the HatArray for storing the hats-data
  const hat = new Hat(HTMLname, HTMLprice, HTMLcolor, HTMLimageHref);

  HatArray.push(hat);
}

// for rendering all of the hat objects.
for (let i = 0; i < HatArray.length; i++) {
  displayHat(HatArray[i]);
}

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
  for (let i = 0; i < filterByColorNodeList.length; i++) {
    filterByColorNodeList[i].classList.remove('active');
  }
  button.classList.add('active');
  filterHatByColor(button.textContent);
}

// Listening to all of the filter buttons to detect whether any of them is clicked.  
filterByColorNodeList.forEach(function (filterButton) {
  filterButton.addEventListener('click', function () {
    highlightSelectedFilter(filterButton);
  });
});

function filterHatByColor(filter) {
  let HTMLNodeList = document.querySelectorAll('.fromData');
  // all hats will be removed from page
  for (let i = 0; i < HTMLNodeList.length; i++) {
    HTMLNodeList[i].style.display = 'none';
  }

  // if the hats' color is choosen filter, they will display on the page
  for (let i = 0; i < HTMLNodeList.length; i++) {
    if (HTMLNodeList[i].classList.contains(filter.toLowerCase())) {
      HTMLNodeList[i].style.display = 'inline';
    } else if (filter === 'All') {
      HTMLNodeList[i].style.display = 'inline';
    }
  }
}