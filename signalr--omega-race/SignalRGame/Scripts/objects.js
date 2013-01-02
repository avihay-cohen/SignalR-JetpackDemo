function Bomb(x, y) {
    var self = this;
    self.sprite = new Sprite(16, 16);
    self.sprite.image = game.assets['../Images/icon0.png'];
    self.sprite.x = x;
    self.sprite.y = y;
    self.sprite.frame = 25;
    return this;
}

function Bullet(x, y, dir) {
    var self = this;
    self.sprite = new Sprite(16, 16);
    self.sprite.image = game.assets['../Images/icon0.png'];
    self.sprite.x = x;
    self.sprite.y = y;
    self.sprite.scaleX = -dir;
    self.sprite.frame = 62;
    self.destroy = function () {
        stage.removeChild(self.sprite);
        self.sprite.removeEventListener('enterframe', arguments.callee);
    };
    self.update = function (evt) {
        if (map.hitTest(self.sprite.x + 30, self.sprite.y + 2)) {
            self.destroy();
        }
    };
    self.sprite.on('enterframe', function () {
        if (vm && vm.currentPlayer()) {            
            if (self.sprite.intersect(vm.currentPlayer().bear)) {
                stage.removeChild(self.sprite);
                vm.currentPlayer().doDamage(20);
            }
        }
    });    
    self.sprite.tl.moveBy(500 * dir, 0, 40).then(function (e) { self.destroy(); });
    self.sprite.addEventListener('enterframe', self.update);
       
    return this;
}

function Bonus(x,y) {
    var self = this;
    self.sprite = new Sprite(16, 16);
    self.sprite.image = game.assets['../Images/icon0.png'];
    self.sprite.x = x;
    self.sprite.y = y;
    self.sprite.frame = 30;
    stage.addChild(self.sprite);

    self.sprite.on('enterframe', function () {
        if (vm.currentPlayer()) {
            if (self.sprite.intersect(vm.currentPlayer().bear)) {
                stage.removeChild(self.sprite);
                vm.currentPlayer().increaseScore(50);
            }
        }
    });
} 