/* 
Play/Pause the visulization
*/
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

}