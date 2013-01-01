$(document).ready(function () {

    var hub = $.connection.gamehub;

    var ViewModelObj = function () {
        var self = this;
        self.localPlayerName = ko.observable('anonymous');
        self.inGame = ko.observable(false);
        self.inMenu = ko.computed(function () { return !self.inGame(); });
        self.offlineMode = ko.observable(true);
        self.characters = ko.observableArray();
        self.currentPlayer = ko.observable();
        self.join = function () {
            vm.inGame(true);
            hub.newPlayerConnected(self.localPlayerName());
            self.currentPlayer(game.addPlayer(self.localPlayerName()));
            self.characters().push(self.currentPlayer());
        };
        self.isThisPlayer = function (playerName) {
            return (playerName == self.localPlayerName());
        };
    };

    vm = new ViewModelObj();

    ko.applyBindings(vm);

    hub.newPlayer = function (data) { /* placeholder */ };

    hub.clientUpdateGameState = function (data) {
        // Sync ships from server with ships on client
        for (var i = 0; i < data.Ships.length; i++) {
            var serverShip = data.Ships[i];
            if (vm.localPlayerName() != serverShip.Name) {      // Ignore updates for local player!

                var foundPlayer = false;

                for (var clientIndex = 0; clientIndex < vm.characters().length; clientIndex++) {
                    var clientShip = vm.characters()[clientIndex];

                    if (clientShip.name === serverShip.Name) {
                        clientShip.serverUpdate(serverShip);
                        foundPlayer = true;
                    }
                }

                if (foundPlayer === false) {
                    console.log('not found (adding new): ' + serverShip.Name);
                    var newP = game.addOtherPlayer(serverShip.Name);
                    vm.characters().push(newP);
                    console.log('Welcome, ' + serverShip.Name);
                }
            }

        }
    };

    $.connection.hub.start();

    vm.offlineMode(false);

    startGame();
});