function CharacterDummy(name, game, stage) {
    // Self
    var self = this;
    
    // References
    self.game = game;
    self.stage = stage;

    // General data
    self.nameFixed = name;
    self.name = ko.observable(name);
    self.score = ko.observable(0);
    self.health = ko.observable(100);        
    self.skinIndex = 0;
    self.isLocal = ko.observable(false);
    
    // Sprite
    self.bear = new Sprite(32, 32);
    self.bear.image = game.assets['../Images/chara1.gif'];

    // Label
    self.nameLabel = new Label(self.nameFixed);
    stage.addChild(self.bear);
    stage.addChild(self.nameLabel);

    // Update from server
    self.serverUpdate = function (data) {
        self.bear.x = data.X;
        self.bear.y = data.Y;
        self.bear.scaleX = data.Dir;
        self.skinIndex = data.SkinIndex;
        self.health(data.Health);

        // Move label
        self.nameLabel.x = self.bear.x + 5;
        self.nameLabel.y = self.bear.y - 20;
    };
}