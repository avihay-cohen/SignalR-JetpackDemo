using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using SignalRGame.Classes.Connections;

namespace SignalRGame.Classes.GameElements
{
    public class Game
    {
        private static Game instance;
        public static Game Instance
        {
            get { return instance ?? (instance = new Game()); }
        }

        private bool _stop;
        private readonly List<Ship> _ships;

        private List<Gamehub> handlers = new List<Gamehub>();

        private Game()
        {
            _stop = false;            
            _ships = new List<Ship>();
        }

        public void Start()
        {
            new Task(Instance.Main).Start();
        }

        public void End()
        {
            Instance.Stop();
        }

        public void Stop()
        {
            _stop = true;
        }

        public void AddShip(Ship ship)
        {
            _ships.Add(ship);
        }

        public Ship GetShip(string name)
        {
            return _ships.FirstOrDefault(x => x.Name == name);
        }

        public void AddHandler(Gamehub handler)
        {
            handlers.Add(handler);
        }

        public void RemoveHandler(Gamehub handler)
        {
            handlers.Remove(handler);
        }

        private void Main()
        {
            while (!_stop)
            {
                foreach (var handler in handlers)
                {
                    handler.Draw(_ships);
                }

                Thread.Sleep(30);   // Loop info (original): 1000ms/s | 30ms | "33 fps"
            }
        }

        public void RemoveShip(string connectionId)
        {
            var sh = _ships.FirstOrDefault(s => s.Id == connectionId);
            if(sh!=null)
            {
                _ships.Remove(sh);
            }
        }
    }
}