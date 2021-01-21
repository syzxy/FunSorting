/* Genreal Sorting Algorithm Class */

class Sort {
  constructor() {
    this.reset();
  }

  reset() {
    this.visual_speed = visualSpeed;  // the moving speed of bars
    this.playing = false;             // animation is playing or not
    this.resumed = false;             // animation is resumed from pause or regular
    this.paused = false;              // animation have been paused or not
    this.finished = false;            // stop animation upon finishing
    this.scale = 1;                   // scale of bars, 2 for non-in-place
  } 

  /* Draw bars on canvas, using p5.js */
  show(scale=this.scale) {
    for (let i = 0; i < elements.length; i++) {
      let j = (2*i+1) * barWidth;
      stroke(colors[states[i]]);
      strokeWeight(barWidth);
      line(j, height/scale-barWidth, j, (height-elements[i])/scale-barWidth);
      if (this.hasOwnProperty('auxilaryArray')) {
        line(j, height-barWidth, j, height-this.auxilaryArray[i]/scale-barWidth);
      }
    }
  }

// Taken from:
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
// arrow function (param list) => x is short for f(param list) {return x;}
  sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // async function swap(a, b, time) {
  swap(a, b) {
    return [b, a];
  }
}