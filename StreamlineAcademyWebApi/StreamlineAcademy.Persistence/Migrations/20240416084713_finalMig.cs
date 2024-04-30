using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class finalMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("63c66225-9b42-4532-a2b9-6537f550319a"));

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("5c6f609b-b5f3-4d5f-b77d-d074868647bf"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 16, 14, 17, 12, 397, DateTimeKind.Unspecified).AddTicks(1575), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 16, 14, 17, 12, 397, DateTimeKind.Unspecified).AddTicks(1608), new TimeSpan(0, 5, 30, 0, 0)), "amir", "Rs/08JOS1y/pU6ojqAlhd8i7BwjOypHRCfevshCS47E=", "8997654556", "786545", "HJO0KsVQl51ntoLvE7aUbQ==", null, (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SuperAdmins",
                keyColumn: "Id",
                keyValue: new Guid("5c6f609b-b5f3-4d5f-b77d-d074868647bf"));

            migrationBuilder.InsertData(
                table: "SuperAdmins",
                columns: new[] { "Id", "Address", "CityId", "CountryId", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "Salt", "StateId", "UserRole" },
                values: new object[] { new Guid("63c66225-9b42-4532-a2b9-6537f550319a"), "Hsr,Bangalore", null, null, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 16, 14, 12, 13, 538, DateTimeKind.Unspecified).AddTicks(1218), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 16, 14, 12, 13, 538, DateTimeKind.Unspecified).AddTicks(1252), new TimeSpan(0, 5, 30, 0, 0)), "amir", "g/k0TogfzEtLMMpAa7AMsuD9DH0AH+3+IiZVsumSNyU=", "8997654556", "786545", "+IoA+Pmn8fFcp9X+mK09DA==", null, (byte)1 });
        }
    }
}
