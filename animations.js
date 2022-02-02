const Game = new Phaser.Game(1500, 700, Phaser.AUTO, 'GameCanvas', {preload,  create, update })

ninjaSpeed=3

function preload(){
    Game.load.spritesheet("ninja", "ninja_walk.png", 264/4,300/4)
    Game.load.spritesheet("shuriken", "shuriken.png", 120/4, 25)
}

function create(){
    Game.stage.backgroundColor="00EEEE"
    shuriken=Game.add.sprite(0, 0, "shuriken")
    ninja=Game.add.sprite(Game.width/2, Game.height/2, "ninja")
    ninja.frame=0

    ninja.animations.add("walk_forewords", [0,1,2,3], 8, true)
    ninja.animations.add("walk_left", [4,5,6,7], 8, true)
    ninja.animations.add("walk_right", [8,9,10,11], 8, true)
    ninja.animations.add("walk_backwords", [13,14,15,12], 8, true)
    shuriken.animations.add("rotate", [], 15, true).play()

    keyUp = Game.input.keyboard.addKey(Phaser.Keyboard.UP)
    keyDown = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    keyRight=Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    keyLeft=Game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    keyA = Game.input.keyboard.addKey(Phaser.Keyboard.A)
    keyD = Game.input.keyboard.addKey(Phaser.Keyboard.D)
    keyW = Game.input.keyboard.addKey(Phaser.Keyboard.W)
    keyS = Game.input.keyboard.addKey(Phaser.Keyboard.S)
}

function update(){
shuriken.x+=5
updatePosition()
}

function updatePosition(){
    if(keyUp.isDown||keyW.isDown){

        if(ninja.y<=0){ninja.y=0}
        
        else{
        ninja.y -= ninjaSpeed
        ninja.animations.play("walk_backwords")
    }
    }
    
    if(keyDown.isDown||keyS.isDown){
        if(ninja.y>=Game.height-ninja.height){ninja.y=Game.height-ninja.height
        }
        else{
       ninja.y +=ninjaSpeed
       ninja.animations.play("walk_forewords")
    }
    }

    if(keyLeft.isDown||keyA.isDown){

        if(ninja.x<=0){ninja.x=0}
        
        else 
        {
            ninja.animations.play("walk_left")
        ninja.x -= ninjaSpeed
    }
    }
    
    if(keyRight.isDown||keyD.isDown){
        if(ninja.x>=Game.width-ninja.width){ninja.x=Game.width-ninja.width
        }
        else{
       ninja.x +=ninjaSpeed
       ninja.animations.play("walk_right")
    }
    }

    if((!((keyD.isDown||keyRight.isDown)||(keyUp.isDown||keyW.isDown)||(keyLeft.isDown||keyA.isDown)||(keyDown.isDown||keyS.isDown)))||((keyDown.isDown||keyS.isDown)&&(keyUp.isDown||keyW.isDown))||((keyLeft.isDown||keyA.isDown)&&(keyRight.isDown||keyD.isDown))){
        ninja.frame=12
    }

}