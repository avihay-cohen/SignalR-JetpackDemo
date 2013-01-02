using System;
using SignalR;
using SignalRGame.Classes.GameElements;

namespace SignalRGame
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            // Make connections wait Xs maximum for any response. After
            // Xs are up, trigger a timeout command and make the client reconnect.
            GlobalHost.Configuration.ConnectionTimeout = TimeSpan.FromSeconds(2);

            Game.Instance.Start();

        }
    }
}