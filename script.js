const triangle = document.querySelector('.mpi-triangle-letter');
const player = document.getElementById('player-dot');
const portalTop = document.getElementById('portal-top');
const portalLeft = document.getElementById('portal-left');
const portalRight = document.getElementById('portal-right');

let clicked = false;

triangle.addEventListener('click', () => {
  if (clicked) return;
  clicked = true;

  triangle.style.animation = 'mpi-slide-into-middle 0.6s ease forwards';

  setTimeout(() => {
    triangle.style.animation = 'mpi-grow-from-middle 2.5s ease-out forwards';
  }, 600);

  setTimeout(() => {
    const rect = triangle.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    player.style.display = 'block';
    px = cx;
    py = cy;
    player.style.left = px + 'px';
    player.style.top = py + 'px';

    const halfW = rect.width / 2;

    const topX = cx;
    const topY = rect.top;

    const leftX = cx - halfW;
    const leftY = rect.bottom;

    const rightX = cx + halfW;
    const rightY = rect.bottom;

    portalTop.style.left = (topX - 20) + 'px';
    portalTop.style.top = (topY - 20) + 'px';

    portalLeft.style.left = (leftX - 20) + 'px';
    portalLeft.style.top = (leftY - 20) + 'px';

    portalRight.style.left = (rightX - 20) + 'px';
    portalRight.style.top = (rightY - 20) + 'px';

    portalTop.style.display = 'block';
    portalLeft.style.display = 'block';
    portalRight.style.display = 'block';

  }, 3200);
});

let px = window.innerWidth / 2;
let py = window.innerHeight / 2;
const speed = 3;
const keys = { w: false, a: false, s: false, d: false };

document.addEventListener('keydown', e => {
  if (keys[e.key] !== undefined) keys[e.key] = true;
});

document.addEventListener('keyup', e => {
  if (keys[e.key] !== undefined) keys[e.key] = false;
});

function isInsideTriangle(x, y, ax, ay, bx, by, cx, cy) {
  function sign(x1, y1, x2, y2, x3, y3) {
    return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
  }

  const d1 = sign(x, y, ax, ay, bx, by);
  const d2 = sign(x, y, bx, by, cx, cy);
  const d3 = sign(x, y, cx, cy, ax, ay);

  const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

  return !(hasNeg && hasPos);
}

function gameLoop() {
  if (player.style.display === 'block') {
    if (keys.w) py -= speed;
    if (keys.s) py += speed;
    if (keys.a) px -= speed;
    if (keys.d) px += speed;

    player.style.left = px + 'px';
    player.style.top = py + 'px';

    const rect = triangle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const ay = rect.top;
    const halfW = rect.width / 2;

    const ax = cx;
    const bx = cx - halfW;
    const by = rect.bottom;
    const cx2 = cx + halfW;
    const cy2 = rect.bottom;

    if (isInsideTriangle(px, py, ax, ay, bx, by, cx2, cy2)) {
      player.style.background = 'black';
    } else {
      player.style.background = 'white';
    }
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
