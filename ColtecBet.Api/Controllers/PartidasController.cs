// Caminho: ColtecBet.Api/Controllers/PartidasController.cs (VERSÃO DE DEPURAÇÃO)

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ColtecBet.Api.Data;
using ColtecBet.Api.Models;

namespace ColtecBet.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PartidasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PartidasController> _logger;

        // Adicionamos ILogger para podermos escrever no console de logs do Render
        public PartidasController(ApplicationDbContext context, ILogger<PartidasController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/partidas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partida>>> GetPartidas()
        {
            // --- CÓDIGO DE DIAGNÓSTICO ---
            _logger.LogInformation("--- DIAGNÓSTICO DO CONTROLLER DE PARTIDAS ---");
            try
            {
                // Loga a string de conexão que o DbContext está usando neste exato momento
                var connectionString = _context.Database.GetConnectionString();
                _logger.LogInformation("DbContext está usando a Connection String: {ConnString}", connectionString);

                // Temporariamente, vamos buscar TODAS as partidas, IGNORANDO O FILTRO 'Encerrada'
                _logger.LogInformation("Buscando TODAS as partidas do banco de dados, sem filtro...");
                var partidas = await _context.Partidas.ToListAsync();

                // Loga quantas partidas foram encontradas
                _logger.LogInformation("Partidas encontradas no banco: {Count}", partidas.Count);
                _logger.LogInformation("--- FIM DO DIAGNÓSTICO ---");

                return Ok(partidas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ocorreu uma exceção ao buscar as partidas.");
                return StatusCode(500, "Erro interno no servidor ao buscar partidas.");
            }
        }
    }
}