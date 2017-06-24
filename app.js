'use strict';
///Display 3 products at a time, new each time
///Click on image and track number of clicks on image
///Select 1 of 3 then change all images?
///Track total number of clicks on image
///Precentage of times an item was clicked when it was shown (display vs clicked)
///25 selections then results are displayed. No clicks anymore
///Results of all images # of votes for nameOfImage


function Image(name, path){
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.clicked = 0;
  this.shortName = this.path.split('/');
  this.shortName = this.shortName[1].split('.');
  this.shortName = this.shortName[0];
  this.idTag = 'img-' + this.shortName;
}

//This is how to get to an images current url:   imageEls["0"].currentSrc

Image.prototype.changeImage = function(){
  ///Get id of image clicked
  ///Change .src of that ID
};

function imgClick(event){
  /// Get's image in image array and updates +1 clicked
  var imgName = event.target.src;
  imgName = imgName.split('/');
  var imgPath = imgName[10];
  imgPath = imgPath.split('.');
  imgPath = imgPath[0];
  console.log(imgPath);
  var index = -1;

  for(var i = 0; i < images.length; i++ ){
    if(images[i].shortName === imgPath){
      index = i;
      console.log(index);
    }
  }
  ///changes image
  ///Get's new image from array and updates shown +1
}

///Displays first set of images at random
function randomImages() {
  ///random number from number of items in array
  var randomOne = Math.floor(Math.random() * ((images.length - 1) - 0 + 1)) + 0;
  var randomTwo = Math.floor(Math.random() * ((images.length - 1) - randomOne + 1)) + randomOne;
  var randomThree = Math.floor(Math.random() * ((images.length - 1) - 0 + 1)) + 0;

  if(randomOne === randomTwo || randomOne === randomThree || randomTwo === randomThree){
    randomOne = 1;
    randomTwo = 2;
    randomThree = 3;
  }
  ///Gets path of image and puts in src of image ids
  firstImageEl.src = images[randomOne].path;
  secondImageEl.src = images[randomTwo].path;
  thirdImageEl.src = images[randomThree].path;

  ///Update image shown
  images[randomOne].shown += 1;
  images[randomTwo].shown += 1;
  images[randomThree].shown += 1;
}

var images = [
  new Image('bag','img/bag.jpg'),
  new Image('banana', 'img/banana.jpg'),
  new Image('bathroom','img/bathroom.jpg'),
  new Image('boots', 'img/boots.jpg'),
  new Image('breakfast', 'img/breakfast.jpg'),
  new Image('bubblegum', 'img/bubblegum.jpg'),
  new Image('chair', 'img/chair.jpg'),
  new Image('cthulhu', 'img/cthulhu.jpg'),
  new Image('dog-duck', 'img/dog-duck.jpg'),
  new Image('dragon', 'img/dragon.jpg'),
  new Image('pen', 'img/pen.jpg'),
  new Image('pet-sweep', 'img/pet-sweep.jpg'),
  new Image('scissors', 'img/scissors.jpg'),
  new Image('shark', 'img/shark.jpg'),
  new Image('sweep', 'img/sweep.png'),
  new Image('tauntun', 'img/tauntaun.jpg'),
  new Image('unicorn', 'img/unicorn.jpg'),
  new Image('usb', 'img/usb.gif'),
  new Image('water-can', 'img/water-can.jpg'),
  new Image('wine-glass', 'img/wine-glass.jpg')
];

var firstImageEl = document.getElementById('first-image');
var secondImageEl = document.getElementById('second-image');
var thirdImageEl = document.getElementById('third-image');

firstImageEl.addEventListener('click', imgClick);
secondImageEl.addEventListener('click', imgClick);
thirdImageEl.addEventListener('click', imgClick);

randomImages();
