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