// Dentro de DTOs/EncerrarPartidaDto.cs
namespace ColtecBet.Api.DTOs;

public class EncerrarPartidaDto
{
    // O resultado pode ser "CASA", "EMPATE" ou "VISITANTE"
    public string Resultado { get; set; }
}