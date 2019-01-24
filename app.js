var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    background = new Image();
canvas.width = 1800;
canvas.height = 900;
//background.src = "/img/fondo1080p.jpg";
//background.onload = function () {
//    context.drawImage(background, 0, 0);
//}
var Img = {};
Img.player = new Image();
Img.player.src = Img.player.baseURI + "img/player.jpg";
Img.playerBullet = new Image();
Img.playerBullet.src = Img.playerBullet.baseURI + "img/bala1.png";
Img.enemy1 = new Image();
Img.enemy1.src = Img.enemy1.baseURI + "img/enemy1.jpg";

var player = {
    img: Img.player,
    height: 40,
    width: 40,
    x:0,
    y: 0,
    velx:10,
    vely:10,
    health: 20,
    lives: 3,
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
        velx: 10,
        vely: 10,
    };
    playerBulletList[number] = bullets;
}

var enemyList = [];

function addToEnemyList(initialX, initialY, targetX, targetY, index) {
    var enemy1 = {
        img: Img.enemy1,
        width: 40,
        height: 40,
        x: initialX,
        y: initialY,
        velx: 10,
        vely: 10,
        targetX: targetX,
        targetY: targetY,
        numberOfHitEndurance: 5,
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
}

function updatePlayer() {
    if (player.lives <= 0) {
        alert("You Lost!! Press Ok to Keep Playing");
        player.lives = 3;
        player.wpressed = false;
        player.apressed = false;
        player.spressed = false;
        player.dpressed = false;
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
    drawPlayer(player);
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
            drawBullet(playerBulletList[index]);
        }
    }
}

function updateEnemies() {

    if (framerate % 40 == 0) {
        addToEnemyList(1000, 50, 0, 20, numberOfEnemies)
        numberOfEnemies++;
    }
    if (enemyList.length != 0) {
        for (var index = 0; index < enemyList.length; index++) {
            enemyList[index].x -= enemyList[index].velx;
            if (outOfScreen(enemyList[index]) || enemyList[index].numberOfHitEndurance <= 0 || collisionWithPlayer(enemyList[index])) {
                enemyList.splice(index, 1);
                index--;
                numberOfEnemies--;
            } else {
                drawEnemy(enemyList[index]);
            }
        }
    }
}

function drawPlayer(player1) {
    context.save();
    context.drawImage(player1.img, player1.x, player1.y);
    context.restore();
}

function drawBullet(bullet) {
    context.save();
    context.drawImage(bullet.img, bullet.x, bullet.y);
    context.restore();
}

function drawEnemy(enemy) {
    context.save();
    context.drawImage(enemy.img, enemy.x, enemy.y);
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