using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class nameChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentInterests_students_StudentId",
                table: "StudentInterests");

            migrationBuilder.DropForeignKey(
                name: "FK_students_Academies_AcademyId",
                table: "students");

            migrationBuilder.DropForeignKey(
                name: "FK_students_Cities_CityId",
                table: "students");

            migrationBuilder.DropForeignKey(
                name: "FK_students_Countries_CountryId",
                table: "students");

            migrationBuilder.DropForeignKey(
                name: "FK_students_States_StateId",
                table: "students");

            migrationBuilder.DropForeignKey(
                name: "FK_students_Users_Id",
                table: "students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_students",
                table: "students");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("18a6a940-2c44-4452-ba57-6064f1a65f99"));

            migrationBuilder.RenameTable(
                name: "students",
                newName: "Students");

            migrationBuilder.RenameIndex(
                name: "IX_students_StateId",
                table: "Students",
                newName: "IX_Students_StateId");

            migrationBuilder.RenameIndex(
                name: "IX_students_CountryId",
                table: "Students",
                newName: "IX_Students_CountryId");

            migrationBuilder.RenameIndex(
                name: "IX_students_CityId",
                table: "Students",
                newName: "IX_Students_CityId");

            migrationBuilder.RenameIndex(
                name: "IX_students_AcademyId",
                table: "Students",
                newName: "IX_Students_AcademyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Students",
                table: "Students",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("19b0591c-97f2-48b1-8e88-414b01f583ea"), "Hsr,Bangalore", new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 40, 10, 132, DateTimeKind.Unspecified).AddTicks(8961), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 40, 10, 132, DateTimeKind.Unspecified).AddTicks(8998), new TimeSpan(0, 5, 30, 0, 0)), "amir", "NQzE3gyUaE268ckqs6pzknq8o8EvTidwBRLkmm/EZuw=", "8997654556", "786545", "", null, "kvAAdegX2OWG/1TMiuUdmw==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_StudentInterests_Students_StudentId",
                table: "StudentInterests",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Academies_AcademyId",
                table: "Students",
                column: "AcademyId",
                principalTable: "Academies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Cities_CityId",
                table: "Students",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Countries_CountryId",
                table: "Students",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_States_StateId",
                table: "Students",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_Id",
                table: "Students",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentInterests_Students_StudentId",
                table: "StudentInterests");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Academies_AcademyId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Cities_CityId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Countries_CountryId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_States_StateId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_Id",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Students",
                table: "Students");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("19b0591c-97f2-48b1-8e88-414b01f583ea"));

            migrationBuilder.RenameTable(
                name: "Students",
                newName: "students");

            migrationBuilder.RenameIndex(
                name: "IX_Students_StateId",
                table: "students",
                newName: "IX_students_StateId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_CountryId",
                table: "students",
                newName: "IX_students_CountryId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_CityId",
                table: "students",
                newName: "IX_students_CityId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_AcademyId",
                table: "students",
                newName: "IX_students_AcademyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_students",
                table: "students",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("18a6a940-2c44-4452-ba57-6064f1a65f99"), "Hsr,Bangalore", new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 37, 59, 979, DateTimeKind.Unspecified).AddTicks(3128), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 37, 59, 979, DateTimeKind.Unspecified).AddTicks(3166), new TimeSpan(0, 5, 30, 0, 0)), "amir", "LckZo7cgycpAph1uyCD4APG50/NYM8LiwImDwQg+Q/4=", "8997654556", "786545", "", null, "dLuiVFesrME2NGKjH+8ivQ==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_StudentInterests_students_StudentId",
                table: "StudentInterests",
                column: "StudentId",
                principalTable: "students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_students_Academies_AcademyId",
                table: "students",
                column: "AcademyId",
                principalTable: "Academies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_students_Cities_CityId",
                table: "students",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_students_Countries_CountryId",
                table: "students",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_students_States_StateId",
                table: "students",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_students_Users_Id",
                table: "students",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
