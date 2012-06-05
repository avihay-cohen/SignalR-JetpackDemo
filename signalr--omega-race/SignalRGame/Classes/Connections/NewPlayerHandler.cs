using SignalR;
using SignalRGame.Classes.GameElements;

namespace SignalRGame.Classes.Connections
{
    public class NewPlayerHandler : PersistentConnection
    {
        protected override System.Threading.Tasks.Task OnReceivedAsync(string clientId, string data)
        {
            int colourIndex = Game.NumberOfShips;
            if ( Game.NumberOfShips > _colours.Length - 1 )
                colourIndex = Game.NumberOfShips % _colours.Length;

            var colour = _colours[colourIndex];
            var ship = new Ship() {Colour = colour, Name = data, X = 50, Y = 50};
            Game.AddGameShip(ship);
            return Connection.Broadcast(ship);
        }

        private readonly string[] _colours = new [] { "red", "white", "blue", "yellow" };
    }
}