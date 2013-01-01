﻿namespace SignalRGame.Classes.GameElements
{
    public class Ship
    {
        public string Name { get; set; }
        public string Colour { get; set; }
        public double X { get; set; }
        public double Y { get; set; }                
        public double XSpeed { get; set; }
        public double YSpeed { get; set; }
        public int Dir { get; set; }

        public Ship()
        {
            Dir = 1;
        }            
    }
}