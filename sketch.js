// QuickSort Visulization
// Inspired by Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/143-quicksort.html
// https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// https://youtu.be/eqo2LxRADhU

// let debugElements = [70, 180, 150, 90, 80, 100, 60, 40];
let elements = [];
let states = [];
let currentAlgorithm;
const barWidth = 10;
let visualSpeed = 20;
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
    let cnv = createCanvas(600, 400);
    // cnv.style('dispaly', 'block');
    cnv.parent('canvasContainer');
    elements = new Array(floor(width / barWidth));
    for (let i = 0; i < elements.length; i++) {
        elements[i] = random(height * 0.9);
        states[i] = -1;
    }
    currentAlgorithm = new BubbleSort(elements);
    // if (!currentAlgorithm.playing) { noLoop(); }
}

function windowResized() {
    // automatic window resizing
    resizeCanvas(600, 400);
}

function draw() {
    if (!currentAlgorithm.playing || currentAlgorithm.finished) { noLoop(); }
    console.log("drawing...")
    background(0, 0, 0);
    for (let i = 0; i < elements.length; i++) {
        if (states[i] == 0) {
            fill('#E0777D');
        } else {
            fill(255);
        }
        rect(i * barWidth, height - elements[i], barWidth, elements[i]);
    }
}

function stop_animate() {
    noLoop();
}
function animate() {
    loop();
}


