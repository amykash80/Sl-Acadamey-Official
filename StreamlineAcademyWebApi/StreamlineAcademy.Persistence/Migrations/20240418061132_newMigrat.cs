using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class newMigrat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("b0721996-e453-4c3d-a258-9f69fe53eb5a"));

            migrationBuilder.CreateTable(
                name: "BatchStudent",
                columns: table => new
                {
                    StudentsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    batchesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatchStudent", x => new { x.StudentsId, x.batchesId });
                    table.ForeignKey(
                        name: "FK_BatchStudent_Batches_batchesId",
                        column: x => x.batchesId,
                        principalTable: "Batches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BatchStudent_Students_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("94eb880e-e530-4411-b623-30abe172c839"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 11, 41, 32, 49, DateTimeKind.Unspecified).AddTicks(7924), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 11, 41, 32, 49, DateTimeKind.Unspecified).AddTicks(7959), new TimeSpan(0, 5, 30, 0, 0)), "amir", "UQzs28V5Ilc0c/hAMQyc8LhMBeNwR4+VyEzhcK5G1kk=", "8997654556", "786545", "gCnXRas2igLbJfXf+wuS3g==", null, (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_BatchStudent_batchesId",
                table: "BatchStudent",
                column: "batchesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BatchStudent");

            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("94eb880e-e530-4411-b623-30abe172c839"));

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("b0721996-e453-4c3d-a258-9f69fe53eb5a"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 10, 59, 44, 656, DateTimeKind.Unspecified).AddTicks(7676), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 10, 59, 44, 656, DateTimeKind.Unspecified).AddTicks(7715), new TimeSpan(0, 5, 30, 0, 0)), "amir", "8g6WuDf2voGpCOY/ZLY9PWU3ehiQrfFb+7wuevWC02k=", "8997654556", "786545", "Blzv1O//aBrOoLuGScMuRw==", null, (byte)1 });
        }
    }
}
