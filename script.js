const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const track = document.querySelector('.testimonials-track');
const introLogo = document.querySelector('.intro-logo');
const introScreen = document.querySelector('.intro-screen');
const introText = document.querySelector('.intro-text');
const navLinks = document.querySelectorAll('.header-nav');
const currentPath = window.location.pathname;


// INTRO ANIMATIONS
document.body.style.overflow = 'hidden';

setTimeout(() => {
    introText.style.opacity = '1';
    introLogo.style.filter = 'brightness(1)';
    // introLogo.style.fontSize = '180px'
}, 1500);
setTimeout(() => {
    introScreen.classList.add('exiting');
    // introScreen.style.transform = 'translateY(-200px)';
    // introScreen.style.display = 'none'
    // introScreen.style.transition = '.5s ease';
    document.body.style.overflow = 'auto';
}, 2800);

// ACTIVE STATE FOR NAV LINKS

function updateActiveLink() {
    navLinks.forEach(link => {
        if (link.getAttribute("href") === window.location.hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    window.addEventListener("load", () => {
        link.classList.remove('active');
    })

}

updateActiveLink();

navLinks.forEach(link => {
    link.addEventListener('click', updateActiveLink);
});

window.addEventListener('hashchange', updateActiveLink);

// AUTO UPDATE ACTIVE LINK ON SCROLL
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let activeSection = '';
    
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= 150) {
            activeSection = '#' + section.id;
        }
    });
    
    if (activeSection) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === activeSection);
        });
    }
});


let currentIndex = 0;

// function cardSlide() {
//     const cardWidth = cards[0].offsetWidth;
//     const gap = 0;
//     const offset = currentIndex * (cardWidth + gap);
//     track.style.transform = `translateX(-${offset}px)`;
//     track.style.transition = '0.7s ease';
// }
function cardSlide() {
    const carouselWidth = document.querySelector('.testimonials-carousel').offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = 32;
    
    // Center card 0, then shift left for each subsequent card
    const initialOffset = (carouselWidth - cardWidth) / 2;
    const offset = initialOffset - currentIndex * (cardWidth + gap);
    
    track.style.transform = `translateX(${offset}px)`;
    track.style.transition = '0.7s ease';
}

function updateCard() {
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    cards[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
    cardSlide();
}

prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex - 1;
    if (currentIndex === -1) {
        currentIndex = 3;
    }
    clearInterval(autoSlide);
    updateCard();
});

nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex + 1;
    if (currentIndex === 4) {
        currentIndex = 0;
    }
    clearInterval(autoSlide);
    updateCard();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCard();
    });
});

let autoSlide = setInterval(() => {
    currentIndex = currentIndex + 1;
    if (currentIndex === 4) {
        currentIndex = 0;
    }
    updateCard();
}, 2600);


track.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});


track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        currentIndex = currentIndex + 1;
        if (currentIndex === 4) {
            currentIndex = 0;
        }
        updateCard();
    }, 4000);
});

// cards.forEach((card, index) => {
//     card.addEventListener('mouseenter', () => {
//         currentIndex = index;
//         updateCard();
//     });
// });

updateCard();

/* DEMO MODAL */
const demoOverlay = document.getElementById('demoOverlay');
const closeDemo = document.getElementById('closeDemo');

// Open demo modal function
function openDemoModal() {
    demoOverlay.classList.add('active');
}

// Close demo modal function
function closeDemoModal() {
    demoOverlay.classList.remove('active');
}

// Close button click handler
closeDemo.addEventListener('click', closeDemoModal);

// Click outside modal to close
demoOverlay.addEventListener('click', (e) => {
    if (e.target === demoOverlay) {
        closeDemoModal();
    }
});

// Add to cart buttons
const addToCartButtons = document.querySelectorAll('#addToCart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openDemoModal();
    });
});

// View All Products link
const viewAllLink = document.querySelector('.products-heading-row a');
if (viewAllLink) {
    viewAllLink.addEventListener('click', (e) => {
        e.preventDefault();
        openDemoModal();
    });
}

// Read More link
const readMoreLink = document.querySelector('.sec-6 .content .text a');
if (readMoreLink) {
    readMoreLink.addEventListener('click', (e) => {
        e.preventDefault();
        openDemoModal();
    });
}

/* MOBILE MENU */
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuNav = document.querySelectorAll('.mobile-menu-nav a');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
});

menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
});

// Close menu when clicking on a link
mobileMenuNav.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

/* INTERSECTION OBSERVER FOR ANIMATIONS */
setTimeout(() => {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right, .img-intro');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.style.getPropertyValue('--delay') || '0s';
                element.style.transitionDelay = delay;
                element.classList.add('is-visible');
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}, 3600);
