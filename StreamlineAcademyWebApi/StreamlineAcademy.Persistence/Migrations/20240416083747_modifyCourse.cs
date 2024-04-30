using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class modifyCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instructors_Academies_AcademyId",
                table: "Instructors");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentInterests_Students_StudentId",
                table: "StudentInterests");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Academies_AcademyId",
                table: "Students");
           

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("19b0591c-97f2-48b1-8e88-414b01f583ea"));

            migrationBuilder.AlterColumn<Guid>(
                name: "AcademyId",
                table: "Students",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "StudentId",
                table: "StudentInterests",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "AcademyId",
                table: "Instructors",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateTable(
                name: "CourseContents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaskName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Discription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("PK_CourseContents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseContents_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("dd927788-90c5-474a-bb22-7e36e6e99d35"), "Hsr,Bangalore", new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 16, 14, 7, 46, 754, DateTimeKind.Unspecified).AddTicks(658), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 16, 14, 7, 46, 754, DateTimeKind.Unspecified).AddTicks(686), new TimeSpan(0, 5, 30, 0, 0)), "amir", "TflI97S8bmE/ghLHyajeDTUQgwNgqo5siT+nZ3L4yQA=", "8997654556", "786545", "", null, "biuLolmFmKTblRvIIWAHEw==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_CourseContents_CourseId",
                table: "CourseContents",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Instructors_Academies_AcademyId",
                table: "Instructors",
                column: "AcademyId",
                principalTable: "Academies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentInterests_Students_StudentId",
                table: "StudentInterests",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Academies_AcademyId",
                table: "Students",
                column: "AcademyId",
                principalTable: "Academies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Instructors_Academies_AcademyId",
                table: "Instructors");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentInterests_Students_StudentId",
                table: "StudentInterests");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Academies_AcademyId",
                table: "Students");

            migrationBuilder.DropTable(
                name: "CourseContents");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("dd927788-90c5-474a-bb22-7e36e6e99d35"));

            migrationBuilder.AlterColumn<Guid>(
                name: "AcademyId",
                table: "Students",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "StudentId",
                table: "StudentInterests",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "AcademyId",
                table: "Instructors",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "PostalCode", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("19b0591c-97f2-48b1-8e88-414b01f583ea"), "Hsr,Bangalore", new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 40, 10, 132, DateTimeKind.Unspecified).AddTicks(8961), new TimeSpan(0, 5, 30, 0, 0)), new Guid("00000000-0000-0000-0000-000000000000"), null, "aamir@anterntech.com", true, new Guid("00000000-0000-0000-0000-000000000000"), new DateTimeOffset(new DateTime(2024, 4, 15, 14, 40, 10, 132, DateTimeKind.Unspecified).AddTicks(8998), new TimeSpan(0, 5, 30, 0, 0)), "amir", "NQzE3gyUaE268ckqs6pzknq8o8EvTidwBRLkmm/EZuw=", "8997654556", "786545", "", null, "kvAAdegX2OWG/1TMiuUdmw==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_Instructors_Academies_AcademyId",
                table: "Instructors",
                column: "AcademyId",
                principalTable: "Academies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
        }
    }
}
