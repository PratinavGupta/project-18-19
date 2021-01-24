var monkey, survivaltime, bananagroup, stonegroup;
var groundImg, banana, bananaImg, stone, stoneImg, backgroundImg;
var monkeyImg;

function preload() {
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  backgroundImg = loadImage("jungle.jpg");
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
}

function setup() {
  createCanvas(800, 400);

  monkey = createSprite(100, 320);
  monkey.addAnimation("running", monkeyImg);
  monkey.scale = 0.15;
  ground = createSprite(400, 390, 800, 10);
  ground.visible = false;

  bananagroup = createGroup();
  stonegroup = createGroup();
}


function draw() {
  background(backgroundImg);

  monkey.collide(ground);
  monkey.velocityY = 8;

  survivaltime = 0;
  survivaltime = Math.round(World.frameCount / 4);
  textSize(20);
  fill("white");
  text("survival Time = " + survivaltime, 620, 50);

  if (World.frameCount % 80 === 0) {
    var banana = createSprite(810, 300);
    banana.velocityX = -4;
    banana.addImage("Banana", bananaImg);
    banana.scale = 0.05;
    bananagroup.add(banana);
    bananagroup.setLifetimeEach(900);
  }

  if (bananagroup.isTouching(monkey)) {
    bananagroup.destroyEach();
    monkey.scale = 0.2;
  }

  if (keyDown(UP_ARROW) && monkey.y > 320)
    monkey.y = 100;

  if (World.frameCount % 300 === 0) {
    var stone = createSprite(810, 370);
    stone.velocityX = -4;
    stone.addImage("stone", stoneImg);
    stone.scale = 0.15;
    stonegroup.add(stone);
    stonegroup.setLifetimeEach(200);
  }

  if (stonegroup.isTouching(monkey)) {
    stonegroup.destroyEach();
    monkey.scale = 0.15;
  }

  drawSprites();
}