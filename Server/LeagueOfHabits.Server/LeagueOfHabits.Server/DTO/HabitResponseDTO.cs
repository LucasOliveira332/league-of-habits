namespace LeagueOfHabits.Server.DTO
{
    public class HabitResponseDTO()
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public List<int> DaysOfWeekIds { get; set; }
        public List<DateTime> CompleteDaysDate { get; set; }
    }
}
