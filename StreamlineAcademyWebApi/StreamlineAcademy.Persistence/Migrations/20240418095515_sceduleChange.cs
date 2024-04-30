using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class sceduleChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("94eb880e-e530-4411-b623-30abe172c839"));

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "ContentName",
                table: "CourseContents");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "CourseContents",
                newName: "DurationInHours");

            migrationBuilder.AddColumn<Guid>(
                name: "CourseContentId",
                table: "Schedules",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Date",
                table: "Schedules",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DurationInHours",
                table: "Schedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("7730b956-98ef-4212-bde0-24c2dd3466f6"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 15, 25, 13, 856, DateTimeKind.Unspecified).AddTicks(6706), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 15, 25, 13, 856, DateTimeKind.Unspecified).AddTicks(6744), new TimeSpan(0, 5, 30, 0, 0)), "amir", "2KaMItl1N0phZQToYYXLGgR4Anq5I/ss/4rii5klU+o=", "8997654556", "786545", "2WMjjk2+t8owQ/6EXPH3Ug==", null, (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_CourseContentId",
                table: "Schedules",
                column: "CourseContentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_CourseContents_CourseContentId",
                table: "Schedules",
                column: "CourseContentId",
                principalTable: "CourseContents",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_CourseContents_CourseContentId",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_CourseContentId",
                table: "Schedules");

            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("7730b956-98ef-4212-bde0-24c2dd3466f6"));

            migrationBuilder.DropColumn(
                name: "CourseContentId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "DurationInHours",
                table: "Schedules");

            migrationBuilder.RenameColumn(
                name: "DurationInHours",
                table: "CourseContents",
                newName: "Duration");

            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "Schedules",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "EndTime",
                table: "Schedules",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "Schedules",
                type: "time",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContentName",
                table: "CourseContents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("94eb880e-e530-4411-b623-30abe172c839"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 11, 41, 32, 49, DateTimeKind.Unspecified).AddTicks(7924), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 11, 41, 32, 49, DateTimeKind.Unspecified).AddTicks(7959), new TimeSpan(0, 5, 30, 0, 0)), "amir", "UQzs28V5Ilc0c/hAMQyc8LhMBeNwR4+VyEzhcK5G1kk=", "8997654556", "786545", "gCnXRas2igLbJfXf+wuS3g==", null, (byte)1 });
        }
    }
}
