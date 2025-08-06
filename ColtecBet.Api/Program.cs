// Caminho do Arquivo: ColtecBet.Api/Program.cs

using ColtecBet.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models; // Necessário para a configuração do Swagger

// --- SEÇÃO DE CONFIGURAÇÃO INICIAL ---

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// --- SEÇÃO DE REGISTRO DE SERVIÇOS ---

// 1. Configuração do CORS
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

// 2. Configuração do HttpClientFactory
builder.Services.AddHttpClient();

// 3. Configuração da Autenticação JWT
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

// 4. Adiciona o serviço de Controllers
builder.Services.AddControllers();

// 5. Configuração do Banco de Dados (DbContext)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// 6. Configuração do Swagger com suporte para Autenticação
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Adiciona a definição de segurança para o Bearer Token (JWT)
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Insira 'Bearer' [espaço] e então o seu token no campo abaixo.\r\n\r\nExemplo: \"Bearer 12345abcdef\""
    });

    // Adiciona o requisito de segurança que usa a definição acima
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


// --- SEÇÃO DE BUILD DA APLICAÇÃO ---

var app = builder.Build();

// --- SEÇÃO DE CONFIGURAÇÃO DO PIPELINE HTTP ---

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

// A ordem é importante: Autenticação DEVE vir ANTES de Autorização.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();