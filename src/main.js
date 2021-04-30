import * as ctxUtils from './utils/canvas.js';
import Rectangle from './classes/Rectangle.js';
import Entity from './classes/Entity.js';

const COLORS = {
    BACKGROUND: 'cornflowerblue',
    FLOOR: 'd8b9aa',
    PLAYER: '#d6d7dc',
    SPIKES: '#686573',
};

const CANVAS_WIDTH = 3840;
const CANVAS_HEIGHT = 2160;

const FLOOR_HEIGHT = 512;
const PLAYER_SIZE = 256;

const GRAVITY = 9.8;

let floor;
let player;

const update = () => {
    requestAnimationFrame(update);

    player.update();
    
    // Don't let player go below the floor
    player.y = Math.min(player.y, CANVAS_HEIGHT - FLOOR_HEIGHT - player.h);
};

const draw = (ctx) => {
    requestAnimationFrame(() => draw(ctx));

    // Draw background
    ctxUtils.fill(ctx, COLORS.BACKGROUND);

    // Draw floor
    floor.draw(ctx, COLORS.FLOOR);

    // Draw player
    player.draw(ctx, COLORS.PLAYER);
};

const init = () => {
    // Get canvas from DOM
    const canvas = document.querySelector("canvas");
    // Set resolution
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    // Get canvas context
    const ctx = canvas.getContext('2d');

    // Init game objects
    floor = new Rectangle(0, canvas.height - FLOOR_HEIGHT, canvas.width, FLOOR_HEIGHT);
    player = new Entity(128, canvas.height - FLOOR_HEIGHT - PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
    player.acceleration.y = GRAVITY;

    // Start loops
    update();
    draw(ctx);
};

export {
    init
};