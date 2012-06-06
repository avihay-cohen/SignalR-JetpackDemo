$(document).ready(function () {

    var imageObj = new Image();
    imageObj.src = "../Images/jetpack.png";

    var imageObjRight = new Image();
    imageObjRight.src = "../Images/jetpackRight.png";

    // Proxy created on the fly
    var hub = $.connection.gamehub;

    hub.newPlayer = function (data) {
        var playerName = data.Name;
        if (isThisPlayer(playerName)) {
            inGame = true;
            $('#login').hide();
        }
        displayWelcomeMessage(playerName, data.Colour);
    };

    hub.draw = function (data) {
        ships = data.Ships;
        arena = data.Arena;
        refreshScreen();
    };

    $.connection.hub.start();

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
        if (ship.Dir === -1) {
            context.drawImage(imageObj, ship.X - 10, ship.Y - 20);
        }
        if (ship.Dir === 1) {
            context.drawImage(imageObjRight, ship.X - 10, ship.Y - 20);
        }
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
            hub.keyboardEvent(true, currentPlayerName, e.keyCode);
        }
    });

    $(document).keyup(function (e) {
        if (inGame) {
            hub.keyboardEvent(false, currentPlayerName, e.keyCode);
        }
    });

    $('#join').click(function () {
        var playerName = $('#playername').val();
        currentPlayerName = playerName;
        hub.newPlayerConnected(playerName);
    });
});