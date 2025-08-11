// Caminho do Arquivo: ColtecBet.Api/Controllers/PartidasController.cs (Versão Final com Banco Local)

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
        // Voltamos a injetar apenas o nosso DbContext
        private readonly ApplicationDbContext _context;

        public PartidasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/partidas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partida>>> GetPartidas()
        {
            // A lógica volta a ser simples, limpa e direta:
            // buscando as partidas não encerradas do nosso próprio banco de dados.
            var partidas = await _context.Partidas.Where(p => !p.Encerrada).ToListAsync();
            return Ok(partidas);
        }
    }
}