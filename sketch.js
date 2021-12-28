var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  invisibleBlockGroup = new Group();
  spookySound.loop();

}

function draw() {
  background(200);
  if(gameState==="play") {
  


  if(tower.y > 400){
      tower.y = 300
    }
  if (keyDown("right_arrow")) {
  ghost.x = ghost.x + 3;
  }
  if (keyDown("left_arrow")) {
    ghost.x = ghost.x - 3;
  }
  if (keyDown("space")) {
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(ghost.isTouching(climbersGroup)) {
  ghost.velocityY = 0;
  }
  if(ghost.isTouching(invisibleBlockGroup)|| ghost.y>600) {
  ghost.destroy;
  gameState = "end";

  }


  spawnDoors();

  drawSprites();
}
if(gameState === "end") {
fill("blue");
stroke("red");
textSize(30);
text("Game Over!!!",230,250)
}
}

function spawnDoors() {
if (frameCount% 240 === 0) {
  door = createSprite(200,-50)
  door.addImage("door",doorImg);
  door.x = Math.round(random(120,400))
  door.velocityY = 1;
  door.lifetime = 600;
  doorsGroup.add(door);

  climber = createSprite(200,10)
  climber.addImage("climber",climberImg);
  climber.x = door.x
  climber.velocityY = 1;
  climber.lifetime = 600;
  climbersGroup.add(climber);

  ghost.depth = door.depth;
  ghost.depth += 1;

  invisibleBlock = createSprite(200,15,climber.width,2)
 invisibleBlock.x = door.x
  invisibleBlock.velocityY = 1;
  invisibleBlock.lifetime = 600;
  invisibleBlock.debug = true;
  invisibleBlockGroup.add(invisibleBlock);
}

}