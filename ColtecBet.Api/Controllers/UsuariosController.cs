// Dentro de Controllers/UsuariosController.cs

using Microsoft.AspNetCore.Mvc;
using ColtecBet.Api.Data;
using ColtecBet.Api.Models;
using Microsoft.EntityFrameworkCore;
using ColtecBet.Api.DTOs;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UsuariosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST: api/usuarios/registrar
    [HttpPost("registrar")]
    public async Task<IActionResult> Registrar(UsuarioRegistroDto registroDto)
    {
        // Validação simples para ver se o email já existe
        if (await _context.Usuarios.AnyAsync(u => u.Email == registroDto.Email))
        {
            return BadRequest("Este e-mail já está em uso.");
        }

        var novoUsuario = new Usuario
        {
            Nome = registroDto.Nome,
            Email = registroDto.Email,
            // IMPORTANTE: Em um projeto real, aqui você faria o HASH da senha!
            // Nunca armazene senhas em texto plano.
            SenhaHash = registroDto.Senha // Simplificado para este exemplo
        };

        _context.Usuarios.Add(novoUsuario);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "Usuário registrado com sucesso!" });
    }
}