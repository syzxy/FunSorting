/* Bubble Sort */
class BubbleSort extends Sort {
    constructor() {
        super();
        this.reset();
    }

    reset() {
        // this.visual_speed = visualSpeed;  // the moving speed of bars
        // this.outer_loop = 0;              // values of outer loops and inner loops are needed
        // this.inner_loop = 0;              // for resuming the visualization from the pause state
        // this.playing = false;             // animation is playing or not
        // this.resumed = false;             // animation is resumed from pause or regular
        // this.paused = false;              // animation have been paused or not
        // this.finished = false;            // stop animation upon finishing
        super.reset();
        this.outer_loop = 0;
        this.inner_loop = 0;
    }

    async sort(outer_loop = 0, inner_loop = 0) {
        for (let i = outer_loop; i < elements.length; i++) {
            // record current outer loop index
            this.outer_loop = i;
            for (let j = this.resumed ? inner_loop : 0; j < elements.length - i - 1; j++) {
                // record current outer loop index
                this.resumed = false;
                this.inner_loop = j;
                if (elements[j] > elements[j + 1]) {
                    states[j] = 1;
                    await this.sleep(this.visual_speed);
                    [elements[j], elements[j + 1]] = this.swap(elements[j], elements[j + 1]);
                    states[j] = 0;
                }
            }
            states[elements.length - 1 - i] = 1;
        }
        // console.log("finished!");
        this.finished = true;
    }

    pause() {
        stop_animate();
        this.visual_speed = 10000000;
    }

    resume() {
        this.resumed = true;
        this.visual_speed = visualSpeed;
        this.sort(this.outer_loop, this.inner_loop);
        animate();
    }
}
