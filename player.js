export default class Player {
    constructor(img){
        this.img = img,
        this.height = 40,
        this.width = 40,
        this.x = 900,
        this.y = 700,
        this.velx =10,
        this.vely = 10,
        this.health = 20,
        this.lives = 5,
        this.spressed = false,
        this.wpressed = false,
        this.dpressed = false,
        this.apressed = false,
        this.zpressed = false
    }
    update(){
        if (this.wpressed) {
            this.y += this.vely;
        }
        if (this.spressed) {
            this.y -= this.vely;
        }
        if (this.apressed) {
            this.x -= this.velx;
        }
        if (this.dpressed) {
            this.x += this.velx;
        }
    }
    isAlive(){
        return this.lives > 0;
    }
}