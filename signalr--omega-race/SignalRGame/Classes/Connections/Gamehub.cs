using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SignalR.Hubs;
using SignalRGame.Classes.GameElements;

namespace SignalRGame.Classes.Connections
{
    public class Gamehub : Hub, IDisconnect, IConnected
    {
        #region Connection events

        public Task Connect()
        {
            Game.Instance.AddHandler(this);

            return Clients.joined(Context.ConnectionId, DateTime.Now.ToString());
        }

        public Task Disconnect()
        {
            Game.Instance.RemoveHandler(this);
            Game.Instance.RemoveShip(Context.ConnectionId);

            return Clients.leave(Context.ConnectionId, DateTime.Now.ToString());
        }

        public Task Reconnect(IEnumerable<string> groups)
        {
            return Clients.rejoined(Context.ConnectionId, DateTime.Now.ToString());
        }

        #endregion



        #region Called by client

        /// <summary>
        /// Happens when an actual ship is spawned
        /// </summary>
        public void NewPlayerConnected(string playerName)
        {
            var ship = new Ship {Name = playerName, X = 50, Y = 50};
            ship.Id = Context.ConnectionId;
            Game.Instance.AddShip(ship);
        }

        public void shot(string playerName, int x, int y, int dir)
        {
            Clients.bulletAdded(x, y, dir, playerName);
        }

        public void respawned(string playerName)
        {
            var ship = Game.Instance.GetShip(playerName);
            if (ship == null) return;

            ship.Health = 100;
        }

        public void hit(string playerName)
        {
            var ship = Game.Instance.GetShip(playerName);
            if (ship == null) return;

            ship.Health -= 20;
        }

        public void clientCharacterStatus(string playerName, int x, int y, int dir, int skin, int health, int score)
        {
            var ship = Game.Instance.GetShip(playerName);

            if (ship == null) return;

            ship.X = x;
            ship.Y = y;
            ship.Dir = dir;
            ship.SkinIndex = skin;
            ship.Health = health;
            ship.Score = score;
        }

        #endregion

    
        public void Draw(List<Ship> ships)
        {
            Clients.clientUpdateGameState(new { Ships = ships.ToArray() });            
        }

    }
}