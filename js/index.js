window.onload = () => {
    document.getElementById('start-game').onclick = () => {
      gameStartSound.play();
      startGame();
    };
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); 
const rocketCanvas = document.getElementById("rocket-canvas");
const ctx2 = rocketCanvas.getContext('2d');
const mainGameTrack = new Audio;
mainGameTrack.src = "audio/main-game.mp3";
mainGameTrack.loop = true;
const iridiumCapture = new Audio;
iridiumCapture.src = "audio/iridium-capture.wav"
const rocketPart = new Audio;
rocketPart.src = "audio/rocket-part.wav"
const missionCompleteMusic = new Audio;
missionCompleteMusic.src = "audio/mission-complete.wav"
const failedMissionAudio = new Audio;
failedMissionAudio.src = "audio/failed-mission.wav"
const gameStartSound = new Audio;
gameStartSound.src = "audio/game-start.wav";
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
const astronaut = new Image;
astronaut.src = 'images/MajorTom.png';
const theMeteor = new Image;
theMeteor.src = "images/Meteor.png";
const iridium = new Image;
iridium.src = "images/Iridium.png";

let gameStatus = "not-over"
let gameMeteorites = [];
let gameIridium = [];
let iridiumSpeed = 0.40;
let meteoriteSpeed = 1;
let meteoriteFrequency = 0;
let meteoriteInterval = 180;
let iridiumInterval = 480;
let constructionLevel = 0;
let score = 0;













