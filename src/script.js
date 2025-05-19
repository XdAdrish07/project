document.addEventListener('DOMContentLoaded', function() {
    // ===== Donor Type Selection =====
    const donorTypeRadios = document.querySelectorAll('input[name="donor-type"]');
    const orgNameField = document.querySelector('.org-name');

    donorTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'organization') {
                orgNameField.style.display = 'block';
                document.querySelector('label[for="donor-name"]').textContent = 'Contact Person Name';
            } else {
                orgNameField.style.display = 'none';
                document.querySelector('label[for="donor-name"]').textContent = 'Full Name';
            }
        });
    });

    
    // ===== Location Button Functionality =====
    const locationBtns = document.querySelectorAll('.location-btn');

    locationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const inputField = this.parentElement.querySelector('input');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        inputField.value = `Location detected (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
                    },
                    function(error) {
                        console.error("Error getting location:", error.message);
                        alert("Could not get your location. Please enter it manually.");
                    }
                );
            } else {
                alert("Geolocation is not supported by your browser.");
            }
        });
    });

    // ===== Google Sign-In Placeholder =====
    const googleLoginBtns = document.querySelectorAll('.google-login-btn');

    googleLoginBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert("Google Sign-In would be initiated here. This requires implementing Google OAuth.");
        });
    });

    // ===== Modal Functionality =====
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginBtn = document.getElementById('login-button');
    const registerBtn = document.getElementById('register-button');
    const ctaRegisterBtn = document.getElementById('cta-register-button');
    const closeLoginBtn = document.getElementById('close-login-modal');
    const closeRegisterBtn = document.getElementById('close-register-modal');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');

    // Login Modal
    if (loginBtn && loginModal && closeLoginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        closeLoginBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Register Modal
    if (registerBtn && registerModal && closeRegisterBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        if (ctaRegisterBtn) {
            ctaRegisterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                registerModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        }
        closeRegisterBtn.addEventListener('click', function() {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (registerModal && e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Toggle password visibility
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🔒';
        });
    }

    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // ===== Register Tabs =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            const panelId = button.getAttribute('data-panel');
            document.getElementById(panelId).classList.add('active');
        });
    });

    // ===== Mission Section Animation =====
    const missionItems = document.querySelectorAll('.mission-list li');

    function checkScroll() {
        missionItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight * 0.85) {
                item.classList.add('animate-in');
            }
        });
    }

    if (missionItems.length > 0) {
        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    // ===== Team Section Animation =====
    const teamMembers = document.querySelectorAll('.team-member');

    function checkTeamScroll() {
        teamMembers.forEach((member, index) => {
            const memberTop = member.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (memberTop < windowHeight * 0.85) {
                setTimeout(() => {
                    member.classList.add('animate-in');
                }, index * 150);
            }
        });
    }

    if (teamMembers.length > 0) {
        window.addEventListener('scroll', checkTeamScroll);
        checkTeamScroll();
    }

    // ===== Testimonial Slider =====
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    let currentSlide = 0;
    let testimonialInterval;

    function startTestimonialSlider() {
        if (window.innerWidth <= 768 && testimonialsGrid) {
            const testimonials = testimonialsGrid.querySelectorAll('.testimonial-card');
            if (testimonials.length > 1) {
                testimonialsGrid.classList.add('testimonial-slider');

                testimonialInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % testimonials.length;
                    updateTestimonialSlider();
                }, 5000);

                function updateTestimonialSlider() {
                    const offset = -currentSlide * 100;
                    testimonials.forEach(testimonial => {
                        testimonial.style.transform = `translateX(${offset}%)`;
                    });
                }

                updateTestimonialSlider();
            }
        } else {
            if (testimonialInterval) clearInterval(testimonialInterval);

            if (testimonialsGrid) {
                testimonialsGrid.classList.remove('testimonial-slider');
                const testimonials = testimonialsGrid.querySelectorAll('.testimonial-card');
                testimonials.forEach(testimonial => {
                    testimonial.style.transform = '';
                });
            }
        }
    }

    startTestimonialSlider();
    window.addEventListener('resize', startTestimonialSlider);

    // ===== Smooth Scrolling =====
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
            }
        });
    });

    // ===== Stats Counter Animation =====
    const statElements = document.querySelectorAll('.feature-box h3');
    let animated = false;

    function animateStats() {
        if (animated) return;

        const statsSection = document.querySelector('.features');
        if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
            statElements.forEach(stat => {
                const targetValue = parseInt(stat.textContent.replace(/,/g, '').match(/\d+/)[0]);
                let currentValue = 0;
                const duration = 2000;
                const increment = Math.ceil(targetValue / (duration / 16));

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        stat.textContent = stat.textContent.replace(/\d+/, targetValue.toLocaleString());
                        clearInterval(counter);
                    } else {
                        stat.textContent = stat.textContent.replace(/\d+/, currentValue.toLocaleString());
                    }
                }, 16);
            });

            animated = true;
            window.removeEventListener('scroll', animateStats);
        }
    }

    if (statElements.length > 0) {
        window.addEventListener('scroll', animateStats);
        animateStats();
    }
});


