using System;

namespace SignalRGame.Classes.GameElements
{
    public class Ship
    {
        private const int SpeedIncrease = 1;
        private const double FrictionFactor = .97;
        private const int MaxSpeed = 8;
        private const double MinSpeed = .5;
        private const int BounceBackPixels = 1;

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
        public int Dir { get; set; }

        public Ship()
        {
            Dir = 1;
        }

        public void Move()
        {
            if (MovingLeft) XSpeed -= SpeedIncrease;
            if (MovingRight) XSpeed += SpeedIncrease;
            if (MovingUp) YSpeed -= SpeedIncrease * 1.2;
            if (MovingDown) YSpeed += SpeedIncrease;

            ConstrainToTrack();

            // Apply speeds
            X += XSpeed;
            Y += YSpeed;

            var acc = 9.8;
            YSpeed += acc / 18;

            // Slow down
            XSpeed *= FrictionFactor;
            YSpeed *= FrictionFactor;



            // Limit speed to maximum
            if (XSpeed < -MaxSpeed) XSpeed = -MaxSpeed;
            if (YSpeed < -MaxSpeed) YSpeed = -MaxSpeed;
            if (XSpeed > MaxSpeed) XSpeed = MaxSpeed;
            if (YSpeed > MaxSpeed) YSpeed = MaxSpeed;

            // Set speed to 0 if very close
            if (Math.Abs(XSpeed) < MinSpeed) XSpeed = 0;
            if (Math.Abs(YSpeed) < MinSpeed) YSpeed = 0;
        }

        private void ConstrainToTrack()
        {
            if (X <= Game.Arena.Boundary.Left)
            {
                X = Game.Arena.Boundary.Left + BounceBackPixels;
                //XSpeed *= -1;
                XSpeed = 0;
            }
            if (X >= Game.Arena.Boundary.Right)
            {
                X = Game.Arena.Boundary.Right - BounceBackPixels;
                XSpeed = 0;
                //XSpeed *= -1;
            }
            if (Y >= Game.Arena.Boundary.Bottom)
            {
                Y = Game.Arena.Boundary.Bottom - BounceBackPixels;
                YSpeed = 0;
                //  YSpeed *= -1;
            }
            if (Y <= Game.Arena.Boundary.Top)
            {
                Y = Game.Arena.Boundary.Top + BounceBackPixels;
                YSpeed = 0;
              //  YSpeed *= -1;
            }
        }
    }
}