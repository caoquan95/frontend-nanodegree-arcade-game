// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60 + 83 * Math.floor(Math.random() * 3);
    this.speed = Math.random()*300+200;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speed * dt) % 706;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.resetLocation();
}

Player.prototype.resetLocation = function(){
    this.x = Math.floor(Math.random() * 5) * 101; 
    this.y = 400;
    this.speedX = 0;
    this.speedY = 0;
}

Player.prototype.isCollide = function (enemy){
    return Math.abs(this.x - enemy.x) < 60 && Math.abs(this.y - enemy.y) < 60; 
}

Player.prototype.update = function (dt) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX = 0;
    this.speedY = 0;

    
    if (this.y == -15){
        this.resetLocation();
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (allowedKeys){
   
    switch(allowedKeys){
        case "up":
            if (this.y > 0){
                this.speedY = -83;
            }
            break;
        case "down":
            if (this.y + 166 < 498){
                this.speedY = 83;
            }
            break;
        case "left":
            if (this.x - 101 >= 0){
                this.speedX = -101;
            }
            break;
        case "right":
            if (this.x + 101 < 505){
                this.speedX = 101;
            }
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
setInterval(function(){
    if (allEnemies.length < 5){
        allEnemies.push(new Enemy());
        allEnemies.push(new Enemy());
    }
},500);

var checkCollisions = function(){
    allEnemies.forEach(function(enemy){
        if (player.isCollide(enemy)) player.resetLocation();
    }.bind(player));
}

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
