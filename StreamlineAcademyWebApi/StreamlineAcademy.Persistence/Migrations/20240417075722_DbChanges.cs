using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class DbChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentSchedules_Schedules_StudentId",
                table: "StudentSchedules");

            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("8443cf26-85cb-4dab-8d26-22382ac3da05"));

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("5a139f79-48b3-4e23-b7cf-b992fa04aab7"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 17, 13, 27, 21, 844, DateTimeKind.Unspecified).AddTicks(1739), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 17, 13, 27, 21, 844, DateTimeKind.Unspecified).AddTicks(1779), new TimeSpan(0, 5, 30, 0, 0)), "amir", "TFOlP9hEeMPkHNwOCpVFGnGu3zZ2tbxDYVMK1X4gU+o=", "8997654556", "786545", "YVwNQ+xd1mj9Pqk4zJ4EWw==", null, (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_StudentSchedules_ScheduleId",
                table: "StudentSchedules",
                column: "ScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSchedules_Schedules_ScheduleId",
                table: "StudentSchedules",
                column: "ScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentSchedules_Schedules_ScheduleId",
                table: "StudentSchedules");

            migrationBuilder.DropIndex(
                name: "IX_StudentSchedules_ScheduleId",
                table: "StudentSchedules");

            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("5a139f79-48b3-4e23-b7cf-b992fa04aab7"));

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("8443cf26-85cb-4dab-8d26-22382ac3da05"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 17, 11, 47, 18, 224, DateTimeKind.Unspecified).AddTicks(8078), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 17, 11, 47, 18, 224, DateTimeKind.Unspecified).AddTicks(8117), new TimeSpan(0, 5, 30, 0, 0)), "amir", "UKc7n8QuGpdavFSsKZnWeSRDxfMifkYxmRL0K3/LEaI=", "8997654556", "786545", "HsOJiugeY5W1+OPT68JslQ==", null, (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_StudentSchedules_Schedules_StudentId",
                table: "StudentSchedules",
                column: "StudentId",
                principalTable: "Schedules",
                principalColumn: "Id");
        }
    }
}
