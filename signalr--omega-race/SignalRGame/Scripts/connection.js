var vm;

$(document).ready(function () {

    var hub = $.connection.gamehub;

    var ViewModelObj = function () {
        var self = this;
        self.localPlayerName = ko.observable('anonymous');
        self.inGame = ko.observable(false);
        self.inMenu = ko.computed(function () { return !self.inGame(); });
        self.offlineMode = ko.observable(true);
        self.characters = ko.observableArray([]);
        self.currentPlayer = ko.observable();
        self.editMode = ko.observable(false);
        self.isAdmin = ko.observable(true);
        self.logEntries = ko.observableArray(["Welcome!"]);
        self.hasPlayers = ko.computed(function () {
            return self.characters().length > 0;
        });
        self.kickAll = function () {
            if (!self.isAdmin()) return;
            if (self.offlineMode()) return;
            $.connection.gamehub.kickAll();
        };
        self.showJoin = function () {
        };
        self.addToLog = function (text) {
            self.logEntries.push(text);
        };
        self.join = function () {
            self.inGame(true);
            self.currentPlayer(game.addPlayer(self.localPlayerName()));
            self.characters.push(self.currentPlayer());
            hub.newPlayerConnected(self.localPlayerName());
        };
        self.isThisPlayer = function (playerName) {
            return (playerName == self.localPlayerName());
        };
    };

    vm = new ViewModelObj();

    hub.newPlayer = function (data) { /* placeholder */ };

    hub.clientUpdateGameState = function (data) {
        // Sync ships from server with ships on client
        for (var i = 0; i < data.Ships.length; i++) {
            var serverShip = data.Ships[i];
            if (vm.localPlayerName() != serverShip.Name) {      // Ignore updates for local player!

                var foundPlayer = false;

                for (var clientIndex = 0; clientIndex < vm.characters().length; clientIndex++) {
                    var clientShip = vm.characters()[clientIndex];

                    if (clientShip.nameFixed === serverShip.Name) {
                        clientShip.serverUpdate(serverShip);
                        foundPlayer = true;
                    }
                }

                if (foundPlayer === false) {
                    var newP = game.addOtherPlayer(serverShip.Name);
                    vm.characters.push(newP);
                }
            }

        }
    };

    ko.applyBindings(vm);

    $.connection.hub.start();

    vm.offlineMode(false);

    startGame();
});