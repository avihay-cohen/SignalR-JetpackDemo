using System;

namespace SignalRGame.Classes.GameElements
{
    public class Ship
    {
        public string Name { get; set; }
        public string Colour { get; set; }
        public double X { get; set; }
        public double Y { get; set; }                
        public double XSpeed { get; set; }
        public double YSpeed { get; set; }
        public bool MovingLeft { get; set; }
        public bool MovingRight { get; set; }
        public bool MovingUp { get; set; }
        public bool MovingDown { get; set; }

        public void Move()
        {
            if (MovingLeft) XSpeed--;
            if (MovingRight) XSpeed++;
            if (MovingUp) YSpeed--;
            if (MovingDown) YSpeed++;

            ConstrainToTrack();

            X += (XSpeed*1.1);
            Y += (YSpeed*1.1);

            // Slow down
            XSpeed *= .97;
            YSpeed *= .97;

            // Set speed to 0 if very close
            if (Math.Abs(XSpeed) < 0.5) XSpeed = 0;
            if (Math.Abs(YSpeed) < 0.5) YSpeed = 0;
        }

        private void ConstrainToTrack()
        {
            if (X <= Game.Arena.Boundary.Left)
            {
                X = Game.Arena.Boundary.Left + 1;
                XSpeed *= -1;
            }
            if (X >= Game.Arena.Boundary.Right)
            {
                X = Game.Arena.Boundary.Right - 1;
                XSpeed *= -1;
            }
            if (Y >= Game.Arena.Boundary.Bottom)
            {
                Y = Game.Arena.Boundary.Bottom - 1;
                YSpeed *= -1;
            }
            if (Y <= Game.Arena.Boundary.Top)
            {
                Y = Game.Arena.Boundary.Top + 1;
                YSpeed *= -1;
            }
        }
    }
}