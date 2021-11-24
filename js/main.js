let startBackground;
let gameState;
let startDiv;
let endDiv;
let endButton;
let startButton;
let score;
let scoreDiv;
let startImg;
let deadImg;

let playerFront;
let playerBack;
let playerLeft;
let playerLeft2;
let playerRight;
let playerRight2;
let zombieFront;
let zombieBack;
let zombieLeft;
let zombieRight;
let backgroundImg;
let projectileImg;
let timeLastShot;
let timeBetweenShots;
let timeLastSpawned;
let timeBetweenSpawns;
let d;

let player;

let projectiles = []; 
let zombies = [];
const zombieDir = [0,1,2,3];
let zombiesTemp;
let projectilesTemp;


function setup() {
 
    createCanvas(windowWidth, windowHeight);
    startBackground = loadImage('Assets/startMenuBackground.jpeg');

    playerFront = loadImage('Assets/playerFront.png');
    playerBack = loadImage('Assets/playerBack.png');
    playerLeft = loadImage('Assets/playerLeft.png');
    playerLeft2 = loadImage('Assets/playerLeft2.png');
    playerRight = loadImage('Assets/playerRight.png');
    playerRight2 = loadImage('Assets/playerRight2.png');
    zombieRight = loadImage('Assets/zombieRight.png');
    zombieLeft = loadImage('Assets/zombieLeft.png');
    zombieFront = loadImage('Assets/zombieFront.png');
    zombieBack = loadImage('Assets/zombieBack.png');
    backgroundImg = loadImage('Assets/background.png');
    projectileImg = loadImage('Assets/projectile.png');
    
    
    timeLastShot=Date.now();
    timeBetweenShots=100;
    timeLastSpawned=Date.now();
    timeBetweenSpawns=500;

    player = new Player(2, windowWidth/2, windowHeight/2)
    gameState = 'start'; 

    startDiv = createDiv('Welcome to Boxhead 2');
    endDiv = createDiv('Game Over');
    scoreDiv = createDiv(`score:${score}`);
    startImg = createImg('Assets/startImage2.png');
    startButton = createButton('Start Game!');
    deadImg = createImg('Assets/playerDead.png');
    endButton = createButton('Restart?');
}

class Player {
    constructor(playerDir, posX, posY, radius=20) {
        this.posX = posX
        this.posY = posY
        this.radius = radius
        this.playerDir=playerDir

        if (playerDir===0) {  // right
            this.img=playerRight;

        } else if (playerDir===1) { //left
            this.img=playerLeft;

        } else if (playerDir===2) { //down
            this.img=playerFront;

        } else if (playerDir===3) { //up
            this.img=playerBack;
        }
    }
}

class Zombie {
    constructor(direction, posX=0, posY=0, speed, radius=20) {
        this.direction=direction
        this.posX = posX
        this.posY=posY
        this.speed=speed
        this.radius=radius
        
        if (direction===0) {  // left
            this.img=zombieRight;
            this.velocityX = speed;
            this.velocityY = 0;

        } else if (direction===1) { //right
            this.img=zombieLeft;
            this.velocityX = -speed;
            this.velocityY = 0;

        } else if (direction===2) { //down
            this.img=zombieFront;
            this.velocityX = 0;
            this.velocityY = speed;

        } else if (direction===3) { //up
            this.img=zombieBack;
            this.velocityX = 0;
            this.velocityY = -speed;
        }
    }  
    move() {
        this.posX += this.velocityX;
        this.posY += this.velocityY;
    }

    changeDirection(direction, speed=1) {
    if (direction===0) {  // left
        this.img=zombieLeft;
        this.velocityX = -speed;
        this.velocityY = 0;

    } else if (direction===1) { //right
        this.img=zombieRight;
        this.velocityX = speed;
        this.velocityY = 0;

    } else if (direction===2) { //down
        this.img=zombieFront;
        this.velocityX = 0;
        this.velocityY = speed;

    } else if (direction===3) { //up
        this.img=zombieBack;
        this.velocityX = 0;
        this.velocityY = -speed;
    }
}
}

class Projectile {
    constructor(direction, posX, posY, speed, radius=12) {
        this.direction=direction
        this.posX = posX
        this.posY=posY
        this.speed=speed
        this.radius=radius
        this.img=projectileImg
    
        if (direction===0) { //left
            this.velocityX = speed;
            this.velocityY = 0;

        } else if (direction===1) { //right
            this.velocityX = -speed;
            this.velocityY = 0;

        } else if (direction===2) { //down
            this.velocityX = 0;
            this.velocityY = speed;

        } else if (direction===3) { //up
            this.velocityX = 0;
            this.velocityY = -speed;
        }
    }  
    move() {
        this.posX += this.velocityX;
        this.posY += this.velocityY;
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function renderImagesStart() {

    image(startBackground, 0, 0, windowWidth, windowHeight);
    startImg.position(windowWidth/2-120, windowHeight/2-60);
    startDiv.position(windowWidth/2 - 550, windowHeight/2 - 200);
    startButton.position(windowWidth/2 - 150, windowHeight/2 + 100);
    startButton.mousePressed(toPlay);
}

function renderImages() {

    image(backgroundImg,0,0, windowWidth, windowHeight);
    image(player.img,player.posX,player.posY, 33, 48);

    scoreDiv.position = (windowWidth/2, windowHeight/2);
    
    for (const item of zombies) { 
        image(item.img, item.posX, item.posY, 35, 45);
    }
}

function toPlay() {
    removeElements();
    gameState = 'play';
    console.log('toplay');
}

function gameOver() {

    image(startBackground, 0, 0, windowWidth, windowHeight);
    endDiv.position(windowWidth/2 - 300, windowHeight/2 - 200);
    deadImg.position(windowWidth/2-120, windowHeight/2-60);
    endButton.position(windowWidth/2 - 150, windowHeight/2 + 100);
    endButton.mousePressed(toPlay);

    zombies = [];
    projectiles = [];
    player = new Player(2, windowWidth/2, windowHeight/2);
}

function keyDown() {

    
    if (keyIsDown(RIGHT_ARROW)) {
        player.playerDir = 0;
        if(player.img===playerRight) {
            player.img=playerRight2;
        } else {
            player.img=playerRight;
        }
        player.posX += 5;
    }
    if (keyIsDown(LEFT_ARROW)) {
        player.playerDir = 1;

        if(player.img===playerLeft) {
            player.img=playerLeft2;
        } else {
            player.img=playerLeft;
        }
        player.posX -= 5;
    } 
    if (keyIsDown(DOWN_ARROW)) {
        player.playerDir=2;
        player.img=playerFront;
        player.posY += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        player.playerDir=3;
        player.img=playerBack; 
        player.posY -= 5;
    }  
}

function randomMove() {
    
    for (const zombie of zombies) { 
        if (Math.random()<0.01) {
            zombie.changeDirection(Math.floor(Math.random()*4));
        }

        zombie.move();

        if (capBoundary(zombie)) {
            if(zombie.direction===0) {
                zombie.changeDirection(1);

            } else if (zombie.direction===1) {
                zombie.changeDirection(0);

            } else if (zombie.direction===2) {
                zombie.changeDirection(3)

            } else if (zombie.direction===3) {
                zombie.changeDirection(2);
            }
        };
    }
}


function capBoundary(obj) {
    let hitEdge=false; 

    if (obj.posX > windowWidth-30) {
      obj.posX=windowWidth-30;
      hitEdge=true;

    } else if (obj.posX < 0) {
        obj.posX = 0;
        hitEdge=true;
    }
  
    if (obj.posY > windowHeight-100) {
        obj.posY=windowHeight-100;
        hitEdge=true;
        
    } else if (obj.posY< 100) {
        obj.posY = 100;
        hitEdge=true;
    }
    return hitEdge;
}

function collision(obj1, obj2) {

    if (obj2 === player) {
        d = dist(obj1.posX+17.5, obj1.posY+15, obj2.posX+16.5, obj2.posY+24); 

    } else {
        d = dist(obj1.posX+17.5, obj1.posY+15, obj2.posX+6, obj2.posY+6); 
    }

    if (d < obj1.radius + obj2.radius) {
        return true
    } else {
        return false
    }
}

function draw() {

    if (gameState==='start') {
        renderImagesStart();
    }

    if (gameState ==='play') {
        renderImages();
        keyDown();
        capBoundary(player);


        if (keyIsDown(65) && (Date.now()-timeLastShot) > timeBetweenShots) {
            timeLastShot=Date.now();
            projectiles.push(new Projectile(player.playerDir, player.posX, player.posY, 10));
        }

        const projectileTemp2 = [];

        for (let i=0; i<projectiles.length; i++) {
            image(projectileImg, projectiles[i].posX, projectiles[i].posY + 22, 12, 12);    
            projectiles[i].move();

            if (!capBoundary(projectiles[i])) {
                projectileTemp2.push(projectiles[i]);
            }
        }
        projectiles = projectileTemp2;
        console.log(projectiles);

        if (zombies.length<10 && Date.now()-timeLastSpawned>timeBetweenSpawns) {
            timeLastSpawned=Date.now();
            zombies.push(new Zombie(zombieDir[0], 0, Math.floor(Math.random()*(windowHeight-200))+100, 1));
            zombies.push(new Zombie(zombieDir[1], windowWidth, Math.floor(Math.random()*(windowHeight-200))+100, 1));
        }

        randomMove();

        zombiesTemp=[];

        for (const zombie of zombies) {
            projectilesTemp=[];
            let dead = false;
            score=0;

            for (const projectile of projectiles) {
                if (collision(zombie, projectile)) {
                    dead = true;
                    score+=1

                } else {  
                    projectilesTemp.push(projectile);
                    console.log(projectilesTemp)
                }
            }
            projectiles = projectilesTemp;
            
            if (!dead) {
            zombiesTemp.push(zombie);
            }
        } 
        
        zombies = zombiesTemp;

        for (const zombie of zombies) {
            if (collision(zombie, player)) {
                console.log('Game Over!');
                gameState='over';
            }
        }
    }

    if (gameState==='over') {
        gameOver();
    }
}




