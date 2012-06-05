using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using SignalRGame.Classes.Connections;

namespace SignalRGame.Classes.GameElements
{
    public class Game
    {
        private readonly static Arena _arena = new Arena();
        private static Game _game;

        private bool _stop;
        private readonly List<Ship> _ships;
        private readonly List<ClientHandler> _handlers;

        public static void StartGame()
        {
            _game = new Game();
            new Task(_game.Main).Start();
        }

        public static void EndGame()
        {
            _game.Stop();
        }

        public static void AddGameShip(Ship ship)
        {
            _game.AddShip(ship);
        }

        public static void AddGameHandler(ClientHandler handler)
        {
            _game.AddHandler(handler);
        }

        public static Ship GetShipByName(string name)
        {
            return _game.GetShip(name);
        }

        public static int NumberOfShips
        {
            get { return _game._ships.Count; }
        }

        public static Arena Arena
        {
            get { return _arena; }
        }



        private Game()
        {
            _stop = false;
            _handlers = new List<ClientHandler>();
            _ships =  new List<Ship>();            
        }

        public void Stop()
        {
            _stop = true;
        }

        public void AddShip(Ship ship)
        {
            _ships.Add(ship);
        }

        private Ship GetShip(string name)
        {
            return _ships.First(x => x.Name == name);
        }

        public void AddHandler(ClientHandler handler)
        {
            _handlers.Add(handler);
        }

        public void Main()
        {
            while (!_stop)
            {
                foreach (var ship in _ships)
                {
                    MoveShip(ship);
                }
                foreach( var handler in _handlers)
                {
                    handler.Draw(_ships, _arena);
                }
                Thread.Sleep(30);
            }
        }

        private void MoveShip(Ship ship)
        {
            ship.Move();
        }


    }
}