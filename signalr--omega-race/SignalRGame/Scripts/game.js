function startGame() {
    enchant();

    enchant.Sound.enabledInMobileSafari = true;

    // Important check!!!!
    if (location.protocol == 'file:') {
        enchant.ENV.USE_WEBAUDIO = false;
        console.log('1');
    }

    window.onload = function () {

        game = new Game(320, 320);
        game.fps = 30;
        game.scale = 1;
        game.preload('../Images/chara1.gif', '../Images/map2.gif', '../Sounds/jump.wav', '../Sounds/gameover.wav');

        game.addPlayer = function (name) {
            console.log('adding player to game...');

            var character = new Character(name);
            character.load(game, stage);

            stage.addChild(character.bear);
            stage.addChild(character.nameLabel);

            console.log('player added');
        };

        game.onload = function () {

            var customMap = new CustomMap(16, 16);
            customMap.load(game);
            map = customMap.map;

            stage = new Group();

            stage.addChild(map);

            //            stage.addEventListener('enterframe', function (e) {
            //                // Scrolling
            //                if (this.x > 64 - character.bear.x) {
            //                    this.x = 64 - character.bear.x;
            //                } else if (this.x < 64 - character.bear.x) {
            //                    this.x = 64 - character.bear.x;
            //                }
            //            });

            game.rootScene.addChild(stage);
            game.rootScene.backgroundColor = 'rgb(182, 255, 255)';
        };

        game.start();

       
    };   
}




