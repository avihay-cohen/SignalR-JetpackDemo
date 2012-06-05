$(document).ready(function () {

    var imageObj = new Image();
    imageObj.src = "../Images/jetpack.png";

    // Connection used to deal with players joining - either through this instance or other instances (therefore a two way connection)
    var playerConnection = $.connection('playerconnection');
    playerConnection.start();

    playerConnection.received(function (data) {
        var playerName = data.Name;
        if (isThisPlayer(playerName)) {
            startProcessingKeyPresses();
            $('#login').hide();
        }
        displayWelcomeMessage(playerName, data.Colour);
    });

    // Send only connection used to send key presses to the game engine
    var keyPressConnection = $.connection('keypressconnection');

    // Connection to the game engine this is effectively a receive only connection, used by the engine to tell us to perform some ui action
    var gameConnection = $.connection('gameconnection');
    gameConnection.start();

    gameConnection.received(function (data) {
        ships = data.Ships;
        arena = data.Arena;
        refreshScreen();
    });

    function startProcessingKeyPresses() {
        inGame = true;
        keyPressConnection.start();
    }

    function displayWelcomeMessage(playerName, shipColour) {
        var message = 'Welcome to the game, ' + playerName + '.';
        var notificationArea = $('#notifications');
        notificationArea.css('color', shipColour);
        notificationArea.html(message).fadeIn(3000, function () {
            notificationArea.html(message).fadeOut(3000);
        });
    }

    function isThisPlayer(playerName) {
        return (playerName == currentPlayerName);
    }

    var ships = [];
    var currentPlayerName = '';
    var inGame = false;
    var context;
    var arena;

    function drawArena() {
        context.save();
        context.beginPath();
        context.strokeStyle = "yellow";
        var boundary = arena.Boundary;
        context.strokeRect(boundary.X, boundary.Y, boundary.Width, boundary.Height);
        context.closePath();
        context.stroke();
        context.restore();
    }

    function drawShip(ship) {
        context.save();
        context.drawImage(imageObj, ship.X - 10, ship.Y - 20);
        context.fillStyle = ship.Colour;
        context.font = "bold 16px Arial";
        context.fillText(ship.Name, ship.X - 15, ship.Y - 25);
    }

    function drawShips() {
        for (var i = 0; i < ships.length; i++)
            drawShip(ships[i]);
    }

    function refreshScreen() {
        game_area.width = arena.Width;
        game_area.height = arena.Height;
        context = game_area.getContext('2d');
        context.clearRect(0, 0, arena.Width, arena.Height);
        drawArena();
        drawShips();
    }

    // Wire up the key presses etc
    $(document).keydown(function (e) {
        if (inGame) {
            var msg = 'd:' + currentPlayerName + ':' + e.keyCode;
            keyPressConnection.send(msg);
        }
    });

    $(document).keyup(function (e) {
        if (inGame) {
            var msg = 'u:' + currentPlayerName + ':' + e.keyCode;
            keyPressConnection.send(msg);
        }
    });

    $('#join').click(function () {
        var playerName = $('#playername').val();
        currentPlayerName = playerName;
        playerConnection.send(playerName);
    });
});