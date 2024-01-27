using LeagueOfHabits.Server.Data;
using LeagueOfHabits.Server.DTO;
using LeagueOfHabits.Server.Models;
using LeagueOfHabits.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LeagueOfHabits.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HabitController(DataContext dataContext, HabitRepository habitRepository) : ControllerBase
    {
        private readonly DataContext _dataContext = dataContext;
        private readonly HabitRepository _habitRepository = habitRepository;

        [HttpGet, Authorize]
        public ActionResult<List<HabitCreateDTO>> GetHabits()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) 
            { 
                return NotFound("User not found");
             }

            var habits = _habitRepository.GetHabits(userId);

            return Ok(habits);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> CreateHabit(HabitCreateDTO habitCreateDTO)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var rank = _dataContext.Ranks.First();

            var daysOfWeek = _dataContext.DaysOfTheWeek.Where(d => habitCreateDTO.DaysOfWeek.Contains(d.Id)).ToList();

            var habit = new Habit()
            {
                UserId = userId,
                RankId = rank.Id,
                Name = habitCreateDTO.Name,
                Description = habitCreateDTO.Description,
                StartDate = DateTime.Now,
                LastUpdateDate = DateTime.Now,
                UrlImage = habitCreateDTO.UrlImage,
                DaysOfWeek = daysOfWeek
            };

            var result = _dataContext.Habits.Add(habit);
            var response = await _dataContext.SaveChangesAsync();


            if (response > 0) return Ok();
            else return BadRequest();
        }
        [HttpPost("{id}"), Authorize]
        public async Task<IActionResult> CheckDayHabit(int id)
        {
            var completeDays = new CompleteDay() { Data = DateTime.Now, HabitId = id };

            var existingDay = await _dataContext.CompleteDays
                .SingleOrDefaultAsync(c => c.HabitId == id && c.Data.Day == completeDays.Data.Day);

            if (existingDay != null) return BadRequest();

            var habit = await _dataContext.Habits
                .Include(h => h.DaysOfWeek)
                .Select(h => new {
                    HabitId =  h.Id, 
                    DaysOfWeekNames = h.DaysOfWeek.Select(d => d.Name).ToList()
                })
                .SingleOrDefaultAsync(h => h.HabitId == completeDays.HabitId);

            if (habit == null) 
                return BadRequest();

            string dayOfWeek = completeDays.Data.DayOfWeek.ToString();

            bool isDayIncluded = habit.DaysOfWeekNames.Contains(dayOfWeek);

            if (!isDayIncluded) 
                return BadRequest();

            _dataContext.CompleteDays.Add(completeDays);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateHabit(int id, HabitUpdateDTO habitUpdate)
        {
            Habit habit = null;

            if (habitUpdate.DaysOfWeek.Count() != 0)
            {
                 habit = await _dataContext.Habits.Include(h => h.DaysOfWeek).SingleOrDefaultAsync(h => h.Id == id);
            }
            else
            {
                 habit = await _dataContext.Habits.SingleOrDefaultAsync(h => h.Id == id);
            }


            if (habit == null)
                return NotFound();

            habit.DaysOfWeek.Clear();

            habit.Name = habitUpdate.Name ?? habit.Name;

            habit.Description = habitUpdate.Description ?? habit.Description;

            habit.LastUpdateDate  = DateTime.UtcNow;

            if (!string.IsNullOrEmpty(habitUpdate.UrlImage))
                habit.UrlImage = habitUpdate.UrlImage;

            if (habitUpdate.DaysOfWeek.Count != 0)
                habit.DaysOfWeek = _dataContext.DaysOfTheWeek.Where(d => habitUpdate.DaysOfWeek.Contains(d.Id)).ToList();

            _dataContext.Habits.Update(habit);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
