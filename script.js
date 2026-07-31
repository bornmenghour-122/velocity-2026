// ===================================
// LOADING SCREEN
// ===================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        initializeAnimations();
    }, 2000);
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===================================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in-scroll elements
    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });

    // Observe car categories
    document.querySelectorAll('.car-category').forEach(el => {
        observer.observe(el);
    });

    // Observe manifesto cards
    document.querySelectorAll('.manifesto-card').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ===================================
// HERO PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const opacity = 1 - (scrolled / heroHeight);
        const scale = 1 - (scrolled / heroHeight) * 0.05;
        hero.style.opacity = opacity;
        hero.style.transform = `scale(${scale})`;
    }
});

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
    };

    // Show success toast
    showToast('Message sent! We\'ll get back to you soon.');

    // Reset form
    contactForm.reset();

    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
});

// ===================================
// TOAST NOTIFICATION
// ===================================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================================
// BUTTON CLICK HANDLERS
// ===================================
document.querySelectorAll('.btn-outline').forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.target.textContent.replace('Explore ', '');
        showToast(`Exploring ${category}...`);
        
        // In a real application, this would navigate to a category page
        console.log('Button clicked:', category);
    });
});

// ===================================
// IMAGE LAZY LOADING
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ===================================
// MOUSE MOVE PARALLAX (OPTIONAL)
// ===================================
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-background');
    if (hero && window.innerWidth > 768) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        hero.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
});

// ===================================
// RESPONSIVE MENU TOGGLE (for mobile)
// ===================================
function createMobileMenu() {
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // Create menu toggle button if it doesn't exist
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                display: block;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            `;
            
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                if (navLinks.classList.contains('active')) {
                    navLinks.style.display = 'flex';
                } else {
                    navLinks.style.display = 'none';
                }
            });
            
            navbar.appendChild(menuToggle);
            
            // Style nav links for mobile
            navLinks.style.cssText = `
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.95);
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
            `;
        }
    }
}

// Initialize mobile menu
createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
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

// Add scroll listener with debounce
window.addEventListener('scroll', debounce(() => {
    // Any scroll-based calculations can go here
}, 10));

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🚗 VELOCITY', 'font-size: 24px; font-weight: bold; color: #fff; background: #000; padding: 10px;');
console.log('%cWhere Engineering Meets Art', 'font-size: 14px; color: #666;');
console.log('Website loaded successfully!');

// ===================================
// NAV HIGHLIGHT FOR CURRENT SECTION / PAGE
// ===================================
function highlightCurrentNav() {
    const navLinks = document.querySelectorAll('.nav-links a');

    // Highlight links that point to the current page (exact match)
    navLinks.forEach(link => {
        try {
            const linkHref = link.getAttribute('href');
            // page links (e.g., sign_up.html)
            if (!linkHref) return;
            if (!linkHref.startsWith('#') && linkHref === window.location.pathname.split('/').pop()) {
                link.classList.add('active');
            } else if (!linkHref.startsWith('#') && linkHref === window.location.pathname) {
                link.classList.add('active');
            }
        } catch (e) {
            // ignore
        }
    });

    // For same-page anchors, observe sections and toggle active class
    const sectionLinks = Array.from(navLinks).filter(a => a.getAttribute('href') && a.getAttribute('href').startsWith('#'));
    if (sectionLinks.length) {
        const observerOptions = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const matchingLink = sectionLinks.find(a => a.getAttribute('href') === `#${id}`);
                if (matchingLink) {
                    if (entry.isIntersecting) {
                        sectionLinks.forEach(l => l.classList.remove('active'));
                        matchingLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sectionLinks.forEach(a => {
            const selector = a.getAttribute('href');
            const section = document.querySelector(selector);
            if (section) observer.observe(section);
        });
    }
}

// Run on load and on hashchange
window.addEventListener('load', highlightCurrentNav);
window.addEventListener('hashchange', highlightCurrentNav);

// Add click handler to set active class immediately on click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // remove active from all, then set on clicked
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
