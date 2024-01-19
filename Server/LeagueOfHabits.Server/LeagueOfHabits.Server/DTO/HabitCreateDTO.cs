using System.ComponentModel.DataAnnotations;

namespace LeagueOfHabits.Server.DTO
{
    public class HabitCreateDTO
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O campo Nome deve ter no máximo 100 caracteres.")]
        public required string Name { get; set; }
        [StringLength(500, ErrorMessage = "O campo Descrição deve ter no máximo 500 caracteres.")]
        public string? Description { get; set; }
        [Required(ErrorMessage = "O campo dias da semana é obrigatório.")]
        public required List<int> DaysOfWeek { get; set; }
        [Url(ErrorMessage = "O campo UrlImage deve ser uma URL válida.")]
        [StringLength(500, ErrorMessage = "O campo Descrição deve ter no máximo 500 caracteres.")]
        public string? UrlImage { get; set; }
    }
}
