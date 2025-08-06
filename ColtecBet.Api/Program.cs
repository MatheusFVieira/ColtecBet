// Caminho do Arquivo: ColtecBet.Api/Program.cs

using ColtecBet.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// --- 1. Definições Iniciais ---
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);


// --- 2. Registro dos Serviços no Container ---

// Adiciona o serviço de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:5173") 
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// Adiciona o serviço de Autenticação com JWT
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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

// Novo: Adiciona o serviço para fazer requisições HTTP de forma otimizada
builder.Services.AddHttpClient();

// Adiciona os serviços para os Controllers da API
builder.Services.AddControllers();

// Adiciona o serviço do Entity Framework Core para o SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Adiciona os serviços do Swagger para documentação
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// --- 3. Build da Aplicação ---
var app = builder.Build();


// --- 4. Configuração do Pipeline de Requisições HTTP ---

// Configure o pipeline de requisições HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// A ordem destes é importante!
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication(); // <-- Garante que a aplicação entenda quem está fazendo a requisição

app.UseAuthorization(); // <-- Garante que a pessoa tem permissão para acessar o recurso


app.MapControllers();


// --- 5. Execução da Aplicação ---
app.Run();