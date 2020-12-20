import xmasmusic from '../media/Background_Music_Box_Music.mp3';

let active = false;
const music = new Audio(xmasmusic);

window.onload = () => {
  const mask = document.getElementById('mask');
  const body = document.querySelector('body');
  const woman = document.getElementById('santa-woman');

  mask.addEventListener('transitionend', maskAnimationOver);
  mask.addEventListener('mousedown', dragStart);
  mask.addEventListener('mousemove', dragMove);
  body.addEventListener('mouseup', dragOver);

  mask.addEventListener('touchstart', dragStart);
  mask.addEventListener('touchmove', dragMove);
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
      moveMask(e.currentTarget, e.touches[0].clientY);
    } else {
      moveMask(e.currentTarget, e.clientY);
    }
  }
}

function dragOver(e) {
  active = false;
  mask.style.transform = `translate(3px, calc(65vh * 0.43))`;
  mask.style.transition = '3s ease-in';
}

function moveMask(mask, actionY) {
  mask.style.transform = `translate(3px, calc(${
    (actionY / window.innerHeight) * 100
  }vh * 0.43))`;
}
