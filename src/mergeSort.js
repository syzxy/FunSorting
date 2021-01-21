/* Merge Sort */
class MergeSort extends Sort {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    super.reset();
    this.scale = 2;
    this.auxilaryArray = elements.map(() => 0);
  }

  sort() {
    this.sort_(0, elements.length-1);
  }

  async sort_(low, high) {
    if (low === high) {
      await this.sleep(this.visual_speed);
      states[low] = 2;
    } else {
      const mid = Math.floor((low + high) / 2);
      await this.sort_(low, mid);
      await this.sort_(mid + 1, high);
      const temp = await this.merge(low, mid, high);
      // elements.splice(low, high - low + 1, ...temp);
      // await this.putInPlace(low, high, temp);
    }

    if (low === 0 && high === elements.length-1) { this.finished = true; }
  }

  async merge(low, mid, high) {
    console.log('Merging' + low + ' to ' + high);
    // let temp;
    let i = low;
    let k = low;
    let j = mid + 1;

    while (i <= mid && j <= high) {
      await this.sleep(visualSpeed);
      if (elements[i] <= elements[j]) {
        [this.auxilaryArray[k], elements[i]] = [elements[i], this.auxilaryArray[k]];
        i++;
      } else {
        [this.auxilaryArray[k], elements[j]] = [elements[j], this.auxilaryArray[k]];
        j++;
      }
      k++;
    }

    if (i <= mid) {
      while(i <= mid) {
        await this.sleep(visualSpeed);
        // this.auxilaryArray[k] = elements[i];
        [this.auxilaryArray[k], elements[i]] = [elements[i], this.auxilaryArray[k]];
        i++;
        k++;
      }
    } else if (j <= high) {
      while(j <= high) {
        await this.sleep(visualSpeed);
        // this.auxilaryArray[k++] = elements[j++];
        [this.auxilaryArray[k], elements[j]] = [elements[j], this.auxilaryArray[k]];
        j++;
        k++;
      }
    }

    // Put sorted elements from the ayxilary array back to elements
    await this.sleep(visualSpeed);
    this.putInPlace(low, high);
  }

  putInPlace(start, end) {
    for (let i=start; i<=end; i++) {
      // await this.sleep(visualSpeed);
      [elements[i], this.auxilaryArray[i]] = [this.auxilaryArray[i], elements[i]];
    }
  }
}
