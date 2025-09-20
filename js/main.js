document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 50,
        easing: 'ease-in-out'
    });

    // Mobile Navigation Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon between bars and X
            const icon = mobileMenuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Close mobile menu if it's open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            // Smooth scroll to the target
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Close mobile menu when clicking any navigation link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            header.classList.add('glass-nav');
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('glass-nav');
        }

        // Show/hide back to top button
        const backToTopButton = document.getElementById('back-to-top');
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('opacity-0');
                backToTopButton.classList.add('opacity-100');
            } else {
                backToTopButton.classList.remove('opacity-100');
                backToTopButton.classList.add('opacity-0');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Typing animation using Typed.js
    const greetingElement = document.getElementById('greeting');
    if (greetingElement && typeof Typed !== 'undefined') {
        const typed = new Typed('#greeting', {
            strings: ["Hi, I'm NaveedCR#8.1 👋", "I'm a Software Engineer 💻", "I create web applications 🌐", "I build mobile apps 📱"],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            cursorChar: '|',
            showCursor: true
        });
    }

    // Dark mode toggle
    const themeToggleButton = document.getElementById('theme-toggle');
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    // Check for user preference in localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && systemDarkMode)) {
        document.documentElement.classList.add('dark');
        if (themeToggleButton) {
            themeToggleButton.innerHTML = sunIcon;
        }
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggleButton) {
            themeToggleButton.innerHTML = moonIcon;
        }
    }

    // Toggle theme with animation
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            // Add transition class to body
            document.body.classList.add('transition-theme');
            
            // Toggle dark class
            document.documentElement.classList.toggle('dark');
            
            // Update button icon with animation
            themeToggleButton.classList.add('rotate-animation');
            
            setTimeout(() => {
                if (document.documentElement.classList.contains('dark')) {
                    themeToggleButton.innerHTML = sunIcon;
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeToggleButton.innerHTML = moonIcon;
                    localStorage.setItem('theme', 'light');
                }
                themeToggleButton.classList.remove('rotate-animation');
            }, 200);
        });
    }

    // Update active state of navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    function highlightNavLink() {
        // Set the active class for the current page in the navigation
        if (window.location.pathname.includes('resume.html')) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes('resume.html')) {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        const scrollPosition = window.scrollY + 100; // Offset to trigger highlight earlier
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }

            // Special case for top of page (home)
            if (scrollPosition < 300) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' || link.getAttribute('href') === '#hero') {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial check
    
    // Initialize Particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Add class to animate elements when they come into view
    const animateElements = document.querySelectorAll('.slideUp, .slideDown, .slideLeft, .slideRight, .rotateIn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Animate skill bars when they become visible
    const skillBars = document.querySelectorAll('.bg-indigo-600.h-2.5');
    skillBars.forEach(bar => {
        // Initially set width to 0
        bar.style.width = '0';
        
        // Create observer for this skill bar
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get target width from data attribute
                    const targetWidth = entry.target.getAttribute('data-width');
                    // Animate to target width
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 200);
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        barObserver.observe(bar);
    });
    
    // Add CSS animations for buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', () => {
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 300);
        });
    });
    
    // Add preloader and page transition
    window.addEventListener('load', () => {
        const preloader = document.createElement('div');
        preloader.className = 'preloader fixed inset-0 bg-white dark:bg-gray-900 z-[9999] flex items-center justify-center';
        preloader.innerHTML = '<div class="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>';
        document.body.appendChild(preloader);
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                document.body.classList.add('loaded');
            }, 300);
        }, 500);
    });
}); 