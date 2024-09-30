function toggleMenu() {
    const navLinks = document.querySelector('nav ul');
    navLinks.classList.toggle('active');
}


// Select canvas and set context for drawing
const canvas = document.getElementById('skydiver-simulation');
const ctx = canvas.getContext('2d');

const feedbackText = document.getElementById('feedback-text');

// Define skydiver object
const skydiver = {
    x: canvas.width / 2,
    y: 50,
    width: 50,
    height: 50,
    speedY: 2,
    tilt: 0,  // Tilt angle for balance
    isTiltingLeft: false,
    isTiltingRight: false,
    tiltSpeed: 1.5, // Speed of tilt when controlling
};

// Skydiver control
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        skydiver.isTiltingLeft = true;
    } else if (e.code === 'ArrowRight') {
        skydiver.isTiltingRight = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') {
        skydiver.isTiltingLeft = false;
    } else if (e.code === 'ArrowRight') {
        skydiver.isTiltingRight = false;
    }
});

// Draw skydiver
function drawSkydiver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Simulate falling motion
    skydiver.y += skydiver.speedY;

    // Boundary condition: reset when hitting bottom
    if (skydiver.y + skydiver.height > canvas.height) {
        skydiver.y = 50;
    }

    // Handle skydiver tilt for left and right arrow keys
    if (skydiver.isTiltingLeft && skydiver.tilt > -15) {
        skydiver.tilt -= skydiver.tiltSpeed;
    } else if (skydiver.isTiltingRight && skydiver.tilt < 15) {
        skydiver.tilt += skydiver.tiltSpeed;
    } else {
        // Gradually reset tilt to 0 when not tilting
        if (skydiver.tilt > 0) skydiver.tilt -= 0.5;
        if (skydiver.tilt < 0) skydiver.tilt += 0.5;
    }

    // Update real-time feedback based on tilt
    if (skydiver.tilt > 10) {
        feedbackText.textContent = "You're tilting too much to the right!";
    } else if (skydiver.tilt < -10) {
        feedbackText.textContent = "You're tilting too much to the left!";
    } else {
        feedbackText.textContent = "Great balance! Keep it up!";
    }

    // Draw skydiver (a simple rectangle here for now)
    ctx.save();
    ctx.translate(skydiver.x, skydiver.y);
    ctx.rotate(skydiver.tilt * Math.PI / 180);  // Apply tilt
    ctx.fillStyle = '#21B3A4';
    ctx.fillRect(-skydiver.width / 2, -skydiver.height / 2, skydiver.width, skydiver.height);
    ctx.restore();
}

// Animation loop
function update() {
    drawSkydiver();
    requestAnimationFrame(update);
}

// Start the simulation
update();








document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simulate a successful form submission
    alert(`Thank you, ${name}! Your message has been sent.`);
    
    // Optionally, reset the form
    this.reset();
});


