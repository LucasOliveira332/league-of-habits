using Microsoft.AspNetCore.Identity;

namespace LeagueOfHabits.Server.Models
{
    public class Habit
    {
        public int Id { get; set; }
        public required string UserId { get; set; }
        public IdentityUser IdentityUser { get; set; }
        public required int RankId { get; set; }
        public Rank Rank { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public string? UrlImage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public  ICollection<DayOfTheWeek> DaysOfWeek { get; set; }
        public ICollection<CompleteDay>? CompleteDays {  get; set; }
    }
}
