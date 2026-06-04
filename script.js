/* ———————————————— GLOBAL STYLES ———————————————— */

#player-dot {
  position: fixed;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: black;
  z-index: 9999999999;
  display: none;
  transition: background 0.15s linear;
}

/* Fade-in override for corner triangles */
#corner-top,
#corner-left,
#corner-right {
  opacity: 0;
  transition: opacity 2.4s ease-out;
}

/* The rest of the CSS is injected by script.js */
