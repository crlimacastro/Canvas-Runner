import * as ctxUtils from '../utils/canvas.js';

export default class Rectangle {
    constructor(x, y, w, h) {
        Object.assign(this, { x, y, w, h });
    }
    draw(ctx, color = 'black') {
        ctxUtils.fillRect(ctx, this.x, this.y, this.w, this.h, color);
    }
    static areColliding(rect1, rect2) {
        // AABB Collision Test
        return rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y;
    }
}