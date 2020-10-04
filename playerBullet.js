export default class PlayerBullet {
    constructor(img, x, y, originWidth){
        this.img = img,
        this.width = 4,
        this.height = 6,
        this.x = x + ((originWidth/2)-1),
        this.y = y,
        this.velx = 14,
        this.vely = 14
    }
    updatePosition() {
        this.y -= this.vely;
    }
}