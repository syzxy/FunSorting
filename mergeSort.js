/* Merge Sort */
class MergeSort {
  constructor() {
    this.reset();
  }

  reset() {
    this.visual_speed = visualSpeed;  // the moving speed of bars
    this.playing = false;             // animation is playing or not
    this.resumed = false;             // animation is resumed from pause or regular
    this.have_paused = false;         // animation have been paused or not
    this.finished = false;            // stop animation upon finishing
  }

  sort() {
    this.sort_(0, elements.length);
  }

  // sort_(array) {
  //   if (array.length === 1) { return array; }

  //   const mid_index = Math.floor(array.length / 2);
  //   const left = array.slice(0, mid_index);
  //   // console.log("left=" + left);
  //   // await sleep(visualSpeed);
  //   const right = array.slice(mid_index);
  //   // console.log("right=" + right);

  //   return this.merge(this.sort_(left), this.sort_(right));
  // }
  async sort_(low, high) {
    if (low === high - 1) {
      await sleep(this.visual_speed);
      states[low] = 2;
    } else {
      const mid = Math.floor((low + high) / 2);
      await this.sort_(low, mid);
      await this.sort_(mid, high);
      const temp = await this.merge(low, mid, high);
      elements.splice(low, high - low, ...temp);
    }

    if (low === 0 && high === elements.length) { this.finished = true; }
  }

  // merge(left, right) {
  //   let result = [];

  //   while (left.length && right.length) {
  //     if (left[0] < right[0]) {
  //       result.push(left.shift());
  //     } else {
  //       result.push(right.shift());
  //     }
  //   }
  //   if (left.length) {
  //     result = result.concat(left);
  //   } else if (right.length) {
  //     result = result.concat(right);
  //   }
  //   // console.log("merge sorted: " + result);
  //   return result;
  // }

  // animation

  // }

  async merge(low, mid, high) {
    let result = [];
    let i = low;
    let j = mid;

    while (i < mid && j < high) {
      await sleep(this.visual_speed);
      if (elements[i] < elements[j]) {
        result.push(elements[i]);
        // states[i] = 0;
        i++;
      } else {
        result.push(elements[j]);
        // states[j] = 0;
        j++;
      }
    }

    if (i < mid) {
      result = result.concat(elements.slice(i, mid));
    } else if (j < high) {
      result = result.concat(elements.slice(j, high));
    }

    return result;
  }

  show() {
    for (let i = 0; i < elements.length; i++) {
      fill(colors[states[i]]);
      rect(i * barWidth, height - elements[i], barWidth, elements[i]);
    }
  }
}
