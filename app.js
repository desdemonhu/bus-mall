'use strict';
///Display 3 products at a time
///Select 1 of 3 then change all images?
///Track total number of clicks on image
///Precentage of times an item was clicked when it was shown (display vs clicked)
///25 selections then results are displayed


var imageEls = document.getElementsByClassName('medium');

function Image(name, path){
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.clicked = 0;
}

///Create a function that creates new Image objects and push to images array

///create an object for each image
var images = [
  new Image('bag','assets/bag.jpg'),
  new Image('banana', 'assets/banana.jpg')
];

//This is how to get to an images current url:   imageEls["0"].currentSrc
