gsap.from('article', {
    scrollTrigger: {
        trigger: '.cards',
        start: 'top top', // when the top of the trigger hits the top of the viewport
        end: '+=100', // end after scrolling 100px beyond the start
        // markers: true
        markers: {
            startColor: '#ff771c',
            endColor: 'black',
            fontSize: '20px',
            fontWeight: 'bold',
            indent: 20,
        },
        scrub: 1,
    },
    stagger: { amount: 0.5 },
    scale: 0,
    duration: 1,
});
