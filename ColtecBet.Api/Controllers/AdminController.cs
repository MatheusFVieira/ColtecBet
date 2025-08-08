// Caminho: ColtecBet.Api/Controllers/AdminController.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ColtecBet.Api.Data;
using ColtecBet.Api.DTOs;
using ColtecBet.Api.Models;

namespace ColtecBet.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")] 
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("encerrar-partida/{partidaId}")]
        public async Task<IActionResult> EncerrarPartida(int partidaId, [FromBody] EncerrarPartidaDto encerrarPartidaDto)
        {
            var partida = await _context.Partidas.FindAsync(partidaId);
            if (partida == null) return NotFound("Partida não encontrada.");
            if (partida.Encerrada) return BadRequest("Esta partida já foi encerrada.");

            partida.Encerrada = true;
            partida.Resultado = encerrarPartidaDto.Resultado;

            var apostasDaPartida = await _context.Apostas
                                                .Where(a => a.IdPartida == partidaId)
                                                .Include(a => a.Usuario)
                                                .ToListAsync();

            foreach (var aposta in apostasDaPartida)
            {
                if (aposta.Usuario == null) continue; // Verificação para remover o aviso

                if (aposta.Escolha == partida.Resultado)
                {
                    decimal oddGanha = 0;
                    if (aposta.Escolha == "CASA") oddGanha = partida.OddCasa;
                    else if (aposta.Escolha == "EMPATE") oddGanha = partida.OddEmpate;
                    else if (aposta.Escolha == "VISITANTE") oddGanha = partida.OddVisitante;

                    var ganho = aposta.Valor * oddGanha;
                    aposta.Usuario.Saldo += ganho;
                    aposta.Status = "GANHOU";
                    aposta.ValorRetorno = ganho;
                }
                else
                {
                    aposta.Status = "PERDEU";
                    aposta.ValorRetorno = 0;
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { Message = $"Partida {partida.TimeCasa} vs {partida.TimeVisitante} encerrada com sucesso. {apostasDaPartida.Count} apostas foram processadas." });
        }
    }
}