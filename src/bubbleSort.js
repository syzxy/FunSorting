/* Bubble Sort */

class BubbleSort extends Sort {
    constructor() {
        super();
        this.reset();
    }

    reset() {
        super.reset();
    }

    sort() {
        for (let i = 0, l = this.arr.length; i < l; i++) {
            for (let j = 0; j < l - i - 1; j++) {
                this.steps.push({action: 'activate', idx: [j, j+1]});
                let compareStep = {action: "compare"};
                let winner;
                let loser;
                this.steps.push(compareStep);
                if (this.arr[j] > this.arr[j + 1]) {
                    [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
                    winner = j;
                    loser = j + 1;
                    this.steps.push({action: "swap", from: j, to: j + 1});
                } else {
                    winner = j + 1;
                    loser = j;
                }
                compareStep.winner = winner;
                compareStep.loser = loser;
            }
            this.steps.push({action: "sorted", idx: l - i - 1});
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
            case 'activate':
                step.idx.forEach( i => {
                    this.states[i] = forwardMode ? 'compared' : 'default';
                });
            case 'compare':
                // this.states[step.winner] = 'compared';
                this.states[step.loser] = forwardMode ? 'default' : 'compared';
                break;
            case 'swap':
                [this.arr[step.from], this.arr[step.to]] =
                [this.arr[step.to], this.arr[step.from]];
                this.states[step.from] = forwardMode ? 'default' : 'compared';
                this.states[step.to] = forwardMode ? 'compared' : 'default';
                break;
            case 'sorted':
                this.states[step.idx] = forwardMode ? 'sorted' : 'compared';
                break;
        }
    }

}
