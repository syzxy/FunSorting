// QuickSort Visulization
// Inspired by Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/143-quicksort.html
// https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// https://youtu.be/eqo2LxRADhU

// let debugElements = [70, 180, 150, 90, 80, 100, 60, 40];
let elements;
let states;             // 0: default, 1: sorted, 2: activate, 3: disabled
let colors;
let dimmed;             // 1: dim the color of the ith bar, 0: otherwise
let currentAlgorithm;
const barWidth = 10;
const visualSpeed = 10;
// let playing = 0;
// let have_paused = 0;

// Taken from:
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
// arrow function (param list) => x is short for f(param list) {return x;}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Setup a p5 canvas
function setup() {
    // display:avoid avoids display of the scroll bar
    let cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    cnv.style('dispaly', 'block');
    cnv.parent('canvasContainer');
    generateElements();
    colors = [
        color('#FFFFFF'),   // default
        color('#BB86FC'),   // sorted
        color('#03DAC5')    // activated
    ]
    // currentAlgorithm = new BubbleSort();
    currentAlgorithm = new MergeSort();
}

function windowResized() {
    // automatic window resizing
    resizeCanvas(windowWidth * 0.8, windowHeight * 0.8);
}

function draw() {
    if (!currentAlgorithm.playing || currentAlgorithm.finished) { noLoop(); }
    console.log("drawing...");
    background(0, 0, 0);
    currentAlgorithm.show();
}

function generateElements() {
    elements = new Array(floor(width / barWidth));
    states = new Array(elements.length);
    dimmed = new Array(elements.length);
    for (let i = 0; i < elements.length; i++) {
        elements[i] = random(height * 0.1, height * 0.9);
        states[i] = 0;
        dimmed[i] = 0;
    }
}

function stop_animate() {
    noLoop();
}
function animate() {
    loop();
}


