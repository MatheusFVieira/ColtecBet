namespace ColtecBet.Api.DTOs;

public class CriarPartidaDto
{
    public string? TimeCasa { get; set; }
    public string? TimeVisitante { get; set; }
    public DateTime DataPartida { get; set; }
    public decimal OddCasa { get; set; }
    public decimal OddEmpate { get; set; }
    public decimal OddVisitante { get; set; }
}