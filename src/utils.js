"use strict";

// Draws a filled rectangle in canvas
const fillRect = (ctx, x, y, w, h, color = 'black') => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
};

// Fills a canvas with a certain color
const fill = (ctx, color) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
};

// Returns random integer number between min (inclusive) and max (inclusive)
const randomRangeInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};