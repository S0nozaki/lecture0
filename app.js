var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    background = new Image();
canvas.width = 1800;
canvas.height = 900;
//background.src = "/img/fondo1080p.jpg";
//background.onload = function () {
//    context.drawImage(background, 0, 0);
//}

var baseURI = "";
var development = false;
if(development == false){
    baseURI = background.baseURI;
}

var Img = {};
Img.player = new Image();
Img.player.src = baseURI + "img/player.jpg";
Img.playerBullet = new Image();
Img.playerBullet.src = baseURI + "img/bala1.png";
Img.enemy1 = new Image();
Img.enemy1.src = baseURI + "img/enemy1.jpg";
Img.enemyBullet1 = new Image();
Img.enemyBullet1.src = baseURI + "img/enemyBullet1.jpg";

var player = {
    img: Img.player,
    height: 40,
    width: 40,
    x: 900,
    y: 700,
    velx:10,
    vely:10,
    health: 20,
    lives: 5,
    spressed: false,
    wpressed: false,
    dpressed: false,
    apressed: false,
    zpressed: false,
}

var playerBulletList = [];

function addToBulletList(player) {
    var number = playerBulletList.length;
    var bullets = {
        img: Img.playerBullet,
        width: 4,
        height: 6,
        x: player.x + ((player.width/2)-1),
        y: player.y,
        velx: 14,
        vely: 14,
    };
    playerBulletList[number] = bullets;
}

var enemyBulletList = [];

function addToEnemyBulletList(enemy) {
    var number = enemyBulletList.length;
    var enemyBullets = {
        img: Img.enemyBullet1,
        width: 4,
        height: 6,
        x: enemy.x + ((enemy.width / 2) - 1),
        y: enemy.y + enemy.width,
        velx: 10,
        vely: ((enemy.y + enemy.width) - player.y) /10,
        targetX: enemy.targetX,
        targetY: enemy.targetY,
        //len: Math.sqrt(((enemy.x + enemy.width) - player.x) * ((enemy.x + enemy.width) - player.x) + ((enemy.y + enemy.height) - player.y) * ((enemy.y + enemy.height) - player.y));
        directionX: ((enemy.x + enemy.width) - player.x) / Math.sqrt(((enemy.x + enemy.width) - player.x) * ((enemy.x + enemy.width) - player.x) + ((enemy.y + enemy.height) - player.y) * ((enemy.y + enemy.height) - player.y)),
        directionY: ((enemy.y + enemy.height) - player.y) / Math.sqrt(((enemy.x + enemy.width) - player.x) * ((enemy.x + enemy.width) - player.x) + ((enemy.y + enemy.height) - player.y) * ((enemy.y + enemy.height) - player.y)),
        velocity: 10,
    };
    enemyBulletList[number] = enemyBullets;
}

var enemyList = [];

function addToEnemyList(initialX, initialY, targetX, targetY, index, enemyType) {
    var enemy1 = {
        type: enemyType,
        img: Img[enemyType],
        width: 40,
        height: 40,
        x: initialX,
        y: initialY,
        velx: 8,
        vely: 8,
        targetX: targetX,
        targetY: targetY,
        numberOfHitEndurance: 5,
        bulletCounter: 0,
        shootFlag: false,
    };
    enemyList[index] = enemy1;
}

var framerate = 0;
var numberOfEnemies = 0;

setInterval(gameUpdate, 40);

function gameUpdate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    framerate++;
    updatePlayer();
    updateBullets(playerBulletList);
    updateEnemies();
    updateEnemyBullets(enemyBulletList);
}

function updatePlayer() {
    if (player.lives <= 0) {
        alert("You Lost!! Press Ok to Keep Playing");
        player.lives = 5;
        player.x = 900;
        player.y = 700;
        player.wpressed = false;
        player.apressed = false;
        player.spressed = false;
        player.dpressed = false;
        player.zpressed = false;
        playerBulletList = [];
        enemyList = [];
        numberOfEnemies = 0;
        enemyBulletList = [];

    }
    if (player.wpressed) {
        player.y += player.vely;
    }
    if (player.spressed) {
        player.y -= player.vely;
    }
    if (player.apressed) {
        player.x -= player.velx;
    }
    if (player.dpressed) {
        player.x += player.velx;
    }
    draw(player);
}

function updateBullets(playerBulletList) {
    if (player.zpressed) {
        player.numberofbullets++;
        addToBulletList(player);
    }
    for (var index = 0; index < playerBulletList.length; index++) {
        playerBulletList[index].y -= playerBulletList[index].vely;
        if (outOfScreen(playerBulletList[index]) || collisionWithEnemy(playerBulletList[index])) {
            playerBulletList.splice(index, 1);
            index--;
        } else {
            draw(playerBulletList[index]);
        }
    }
}

function updateEnemies() {

    if (framerate % 40 == 0) {
        addToEnemyList(1600, 50, 0, 20, numberOfEnemies, "enemy1")
        numberOfEnemies++;
    }
    if (enemyList.length != 0) {
        for (var index = 0; index < enemyList.length; index++) {
            enemyList[index].x -= enemyList[index].velx;
            enemyList[index].bulletCounter++;
            if (outOfScreen(enemyList[index]) || enemyList[index].numberOfHitEndurance <= 0 || collisionWithPlayer(enemyList[index])) {
                enemyList.splice(index, 1);
                index--;
                numberOfEnemies--;
            } else {
                draw(enemyList[index]);
                if (enemyList[index].bulletCounter == 10) {
                    enemyList[index].bulletCounter = 0;
                    enemyList[index].shootFlag = true;
                    enemyList[index].targetX = player.x + player.width / 2;
                    enemyList[index].targetX = player.y + player.height / 2;
                }
                if (enemyList[index].shootFlag == true) {
                    enemyList[index].shootFlag = false;
                    addToEnemyBulletList(enemyList[index]);
                }
            }
        }
    }
}

function updateEnemyBullets(enemyBulletsList) {
    for (var index = 0; index < enemyBulletsList.length; index++) {
        //enemyBulletsList[index].y -= enemyBulletsList[index].vely;
        enemyBulletsList[index].x -= enemyBulletsList[index].directionX * enemyBulletsList[index].velocity;
        enemyBulletsList[index].y -= enemyBulletsList[index].directionY * enemyBulletsList[index].velocity;
        //if (outOfScreen(enemyBulletsList[index]) || collisionWithEnemy(enemyBulletsList[index])) {
        if (outOfScreen(enemyBulletsList[index]) || bulletCollisionWithPlayer(enemyBulletsList[index])) {
            enemyBulletsList.splice(index, 1);
            index--;
        } else {
            draw(enemyBulletsList[index]);
        }
    }
}

function draw(drawableEntity) {
    context.save();
    context.drawImage(drawableEntity.img, drawableEntity.x, drawableEntity.y);
    context.restore();
}

function outOfScreen(entity) {
    return (entity.x <= -entity.width || entity.x >= canvas.width || entity.y <= -entity.height || entity.y >= canvas.height);
}

function collisionWithEnemy(bullet) {
    for (var index = 0; index < enemyList.length; index++) {
        if (bullet.x + bullet.width >= enemyList[index].x && bullet.x <= (enemyList[index].x + enemyList[index].width) && bullet.y + bullet.height > enemyList[index].y && bullet.y < (enemyList[index].y + enemyList[index].height)) {
            enemyList[index].numberOfHitEndurance--;
            return true;
        }
    }
    return false;
}

function collisionWithPlayer(enemy) {
    if (enemy.x + enemy.width > player.x && enemy.x <= (player.x + player.width) && enemy.y + enemy.height > player.y && enemy.y < (player.y + player.height)) {
        enemy.numberOfHitEndurance--;
        player.lives--;
        return true;
    }
}

function bulletCollisionWithPlayer(bullet) {
    if (bullet.x + bullet.width > player.x && bullet.x <= (player.x + player.width) && bullet.y + bullet.height > player.y && bullet.y < (player.y + player.height)) {
        player.lives--;
        return true;
    }
}

W_KEY = 83;
S_KEY = 87;
A_KEY = 65;
D_KEY = 68;

document.onkeydown = function (evt) {
    if (evt.keyCode == W_KEY) {
        player.wpressed = true;
    }
    if (evt.keyCode == S_KEY) {
        player.spressed = true;
    }
    if (evt.keyCode == A_KEY) {
        player.apressed = true;
    }
    if (evt.keyCode == D_KEY) {
        player.dpressed = true;
    }
    if (evt.key == "z") {
        player.zpressed = true;
    }
}

document.onkeyup = function (evt) {
    if (evt.keyCode == W_KEY) {
        player.wpressed = false;
    }
    if (evt.keyCode == S_KEY) {
        player.spressed = false;
    }
    if (evt.keyCode == A_KEY) {
        player.apressed = false;
    }
    if (evt.keyCode == D_KEY) {
        player.dpressed = false;
    }
    if (evt.key == "z") {
        player.zpressed = false;
    }
}