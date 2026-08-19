export class Input {
  #lastKey;
  constructor(onChange = null) {
    this.keys = {};
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.swipeEndX = 0;
    this.swipeEndY = 0;
    this.swipeThreshold = 50;// Minimum distance in pixels to be considered a swipe 
    this.onChange = onChange;
    window.addEventListener('keydown', (e) => {
      this.#lastKey = e.code;
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    const upLeftBtn = document.getElementById('dpad-upleft');
    if (upLeftBtn){
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
    }
    const upBtn = document.getElementById('dpad-up');
    if (upBtn){
      upBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "ArrowUp";
        this.keys["ArrowUp"] = true;
      });
      upBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["ArrowUp"] = false;
      });
    }
    const upRightBtn = document.getElementById('dpad-upright');
    if (upRightBtn){
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
    }
    const leftBtn = document.getElementById('dpad-left');
    if (leftBtn){
      leftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "ArrowLeft";
        this.keys["ArrowLeft"] = true;
      });
      leftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["ArrowLeft"] = false;
      });
    }
    const rightBtn = document.getElementById('dpad-right');
    if (rightBtn){
      rightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "ArrowRight";
        this.keys["ArrowRight"] = true;
      });
      rightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["ArrowRight"] = false;
      });
    }
    const downLeftBtn = document.getElementById('dpad-downleft');
    if (downLeftBtn){
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
    }
    const downBtn = document.getElementById('dpad-down');
    if (downBtn){
      downBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "ArrowDown";
        this.keys["ArrowDown"] = true;
      });
      downBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["ArrowDown"] = false;
      });
    }
    const downRightBtn = document.getElementById('dpad-downright');
    if (downRightBtn){
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
    }
    const randomBtn = document.getElementById('dpad-random');
    if (randomBtn){
      randomBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "KeyR";
        this.keys["KeyR"] = true;
      });
      randomBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["KeyR"] = false;
      });
    }
    const camZoomInBtn = document.getElementById('cam-zoomin');
    if (camZoomInBtn){
      camZoomInBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "Digit3";
        this.keys["Digit3"] = true;
      });
      camZoomInBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["Digit3"] = false;
      });
    }
    const camZoomOutBtn = document.getElementById('cam-zoomout');
    if (camZoomOutBtn){
      camZoomOutBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "Digit4";
        this.keys["Digit4"] = true;
      });
      camZoomOutBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["Digit4"] = false;
      });
    }
    const nextCameraPosition = document.getElementById('cam-left');
    if (nextCameraPosition){
      nextCameraPosition.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "Digit1";
        this.keys["Digit1"] = true;
      });
      nextCameraPosition.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["Digit1"] = false;
      });
    }
    const prevCameraPosition = document.getElementById('cam-right');
    if (prevCameraPosition){
      prevCameraPosition.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.#lastKey = "Digit2";
        this.keys["Digit2"] = true;
      });
      prevCameraPosition.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys["Digit2"] = false;
      });
    }
    const changeCameraPosition = document.getElementById('cam-change');
    if (changeCameraPosition){
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
    const ddlMesh = document.getElementById('ddlMesh');
    if (ddlMesh){
      ddlMesh.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Mesh");
      })
    }
    const ddlSpeed = document.getElementById('ddlSpeed');
    if (ddlSpeed){
      ddlSpeed.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Speed");
      })
    }
    const chkIncludeFace = document.getElementById('chkIncludeFace');
    if (chkIncludeFace){
      chkIncludeFace.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkIncludeChest = document.getElementById('chkIncludeChest');
    if (chkIncludeChest){
      chkIncludeChest.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkIncludeRightArm = document.getElementById('chkIncludeRightArm');
    if (chkIncludeRightArm){
      chkIncludeRightArm.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkIncludeRightHand = document.getElementById('chkIncludeRightHand');
    if (chkIncludeRightHand){
      chkIncludeRightHand.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkIncludeLeftArm = document.getElementById('chkIncludeLeftArm');
    if (chkIncludeLeftArm){
      chkIncludeLeftArm.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkIncludeLeftHand = document.getElementById('chkIncludeLeftHand');
    if (chkIncludeLeftHand){
      chkIncludeLeftHand.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkIncludeWaist = document.getElementById('chkIncludeWaist');
    if (chkIncludeWaist){
      chkIncludeWaist.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkIncludeRightLeg = document.getElementById('chkIncludeRightLeg');
    if (chkIncludeRightLeg){
      chkIncludeRightLeg.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkIncludeLeftLeg = document.getElementById('chkIncludeLeftLeg');
    if (chkIncludeLeftLeg){
      chkIncludeLeftLeg.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
      })
    }
    const chkUsingNothing = document.getElementById('chkUsingNothing');
    if (chkUsingNothing){
      chkUsingNothing.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Using");
      })
    }
    const chkUsingBox = document.getElementById('chkUsingBox');
    if (chkUsingBox){
      chkUsingBox.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Using");
      })
    }
    const chkUsingSmg = document.getElementById('chkUsingSmg');
    if (chkUsingSmg){
      chkUsingSmg.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Using");
      })
    }
    const chkUsingClipBoard = document.getElementById('chkUsingClipBoard');
    if (chkUsingClipBoard){
      chkUsingClipBoard.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Using");
      })
    }
    const tracker = document.getElementById('swipe-zone');
    if (tracker){
      tracker.addEventListener('touchstart', (e) => {
        this.swipeStartX = e.touches[0].clientX;
        this.swipeStartY = e.touches[0].clientY;
      }, { passive: true });

      tracker.addEventListener('touchmove', (e) => {
        this.swipeEndX = e.changedTouches[0].clientX;
        this.swipeEndY = e.changedTouches[0].clientY;
        this.handleVerticalSwipe();
      }, { passive: true });

      tracker.addEventListener('touchend', (e) => {
        this.keys["Digit3"] = false;
        this.keys["Digit4"] = false;
        this.handleHorizontalSwipe();
      }, { passive: true });
    }
  }
  changeCharacter(element){
    if (this.onChange){
      let value = {
        mesh: document.getElementById('ddlMesh').value,
        speed: document.getElementById('ddlSpeed').value,
        includeFace: document.getElementById('chkIncludeFace').checked,
        includeChest: document.getElementById('chkIncludeChest').checked,
        includeRightArm: document.getElementById('chkIncludeRightArm').checked,
        includeRightHand: document.getElementById('chkIncludeRightHand').checked,
        includeLeftArm: document.getElementById('chkIncludeLeftArm').checked,
        includeLeftHand: document.getElementById('chkIncludeLeftHand').checked,
        includeWaist: document.getElementById('chkIncludeWaist').checked,
        includeRightLeg: document.getElementById('chkIncludeRightLeg').checked,
        includeLeftLeg: document.getElementById('chkIncludeLeftLeg').checked,
        usingNothing: document.getElementById('chkUsingNothing').checked,
        usingBox: document.getElementById('chkUsingBox').checked,
        usingSmg: document.getElementById('chkUsingSmg').checked,
        usingClipBoard: document.getElementById('chkUsingClipBoard').checked
      };
      document.getElementById('lblResult').innerHTML = JSON.stringify(value)
        .replaceAll(",", ",<br/>&nbsp;&nbsp;")
        .replaceAll("{", "{<br/>&nbsp;&nbsp;")
        .replaceAll("}", ",<br/>}");
      this.onChange({
          element: element,
          args: {
            value: value}});
    }
  }
  isDown(key) {
    return !!this.keys[key];
  }
  lastKey() {
    let output = this.#lastKey;
    this.#lastKey = null;
    return output;
  }
  handleVerticalSwipe() {
    const diffX = this.swipeEndX - this.swipeStartX;
    const diffY = this.swipeEndY - this.swipeStartY;

    // Determine if horizontal or vertical movement was greater
    if (Math.abs(diffX) < Math.abs(diffY)) {
      if (Math.abs(diffY) > this.swipeThreshold) {
        if (diffY > 0) {
          this.keys["Digit4"] = true;
        } else {
          this.keys["Digit3"] = true;
        }
      }
    }
  }
  handleHorizontalSwipe() {
    const diffX = this.swipeEndX - this.swipeStartX;
    const diffY = this.swipeEndY - this.swipeStartY;

    // Determine if horizontal or vertical movement was greater
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > this.swipeThreshold) {
        if (diffX > 0) {
          this.#lastKey = "Digit2";
        } else {
          this.#lastKey = "Digit1";
        }
      }
    }
  }
}