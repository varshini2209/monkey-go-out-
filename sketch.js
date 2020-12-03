                       
                  // MONKEY GO OUT 2

 
//creating varibles
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var jungle,jungleImage;
var restart;
var reset;
var SURVIVALTIME;

//preloading images

function preload(){
  
    monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")

    monkeyCollide = loadAnimation("monkey_1.png");

    groundImg = loadAnimation("ground.jpg") 

    bananaImage = loadImage("banana.png");
  
    obstacleImage = loadImage("obstacle.png");
  
    jungleImage=loadImage("jungle2.jpg");
      
    restartImage=loadImage("restart.png");
  
   
  
}

function setup(){
  //creating canvas
  createCanvas(600,300);
  
  //making survivaltime
   SURVIVALTIME =0
  
  //creating groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 //creating jungle sprite
 jungle=createSprite(300,100,600,600);
 jungle.addAnimation("jungle.jpg",jungleImage);
 jungle.scale=1;
  
 //creating monkey sprite
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
 //creating ground sprite
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  ground.addAnimation("ground", groundImg);
  ground.visible=false;
  
  //creating invisible ground
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false; 
  
  //creating restart
  restart = createSprite(300,150);
  restart.addImage(restartImage);
  restart.scale=1;
  
  
}

function draw(){
  
  background("skyblue");
  
 //to move ground
  jungle.velocityX=-3;
        
   if (jungle.x < 100) {
   jungle.x=jungle.width/2;
  }
  
  if (gameState === PLAY){
    obstacles();
    bananas();
     SURVIVALTIME = SURVIVALTIME + Math.round(frameCount/60);
    
    ground.velocityX = -(4+bananaScore*1.5/100);
  
    if(keyDown("space")) {
      monkey.velocityY = -13; 
    }
    monkey.velocityY=monkey.velocityY+0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
     switch(bananaScore){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }

    
    
    if (monkey.isTouching(obstacleGroup)){
      monkey.scale=0.2;
       gameState = END;
    }
    
 restart.visible=false;
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    jungle.velocityX=0;
    
    bananaScore.visible=false;

    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      bananaScore = 0;
      gameState = PLAY; 
    }
    restart.visible=true;
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  

  drawSprites(); 
  
 fill("black");
  text("SURVIVAL TIME: "+SURVIVALTIME, 470, 20);
  text("bananaScore: "+bananaScore,300,20);
  
  monkey.collide(invisiGround);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+bananaScore*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+bananaScore*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}


function reset(){
  gameState = PLAY;
 
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("monkey",monkey_running);
  
  if(localStorage["HighestScore"]<bananaScore){
    localStorage["HighestScore"] = bananaScore;
  }
  console.log(localStorage["HighestScore"]);
  
  bananaScore = 0;
  
}

                         //THE END...
