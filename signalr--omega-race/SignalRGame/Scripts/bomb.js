﻿function Bomb(x, y) {
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
    return this;
}