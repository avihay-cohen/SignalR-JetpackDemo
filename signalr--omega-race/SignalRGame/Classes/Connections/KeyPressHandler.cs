﻿using SignalR;
using SignalRGame.Classes.GameElements;

namespace SignalRGame.Classes.Connections
{

    public class KeyPressHandler : PersistentConnection 
    {
        protected override System.Threading.Tasks.Task OnReceivedAsync(SignalR.Hosting.IRequest request, string connectionId, string data)
        {
            var args = data.Split(':');
            bool keyDown = (args[0] == "d");
            string shipName = args[1];
            int key = int.Parse(args[2]);

            var ship = Game.GetShipByName(shipName);
            switch (key)
            {
                case 39:
                    {
                        ship.MovingRight = keyDown;
                        if (keyDown)
                        {
                            ship.Dir = 1;
                        }
                        break;
                    }
                case 37:
                    {
                        ship.MovingLeft = keyDown;
                        if (keyDown)
                        {
                            ship.Dir = -1;
                        }
                        break;
                    }
                case 38:
                    {
                        ship.MovingUp = keyDown;
                        break;
                    }
                case 40:
                    {
                        ship.MovingDown = keyDown;
                        break;
                    }
            }

            return base.OnReceivedAsync(request, connectionId, data);
        }
    }
}