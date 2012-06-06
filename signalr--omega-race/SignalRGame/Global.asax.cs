using System;
using SignalRGame.Classes.GameElements;

namespace SignalRGame
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {            
            Game.StartGame();
        }
    }
}