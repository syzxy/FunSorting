// Sorting Visualization
// Inspired by Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/143-quicksort.html
// https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// https://youtu.be/eqo2LxRADhU

const debugElements = [70, 180, 150, 90, 80, 100, 60, 40];
let debugMode = true;
let elements = debugMode ? [...debugElements] : [];
let currentAlgorithm;
let colors;
// let dimmed;             // 1: dim the color of the ith bar, 0: otherwise
let barWidth = 6;
let visualSpeed = 200;
let bgColor = '#323232';

// Setup a p5 canvas
function setup() {
    let cnv = createCanvas(windowWidth * 0.7, windowHeight * 0.7);
    if (!debugMode) {
        generateElements();
    }
    colors = {
        default: color('#CDCDCD'),
        sorted: color('#850ad6'),
        activated: color('#10E5DE'),
        compared: color('#BB86FC'),     // winner of a comparison
    };
    // currentAlgorithm = new BubbleSort();
    // currentAlgorithm = new MergeSort();
}

function windowResized() {
    // automatic window resizing
    resizeCanvas(windowWidth * 0.7, windowHeight * 0.7);
}

/* Draw the bars on canvas */
function draw() {
    if (!currentAlgorithm.playing || currentAlgorithm.finished) {stop_animation();}
    console.log("drawing...");
    background(bgColor);
    currentAlgorithm.show();
}

function generateElements() {
    let slot = floor(width / (2 * barWidth));
    elements = new Array(slot);
    states = new Array(elements.length);
    // dimmed = new Array(elements.length);
    for (let i = 0; i < elements.length; i++) {
        elements[i] = random(height * 0.1, height * 0.9);
        states[i] = 'default';
        // dimmed[i] = 0;
    }
}

function stop_animation() {
    noLoop();
}
function animate() {
    loop();
}
