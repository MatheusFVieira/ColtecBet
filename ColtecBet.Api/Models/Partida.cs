public class Partida
{
    public int Id { get; set; }
    public string TimeCasa { get; set; }
    public string TimeVisitante { get; set; }
    public DateTime DataPartida { get; set; }
    public decimal OddCasa { get; set; }
    public decimal OddEmpate { get; set; }
    public decimal OddVisitante { get; set; }
    public bool Encerrada { get; set; } = false;
    public string? Resultado { get; set; }
}