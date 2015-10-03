// Declared global variables
var canvasWidth = 505,
    blockWidth = 101,
    blockHeight = 79,
    score = 0;

// Enemies our player must avoid ✓
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started ✓
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = blockWidth;
    this.height = 50;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images ✓
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks ✓
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. ✓
    if(this.x > canvasWidth) {
        this.reset();
    } else {
    this.x = this.x + this.speed * dt;
    }
};

// Reset the enemy position to the left of the screen and
// set a new random speed. ✓
Enemy.prototype.reset = function() {
    this.x = -90;
    this.speed = 30 + Math.floor(Math.random() * 70 )+ Math.floor(Math.random() *30);
};

// Draw the enemy on the screen, required method for game. ✓
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class✓
// This class requires an update(), render() and
// a handleInput() method.✓
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.width = 45;
    this.height = 60;
    this.reset();
}; 

// Update the player's position. ✓
Player.prototype.update = function() {
    this.handleInput();
};

// Draw the player on the screen. ✓
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset the player's position to the starting point. ✓
Player.prototype.reset = function() {
    this.x = 2 * blockWidth;
    this.y = 5 * blockHeight;
};

// Interpret key pressed and move player accordingly. ✓
Player.prototype.handleInput = function(allowedKeys) {
    if(allowedKeys == 'left' && this.x > blockWidth -10 && !paused) {
        this.x -= blockWidth;
    } else if (allowedKeys == 'right' && this.x < canvasWidth - blockWidth && !paused) {
        this.x += blockWidth;
    } else if (allowedKeys == 'down' && this.y < blockHeight * 5 && !paused) {
        this.y += blockHeight;
    } else if (allowedKeys == 'up' && this.y > blockHeight && !paused) {
        this.y -= blockHeight;
    } else if (allowedKeys == 'up' && this.y > blockHeight -10 && !paused) {
        this.reset();
        score += 1;
        $('.score').text(score);
    } else if (allowedKeys == 'space') {
        togglePause();
    }
};

// Now instantiate your objects. ✓
// Place all enemy objects in an array called allEnemies. ✓
var allEnemies = [];

// Instantiate all enemies. ✓
for (var i = 0; i < 3; i++) {
    var randomSpeed = 30 + Math.floor(Math.random() * 70) + Math.floor(Math.random() *30),
        randomx = -90 + Math.floor(Math.random() * -20);
    allEnemies.push(new Enemy(randomx, 50 + 90 *i, randomSpeed));
}

// Place the player object in a variable called player. ✓
var player = new Player();

// Collision Detection (https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
var checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + allEnemies[i].width && 
            player.x + allEnemies[i].width > allEnemies[i].x &&
            player.y < allEnemies[i].y + allEnemies[i].height &&
            player.height + player.y > allEnemies[i].y) 
        {
            player.reset();
            score = 0;
            $('.score').text(score);
        }
    }

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this. ✓
// Added space key for pausing functionality. ✓
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
