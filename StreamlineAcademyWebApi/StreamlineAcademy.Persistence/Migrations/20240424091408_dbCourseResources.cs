using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreamlineAcademy.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class dbCourseResources : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseResource_Courses_CourseId",
                table: "CourseResource");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseResource",
                table: "CourseResource");

            migrationBuilder.RenameTable(
                name: "CourseResource",
                newName: "CourseResources");

            migrationBuilder.RenameIndex(
                name: "IX_CourseResource_CourseId",
                table: "CourseResources",
                newName: "IX_CourseResources_CourseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseResources",
                table: "CourseResources",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseResources_Courses_CourseId",
                table: "CourseResources",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseResources_Courses_CourseId",
                table: "CourseResources");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseResources",
                table: "CourseResources");

            migrationBuilder.RenameTable(
                name: "CourseResources",
                newName: "CourseResource");

            migrationBuilder.RenameIndex(
                name: "IX_CourseResources_CourseId",
                table: "CourseResource",
                newName: "IX_CourseResource_CourseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseResource",
                table: "CourseResource",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseResource_Courses_CourseId",
                table: "CourseResource",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
