// Dentro de Models/Usuario.cs
namespace ColtecBet.Api.Models;

public class Usuario
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? Email { get; set; }
    public string? SenhaHash { get; set; }
    public decimal Saldo { get; set; } = 100;
    
    // --- NOVA PROPRIEDADE AQUI ---
    public bool IsAdmin { get; set; } = false;
}