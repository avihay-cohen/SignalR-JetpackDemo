using System.Collections.Generic;
using System.Web;
using SignalR;
using SignalRGame.Classes.GameElements;

namespace SignalRGame.Classes.Connections
{
    public class ClientHandler : PersistentConnection
    {
        protected override System.Threading.Tasks.Task OnConnectedAsync(SignalR.Hosting.IRequest request, string connectionId)
        {
            Game.AddGameHandler(this);
            return base.OnConnectedAsync(request, connectionId);
        }

        internal void Draw(List<Ship> ships, Arena arena)
        {
            Connection.Broadcast(new DrawInfo { Ships = ships.ToArray(), Arena = arena });
        }
    }

    public class DrawInfo
    {
        public Ship[] Ships;
        public Arena Arena;
    }
}