# Canvas Runner

Tutorial for simple endless runner using HTML canvas and vanilla JavaScript.

## Goal

---

Last as long as you can.

## Controls

---

W, Arrow Up, or Space to Jump.

<!-- ## Tutorial

### I. Start Code

---

Create an `index.html` file and add some boilerplate HTML.
If using VSCode, you can use the `html:5` macro to generate this for you.
And add a `<canvas>` elements to the body.

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

Attach the styles to the `index.html` page in the `<head>` section with: 

```html
<link rel="stylesheet" href="./styles/styles.css">
```

Create a `src` folder to contain all of your scripts and create a  `loader.js` and `main.js` file.

Inside of `loader.js` import `main.js` and call its `init` function (which we haven't defined yet, but we will in a second).

`loader.js`
``` javascript
import * as main from './main.js';

window.onload = () => {
    // Preload - fonts, images, sounds, etc...

    main.init();
};
```

Inside of `main.js` define this init function and export it.

`main.js`
``` javascript
const init = () => {

};

export {
    init
};
```

Import your `loader.js` script back in `index.html` as an ES6 module. -->