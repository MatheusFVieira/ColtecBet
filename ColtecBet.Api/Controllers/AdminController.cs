// Dentro de Controllers/AdminController.cs

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
    // Proteção MÁXIMA: Só permite o acesso a este controller se o token JWT do usuário tiver a claim "role": "Admin".
    [Authorize(Roles = "Admin")] 
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/admin/encerrar-partida/5
        [HttpPost("encerrar-partida/{partidaId}")]
        public async Task<IActionResult> EncerrarPartida(int partidaId, [FromBody] EncerrarPartidaDto encerrarPartidaDto)
        {
            // --- Etapa 1: Encontrar a partida no banco de dados ---
            var partida = await _context.Partidas.FindAsync(partidaId);

            if (partida == null)
            {
                return NotFound("Partida não encontrada.");
            }

            if (partida.Encerrada)
            {
                return BadRequest("Esta partida já foi encerrada.");
            }

            // --- Etapa 2: Atualizar a partida com o resultado final ---
            partida.Encerrada = true;
            partida.Resultado = encerrarPartidaDto.Resultado;

            // --- Etapa 3: Encontrar TODAS as apostas feitas para esta partida ---
            var apostasDaPartida = await _context.Apostas
                                                .Where(a => a.IdPartida == partidaId)
                                                .Include(a => a.Usuario) // Incluímos o objeto Usuário para podermos atualizar o saldo
                                                .ToListAsync();

            // --- Etapa 4: Processar cada aposta (o "pagamento") ---
            foreach (var aposta in apostasDaPartida)
            {
                if (aposta.Escolha == partida.Resultado)
                {
                    // O usuário acertou a aposta!
                    decimal oddGanha = 0;
                    if (aposta.Escolha == "CASA") oddGanha = partida.OddCasa;
                    else if (aposta.Escolha == "EMPATE") oddGanha = partida.OddEmpate;
                    else if (aposta.Escolha == "VISITANTE") oddGanha = partida.OddVisitante;

                    var ganho = aposta.Valor * oddGanha;
                    aposta.Usuario.Saldo += ganho; // Adiciona o prêmio ao saldo do usuário
                    aposta.Status = "GANHOU";
                    aposta.ValorRetorno = ganho;
                }
                else
                {
                    // O usuário errou a aposta
                    aposta.Status = "PERDEU";
                    aposta.ValorRetorno = 0;
                }
            }

            // --- Etapa 5: Salvar TODAS as alterações no banco de dados ---
            // O SaveChanges() é "atômico": ou ele salva tudo (partida, apostas, saldos), ou não salva nada.
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Partida {partida.TimeCasa} vs {partida.TimeVisitante} encerrada com sucesso. {apostasDaPartida.Count} apostas foram processadas." });
        }
    }
}