using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class superAdminChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("7730b956-98ef-4212-bde0-24c2dd3466f6"));

            migrationBuilder.DropColumn(
                name: "Address",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "DeletedDate",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "Salt",
                table: "SuperAdmins");

            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "SuperAdmins");

            migrationBuilder.AddForeignKey(
                name: "FK_SuperAdmins_Users_Id",
                table: "SuperAdmins",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SuperAdmins_Users_Id",
                table: "SuperAdmins");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "SuperAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedBy",
                table: "SuperAdmins",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "SuperAdmins",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "SuperAdmins",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DeletedDate",
                table: "SuperAdmins",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "SuperAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "SuperAdmins",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "ModifiedBy",
                table: "SuperAdmins",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "ModifiedDate",
                table: "SuperAdmins",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "SuperAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "SuperAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "SuperAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "SuperAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Salt",
                table: "SuperAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "UserRole",
                table: "SuperAdmins",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("7730b956-98ef-4212-bde0-24c2dd3466f6"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 15, 25, 13, 856, DateTimeKind.Unspecified).AddTicks(6706), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 18, 15, 25, 13, 856, DateTimeKind.Unspecified).AddTicks(6744), new TimeSpan(0, 5, 30, 0, 0)), "amir", "2KaMItl1N0phZQToYYXLGgR4Anq5I/ss/4rii5klU+o=", "8997654556", "786545", "2WMjjk2+t8owQ/6EXPH3Ug==", null, (byte)1 });
        }
    }
}
