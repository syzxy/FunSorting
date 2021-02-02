/* prevent mouse double click and drag selection(and probably more) */
document.addEventListener('mousedown', function (event) {
    event.preventDefault();
}, false);

const debugElements = [70, 180, 150, 90, 80, 100, 60, 40];
let debugMode = false;
let currentAlgorithm;
let barWidth = 8;
let barInterval = 1.1;
let elements = debugMode ? [...debugElements] : [];

/* References to play buttons / canvas container */
const shuffleBtn = document.querySelector("#shuffleBtn"),
    restartBtn = document.querySelector("#restartBtn"),
    previousBtn = document.querySelector("#previousBtn"),
    playBtn = document.querySelector("#playBtn"),
    playBtnLabel = document.querySelector("#playButtonText"),
    nextBtn = document.querySelector("#nextBtn"),
    finishBtn = document.querySelector("#finishBtn"),
    speedBtn = document.querySelector("#speedBtn"),
    speedLabel = document.querySelector("#speedBtnText"),
    canvasContainer = document.querySelector(".canvasContainer");
let W = canvasContainer.clientWidth * 0.7,
    H = canvasContainer.clientHeight * 0.8;

/* Refrence to algorithm selection menu */
const algorithms = document.querySelectorAll(".breadCrumb li");
algorithms.forEach(btn => {
    btn.addEventListener('click', selectAlgorithm);
});

if (!debugMode) {
    generateElements();
}

/* Select an algorithm */
currentAlgorithm = new BubbleSort(); /* default algorithm */
let selection = algorithms[0];
selection.setAttribute('class', 'selected');

function selectAlgorithm() {
    if (selection !== this) {
        // console.log("new selection");
        selection.setAttribute('class', '');
        this.setAttribute('class', 'selected');
        selection = this;
    }
    const algorithm = this.querySelector(".label").textContent;
    switch (algorithm) {
        case "bubble":
            currentAlgorithm = new BubbleSort();
            break;
        case "merge":
            currentAlgorithm = new MergeSort();
            break;
        case "quick":
            currentAlgorithm = new QuickSort();
            break;
        case "heap":
            currentAlgorithm = new HeapSort();
            break;
        case "insertion":
            currentAlgorithm = new InserstionSort();
            break;
        case "selection":
            currentAlgorithm = new selectionSort();
            break;
    }
    replay();
}

/* Disable restart and previous step buttons initially */
if (!currentAlgorithm.playing && !currentAlgorithm.finished) {
    disableButtons(true, restartBtn, previousBtn);
}

/* Event listeners on UI buttons */
shuffleBtn.addEventListener('click', shuffleElements);
restartBtn.addEventListener('click', replay);
previousBtn.addEventListener('click', cancelPreviousStep);
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', playNextStep);
finishBtn.addEventListener('click', finishPlay);
speedBtn.addEventListener('click', accelerate);

/* Play/Pause the visulization */
function togglePlay() {
    if (playBtn.innerHTML === "play_arrow") {
        playBtn.innerHTML = "pause";
        playBtnLabel.innerHTML = "pause";
        disableButtons(false, restartBtn);
        disableButtons(true, previousBtn, nextBtn);
    } else {
        playBtn.innerHTML = "play_arrow";
        playBtnLabel.innerHTML = "play";
        currentAlgorithm.paused = true;
        disableButtons(false, previousBtn, nextBtn, restartBtn);
    }

    // toggle the animation state between playing/not playing
    // a paused but not finished animation is considered still playing
    currentAlgorithm.playing = !currentAlgorithm.playing;

    // initial start state
    if (currentAlgorithm.playing && !currentAlgorithm.paused) {
        currentAlgorithm.play();
    }

    // animation resumed from pause
    else if (currentAlgorithm.playing && currentAlgorithm.paused) {
        currentAlgorithm.paused = false;
        currentAlgorithm.resume();
    }
    // animation paused
    else {
        currentAlgorithm.pause();
    }
}

function shuffleElements() {
    FYShuffle(elements);
    replay();
}

function replay() {
    // console.log("replay");
    if (currentAlgorithm.timer) {
        clearInterval(currentAlgorithm.timer);
    }
    currentAlgorithm.reset();
    redraw();
    playBtn.textContent = 'play_arrow';
    playBtnLabel.textContent = 'play';
    disableButtons(true, restartBtn, previousBtn);
    disableButtons(false, playBtn, nextBtn, finishBtn);
}

function finishPlay() {
    // console.log("finishPlay");
    if (currentAlgorithm.timer) {
        clearInterval(currentAlgorithm.timer);
    }
    currentAlgorithm.finish();
}

function cancelPreviousStep() {
    // console.log("previousStep");
    /* cancel last animation by setting forwardMode=false */
    currentAlgorithm.nextStep--;
    if (currentAlgorithm.nextStep === 0) {
        disableButtons(true, previousBtn, restartBtn);
    } else if (currentAlgorithm.finished) {
        currentAlgorithm.paused = true;
        currentAlgorithm.finished = false;
    }
    currentAlgorithm.animateStep(currentAlgorithm.nextStep, false);
    redraw();
}

function playNextStep() {
    // console.log("nextStep");
    if (currentAlgorithm.steps.length === 0) {
        currentAlgorithm.sort();
        currentAlgorithm.arr = [...elements];
    }
    currentAlgorithm.animateStep(currentAlgorithm.nextStep++);
    currentAlgorithm.paused = !currentAlgorithm.finished;
    disableButtons(false, previousBtn, restartBtn);
    redraw();
}

function accelerate() {
    // console.log("accelerate: TODO");
    switch (speedLabel.textContent) {
        case '1x':
            speedLabel.textContent = '2x';
            visualSpeed /= 2;
            break;
        case '2x':
            speedLabel.textContent = '4x';
            visualSpeed /= 2;
            break;
        case '4x':
            speedLabel.textContent = '8x';
            visualSpeed /= 2;
            break;
        case '8x':
            speedLabel.textContent = '1x';
            visualSpeed *= 8;
            break;
    }
    // console.log(speedLabel.textContent);
    // console.log(visualSpeed);
    if (currentAlgorithm.playing && !currentAlgorithm.paused) {
        currentAlgorithm.pause();
        currentAlgorithm.resume();
    }
}

function disableButtons(disabled, ...buttons) {
    buttons.forEach(btn => {
        btn.disabled = disabled;
        btn.parentElement.setAttribute('class', disabled ? 'disabled' : 'enabled');
    });
}

function generateElements() {
    let slot = Math.floor(W / (barInterval * barWidth));
    let delta = 0.8 * H / (slot - 1);
    elements = new Array(slot);
    states = new Array(elements.length);
    for (let i = 0; i < elements.length; i++) {
        elements[i] = 0.1 * H + delta * i;
        states[i] = 'default';
    }
    FYShuffle(elements);
}

/** Fisher and Yates */
function FYShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}