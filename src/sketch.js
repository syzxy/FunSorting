let visualSpeed = 40;
let colors;
let bgColor = '#c5d4b7';
let barWidth = 5;
let barInterval = 1.05;

// Setup a p5 canvas
function setup() {
    let cnv = createCanvas(W, H);
    strokeCap(PROJECT);
    frameRate(30);
    colors = {
        default: color('#91968f'),
        sorted: color('#323232'),
        activated: color('#1147da'),
        compared: color('#c21b1b'),     // winner of a comparison
    };
}

function windowResized() {
    // automatic window resizing
    W = windowWidth * 0.7;
    H = windowHeight * 0.6;
    resizeCanvas(W, H);
    generateElements();
    shuffleElements();
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

