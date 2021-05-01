(() => {
    "use strict";

    // Constants
    const CANVAS_WIDTH = 3840;
    const CANVAS_HEIGHT = 2160;
    const COLORS = {
        BACKGROUND: 'cornflowerblue',
        FLOOR: '#d8b9aa',
        PLAYER: '#d6d7dc',
        SPIKES: '#686573',
    };
    const FPS = 60;
    const FLOOR_HEIGHT = 512;
    const PLAYER_START_X = 128;
    const PLAYER_SIZE = 256;
    const GRAVITY = 1.2;
    const PLAYER_JUMP_VELOCITY = 48;
    const SPIKES_VELOCITY = 10;
    
    // Globals
    let floor;
    let player;
    let spikes = [];
    let spawnSpikeID;
    let updateID;
    
    // Spawns a moving spike off-screen every few seconds
    const spawnSpike = () => {
        spawnSpikeID = setTimeout(spawnSpike, randomRangeInt(2000, 5000))
    
        // Create spike
        const width = randomRangeInt(32, 64);
        const height = randomRangeInt(128, 256);
        const spike = new Entity(CANVAS_WIDTH, CANVAS_HEIGHT - FLOOR_HEIGHT - height, width, height);
    
        // Init spike velocity
        spike.velocity.x = -SPIKES_VELOCITY;
    
        // Add to spikes list
        spikes.push(spike);
    };
    
    const update = () => {
        updateID = setTimeout(update, 1 / FPS);
    
        // Update player
        player.update();
        // Don't let player go below the floor
        if (player.y > CANVAS_HEIGHT - FLOOR_HEIGHT - player.h) {
            player.y = CANVAS_HEIGHT - FLOOR_HEIGHT - player.h;
            player.isGrounded = true;
        }
    
        // Spikes
        spikes.forEach(spike => {
            // Update spikes
            spike.update();
    
            // Check collision
            if (Rectangle.areColliding(player, spike)) {
                // Game over
                stop();
            }
        });
        // Remove offscreen spikes
        spikes = spikes.filter(spike => spike.x > -spike.w);
    };
    
    // Resets game parameters back to the start
    const reset = () => {
        // Reset player
        player.y = CANVAS_HEIGHT - FLOOR_HEIGHT - PLAYER_SIZE;
        player.velocity.y = 0;
    
        // Clear spikes
        spikes = [];
    
        // Start the updates again
        update();
        spawnSpike();
    };
    
    // Tries to reset game
    const tryReset = (e) => {
        if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
            // Remove event listener for self
            document.removeEventListener('keydown', tryReset);
            // Reset game
            reset();
        }
    };
    
    // Stops game updates and waits for a reset
    const stop = () => {
        clearTimeout(updateID);
        clearTimeout(spawnSpikeID);
    
        // Add event listener for reset
        document.addEventListener('keydown', tryReset);
    };
    
    const draw = (ctx) => {
        requestAnimationFrame(() => draw(ctx));
    
        // Draw background
        fill(ctx, COLORS.BACKGROUND);
    
        // Draw floor
        floor.draw(ctx, COLORS.FLOOR);
    
        // Draw spikes
        spikes.forEach(spike => spike.draw(ctx, COLORS.SPIKES));
    
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
        floor = new Rectangle(0, CANVAS_HEIGHT - FLOOR_HEIGHT, CANVAS_WIDTH, FLOOR_HEIGHT);
        player = new Player(PLAYER_START_X, CANVAS_HEIGHT - FLOOR_HEIGHT - PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
        player.acceleration.y = GRAVITY;
    
        // Events
        document.addEventListener('keydown', e => {
            if (player.isGrounded && (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space')) {
                player.velocity.y = -PLAYER_JUMP_VELOCITY;
                player.isGrounded = false;
            }
        });
    
        // Start loops
        update();
        draw(ctx);
        spawnSpike();
    };
    
    window.onload = () => {
        // Preload anything - fonts, images, sounds, etc...
    
        init();
    };
})();