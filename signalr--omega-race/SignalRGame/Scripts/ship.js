function Ship(shipdata, stage) {
    this.data = shipdata;

    // Main sprite
    this.jetpack = new Bitmap("Images/jetpack.png");
    this.jetpack.regX = 16;
    this.jetpack.regY = 16;
    this.jetpack.snapToPixel = true;
    stage.addChild(this.jetpack);

    // Text
    this.text = new Text(shipdata.Name, "16px Arial", shipdata.Colour);
    stage.addChild(this.text);

    this.updateShip = function (updateshipdata) {
        this.data = updateshipdata;
        this.updateSpritePosition();
    };

    this.updateSpritePosition = function() {
        this.jetpack.x = this.data.X;
        this.jetpack.y = this.data.Y;
        this.text.x = this.data.X - 25;
        this.text.y = this.data.Y - 20;
    };

    this.clientTick = function () {
        // divide by 2, because the server side loop runs at half speed (+- 30 fps)
        this.data.X = this.data.X + (this.data.XSpeed / 2);
        this.data.Y = this.data.Y + (this.data.YSpeed / 2);

        this.updateSpritePosition();
    };

    this.updateSpritePosition();

    console.log('ship created');
}