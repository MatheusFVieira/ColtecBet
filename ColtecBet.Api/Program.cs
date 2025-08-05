// 1. Usings corretos no topo do arquivo
using ColtecBet.Api.Data;
using Microsoft.EntityFrameworkCore;

// 2. Criação do "construtor" da aplicação
var builder = WebApplication.CreateBuilder(args);

// 3. Registro dos serviços no container de injeção de dependência

// Adiciona os serviços para a API (Controllers)
builder.Services.AddControllers();

// Registro do DbContext (a ponte com o Banco de Dados)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


// Adiciona os serviços do Swagger para documentação da API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 4. Seção de build da aplicação
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// 5. Configuração do pipeline de requisições HTTP
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// 6. Execução da aplicação
app.Run();