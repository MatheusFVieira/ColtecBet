namespace ColtecBet.Api.Data;

using Microsoft.EntityFrameworkCore;
using ColtecBet.Api.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Partida> Partidas { get; set; }
    public DbSet<Aposta> Apostas { get; set; }
}