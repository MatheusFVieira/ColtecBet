# Etapa base com o runtime do .NET 8
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 10000

# Etapa de build com o SDK do .NET 8
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o arquivo .csproj e faz restore
COPY ["ColtecBet.Api/ColtecBet.Api.csproj", "ColtecBet.Api/"]
RUN dotnet restore "ColtecBet.Api/ColtecBet.Api.csproj"

# Copia todo o restante do código
COPY . .

# Publica o projeto
WORKDIR "/src/ColtecBet.Api"
RUN dotnet publish "ColtecBet.Api.csproj" -c Release -o /app/publish

# Etapa final: roda a aplicação publicada
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ColtecBet.Api.dll"]
