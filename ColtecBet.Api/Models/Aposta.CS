public class Aposta
{
    public int Id { get; set; }
    public int IdUsuario { get; set; }
    public int IdPartida { get; set; }
    public string Escolha { get; set; } // 'CASA', 'EMPATE', 'VISITANTE'
    public decimal Valor { get; set; }
    public string Status { get; set; } = "AGUARDANDO"; // 'AGUARDANDO', 'GANHOU', 'PERDEU'
    public decimal ValorRetorno { get; set; } = 0;

    // Propriedades de Navegação (para o EF Core entender a relação)
    public Usuario Usuario { get; set; }
    public Partida Partida { get; set; }
}