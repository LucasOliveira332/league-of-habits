namespace LeagueOfHabits.Server.DTO.Response
{
    public record CompleteDaysResponseDTO {
        public int HabitId { get; set; }
        public List<DateTime>? CompleteDays { get; set; }
    }
}
