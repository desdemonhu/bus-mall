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

Image.prototype.calculatePercent = function(){
  return (this.clicked * 100) / this.shown;
};

Image.prototype.displayImageResult = function(){
  var tableRowEl = document.createElement('tr');
  var tableCellEl = document.createElement('td');
  var imageEl = document.createElement('img');
  var imageCaptionEl = document.createElement('td');

  imageEl.setAttribute('src', this.path);
  imageEl.setAttribute('class', 'small');
  imageCaptionEl.textContent = this.clicked + ' votes for the ' + this.name;

  tableCellEl.appendChild(imageEl);
  tableRowEl.appendChild(tableCellEl);
  tableRowEl.appendChild(imageCaptionEl);
  resultsGalleryEl.appendChild(tableRowEl);
};

///Gets shortName from Path
function getShortName(path){
  var shortName = path.split('/');
  shortName = shortName[1];
  shortName = shortName.split('.');
  shortName = shortName[0];
  return shortName;
};

function getShortNameLong(path){
  var shortName = path.split('/');
  shortName = shortName[10];
  shortName = shortName.split('.');
  shortName = shortName[0];
  return shortName;
};

///On click event
function imgClick(event){
  totalClicks += 1;
  console.log('total clicks: ' + totalClicks);

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
  if(totalClicks >= 25){
    ///Display the results
    displayResults();
  }else{
    randomImages(index, imagesArray);
  }
}

///What are current images being displayed
function displayedImgs(){
  var imageOne = document.getElementById('first-image').src;
  var imageTwo = document.getElementById('second-image').src;
  var imageThree = document.getElementById('third-image').src;

  var shortNameOne = getShortNameLong(imageOne);
  var shortNameTwo = getShortNameLong(imageTwo);
  var shortNameThree = getShortNameLong(imageThree);

  var indexOne = -1;
  var indexTwo = -1;
  var indexThree = -1;

  for(var i = 0; i < images.length; i ++){
    if(shortNameOne === images[i].shortName){
      indexOne = i;
    }
    if(shortNameTwo === images[i].shortName){
      indexTwo = i;
    }
    if(shortNameThree === images[i].shortName){
      indexThree = i;
    }
  }
  var indexArray = [indexOne, indexTwo, indexThree];
  console.log(indexArray);
  return indexArray;

}

function randomNumber(){
  var number = Math.floor(Math.random() * ((images.length - 1) - 0 + 1)) + 0;
  return number;
}

///Displays images at random
function randomImages(current, imagesArray) {
  var randomOne = randomNumber();
  var randomTwo = randomNumber();
  var randomThree = randomNumber();

  var comparison;
  if(randomOne === randomTwo || randomOne === randomThree || randomTwo === randomThree){
    comparison = true;
  }

  var matchOne = imagesArray.indexOf(randomOne);
  var matchTwo = imagesArray.indexOf(randomTwo);
  var matchThree = imagesArray.indexOf(randomThree);

  while(comparison || matchOne > -1 || matchTwo > -1 || matchThree > -1){
    randomOne = randomNumber();
    randomTwo = randomNumber();
    randomThree = randomNumber();

    matchOne = imagesArray.indexOf(randomOne);
    matchTwo = imagesArray.indexOf(randomTwo);
    matchThree = imagesArray.indexOf(randomThree);

    if(randomOne === randomTwo || randomOne === randomThree || randomTwo === randomThree){
      comparison = true;
    }else if(matchOne > -1 || matchTwo > -1 || matchThree > -1){
      comparison = true;
    }else {
      comparison = false;
      matchOne = -1;
      matchTwo = -1;
      matchThree = -1;
    }
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

function displayResults(){
  ///Arranges pictures in order of clicks
  arrangeResults();

  firstImageEl.removeEventListener('click', imgClick);
  secondImageEl.removeEventListener('click', imgClick);
  thirdImageEl.removeEventListener('click', imgClick);
  console.log('25 clicks achieved!');

  document.getElementById('voting').style.display = 'none';
  document.getElementById('results-table').style.display = 'block';

  for(var i = 0; i < images.length; i++){
    images[i].displayImageResult();
  }
}

function arrangeResults(){
  images.sort(function(a,b){
    var one = a.clicked;
    var two = b.clicked;

    if(one > two){
      return -1;
    }
    if(one < two){
      return 1;
    }
    return 0;
  });
  console.log('This is arranged array:');
  console.log(images);
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
var resultsGalleryEl = document.getElementById('results-gallery');
var totalClicks = 0;

firstImageEl.addEventListener('click', imgClick);
secondImageEl.addEventListener('click', imgClick);
thirdImageEl.addEventListener('click', imgClick);

randomImages(-1, [-1,-1,-1]);
