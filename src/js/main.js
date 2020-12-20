import xmasmusic from '../media/Background_Music_Box_Music.mp3';

window.onload = () => {
  const mask = document.getElementById('mask');
  const body = document.querySelector('body');

  mask.addEventListener('mousedown', dragStart);
  mask.addEventListener('mousemove', dragMove);
  body.addEventListener('mouseup', dragOver);

  mask.addEventListener('touchstart', dragStart);
  mask.addEventListener('touchmove', dragMove);
  body.addEventListener('touchend', dragOver);
};

let active = false;
const music = new Audio(xmasmusic);

function dragStart(e) {
  active = true;
  music.play();
}

function dragMove(e) {
  if (active) {
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
  music.pause();
}

function moveMask(mask, actionY) {
  mask.style.transform = `translate(3px, calc(${
    (actionY / window.innerHeight) * 100
  }vh * 0.43))`;
}
