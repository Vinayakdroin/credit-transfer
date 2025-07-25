/**
 * PIMT - Main JavaScript File
 * Handles interactive functionality for the website
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    const inquiryForm = document.getElementById('inquiryForm');
    const successMessage = document.getElementById('successMessage');

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initScrollEffects();
        initSmoothScrolling();
        initNavbarBehavior();
        initFormHandling();
        initAnimations();
        initBackToTop();
    });

    /**
     * Navbar scroll effects and behavior
     */
    function initScrollEffects() {
        let lastScrollTop = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class for styling
            if (currentScroll > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (mobile)
            if (window.innerWidth <= 768) {
                if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
            }

            lastScrollTop = currentScroll;
        });
    }

    /**
     * Smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip empty hrefs and javascript: links
                if (href === '#' || href.startsWith('#!') || href.startsWith('javascript:')) {
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }

    /**
     * Navbar behavior and interactions
     */
    function initNavbarBehavior() {
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    setTimeout(() => {
                        navbarToggler.click();
                    }, 150);
                }
            });
        });

        // Active link highlighting
        highlightActiveNavLink();
        window.addEventListener('scroll', debounce(highlightActiveNavLink, 100));
    }

    /**
     * Highlight active navigation link based on scroll position
     */
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Form handling and validation
     */
    function initFormHandling() {
        if (!inquiryForm) return;

        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                handleFormSubmission();
            }
        });

        // Real-time validation
        const formInputs = inquiryForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }

    /**
     * Validate individual form field
     */
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing validation classes
        field.classList.remove('is-valid', 'is-invalid');

        // Skip validation for optional fields
        if (!field.hasAttribute('required') && value === '') {
            return true;
        }

        // Required field validation
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'This field is required.';
        }

        // Email validation
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value !== '') {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }

        // Update field appearance
        if (isValid) {
            field.classList.add('is-valid');
            removeFieldError(field);
        } else {
            field.classList.add('is-invalid');
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    /**
     * Show field error message
     */
    function showFieldError(field, message) {
        removeFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentElement.appendChild(errorDiv);
    }

    /**
     * Remove field error message
     */
    function removeFieldError(field) {
        const errorDiv = field.parentElement.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    /**
     * Validate entire form
     */
    function validateForm() {
        const formInputs = inquiryForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;

        formInputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        // Validate terms checkbox
        const termsCheckbox = inquiryForm.querySelector('#terms');
        if (termsCheckbox && !termsCheckbox.checked) {
            isFormValid = false;
            termsCheckbox.classList.add('is-invalid');
            showFieldError(termsCheckbox, 'You must agree to the terms to continue.');
        } else if (termsCheckbox) {
            termsCheckbox.classList.remove('is-invalid');
            termsCheckbox.classList.add('is-valid');
            removeFieldError(termsCheckbox);
        }

        return isFormValid;
    }

    /**
     * Handle form submission
     */
    function handleFormSubmission() {
        const submitButton = inquiryForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner me-2"></span>Submitting...';
        submitButton.classList.add('loading');

        // Collect form data
        const formData = new FormData(inquiryForm);
        const data = Object.fromEntries(formData);

        // Simulate form processing (in real implementation, this would be an API call)
        setTimeout(() => {
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');

            // Show success message
            inquiryForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Scroll to success message
            successMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });

            // In a real implementation, you would send the data to your server
            console.log('Form submitted with data:', data);
            
            // Optional: Send data to external service or email
            // This could be integrated with services like Formspree, Netlify Forms, etc.
            
        }, 2000);
    }

    /**
     * Initialize scroll animations
     */
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .feature-card, .course-card, .partner-card, .testimonial-card, .university-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add staggered animation for grouped elements
                    if (entry.target.closest('.row')) {
                        const siblings = entry.target.closest('.row').querySelectorAll('.fade-in, .feature-card, .course-card, .partner-card, .testimonial-card, .university-card');
                        siblings.forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('visible');
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }

    /**
     * Back to top button functionality
     */
    function initBackToTop() {
        // Create back to top button
        const backToTopButton = document.createElement('button');
        backToTopButton.className = 'btn btn-primary back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.setAttribute('aria-label', 'Back to top');
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: none;
            z-index: 1000;
            box-shadow: var(--box-shadow-lg);
        `;
        
        document.body.appendChild(backToTopButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Smooth scroll to top
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Utility functions
     */

    // Debounce function to limit function calls
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

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Statistics counter animation
     */
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 100;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
    }

    /**
     * Initialize counter animation when stats come into view
     */
    function initCounterAnimation() {
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Initialize counter animation
    document.addEventListener('DOMContentLoaded', initCounterAnimation);

    /**
     * Course card hover effects
     */
    function initCourseCardEffects() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Initialize course card effects
    document.addEventListener('DOMContentLoaded', initCourseCardEffects);

    /**
     * WhatsApp chat integration
     */
    function initWhatsAppIntegration() {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
        
        whatsappLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Track WhatsApp clicks (for analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'Contact',
                        event_label: 'WhatsApp'
                    });
                }
            });
        });
    }

    // Initialize WhatsApp integration
    document.addEventListener('DOMContentLoaded', initWhatsAppIntegration);

    /**
     * Lazy loading for images
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    /**
     * Keyboard navigation support
     */
    function initKeyboardNavigation() {
        // Escape key to close mobile menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });

        // Tab navigation for accessibility
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach((element, index) => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    // Custom tab behavior if needed
                }
            });
        });
    }

    // Initialize keyboard navigation
    document.addEventListener('DOMContentLoaded', initKeyboardNavigation);

    /**
     * Error handling for external resources
     */
    function initErrorHandling() {
        // Handle image loading errors
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Failed to load image:', this.src);
            });
        });

        // Handle general JavaScript errors
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
            // Could send error reports to analytics or error tracking service
        });
    }

    // Initialize error handling
    document.addEventListener('DOMContentLoaded', initErrorHandling);

    // Expose public methods for external use
    window.PIMT = {
        validateForm: validateForm,
        scrollToTop: function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        showNotification: function(message, type = 'info') {
            // Could implement toast notifications
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    };

})();
