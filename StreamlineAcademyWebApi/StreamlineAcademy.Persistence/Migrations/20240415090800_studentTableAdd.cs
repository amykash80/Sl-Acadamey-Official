using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class studentTableAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Cities_CityId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_Countries_CountryId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_States_StateId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_Users_Id",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentInterests_Student_StudentId",
                table: "StudentInterests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Student",
                table: "Student");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("0a22949d-8e4f-41a2-bf8c-783b3aa96e08"));

            migrationBuilder.RenameTable(
                name: "Student",
                newName: "students");

            migrationBuilder.RenameIndex(
                name: "IX_Student_StateId",
                table: "students",
                newName: "IX_students_StateId");

            migrationBuilder.RenameIndex(
                name: "IX_Student_CountryId",
                table: "students",
                newName: "IX_students_CountryId");

            migrationBuilder.RenameIndex(
                name: "IX_Student_CityId",
                table: "students",
                newName: "IX_students_CityId");

            migrationBuilder.AddColumn<Guid>(
                name: "AcademyId",
                table: "students",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_students",
                table: "students",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("18a6a940-2c44-4452-ba57-6064f1a65f99"), "Hsr,Bangalore", new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 37, 59, 979, DateTimeKind.Unspecified).AddTicks(3128), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 37, 59, 979, DateTimeKind.Unspecified).AddTicks(3166), new TimeSpan(0, 5, 30, 0, 0)), "amir", "LckZo7cgycpAph1uyCD4APG50/NYM8LiwImDwQg+Q/4=", "8997654556", "786545", "", null, "dLuiVFesrME2NGKjH+8ivQ==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_students_AcademyId",
                table: "students",
                column: "AcademyId");

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
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_students_AcademyId",
                table: "students");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("18a6a940-2c44-4452-ba57-6064f1a65f99"));

            migrationBuilder.DropColumn(
                name: "AcademyId",
                table: "students");

            migrationBuilder.RenameTable(
                name: "students",
                newName: "Student");

            migrationBuilder.RenameIndex(
                name: "IX_students_StateId",
                table: "Student",
                newName: "IX_Student_StateId");

            migrationBuilder.RenameIndex(
                name: "IX_students_CountryId",
                table: "Student",
                newName: "IX_Student_CountryId");

            migrationBuilder.RenameIndex(
                name: "IX_students_CityId",
                table: "Student",
                newName: "IX_Student_CityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Student",
                table: "Student",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("0a22949d-8e4f-41a2-bf8c-783b3aa96e08"), "Hsr,Bangalore", new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 6, 29, 920, DateTimeKind.Unspecified).AddTicks(2129), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 6, 29, 920, DateTimeKind.Unspecified).AddTicks(2162), new TimeSpan(0, 5, 30, 0, 0)), "amir", "kzpIKd+CnYk0SJr/AA6/JARpLXpNv+ASVn1aJ308ki8=", "8997654556", "786545", "", null, "izLkrYWVsvta29V98cenxQ==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Cities_CityId",
                table: "Student",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Countries_CountryId",
                table: "Student",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_States_StateId",
                table: "Student",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Users_Id",
                table: "Student",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentInterests_Student_StudentId",
                table: "StudentInterests",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
