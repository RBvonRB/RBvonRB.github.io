/** Enhanced Star Animation with Blinking and 3D Effect **/
let stars = [];
const starCount = 200;
const minFlickerSpeed = 0.01;
const maxFlickerSpeed = 0.02;

function setup() {
    createCanvas(windowWidth, windowHeight);
    initializeStars();
}

function draw() {
    background(0);
    drawStars();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initializeStars();
}

function initializeStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            radius: random(0.5, 1.5),
            alpha: random(0.2, 1),
            flickerSpeed: random(minFlickerSpeed, maxFlickerSpeed)
        });
    }
}

function drawStars() {
    for (const star of stars) {
        star.alpha += star.flickerSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
            star.flickerSpeed *= -1;
        }

        noStroke();
        fill(255, 255, 255, star.alpha * 255);
        ellipse(star.x, star.y, star.radius * 2);
    }
}
