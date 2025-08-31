/**
 * Cybersecurity Portfolio JavaScript - Enhanced Version
 * @author Timothy Floyd Jalandoni
 * @version 2.0.0
 */

// ========================================
// Main Initialization
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

/**
 * Initialize all portfolio functions with error handling
 */
function initializePortfolio() {
    try {
        // Core functionality
    setupMobileNavigation();
    setupTypingAnimation();
    setupScrollAnimations();
    setupNavigationHighlighting();
        
        // Interactive features
    setupContactForm();
    setupParticleEffects();
    setupScrollToTop();
    setupHoverEffects();
    setupTerminalCursor();
        setupSkillsInteractions();
        setupProjectInteractions();
        
        // Performance and accessibility
        setupPerformanceOptimizations();
        setupAccessibilityFeatures();
        setupHeroCounters();
        setupSectionTitleInteractions();
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Portfolio initialization error:', error);
        // Fallback to basic functionality
        setupBasicFunctionality();
    }
}

/**
 * Enhanced Mobile Navigation Toggle with accessibility support
 */
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (!hamburger || !navMenu) {
        console.warn('Mobile navigation elements not found');
        return;
    }

        hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        
        // Toggle menu state
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        body.style.overflow = isActive ? '' : 'hidden';
        
        // Animate hamburger bars with better performance
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
            if (!isActive) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                }
            });
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
                
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }

// Enhanced Typing Animation for Terminal
function setupTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const messages = [
        'Cybersecurity Student',
        'Ethical Hacker',
        'Penetration Tester',
        'Security Researcher',
        'Digital Forensics Analyst',
        'Bug Bounty Hunter'
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let animationId;

    function typeMessage() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Add cursor effect
        typingElement.innerHTML += '<span class="cursor">|</span>';

        if (!isDeleting && charIndex === currentMessage.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500;
        }

        animationId = setTimeout(typeMessage, typingSpeed);
    }

    // Start typing animation
    setTimeout(typeMessage, 1000);

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearTimeout(animationId);
        } else {
            typeMessage();
        }
    });
}

// Enhanced Scroll Animations with Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for different elements
                if (entry.target.classList.contains('stat-item')) {
                    animateStatNumbers(entry.target);
                }
                
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillTags(entry.target);
                }

                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .about-content,
        .skill-category,
        .project-card,
        .stat-item,
        .contact-content
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Enhanced parallax effect
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const gridOverlay = document.querySelector('.grid-overlay');
        
        if (gridOverlay) {
            const rate = scrolled * 0.5;
            gridOverlay.style.transform = `translate(${rate}px, ${rate}px)`;
        }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Enhanced Stat Number Animation
function animateStatNumbers(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (!numberElement) return;

    const target = parseInt(numberElement.textContent);
    let current = 0;
    const increment = target / 60;
    const suffix = numberElement.textContent.includes('+') ? '+' : '';

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Enhanced Skill Tag Animation
function animateSkillTags(skillCategory) {
    const tags = skillCategory.querySelectorAll('.skill-tag');
    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100);
        }, index * 120);
    });
}

// New Project Card Animation
function animateProjectCard(projectCard) {
    const elements = projectCard.querySelectorAll('.project-icon, .project-title, .project-description, .project-features, .project-tech, .project-footer');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Enhanced Navigation Highlighting
function setupNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Throttled scroll handler for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        // Update navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Update navbar background on scroll
        const navbar = document.querySelector('.navbar');
                if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Enhanced smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
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
}

// Enhanced Contact Form Handling
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm(this);
        }
    });
}

// Field validation
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    clearFieldError(e);

    // Validation rules
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'text' && field.name === 'name' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters';
    } else if (field.name === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
        field.classList.remove('error');
    }
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--danger);
        font-size: 0.85rem;
        margin-top: 0.5rem;
        animation: slideDown 0.3s ease;
    `;
    field.parentNode.appendChild(errorDiv);
}

// Validate entire form
function validateForm() {
    const fields = document.querySelectorAll('.contact-form input, .contact-form textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Submit form
function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
    // Simulate form submission
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        
        // Clear any remaining error states
        form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
    });
    }, 2000);
}

// Enhanced Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#2ed573',
        error: '#ff4757',
        info: '#00d4ff',
        warning: '#ffa502'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: #0a0a0a;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.4s ease-out;
        font-weight: 600;
        backdrop-filter: blur(10px);
    `;
    
    // Add animation styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes slideDown {
                from { transform: translateY(-10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    });
}

// Enhanced Particle Effects
function setupParticleEffects() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;

    // Create additional floating particles with better performance
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 3}px;
            height: ${2 + Math.random() * 3}px;
            background: var(--neon-green);
            border-radius: 50%;
            box-shadow: 0 0 ${10 + Math.random() * 15}px var(--neon-green);
            animation: float ${6 + Math.random() * 4}s ease-in-out infinite;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        particleContainer.appendChild(particle);
    }
}

// Enhanced Scroll to Top Button
function setupScrollToTop() {
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
        color: var(--bg-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 0 25px rgba(0, 255, 65, 0.3);
        font-size: 1.2rem;
        border: 2px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll top button with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
        scrollTopBtn.style.boxShadow = '0 0 35px rgba(0, 255, 65, 0.5)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1)';
        scrollTopBtn.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.3)';
    });
}

// Enhanced Hover Effects
function setupHoverEffects() {
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.project-icon');
            if (icon) {
                icon.style.textShadow = '0 0 25px var(--neon-green)';
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.project-icon');
            if (icon) {
                icon.style.textShadow = '';
                icon.style.transform = '';
            }
        });
    });
    
    // Skill tag glow effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.textShadow = '0 0 15px var(--neon-green)';
            tag.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.textShadow = '';
            tag.style.transform = '';
        });
    });
}

// Enhanced Terminal Cursor Animation
function setupTerminalCursor() {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        cursor.style.animation = 'blink 1s infinite';
    });
    
    // Add blink animation if not exists
    if (!document.querySelector('#cursor-styles')) {
        const style = document.createElement('style');
        style.id = 'cursor-styles';
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Skills Section Interactions
function setupSkillsInteractions() {
    // Initialize skill level animations
    animateSkillLevels();
    
    // Add click event listeners to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            showSkillDetails(this.textContent, this.dataset.tooltip);
        });
    });
    
    // Add hover effects for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced skill level animations
function animateSkillLevels() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const levelFill = entry.target.querySelector('.level-fill');
                if (levelFill) {
                    const width = levelFill.style.width;
                    levelFill.style.width = '0%';
                    setTimeout(() => {
                        levelFill.style.width = width;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });
    
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        observer.observe(category);
    });
}

// Enhanced skill details modal
function showSkillDetails(skillName, description) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'skill-modal';
    modal.innerHTML = `
        <div class="skill-modal-content">
            <div class="skill-modal-header">
                <h3>${skillName}</h3>
                <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="skill-modal-body">
                <p>${description}</p>
                <div class="skill-examples">
                    <h4>Examples:</h4>
                    <ul>
                        <li>Real-world applications</li>
                        <li>Projects using this skill</li>
                        <li>Certifications related to this skill</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not exists
    if (!document.querySelector('#skill-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'skill-modal-styles';
        style.textContent = `
            .skill-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: modalFadeIn 0.3s ease;
                backdrop-filter: blur(5px);
            }
            
            .skill-modal-content {
                background: var(--bg-secondary);
                border: 2px solid var(--border-color);
                border-radius: 16px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                position: relative;
                animation: modalSlideIn 0.3s ease;
                box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
            }
            
            .skill-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .skill-modal-header h3 {
                color: var(--text-primary);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                color: var(--danger);
                background: rgba(255, 0, 0, 0.1);
            }
            
            .skill-modal-body p {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            
            .skill-examples h4 {
                color: var(--text-primary);
                margin-bottom: 1rem;
            }
            
            .skill-examples ul {
                color: var(--text-secondary);
                padding-left: 1.5rem;
            }
            
            .skill-examples li {
                margin-bottom: 0.5rem;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// New Project Interactions
function setupProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add click to expand functionality
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on links
            if (e.target.closest('.btn-link')) return;
            
            this.classList.toggle('expanded');
        });
        
        // Add hover effects for tech tags
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    });
}

// Performance Optimizations
function setupPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Perform heavy operations here
        }, 100);
    });
    
    // Lazy load images if needed
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Accessibility Features
function setupAccessibilityFeatures() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.skill-modal');
            modals.forEach(modal => modal.remove());
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--neon-green)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
}

// Enhanced Matrix Rain Effect - More Visible
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.25;
    `;
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize drops with random starting positions
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
    }
    
    function draw() {
        // Create a more subtle fade effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the matrix characters
        for (let i = 0; i < drops.length; i++) {
            // Random character selection
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Create gradient effect for better visibility
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#00ff41');
            gradient.addColorStop(0.5, '#00d4ff');
            gradient.addColorStop(1, '#00ff41');
            
            ctx.fillStyle = gradient;
            ctx.font = `bold ${fontSize}px monospace`;
            
            // Add glow effect
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 8;
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset shadow
            ctx.shadowBlur = 0;
            
            // Move drop down
            drops[i]++;
            
            // Reset drop when it goes off screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
        
        // Add some floating particles for extra effect
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 3 + 1;
            
            ctx.fillStyle = 'rgba(0, 255, 65, 0.6)';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Increase animation speed for better visibility
    setInterval(draw, 80);
    
    // Resize canvas on window resize with throttling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        }, 100);
    });
}

// Skill demo and certification functions
function showSkillDemo(category) {
    const demos = {
        pentesting: 'Penetration Testing Demo: Network vulnerability assessment using Nmap and Metasploit',
        programming: 'Programming Demo: Secure code review and vulnerability scanning',
        network: 'Network Security Demo: Firewall configuration and intrusion detection',
        forensics: 'Digital Forensics Demo: Memory analysis and evidence collection'
    };
    
    showNotification(demos[category] || 'Demo not available for this category', 'info');
}

function showSkillCert(category) {
    const certs = {
        pentesting: 'Certifications: CEH, OSCP, GPEN',
        programming: 'Certifications: Secure Coding, OWASP, SANS',
        network: 'Certifications: CCNA Security, CompTIA Security+, CISSP',
        forensics: 'Certifications: GCFE, GCFA, EnCE'
    };
    
    showNotification(certs[category] || 'Certifications not available for this category', 'info');
}

// Hero Statistics Counter Animation
function setupHeroCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                let current = 0;
                const increment = target / 60; // 60 frames for smooth animation
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 30);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Fallback basic functionality
function setupBasicFunctionality() {
    console.log('Setting up basic portfolio functionality...');
    
    // Basic mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Basic smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Enhanced Section Title Interactions
function setupSectionTitleInteractions() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        // Add data-text attribute for fallback visibility
        const titleText = title.textContent.trim();
        title.setAttribute('data-text', titleText);
        
        // Add floating particles around section titles
        const particles = document.createElement('div');
        particles.className = 'title-particles';
        particles.innerHTML = `
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
        `;
        title.appendChild(particles);
        
        // Add click interaction for extra effect
        title.addEventListener('click', () => {
            title.style.transform = 'scale(1.1) rotate(2deg)';
            setTimeout(() => {
                title.style.transform = '';
            }, 300);
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'title-ripple';
            title.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
        
        // Add scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'titleEntrance 1s ease-out forwards';
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(50px)';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(title);
    });
}

// Initialize matrix rain effect
createMatrixRain();
console.log(`
%c
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗███████╗ ██████╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝███████╗█████╗  ██║     
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗╚════██║██╔══╝  ██║     
╚██████╗   ██║   ██████╔╝███████╗██║  ██║███████║███████╗╚██████╗
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝

Welcome to the Enhanced Cybersecurity Portfolio!
Built with performance, accessibility, and user experience in mind ��
`, 'color: #00ff41; font-family: monospace;');

console.log('%cPortfolio enhanced with advanced JavaScript features!', 'color: #00d4ff; font-size: 14px;');

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function activateNavLink() {
        let scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 110; // adjust for navbar height
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector('.nav-link[href="#' + section.id + '"]');
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", activateNavLink);
    activateNavLink();
}); 
