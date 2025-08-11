namespace ColtecBet.Api.Models;

public class Aposta
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public int IdPartida { get; set; }
    public string? Escolha { get; set; }
    public decimal Valor { get; set; }
    public string Status { get; set; } = "AGUARDANDO";
    public decimal ValorRetorno { get; set; } = 0;

    public Usuario? Usuario { get; set; }
    public Partida? Partida { get; set; }
}