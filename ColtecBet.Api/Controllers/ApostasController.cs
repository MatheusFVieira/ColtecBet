using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ColtecBet.Api.Data;
using ColtecBet.Api.Models;
using ColtecBet.Api.DTOs;

[Route("api/[controller]")]
[ApiController]
[Authorize] // Apenas usuários logados podem acessar
public class ApostasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ApostasController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST: api/apostas
    [HttpPost]
    public async Task<IActionResult> CriarAposta(CriarApostaDto criarApostaDto)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdString))
        {
            return Unauthorized();
        }
        var userId = int.Parse(userIdString);

        var usuario = await _context.Usuarios.FindAsync(userId);
        var partida = await _context.Partidas.FindAsync(criarApostaDto.PartidaId);

        if (usuario == null || partida == null)
        {
            return NotFound("Usuário ou partida não encontrados.");
        }

        if(partida.Encerrada)
        {
            return BadRequest("Esta partida já foi encerrada e não aceita mais apostas.");
        }

        if (usuario.Saldo < criarApostaDto.Valor)
        {
            return BadRequest("Saldo insuficiente para realizar esta aposta.");
        }
        if (criarApostaDto.Valor <= 0)
        {
            return BadRequest("O valor da aposta deve ser positivo.");
        }

        usuario.Saldo -= criarApostaDto.Valor;

        var novaAposta = new Aposta
        {
            UsuarioId = userId,
            IdPartida = criarApostaDto.PartidaId,
            Escolha = criarApostaDto.Escolha,
            Valor = criarApostaDto.Valor,
            Status = "AGUARDANDO"
        };

        await _context.Apostas.AddAsync(novaAposta);

        await _context.SaveChangesAsync();

        return Ok(new { Message = "Aposta realizada com sucesso!", NovoSaldo = usuario.Saldo });
    }
}