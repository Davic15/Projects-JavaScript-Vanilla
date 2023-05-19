# GreenSock - GSAP 3

## Introduction

### The GreenSock Animation Library.

    - Anime.js
    - Velocity.js
    - Three.js
    - GreenSock
        - Cross-browser performant.
        - Fast and lightweight.
        - Compatible with new browsers, old browers, React, etc.
        - For complex animation we can use timelines.

## SVG Basics for Animation.

    - SVG - Scalable Vector Graphics.
    - Shapes, paths and commands.
    - Basic Shapes
        - <rect>
        - <circle>
        - <ellipse>
        - <line>
        - <polyline>
        - <polygon>
    - We will use figma (prototype, mocks, etc).
    - The d attribute defines a path to be drawn.
    - The move To or M Command, moves the current point to the x and y coordinates.
    - The Line To or L command, one of the three commands that draw a line.
        - L takes two parameters (x andy coordinates) and draws a line from the current position to a new position.
    - The V and H commands, V is used to draw a vertical line, H is ised to draw a horizontal line.
    - Use figma to draw or import an SVG file and add groups.
    - Use svgomg to optimized it.
        - Check Prettify markup
        - Uncheck Clean up IDs

## GreenSock Syntax

### Tween a DOM element with the gsap.method()

    - A single movement in an animation.
    - In GSAP, a tween looks like this:
        gsap.method(element, vars object)
    - The previous syntax means:
        - method refers to the GSAP method you'll like to tween with .to(), from(), .fromTo().
        - element is the element you want to animate, you can also use an array of elements to tween multiple DOM elements at the same time.
        - vars is an object of the properties you want to animate.
    - In GSAP -1 means repeat infinitely.

### Use the gsap.set() method.

    - the .set method is used to set the properties of a target before animating. It happens immediately.
    - When we have an animation with opacity, it will flash (draw on the screen with it loads).
        - To solve this issue we can set the visibility: hidden.

### Stagger animations with GreenSock.

    - We can animate an array or group of elements.
