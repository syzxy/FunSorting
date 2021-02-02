class HeapSort extends Sort {

  constructor() {
    super();
    this.reset();
  }

  reset() {
    super.reset();
  }

  /**
   * Sort this.arr inplace: the array is devided into 2 parts:
   * 1. arr[0, size] (exclusive on the right), a max heap, and
   * 2. arr[size, arr.length], the sorted array.
   * Initially size = arr.length so the heap contains all elements, and no element
   * is sorted. The maximun element in the heap is extracted and pushed into the
   * sorted part each iteration. 
   */
  sort() {
    this.maxHeapify(this.arr.length);
    let end = this.arr.length - 1;
    while (end > 0) {
      this.steps.push({action: "activate", idx: 0});
      [this.arr[0], this.arr[end]] = [this.arr[end], this.arr[0]];
      this.steps.push({action: "sort", idx: end});
      // this.steps.push({action: "dim", idx: [0]});
      end--;
      this.siftDown(0, end);
    }
    this.steps.push({action: "sort", idx: end});
  }

  /**
   * Building a max heap from the first {size} elements of this.arr
   * @param {number} size size of the heap
   */
  maxHeapify(size) {
    let lastParent = Math.floor(((size - 1) - 1) / 2);
    while (lastParent >= 0) {
      this.siftDown(lastParent, size - 1);
      lastParent--;
    }
  }

  /**
   * Maintaining the max heap invariant by fixing a single voilation at the start
   * index, the process is then called recursively down the heap on every internal
   * node that voilates the invariant after their parent is fixed.
   * @param {number} start the initial root where the invariant is voilated
   * @param {number} end  the index that marks the end of the heap.
   */
  siftDown(start, end) {
    let l = 2 * start + 1;
    let r = l + 1;
    let largest = start;

    if (l <= end && this.arr[l] > this.arr[largest]) {
      largest = l;
    }
    if (r <= end && this.arr[r] > this.arr[largest]) {
      largest = r;
    }
    if (largest !== start) {
      this.steps.push({action: "activate", idx: start});
      [this.arr[start], this.arr[largest]] = [this.arr[largest], this.arr[start]];
      this.steps.push({action: "compare", idx: largest});
      this.steps.push({action: "siftDown", from: start, to: largest});
      this.steps.push({action: "dim", parent: start, child: largest});
      this.siftDown(largest, end);
    }
  }

  animateStep(stepIndex, forwardMode = true) {
    if (forwardMode && stepIndex === this.steps.length - 1) {
      clearInterval(this.timer);
      this.finished = true;
      this.playing = false;
    }
    let step = this.steps[stepIndex];
    switch (step.action) {
      case 'activate':
        this.states[step.idx] = forwardMode ? 'activated' : 'default';
        break;
      case 'deactivate':
        this.states[step.idx] = forwardMode ? 'default' : 'activated';
        break;
      case 'compare':
        this.states[step.idx] = forwardMode ? 'compared' : 'default';
        break;
      case 'siftDown':
        [this.arr[step.from], this.arr[step.to]] = [this.arr[step.to], this.arr[step.from]];
        this.states[step.from] = forwardMode ? 'compared' : 'activated';
        this.states[step.to] = forwardMode ? 'activated' : 'compared';
        break;
      case 'sort':
        [this.arr[0], this.arr[step.idx]] = [this.arr[step.idx], this.arr[0]];
        this.states[0] = forwardMode ? 'default' : 'activated';
        this.states[step.idx] = forwardMode ? 'sorted' : 'default';
        break;
      case 'dim':
        this.states[step.parent] = forwardMode ? 'default' : 'compared';
        this.states[step.child] = forwardMode ? 'default' : 'activated';
        break;
    }
  }
}