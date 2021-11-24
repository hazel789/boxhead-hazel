let playerFront;
let playerBack;
let playerLeft;
let playerRight;
let zombieFront;
let zombieBack;
let zombieLeft;
let zombieRight;
let backgroundImg;

let player;
let zombie;

function setup() {
    createCanvas(windowWidth, windowHeight);
    playerFront = loadImage('Assets/playerFront.png');
    playerBack = loadImage('Assets/playerBack.png');
    playerLeft = loadImage('Assets/playerLeft.png');
    playerRight = loadImage('Assets/playerRight.png');
    zombieRight = loadImage('Assets/zombieRight.png');
    zombieLeft = loadImage('Assets/zombieLeft.png');
    zombieFront = loadImage('Assets/zombieFront.png');
    zombieBack = loadImage('Assets/zombieBack.png');
    backgroundImg = loadImage('Assets/background.png');
    

    player = new Player(10, 10, 100)
    zombie = new Zombie(500, 0, 100)
    
}


class Player {
    constructor(posX, posY, radius=100) {
        this.posX = posX - 125
        this.posY = posY - 125
        this.radius = radius;
    }


}

class Zombie extends Player {
    constructor(posX, posY, radius) {
        super(posX, posY, radius);
    }
}

function draw() {
    renderImages();
    keyPresses();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function renderImages() {
    image(playerFront, player.posX, player.posY, 25, 25);
    image(zombieFront, zombie.posX, zombie.posY, 50, 50);
    image(backgroundImg, 0 , 0, windowWidth, windowHeight);
}


function keyPresses() {
    if (keyIsDown(LEFT_ARROW)) {
        player.posX -= 10
    } 
    if (keyIsDown(RIGHT_ARROW)) {
        player.posX += 10
    } 
}



