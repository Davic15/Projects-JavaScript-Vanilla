// .set method, set some properties before the animantion and it happens immediately.

/*
    gsap.set('.box2', {
        opacity: 0
    });
*/

// .to method, creates an animation (tween).
/*
gsap.to('.box2', {
    opacity: 1,
    duration: 2,
    y: 200,
    repeat: -1,
    yoyo: true
});
*/

//* Staggers
/*
    stagger method:
    amount: 0.5, The total amount of time (in seconds) that gets split up among all
    the staggers.
    each: 0.5, The amount of time (in seconds) between each sub-tween start time.
    from: 0, The position in the array from which the stagger will emanate.
*/
gsap.to('.box', {
    duration: 0.5,
    y: -100,
    ease: 'power1',
    yoyo: true,
    repeat: -1,
    stagger: {
        // amount: 0.5,
        each: 0.5,
        from: 0
    }
})

