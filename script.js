//Typing Effect Script
     let i = 0;
     const text = "I'm Willem Smit";  // The text you want to type
const speed = 115;  // Adjust typing speed (in milliseconds)
const repeatDelay = 4000; // Delay between repeats (4 seconds)
    
     function typeWriter() {
         if (i < text.length) {
             document.getElementById("typing-text").innerHTML += text.charAt(i);
             i++;
             setTimeout(typeWriter, speed);  // Recursive function to keep typing
         } else {
             // Wait 4 seconds and restart typing
             setTimeout(() => {
                 document.getElementById("typing-text").innerHTML = ""; // Clear text
                 i = 0; // Reset index
                 typeWriter(); // Start again
             }, repeatDelay);
         }
     }
     // Start the typing effect once the page is fully loaded
     window.onload = typeWriter;
     // Get the canvas element and its context
     const canvas = document.getElementById('universe');
     const ctx = canvas.getContext('2d');

     // Set canvas size
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;

     // Star properties
     const stars = [];
     const numStars = 300; // Number of stars to create

     // Mouse position
     let mouseX = canvas.width / 2;
     let mouseY = canvas.height / 2;
     let mouseProximity = 10; // Mouse proximity to trigger lighting up stars

     // Create stars
     for (let i = 0; i < numStars; i++) {
         stars.push({
             x: Math.random() * canvas.width,
             y: Math.random() * canvas.height,
             size: Math.random() * 2 + 1, // Star size
             speed: Math.random() * 0.5 + 0.3, // Star speed (how fast it moves)
             alpha: Math.random() * 0.1 + 0.2, // Star brightness
             connectedStars: []
         });
     }
     // Function to animate the stars
     function animateStars() {
         // Clear the canvas
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         // Loop through each star
         stars.forEach(star => {
             // Update the position of each star based on its speed
             star.x += star.speed * (Math.random() - 0.5);
             star.y += star.speed * (Math.random() - 0.5);
             // Draw the star
             ctx.beginPath();
             ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2, false);
             ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
             ctx.fill();
         });
         // Draw connections (network effect)
         connectStars();
         // Add the mouse effect (lighting up stars)
         lightUpStars(mouseX, mouseY);
         // Request the next frame
         requestAnimationFrame(animateStars);
     }
     // Function to light up stars near the mouse
     function lightUpStars(mouseX, mouseY) {
         stars.forEach(star => {
             const dist = Math.sqrt(Math.pow(star.x - mouseX, 2) + Math.pow(star.y - mouseY, 2));

             // Calculate the distance and adjust brightness
             const intensity = Math.max(0, 1 - dist / mouseProximity); // Distance-based intensity
             star.alpha = Math.random() * 0.5 + 0.5 + intensity * 0.7; // Increase brightness as mouse gets closer
         });
     }

     // Function to connect stars (like a network)
     function connectStars() {
         for (let i = 0; i < stars.length; i++) {
             for (let j = i + 1; j < stars.length; j++) {
                 const star1 = stars[i];
                 const star2 = stars[j];

                 const dist = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2));

                 // Draw a line between stars if they are close enough
                 if (dist < 150) { // You can adjust the distance threshold here
                     const alpha = (1 - dist / 150) * 0.5; // Line fades as stars get farther apart
                     ctx.beginPath();
                     ctx.moveTo(star1.x, star1.y);
                     ctx.lineTo(star2.x, star2.y);
                     ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                     ctx.lineWidth = 0.5;
                     ctx.stroke();
                 }
             }
         }
     }
     // Function to toggle dropdown and manage active class
function toggleDropdown(expId, element) {
    const details = document.getElementById(expId);
    const isActive = element.classList.contains('active');
    const arrow = element.querySelector('.arrow');  // Find the arrow element

    // If the clicked dropdown is not active, open it
    if (!isActive) {
        details.style.display = 'block';
        element.classList.add('active');
        arrow.textContent = '-'; // Change arrow to minus
    } else {
        // If it is active, just close it
        details.style.display = 'none';
        element.classList.remove('active');
        arrow.textContent = '+'; // Change arrow to plus
    }
}
     // Event listener to track mouse position
     canvas.addEventListener('mousemove', (e) => {
         mouseX = e.clientX;
         mouseY = e.clientY;
     });

     // Start the animation loop
     animateStars();
     // Adjust canvas size on window resize
     window.addEventListener('resize', () => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
     });

     // Set initial canvas size
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
