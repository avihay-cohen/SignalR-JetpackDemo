var stage;
var w, h;
var ships = [];

function initializeStage() {
    var canvas = document.getElementById("game_area");

    stage = new Stage(canvas);
    stage.autoClear = false;            // clear bg before draw?

    w = canvas.width;
    h = canvas.height;

    this.bg = new Bitmap("Images/bg.png");
    this.bg.x = 0;
    this.bg.y = 0;
    stage.addChild(this.bg);

    Ticker.useRAF = true;
    Ticker.setFPS(60);
    Ticker.addListener(window);
}

function tick() {
    for (var clientIndex = 0; clientIndex < ships.length; clientIndex++) {
        var clientShip = ships[clientIndex];
        clientShip.clientTick();
    }

    stage.update();
}


$(document).ready(function () {


    
    var hub = $.connection.gamehub;

    var ViewModelObj = function () {
        var self = this;
        self.localPlayerName = ko.observable('anonymous');
        self.koTest = ko.observable('testertje');
        self.join = function () {
            hub.newPlayerConnected(self.localPlayerName());
        };
        self.isThisPlayer = function (playerName) {
            return (playerName == self.localPlayerName());
        };
        self.inGame = ko.observable(false);
        self.inMenu = ko.computed(function () { return !self.inGame(); });
    };



    initializeStage();

    var vm = new ViewModelObj();

    ko.applyBindings(vm);

    

    // Wire up the key presses
    $(document).keydown(function (e) {
        if (vm.inGame()) {
            hub.keyboardEvent(true, vm.localPlayerName(), e.keyCode);
        }
    });

    $(document).keyup(function (e) {
        if (vm.inGame()) {
            hub.keyboardEvent(false, vm.localPlayerName(), e.keyCode);
        }
    });

    hub.newPlayer = function (data) {
        var playerName = data.Name;
        if (vm.isThisPlayer(playerName)) {
            vm.inGame(true);
        }
        console.log('Welcome, ' + playerName);
    };

    // TODO BDM: Rename. This is a "server gamestate update"
    hub.draw = function (data) {

        // Sync ships from server with ships on client
        for (var i = 0; i < data.Ships.length; i++) {

            var serverShip = data.Ships[i];

            var foundShip = false;

            for (var clientIndex = 0; clientIndex < ships.length; clientIndex++) {
                var clientShip = ships[clientIndex];

                if (clientShip.data.Name === serverShip.Name) {
                    foundShip = true;
                    clientShip.updateShip(serverShip);
                }

            }

            if (!foundShip) {
                var newShip = new Ship(serverShip, stage);
                ships.push(newShip);
            }
        }
    };

    $.connection.hub.start();

});

