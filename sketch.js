var James, James_Stand1, James_Running1, James_Running2, James_Running3, James_Running4;
var James_Running5, James_Running6, James_Punch1, James_Punch2, James_Punch3, James_Punch4;
var James_Punch5, SideCharacter1, SideCharacter2;

var Gamestate = "start";
var score = 0;
var villainrunning, fireball;
var Level;
var answercheck = "  ";

function preload(){
  City = loadImage("MC Images/City.jpg");
  James_Stand1 = loadImage("MC Images/CharacterStand1.png");

  
  //loadImage("MC Images/SideCharacter.png", "MC Images/SideCharacter2.png");

  James_running = loadAnimation("MC Images/CharacterRun1.png", "MC Images/CharacterRun2.png", "MC Images/CharacterRun3.png","MC Images/CharacterRun4.png", 
  "MC Images/CharacterRun5.png", "MC Images/CharacterRun6.png");
  
  James_punching = loadAnimation("MC Images/CharacterPunch1.png", "MC Images/CharacterPunch2.png", "MC Images/CharacterPunch3.png", 
  "MC Images/CharacterPunch4.png","MC Images/CharacterPunch5.png");

  villainrunning = loadAnimation("Enemy Images/Enemy1Walk1 copy 2.png", "Enemy Images/Enemy1Walk2.png")
  fireball = loadImage("Enemy Images/Fireball.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  Level = 1;

  Background = createSprite(windowWidth/2, windowHeight/2);
  Background.addImage("City",City);
  Background.scale = 1.35;

  Ground = createSprite(windowWidth/2, windowHeight-35, windowWidth,10);
  Ground.visible = false;

  James = createSprite(295,windowHeight-300,10,40);
  James.addImage("James_Stand1", James_Stand1);
  James.addAnimation("James_running",James_running);
  James.addAnimation("James_punching",James_punching);



  ObjectGroup = new Group();
  Villain1Group = new Group();
}

function draw() {
  background(255,255,255);  
  if (Level > 3){
    Gamestate = "Gameover";
  }
  //end;
  if(Gamestate === "Gameover"){
    playSpeech("Congratulations! You won the game.", "female", "English");
  }
  
  if(frameCount === 1200 && Gamestate === "Play"){
    Quiz();
    //score move to next level
    if(answercheck === "correct"){
      text("That's correct!", 300, windowHeight/2);
    }
     else if(answercheck === "wrong"){
      text("That's wrong!", 300, windowHeight/2);
    }
    Level++;
  }

if(Level === 1){
  Levelup1(Level);
}
}

function spawnObject() {
  //write code here to spawn the object
  if (frameCount % 220 === 0) {
    var object = createSprite(windowWidth,windowHeight-100,40,10);
    object.y = Math.round(random(windowHeight-80,windowHeight-100));
    object.addImage("fireball", fireball);
    //villain1.scale = 0.5;
    object.velocityX = -3;
    
     //assign lifetime to the variable
     object.lifetime = windowWidth/3;
    
     
    //add each cloud to the group
    ObjectGroup.add(object);
  }
}

function spawnVillain1() {

  //write code here to spawn the villain
  if (frameCount % 220 === 0) {
    var villain1 = createSprite(windowWidth,windowHeight-40,50,50);
    villain1.y = Math.round(random(windowHeight-70,windowHeight-50));
    villain1.addAnimation("villainrunning", villainrunning);
    villain1.scale = 0.5;
    villain1.velocityX = -2;
    
     //assign lifetime to the variable
    villain1.lifetime = windowWidth/2;
    
     
    //add each cloud to the group
    Villain1Group.add(villain1);
  }
}

function spawnVillain() {

  //write code here to spawn the villain
  if (frameCount % 220 === 0) {
    var villain1 = createSprite(windowWidth,windowHeight-40,50,50);
    villain1.y = Math.round(random(windowHeight-70,windowHeight-50));
    villain1.addAnimation("villainrunning", villainrunning);
    villain1.scale = 0.5;
    villain1.velocityX = -2;
    
     //assign lifetime to the variable
    villain1.lifetime = windowWidth/2;
    
     
    //add each cloud to the group
    Villain1Group.add(villain1);
  }
  
}
function Quiz(){
  question(Level);
  var QuestionBank = createElement('h2');
  QuestionBank.html(Ask);
  QuestionBank.position(windowWidth/2,windowHeight/2-100);
  
  var Answer1 = createButton(Answer[0]);
  Answer1.position(windowWidth/2, windowHeight/2);
  Answer1.mousePressed(function(){
    //create a switch variable, populate it with correct and wrong
    if(Answer[0]=== CorrectAnswer){
      answercheck = "correct";
      score+= 80;
    }
    else{
      answercheck = "wrong" 
      score-=20;
    }
  })
  
  var Answer2 = createButton(Answer[1]);
  Answer2.position(windowWidth/2, windowHeight/2+100);
  Answer2.mousePressed(function(){
    if(Answer[1]=== CorrectAnswer){
      answercheck = "correct";
      score+= 80;
    }
    else{
      answercheck = "wrong" 
      score-=20;
    }
  })

  var Answer3 = createButton(Answer[2]);
  Answer3.position(windowWidth/2, windowHeight/2+200);
  Answer3.mousePressed(function(){
    if(Answer[2]=== CorrectAnswer){
      answercheck = "correct" 
      score+= 80;
    }
    else{
      answercheck = "wrong" 
      score-=20;
    }
  })
 

}

function question(L){
  switch(L){
    case 1: 
    Ask = "What is your name?"
    Answer = ["A","Anjika","B"];
    CorrectAnswer = "Anjika";
    break;
    case 2:
    Ask = "What is your age?"
    Answer = ["10","15","13"];
    CorrectAnswer = "13";
    break;
    case 3:
    Ask = "How are you"
    Answer = ["Good","Bad","Ok"];
    CorrectAnswer = "Good";
    break;
  }
}

function Levelup1(){
  if(Gamestate === "start" && keyDown("P")){
    Gamestate = "Play";
  
  }
  
  if(Gamestate === "Play"){
    James.changeAnimation("James_running",James_running);
  
    Background.velocityX = -2
    if(Background.x<350){
      Background.x = windowWidth/2;
    }
  
    if(keyDown((UP_ARROW)|| touches.length>0) && James.y>windowHeight-100){
      James.velocityY = -17;
      touches = []
    }
    James.velocityY= James.velocityY+0.8;
  
    if(James.isTouching(ObjectGroup)){
     // Gamestate = "End";
     James.velocityY = -17;
    }
   //individually destroy the villan
    for(var i=0; i< Villain1Group.length;i++){
      if(James.isTouching(Villain1Group.get(i))){
        James.changeAnimation("James_punching",James_punching);
        score+=50;
        Villain1Group.get(i).destroy();
  
       }
  
   }
    spawnObject();
    spawnVillain1();
  }
  James.collide(Ground);
  drawSprites();
  
  if(Gamestate === "start"){
    textSize(30);
  textFont("Comic Sans")
  fill("black")
    text("Press 'P' to begin the game!", windowWidth/2-50, windowHeight/2);
  }
  
  if(Gamestate === "End"){
    Background.velocityX = 0;
    //changeimage
    ObjectGroup.setVelocityXEach(0);
    ObjectGroup.setLifetimeEach(-1);
    Villain1Group.setVelocityXEach(0);
    Villain1Group.setLifetimeEach(-1);
    textSize(30);
    textFont("Comic Sans");
    fill("Brown");
    text("Press 'R' to restart the level!", 150,200);
    score = 0;
    James.velocityY = 0;
    James.changeImage("James_Stand1", James_Stand1)
  }
 
  if(keyDown("R")&& Gamestate === "End"){
    Gamestate = "Play";
    
    ObjectGroup.destroyEach();
    Villain1Group.destroyEach();
  }

  textSize(30);
  textFont("Comic Sans")
  fill("black")
  text("Score: " + score, 100, windowWidth - 500);  
    }
  
