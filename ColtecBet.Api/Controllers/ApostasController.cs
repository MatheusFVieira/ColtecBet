// Dentro de Controllers/ApostasController.cs

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
        // --- Passo 1: Identificar o usuário logado ---
        // Pegamos o ID do usuário diretamente do token JWT que ele nos enviou.
        // Isso garante que um usuário não pode fazer uma aposta em nome de outro.
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdString))
        {
            return Unauthorized(); // Token inválido ou não contém o ID
        }
        var userId = int.Parse(userIdString);

        // --- Passo 2: Buscar o usuário e a partida no banco de dados ---
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

        // --- Passo 3: Validar a lógica de negócio ---
        if (usuario.Saldo < criarApostaDto.Valor)
        {
            return BadRequest("Saldo insuficiente para realizar esta aposta.");
        }
        if (criarApostaDto.Valor <= 0)
        {
            return BadRequest("O valor da aposta deve ser positivo.");
        }


        // --- Passo 4: Processar a transação ---
        // Deduz o valor do saldo do usuário
        usuario.Saldo -= criarApostaDto.Valor;

        // Cria o novo registro de aposta
        var novaAposta = new Aposta
        {
            UsuarioId = userId, // USE THE RENAMED PROPERTY
            IdPartida = criarApostaDto.PartidaId,
            Escolha = criarApostaDto.Escolha,
            Valor = criarApostaDto.Valor,
            Status = "AGUARDANDO"
        };

        // Adiciona a nova aposta ao contexto
        await _context.Apostas.AddAsync(novaAposta);

        // Salva TODAS as alterações (atualização do saldo e nova aposta) no banco de dados
        await _context.SaveChangesAsync();

        // Retorna uma resposta de sucesso com o novo saldo do usuário
        return Ok(new { Message = "Aposta realizada com sucesso!", NovoSaldo = usuario.Saldo });
    }
}