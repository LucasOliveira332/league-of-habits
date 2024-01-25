using System.ComponentModel.DataAnnotations;

namespace LeagueOfHabits.Server.DTO
{
    public class HabitUpdateDTO
    {
        //[StringLength(100, ErrorMessage = "O campo Nome deve ter no máximo 100 caracteres.")]
        public string? Name { get; set; }
        //[StringLength(500, ErrorMessage = "O campo Descrição deve ter no máximo 500 caracteres.")]
        public string? Description { get; set; }
        public List<int>? DaysOfWeek { get; set; }
        //[Url(ErrorMessage = "O campo UrlImage deve ser uma URL válida.")]
        //[StringLength(500, ErrorMessage = "O campo Descrição deve ter no máximo 500 caracteres.")]
        public string? UrlImage { get; set; }
    }
}
