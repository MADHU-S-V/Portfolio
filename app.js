document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website initializing...');

    // Initialize all functionality in the correct order
    initEnhancedStarfield();
    initThemeToggle();
    initMobileNavigation();
    initSmoothScrolling();
    initScrollToTop();
    initScrollAnimations();
    initContactForm();
    initActiveNavigation();
    initHeroAnimations();
    optimizeAnimations();
    initLoadingState();

    console.log('All functionality initialized');
});

/**
 * Initializes the starfield background with dynamic blinking stars.
 */
function initEnhancedStarfield() {
    console.log('Initializing enhanced starfield...');
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) {
        console.error('Stars container not found');
        return;
    }

    const numberOfStars = 150;
    console.log(`Generating ${numberOfStars} stars`);
    starsContainer.innerHTML = ''; // Clear existing stars

    for (let i = 0; i < numberOfStars; i++) {
        starsContainer.appendChild(createEnhancedStar(i));
    }
    createConstellationPattern(starsContainer);

    starsContainer.style.display = 'block';
    starsContainer.style.visibility = 'visible';
    console.log('Enhanced starfield generated successfully');
}

/**
 * Creates a single star element with random properties.
 * @param {number} index - The index of the star.
 * @returns {HTMLElement} The star element.
 */
function createEnhancedStar(index) {
    const star = document.createElement('div');
    star.className = 'star';

    // Random positioning
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    // Varied star sizes and brightness
    const starTypes = ['star-small', 'star-medium', 'star-large', 'star-xlarge'];
    const typeWeights = [0.4, 0.35, 0.2, 0.05];
    const starType = getWeightedRandomChoice(starTypes, typeWeights);
    star.classList.add(starType);

    star.style.position = 'absolute';
    star.style.top = `${top}%`;
    star.style.left = `${left}%`;
    star.style.zIndex = '1';

    // Random animation for natural twinkling
    const animationTypes = ['twinkle-1', 'twinkle-2', 'twinkle-3', 'twinkle-4', 'pulse-star'];
    const animationWeights = [0.3, 0.25, 0.2, 0.15, 0.1];
    const animationType = getWeightedRandomChoice(animationTypes, animationWeights);
    const duration = (1.5 + Math.random() * 3.5).toFixed(2);
    const delay = (Math.random() * 4).toFixed(2);

    star.style.animation = `${animationType} ${duration}s infinite`;
    star.style.animationDelay = `${delay}s`;

    star.style.opacity = '0.3';
    star.style.display = 'block';

    return star;
}

/**
 * Creates constellation patterns in the starfield.
 * @param {HTMLElement} container - The container to add the constellations to.
 */
function createConstellationPattern(container) {
    const constellations = [
        { stars: 4, region: { top: 10, left: 20, width: 15, height: 15 } },
        { stars: 3, region: { top: 60, left: 70, width: 12, height: 12 } },
        { stars: 5, region: { top: 80, left: 10, width: 20, height: 15 } }
    ];

    constellations.forEach((constellation) => {
        for (let i = 0; i < constellation.stars; i++) {
            const star = document.createElement('div');
            star.className = 'star star-large constellation-star';

            const top = constellation.region.top + (Math.random() * constellation.region.height);
            const left = constellation.region.left + (Math.random() * constellation.region.width);

            star.style.position = 'absolute';
            star.style.top = `${top}%`;
            star.style.left = `${left}%`;
            star.style.zIndex = '2';
            star.style.animation = `pulse-star ${(2 + Math.random()).toFixed(2)}s infinite`;
            star.style.animationDelay = `${(i * 0.3).toFixed(2)}s`;
            star.style.display = 'block';
            star.style.opacity = '0.5';

            container.appendChild(star);
        }
    });
}

/**
 * Returns a random choice from an array based on weights.
 * @param {Array<string>} choices - The array of choices.
 * @param {Array<number>} weights - The array of weights.
 * @returns {string} The chosen item.
 */
function getWeightedRandomChoice(choices, weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < choices.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return choices[i];
        }
    }

    return choices[choices.length - 1];
}

/**
 * Initializes the theme toggle functionality.
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }

    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    let currentTheme = 'dark'; // Default to dark theme
    body.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme, themeIcon);

    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-color-scheme', currentTheme);
        body.classList.add('theme-transitioning');
        updateThemeIcon(currentTheme, themeIcon);
        updateXThemeElements(currentTheme);

        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 300);

        console.log(`Theme switched to: ${currentTheme}`);
    });
}

/**
 * Updates the theme icon based on the current theme.
 * @param {string} theme - The current theme ('dark' or 'light').
 * @param {HTMLElement} iconElement - The icon element to update.
 */
function updateThemeIcon(theme, iconElement) {
    if (iconElement) {
        iconElement.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/**
 * Updates theme-specific elements.
 * @param {string} theme - The current theme.
 */
function updateXThemeElements(theme) {
    const header = document.querySelector('.header');
    if (header) {
        header.style.background = theme === 'dark' ? 'rgba(21, 32, 43, 0.8)' : 'rgba(255, 255, 255, 0.9)';
        header.style.backdropFilter = 'blur(12px)';
    }

    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.background = theme === 'dark' ?
            'linear-gradient(135deg, #15202b 0%, #22303c 100%)' :
            'linear-gradient(135deg, #ffffff 0%, #f7f9fa 100%)';
    }
}

/**
 * Initializes the mobile navigation menu.
 */
function initMobileNavigation() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenu || !mobileNavOverlay) {
        console.error('Mobile navigation elements not found');
        return;
    }

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = mobileNavOverlay.classList.contains('hidden');
        mobileNavOverlay.classList.toggle('hidden');
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            icon.className = isHidden ? 'fas fa-times' : 'fas fa-bars';
        }
        document.body.style.overflow = isHidden ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.add('hidden');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileNavOverlay.contains(e.target)) {
            mobileNavOverlay.classList.add('hidden');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initializes smooth scrolling for anchor links.
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('http')) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            if (href === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetSection = document.querySelector(href);
            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 64;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: Math.max(targetPosition, 0),
                    behavior: 'smooth'
                });
            } else {
                console.error(`Target section not found: ${href}`);
            }
        });
    });
}

/**
 * Initializes the "scroll to top" button.
 */
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) {
        console.error('Scroll to top button not found');
        return;
    }

    const toggleScrollToTopButton = () => {
        scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    };

    const scrollToTop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', debounce(toggleScrollToTopButton, 10));
    scrollToTopBtn.addEventListener('click', scrollToTop);
    toggleScrollToTopButton();
}

/**
 * Initializes scroll-triggered animations.
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.skill-category, .project-card, .contact-item');
    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

/**
 * Initializes active navigation link highlighting.
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 100;

        if (window.scrollY < 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            mobileNavLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('a[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
            return;
        }

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const isActive = scrollPosition >= top && scrollPosition < bottom;

            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.toggle('active', isActive);
                } else {
                    link.classList.remove('active');
                }
            });
            mobileNavLinks.forEach(link => {
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.toggle('active', isActive);
                } else {
                    link.classList.remove('active');
                }
            });
        });
    };

    window.addEventListener('scroll', debounce(updateActiveNav, 10));
    updateActiveNav();
}


/**
 * Initializes the contact form with validation.
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
        console.log('Contact form not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                validateField(input);
            }
        });
        input.addEventListener('input', () => clearFieldError(input));
    });
}

/**
 * Validates all fields in the contact form.
 * @returns {boolean} True if the form is valid, false otherwise.
 */
function validateForm() {
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    let isValid = true;
    fields.forEach(id => {
        const field = document.getElementById(id);
        if (field && !validateField(field)) {
            isValid = false;
        }
    });
    return isValid;
}

/**
 * Validates a single form field.
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The field to validate.
 * @returns {boolean} True if the field is valid, false otherwise.
 */
function validateField(field) {
    const value = field.value.trim();
    const id = field.id;
    let errorMessage = '';

    if (!value) {
        errorMessage = `${id.charAt(0).toUpperCase() + id.slice(1)} is required.`;
    } else {
        switch (id) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMessage = 'Please enter a valid email address.';
                }
                break;
            case 'phone':
                if (value.replace(/\D/g, '').length < 10) {
                    errorMessage = 'Please enter a valid phone number (at least 10 digits).';
                }
                break;
        }
    }

    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = errorMessage ? 'block' : 'none';
    }
    field.classList.toggle('form-error', !!errorMessage);
    return !errorMessage;
}

/**
 * Clears the error message for a form field.
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The field to clear the error for.
 */
function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    field.classList.remove('form-error');
}

/**
 * Simulates submitting the contact form.
 */
function submitForm() {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
    }, 1500);
}

/**
 * Shows a message to the user after form submission.
 * @param {string} message - The message to show.
 * @param {string} type - The type of message ('success' or 'error').
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.classList.remove('hidden');

        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

/**
 * Initializes animations for the hero section.
 */
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroElements = heroContent.children;
        Array.from(heroElements).forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.animation = `slideInUp 0.8s ease-out ${index * 0.15}s forwards`;
        });
    }
}

/**
 * Optimizes animations for performance and accessibility.
 */
function optimizeAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const animatedElements = document.querySelectorAll('.star, .comet, .shooting-star');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.display = el.classList.contains('star') ? 'block' : 'none';
            if (el.classList.contains('star')) el.style.opacity = '0.3';
        });
    }

    document.addEventListener('visibilitychange', () => {
        const animatedElements = document.querySelectorAll('.star, .comet');
        const state = document.hidden ? 'paused' : 'running';
        animatedElements.forEach(el => {
            el.style.animationPlayState = state;
        });
    });
}

/**
 * Manages the loading state of the page.
 */
function initLoadingState() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 80);
            });
            const stars = document.querySelectorAll('.star');
            stars.forEach(star => {
                star.style.opacity = '1';
            });
        }, 300);
    });
}

/**
 * A utility function to debounce function calls.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The debounce delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
