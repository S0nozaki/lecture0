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

W_KEY = 83;
S_KEY = 87;
A_KEY = 65;
D_KEY = 68;

var playerBulletList = [];

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



var jugador = player;
setInterval(gameUpdate,40);
function gameUpdate() {
    movePlayer();
    updateBullets(playerBulletList);
}

function updateBullets(playerBulletList) {
    if (jugador.zpressed) {
        jugador.numberofbullets++;
        addToBulletList(jugador);
    }
    for (var bullet in playerBulletList) {
        index = bullet;
        playerBulletList[index].y -= playerBulletList[index].vely;
        if (outOfScreen(playerBulletList[index])) {
            playerBulletList.splice(index, 1);
            index--;
        } else {
            drawBullet(playerBulletList[index]);
        }
    }
}

function outOfScreen(entity) {
    return (entity.x < -entity.width || entity.x > canvas.width || entity.y < 100 || entity.y > canvas.height);
}

function drawBullet(bullet) {
    context.save();
    context.drawImage(bullet.img, bullet.x, bullet.y);
    context.restore();
}

function drawPlayer(player1) {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(player1.img, player1.x, player1.y);
    context.restore();
}

function movePlayer() {
    if (jugador.wpressed) {
        jugador.y += jugador.vely;
    }
    if (jugador.spressed) {
        jugador.y -= jugador.vely;
    }
    if (jugador.apressed) {
        jugador.x -= jugador.velx;
    }
    if (jugador.dpressed) {
        jugador.x += jugador.velx;
    }
    drawPlayer(jugador);
}
document.onkeydown = function (evt) {
    if (evt.keyCode == W_KEY) {
        jugador.wpressed = true;
    }
    if (evt.keyCode == S_KEY) {
        jugador.spressed = true;
    }
    if (evt.keyCode == A_KEY) {
        jugador.apressed = true;
    }
    if (evt.keyCode == D_KEY) {
        jugador.dpressed = true;
    }
    if (evt.key == "z") {
        jugador.zpressed = true;
    }
}

document.onkeyup = function (evt) {
    if (evt.keyCode == W_KEY) {
        jugador.wpressed = false;
    }
    if (evt.keyCode == S_KEY) {
        jugador.spressed = false;
    }
    if (evt.keyCode == A_KEY) {
        jugador.apressed = false;
    }
    if (evt.keyCode == D_KEY) {
        jugador.dpressed = false;
    }
    if (evt.key == "z") {
        jugador.zpressed = false;
    }
}