/** Enhanced Star Animation with Blinking and 3D Effect **/
let animationFrameId;

function generateStars(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starCount = 200;
    const stars = [];
    const minFlickerSpeed = 0.01;
    const maxFlickerSpeed = 0.02;

    console.log("init");

    // Initialize star properties
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random() * 0.8 + 0.2, // Initial opacity
            flickerSpeed: Math.random() * (maxFlickerSpeed - minFlickerSpeed) + minFlickerSpeed, // Speed of opacity changes
            offsetX: 0,
            offsetY: 0
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const star of stars) {
            // Update opacity for blinking effect
            star.alpha += star.flickerSpeed;
            if (star.alpha > 1 || star.alpha < 0.2) {
                star.flickerSpeed *= -1; // Reverse direction
            }

            ctx.beginPath();
            ctx.arc(star.x + star.offsetX, star.y + star.offsetY, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        }

        animationFrameId = requestAnimationFrame(drawStars);
        console.log("frame: ", animationFrameId);
    }

    drawStars();
}

// Initialize stars and animation loop
const canvas = document.getElementById('backgroundCanvas');
generateStars(canvas);

// Adjust stars on window resize
window.addEventListener('resize', () => {
    cancelAnimationFrame(animationFrameId);
    generateStars(canvas);
});
