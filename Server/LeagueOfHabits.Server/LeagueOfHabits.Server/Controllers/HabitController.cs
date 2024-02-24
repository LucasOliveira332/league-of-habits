using LeagueOfHabits.Server.Data;
using LeagueOfHabits.Server.DTO;
using LeagueOfHabits.Server.DTO.Response;
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
    public class HabitController(DataContext dataContext, HabitService habitService) : ControllerBase
    {
        private readonly DataContext _dataContext = dataContext;
        private readonly HabitService _habitService = habitService;

        [HttpGet, Authorize]
        public async Task<ActionResult<List<HabitCreateDTO>>> GetHabits()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) 
            { 
                return NotFound("User not found");
             }

            var habits = await _habitService.GetHabitsAsync(userId);

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
                StartDate = DateTime.Now.Date,
                LastUpdateDate = DateTime.Now.Date,
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
            var completeDays = new CompleteDay() { Data = DateTime.Now.Date, HabitId = id };

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
        [HttpGet("CompleteDays"), Authorize]
        public async Task<IActionResult> GetCheckdDays()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var completeDays = await _habitService.GetCompleteDaysAsync(userId);

            return Ok(completeDays);
        }

        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateHabit(int id, HabitUpdateDTO habitUpdate)
        {
            if (habitUpdate == null)
            {
                return BadRequest("InValid habit data");
            }

            var habit = habitUpdate.DaysOfWeek?.Count() > 0 
                ? await _habitService.GetHabitByIdIncludesDaysOfWeekAsync(id)
                : await _habitService.GetHabitById(id);

            if (habit == null)
            {
                return NotFound();
            }

            _habitService.UpdateHabitProperties(habit, habitUpdate);

            _dataContext.Habits.Update(habit);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
