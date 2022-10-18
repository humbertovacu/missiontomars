const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); 

const background = new Image;
background.src = "images/beautiful-shining-stars-night-sky.jpg";

let gameMeteorites = [];
let gameIridium = [];
let iridiumSpeed = 0.20;
let meteoriteSpeed = 1;
let meteoriteFrequency = 0;
let meteoriteInterval = 240;
let iridiumInterval = 480;
const astronaut = new Image;
astronaut.src = 'images/MajorTom.png';
let score = 0;






const theMeteor = new Image;
theMeteor.src = "images/Meteor.png";
const iridium = new Image;
iridium.src = "images/iridium.png";



const backgroundImage = {
    img: background,
    x: 0,
    speed: -0.25,

    move: function(){
        this.x += this.speed;
        this.x %= canvas.clientWidth;
    },

    draw: function(){
        ctx.drawImage(this.img, this.x, 0, 1000, 1000);
        if(this.speed < 0) {
            ctx.drawImage(this.img, this.x + canvas.clientWidth, 0, 1000, 1000)}
            else {ctx.drawImage(this.img, this.x - this.img.width, 0);}
        },
    };
    

class majorTom{
    constructor(){
        this.img = astronaut;
        this.x = 50;
        this.y = 200;
        this.height = 100;
        this.width = 100;
        this.radius = 20;
    }
    
    draw() {

    ctx.drawImage(this.img,this.x,this.y,100,100)
}
    

drawTwo(){
    ctx.beginPath()
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'red';
    ctx.rect(this.x+50,this.y+5,30,60)
    ctx.stroke();

}

    move() {
        document.onkeydown = event => {
            const key = event.keyCode;
            switch (key) {
                case 37:
                    if (this.x >= 0) this.x -= 30;
                        break;
                case 38:
                    if (this.y >= 0) this.y -= 30;
                        break;
                case 39:
                    this.x += 30;
                    if(this.x >=350){this.x=350;}
                        break;
                    
                case 40:
                    this.y += 30;
                    if(this.y >=350){this.y=350;}
                        break;
            }
        }

    }

    update(){
        this.draw();
        this.move();
        this.drawTwo();
    }

}

function startGame() {
    updateCanvas();

}

const astroTest = new majorTom;

let astronautBox = {
    x: astroTest.x + 50,
    y: astroTest.y + 5,
    width: 30,
    height : 60
}


class meteorite {
    constructor(){
        this.img = theMeteor;
        this.speed = meteoriteSpeed;
        this.width = this.img.width;
        this.height = this.img.height;
        this.x = 450;
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

    drawTwo(){
    ctx.beginPath()
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'red';
    ctx.rect(this.x,this.y + 25,40,40)
    ctx.stroke();

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
        this.drawTwo();
    }
}

const testMeteor = new meteorite;

let meteoriteNormal = {
    x: element.x,
    y: element.y + 25,
    width: 40,
    height: 40
}

let meteoriteUp = {
    angle: element.angle,
    x: element.x - 25,
    y: element.y + 30,
    width: 40,
    height: 40
}

let meteoriteDown = {
    angle: element.angle,
    x: element.x + 20,
    y: element.y + 10,
    width: 40,
    height: 40
}

class Iridium extends meteorite {
    constructor(){
    super()
    this.img = iridium;
    this.x = Math.random()*canvas.clientWidth+450;
    this.y = Math.random()*canvas.clientHeight;
    this.speed = iridiumSpeed;
    this.angle = 0;
    this.dx = 1 * this.speed;
    this.yx = 1 * this.speed;
    this.radius = 100;   
} 

drawTwo(){
    ctx.beginPath()
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'red';
    ctx.rect(this.x,this.y ,40,40)
    ctx.stroke();

}

    update(){
        // this.angle ;
        this.move();
        this.draw();
        this.drawTwo();
    }
}

const testIridium = new Iridium;

function updateCanvas() {
    meteoriteFrequency ++;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    backgroundImage.draw();
    backgroundImage.move();
    astroTest.update();
    testIridium.update();
    if(meteoriteFrequency % meteoriteInterval === 0){
         gameMeteorites.push(new meteorite);    
} 
for (let i = 0; i < gameMeteorites.length; i++){
        gameMeteorites[i].update();

    

    if(detectCollisionMeteorite(gameMeteorites[i],gameMeteorites[i].x,gameMeteorites[i].y)==="collision") {
        setTimeout(() => alert('GAME OVER'), 10);
    }
}


if(meteoriteFrequency % iridiumInterval === 0){
        gameIridium.push(new Iridium);
    }
for (let i = 0; i < gameIridium.length; i++){
    gameIridium[i].update();
   

    if(detectCollision(gameIridium[i],gameIridium[i].x,gameIridium[i].y)==="collision"){
        score += 100;
        gameIridium.splice(i,1);
    }

    console.log(score);
}

  
    requestAnimationFrame(updateCanvas);
};

function detectCollision(element,x2,y2){
// let xDist = x2 - astroTest.x;
// let yDist = y2 - astroTest.y;

// let distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
// return distance < element.radius + astroTest.radius;

if(astroTest.x > x2 + 40 ||
    astroTest.x + 40 < x2 ||
    astroTest.y > y2 + 40||
    astroTest.y + 70 < y2) {
        return "no collision"
    }
    else return "collision";

};

function detectCollisionMeteorite(element,x2,y2){
    switch(element.angle){
    case 0:
    if(astronautBox.x > meteoriteNormal.x + meteoriteNormal
        .width||
        astronautBox.x + astronautBox.width < meteoriteNormal.x||
        astronautBox.y > meteoriteNormal.y + meteoriteNormal.height||
        astronautBox.y + astronautBox.height < meteoriteNormal.y) {
            return "no collision"
        }
        else return "collision";
    case -60:
    if(astroTest.x + 50 + 15 > x2 + 40 + 20||
        astroTest.x + 50 + 30 + 15 < x2 + 20||
        astroTest.y + 5 > y2 + 10 + 40||
        astroTest.y + 5 + 60 < y2 + 10) {
            return "no collision"
        }
        else return "collision";
    case 60:
    if(astroTest.x > ((x2 - 25) + 40 + 20) ||
        astroTest.x + 50< ((x2 - 25) + 20)||
        astroTest.y + 5 > y2 + 30 + 40||
        astroTest.y + 5 + 70 < y2 + 30) {
            return "no collision"
        }
        else return "collision";
    };
    

}

function restartGame(){
    backgroundImage.draw();
    backgroundImage.move();
    setTimeout(()=>startGame(),1000)
}



