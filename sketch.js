
//ma'am i have just // sound in line 56

var tower, towerimg;

var door, doorimg

var climber, climberimg;

var ghost, standing, jumping;

var block;

var sound;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload(){
  
  towerimg = loadImage("tower.png");
  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
  standing = loadAnimation("ghost-standing.png");
  jumping = loadAnimation("ghost-jumping.png");
  sound = loadSound("spooky.wav");
  
}

function setup(){
  
  createCanvas(597, 480);
  
  tower = createSprite(270, 200);
  tower.addImage("tower", towerimg);
  
  ghost = createSprite(250, 0);
  ghost.addAnimation("stand", standing);
  ghost.addAnimation("jump", jumping);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
  
}

function draw(){
  
  background(0);
  
  if(gameState === PLAY){
    
    //sound.loop();
    
    tower.velocityY = 2;
    tower.visible = true;
    
    ghost.visible = true;
    ghost.velocityY = 8;
    
    if(keyDown("space")){
      
      ghost.velocityY = -13;
      ghost.changeAnimation("jump", jumping);
      
    }
    
    if(keyDown("left_arrow")){
      
      ghost.x = ghost.x-5;
      
    }
    
    if(keyDown("right_arrow")){
      
      ghost.x = ghost.x+5;
      
    }
    
    
    if(tower.y>400){
      
      tower.y = 300;
      
    }
    
    if(climberGroup.isTouching(ghost)){
      
      ghost.velocityY = climber.velocityY - 1;
      ghost.changeAnimation("stand", standing);
      
    }
    
    if(blockGroup.isTouching(ghost) || ghost.y > 450){
      
      gameState = END;
      
    }
    
    spawnDoors();
    
  }
  
  else if(gameState === END){
    
    ghost.velocityY = 0;
    ghost.velocityX = 0;
    ghost.visible = false;
    
    tower.velocityY = 0;
    tower.visible = false;
    
    climberGroup.destroyEach();
    
    doorGroup.destroyEach();
    
    blockGroup.destroyEach();
    
    if(keyDown("r")){
      
      reset();
      
    }
    
    
    fill("white");
    textSize(50);
    text("Game Over", 170, 230);
    text("press R to restart", 110, 290);
    
  }
  
  drawSprites();
  
}

function spawnDoors(){
  
  if(frameCount % 300 === 0){
    
    door = createSprite(Math.round(random(60, 400)), -40);
    door.addImage("door", doorimg);
    door.velocityY = 2;
    door.lifetime = 700;
    
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    doorGroup.add(door);
    
    climber = createSprite(door.x, door.y + 50);
    climber.addImage("climber",climberimg);
    climber.velocityY = 2;
    climber.lifetime = 700;
    climberGroup.add(climber);
    
    block = createSprite(climber.x, climber.y + 18);
    block.visible = false;
    block.x = door.x;
    block.velocityY = 2;
    block.height = 1;
    
    block.lifetime = 700;
    
    blockGroup.add(block);
    
  }
  
}

function reset(){
  
  ghost.x = 250;
  ghost.y = 0;
  
  gameState = PLAY;
    
}