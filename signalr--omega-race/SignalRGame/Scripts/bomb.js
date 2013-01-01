function Bomb(x, y) {
    var self = this;
    self.sprite = new Sprite(16, 16);
    self.sprite.image = game.assets['../Images/icon0.png'];
    self.sprite.x = x;
    self.sprite.y = y;
    self.sprite.frame = 25;
    return this;
}

function Bullet(x, y) {
    var self = this;
    self.sprite = new Sprite(16, 16);
    self.sprite.image = game.assets['../Images/icon0.png'];
    self.sprite.x = x;
    self.sprite.y = y;
    self.sprite.tl.moveBy(500, 0, 40);
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
    self.sprite.addEventListener('enterframe', self.update);
       
    return this;
}