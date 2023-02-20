/* eslint-disable max-len */
/*
  Welcome to Javascript!

  This file contains parts of a simple script to make your carousel work.
  Please feel free to edit away - the main version of this with all the notes is safely stored elsewhere
*/
/* eslint-enable max-len */
// set our first slide's position to "0", the opening position in an array
let slidePosition = 0;

// gather a reference to every slide we're using via the class name and querySelectorAll
let slides = document.querySelectorAll('.carousel_item');

// change that "NodeList" into a Javascript "array", to get access to "array methods"
let slidesArray = Array.from(slides);

// Figure out how many slides we have available
let totalSlides = slidesArray.length;

function updateSlidePosition() {
  // Loop through all slides and hide them
  slidesArray.forEach((slide) => {
    slide.classList.remove('visible');
    slide.classList.add('hidden');
  });

  // Add visible class to current slide
  slidesArray[slidePosition].classList.add('visible');
}

function moveToNextSlide() {
  // check if at max number of slides
  if (slidePosition === totalSlides - 1) {
    // if so, goes back to first slide
    slidePosition = 0;
  } else {
    // otherwise, goes to the next slide
    slidePosition += 1;
  }
  // call function to update display
  updateSlidePosition();
}

function moveToPrevSlide() {
  // checks if at first index
    if (slidePosition === 0) {
      // if so goes to last slide
      slidePosition = totalSlides - 1;
    } else {
      // otherwise, goes to prev slide
      slidePosition -= 1;
    }
    // sends position to console
    console.log(slidePosition)
    // call function to update display
    updateSlidePosition();
}

/*
  These two functions have been assigned via "addEventListener"
  to the elements accessed by the "querySelector" set to the class name on each
*/
document.querySelector('.next') // Get the appropriate element (<button class="next">)
  .addEventListener('click', () => { // set an event listener on it - when it's clicked, do this callback function
    console.log('clicked next'); // let's tell the client console we made it to this point in the script
    moveToNextSlide(); // call the function above to handle this
  });

// Paying close attention to the above queryselector, write one that fires
// when you want a "prev" slide

document.querySelector('.prev') // Get the appropriate element (<button class="prev">)
  .addEventListener('click', () => { // set an event listener on it - when it's clicked, do this callback function
    console.log('clicked prev'); // let's tell the client console we made it to this point in the script
    moveToPrevSlide(); // call the function above to handle this
  });