var stage;
var w, h;
var ships = [];
var currentPlayerName = '';
var inGame = false;
var hub;

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

initializeStage();

$(document).ready(function () {

    function isThisPlayer(playerName) {
        return (playerName == currentPlayerName);
    }

    function initializeConnection() {
        hub = $.connection.gamehub;

        hub.newPlayer = function (data) {
            var playerName = data.Name;
            if (isThisPlayer(playerName)) {
                inGame = true;
                $('#login').hide();
            }
            displayWelcomeMessage(playerName, data.Colour);
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
    }

    function displayWelcomeMessage(playerName, shipColour) {
        var message = 'Welcome to the game, ' + playerName + '.';
        var notificationArea = $('#notifications');
        notificationArea.css('color', shipColour);
        notificationArea.html(message).fadeIn(3000, function () {
            notificationArea.html(message).fadeOut(3000);
        });
    }

    // Wire up the key presses
    $(document).keydown(function (e) {
        if (inGame) {
            hub.keyboardEvent(true, currentPlayerName, e.keyCode);
        }
    });

    $(document).keyup(function (e) {
        if (inGame) {
            hub.keyboardEvent(false, currentPlayerName, e.keyCode);
        }
    });

    // Join button
    $('#join').click(function () {
        var playerName = $('#playername').val();
        currentPlayerName = playerName;
        hub.newPlayerConnected(playerName);
    });

    initializeConnection();
});