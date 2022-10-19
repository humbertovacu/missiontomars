const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); 
const rocketCanvas = document.getElementById("rocket-canvas");
const ctx2 = rocketCanvas.getContext('2d');

const background = new Image;
background.src = "images/beautiful-shining-stars-night-sky.jpg";
const baseBackground = new Image;
baseBackground.src = "images/Moon.jpg"
const launchBase = new Image;
launchBase.src = "images/platform_large_SE.png"
const rocketOne = new Image;
rocketOne.src = "images/rocket_baseA_SE.png"
const rocketFins = new Image;
rocketFins.src = "images/rocket_finsA_SE.png"
const rocketFuel = new Image;
rocketFuel.src = "images/rocket_fuelA_SE.png"
const rocketSides = new Image;
rocketSides.src = "images/rocket_sidesA_SE.png"
const rocketTop = new Image;
rocketTop.src = "images/rocket_topA_SE.png"
const baseDish = new Image;
baseDish.src = "images/satelliteDish_detailed_SE.png"
const baseHangar = new Image;
baseHangar.src = "images/hangar_largeB_NE.png"


let gameStatus = "not-over"
let gameMeteorites = [];
let gameIridium = [];
let iridiumSpeed = 0.20;
let meteoriteSpeed = 1;
let meteoriteFrequency = 0;
let meteoriteInterval = 240;
let iridiumInterval = 480;
let constructionLevel = 0;
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
    

// drawTwo(){
//     ctx.beginPath()
//     ctx.lineWidth = '1';
//     ctx.strokeStyle = 'red';
//     ctx.rect(this.x+45,this.y+5,20,90)
//     ctx.stroke();

// }

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
        // this.drawTwo();
    }

}

function startGame() {
    let gameCanvas = document.getElementById("canvas");
    let startMenu = document.getElementById("menu-container");
    startMenu.style.display = "none";
    gameCanvas.style.display = "block";

    
    updateCanvas();

}

function scoreDisplay(){
    let totalBudgetDisplay = document.querySelector("span");
    totalBudgetDisplay.innerHTML = score * 1000;
}



const astroTest = new majorTom;




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

//     drawTwo(){
//     // ctx.beginPath()
//     // ctx.lineWidth = '1';
//     // ctx.strokeStyle = 'red';
//     // ctx.rect(this.x -18,this.y + 32,30,30)
//     // ctx.stroke();

//     ctx.beginPath();
//     ctx.lineWidth = '1';
//     ctx.strokeStyle = 'red';
//     ctx.arc(this.x - 2, this.y + 50, 20, 0, 2 * Math.PI);
//     ctx.stroke();

    

// }


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
        // this.drawTwo();
    }
}

const testMeteor = new meteorite;



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
    this.width = 40;
    this.height = 40; 
} 

// drawTwo(){
//     ctx.beginPath()
//     ctx.lineWidth = '1';
//     ctx.strokeStyle = 'red';
//     ctx.rect(this.x,this.y ,40,40)
//     ctx.stroke();

// }

    update(){
        // this.angle ;
        this.move();
        this.draw();
        // this.drawTwo();
    }
}



function updateCanvas() {
    meteoriteFrequency ++;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    backgroundImage.draw();
    backgroundImage.move();
    astroTest.update();
    scoreDisplay();
    difficultyLevel();
    drawBase();
    if(meteoriteFrequency % meteoriteInterval === 0){
         gameMeteorites.push(new meteorite);    
} 
for (let i = 0; i < gameMeteorites.length; i++){
        gameMeteorites[i].update();

    

    if(detectCollisionMeteorite(gameMeteorites[i],gameMeteorites[i].x,gameMeteorites[i].y)==="collision") {
        gameStatus = "over";
        gameOver();

    }

    // if(gameMeteorites[i].x <= -10 && gameMeteorites[i].y>500){gameMeteorites.splice(i,1)}
}


if(meteoriteFrequency % iridiumInterval === 0){
        gameIridium.push(new Iridium);
    }
for (let i = 0; i < gameIridium.length; i++){
    gameIridium[i].update();
   

    if(detectCollisionIridium(gameIridium[i],gameIridium[i].x,gameIridium[i].y)==="collect"){
        gameIridium.splice(i,1);
        score += 100;
        
    }

    // if(gameIridium[i].x <= -10){gameIridium.splice(i,1)};


}

  
    if(gameStatus==="not-over"){
        requestAnimationFrame(updateCanvas)};
};






function detectCollisionIridium(element,x2,y2){

    let astronautBoxEle = {
        x: astroTest.x + 45,
        y: astroTest.y + 5,
        width: 20,
        height : 90
    }
    if(astronautBoxEle.x > element.x + element.width||
        astronautBoxEle.x + astronautBoxEle.width < element.x||
        astronautBoxEle.y > element.y + element.height||
        astronautBoxEle.y + astronautBoxEle.height < element.y) {
            return "don't collect"
        }
        else return "collect";
};

function detectCollisionMeteorite(element,x2,y2){

let astronautBox = {
    x: astroTest.x + 45,
    y: astroTest.y + 5,
    width: 20,
    height : 90
}
 
let meteoriteNormal = {
    angle: element.angle,
    x: element.x + 7,
    y: element.y + 30,
    width: 50,
    height: 30
}

let meteoriteUp = {
    angle: element.angle,
    x: element.x - 2,
    y: element.y + 50,
    radius: 15
}

let meteoriteDown = {
    angle: element.angle,
    x: element.x + 42,
    y: element.y + 28,
    radius: 15
}

    switch(element.angle) {
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
    if(astronautBox.x > meteoriteDown.x + meteoriteDown.radius||
        astronautBox.x + astronautBox.width < meteoriteDown.x||
        astronautBox.y > meteoriteDown.y + meteoriteDown.radius||
        astronautBox.y + astronautBox.height < meteoriteDown.y) {
            return "no collision"
        }
        else return "collision";

    case 60:
    if(astronautBox.x > meteoriteUp.x + meteoriteUp.radius||
        astronautBox.x + astronautBox.width < meteoriteUp.x||
        astronautBox.y > meteoriteUp.y + meteoriteUp.radius||
        astronautBox.y + astronautBox.height < meteoriteUp.y) {
            return "no collision"
        }
        else return "collision";
    };
    
    

}

function difficultyLevel(){
    if(score >= 1000){
        constructionLevel += 1;
        meteoriteSpeed = 1.2;
        score = 0;
    }

    if (constructionLevel >= 2){
        meteoriteSpeed = 1.5;
    }


    if (constructionLevel >=3){
        meteoriteInterval = 120;
    }

    if(constructionLevel >=4){
        meteoriteInterval = 90;
        meteoriteSpeed = 2;
    }

    if(constructionLevel >= 5){
        console.log("You won!")
    }
}

const restartButton = document.getElementById("restart");

function gameOver(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width/2, 50);

    
    restartButton.style.display = "block";
}

function restartGame(){
    restartButton.style.display = "none";
    location.reload()

}

function drawBase(){

    ctx2.drawImage(baseBackground, 0,0,550, rocketCanvas.height);

    

    ctx2.drawImage(launchBase,50,200,150,150);

    ctx2.drawImage(baseHangar,160,180,150,150);
    
    ctx2.drawImage(baseDish,-50,130,200,200);

    if(constructionLevel >= 1){
        ctx2.drawImage(rocketOne,75,230,100,100)
    };

    if(constructionLevel >= 2){
    ctx2.drawImage(rocketFins,75,210,100,100)
    };

    if(constructionLevel >= 3){
    ctx2.drawImage(rocketFuel,75,200,100,100)};

    
    if(constructionLevel >= 4){
    ctx2.drawImage(rocketSides,75,195,100,100)};


    if(constructionLevel >= 5){
    ctx2.drawImage(rocketTop,75,180,100,100)};
    
};








