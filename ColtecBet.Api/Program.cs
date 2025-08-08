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

// 1. CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          // Lembre-se de adicionar a URL do seu Vercel aqui quando a tiver
                          policy.WithOrigins("https://coltec-bet.vercel.app", "http://localhost:5173") 
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// 2. Autenticação com Token JWT
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

// 3. HttpClientFactory
builder.Services.AddHttpClient();

// 4. Controllers da API
builder.Services.AddControllers();

// 5. Conexão com o Banco de Dados PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});


// 6. Swagger (Documentação da API)
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Insira 'Bearer' [espaço] e então o seu token no campo abaixo.\r\n\r\nExemplo: \"Bearer 12345abcdef\""
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


// --- Construção da Aplicação ---
var app = builder.Build();


// --- Migração Automática do Banco de Dados na Inicialização ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate(); // Aplica as migrações pendentes
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocorreu um erro durante a migração do banco de dados.");
    }
}


// --- Configuração do Pipeline de Requisições HTTP ---

app.UseSwagger();
app.UseSwaggerUI();
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// A linha abaixo foi comentada para compatibilidade com o proxy reverso do Render.
// O Render gerencia o SSL/HTTPS externamente.
// app.UseHttpsRedirection(); 

app.UseCors(MyAllowSpecificOrigins);

// A ordem é importante: Autenticação ANTES de Autorização
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// --- Execução da Aplicação ---
app.Run();