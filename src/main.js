/* prevent mouse double click and drag selection(and probably more) */
document.addEventListener('mousedown', function (event) {
    event.preventDefault();
}, false);

/* References to UI buttons / canvas container */
const shuffleBtn = document.querySelector("#shuffleBtn"),
      restartBtn = document.querySelector("#restartBtn"),
      previousBtn = document.querySelector("#previousBtn"),
      playBtn = document.querySelector("#playBtn"),
      playBtnLabel = document.querySelector("#playButtonText"),
      nextBtn = document.querySelector("#nextBtn"),
      finishBtn = document.querySelector("#finishBtn"),
      speedBtn = document.querySelector("#speedBtn"),
      speedLabel = document.querySelector("#speedBtnText"),
      canvasContainer = document.querySelector(".canvasContainer"),
      W = canvasContainer.clientWidth * 0.7,
      H = canvasContainer.clientHeight * 0.8;

if (!debugMode) {
    generateElements();
}
// currentAlgorithm = new BubbleSortDebug();
currentAlgorithm = new MergeSort();


/* Disable restart and previous step buttons initially */
if (!currentAlgorithm.playing && !currentAlgorithm.finished) {
    disableButtons(true, restartBtn, previousBtn);
}

/* Event listeners on UI buttons */
shuffleBtn.addEventListener('click', shuffleElements);
restartBtn.addEventListener('click', replay);
previousBtn.addEventListener('click', playPreviousStep);
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
    generateElements();
    replay();
}

function replay() {
    console.log("replay");
    if (currentAlgorithm.timer) {
        clearInterval(currentAlgorithm.timer);
    }
    currentAlgorithm.reset();
    redraw();
    playBtn.textContent = 'play_arrow';
    disableButtons(true, restartBtn, previousBtn);
    disableButtons(false, playBtn, nextBtn, finishBtn);
}

function finishPlay() {
    console.log("finishPlay");
    if (currentAlgorithm.timer) {
        clearInterval(currentAlgorithm.timer);
    }
    currentAlgorithm.finish();
}

function playPreviousStep() {
    console.log("previousStep: TODO");
}

function playNextStep() {
    console.log("nextStep");
    if (currentAlgorithm.steps.length === 0) {
        currentAlgorithm.sort();
        currentAlgorithm.arr = [...elements];
    }
    currentAlgorithm.animateStep(currentAlgorithm.nextStep++);
    currentAlgorithm.paused = true;
    disableButtons(false, previousBtn, restartBtn);
    redraw();
}

function accelerate() {
    console.log("accelerate: TODO");
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
            speedLabel.textContent = '1x';
            visualSpeed *= 4;
            break;
    }
    console.log(speedLabel.textContent);
    console.log(visualSpeed);
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
    let slot = Math.floor(W / (2 * barWidth));
    elements = new Array(slot);
    states = new Array(elements.length);
    // dimmed = new Array(elements.length);
    for (let i = 0; i < elements.length; i++) {
        elements[i] = myRandom(H * 0.1, H * 0.9);
        states[i] = 'default';
        // dimmed[i] = 0;
    }
}

function myRandom(from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
}