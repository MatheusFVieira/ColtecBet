# Estágio 1: Build
# Usa a imagem do SDK do .NET 8 para compilar a aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o arquivo .csproj primeiro para otimizar o cache do Docker
COPY ColtecBet.Api/ColtecBet.Api.csproj ./ColtecBet.Api/
RUN dotnet restore "./ColtecBet.Api/ColtecBet.Api.csproj"

# Copia o resto dos arquivos do projeto
COPY . .

# Entra na pasta da API e executa o 'publish'
WORKDIR "/src/ColtecBet.Api"
RUN dotnet publish "ColtecBet.Api.csproj" -c Release -o /app/publish

# Estágio 2: Final
# Usa a imagem menor do ASP.NET Runtime para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ColtecBet.Api.dll"]