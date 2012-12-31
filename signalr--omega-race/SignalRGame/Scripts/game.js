enchant();

enchant.Sound.enabledInMobileSafari = true;

// Important check!!!!
if(location.protocol == 'file:'){
    enchant.ENV.USE_WEBAUDIO = false;
    console.log('1');
}

window.onload = function () {    

    var game = new Game(320, 320);
    game.fps = 30;
    game.scale = 1;
    game.preload('../Images/chara1.gif', '../Images/map2.gif', '../Sounds/jump.wav', '../Sounds/gameover.wav');
    game.onload = function () {

        var customMap = new CustomMap(16, 16);
        customMap.load(game);
        map = customMap.map;
       
        var stage = new Group();

        stage.addChild(map);

        var character = new Character();
        character.load(game, stage);
        
        stage.addChild(character.bear);
        stage.addChild(character.nameLabel);

        stage.addEventListener('enterframe', function (e) {
            // Scrolling
            if (this.x > 64 - character.bear.x) {
                this.x = 64 - character.bear.x;
            } else if (this.x < 64 - character.bear.x) {
                this.x = 64 - character.bear.x;
            }
        });

        game.rootScene.addChild(stage);
        game.rootScene.backgroundColor = 'rgb(182, 255, 255)';
    };

    game.start();
};
