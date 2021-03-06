﻿Array.prototype.remove = function(s) {
    var i = this.indexOf(s);
    if (i != -1) this.splice(i, 1);
};

var vm;

$(document).ready(function () {

    var hub = $.connection.gamehub;

    var ViewModelObj = function () {
        var self = this;

        var nameSuggestions = ['Brutus', 'Sniper', 'Destroyer', 'Razorblade'];
        self.localPlayerName = ko.observable(nameSuggestions[Math.floor(Math.random() * nameSuggestions.length)]);
        self.inGame = ko.observable(false);
        self.inMenu = ko.computed(function () { return !self.inGame(); });
        self.offlineMode = ko.observable(true);
        self.characters = ko.observableArray([]);
        self.sortFunction = function (left, right) {
            return left.score() == right.score() ? 0 : (left.score() > right.score() ? -1 : 1);
        };
        self.sortedCharacters = ko.dependentObservable(function () {
            return self.characters.slice().sort(self.sortFunction);
        }, self);
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
        self.showJoin = function () { };
        self.addToLog = function (text) {
            if (self.logEntries().length > 4) {
                self.logEntries.shift();
            }

            self.logEntries.push(text);
        };
        self.join = function () {
            self.currentPlayer(new PlayerCharacter(self.localPlayerName(), customMap.spawnpoint, game, stage));
            game.enableScrolling(self.currentPlayer().bear);
            self.characters.push(self.currentPlayer());
            hub.newPlayerConnected(self.localPlayerName());
            self.inGame(true);
        };
        self.isThisPlayer = function (playerName) {
            return (playerName == self.localPlayerName());
        };

        self.getCharacterToUpdate = function (serverCharacter) {
            for (var clientIndex = 0; clientIndex < vm.characters().length; clientIndex++) {
                var clientShip = vm.characters()[clientIndex];
                if (clientShip.nameFixed === serverCharacter.Name) {
                    return clientShip;
                }
            }

            // If we got here, we need to add a new character
            console.log('addin new');
            var newlyAdded = new CharacterDummy(serverCharacter.Name, game, stage);
            vm.characters.push(newlyAdded);
            return newlyAdded;
        };
    };

    vm = new ViewModelObj();

    hub.newPlayer = function (data) { };

    hub.bulletAdded = function (x, y, dir, playerName) {
        if (playerName != vm.localPlayerName()) {
            var b = new Bullet(x, y, dir);
        }
    };

    hub.clientUpdateGameState = function (data) {
        for (var i = 0; i < data.Ships.length; i++) {

            var c = vm.getCharacterToUpdate(data.Ships[i]);

            if (vm.currentPlayer()) {
                // in the game
                if (c.nameFixed != vm.localPlayerName()) { // Ignore updates for local player!
                    c.serverUpdate(data.Ships[i]);
                }
            } else {
                c.serverUpdate(data.Ships[i]);      // Spectator, always update
            }


        }
    };

    ko.applyBindings(vm);

    $.connection.hub.start();

    vm.offlineMode(false);

    startGame();
});