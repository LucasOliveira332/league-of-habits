using Microsoft.AspNetCore.Identity;

namespace LeagueOfHabits.Server.Models
{
    public class CompleteDay
    {
        public int Id { get; set; }
        public int HabitId { get; set; }
        public Habit Habit { get; set; }
        public DateTime Data { get; set; }
    }
}
