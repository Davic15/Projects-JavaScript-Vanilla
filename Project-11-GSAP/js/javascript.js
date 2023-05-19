let tl = gsap.timeline({
    defaults: {
        duration: 1
    }
});
tl.timeScale(0.5)
// add timescale
tl.to('.box_1', {
    //duration: 1,
    scale: 0,
    opacity: 0
})
.to('.box_2', {
    //duration: 1,
    x: -200
})
.to('.box_3', {
    //duration: 1,
    x: -240,
    rotate: 360
})


// animate box one
.set('.box_1', {
    x: 400
})
.to('.box_1', {
    //duration: 1,
    scale: 1,
    opacity: 1
})


