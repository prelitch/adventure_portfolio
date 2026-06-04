(() => {
  const old = document.getElementById('matthew-portfolio-intro');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'matthew-portfolio-intro';
  overlay.innerHTML = `
    <div class="mpi-center">
      <div class="mpi-title">
        M
        <span class="mpi-triangle-wrapper">
          <span class="mpi-triangle-letter"></span>
        </span>
        <span class="mpi-rest">TTHEW</span>
      </div>
      <div class="mpi-surname">WOLSTENCROFT</div>
      <div class="mpi-portfolio">PORTFOLIO</div>
      <div class="mpi-sub">CLICK TRIANGLE TO START</div>
    </div>
  `;
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    #matthew-portfolio-intro {
      position: fixed;
      inset: 0;
      background: #050509;
      color: #fff;
      font-family: system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      text-align: center;
    }

    .mpi-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translateY(80px);
    }

    .mpi-title {
      font-size: 60px;
      letter-spacing: 0.12em;
      margin-bottom: 10px;
      white-space: nowrap;
      text-align: center;
      position: relative;
    }

    .mpi-triangle-wrapper {
      display: inline-block;
      width: 16px;
      height: 40px;
      position: relative;
    }

    .mpi-rest {
      display: inline-block;
      margin-left: 0px;
    }

    .mpi-surname,
    .mpi-portfolio {
      font-size: 28px;
      letter-spacing: 0.15em;
      margin-top: 6px;
    }

    .mpi-sub {
      font-size: 14px;
      letter-spacing: 0.2em;
      opacity: 0.7;
      margin-top: 30px;
    }

    .mpi-triangle-letter {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-left: 22px solid transparent;
      border-right: 22px solid transparent;
      border-bottom: 36px solid #ffffff;
      cursor: pointer;
      animation: mpi-bob 1.2s ease-in-out infinite;
      z-index: 1000000;
    }

    @keyframes mpi-bob {
      0%   { transform: translate(-50%, -50%) translateY(0); }
      50%  { transform: translate(-50%, -50%) translateY(-10px); }
      100% { transform: translate(-50%, -50%) translateY(0); }
    }

    @keyframes mpi-slide-into-middle {
      0%   { transform: translate(-50%, -50%) translateX(0) scale(1); }
      100% { transform: translate(-50%, -50%) translateX(75px) scale(1.2); }
    }

    @keyframes mpi-grow-from-middle {
      0%   { transform: translate(-50%, -50%) translateX(75px) scale(1.2); }
      100% { transform: translate(-50%, -50%) translateX(75px) scale(23); }
    }

    .vertex-marker {
      position: fixed;
      width: 6px;
      height: 6px;
      background: red;
      opacity: 0;
      pointer-events: none;
      z-index: 999999999;
    }

    .corner {
      position: fixed;
      width: 0;
      height: 0;
      display: none;
      z-index: 9999998;
      border-left: 22px solid transparent;
      border-right: 22px solid transparent;
      border-bottom: 36px solid #2f7dff;
      opacity: 0;
      transition: opacity 2.4s ease-out;
    }

    #corner-left {
      transform: rotate(121deg);
      border-bottom-color: #ff4040;
    }

    #corner-right {
      transform: rotate(239deg);
      border-bottom-color: #00c853;
    }

    #wasd-tutorial {
      position: fixed;
      display: none;
      flex-direction: column;
      gap: 14px;
      z-index: 999999999;
      pointer-events: none;
    }

    .wasd-row {
      display: flex;
      gap: 14px;
      justify-content: center;
    }

    .wasd-btn {
      width: 90px;
      height: 90px;
      border-radius: 12px;
      background: linear-gradient(#f2f2f2, #d9d9d9);
      border: 4px solid #ffffff;
      box-shadow:
        0px 6px 0px #b5b5b5,
        0px 0px 18px rgba(255,255,255,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
      font-weight: 700;
      color: #000;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .wasd-btn.active {
      transform: translateY(6px);
      box-shadow:
        0px 2px 0px #b5b5b5,
        0px 0px 10px rgba(255,255,255,0.15);
    }
  `;
  document.head.appendChild(style);

  const triangle = overlay.querySelector('.mpi-triangle-letter');

  const player = document.createElement('div');
  player.id = 'player-dot';
  document.body.appendChild(player);

  const markerTop = document.createElement('div');
  markerTop.className = 'vertex-marker';

  const markerLeft = document.createElement('div');
  markerLeft.className = 'vertex-marker';

  const markerRight = document.createElement('div');
  markerRight.className = 'vertex-marker';

  document.body.appendChild(markerTop);
  document.body.appendChild(markerLeft);
  document.body.appendChild(markerRight);

  const cornerTop = document.createElement('div');
  cornerTop.id = 'corner-top';
  cornerTop.className = 'corner';

  const cornerLeft = document.createElement('div');
  cornerLeft.id = 'corner-left';
  cornerLeft.className = 'corner';

  const cornerRight = document.createElement('div');
  cornerRight.id = 'corner-right';
  cornerRight.className = 'corner';

  document.body.appendChild(cornerTop);
  document.body.appendChild(cornerLeft);
  document.body.appendChild(cornerRight);

  const wasd = document.createElement('div');
  wasd.id = 'wasd-tutorial';
  wasd.innerHTML = `
    <div class="wasd-row">
      <div class="wasd-btn" id="btn-w">W</div>
    </div>
    <div class="wasd-row">
      <div class="wasd-btn" id="btn-a">A</div>
      <div class="wasd-btn" id="btn-s">S</div>
      <div class="wasd-btn" id="btn-d">D</div>
    </div>
  `;
  document.body.appendChild(wasd);

  let clicked = false;
  let tutorialActive = false;
  let tutorialInterval = null;

  let px = 0;
  let py = 0;
  const speed = 3;
  const keys = { w: false, a: false, s: false, d: false };

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
      const topY = rect.top;
      const bottomY = rect.bottom;
      const halfW = rect.width / 2;

      wasd.style.left = cx + 'px';
      wasd.style.top = (topY + bottomY) / 2 + 'px';
      wasd.style.transform = 'translate(-50%, -50%)';
      wasd.style.display = 'flex';

      const centroidX = (cx + (cx - halfW) + (cx + halfW)) / 3;
      const centroidY = (topY + bottomY + bottomY) / 3;

      const dotSize = 22;
      px = centroidX - dotSize / 2;
      py = centroidY - dotSize / 2;

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

  function pointInTriangle(px, py, ax, ay, bx, by, cx, cy) {
    const v0x = cx - ax, v0y = cy - ay;
    const v1x = bx - ax, v1y = by - ay;
    const v2x = px - ax, v2y = py - ay;

    const dot00 = v0x*v0x + v0y*v0y;
    const dot01 = v0x*v1x + v0y*v1y;
    const dot02 = v0x*v2x + v0y*v2y;
    const dot11 = v1x*v1x + v1y*v1y;
    const dot12 = v1x*v2x + v1y*v2y;

    const invDen = 1 / (dot00 * dot11 - dot01 * dot01);
    const u = (dot11 * dot02 - dot01 * dot12) * invDen;
    const v = (dot00 * dot12 - dot01 * dot02) * invDen;

    return (u >= 0) && (v >= 0) && (u + v < 1);
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
      const topY = rect.top;
      const bottomY = rect.bottom;
      const halfW = rect.width / 2;

      const inside = pointInTriangle(
        px + 11, py + 11,
        cx, topY,
        cx - halfW, bottomY,
        cx + halfW, bottomY
      );

      player.style.background = inside ? 'black' : 'white';
    }

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
})();
