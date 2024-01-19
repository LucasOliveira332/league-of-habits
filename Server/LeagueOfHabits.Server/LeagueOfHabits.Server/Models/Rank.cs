namespace LeagueOfHabits.Server.Models
{
    public class Rank
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int RequiredPoints { get; set; }
        public int LossesPoints { get; set; }
        public ICollection<Habit> Habits { get; set; }
    }
}
