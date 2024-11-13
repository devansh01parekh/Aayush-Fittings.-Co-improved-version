let zipperLine = document.getElementById('zipper-line');
let logoContainer = document.getElementById('logo-container');
let logo = document.getElementById('logo');
let welcomeMessage = document.getElementById('welcome-message');
let dynamicIsland = document.getElementById('dynamic-island');
let mainContent = document.getElementById('main-content');
let sections = document.querySelectorAll('section');

window.onload = function () {
    // Ensure the page is at the top before starting the animation
    window.scrollTo(0, 0); // Scroll to the top immediately when the page loads

    // Start logo rotation and movement to the left simultaneously
    setTimeout(() => {
        // Rotate -45 degrees and move left simultaneously
        logo.style.transform = 'rotate(-45deg)';
        logoContainer.style.transition = 'transform 2s ease-in-out, left 2s ease-in-out';
        logoContainer.style.left = '5%'; // Move to the left while rotating
        logoContainer.style.transform = 'translateY(-50%) rotate(-45deg)'; // Rotate -45 degrees and move together

        // After the logo reaches the left, start moving both logo and zipper to the right
        setTimeout(() => {
            zipperLine.style.opacity = 1; // Show zipper
            zipperLine.style.transition = 'width 4s ease, opacity 1.5s ease';
            zipperLine.style.width = '90vw'; // Extend zipper to the right

            // Move logo to the right together with the zipper
            logoContainer.style.transition = 'left 4s ease';
            logoContainer.style.left = '95%'; // Move logo to the right

            // Fade out the logo and zipper after they reach the right
            setTimeout(() => {
                logoContainer.style.opacity = 0;
                zipperLine.style.opacity = 0;

                // Reveal welcome message after the logo fades out
                setTimeout(() => {
                    welcomeMessage.style.opacity = 1;
                    document.addEventListener('scroll', handleScroll);
                }, 1000);
            }, 4000); // Match this duration with the transition of the logo and zipper movement
        }, 2000); // Delay before moving from left to right
    }, 1500); // Initial delay before the rotation and movement start
};

function handleScroll() {
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Fade out the welcome message and fade in the main content as you scroll down
    if (scrolled > welcomeMessage.offsetHeight / 2) {
        welcomeMessage.style.opacity = 0;
        dynamicIsland.style.opacity = 1;
        mainContent.style.opacity = 1;
    } else {
        // Fade in the welcome message as you scroll back up
        welcomeMessage.style.opacity = 1;
        dynamicIsland.style.opacity = 0;
        mainContent.style.opacity = 0;
    }

    // Apply fade-in/out effect for each section when scrolling up and down
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if the section is in the viewport (scrolling down or up)
        if (
            scrolled >= sectionTop - viewportHeight / 2 &&
            scrolled < sectionTop + sectionHeight - viewportHeight / 2
        ) {
            section.style.opacity = 1;
        } else {
            section.style.opacity = 0;
        }
    });
}

// Smooth scroll to section on button click
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
