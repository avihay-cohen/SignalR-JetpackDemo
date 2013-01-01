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

        game.addOtherPlayer = function (name) {
            var character = new Character(name, false);
            character.load(game, stage);

            stage.addChild(character.bear);
            stage.addChild(character.nameLabel);

            return character;
        };

        // mouse event
        game.rootScene.on('touchstart', function (evt) {
            console.log('click at ' + evt.localX + ' , ' + evt.localY);
            
        });

        game.addPlayer = function (name) {
            var character = new Character(name, true);
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

            return character;
        };

        game.onload = function () {

            var customMap = new CustomMap(16, 16);
            customMap.load(game);
            map = customMap.map;

            stage = new Group();

            stage.addChild(map);

            game.rootScene.addChild(stage);
            game.rootScene.backgroundColor = 'rgb(182, 255, 255)';
        };

        game.start();


    };   
}




