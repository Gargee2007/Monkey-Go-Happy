var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground, invisibleGround

var PLAY=1;
var END=0;
var gameState=PLAY;

var survivalTime=0;

function preload(){

monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
createCanvas(400,400)

monkey=createSprite(80,315,20,20);
monkey.addAnimation("monkey", monkey_running);
monkey.scale=0.1;

ground=createSprite(400,350,900,10);
ground.velocityX= -4;
ground.x = ground.width/2;
console.log(ground.x);
  
invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;
  
score=0;
survivalTime=0;

FoodGroup=createGroup();
obstacleGroup=createGroup();


}


function draw() {
  background("lightblue")
  
  stroke("white");
  text(20);
  fill("black");
  text("Score= "+ score,300,80);
  
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime,100,50);
  //survivalTime=Math.ceil(frameCount/frameRate());
  
  
  
if(gameState===PLAY){
  obstacles();
  food();
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  ground.velocityX = -(4+score*1.5/100);

if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
if(keyDown("space")) {
        monkey.velocityY = -12;
    }  
monkey.velocityY = monkey.velocityY + 0.8;
  
if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  score=score+1;
}

  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
}
  
  if(gameState===END){
    
    survivalTime.visible=false;
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  stroke("black");
  textSize(30);
  fill("red");
  text("GAMEOVER!",110,200);
  stroke("black");
  textSize(20);
  fill("black");
  text("Press 'r' to restart", 120,220);
  
    if(keyDown("r")){
    gameState=PLAY;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    survivalTime=0;
    score=0;
    }
  }
  
  
monkey.collide(ground);

food();
obstacles();
drawSprites();
  
  
}

function food(){
  if(frameCount % 80 === 0){
  banana=createSprite(620,120, 50, 50);
  banana.addImage(bananaImage);
  banana.scale=0.1;  
  banana.velocityX=-3;
  banana.lifetime=220;
  
  FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
  obstacle=createSprite(250,326,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-3;
  obstacle.lifetime=220;
  
  obstacleGroup.add(obstacle);
  }
}







