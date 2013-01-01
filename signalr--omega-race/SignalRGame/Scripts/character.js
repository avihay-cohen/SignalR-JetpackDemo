function Character(name, inControl, game, stage, spawnpoint) {

    var self = this;
    self.name = ko.observable(name);
    self.nameFixed = name;
    self.score = ko.observable(0);
    self.inControl = inControl;
    self.skinIndex = 1;
    self.health = ko.observable(100);

    self.Rectangle = enchant.Class.create({
        initialize: function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        right: { get: function () { return this.x + this.width; } },
        bottom: { get: function () { return this.y + this.height; } }
    });


    self.spawnpoint = spawnpoint;
    self.game = game;
    self.stage = stage;
    self.bear = new Sprite(32, 32);

    self.bear.vx = 0;
    self.bear.vy = 0;
    self.bear.ax = 0;
    self.bear.ay = 0;
    self.bear.pose = 0;
    self.bear.jumping = true;
    self.bear.jumpBoost = 0;
    self.bear.image = game.assets['../Images/chara1.gif'];

    self.isLocal = ko.computed(function () {
        return self.nameFixed == vm.localPlayerName();
    });

    self.nameLabel = new Label(self.name());

    stage.addChild(self.bear);
    stage.addChild(self.nameLabel);

    self.increaseScore = function(delta) {
        self.score(self.score() + delta);
    };

    self.relativeFrame = function (frame) {
        return frame + (self.skinIndex * 5);
    };

    self.absoluteFrame = function (frame) {
        return frame - (self.skinIndex * 5);
    };

    self.jump = function() {
        self.bear.jumpBoost = 5;
        self.bear.ay = -5;
        self.game.assets['../Sounds/jump.wav'].clone().play();
    };

    self.hitTestRight = function (boundary, crossing, dest) {
        return ((map.hitTest(boundary, crossing) && !map.hitTest(boundary - 16, crossing)) || (map.hitTest(boundary, crossing + dest.height) && !map.hitTest(boundary - 16, crossing + dest.height)));
    };

    self.update = function () {
        var friction = 0;
        if (self.bear.vx > 0.3) {
            friction = -0.3;
        } else if (self.bear.vx > 0) {
            friction = -self.bear.vx;
        }
        if (self.bear.vx < -0.3) {
            friction = 0.3;
        } else if (self.bear.vx < 0) {
            friction = -self.bear.vx;
        }
        if (self.bear.jumping) {
            if (!self.game.input.up || --self.bear.jumpBoost < 0) {
                self.bear.ay = 0;
            }
        } else {
            if (self.game.input.up) {
                self.jump();
            }
        }
        this.ax = 0;
        if (self.game.input.left) self.bear.ax -= 0.5;
        if (self.game.input.right) self.bear.ax += 0.5;
        if (self.bear.ax > 0) self.bear.scaleX = 1;
        if (self.bear.ax < 0) self.bear.scaleX = -1;
        if (self.bear.ax != 0) {
            if (self.absoluteFrame(self.game.frame) % 3 == 0) {
                self.bear.pose++;
                self.bear.pose %= 2;
            }
            self.bear.frame = self.relativeFrame(self.bear.pose + 1);
        } else {
            self.bear.frame = self.relativeFrame(0);
        }
        self.bear.vx += self.bear.ax + friction;
        self.bear.vy += self.bear.ay + 2; // 2 is gravity
        self.bear.vx = Math.min(Math.max(self.bear.vx, -10), 10);
        self.bear.vy = Math.min(Math.max(self.bear.vy, -10), 10);

        var dest = new self.Rectangle(self.bear.x + self.bear.vx + 5, self.bear.y + self.bear.vy + 2, self.bear.width - 10, self.bear.height - 2);

        self.bear.jumping = true;
        if (dest.x < -self.stage.x) {
            dest.x = -self.stage.x;
            self.bear.vx = 0;
        }
        while (true) {

            var boundary, crossing;
            var dx = dest.x - self.bear.x - 5;
            var dy = dest.y - self.bear.y - 2;

            if (dx > 0 && Math.floor(dest.right / 16) != Math.floor((dest.right - dx) / 16)) {

                boundary = Math.floor(dest.right / 16) * 16;
                crossing = (dest.right - boundary) / dx * dy + dest.y;

                if (self.hitTestRight(boundary, crossing, dest)) {
                    self.bear.vx = 0;
                    dest.x = boundary - dest.width - 0.01;
                    continue;
                }

            } else if (dx < 0 && Math.floor(dest.x / 16) != Math.floor((dest.x - dx) / 16)) {

                boundary = Math.floor(dest.x / 16) * 16 + 16;
                crossing = (boundary - dest.x) / dx * dy + dest.y;

                if ((map.hitTest(boundary - 16, crossing) && !map.hitTest(boundary, crossing)) || (map.hitTest(boundary - 16, crossing + dest.height) && !map.hitTest(boundary, crossing + dest.height))) {
                    // hit left
                    self.bear.vx = 0;
                    dest.x = boundary + 0.01;
                    continue;
                }
            }
            if (dy > 0 && Math.floor(dest.bottom / 16) != Math.floor((dest.bottom - dy) / 16)) {
                boundary = Math.floor(dest.bottom / 16) * 16;
                crossing = (dest.bottom - boundary) / dy * dx + dest.x;
                if ((map.hitTest(crossing, boundary) && !map.hitTest(crossing, boundary - 16)) || (map.hitTest(crossing + dest.width, boundary) && !map.hitTest(crossing + dest.width, boundary - 16))) {
                    // player is standing on floor
                    self.bear.jumping = false;
                    self.bear.vy = 0;
                    dest.y = boundary - dest.height - 0.01;
                    continue;
                }
            } else if (dy < 0 && Math.floor(dest.y / 16) != Math.floor((dest.y - dy) / 16)) {
                boundary = Math.floor(dest.y / 16) * 16 + 16;
                crossing = (boundary - dest.y) / dy * dx + dest.x;
                if ((map.hitTest(crossing, boundary - 16) && !map.hitTest(crossing, boundary)) || (map.hitTest(crossing + dest.width, boundary - 16) && !map.hitTest(crossing + dest.width, boundary))) {
                    // player hit his head while jumping
                    self.bear.vy = 0;
                    dest.y = boundary + 0.01;
                    continue;
                }
            }

            break;
        }

        self.bear.x = dest.x - 5;
        self.bear.y = dest.y - 2;

        if (self.bear.y > 320) { self.die(); }

        if (self.inControl) {
            self.update2();
        }

        if ($.connection.gamehub) {
            $.connection.gamehub.clientCharacterStatus(self.nameFixed, self.bear.x, self.bear.y);
        }
    };

    self.update2 = function() {
        // Move label
        self.nameLabel.x = self.bear.x + 5;
        self.nameLabel.y = self.bear.y - 20;
    };

    self.serverUpdate = function (data) {
        self.bear.x = data.X;
        self.bear.y = data.Y;
    };

    self.die = function () {
        self.game.assets['../Sounds/gameover.wav'].play();
        self.increaseScore(-10);        
        self.bear.frame = self.relativeFrame(3);
        // TODO BDM: Use timer here!
        self.respawn();
        vm.addToLog(self.nameFixed + ' legt het loodje!');
    };


    self.respawn = function() {
        self.bear.x = self.spawnpoint.x;
        self.bear.y = -self.spawnpoint.y;
    };

    if (self.inControl) {
        self.bear.addEventListener('enterframe', self.update);
    } else {
        self.bear.addEventListener('enterframe', self.update2);
    }
    
    self.respawn();
}




