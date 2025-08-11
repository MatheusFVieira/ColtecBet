// Caminho: ColtecBet.Api/Program.cs

using ColtecBet.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// --- Configuração dos Serviços ---

// 1. CORS (Cross-Origin Resource Sharing) - VERSÃO FINAL E ROBUSTA
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:5173", "https://coltec-bet.vercel.app") 
                                .AllowAnyHeader() // Permite qualquer cabeçalho
                                .AllowAnyMethod(); // Permite qualquer método (GET, POST, etc.)
                      });
});

// 2. Autenticação, HttpClient, etc...
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { /* ... sua configuração JWT ... */ });
builder.Services.AddHttpClient();

// 3. Controllers com configuração para camelCase
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
});

// 4. Conexão com o Banco de Dados PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// 5. Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => { /* ... sua configuração Swagger ... */ });

// --- Construção da Aplicação ---
var app = builder.Build();

// Migração Automática...
using (var scope = app.Services.CreateScope())
{
    // ... seu código de migração ...
}

// --- Configuração do Pipeline de Requisições HTTP ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // Mantenha comentado

// A ordem é importante! UseCors() deve vir antes de UseAuthentication/UseAuthorization
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// --- Execução da Aplicação ---
app.Run();