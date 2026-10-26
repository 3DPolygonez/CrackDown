export class Input {
  #lastKey;
  constructor(onChange = null) {
    this.keys = {};
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.swipeEndX = 0;
    this.swipeEndY = 0;
    this.swipeThreshold = 10;// Minimum distance in pixels to be considered a swipe 
    this.onChange = onChange;
    window.addEventListener('keydown', (e) => {
      this.#lastKey = e.code;
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
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
    const chkIncludeHead = document.getElementById('chkIncludeHead');
    if (chkIncludeHead){
      chkIncludeHead.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Include");
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
    const chkIncludeRightForeArm = document.getElementById('chkIncludeRightForeArm');
    if (chkIncludeRightForeArm){
      chkIncludeRightForeArm.addEventListener('change', (e) => {
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
    const chkIncludeLeftForeArm = document.getElementById('chkIncludeLeftForeArm');
    if (chkIncludeLeftForeArm){
      chkIncludeLeftForeArm.addEventListener('change', (e) => {
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
    const chkHoldingNothing = document.getElementById('chkHoldingNothing');
    if (chkHoldingNothing){
      chkHoldingNothing.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Holding");
      })
    }
    const chkHoldingBox = document.getElementById('chkHoldingBox');
    if (chkHoldingBox){
      chkHoldingBox.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Holding");
      })
    }
    const chkHoldingSmg = document.getElementById('chkHoldingSmg');
    if (chkHoldingSmg){
      chkHoldingSmg.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Holding");
      })
    }
    const chkHoldingClipBoard = document.getElementById('chkHoldingClipBoard');
    if (chkHoldingClipBoard){
      chkHoldingClipBoard.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Holding");
      })
    }
    const chkActionHolding = document.getElementById('chkActionHolding');
    if (chkActionHolding){
      chkActionHolding.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Action");
      })
    }
    const chkActionUsing = document.getElementById('chkActionUsing');
    if (chkActionUsing){
      chkActionUsing.addEventListener('change', (e) => {
        e.preventDefault();
        this.changeCharacter("Action");
      })
    }
    const tracker = document.getElementById('swipe-zone');
    if (tracker){
      tracker.addEventListener('touchstart', (e) => {
        this.swipeStartX = e.touches[0].clientX;
        this.swipeStartY = e.touches[0].clientY;
        let transform = `translate(0px, 0px)`;
        document.getElementById("camera-knob").style.transform = transform;
      }, { passive: true });

      tracker.addEventListener('touchmove', (e) => {
        this.swipeEndX = e.changedTouches[0].clientX;
        this.swipeEndY = e.changedTouches[0].clientY;
        this.handleVerticalSwipe();
        let transform = `translate(${this.swipeEndX - this.swipeStartX}px, ${this.swipeEndY - this.swipeStartY}px)`;
        document.getElementById("camera-knob").style.transform = transform;
      }, { passive: true });

      tracker.addEventListener('touchend', (e) => {
        this.keys["Digit3"] = false;
        this.keys["Digit4"] = false;
        this.handleHorizontalSwipe();
        let transform = `translate(0px, 0px)`;
        document.getElementById("camera-knob").style.transform = transform;
      }, { passive: true });
    }
  }
  changeCharacter(element){
    if (this.onChange){
      let value = {
        mesh: document.getElementById('ddlMesh').value,
        speed: document.getElementById('ddlSpeed').value,
        includeHead: document.getElementById('chkIncludeHead').checked,
        includeFace: document.getElementById('chkIncludeFace').checked,
        includeChest: document.getElementById('chkIncludeChest').checked,
        includeRightArm: document.getElementById('chkIncludeRightArm').checked,
        includeRightForeArm: document.getElementById('chkIncludeRightForeArm').checked,
        includeRightHand: document.getElementById('chkIncludeRightHand').checked,
        includeLeftArm: document.getElementById('chkIncludeLeftArm').checked,
        includeLeftForeArm: document.getElementById('chkIncludeLeftForeArm').checked,
        includeLeftHand: document.getElementById('chkIncludeLeftHand').checked,
        includeWaist: document.getElementById('chkIncludeWaist').checked,
        includeRightLeg: document.getElementById('chkIncludeRightLeg').checked,
        includeLeftLeg: document.getElementById('chkIncludeLeftLeg').checked,
        holdingNothing: document.getElementById('chkHoldingNothing').checked,
        holdingBox: document.getElementById('chkHoldingBox').checked,
        holdingSmg: document.getElementById('chkHoldingSmg').checked,
        holdingClipBoard: document.getElementById('chkHoldingClipBoard').checked,
        actionHolding: document.getElementById('chkActionHolding').checked,
        actionUsing: document.getElementById('chkActionUsing').checked
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
    return this.#lastKey;
  }
  clearLastKey(){
    this.#lastKey = null;
  }
  update(delta){
    this.clearLastKey();
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
          this.#lastKey = "Digit1";
        } else {
          this.#lastKey = "Digit2";
        }
      }
    }
  }
}