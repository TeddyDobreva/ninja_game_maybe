const Game = new Phaser.Game(900, 700, Phaser.AUTO, 'GameCanvas', {preload,  create, update, test })

let ninjaSpeed=3;
let weaponSpeed=ninjaSpeed+2;
let timerEvent;
let br=0;
max=4;
let weapons_row1=[max];


function preload(){
    Game.load.spritesheet("ninja", "ninja_walk.png", 264/4,300/4);
    Game.load.spritesheet("shuriken", "shuriken.png", 120/4, 25);
    Game.load.image("weapon", "weapon.png");
}

function create(){
    Game.stage.backgroundColor="00EEEE";
    ninja=Game.add.sprite(Game.width/2, Game.height/2, "ninja");
    ninja.frame=0;

    ninja.animations.add("walk_forewords", [0,1,2,3], 8, true);
    ninja.animations.add("walk_left", [4,5,6,7], 8, true);
    ninja.animations.add("walk_right", [8,9,10,11], 8, true);
    ninja.animations.add("walk_backwords", [13,14,15,12], 8, true);

    keyUp = Game.input.keyboard.addKey(Phaser.Keyboard.UP);
    keyDown = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    keyRight=Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyLeft=Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyA = Game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyD = Game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyW = Game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyS = Game.input.keyboard.addKey(Phaser.Keyboard.S);

    timerEvent=Game.time.events.add(Phaser.Timer.SECOND * 2, shoot, this);
    timerEvent.loop=true;
}

function update(){
    if(br>0){ checkWeaponPosition();
         changeWeaponPosition();}
updatePosition();
}

function checkWeaponPosition(){
    for(let i=0; i<weapons_row1.length;i++){
        if(weapons_row1[i].x>Game.width){weapons_row1.splice(i,1);
        br--;}
   }
}

function changeWeaponPosition(){
    for(let i=0; i<weapons_row1.length;i++){
         weapons_row1[i].x+=3;
    }
   
}

function shoot(){
    weapon=Game.add.sprite(-5557, 100, "weapon");
    weapon.x=0-weapon.width
    weapons_row1[br]=weapon;
    br++;
}

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
function test(){
console.log("walk_left");
}