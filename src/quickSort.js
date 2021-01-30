class QuickSort extends Sort {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    super.reset();
  }

  sort(low = 0, high = this.arr.length - 1) {
    if (low < high) {
      let p = this.partition(low, high);
      this.sort(low, p - 1);
      this.sort(p + 1, high);
    } else {
      this.steps.push({action: "sorted", idx: low});
    }
  }

  /* naive implementation - choose the last element as pivot element */
  partition(low, high) {
    let pivot_idx = high;
    this.steps.push({action: "pivot", idx: pivot_idx});
    let pivot = this.arr[pivot_idx];
    let i = low;
    this.steps.push({action: "activate", idx: i});
    for (let j = low; j < high; j++) {
      this.steps.push({action: "iterate", idx: j, offset: j-low});
      if (this.arr[j] < pivot) {
        if (i !== j) {
          [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
          this.steps.push({action: "swap", from: j, to: i});
        }
        i++;
        this.steps.push({action: "increment", idx: i});
      }
    }
    this.steps.push({action: "dim", idx: high-1});
    [this.arr[i], this.arr[pivot_idx]] = [this.arr[pivot_idx], this.arr[i]];
    this.steps.push({action: "swapPivot", from: pivot_idx, to: i});
    return i;
  }

  animateStep(stepIndex) {
    if (stepIndex === this.steps.length - 1) {
      clearInterval(this.timer);
      this.finished = true;
      this.playing = false; 
    }

    let step = this.steps[stepIndex];
    switch (step.action) {
      case 'pivot':
        this.states[step.idx] = 'activated';
        break;
      case 'sorted':
        this.states[step.idx] = 'sorted';
        break;
      case 'activate':
        this.states[step.idx] = 'compared';
        break;
      case 'iterate':
        this.states[step.idx] = 'compared';
        if (step.offset > 1) {
          this.states[step.idx - 1] = 'default';
        }
        break;
      case 'swap':
        [this.arr[step.from], this.arr[step.to]] = [this.arr[step.to], this.arr[step.from]];
        this.states[step.from] = 'default';
        // this.states[step.to] = 'sorted';
        break;
      case 'swapPivot':
        [this.arr[step.from], this.arr[step.to]] = [this.arr[step.to], this.arr[step.from]];
        this.states[step.from] = 'default';
        this.states[step.to] = 'sorted';
      case 'increment':
        this.states[step.idx] = 'compared';
        this.states[step.idx-1] = 'default';
        break;
      case 'dim':
        this.states[step.idx] = 'default';
        break;
    }
  }
}