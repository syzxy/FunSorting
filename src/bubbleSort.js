/* Bubble Sort */

class BubbleSortDebug extends Sort {
    constructor() {
        super();
        this.reset();
    }

    reset() {
        super.reset();
    }

    play() {
        this.sort();
        this.arr = [...elements];
        this.states = this.arr.map(() => 'default');
        this.playWholeAnimation();
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

    animateStep(stepIndex) {
        if (stepIndex === this.steps.length - 1) {
            clearInterval(this.timer);
            this.finished = true;
            this.playing = false;
        }
        let step = this.steps[stepIndex];
        switch (step.action) {
            case 'activate':
                step.idx.forEach( i => {
                    this.states[i] = 'compared';
                });
            case 'compare':
                // this.states[step.winner] = 'compared';
                this.states[step.loser] = 'default';
                break;
            case 'swap':
                [this.arr[step.from], this.arr[step.to]] =
                [this.arr[step.to], this.arr[step.from]];
                this.states[step.from] = 'default';
                this.states[step.to] = 'compared';
                break;
            case 'sorted':
                this.states[step.idx] = 'sorted';
                break;
        }
    }

}
