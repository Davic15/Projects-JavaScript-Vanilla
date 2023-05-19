gsap.set('.hero_circle, .hero_square, .hero_square-2', {
    autoAlpha: 0,
    transformOrigin: '50% 50%',
    scale: 0,
});

let heroTL = gsap.timeline({
    defaults: {
        stagger: { amount: 0.2 },
        autoAlpha: 1,
        scale: 1,
        ease: 'back.out(1.7)',
    },
});

heroTL.to('.hero_circle', {}).to('.hero_square', {}).to('.hero_square-2', {});

gsap.from('.move', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 50%',
        end: 'center 50%',
        markers: true,
        scrub: 1,
    },
    scale: 0,
    duration: 1,
});
