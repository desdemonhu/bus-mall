'use strict';
///Display 3 products at a time, new each time
///Click on image and track number of clicks on image
///Select 1 of 3 then change all images?
///Track total number of clicks on image
///Precentage of times an item was clicked when it was shown (display vs clicked)
///25 selections then results are displayed. No clicks anymore
///Results of all images # of votes for nameOfImage

function Photo(name, path){
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.clicked = 0;
  this.shortName = getShortName(this.path);
  this.idTag = 'img-' + this.shortName;
}

Photo.prototype.calculatePercent = function(){
  return (this.clicked * 100) / this.shown;
};

Photo.prototype.displayImageResult = function(){
  var sectionEl = document.createElement('section');
  var imageCreateEl = document.createElement('img');
  var captionEl = document.createElement('p');
  var buyButtonEl = document.createElement('button');

  imageCreateEl.src = this.path;
  imageCreateEl.setAttribute('class', 'small');
  sectionEl.setAttribute('id', this.idTag);
  sectionEl.setAttribute('class', 'results-grid');
  captionEl.textContent = this.clicked + ' votes for the ' + this.name;
  captionEl.setAttribute('class', 'results-text');
  buyButtonEl.textContent = 'Buy now!';
  buyButtonEl.setAttribute('class', 'buy-button');

  sectionEl.appendChild(imageCreateEl);
  sectionEl.appendChild(captionEl);
  sectionEl.appendChild(buyButtonEl);
  resultsGalleryEl.appendChild(sectionEl);
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
    document.getElementById('vote-count').textContent = (25 - totalClicks) + ' votes left';
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
  arrayCreation();
  // createChart();
  // createPieChart();

  console.log(itemData);
  firstImageEl.removeEventListener('click', imgClick);
  secondImageEl.removeEventListener('click', imgClick);
  thirdImageEl.removeEventListener('click', imgClick);
  console.log('25 clicks achieved!');

  document.getElementById('voting').style.display = 'none';

  document.getElementById('results-section').style.display = 'block';

  for(var i = 0; i < 6; i++){
    images[i].displayImageResult();
  }
}

function arrangeResults(){
  images.sort(function(a,b){
    var one = a.calculatePercent();
    var two = b.calculatePercent();

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

///Creates arrays needed for the charts
function arrayCreation (){
  for(var i = 0; i < images.length; i++){
    itemLabels.push(images[i].name);
    itemData.push(images[i].clicked);
    if(i < 5){
      pieLabels.push(images[i].name);
      pieData.push(images[i].calculatePercent());
    }
  }
}

function showVoting(event){
  document.getElementById('results-section').style.display = 'none';
  document.getElementById('catalogue-button').style.display = 'inline-block';
  document.getElementById('pie-chart-h1').textContent = 'Top 5 by Percentage of Clicks';
  createPieChart();
  createChart();
  saveStatsToLocalStorage(itemData);
}

///For charts
var itemLabels = [];
var itemData = [];
var pieLabels = [];
var pieData = [];

var images = [
  new Photo('bag','img/bag.jpg'),
  new Photo('banana', 'img/banana.jpg'),
  new Photo('bathroom','img/bathroom.jpg'),
  new Photo('boots', 'img/boots.jpg'),
  new Photo('breakfast', 'img/breakfast.jpg'),
  new Photo('bubblegum', 'img/bubblegum.jpg'),
  new Photo('chair', 'img/chair.jpg'),
  new Photo('cthulhu', 'img/cthulhu.jpg'),
  new Photo('dog-duck', 'img/dog-duck.jpg'),
  new Photo('dragon', 'img/dragon.jpg'),
  new Photo('pen', 'img/pen.jpg'),
  new Photo('pet-sweep', 'img/pet-sweep.jpg'),
  new Photo('scissors', 'img/scissors.jpg'),
  new Photo('shark', 'img/shark.jpg'),
  new Photo('sweep', 'img/sweep.png'),
  new Photo('tauntun', 'img/tauntaun.jpg'),
  new Photo('unicorn', 'img/unicorn.jpg'),
  new Photo('usb', 'img/usb.gif'),
  new Photo('water-can', 'img/water-can.jpg'),
  new Photo('wine-glass', 'img/wine-glass.jpg')
];

var firstImageEl = document.getElementById('first-image');
var secondImageEl = document.getElementById('second-image');
var thirdImageEl = document.getElementById('third-image');
var resultsGalleryEl = document.getElementById('results-section');
var resultsButtonEl = document.getElementById('voting-results');
var totalClicks = 0;

firstImageEl.addEventListener('click', imgClick);
secondImageEl.addEventListener('click', imgClick);
thirdImageEl.addEventListener('click', imgClick);
resultsButtonEl.addEventListener('click',showVoting);

///Re show voting results if Your Catalogue button is clicked
document.getElementById('catalogue-button').addEventListener('click', function(){
  resultsGalleryEl.style.display = 'inline-block';
});

randomImages(-1, [-1,-1,-1]);

var ctx = document.getElementById('results-chart').getContext('2d');
var pieCtx = document.getElementById('results-pie-graph').getContext('2d');

function createPieChart (){
  var myPieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: pieLabels,
      datasets: [{
        data: pieData,
        backgroundColor: [
          'red',
          'yellow',
          'green',
          'blue',
          'purple'
        ]
      }]
    }
  });
}

function createChart(){
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemLabels,
      datasets: [{
        label: '# of Votes',
        data: itemData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

///Pull in stats from chart and stringify it
function saveStatsToLocalStorage(stats){
  var imagesString = JSON.stringify(images);
  localStorage.images = imagesString;
}
