// Caminho: ColtecBet.Api/DTOs/CriarApostaDto.cs
namespace ColtecBet.Api.DTOs;

public class CriarApostaDto
{
    public int PartidaId { get; set; }
    public string? Escolha { get; set; } // Propriedade agora é anulável
    public decimal Valor { get; set; }
}