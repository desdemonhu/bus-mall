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
  var shortName = path.split('/');
  shortName = shortName[1].split('.');
  shortName = shortName[0];
  this.idTag = 'img-' + shortName;
}

//This is how to get to an images current url:   imageEls["0"].currentSrc

Image.prototype.changeImage = function(){
  ///Get id of image clicked
  ///Change .src of that ID
};
///Create a function that creates new Image objects and push to images array

///create an object for each image

function imgClick(event){
  /// Get's image in image array and updates +1 clicked
  ///changes image
  ///Get's new image from array and updates shown +1
}

///Displays first set of images at random
function randomImages() {
  ///random number from number of items in array
  var randomOne = Math.floor(Math.random() * ((images.length - 1) - 0 + 1)) + 0;
  var randomTwo = Math.floor(Math.random() * ((images.length - 1) - randomOne + 1)) + 0;
  var randomThree = Math.floor(Math.random() * ((images.length - 1) - randomTwo + 1)) + 0;
  ///Gets path of image and puts in src of image ids
  firstImageEl.src = images[randomOne].path;
  secondImageEl.src = images[randomTwo].path;
  thirdImageEl.src = images[randomThree].path;
}

var images = [
  new Image('bag','img/bag.jpg'),
  new Image('banana', 'img/banana.jpg'),
  new Image('bathroom','img/bathroom.jpg'),
  new Image('boots', 'img/boots.jpg'),
  new Image('breakfast', 'img/breakfast.jpb'),
  new Image('bubblegum', 'img/bubblegum'),
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
console.log(firstImageEl);

randomImages();
