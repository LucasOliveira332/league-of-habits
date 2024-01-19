namespace LeagueOfHabits.Server.Models
{
    public class DayOfTheWeek
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Habit> Habits { get; set; }
    }
}
