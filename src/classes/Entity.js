import Rectangle from './Rectangle.js';

export default class Entity extends Rectangle {
    constructor(x, y, w, h) {
        super(x, y, w, h);

        this.acceleration = {
            x: 0,
            y: 0,
        };
        this.velocity = {
            x: 0,
            y: 0,
        };
    }

    update() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}