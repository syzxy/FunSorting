// async function swap(a, b, time) {
function swap(a, b) {
    return [b, a];
}

/* Bubble Sort */

class BubbleSort {
    constructor(array) {
        this.array = array;               // the randomly generated array to be sorted
        this.visual_speed = visualSpeed;  // the moving speed of bars
        this.outer_loop = 0;              // values of outer loops and inner loops are needed
        this.inner_loop = 0;              // for resuming the visualization from the pause state
        this.playing = false;                 // animation is playing or not
        this.resumed = false;                 // animation is resumed from pause or regular
        this.have_paused = false;             // animation have been paused or not
        this.finished = false;                // stop animation upon finishing
    }
    async sort(outer_loop = 0, inner_loop = 0) {
        for (let i = outer_loop; i < this.array.length; i++) {
            // record current outer loop index
            this.outer_loop = i;
            for (let j = this.resumed ? inner_loop : 0; j < this.array.length - i - 1; j++) {
                // record current outer loop index
                this.resumed = false;
                this.inner_loop = j;
                if (this.array[j] > this.array[j + 1]) {
                    states[j] = 0;
                    await sleep(this.visual_speed);
                    [this.array[j], this.array[j + 1]] = swap(this.array[j], this.array[j + 1]);
                    states[j] = -1;
                }
            }
            states[this.array.length - 1 - i] = 0;
        }
        // console.log("finished!");
        this.finished = true;
    }

    pause() {
        stop_animate();
        this.visual_speed = 1000000;
    }

    resume() {
        this.resumed = true;
        this.visual_speed = visualSpeed;
        this.sort(this.outer_loop, this.inner_loop);
        animate();
    }
}
