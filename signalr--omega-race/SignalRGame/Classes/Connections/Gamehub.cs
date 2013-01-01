﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SignalR.Hubs;
using SignalRGame.Classes.GameElements;

namespace SignalRGame.Classes.Connections
{
    public class Gamehub : Hub, IDisconnect, IConnected
    {
        private readonly string[] _colours = new[] { "red", "white", "blue", "yellow" };

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
            int colourIndex = Game.NumberOfShips;
            if (Game.NumberOfShips > _colours.Length - 1)
            {
                colourIndex = Game.NumberOfShips % _colours.Length;
            }

            var colour = _colours[colourIndex];
            var ship = new Ship { Colour = colour, Name = playerName, X = 50, Y = 50 };
            Game.AddGameShip(ship);

            Clients.newPlayer(ship);            
        }

        public void clientCharacterStatus(string playerName, int x, int y)
        {
            var ship = Game.GetShipByName(playerName);
            ship.X = x;
            ship.Y = y;
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