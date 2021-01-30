class selectionSort extends Sort {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    super.reset();
  }

  sort() {
    for (let i = 0; i < this.arr.length - 1; i++) {
      let min = i;
      this.steps.push({action: "changeMin", from: i, to: i});
      for (let j = i + 1; j < this.arr.length; j++) {
        this.steps.push({action: "iterate", idx: j, first: j === min + 1});
        if (this.arr[j] < this.arr[min]) {
          this.steps.push({action: "changeMin", from: min, to: j});
          min = j;
        }
      }
      this.steps.push({action: 'dim'});
      [this.arr[min], this.arr[i]] = [this.arr[i], this.arr[min]];
      this.steps.push({action: "swap", from: min, to: i});
      this.steps.push({action: "sorted", idx: i});
    }
    this.steps.push({action: "sorted", idx: this.arr.length - 1});
  }

  animateStep(stepIndex) {
    if (stepIndex === this.steps.length - 1) {
      clearInterval(this.timer);
      this.finished = true;
      this.playing = false;
    }

    let step = this.steps[stepIndex];
    switch (step.action) {
      case 'changeMin':
        this.states[step.from] = 'default';
        this.states[step.to] = 'compared';
        break;
      case 'iterate':
        this.states[step.idx] = 'activated';
        if (!step.first) {
          this.states[step.idx - 1] = 'default';
        }
        break;
      case 'swap':
        [this.arr[step.from], this.arr[step.to]] = [this.arr[step.to], this.arr[step.from]];
        this.states[step.from] = 'default';
        this.states[step.to] = 'compared';
        break;
      case 'dim':
        this.states[this.arr.length-1] = 'default';
        break;
      case 'sorted':
        this.states[step.idx] = 'sorted';
        break;
    }
  }
}