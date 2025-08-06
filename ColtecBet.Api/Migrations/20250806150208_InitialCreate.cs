using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ColtecBet.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Partidas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TimeCasa = table.Column<string>(type: "TEXT", nullable: true),
                    TimeVisitante = table.Column<string>(type: "TEXT", nullable: true),
                    DataPartida = table.Column<DateTime>(type: "TEXT", nullable: false),
                    OddCasa = table.Column<decimal>(type: "TEXT", nullable: false),
                    OddEmpate = table.Column<decimal>(type: "TEXT", nullable: false),
                    OddVisitante = table.Column<decimal>(type: "TEXT", nullable: false),
                    Encerrada = table.Column<bool>(type: "INTEGER", nullable: false),
                    Resultado = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partidas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    SenhaHash = table.Column<string>(type: "TEXT", nullable: true),
                    Saldo = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Apostas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: false),
                    IdPartida = table.Column<int>(type: "INTEGER", nullable: false),
                    Escolha = table.Column<string>(type: "TEXT", nullable: true),
                    Valor = table.Column<decimal>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    ValorRetorno = table.Column<decimal>(type: "TEXT", nullable: false),
                    PartidaId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apostas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Apostas_Partidas_PartidaId",
                        column: x => x.PartidaId,
                        principalTable: "Partidas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Apostas_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Apostas_PartidaId",
                table: "Apostas",
                column: "PartidaId");

            migrationBuilder.CreateIndex(
                name: "IX_Apostas_UsuarioId",
                table: "Apostas",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Apostas");

            migrationBuilder.DropTable(
                name: "Partidas");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
