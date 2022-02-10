const Game = new Phaser.Game(1600, 1000, Phaser.AUTO, 'GameCanvas', {preload,  create, update })

let ninjaSpeed=3;
let weaponSpeed=ninjaSpeed;
let timerEvent;
let br=0;
let weapons=[];

function preload(){
    Game.load.spritesheet("you_won", "you_won.png", 2070/3,270);
    Game.load.spritesheet("game_over", "game_over.png", 1110/3,300);
    Game.load.spritesheet("ninja", "ninja_walk.png", 264/4,300/4);
    Game.load.spritesheet("shuriken", "shuriken.png", 120/4, 25);
    Game.load.image("weapon", "weapon.png");
}

function create(){
    Game.stage.backgroundColor="00EEEE";
    ninja1=Game.add.sprite(Game.width/2, 0, "ninja");
    ninja1.frame=0;
   weapon=Game.add.sprite(55555, 50, "weapon");

    num_of_rows=Game.height/(ninja1.height+weapon.height);
    for(let i=0; i<num_of_rows; i++){
    row = Game.add.graphics(0,0);
    row.beginFill(0x66FCFC);
    row.drawRect(0,(Game.height/num_of_rows)*2*i , Game.width, Game.height/num_of_rows);
    }

   text_final = Game.add.text(Game.width / 2, 0, "FINAL", {font: "90px Times New Roman", fill: "#ffffff"})
    text_final.x=(Game.width-text_final.width)/2

    ninja=Game.add.sprite((Game.width-ninja1.height)/2, Game.height-ninja1.height, "ninja");
    ninja.frame=0;
    ninja.animations.add("walk_forewords", [0,1,2,3], 8, true);
    ninja.animations.add("walk_left", [4,5,6,7], 8, true);
    ninja.animations.add("walk_right", [8,9,10,11], 8, true);
    ninja.animations.add("walk_backwords", [13,14,15,12], 8, true);
    
    Game.physics.startSystem(Phaser.Physics.ARCADE);
    Game.physics.enable(ninja, Phaser.Physics.ARCADE);
   
    keyUp = Game.input.keyboard.addKey(Phaser.Keyboard.UP);
    keyDown = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    keyRight=Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyLeft=Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyA = Game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyD = Game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyW = Game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyS = Game.input.keyboard.addKey(Phaser.Keyboard.S);

    timerEvent=Game.time.events.add(Phaser.Timer.SECOND * 2.3, shoot, this);
    timerEvent.loop=true;
  

}

function update(){
    if(br>0){ 
        checkWeaponPosition();
        changeWeaponPosition();
        checkCol();
        }
    updatePosition();
    checkForWin();
}

function checkForWin(){
    if(ninja.y+ninja.height<=Game.height/num_of_rows){
        ninja.y=Game.height
        ninja.destroy()
        timerEvent.loop=false;  
       you_won = Game.add.button(Game.width/2, Game.height/2, 'you_won', actionOnClickWin, this, 1,0,2);
    }

}

function actionOnClickWin(){
    create()
    you_won.destroy();
}

function checkCol(){
    for(i=0; i<weapons.length;i++){
    if(Game.physics.arcade.collide(ninja ,weapons[i])==true){
    ninja.destroy()

    timerEvent.loop=false;  
    game_over = Game.add.button(Game.width/2, Game.height/2, 'game_over', actionOnClick, this, 1,0,2);

    }
}}

function actionOnClick(){
  create()
    game_over.destroy();
}

function checkWeaponPosition(){
    for(let i=0; i<weapons.length;i++){
        if(weapons[i].x>Game.width){weapons.splice(i,1);
        br--;}
   }
}

function changeWeaponPosition(){
    for(let i=0; i<weapons.length;i++){
         weapons[i].x+=weaponSpeed;
    }
   
}

function shoot(){
    for( i=1; i<num_of_rows-1; i++ ){
    weapon=Game.add.sprite(-5557, 50, "weapon");
    weapon.x=0-weapon.width-Math.floor(Math.random() * 10)*weapon.width
    weapon.y=i*(ninja.height+weapon.height)+ninja.height/2
    Game.physics.enable(weapon, Phaser.Physics.ARCADE);
    weapons[br]=weapon;
    br++;
}}

function updatePosition(){
    if(keyUp.isDown||keyW.isDown){

        if(ninja.y<=0){ninja.y=0;}
        
        else{
        ninja.y -= ninjaSpeed;
        ninja.animations.play("walk_backwords");
    }
    }
    
    if(keyDown.isDown||keyS.isDown){
        if(ninja.y>=Game.height-ninja.height){ninja.y=Game.height-ninja.height;
        }
        else{
       ninja.y +=ninjaSpeed;
       ninja.animations.play("walk_forewords");
    }
    }

    if(keyLeft.isDown||keyA.isDown){

        if(ninja.x<=0){ninja.x=0;}
        
        else 
        {
            ninja.animations.play("walk_left");
        ninja.x -= ninjaSpeed;
    }
    }
    
    if(keyRight.isDown||keyD.isDown){
        if(ninja.x>=Game.width-ninja.width){ninja.x=Game.width-ninja.width;
        }
        else{
       ninja.x +=ninjaSpeed;
       ninja.animations.play("walk_right");
    }
    }

    if((!((keyD.isDown||keyRight.isDown)||(keyUp.isDown||keyW.isDown)||(keyLeft.isDown||keyA.isDown)||(keyDown.isDown||keyS.isDown)))||((keyDown.isDown||keyS.isDown)&&(keyUp.isDown||keyW.isDown))||((keyLeft.isDown||keyA.isDown)&&(keyRight.isDown||keyD.isDown))){
        ninja.frame=12;
    }

}