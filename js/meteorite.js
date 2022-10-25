class meteorite {
    constructor(){
        this.img = theMeteor;
        this.speed = meteoriteSpeed;
        this.width = this.img.width;
        this.height = this.img.height;
        this.x = 800;
        this.y = Math.random()*canvas.clientHeight;
        this.angle = this.angle();
        this.dx = 1 * this.speed;
        this.yx = 1 * this.speed;   
        this.radius = 20; 
    }
    draw(){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle * Math.PI/360);
        ctx.drawImage(this.img, 0, 0, this.img.width,this.img.height);
        ctx.restore();
    }

    angle(){
        if(this.y <= 150) return -60;
        else if (this.y >= 151 && this.y <= 300) return 0;
        else return 60;
    }

     move(){
        if(this.angle === -60){
            this.x -= this.dx;
            this.y += this.dx;
        }
        else if(this.angle === 60){
            this.x -= this.dx;
            this.y -= this.dx;
        }
        else this.x -= this.dx;
    }

    update(){

        this.move();
        this.draw();
    }
}

class Iridium extends meteorite {
    constructor(){
    super()
    this.img = iridium;
    this.x = Math.random()*canvas.clientWidth+900;
    this.y = Math.random()*canvas.clientHeight;
    this.speed = iridiumSpeed;
    this.angle = 0;
    this.dx = 1 * this.speed;
    this.yx = 1 * this.speed;
    this.radius = 100;  
    this.width = 40;
    this.height = 40; 
} 

    update(){
        this.move();
        this.draw();
    }
}
