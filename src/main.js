/* prevent mouse double click and drag selection(and probably more) */
document.addEventListener('mousedown', function (event) {
    event.preventDefault();
}, false);

$(() => {
    /* References to buttons */
    const shuffleBtn = document.querySelector("#shuffleBtn");
    const restartBtn = document.querySelector("#restartBtn");
    const previousBtn = document.querySelector("#previousBtn");
    const playBtn = document.querySelector("#playBtn");
    const playBtnLabel = document.querySelector("#playButtonText");
    const nextBtn = document.querySelector("#nextBtn");
    const finishBtn = document.querySelector("#finishBtn");
    const speedBtn = document.querySelector("#speedBtn");
    const speedLabel = document.querySelector("#speedBtnText");

    /* Event listeners */
    shuffleBtn.addEventListener('click', shuffleElements);
    playBtn.addEventListener('click', togglePlay);
    speedBtn.addEventListener('click', accelerate);

    /* Play/Pause the visulization */
    function togglePlay() {
        if (playBtn.innerHTML === "play_arrow") {
            playBtn.innerHTML = "pause";
            playBtnLabel.innerHTML = "pause";
        } else {
            playBtn.innerHTML = "play_arrow";
            playBtnLabel.innerHTML = "play";
            // paused = 1;
            currentAlgorithm.paused = true;
        }
        // toggle the animation state between playing/not playing
        // a paused, unfunished sorting is considered still playing
        currentAlgorithm.playing = !currentAlgorithm.playing;

        // initial start state
        if (currentAlgorithm.playing && !currentAlgorithm.paused) {
            // console.log("initial state");
            currentAlgorithm.sort();
            animate();
        }
        // animation resumed from pause
        else if (currentAlgorithm.playing && currentAlgorithm.paused) {
            // console.log("resume");
            currentAlgorithm.resume();
        }
        // animation paused
        else {
            // console.log("pause");
            currentAlgorithm.pause();
        }
    }

    function shuffleElements() {
        currentAlgorithm.reset();
        generateElements();
        redraw();
    }

    function replay() {
        console.log("replay: TODO");
    }

    function finishPlay() {
        console.log("finishPlay: TODO");
    }

    function lastStep() {
        console.log("nextStep: TODO");
    }

    function nextStep() {
        console.log("nextStep: TODO");
    }

    function accelerate() {
        console.log("accelerate: TODO");
        console.log(speedBtn.innerHTML);
        switch (speedBtn.innerHTML) {
            case '1x':
                speedBtn.innerHTML = '2x';
                break;
            case '2x':
                speedBtn.innerHTML = '4x';
                break;
            case '4x':
                speedBtn.innerHTML = '1x';
                break;
        }
    }
});
