import xmasmusic from '../media/Background_Music_Box_Music.mp3';

let active = false;
let mask;
let maskInitialTop;
let maskInitialBottom;
let maskIntialCenter;
let maskContainer;
let maskContainerIninitalHeight;
let maskContainerIninitalBottom;
let body;
let woman;
let xmasText;
let maskText;
let arrowDown;
let loader;
const music = new Audio(xmasmusic);

window.onload = () => {
  mask = document.getElementById('mask');
  maskInitialTop = mask.getBoundingClientRect().top;
  maskInitialBottom = mask.getBoundingClientRect().bottom;
  maskIntialCenter = maskInitialTop + (maskInitialBottom - maskInitialTop) / 2;

  maskContainer = document.getElementById('mask-container');
  maskContainerIninitalHeight = maskContainer.getBoundingClientRect().height;
  maskContainerIninitalBottom = maskContainer.getBoundingClientRect().bottom;

  maskText = document.getElementById('mask-text');
  xmasText = document.getElementById('merry-xmas');

  woman = document.getElementById('santa-woman');
  arrowDown = document.getElementById('arrow-down');
  loader = document.getElementById('loader');
  body = document.querySelector('body');

  maskContainer.addEventListener('transitionend', maskAnimationOver);

  maskContainer.addEventListener('mousedown', dragStart);
  maskContainer.addEventListener('touchstart', dragStart);

  maskContainer.addEventListener('mousemove', dragMove);
  maskContainer.addEventListener('touchmove', dragMove);

  body.addEventListener('mouseup', dragOver);
  body.addEventListener('touchend', dragOver);

  body.addEventListener('mouseout', onWindowleave);

  setTimeout(function () {
    woman.style.transition = 'opacity 0.5s ease-in';
    maskContainer.style.opacity = '1';
    woman.style.opacity = '1';
    loader.style.display = 'none';
  }, 1500);
};

function onWindowleave(e) {
  if (
    e.clientY <= 0 ||
    e.clientX <= 0 ||
    e.clientX >= window.innerWidth ||
    e.clientY >= window.innerHeight
  ) {
    dragOver(e);
  }
}

function maskAnimationOver(e) {
  xmasText.style.opacity = '0';
  maskText.style.visibility = 'visible';
  arrowDown.style.visibility = 'visible';
  if (!music.paused) {
    music.pause();
  }
}

function dragStart(e) {
  e.preventDefault();
  active = true;
  if (maskContainer.style.transition !== '') {
    maskContainer.style.transition = '';
  }
  if (music.paused) {
    music.play();
  }
  maskText.style.visibility = 'hidden';
  arrowDown.style.visibility = 'hidden';
}

function dragMove(e) {
  e.preventDefault();
  if (active) {
    xmasText.style.opacity = '1';
    xmasText.style.transition = 'opacity 1s ease-in';
    if (e.type === 'touchmove') {
      moveMask(e.touches[0].clientY);
    } else {
      moveMask(e.clientY);
    }
  }
}

function dragOver(e) {
  e.preventDefault();
  if (active) {
    active = false;
    maskContainer.style.height = `${maskContainerIninitalHeight}px`;
    maskContainer.style.transition = '10s ease-in';
  }
}

function moveMask(cursorY) {
  const maskTop = mask.getBoundingClientRect().top;
  const maskBottom = mask.getBoundingClientRect().bottom;
  const positionDiff = cursorY - maskIntialCenter;
  const wouldShrinkOriginalSize =
    positionDiff < 0 && maskInitialTop === maskTop;

  if (!wouldShrinkOriginalSize && cursorY < maskContainerIninitalBottom) {
    maskContainer.style.height = `${
      maskContainerIninitalHeight + positionDiff
    }px`;
  }
}
