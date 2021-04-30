import Entity from './Entity.js';

export default class Player extends Entity {
    constructor(x, y, w, h) {
        super(x, y, w, h);

        this.isGrounded = false;
    }
}