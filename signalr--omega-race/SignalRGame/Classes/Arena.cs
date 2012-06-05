using System.Drawing;

namespace SignalRGame.Classes.GameElements
{
    public class Arena
    {        
        public Arena()
        {
            Height = 500;
            Width = 1000;
            Margin = 10;
            Boundary = new RectangleF(5, 5, Width - Margin, Height - Margin);
        }

        public float Height { get; set; }
        public float Width { get; set; }
        public float Margin { get; set; }
        public RectangleF Boundary  { get; set; }
    }
}