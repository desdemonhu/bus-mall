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
  this.shortName = getShortName(this.path);
  this.idTag = 'img-' + this.shortName;
}

///Gets shortName from Path
function getShortName(path){
  var shortName = path.split('/');
  shortName = shortName[1];
  shortName = shortName.split('.');
  shortName = shortName[0];
  return shortName;
};

///On click event
function imgClick(event){
  var imgName = event.target.src;
  imgName = imgName.split('/');
  imgName = imgName[10];
  var imgPath = imgName.split('.');
  var imgPath = imgPath[0];
  console.log(imgPath);

  //mark where in images array the shortName is found
  var index = -1;

/// Gets image in image array
  for(var i = 0; i < images.length; i++ ){
    if(images[i].shortName === imgPath){
      index = i;
      console.log(index);
    }
  }
  if(index > -1){
  ///updates +1 clicked
    images[index].clicked += 1;
    console.log(images[index]);
  }
///Gets what images are currently being displayed and puts them in an array
  var imagesArray = displayedImgs();

  ///changes image
  ///Get's new image from array and updates shown +1
  randomImages(index, imagesArray);
}

///What are current images being displayed
function displayedImgs(){
  var imageOne = document.getElementById('first-image').src;
  var imageTwo = document.getElementById('second-image').src;
  var imageThree = document.getElementById('third-image').src;

  var shortNameOne = getShortName(imageOne);
  var shortNameTwo = getShortName(imageTwo);
  var shortNameThree = getShortName(imageThree);

  var indexOne;
  var indexTwo;
  var indexThree;

  for(var i = 0; i < images.length; i ++){
    if(shortNameOne === images[i].shortName){
      indexOne = i;
    }else if(shortNameTwo === images[i].shortName){
      indexTwo = i;
    }else if(shortNameThree === images[i].shortName){
      indexThree = i;
    }
  }
  var indexArray = [indexOne, indexTwo, indexThree];
  return indexArray;

}

///Displays images at random
function randomImages(current, imagesArray) {
  ///random number from number of items in array
  var indexOne = imagesArray[0];
  var indexTwo = imagesArray[1];
  var indexThree = imagesArray[2];

  var randomOne = Math.floor(Math.random() * ((images.length - 1) - 0 + 1)) + 0;
  var randomTwo = Math.floor(Math.random() * ((images.length - 1) - (randomOne + 1))) + randomOne;
  var randomThree = Math.floor(Math.random() * ((randomOne - 1) - 0 + 1)) + 0;

  if(randomOne === randomTwo || randomOne === randomThree || randomTwo === randomThree){
    var randomOne = Math.floor(Math.random() * ((images.length - 1) - 0 + 1)) + 0;
    var randomTwo = Math.floor(Math.random() * ((images.length - 1) - (randomOne + 1))) + randomOne;
    var randomThree = Math.floor(Math.random() * ((randomOne - 1) - 0 + 1)) + 0;
  } else if(randomOne === current || randomOne === indexOne || randomOne === indexTwo || randomOne === indexThree){ ///Change random number if it equals current index
    randomOne = Math.floor(Math.random() * ((images.length - 1) - (current + 1) + 1)) + (current + 1);
  }else if(randomTwo === current || randomTwo === indexOne || randomTwo === indexTwo || randomTwo === indexThree){
    randomTwo = Math.floor(Math.random() * ((images.length - 1) - (current + 1) + 1)) + (current + 1);
  } else if(randomThree === current || randomThree === indexOne || randomThree === indexTwo || randomThree === indexThree){
    randomThree = Math.floor(Math.random() * ((images.length - 1) - (current + 1) + 1)) + (current + 1);
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

randomImages(-1, [-1,-1,-1]);
