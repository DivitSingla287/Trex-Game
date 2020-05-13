var PLAY=1;
var END=0;
var gameState=PLAY;

var trex,trex_running,trex_collided,ground,ground_Image,invisibleground,cloud,cloud_Image,restart,restart_Image,gameOver,gameOver_Image,obstacles,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,count;

function preload(){
  
  ground_Image = loadImage("ground2.png");
  
  trex_running =  loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  cloud_Image = loadImage("cloud.png");
  
  gameOver_Image = loadImage("gameOver.png");
  
  restart_Image = loadImage("restart.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

}  
  
function setup() {
  
  createCanvas(600,200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
                    
   ground = createSprite(200,180,400,20);
   ground.addImage("ground",ground_Image);
   ground.velocityX=-2;
  
  invisibleground = createSprite(200,190,400,10);
  invisibleground.visible=false;
  
  gameOver = createSprite(200,100,50,50);
  gameOver.addImage("gameOver",gameOver_Image);
  gameOver.visible=false;
  gameOver.scale=0.5;
  
  restart = createSprite(200,120,50,50);
  restart.addImage("restart",restart_Image);
  restart.visible=false;
  restart.scale=0.5;
 
  count =0;
  
  Cloudsgroup = new Group();
  Obstaclesgroup = new Group();

  textSize(18);

  textFont("Georgia");

  textStyle(BOLD);
}

function draw() {
  background(180);
 //console.log(count);
  text("Score: "+ count, 450, 20);
  
  if(gameState===PLAY){
 
    if(keyDown("space") && (trex.y>=161)){
    trex.velocityY=-10;
  
  }
     ground.velocityX = -(6 + 3*count/100);
  //console.log(trex.y);
  trex.velocityY=trex.velocityY+0.8;
  
  //console.log(trex.y);
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    
    count = count+ Math.round(getFrameRate()/40);
    
    spawnClouds();
   spawnObstacles();
   
    if(Obstaclesgroup.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velocity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    Obstaclesgroup.setVelocityXEach(0);
    Cloudsgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    Obstaclesgroup.setLifetimeEach(-1);
    Cloudsgroup.setLifetimeEach(-1);
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  trex.collide(invisibleground);
 
drawSprites();
}
 
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  Obstaclesgroup.destroyEach();
  Cloudsgroup.destroyEach();
  
  trex.changeAnimation("trex_running",trex_running);
  
  count = 0;
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloud_Image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    Cloudsgroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    Obstaclesgroup.add(obstacle);
  }
}

