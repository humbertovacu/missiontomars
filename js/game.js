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
                    if(this.x >=700){this.x=700;}
                        break;
                    
                case 40:
                    this.y += 30;
                    if(this.y >=700){this.y=700;}
                        break;
            }
        }

    }

    update(){
        this.draw();
        this.move();
    }

}

function startGame() {

    let instructionsContainer = document.getElementById("instructions");
    let missionControlContainer = document.getElementById("game-results");
    let gameCanvas = document.getElementById("canvas");
    let startMenu = document.getElementById("menu-container");
    let startScore = document.getElementById("score");
    instructionsContainer.style.display = "none";
    missionControlContainer.style.display = "block";
    startMenu.style.display = "none";
    gameCanvas.style.display = "block";
    startScore.style.display = "block";
    mainGameTrack.play();

    updateCanvas();

}

function scoreDisplay(){

    let totalBudgetDisplay = document.querySelector("span");
    totalBudgetDisplay.innerHTML = score * 1000;
    
}



const astroTest = new majorTom;


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
}


if(meteoriteFrequency % iridiumInterval === 0){
        gameIridium.push(new Iridium);
    }
for (let i = 0; i < gameIridium.length; i++){
    gameIridium[i].update();
   

    if(detectCollisionIridium(gameIridium[i],gameIridium[i].x,gameIridium[i].y)==="collect"){
        gameIridium.splice(i,1);
        score += 100;
        iridiumCapture.play();
        
        
    }
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
        rocketPart.play();
        meteoriteSpeed = 1.5;
        score = 0;
    }

    if (constructionLevel >= 2){
        meteoriteSpeed = 2;
        meteoriteInterval = 120;
    }


    if (constructionLevel >=3){
        meteoriteInterval = 90;
    }

    if(constructionLevel >=4){
        meteoriteInterval = 60;
        meteoriteSpeed = 2.5;
    }

    if(constructionLevel >= 5){
        gameStatus = "over";
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Prepare for countdown!", canvas.width/2, 50);
        setTimeout(missionComplete(),5000);
    }
}

const restartButton = document.getElementById("restart");

function gameOver(){
    mainGameTrack.pause();
    failedMissionAudio.play();
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

function missionComplete(){

    const gameWonImg = document.getElementById("won-game");
    mainGameTrack.pause(); 
    missionCompleteMusic.play();   
    canvas.style.display = "none";
    gameWonImg.style.display = "block";
    restartButton.style.display = "block";

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

