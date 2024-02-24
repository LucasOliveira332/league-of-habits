using LeagueOfHabits.Server.Data;
using LeagueOfHabits.Server.DTO;
using LeagueOfHabits.Server.DTO.Response;
using LeagueOfHabits.Server.Models;
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
            var completeDaysResponse = await _dataContext.Habits
                .Include(h => h.CompleteDays)
                .Where(h => h.UserId == userId)
                .Select(h => new CompleteDaysResponseDTO()
                {
                    HabitId = h.Id,
                    CompleteDays = h.CompleteDays.Select(cd => cd.Data).ToList()
                })
                .ToListAsync();

            return completeDaysResponse;
        }

        public async Task<Habit> GetHabitById(int habitId)
        {
            var habit = await _dataContext.Habits
                .SingleOrDefaultAsync(h => h.Id == habitId);

            return habit;
        }

        public async Task<Habit> GetHabitByIdIncludesDaysOfWeekAsync(int habitId)
        {
            var habitWithDaysOfWeek = await _dataContext.Habits
                .Include(h => h.DaysOfWeek)
                .SingleOrDefaultAsync(h => h.Id == habitId);

            return habitWithDaysOfWeek;
        }


        public async Task UpdateHabitProperties(Habit habit, HabitUpdateDTO habitUpdate)
        {
            habit.Name = habitUpdate.Name ?? habit.Name;
            habit.Description = habitUpdate.Description ?? habit.Description;
            habit.LastUpdateDate = DateTime.UtcNow;


            if (!string.IsNullOrEmpty(habitUpdate.UrlImage))
            {
                habit.UrlImage = habitUpdate.UrlImage;
            }

            if (habitUpdate.DaysOfWeek?.Count > 0)
            {

                habit.DaysOfWeek.Clear();
                habit.DaysOfWeek = await _dataContext.DaysOfTheWeek.Where(d => habitUpdate.DaysOfWeek.Contains(d.Id)).ToListAsync();

            }
        }
    }
}
