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
      if (min !== this.arr.length - 1) {
        this.steps.push({action: 'dim'});
      }
      [this.arr[min], this.arr[i]] = [this.arr[i], this.arr[min]];
      this.steps.push({action: "swap", from: min, to: i});
      this.steps.push({action: "sort", idx: i});
    }
    this.steps.push({action: "sort", idx: this.arr.length - 1});
  }

  animateStep(stepIndex, forwardMode=true) {
    if (stepIndex === this.steps.length - 1) {
      clearInterval(this.timer);
      this.finished = true;
      this.playing = false;
    }

    let step = this.steps[stepIndex];
    console.log(step);
    switch (step.action) {
      case 'changeMin':
        this.states[step.from] = forwardMode ? 'default' : 'compared';
        this.states[step.to] = forwardMode ? 'compared' : 'default';
        break;
      case 'iterate':
        this.states[step.idx] = forwardMode ? 'activated' : "default";
        if (!step.first) {
          this.states[step.idx - 1] = forwardMode ? 'default' : 'activated';
        }
        break;
      case 'swap':
        [this.arr[step.from], this.arr[step.to]] = [this.arr[step.to], this.arr[step.from]];
        this.states[step.from] = forwardMode ? 'default' : 'compared';
        this.states[step.to] = forwardMode ? 'compared' : 'default';
        break;
      case 'dim':
        this.states[this.arr.length-1] = forwardMode ? 'default' : 'activated';
        break;
      case 'sort':
        this.states[step.idx] = forwardMode ? 'sorted' : 'compared';
        break;
    }
  }
}