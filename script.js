const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const track = document.querySelector('.testimonials-track');

let currentIndex = 0;

function cardSlide() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 0;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
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
}, 4000);


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