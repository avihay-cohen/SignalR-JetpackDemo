namespace SignalRGame.Classes.GameElements
{
    public class Ship
    {
        public string Name { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int SkinIndex { get; set; }
        public int Dir { get; set; }
        public int Health { get; set; }
        public int Score { get; set; }

        public Ship()
        {
            Dir = 1;
            Health = 100;
        }            
    }
}