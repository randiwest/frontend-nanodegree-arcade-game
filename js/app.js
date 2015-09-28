// Enemies our player must avoid
var canvasWidth = 505,
    blockWidth = 101,
    blockHeight = 79,
    score = 0;

var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = blockWidth;
    this.height = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > canvasWidth) {
        this.reset();
    } else {
    this.x = this.x + this.speed * dt;
    }
};

Enemy.prototype.reset = function() {
    this.x = -90;
    this.speed = 30 + Math.floor(Math.random() * 70 )+ Math.floor(Math.random() *30);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.width = 55    ;
    this.height = 60;
    this.reset();
};

Player.prototype.update = function() {
    this.handleInput();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 2 * blockWidth;
    this.y = 5 * blockHeight;
};

Player.prototype.handleInput = function(allowedKeys) {
    if(allowedKeys == 'left' && this.x > blockWidth -10) {
        this.x -= blockWidth;
    } else if (allowedKeys == 'right' && this.x < canvasWidth - blockWidth) {
        this.x += blockWidth;
    } else if (allowedKeys == 'down' && this.y < blockHeight * 5) {
        this.y += blockHeight;
    } else if (allowedKeys == 'up' && this.y > blockHeight ) {
        this.y -= blockHeight;
    } else if (allowedKeys == 'up' && this.y > blockHeight -10) {
        this.reset();
        score += 1;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var randomSpeed = 30 + Math.floor(Math.random() * 70) + Math.floor(Math.random() *30),
        randomx = -90 + Math.floor(Math.random() * -20);
    allEnemies.push(new Enemy(randomx, 50 + 90 *i, randomSpeed));
}

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
        }
    }

};

$('.score').append(score);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
