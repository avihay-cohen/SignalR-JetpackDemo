$(document).ready(function () {

    var hub = $.connection.gamehub;

    var ViewModelObj = function () {
        var self = this;
        self.localPlayerName = ko.observable('anonymous');
        self.join = function () {
            hub.newPlayerConnected(self.localPlayerName());
        };
        self.isThisPlayer = function (playerName) {
            return (playerName == self.localPlayerName());
        };
        self.inGame = ko.observable(false);
        self.inMenu = ko.computed(function () { return !self.inGame(); });
        self.offlineMode = ko.observable(true);
        self.remotePlayerNames = ko.observableArray();
    };

    var vm = new ViewModelObj();

    ko.applyBindings(vm);

    hub.newPlayer = function (data) {
        var playerName = data.Name;
        if (vm.isThisPlayer(playerName)) {
            vm.inGame(true);
            game.addPlayer(playerName);
        } else {
            //game.addOtherPlayer(playerName);
        }
        console.log('Welcome, ' + playerName);
    };

    hub.clientUpdateGameState = function (data) {
        // Sync ships from server with ships on client
        for (var i = 0; i < data.Ships.length; i++) {
            var serverShip = data.Ships[i];
            if (vm.localPlayerName() != serverShip.Name) {

                if (vm.remotePlayerNames.indexOf(serverShip.Name) == -1) {
                    console.log('not found (adding new): ' + serverShip.Name);
                    game.addOtherPlayer(serverShip.Name);
                    vm.remotePlayerNames().push(serverShip.Name);
                } else {
                    var theCharacter = vm.remotePlayerNames()[vm.remotePlayerNames.indexOf(serverShip.Name)];
                    console.log('updating ' + serverShip.Name);
                }



            }

        }
    };

    $.connection.hub.start();

    vm.offlineMode(false);

    startGame();
});