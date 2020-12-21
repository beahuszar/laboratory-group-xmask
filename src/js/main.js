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
const music = new Audio(xmasmusic);

window.onload = () => {
  mask = document.getElementById('mask');
  maskInitialTop = mask.getBoundingClientRect().top;
  maskInitialBottom = mask.getBoundingClientRect().bottom;
  maskIntialCenter = maskInitialTop + (maskInitialBottom - maskInitialTop) / 2;

  maskContainer = document.getElementById('mask-container');
  maskContainerIninitalHeight = maskContainer.getBoundingClientRect().height;
  maskContainerIninitalBottom = maskContainer.getBoundingClientRect().bottom;

  body = document.querySelector('body');
  woman = document.getElementById('santa-woman');

  xmasText = document.getElementById('merry-xmas');

  maskContainer.addEventListener('transitionend', maskAnimationOver);

  maskContainer.addEventListener('mousedown', dragStart);
  maskContainer.addEventListener('touchstart', dragStart);

  maskContainer.addEventListener('mousemove', dragMove);
  maskContainer.addEventListener('touchmove', dragMove);

  maskContainer.addEventListener('mouseup', dragOver);
  maskContainer.addEventListener('touchend', dragOver);
};

function maskAnimationOver(e) {
  xmasText.style.opacity = '0';
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
  active = false;
  if (music.paused) {
    music.play();
  }
  maskContainer.style.height = `${maskContainerIninitalHeight}px`;
  maskContainer.style.transition = '15s ease-in';
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
