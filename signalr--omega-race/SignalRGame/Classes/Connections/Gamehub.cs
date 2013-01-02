using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SignalR.Hubs;
using SignalRGame.Classes.GameElements;

namespace SignalRGame.Classes.Connections
{
    public class Gamehub : Hub, IDisconnect, IConnected
    {
        public Task Connect()
        {
            Game.AddGameHandler(this);

            return Clients.joined(Context.ConnectionId, DateTime.Now.ToString());
        }

        public Task Disconnect()
        {
            return Clients.leave(Context.ConnectionId, DateTime.Now.ToString());
        }

        public Task Reconnect(IEnumerable<string> groups)
        {
            return Clients.rejoined(Context.ConnectionId, DateTime.Now.ToString());
        }

        /// <summary>
        /// Happens when an actual ship is spawned
        /// </summary>
        public void NewPlayerConnected(string playerName)
        {
            var ship = new Ship { Name = playerName, X = 50, Y = 50 };
            Game.AddGameShip(ship);
         
        }

        public void shot(string playerName, int x, int y, int dir)
        {           
            Clients.bulletAdded(x, y, dir, playerName);
        }

        public void respawned(string playerName)
        {
            var ship = Game.GetShipByName(playerName);
            if (ship == null) return;

            ship.Health = 100;           
        }

        public void hit(string playerName)
        {
            var ship = Game.GetShipByName(playerName);
            if(ship == null) return;

            ship.Health -= 20;          
        }

        public void clientCharacterStatus(string playerName, int x, int y, int dir, int skin, int health)
        {
            var ship = Game.GetShipByName(playerName);

            if (ship == null) return;

            ship.X = x;
            ship.Y = y;
            ship.Dir = dir;
            ship.SkinIndex = skin;
            ship.Health = health;
        }

        /// <summary>
        /// Called by game
        /// </summary>        
        public void Draw(List<Ship> ships, Arena arena)
        {
            Clients.clientUpdateGameState(new DrawInfo { Ships = ships.ToArray(), Arena = arena });            
        }

    }

    public class DrawInfo
    {
        public Ship[] Ships;
        public Arena Arena;
    }
}