
const fill = (ctx, color) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
};

const fillRect = (ctx, x, y, w, h, color = 'black') => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);