const slides = document.querySelectorAll('.slide');
const nextSlide = document.querySelector('.btn-next');
const prevSlide = document.querySelector('.btn-prev');
let currentSlide = 0;
let maxSlide = slides.length - 1;

slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
});

nextSlide.addEventListener('click', () => {
    if (currentSlide === maxSlide) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
});

prevSlide.addEventListener('click', () => {
    if (currentSlide === 0) {
        currentSlide = maxSlide;
    } else {
        currentSlide--;
    }
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
});
