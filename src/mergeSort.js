/* 
 * Merge Sort - Recursive, not-in-place
 * Run normal sorting algorithm and collect each step.
 * Animate the steps when the algorithm is done.
*/

class MergeSortDebug extends Sort {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    super.reset();
    this.scale = 2;
    this.auxilaryArray = this.arr.map(() => 0);
    this.auxilaryStates = [...this.states];
  }

  play() {
    this.sort();
    this.arr = [...elements];
    this.states = this.arr.map(()=>'default');
    this.playWholeAnimation();
  }

  sort(low=0, high=this.arr.length-1) {
    if (low === high) {
      this.steps.push({
        action: "return",
        from: low,
      });
    } else {
      const mid = Math.floor((low + high) / 2);
      this.sort(low, mid);
      this.sort(mid + 1, high);
      const temp = this.merge(low, mid, high);
    }
  }

  merge(low, mid, high) {
    let i = low,
      k = low,
      j = mid + 1;

    while (i <= mid && j <= high) {
      let compareStep = {
        action: "compare",
      };
      this.steps.push(compareStep);
      if (this.arr[i] < this.arr[j]) {
        [this.auxilaryArray[k], this.arr[i]] = [this.arr[i], this.auxilaryArray[k]];
        this.steps.push({action: "merge", from: i, to: k});
        compareStep.winner = i++;
        compareStep.loser = j;
      } else {
        [this.auxilaryArray[k], this.arr[j]] = [this.arr[j], this.auxilaryArray[k]];
        this.steps.push({action: "merge", from: j, to: k});
        compareStep.winner = j++;
        compareStep.loser = i;
      }
      k++;
    }

    while (i <= mid) {
      [this.auxilaryArray[k], this.arr[i]] = [this.arr[i], this.auxilaryArray[k]];
      this.steps.push({action: "merge", from: i, to: k});
      k++;
      i++;
    }
    while (j <= high) {
      [this.auxilaryArray[k], this.arr[j]] = [this.arr[j], this.auxilaryArray[k]];
      this.steps.push({action: "merge", from: j, to: k});
      k++;
      j++;
    }

    // Put sorted elements from the ayxilary array back to elements
    this.putInPlace(low, high);
  }

  putInPlace(start, end) {
    for (let i = start; i <= end; i++) {
      [this.arr[i], this.auxilaryArray[i]] = [this.auxilaryArray[i], this.arr[i]];
    }
    this.steps.push({
      action: "replace",
      from: start,
      to: end,
    });
  }

  playWholeAnimation(fromStep = this.nextStep) {
    animate();
    this.timer = setInterval(() => {
      if (this.nextStep === this.steps.length) {
        clearInterval(this.timer);
        this.finished = true;
        this.playing = false;
        return;
      }
      let step = this.steps[this.nextStep++];
      this.animateStep(step);
    }, visualSpeed);
  }

  animateStep(step) {
    switch (step.action) {
      case 'return':
        this.states[step.from] = 'activated';
        break;
      case 'compare':
        this.states[step.winner] = this.states[step.loser] = 'compared';
        break;
      case 'merge':
        this.states[step.from] = 'sorted';
        [this.arr[step.from], this.auxilaryArray[step.to]] =
          [this.auxilaryArray[step.to], this.arr[step.from]];
        break;
      case 'replace':
        for (let i = step.from; i <= step.to; i++) {
          [this.arr[i], this.auxilaryArray[i]] = [this.auxilaryArray[i], this.arr[i]];
        }
        break;
    }
  }

}
