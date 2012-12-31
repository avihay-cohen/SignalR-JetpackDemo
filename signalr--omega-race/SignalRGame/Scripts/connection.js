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
    };

    var vm = new ViewModelObj();

    ko.applyBindings(vm);

    hub.newPlayer = function (data) {
        var playerName = data.Name;
        if (vm.isThisPlayer(playerName)) {
            vm.inGame(true);
        }
        console.log('Welcome, ' + playerName);
    };

    hub.clientUpdateGameState = function (data) {
        console.log('update from server received!');
    };

    $.connection.hub.start();

    vm.offlineMode(false);

    startGame();
});