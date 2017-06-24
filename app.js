'use strict';

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
