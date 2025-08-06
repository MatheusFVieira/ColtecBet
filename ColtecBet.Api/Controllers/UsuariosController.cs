// Caminho do Arquivo: ColtecBet.Api/Controllers/UsuariosController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ColtecBet.Api.Data;
using ColtecBet.Api.Models;
using ColtecBet.Api.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ColtecBet.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public UsuariosController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/usuarios/registrar
        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar(UsuarioRegistroDto registroDto)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == registroDto.Email))
            {
                return BadRequest("Este e-mail já está em uso.");
            }

            var novoUsuario = new Usuario
            {
                Nome = registroDto.Nome,
                Email = registroDto.Email,
                SenhaHash = registroDto.Senha // Lembrete: Em produção, usaríamos hash aqui.
            };

            _context.Usuarios.Add(novoUsuario);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Usuário registrado com sucesso!" });
        }

        // POST: api/usuarios/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || user.SenhaHash != loginDto.Senha)
            {
                return BadRequest(new { Message = "Credenciais inválidas." });
            }

            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }
        
        // Método privado para gerar o Token JWT com as correções
        private string GenerateJwtToken(Usuario user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.Nome!),
                new Claim("saldo", user.Saldo.ToString()) // <-- ADICIONE ESTA LINHA
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}