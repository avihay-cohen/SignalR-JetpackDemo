// Global vars
var game;
var customMap;
var map;
var stage;

function startGame() {
    enchant();

    enchant.Sound.enabledInMobileSafari = true;

    if (location.protocol == 'file:') {
        enchant.ENV.USE_WEBAUDIO = false;
    }

    enchant.ENV.KEY_BIND_TABLE = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'a', // SPACE
        17: 'b'  // CONTROL
    };

    enchant.ENV.PREVENT_DEFAULT_KEY_CODES = [37, 38, 39, 40, 32];

    window.onload = function () {

        game = new Game(640, 320);
        game.fps = 30;
        game.scale = 1;
        game.preload('../Images/icon0.png', '../Images/chara1.gif', '../Images/map2.gif', '../Sounds/jump.wav', '../Sounds/gameover.wav');

        game.addPlayer = function (name) {
            var character = new Character(name, true, game, stage, customMap.spawnpoint);

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

        game.addOtherPlayer = function (name) {
            var character = new Character(name, false, game, stage, customMap.spawnpoint);

            return character;
        };

        // mouse event
        game.rootScene.on('touchstart', function (evt) {
            if (!vm.editMode()) return;

            //            console.log('click at ' + evt.localX + ' , ' + evt.localY);
            //            console.log('scrolled (x) to ' + stage.x);
            var tileX = Math.floor((evt.localX - stage.x) / 16);        /* note that stage coords are inversed */
            var tileY = Math.floor((evt.localY - stage.y) / 16);
            customMap.setTile(tileX, tileY);

        });

        game.rootScene.on('abuttondown', function (evt) {
            var x = vm.currentPlayer().bear.x + 10 + (25 * vm.currentPlayer().bear.scaleX);
            var y = vm.currentPlayer().bear.y + 10;
            var bullet = new Bullet(x, y);
            stage.addChild(bullet.sprite);
        });

        game.rootScene.on('bbuttondown', function (evt) {
            // Bomb disabled for now
            //var bomba = new Bomb(vm.currentPlayer().bear.x, vm.currentPlayer().bear.y);
            //stage.addChild(bomba.sprite);
        });

        game.onload = function () {

            customMap = new CustomMap(16, 16);
            customMap.load(game);
            map = customMap.map;

            stage = new Group();

            stage.addChild(map);

            // Disabled for now
            //var bonus = new Bonus(200, 100);

            game.rootScene.addChild(stage);
            game.rootScene.backgroundColor = 'rgb(182, 255, 255)';
        };

        game.start();
    };   
}




