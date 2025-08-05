// Dentro de Data/ApplicationDbContext.cs
namespace ColtecBet.Api.Data;

using Microsoft.EntityFrameworkCore;
using ColtecBet.Api.Models; // Importa nossos modelos

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    // Mapeia nossas classes para tabelas no banco de dados
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Partida> Partidas { get; set; }
    public DbSet<Aposta> Apostas { get; set; }
}