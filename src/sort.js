/* Genreal Sorting Algorithm Class */

class Sort {
  constructor() {
    this.reset();
  }

  reset() {
    this.arr = [...elements];         // copy of the generated global array
    this.states = this.arr.map(() => 'default');  // animation state of each element
    this.visual_speed = visualSpeed;  // the moving speed of bars
    this.playing = false;             // animation is playing or not
    this.paused = false;              // animation have been paused or not
    this._finished = false;           // stop animation upon finishing
    this.scale = 1;                   // scale of bars, 2 for non-in-place
    this.timer;                       // timer from setInterval/setTimeOut
    this.steps = [];                  // all steps to be animated
    this.nextStep = 0;                // index of next step to be animated
  }

  get finished() {return this._finished}

  set finished(newStatus) {
    this._finished = newStatus;

    /* animation finished automatically, rather than mannually */
    if (!this.paused && newStatus === true) {
      playBtn.textContent = 'play_arrow';
      playBtnLabel.textContent = 'play';
    }

    disableButtons(newStatus, playBtn, nextBtn, finishBtn);
    if (this.finished) {
      disableButtons(false, restartBtn, previousBtn);
    }
    if (this.finished) {console.log("Animation completed or finished manually!");}
  }

  play() {
    this.sort();
    this.arr = [...elements];
    this.states = this.arr.map(() => 'default');
    this.playWholeAnimation();
  }

  /* Draw bars on canvas, using p5.js */
  show(scale = this.scale) {
    for (let i = 0; i < this.arr.length; i++) {
      let j = (barInterval * i + 1) * barWidth;
      stroke(colors[this.states[i]]);
      strokeWeight(barWidth);
      line(j, height / scale - barWidth, j, (height - this.arr[i]) / scale - barWidth);
      if (this.hasOwnProperty('auxilaryArray')) {
        stroke(colors[this.auxilaryStates[i]]);
        line(j, height - barWidth, j, height - this.auxilaryArray[i] / scale - barWidth);
      }
    }
  }

  playWholeAnimation(fromStep = this.nextStep) {
    animate();
    this.timer = setInterval(() => {
      this.animateStep(this.nextStep++);
    }, visualSpeed);
  }

  pause() {
    // console.log("paused...");
    clearInterval(this.timer);
  }

  resume() {
    // console.log("resumed...");
    this.playWholeAnimation();
  }

  finish() {
    this.reset();
    this.sort();
    this.states = currentAlgorithm.arr.map(() => 'sorted');
    if (this.hasOwnProperty('auxilaryArray')) {
      this.auxilaryStates = [...this.states];
    }
    this.finished = true;
    this.nextStep = this.steps.length;
    redraw();
  }

  // Taken from:
  // https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
  // arrow function (param list) => x is short for f(param list) {return x;}
  // sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
}