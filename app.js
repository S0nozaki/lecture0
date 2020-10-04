import Player from '/player.js'
import Enemy from '/enemy.js'
import PlayerBullet from '/playerBullet.js'
import EnemyBullet from '/enemyBullet.js'

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
var development = true;
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

var player = new Player(Img.player);

var playerBulletList = [];
var enemyBulletList = [];
var enemyList = [];
var framerate = 0;

setInterval(gameUpdate, 40);

function gameUpdate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    framerate++;
    checkDeath();
    player.update();
    draw(player);
    generateEnemies();
    generateBullets();
    updateBullets(playerBulletList);
    updateEnemies();
    updateEnemyBullets(enemyBulletList);
}

function checkDeath() {
    if (!player.isAlive()) {
        alert("You Lost!! Press Ok to Play again");
        player = new Player(Img.player);
        playerBulletList = [];
        enemyList = [];
        enemyBulletList = [];
    }
}

function generateEnemies(){
    if (framerate % 40 == 0) {
        var enemy = new Enemy(Img.enemy1, 1600, 50, 0, 20);
        enemyList.push(enemy);
    }
}

function generateBullets(){
    if (player.zpressed) {
        var bullet = new PlayerBullet(Img.playerBullet, player.x, player.y, player.width);
        playerBulletList.push(bullet);
    }
}

function updateBullets(playerBulletList) {
    for (var index = 0; index < playerBulletList.length; index++) {
        playerBulletList[index].updatePosition();
        if (outOfScreen(playerBulletList[index]) || collisionWithEnemy(playerBulletList[index])) {
            playerBulletList.splice(index, 1);
            index--;
        } else {
            draw(playerBulletList[index]);
        }
    }
}

function updateEnemies() {
    if (enemyList.length != 0) {
        for (var index = 0; index < enemyList.length; index++) {
            enemyList[index].x -= enemyList[index].velx;
            enemyList[index].bulletCounter++;
            if (outOfScreen(enemyList[index]) || enemyList[index].numberOfHitEndurance <= 0 || collisionWithPlayer(enemyList[index])) {
                enemyList.splice(index, 1);
                index--;
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
                    var enemyBullet = new EnemyBullet(Img.enemyBullet1, enemyList[index], player.x, player.y);
                    enemyBulletList.push(enemyBullet);
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

const W_KEY = 83;
const S_KEY = 87;
const A_KEY = 65;
const D_KEY = 68;

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