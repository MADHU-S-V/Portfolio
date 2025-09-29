document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for internal links (optional, as Bootstrap 5 handles some)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent default jump
            e.preventDefault(); 
            
            // Get the target element ID
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Simple example of dynamic content (e.g., highlighting a skill)
    console.log("Portfolio loaded successfully. Ready for interaction.");

    // You would use JavaScript here for:
    // - Complex form validation for a Contact form.
    // - Fetching dynamic content (e.g., project details) from a JSON file or API.
    // - Toggling a Light/Dark Mode (a great JS showcase).
});
