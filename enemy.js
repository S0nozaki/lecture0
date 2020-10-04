export default class Enemy {
    constructor(img, initialX, initialY, targetX, targetY){
        this.type = "enemy1",
        this.img = img,
        this.width = 40,
        this.height = 40,
        this.x = initialX,
        this.y = initialY,
        this.velx = 8,
        this.vely = 8,
        this.targetX = targetX,
        this.targetY = targetY,
        this.numberOfHitEndurance = 5,
        this.bulletCounter = 0,
        this.shootFlag = false
    }
}