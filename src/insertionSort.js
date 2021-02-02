class InserstionSort extends Sort {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    super.reset();
  }

  sort() {
    this.steps.push({action: "sort", idx: 0});
    for (let i = 1; i < this.arr.length; i++) {
      this.steps.push({action: "activate", idx: i});
      let j = i;
      while (j > 0 && this.arr[j - 1] > this.arr[j]) {
        [this.arr[j - 1], this.arr[j]] = [this.arr[j], this.arr[j - 1]];
        this.steps.push({action: "swap", from: j, to: j - 1});
        j--;
      }
      this.steps.push({action: "sort", idx: j});
    }
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
        this.states[step.idx] = forwardMode ? 'sorted' : (step.idx === 0 ? 'default': 'compared');
        break;
      case 'activate':
        this.states[step.idx] = forwardMode ? 'compared' : 'default';
        break;
      case 'swap':
        [this.arr[step.from], this.arr[step.to]] = [this.arr[step.to], this.arr[step.from]];
        this.states[step.from] = forwardMode ? 'sorted' : 'compared';
        this.states[step.to] = forwardMode ? 'compared' : 'sorted';
        break;
    }
  }
}