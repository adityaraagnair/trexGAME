var trex ,trex_running;
var cloneGround
var ground, groundImage
var ob1, ob2, ob3, ob4, ob5, ob6
var gameState=1//1 game state(play) 0 game state(dead)
var cacGroup
var cloudGroup
var deadTrex
var gameOver
var restart
var gameOverImg
var restartImg
var score=0
var die,alive,success
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")  
deadTrex=loadAnimation("trex_collided.png")
groundImage=loadImage("ground2.png")
ccloud=loadImage("cloud.png")
ob1=loadImage("obstacle1.png")
ob2=loadImage("obstacle2.png")
ob3=loadImage("obstacle3.png")
ob4=loadImage("obstacle4.png")
ob5=loadImage("obstacle5.png")
ob6=loadImage("obstacle6.png")
gameOverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png")
die=loadSound("die.mp3")
succes=loadSound("checkPoint.mp3")
alive=loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 var r=Math.round(random(0,43))
 console.log(r)
 console.log("hello"+2345678)
 console.log("hello"+r)
 trex=createSprite(150,150,50,50)
 trex.addAnimation("run",trex_running)
 trex.addAnimation("stahp",deadTrex)
 trex.scale=.5
 ground = createSprite(300,180,600,3.5)
ground.addImage(groundImage)
ground.velocityX=-10
cloneGround=createSprite(300,190,600,3.5)
cloneGround.visible=false
cacGroup=createGroup()
cloudGroup=createGroup() //another command for creating group=new Group()
//trex.debug=true
trex.setCollider("circle",0,0,34)
gameOver=createSprite(300,132,50,50)
restart=createSprite(300,50,50,50)
gameOver.addImage(gameOverImg)
restart.addImage(restartImg)
gameOver.scale=.5
restart.scale=.5
gameOver.visible=false
restart.visible=false
}
function draw(){
  background("yellow")
  drawSprites()
  textFont("comic sans ms")
  textSize(22.8776546)
  text("Score :"+score,107,20)
  if(gameState===1){
    createCac()
    ground.velocityX=-(3*10+score/100)
    score=score+Math.round(getFrameRate()/60)
    if (ground.x<0){
      ground.x=500
    }
    if (keyDown("Space")&&trex.y>132){
      trex.velocityY=-10  
      alive.play()
    }
    trex.velocityY=trex.velocityY+.8 
    createCloud()
    if(trex.isTouching(cacGroup)){
      gameState=0
      die.play()
    }


    
  }
  else if(gameState===0){
    restart.visible=true
    gameOver.visible=true
    ground.velocityX=0
    trex.velocityY=0
    cloudGroup.setVelocityXEach(0)
    cacGroup.setVelocityXEach(0)
    cacGroup.setLifetimeEach(-9)
    cloudGroup.setLifetimeEach(-87)
    trex.changeAnimation("stahp",deadTrex)
    if(mousePressedOver(restart)){
      reset()
    }
  }


 

    
  
trex.collide (cloneGround)

//console.log(trex.y)
  }
  function createCloud(){
  if (frameCount%60===0){
   var cloud=createSprite(600,100, 30,10)
   cloud.velocityX=-8
   cloud.y=Math.round(random(0,67))
   cloud.addImage(ccloud)
   cloud.scale=.89
   console.log(trex.depth)
   console.log(cloud.depth)
   trex.depth=cloud.depth
   trex.depth+=1
   cloudGroup.add(cloud)
   cloud.lifetime=75

  }

}
function createCac(){
  if (frameCount%123===0){
var cac=createSprite(665,168,100,75)
cac.scale=.5
cac.velocityX=-(10+score/100)
cacGroup.add(cac)
var choice=Math.round(random(1,6))
switch(choice){
case 1:cac.addImage(ob1);break;
case 2:cac.addImage(ob2);break;
case 3:cac.addImage(ob3);break;
case 4:cac.addImage(ob4);break;
case 5:cac.addImage(ob5);break;
case 6:cac.addImage(ob6);break;
  }
  cac.lifetime=200
}
}
function reset(){
 gameState=1
 cacGroup.destroyEach()
 cloudGroup.destroyEach()
  trex.changeAnimation("run",trex_running)
score=0
restart.visible=false
gameOver.visible=false







}