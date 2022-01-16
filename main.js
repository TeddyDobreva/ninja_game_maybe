const Game = new Phaser.Game(1650, 900, Phaser.AUTO, 'GameCanvas', {preload,  create, update })
let player
let velocity = 10

function preload() {
    Game.load.spritesheet("dude","dude-green.288x40.9x1.png", 288 / 9, 40 /1)
}

function create() {
    Game.stage.backgroundColor = '#96C3EB'

    player = Game.add.sprite(Game.width / 2, Game.height / 2, "dude")
    player.frame = 4
    player.animations.add("walkLeft", [0, 1, 2, 3], 5, true)
    player.animations.add("stay", [4], 1, false)
    player.animations.add("walkRight", [5,6,7,8], 5, true)
    
    
    keyA = Game.input.keyboard.addKey(Phaser.Keyboard.A)
    keyD = Game.input.keyboard.addKey(Phaser.Keyboard.D)
    keyW = Game.input.keyboard.addKey(Phaser.Keyboard.W)
    keyS = Game.input.keyboard.addKey(Phaser.Keyboard.S)

}

function update() {
    if(keyA.isDown) {
        console.log("Key A IS PRESSED")
        player.x -= velocity
        player.animations.play("walkLeft")
    }
    if(keyD.isDown) {
     player.x += velocity
     player.animations.play("walkRight")
    }
    if((!keyA.isDown && !keyD.isDown) || (keyA.isDown && keyD.isDown)) {
        player.animations.play("stay")
    }
    if(keyW.isDown) {
        console.log("Key W IS PRESSED")
        player.y -= velocity
        player.animations.play("walkUp")
    }
    if(keyS.isDown) {
        console.log("Key S IS PRESSED")
        player.y += velocity
        player.animations.play("walkDown")
    }
}