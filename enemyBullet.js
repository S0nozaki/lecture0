export default class EnemyBullet {
    constructor(img, enemy, targetX, targetY){
        this.img = img,
        this.width = 4,
        this.height = 6,
        this.x = enemy.x + ((enemy.width / 2) - 1),
        this.y = enemy.y + enemy.width,
        this.velx = 10,
        this.vely = ((enemy.y + enemy.width) - targetY) /10,
        this.targetX = enemy.targetX,
        this.targetY = enemy.targetY,
        this.directionX = ((enemy.x + enemy.width) - targetX) / Math.sqrt(((enemy.x + enemy.width) - targetX) * ((enemy.x + enemy.width) - targetX) + ((enemy.y + enemy.height) - targetY) * ((enemy.y + enemy.height) - targetY)),
        this.directionY = ((enemy.y + enemy.height) - targetY) / Math.sqrt(((enemy.x + enemy.width) - targetX) * ((enemy.x + enemy.width) - targetX) + ((enemy.y + enemy.height) - targetY) * ((enemy.y + enemy.height) - targetY)),
        this.velocity = 10
    }
}