var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    background = new Image();
canvas.width = 1800;
canvas.height = 900;
background.src = "/img/fondo1080p.jpg";
//background.onload = function () {
//    context.drawImage(background, 0, 0);
//}
var Img = {};
Img.player = new Image();
Img.player.src = "/img/player.jpg";

W_KEY = 83;
S_KEY = 87;
A_KEY = 65;
D_KEY = 68;

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
}

var jugador = player;
setInterval(gameUpdate,40);
function gameUpdate() {
    movePlayer();
    updatemade = false;

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
}