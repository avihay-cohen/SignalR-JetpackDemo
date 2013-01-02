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

            // Not needed anymore
            //Clients.newPlayer(ship);            
        }

        public void KickAll()
        {
            Game.RemoveAllPlayers();
        }

        public void respawned(string playerName)
        {
            try
            {
                var ship = Game.GetShipByName(playerName);
                ship.Health = 100;
            }
            catch (Exception e)
            {

            }               
        }

        public void hit(string playerName)
        {
            try
            {
                var ship = Game.GetShipByName(playerName);
                ship.Health -= 20;
            }
            catch (Exception e)
            {

            }            
        }

        public void clientCharacterStatus(string playerName, int x, int y, int dir, int skin)
        {
            try
            {
                var ship = Game.GetShipByName(playerName);
                ship.X = x;
                ship.Y = y;
                ship.Dir = dir;
                ship.SkinIndex = skin;
            }
            catch (Exception e)
            {
                
            }
        }

        /// <summary>
        /// Called by game
        /// </summary>        
        public void Draw(List<Ship> ships, Arena arena)
        {
            DateTime now = DateTime.Now;
            //Clients.clientUpdateGameState();
            //     Debug.WriteLine(now.ToString() + "-" + now.Millisecond + ": " + "draw!");
            Clients.clientUpdateGameState(new DrawInfo { Ships = ships.ToArray(), Arena = arena });            
        }


    }

    public class DrawInfo
    {
        public Ship[] Ships;
        public Arena Arena;
    }
}