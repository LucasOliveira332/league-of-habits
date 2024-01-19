using LeagueOfHabits.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LeagueOfHabits.Server.Data
{
    public class DataContext(DbContextOptions<DataContext> options) : IdentityDbContext<IdentityUser>(options)
    {
        public DbSet<Habit> Habits { get; set; }
        public DbSet<CompleteDay> CompleteDays { get; set; }
        public DbSet<DayOfTheWeek> DaysOfTheWeek { get; set; }
        public DbSet<Rank> Ranks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Habit>()
                .HasKey(h => h.Id);

            builder.Entity<Habit>()
                .HasOne(p => p.IdentityUser)
                .WithMany()
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<DayOfTheWeek>()
                .HasKey(d => d.Id);

            builder.Entity<Habit>()
                .HasMany(h => h.DaysOfWeek)
                .WithMany(d => d.Habits)
                .UsingEntity(j => j.ToTable("HabitDayOfTheWeek"));

            builder.Entity<Rank>()
                .HasKey(r => r.Id);

            builder.Entity<Habit>()
                .HasOne(h => h.Rank)
                .WithMany(r => r.Habits)
                .HasForeignKey(r => r.RankId);

            builder.Entity<CompleteDay>()
                .HasKey(d => d.Id);

            builder.Entity<CompleteDay>()
                .HasOne(d => d.Habit)
                .WithMany(h => h.CompleteDays)
                .HasForeignKey(d => d.HabitId);

            base.OnModelCreating(builder);
        }
    }
}
