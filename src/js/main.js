window.onload = () => {
  const mask = document.getElementById('mask');

  mask.addEventListener('mousedown', dragStart);
  mask.addEventListener('mousemove', dragMove);
  mask.addEventListener('mouseup', dragOver);

  mask.addEventListener('touchstart', dragStart);
  mask.addEventListener('touchmove', dragMove);
  mask.addEventListener('touchend', dragOver);
};

let active = false;

function dragStart(e) {
  active = true;
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
}

function moveMask(mask, actionY) {
  mask.style.transform = `translate(3px, calc(${
    (actionY / window.innerHeight) * 100
  }vh * 0.43))`;
}
