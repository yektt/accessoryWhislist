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


// HatNodeList -> from static HTML
const HatArray = [];
const HatsNodeList = document.querySelectorAll('.accessory');
let HTMLname, HTMLprice, HTMLcolor, HTMLimageHref;

//for getting informations about hats form HTML part
for (let i = 0; i < HatsNodeList.length; i++) {
  HTMLprice = HatsNodeList[i].getElementsByClassName('currency')[0].textContent;
  HTMLimageHref = HatsNodeList[i].getElementsByClassName('card-img-top')[0].src;
  HTMLname = HatsNodeList[i].getElementsByClassName('card-body')[0].querySelector('h5').textContent;
  HTMLcolor = HatsNodeList[i].getElementsByClassName('card-body')[0].querySelector('em').textContent;

  //creating a Hat object and adding it to the HatArray for storing the hats-data
  const hat = new Hat(HTMLname, HTMLprice, HTMLcolor, HTMLimageHref);
  HatArray.push(hat);
}

