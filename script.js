let px = 0;
let py = 0;
const speed = 3;
const keys = { w: false, a: false, s: false, d: false };

const triangle = document.querySelector('.mpi-triangle-letter');
const player = document.getElementById('player-dot');
const wasd = document.getElementById('wasd-tutorial');

const cornerTop = document.getElementById('corner-top');
const cornerLeft = document.getElementById('corner-left');
const cornerRight = document.getElementById('corner-right');

const markerTop = document.getElementById('marker-top');
const markerLeft = document.getElementById('marker-left');
const markerRight = document.getElementById('marker-right');

let clicked = false;
let tutorialActive = false;
let tutorialInterval = null;

triangle.addEventListener('click', () => {
  if (clicked) return;
  clicked = true;

  triangle.style.animation = 'mpi-slide-in 0.6s forwards';

  setTimeout(() => {
    triangle.style.animation = 'mpi-grow 2.5s ease-out forwards';
  }, 600);

  setTimeout(() => {
    const rect = triangle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const topY = rect.top;
    const bottomY = rect.bottom;
    const halfW = rect.width / 2;

    wasd.style.left = cx + 'px';
    wasd.style.top = (topY + bottomY) / 2 + 'px';
    wasd.style.transform = 'translate(-50%, -50%)';
    wasd.style.display = 'flex';

    const centroidX = (cx + (cx - halfW) + (cx + halfW)) / 3;
    const centroidY = (topY + bottomY + bottomY) / 3;

    px = centroidX - 11;
    py = centroidY - 11;

    player.style.left = px + 'px';
    player.style.top = py + 'px';
    player.style.display = 'block';

    markerTop.style.left = (cx - 3) + 'px';
    markerTop.style.top = (topY - 3) + 'px';

    markerLeft.style.left = (cx - halfW - 3) + 'px';
    markerLeft.style.top = (bottomY - 3) + 'px';

    markerRight.style.left = (cx + halfW - 3) + 'px';
    markerRight.style.top = (bottomY - 3) + 'px';

    cornerTop.style.left = (cx - 22) + 'px';
    cornerTop.style.top = topY + 'px';

    cornerLeft.style.left = (markerLeft.offsetLeft + 7) + 'px';
    cornerLeft.style.top = (markerLeft.offsetTop - 24) + 'px';

    cornerRight.style.left = (markerRight.offsetLeft - 46) + 'px';
    cornerRight.style.top = (markerRight.offsetTop - 24) + 'px';

    cornerTop.style.display = 'block';
    cornerLeft.style.display = 'block';
    cornerRight.style.display = 'block';

    requestAnimationFrame(() => {
      cornerTop.style.opacity = 1;
      cornerLeft.style.opacity = 1;
      cornerRight.style.opacity = 1;
    });

    tutorialActive = true;
    const order = ['btn-w', 'btn-a', 'btn-s', 'btn-d'];
    let i = 0;

    tutorialInterval = setInterval(() => {
      document.querySelectorAll('.wasd-btn').forEach(b => b.classList.remove('active'));
      const el = document.getElementById(order[i]);
      if (el) el.classList.add('active');
      i = (i + 1) % order.length;
    }, 500);

    function placeLabel(text, color, x, y) {
      const label = document.createElement('div');
      label.className = 'triangle-label';
      label.textContent = text;
      label.style.color = color;
      label.style.left = x + 'px';
      label.style.top = y + 'px';
      label.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(label);
    }

    placeLabel('UX/UI DESIGN', '#2f7dff', window.innerWidth / 2, topY - 40);
    placeLabel('ILLUSTRATION', '#ff4040', cx - halfW - 80, bottomY - 20);
    placeLabel('WEB DESIGN', '#00c853', cx + halfW + 80, bottomY - 20);

  }, 3200);
});

function hideTutorial() {
  if (!tutorialActive) return;
  tutorialActive = false;
  clearInterval(tutorialInterval);
  wasd.remove();
}

document.addEventListener('keydown', e => {
  if (keys[e.key] !== undefined) {
    keys[e.key] = true;
    hideTutorial();
  }
});

document.addEventListener('keyup', e => {
  if (keys[e.key] !== undefined) keys[e.key] = false;
});

function gameLoop() {
  if (player.style.display === 'block') {

    if (keys.w) py -= speed;
    if (keys.s) py += speed;
    if (keys.a) px -= speed;
    if (keys.d) px += speed;

    const dotSize = 22;
    const maxX = window.innerWidth - dotSize;
    const maxY = window.innerHeight - dotSize;

    if (px < 0) px = 0;
    if (py < 0) py = 0;
    if (px > maxX) px = maxX;
    if (py > maxY) py = maxY;

    player.style.left = px + 'px';
    player.style.top = py + 'px';
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

