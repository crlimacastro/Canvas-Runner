# Canvas Runner

Tutorial for simple endless runner using the HTML [Canvas](https://www.w3schools.com/html/html5_canvas.asp) API and vanilla JavaScript.

![Screenshot of finished game](./tutorial/images/finished.png)

## Goal

---

Last as long as you can.

## Controls

---

W, Arrow Up, or Space to Jump.

## Tutorial

### I. Start Code

---

Create an `index.html` file and add some boilerplate HTML as well as a `<canvas>` elements to the body.
If using VSCode, you can use the `html:5` macro to generate this easier. Simply type `html:5`, press Enter and it will autocomplete for you.

`index.html`
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas Runner</title>
</head>
<body>
    <canvas></canvas>
</body>
</html>
```

Create a `styles` folder to contain all of your stylesheets and create a `styles.css` file for your page. Add the following style rules.

`styles.css`
``` css
body { 
    margin: 0;
    overflow: hidden;
}

canvas {
    width: 100%;
    max-height: 100vh;
}
```

These styles will make sure that the canvas covers the entire width of the window and that the page does not create a scrollbar if the height of the canvas gets too big for it (creating a full-screen canvas). 

Attach the styles to the `index.html` page in the `<head>` section with: 

```html
<link rel="stylesheet" href="./styles/styles.css">
```


Create a `src` (meaning source) folder to contain all of your scripts and create a `main.js` file.

Inside of `main.js` add a "use strict" directive to the top. Literally write the string "use strict" followed by a semicolon (;). This indicates to the JavaScript to not allow and warn about "bad code" (like using undeclared variables) which would normally be allowed outside of strict mode. This can save you from a lot of headaches when debugging and will make your code cleaner.

Also, add an `init` function and call it as soon as the window loads. This is to make sure that all DOM Elements (`<h1>`'s, `<p>`'s, `<canvas>`) are actually created on the page before the init function is called. 

`main.js`
``` javascript
"use strict";

const init = () => {

};

window.onload = () => {
    // Preload anything - fonts, images, sounds, etc...

    init();
};
```

Import the `main.js` script back in `index.html` with a `<script>` tag in the `<head>` section.

`index.html`
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/styles.css">
    <script src="./src/main.js"></script>
    <title>Canvas Runner</title>
</head>
<body>
    <canvas></canvas>
</body>
</html>
```

And with that, our starting code is out of the way.

### II. Drawing in the Canvas

---

Next we will retrieve the canvas and save it into a variable in our script using JavaScript's document.querySelector(String) function. Then, we will set its width and height to an arbitrary resolution.

These two dimensions will determine how many pixels are in the canvas so we can work with absolute pixel measurements and not have to worry about the actual size of the canvas on the window (which the CSS handles).

Be mindful that whatever numbers you choose for the resolution will influence the rest of your code. It will affect your x, y positions and your game physics like gravity and velocity.

`main.js`
``` javascript
"use strict";

// Constants
const CANVAS_WIDTH = 3840;
const CANVAS_HEIGHT = 2160;

const init = () => {
    // Get canvas from DOM
    const canvas = document.querySelector("canvas");

    // Set resolution
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
};

window.onload = () => {
    // Preload anything - fonts, images, sounds, etc...

    init();
};
```

Then we will get the canvas' 2D Context. The canvas is the actual element on the page. The context is the interface that will allow us to do all of the drawing. Read all about it [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).

`main.js`
``` javascript
const init = () => {
    // Get canvas from DOM
    const canvas = document.querySelector("canvas");

    // Set resolution
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Get canvas context
    const ctx = canvas.getContext('2d');
};
```

So now we have our drawing context (ctx). Why don't we do some actual drawing with it? Write this line of code right after you grab the context in init.

`main.js`
``` javascript
// Get canvas context
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(437, 400, 1005, 504);
```

We should now have our first visual feedback that everything is working correctly. Do you see the red rectangle on the screen? Now is a good time to say that if you don't see it, you should press the F12 key on the keyboard and navigate to the console tab to address errors (if there are any).

![Screenshot of canvas with a red rectangle](./tutorial/images/red_rectangle.png)

`ctx.fillStyle` is a property and will take any CSS color value as a string and set that as the current color the context is drawing with. Think of it like changing what color pencil you are drawing with.

`ctx.fillRect(x,y,w,h)` will take in 4 parameters and draw a rectangle at that x, y position with 'w' pixel width and 'h' pixel height. From the top left point to the bottom right point.

Note that x, y coordinates in the canvas start from the TOP LEFT corner and x increases going RIGHT and y increases going DOWN.

This is very important! In HTML Canvas, point (0, 0) starts at the TOP LEFT corner and increases going RIGHT and DOWN. That means point (40, 50) is above point (56, 156).

The canvas 2D context has a lot different drawing methods that you can read about [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#reference) if you want to learn more.

<br>

Okay! Now that we know how to draw with the context. Lets make some helper functions for ourselves. Create a `utils.js` file inside the `src` folder. Don't forget to import it back in `index.html` with a `<script src="./src/utils.js"></script>` tag and make sure to put it before your `main.js` tag as main will make use of our utility functions, so they need to be created first.

Add these two functions inside of `utils.js`:

`utils.js`
``` javascript
"use strict";

const fillRect = (ctx, x, y, w, h, color = 'black') => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
};

const fill = (ctx, color) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
};
```

First we have our handy `"use strict"` directive which will help us commit less mistakes. Then we have two functions

Our own `fillRect` function which will take a context, all of the parameters needed for a rectangle (x, y, width, height), and a color which is set to a default of `'black'`.

A `fill` function which takes in a context and a color and will set all of the pixels in the canvas a certain color. Notice that the context has a useful back-reference to the canvas element inside of it.

Also of note are the new `ctx.save()` and `ctx.restore()` functions. Basically, `save` will remember the state of the context at the point it is called (like what color is the fillStyle set to) and `restore` will bring the context back to the last save point (or the beginning defaults if there are none).

Whenever you edit states of the context in a function, like the `fillStyle`, you should use `ctx.save()` and `ctx.restore()` to make sure that the function does not affect the context outside of its scope.

<br>

Now we can use our `fill(ctx, color)` and `fillRect(ctx, x, y, w , h, color)` functions back in `main.js` and see our red rectangle against a blue background.

![Screenshot of red rectangle on blue canvas](./tutorial/images/red_rectangle_blue_background.png)

`main.js`
``` javascript
"use strict";

// Constants
const CANVAS_WIDTH = 3840;
const CANVAS_HEIGHT = 2160;
const COLORS = {
    BACKGROUND: 'cornflowerblue',
};

const init = () => {
    // Get canvas from DOM
    const canvas = document.querySelector("canvas");

    // Set resolution
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Get canvas context
    const ctx = canvas.getContext('2d');

    fill(ctx, COLORS.BACKGROUND);
    fillRect(ctx, 437, 400, 1005, 504, 'red');
};

window.onload = () => {
    // Preload anything - fonts, images, sounds, etc...

    init();
};
```

### III. Writing Game Loops

---

Behind any real-time game's code, there is an update loop. Games are real-time applications that have to track state across many frames every second. One common way to do that is to call an update function every single frame. Let's do that.

To be extra organized we will actually have two loops running in our game. An `update()` function that handles the logic and state variables of the game and a `draw(ctx)` function that will take care of rendering the visuals to the canvas. Define them and call them from init.

`main.js`
``` javascript
const update = () => {

};

const draw = (ctx) => {

};

const init = () => {
    // Get canvas from DOM
    const canvas = document.querySelector("canvas");

    // Set resolution
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Get canvas context
    const ctx = canvas.getContext('2d');

    // Start loops
    update();
    draw(ctx);
};
```