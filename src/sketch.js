// Sorting Visualization
// Inspired by Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/143-quicksort.html
// https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// https://youtu.be/eqo2LxRADhU

const debugElements = [70, 180, 150, 90, 80, 100, 60, 40];
let debugMode = false;
let currentAlgorithm;
let barWidth = 8;
let visualSpeed = 50;
let elements = debugMode ? [...debugElements] : [];
let colors;
// let dimmed;             // 1: dim the color of the ith bar, 0: otherwise
let bgColor = '#323232';


// Setup a p5 canvas
function setup() {
    let cnv = createCanvas(W, H);
    colors = {
        default: color('#CDCDCD'),
        sorted: color('#850ad6'),
        activated: color('#10E5DE'),
        compared: color('#BB86FC'),     // winner of a comparison
    };
}

function windowResized() {
    // automatic window resizing
    resizeCanvas(windowWidth * 0.7, windowHeight * 0.6);
}

/* Draw the bars on canvas */
function draw() {
    if (!currentAlgorithm.playing || currentAlgorithm.finished) {stop_animation();}
    console.log("drawing...");
    background(bgColor);
    currentAlgorithm.show();
}

function stop_animation() {
    noLoop();
}
function animate() {
    loop();
}

