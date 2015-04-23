// Generate a random integer between min(included) and max(excluded)
// Borrowed from Mozilla Developer Network JavaScript built-in Objects Reference:Math
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // Enemy initial position
    // Randomize the enemy position
    this.x = -100;
    this.y = getRandomInt(1, 4) * 75;
    this.speed = getRandomInt(50, 300);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > ctx.canvas.width) {
        this.x = -100;
        this.y = getRandomInt(1, 4) * 75;
        this.speed = getRandomInt(10, 150);
    }
    else {
        this.x = this.x + this.speed * dt;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Detect if this enemy collides with the player on the board
// This is a simplified version of collision detection, making assumptition
// that both enemy and player are bounded in box 83 pixel tall, 103 pix wide box.
// The function only checks if there is overlapping.
Enemy.prototype.collides = function(player) {
    for( row = this.y; row <= this.y + 83; row++)
        for( col = this.x; col <= this.x + 103; col++) {
            // additional margin adjustment to make sure enemy and plaer have a solid collision
            if ((row  >= player.y + 15 )&&(row <= player.y + 83 - 15 )&&(col >= player.x + 30)&&(col <= player.x + 103 -30 ))
                return true;
        }

    return false;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Set the player starting point
    this.x = ctx.canvas.width / 2 - 50;
    this.y = ctx.canvas.height -200;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    // Adjust the Player field margin to corner the Player
    // in the field on both horizontal and vertical direction
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > ctx.canvas.width - 100) {
        this.x = ctx.canvas.width - 100;
    }

    if (this.y < 0) {
        this.y = 0;
    } else if (this.y > ctx.canvas.height - 170) {
        this.y = ctx.canvas.height - 170;
    }
    // If Player survives after crossing over the enemy field, Score and reset the game.
    if (this.y < 2)
        this.startAllOver();

    this.render();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x += -8;
          break;
        case 'up':
            this.y += -8;
          break;
        case 'right':
            this.x += 8;
          break;
        case 'down':
            this.y += 8;
          break;
    }
}

Player.prototype.startAllOver = function() {
    this.x = ctx.canvas.width / 2 - 50;
    this.y = ctx.canvas.height -200;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 0; i < 3; i++)
    allEnemies.push(new Enemy());

var player = new Player();

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
