// Dentro de DTOs/CriarApostaDto.cs
namespace ColtecBet.Api.DTOs;

public class CriarApostaDto
{
    public int PartidaId { get; set; }
    public string Escolha { get; set; } // "CASA", "EMPATE" ou "VISITANTE"
    public decimal Valor { get; set; }
}