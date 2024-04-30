using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class studentScedules : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("5c6f609b-b5f3-4d5f-b77d-d074868647bf"));

            migrationBuilder.AddColumn<Guid>(
                name: "CourseId",
                table: "Students",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StudentSchedules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StudentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ScheduleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    ModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentSchedules_Schedules_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Schedules",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StudentSchedules_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("8443cf26-85cb-4dab-8d26-22382ac3da05"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 17, 11, 47, 18, 224, DateTimeKind.Unspecified).AddTicks(8078), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 17, 11, 47, 18, 224, DateTimeKind.Unspecified).AddTicks(8117), new TimeSpan(0, 5, 30, 0, 0)), "amir", "UKc7n8QuGpdavFSsKZnWeSRDxfMifkYxmRL0K3/LEaI=", "8997654556", "786545", "HsOJiugeY5W1+OPT68JslQ==", null, (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_Students_CourseId",
                table: "Students",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentSchedules_StudentId",
                table: "StudentSchedules",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Courses_CourseId",
                table: "Students",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Courses_CourseId",
                table: "Students");

            migrationBuilder.DropTable(
                name: "StudentSchedules");

            migrationBuilder.DropIndex(
                name: "IX_Students_CourseId",
                table: "Students");

            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("8443cf26-85cb-4dab-8d26-22382ac3da05"));

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Students");

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("5c6f609b-b5f3-4d5f-b77d-d074868647bf"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 16, 14, 17, 12, 397, DateTimeKind.Unspecified).AddTicks(1575), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 16, 14, 17, 12, 397, DateTimeKind.Unspecified).AddTicks(1608), new TimeSpan(0, 5, 30, 0, 0)), "amir", "Rs/08JOS1y/pU6ojqAlhd8i7BwjOypHRCfevshCS47E=", "8997654556", "786545", "HJO0KsVQl51ntoLvE7aUbQ==", null, (byte)1 });
        }
    }
}
