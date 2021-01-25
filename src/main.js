/* prevent mouse double click and drag selection(and probably more) */

document.addEventListener('mousedown', function (event) {
    event.preventDefault();
}, false);

// $(() => {
/* References to UI buttons */
const shuffleBtn = document.querySelector("#shuffleBtn"),
    restartBtn = document.querySelector("#restartBtn"),
    previousBtn = document.querySelector("#previousBtn"),
    playBtn = document.querySelector("#playBtn"),
    playBtnLabel = document.querySelector("#playButtonText"),
    nextBtn = document.querySelector("#nextBtn"),
    finishBtn = document.querySelector("#finishBtn"),
    speedBtn = document.querySelector("#speedBtn"),
    speedLabel = document.querySelector("#speedBtnText");

currentAlgorithm = new MergeSortDebug();

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
    currentAlgorithm.sort();
    currentAlgorithm.states = currentAlgorithm.arr.map(() => 'sorted');
    currentAlgorithm.auxilaryStates = [...currentAlgorithm.states];
    redraw();
    currentAlgorithm.finished = true;
}

function playPreviousStep() {
    console.log("previousStep: TODO");
}

function playNextStep() {
    console.log("nextStep: TODO");
}

function accelerate() {
    console.log("accelerate: TODO");
    switch (speedLabel.textContent) {
        case '1x':
            speedLabel.textContent = '2x';
            break;
        case '2x':
            speedLabel.textContent = '4x';
            break;
        case '4x':
            speedLabel.textContent = '1x';
            break;
    }
    console.log(speedLabel.textContent);
}

function disableButtons(disabled, ...buttons) {
    buttons.forEach(btn => {
        btn.disabled = disabled;
        btn.parentElement.setAttribute('class', disabled ? 'disabled' : 'enabled');
    });
}
// });
