using LeagueOfHabits.Server.Data;
using LeagueOfHabits.Server.DTO;
using LeagueOfHabits.Server.DTO.Response;
using Microsoft.EntityFrameworkCore;

namespace LeagueOfHabits.Server.Repositories
{
    public class HabitService(DataContext dataContext)
    {
        private readonly DataContext _dataContext = dataContext;
        public async Task<List<HabitResponseDTO>> GetHabitsAsync(string userId)
        {
            var habitResponse = await _dataContext.Habits
                .Include(h => h.DaysOfWeek)
                .Include(h => h.CompleteDays)
                .Where(h => h.UserId == userId)
                .Select(h => new HabitResponseDTO 
                {
                    Id = h.Id, 
                    Name = h.Name,
                    Description = h.Description,
                    ImageUrl = h.UrlImage,
                    DaysOfWeekIds = h.DaysOfWeek.Select(h => h.Id).ToList(),
                    CompleteDaysDate = h.CompleteDays.Select(h => h.Data).ToList()
                })
                .ToListAsync();

            return habitResponse;
        }

        public async Task<List<CompleteDaysResponseDTO>> GetCompleteDaysAsync(string userId)
        {
            var completeDays = await _dataContext.Habits
                .Include(h => h.CompleteDays)
                .Where(h => h.UserId == userId)
                .Select(h => new CompleteDaysResponseDTO()
                {
                    HabitId = h.Id,
                    CompleteDays = h.CompleteDays.Select(h => h.Data).ToList()
                })
                .ToListAsync();

            return completeDays;
        }
    }


}
