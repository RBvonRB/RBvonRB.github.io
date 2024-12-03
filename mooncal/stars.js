/** Enhanced Star Animation with Blinking and 3D Effect **/
function generateStars(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starCount = 200;
    const stars = [];

    // Initialize star properties
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random() * 0.8 + 0.2, // Initial opacity
            flickerSpeed: Math.random() * 0.02 + 0.01, // Speed of opacity changes
            offsetX: 0, // Used for parallax effect
            offsetY: 0, // Used for parallax effect
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

        requestAnimationFrame(drawStars);
    }

    // Parallax effect on swipe or mouse drag
    let lastTouchX = null;
    let lastTouchY = null;
    let lastMouseX = null;
    let lastMouseY = null;
    let isMouseDown = false;

    function handleTouchMove(event) {
        if (lastTouchX !== null && lastTouchY !== null) {
            const deltaX = event.touches[0].clientX - lastTouchX;
            const deltaY = event.touches[0].clientY - lastTouchY;

            // Update star offsets for parallax
            for (const star of stars) {
                star.offsetX += deltaX * 0.05; // Adjust 3D effect strength
                star.offsetY += deltaY * 0.05;
            }
        }

        lastTouchX = event.touches[0].clientX;
        lastTouchY = event.touches[0].clientY;
    }

    function handleTouchEnd() {
        lastTouchX = null;
        lastTouchY = null;

        // Reset offsets for smooth return
        for (const star of stars) {
            star.offsetX *= 0.9;
            star.offsetY *= 0.9;
        }
    }

    function handleMouseMove(event) {
        if (isMouseDown) {
            if (lastMouseX !== null && lastMouseY !== null) {
                const deltaX = event.clientX - lastMouseX;
                const deltaY = event.clientY - lastMouseY;

                // Update star offsets for parallax
                for (const star of stars) {
                    star.offsetX += deltaX * 0.05; // Adjust 3D effect strength
                    star.offsetY += deltaY * 0.05;
                }
            }

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
    }

    function handleMouseDown(event) {
        isMouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        console.log("mousedown");
    }

    function handleMouseUp() {
        isMouseDown = false;
        lastMouseX = null;
        lastMouseY = null;
        console.log("mouseup");

        // Reset offsets for smooth return
        for (const star of stars) {
            star.offsetX *= 0.9;
            star.offsetY *= 0.9;
        }
    }

    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    drawStars();
}


// Initialize stars and animation loop
const canvas = document.getElementById('backgroundCanvas');
generateStars(canvas);

// Adjust stars on window resize
window.addEventListener('resize', () => generateStars(canvas));
