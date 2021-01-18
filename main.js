/* prevent mouse double click and drag selection(and probably more) */
document.addEventListener('mousedown', function (event) {
    event.preventDefault();
}, false);

/* Play/Pause the visulization */
function togglePlay() {
    $(document).ready(function () {
        let ele = document.getElementById("playButton");
        let ele_text = document.getElementById("playButtonText");
        if (ele.innerHTML === "play_arrow") {
            ele.innerHTML = "pause";
            ele_text.innerHTML = "pause";
        } else {
            ele.innerHTML = "play_arrow";
            ele_text.innerHTML = "play";
            // have_paused = 1;
            currentAlgorithm.have_paused = true;
        }
        currentAlgorithm.playing = !currentAlgorithm.playing;
        // playing = !playing;

        // initial start state
        if (currentAlgorithm.playing && !currentAlgorithm.have_paused) {
            // console.log("initial");
            currentAlgorithm.sort();
            animate();
        }
        // resume from pause
        else if (currentAlgorithm.playing && currentAlgorithm.have_paused) {
            // console.log("resume");
            currentAlgorithm.resume();
        }
        // pause the animation
        else {
            // console.log("pause");
            currentAlgorithm.pause();
        }
    });
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
    let speed = document.getElementById("speedDisplay");
    console.log(speed.innerHTML);
    switch (speed.innerHTML) {
        case '1x':
            speed.innerHTML = '2x';
            break;
        case '2x':
            speed.innerHTML = '4x';
            break;
        case '4x':
            speed.innerHTML = '1x';
            break;
    }
}
