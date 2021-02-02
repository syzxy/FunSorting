/* Merge Sort - Recursive, not-in-place */

class MergeSort extends Sort {
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

  sort(low = 0, high = this.arr.length - 1) {
    if (low === high) {
      this.steps.push({
        action: "sort",
        idx: low,
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
        compareStep.winner = i;
        compareStep.loser = j;
        this.steps.push({action: "merge", from: i, to: k});
        i++;
      } else {
        [this.auxilaryArray[k], this.arr[j]] = [this.arr[j], this.auxilaryArray[k]];
        compareStep.winner = j;
        compareStep.loser = i;
        this.steps.push({action: "merge", from: j, to: k});
        j++;
      }
      k++;
      this.steps.push({action: "dim", idx: compareStep.loser});
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

  animateStep(stepIndex, forwardMode=true) {
    if (forwardMode && stepIndex === this.steps.length - 1) {
      clearInterval(this.timer);
      this.finished = true;
      this.playing = false;
    }
    let step = this.steps[stepIndex];
    switch (step.action) {
      case 'sort':
        this.states[step.idx] = forwardMode ? 'sorted' : 'default';
        break;
      case 'compare':
        this.states[step.winner] = this.states[step.loser] = forwardMode ? 'compared' : 'compared';
        break;
      case 'dim':
        this.states[step.idx] = forwardMode ? 'sorted' : 'compared';
      case 'merge':
        this.states[step.from] = forwardMode ? 'sorted' : 'sorted';
        this.auxilaryStates[step.to] = forwardMode ? 'sorted' : 'default';
        [this.arr[step.from], this.auxilaryArray[step.to]] =
          [this.auxilaryArray[step.to], this.arr[step.from]];
        break;
      case 'replace':
        for (let i = step.from; i <= step.to; i++) {
          // this.auxilaryStates[i] = 'default';
          [this.arr[i], this.auxilaryArray[i]] = [this.auxilaryArray[i], this.arr[i]];
          this.auxilaryStates[i] = forwardMode ? 'default' : 'sorted';
        }
        break;
    }
  }

}
