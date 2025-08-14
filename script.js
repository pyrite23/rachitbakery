// Vintage Modern JavaScript for Rachit Bakery

document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }, 1500);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar-vintage');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/Show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let mobileMenuOpen = false;

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuOpen = !mobileMenuOpen;
        
        if (mobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuOpen = false;
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.remove('hidden');
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.add('hidden');
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Indicator in Hero Section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.vintage-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Observe about section cards
    const aboutCards = document.querySelectorAll('.vintage-about-card');
    aboutCards.forEach(card => {
        observer.observe(card);
    });

    // Parallax Effect for Hero Section
    const heroSection = document.getElementById('home');
    const heroImages = heroSection.querySelectorAll('img');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrolled <= heroHeight) {
            heroImages.forEach((img, index) => {
                const rate = scrolled * -0.3 * (index + 1);
                img.style.transform = `translateY(${rate}px)`;
            });
        }
    });

    // Dynamic Text Animation
    const heroTitle = document.querySelector('.vintage-hero h2');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.innerHTML = word + ' ';
            span.style.animationDelay = `${index * 0.2}s`;
            span.classList.add('fade-in-up');
            heroTitle.appendChild(span);
        });
    }

    // Service Card Hover Effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Image Lazy Loading
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('fade-in-up');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Form Submission Handler (if needed for future contact forms)
    function handleFormSubmission(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    submitBtn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1000);
            });
        }
    }

    // Easter Egg: Konami Code
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Trigger special animation
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 4000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Add rainbow animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Performance Optimization: Throttle scroll events
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

    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(function() {
        // Scroll-related animations and effects go here
        const scrolled = window.pageYOffset;
        
        // Update scroll progress indicator
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrolled / documentHeight) * 100;
        
        // You can use this for a progress bar if needed
        // progressBar.style.width = scrollProgress + '%';
        
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScrollHandler);

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function(e) {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles for keyboard navigation
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--vintage-gold) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(focusStyle);

    // Initialize tooltips (if any are added in the future)
    function initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltipText = this.getAttribute('data-tooltip');
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipText;
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }

    initializeTooltips();

    // Console message for developers
    console.log(`
    🍰 Welcome to Rachit Bakery! 🍰
    
    Built with love and vintage style.
    Developed by baRk Apps
    
    If you're seeing this, you might be a developer!
    Feel free to reach out: pyritesoftware@gmail.com
    `);

});
