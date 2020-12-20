import xmasmusic from '../media/Background_Music_Box_Music.mp3';

let active = false;
let mask;
let maskInitialTop;
let maskInitialBottom;
let maskIntialCenter;
let maskContainer;
let maskContainerIninitalHeight;
let body;
let woman;
const music = new Audio(xmasmusic);

window.onload = () => {
  mask = document.getElementById('mask');
  maskInitialTop = mask.getBoundingClientRect().top;
  maskInitialBottom = mask.getBoundingClientRect().bottom;
  maskIntialCenter = maskInitialTop + (maskInitialBottom - maskInitialTop) / 2;

  maskContainer = document.getElementById('mask-container');
  maskContainerIninitalHeight = maskContainer.getBoundingClientRect().height;

  body = document.querySelector('body');
  woman = document.getElementById('santa-woman');

  maskContainer.addEventListener('transitionend', maskAnimationOver);

  mask.addEventListener('mousedown', dragStart);
  mask.addEventListener('touchstart', dragStart);

  body.addEventListener('mousemove', dragMove);
  body.addEventListener('touchmove', dragMove);

  body.addEventListener('mouseup', dragOver);
  body.addEventListener('touchend', dragOver);

  woman.style.opacity = '1';
  woman.style.transition = 'opacity 2s ease-in';
};

function maskAnimationOver(e) {
  music.pause();
}

function dragStart(e) {
  active = true;
  if (mask.style.transition !== '') {
    mask.style.transition = '';
  }
  music.play();
}

function dragMove(e) {
  if (active) {
    const xmasText = document.getElementById('merry-xmas');
    xmasText.style.opacity = '1';
    xmasText.style.transition = 'opacity 2s ease-in';
    if (e.type === 'touchmove') {
      moveMask(e.touches[0].clientY);
    } else {
      moveMask(e.clientY);
    }
  }
}

function dragOver(e) {
  active = false;
  maskContainer.style.height = `${maskContainerIninitalHeight}px`;
  maskContainer.style.transition = '3s ease-in';
}

function moveMask(cursorY) {
  const maskTop = mask.getBoundingClientRect().top;
  const maskBottom = mask.getBoundingClientRect().bottom;
  const positionDiff = cursorY - maskIntialCenter;
  const wouldShrinkOriginalSize =
    positionDiff < 0 && maskInitialTop === maskTop;

  if (!wouldShrinkOriginalSize) {
    maskContainer.style.height = `${
      maskContainerIninitalHeight + positionDiff
    }px`;
  }
}
