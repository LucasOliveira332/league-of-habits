using LeagueOfHabits.Server.Data;
using LeagueOfHabits.Server.DTO;
using LeagueOfHabits.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LeagueOfHabits.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HabitController(DataContext dataContext) : ControllerBase
    {
        private readonly DataContext _dataContext = dataContext;

        [HttpGet, Authorize]
        public IActionResult GetHabits()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var habits = _dataContext.Habits
                .Include(h => h.DaysOfWeek)
                .Where(h => h.UserId == userId)
                .Select(h => new { 
                    HabitId = h.Id, 
                    HabitName = h.Name, 
                    HabitDescription = h.Description,
                    DaysOfWeekIds = h.DaysOfWeek.Select(d => d.Id).ToList()
                })
                .ToList();

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

            _dataContext.CompleteDays.Add(completeDays);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateHabit(int id, HabitUpdateDTO habitUpdate)
        {
            var habit = await _dataContext.Habits.SingleOrDefaultAsync(h => h.Id == id);

            if (habit == null) return NotFound();

            habit.Name = habitUpdate.Name ?? habit.Name;
            habit.Description = habitUpdate.Description ?? habit.Description;
            habit.LastUpdateDate  = DateTime.UtcNow;
            if (!string.IsNullOrEmpty(habitUpdate.UrlImage))
                habit.UrlImage = habitUpdate.UrlImage;
            if(habitUpdate.DaysOfWeek.Count != 0)
                habit.DaysOfWeek = _dataContext.DaysOfTheWeek.Where(d => habitUpdate.DaysOfWeek.Contains(d.Id)).ToList();

            _dataContext.Habits.Update(habit);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
