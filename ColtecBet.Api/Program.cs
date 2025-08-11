// Caminho: ColtecBet.Api/Program.cs

using ColtecBet.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// --- CÓDIGO DE DIAGNÓSTICO (PODE SER REMOVIDO DEPOIS) ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine("--- DIAGNÓSTICO DE CONEXÃO ---");
Console.WriteLine($"Connection String lida do ambiente: '{connectionString}'");
Console.WriteLine($"A Connection String é nula ou vazia? {string.IsNullOrEmpty(connectionString)}");
Console.WriteLine("--- FIM DO DIAGNÓSTICO ---");

// --- Configuração dos Serviços ---
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://coltec-bet.vercel.app") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            
            // --- ADICIONE ESTA LINHA ---
            // Tolera uma diferença de até 5 minutos nos relógios entre o gerador e o validador do token.
            ClockSkew = TimeSpan.FromMinutes(5)
        };
    });

// ... O resto do seu Program.cs continua igual ...
builder.Services.AddHttpClient();
builder.Services.AddControllers().AddJsonOptions(o => o.JsonSerializerOptions.PropertyNamingPolicy = null); // Ajuste para PascalCase
builder.Services.AddDbContext<ApplicationDbContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// ...