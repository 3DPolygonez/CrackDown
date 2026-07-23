export class Input {
  #lastKey;
  constructor() {
    this.keys = {};
    window.addEventListener('keydown', (e) => {
      this.#lastKey = e.code;
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    const upLeftBtn = document.getElementById('dpad-upleft');
    upLeftBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "ArrowUp";
      this.keys["ArrowUp"] = true;
      this.keys["ArrowLeft"] = true;
    });
    upLeftBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["ArrowUp"] = false;
      this.keys["ArrowLeft"] = false;
    });
    const upBtn = document.getElementById('dpad-up');
    upBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "ArrowUp";
      this.keys["ArrowUp"] = true;
    });
    upBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["ArrowUp"] = false;
    });
    const upRightBtn = document.getElementById('dpad-upright');
    upRightBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "ArrowUp";
      this.keys["ArrowUp"] = true;
      this.keys["ArrowRight"] = true;
    });
    upRightBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["ArrowUp"] = false;
      this.keys["ArrowRight"] = false;
    });
    const leftBtn = document.getElementById('dpad-left');
    leftBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "ArrowLeft";
      this.keys["ArrowLeft"] = true;
    });
    leftBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["ArrowLeft"] = false;
    });
    const rightBtn = document.getElementById('dpad-right');
    rightBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "ArrowRight";
      this.keys["ArrowRight"] = true;
    });
    rightBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["ArrowRight"] = false;
    });
    const downLeftBtn = document.getElementById('dpad-downleft');
    downLeftBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "ArrowDown";
      this.keys["ArrowDown"] = true;
      this.keys["ArrowLeft"] = true;
    });
    downLeftBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["ArrowDown"] = false;
      this.keys["ArrowLeft"] = false;
    });
    const downBtn = document.getElementById('dpad-down');
    downBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "ArrowDown";
      this.keys["ArrowDown"] = true;
    });
    downBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["ArrowDown"] = false;
    });
    const downRightBtn = document.getElementById('dpad-downright');
    downRightBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "ArrowDown";
      this.keys["ArrowDown"] = true;
      this.keys["ArrowRight"] = true;
    });
    downRightBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["ArrowDown"] = false;
      this.keys["ArrowRight"] = false;
    });
    const randomBtn = document.getElementById('dpad-random');
    randomBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "KeyR";
      this.keys["KeyR"] = true;
    });
    randomBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["KeyR"] = false;
    });
    const camZoomInBtn = document.getElementById('cam-zoomin');
    camZoomInBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "Digit3";
      this.keys["Digit3"] = true;
    });
    camZoomInBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["Digit3"] = false;
    });
    const camZoomOutBtn = document.getElementById('cam-zoomout');
    camZoomOutBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "Digit4";
      this.keys["Digit4"] = true;
    });
    camZoomOutBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["Digit4"] = false;
    });
    const nextCameraPosition = document.getElementById('cam-left');
    nextCameraPosition.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "Digit1";
      this.keys["Digit1"] = true;
    });
    nextCameraPosition.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["Digit1"] = false;
    });
    const prevCameraPosition = document.getElementById('cam-right');
    prevCameraPosition.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "Digit2";
      this.keys["Digit2"] = true;
    });
    prevCameraPosition.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["Digit2"] = false;
    });
    const changeCameraPosition = document.getElementById('cam-change');
    changeCameraPosition.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.#lastKey = "KeyT";
      this.keys["KeyT"] = true;
    });
    changeCameraPosition.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.keys["KeyT"] = false;
    });
  }
  isDown(key) {
    return !!this.keys[key];
  }
  lastKey() {
    let output = this.#lastKey;
    this.#lastKey = null;
    return output;
  }
}