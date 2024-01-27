using LeagueOfHabits.Server.Data;
using LeagueOfHabits.Server.DTO;
using Microsoft.EntityFrameworkCore;

namespace LeagueOfHabits.Server.Repositories
{
    public class HabitRepository(DataContext dataContext)
    {
        private readonly DataContext _dataContext = dataContext;
        public List<HabitResponseDTO> GetHabits(string userId)
        {
            var habitResponse = _dataContext.Habits
                .Include(h => h.DaysOfWeek)
                .Where(h => h.UserId == userId)
                .Select(h => new HabitResponseDTO 
                {
                    Id = h.Id, 
                    Name = h.Name,
                    Description = h.Description,
                    ImageUrl = h.UrlImage,
                    DaysOfWeekIds = h.DaysOfWeek.Select(h => h.Id).ToList()
                })
                .ToList();

            return habitResponse;
        }
    }
}
