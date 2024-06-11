import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademyComponent } from './academy.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreateCourseComponent } from './Pages/createcourse/createcourse.component';
import { CourseListComponent } from './Pages/course-list/course-list.component';
import { UpdateCourseComponent } from './Pages/update-course/update-course.component';
import { CreateCourseContentComponent } from './Pages/create-course-content/create-course-content.component';
import { CourseContentListComponent } from './Pages/course-content-list/course-content-list.component';
import { UpdateCourseContentComponent } from './Pages/update-course-content/update-course-content.component';
import { CreateCourseResourceComponent } from './pages/create-course-resource/create-course-resource.component';
import { CourseResourceListComponent } from './pages/course-resource-list/course-resource-list.component';
import { CreateBatchComponent } from './Pages/create-batch/create-batch.component';
import { AddLocationComponent } from './Pages/add-location/add-location.component';
import { LocationListComponent } from './Pages/location-list/location-list.component';
import { LocationMapComponent } from './pages/location-map/location-map.component';
import { UpdateLocationComponent } from './pages/update-location/update-location.component';
import { UpdateCorseResourceComponent } from './pages/update-corse-resource/update-corse-resource.component';
import { CreateInstructorComponent } from './pages/create-instructor/create-instructor.component';
import { InstructorListComponent } from './pages/instructor-list/instructor-list.component';
import { BatchListComponent } from './Pages/batch-list/batch-list.component';
import { UpdateInstructorComponent } from './pages/update-instructor/update-instructor.component';
import { UpdateBatchComponent } from './Pages/update-batch/update-batch.component';
import { ProfileComponent } from '../shared/Pages/profile/profile.component';
import { AddCourseCategoryComponent } from './Pages/add-course-category/add-course-category.component';
import { CourseCategoryListComponent } from './Pages/course-category-list/course-category-list.component';
import { ChangepasswordComponent } from '../shared/Pages/changepassword/changepassword.component';
import { AddBatchScheduleComponent } from './pages/add-batch-schedule/add-batch-schedule.component';
import { BatchScheduleListComponent } from './pages/batch-schedule-list/batch-schedule-list.component';
import { UpdateBatchScheduleComponent } from './pages/update-batch-schedule/update-batch-schedule.component';
import { RegisterStudentComponent } from './Pages/register-student/register-student.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { UpdateStudentComponent } from './Pages/update-student/update-student.component';
import { AssignedStudentsComponent } from './Pages/assigned-students/assigned-students.component';
import { AssinStudentBatchComponent } from './Pages/assin-student-batch/assin-student-batch.component';
import { AuthGuard } from '../shared/auth.guard';


const routes: Routes = [
  {path:"",component:AcademyComponent,canActivate:[AuthGuard],
  children:[
    {path:"",redirectTo:"dashboard",pathMatch:"full"},
    {path:"dashboard",component:DashboardComponent},
    {path:"create-course",component:CreateCourseComponent},
    {path:"course-list",component:CourseListComponent},
    {path:"update-course/:id",component:UpdateCourseComponent},
    {path:"create-course-content/:id",component:CreateCourseContentComponent},
    {path:"course-content-list/:id",component:CourseContentListComponent},
    {path:"update-course-content/:id/:courseId",component:UpdateCourseContentComponent},
    {path:"create-course-resource/:id",component:CreateCourseResourceComponent},
    {path:"course-resource-list/:id",component:CourseResourceListComponent},
    {path:"create-batch/:courseId",component:CreateBatchComponent},
    {path:"add-location",component:AddLocationComponent},
    {path:"location-list",component:LocationListComponent},
    {path:"location-map/:latitude/:longitude",component:LocationMapComponent},
    {path:"update-location/:id",component:UpdateLocationComponent},
    {path:"update-course-resource/:resourceId/:courseId",component:UpdateCorseResourceComponent},
    {path:"create-instructor",component:CreateInstructorComponent},
    {path:"instructor-list",component:InstructorListComponent},
    {path:"batch-list/:courseId",component:BatchListComponent},
    {path:"create-instructor",component:CreateInstructorComponent},
    {path:"instructor-list",component:InstructorListComponent},
    {path:"update-course-resource/:resourceId/:courseId",component:UpdateCorseResourceComponent},
    { path:"update-instructor/:id", component: UpdateInstructorComponent },
    {path:"update-batch/:batchId/:courseId",component:UpdateBatchComponent},
    {path:"update-course-resource/:resourceId/:courseId",component:UpdateCorseResourceComponent},
    {path:"create-instructor",component:CreateInstructorComponent},
    {path:"instructor-list",component:InstructorListComponent},
    {path:"batch-list/:courseId",component:BatchListComponent},
    {path:"myProfile",component:ProfileComponent},
    {path:"add-course-category",component:AddCourseCategoryComponent},
    {path:"course-category-list",component:CourseCategoryListComponent},
    {path:"change-password/:userRole",component:ChangepasswordComponent},
    {path:"add-batch-schedule/:id/:cId",component:AddBatchScheduleComponent},
    {path:"batch-schedule-list/:id/:courseId",component:BatchScheduleListComponent},
    {path:"update-batch-schedule/:id/:batchId/:courseId",component:UpdateBatchScheduleComponent},
    {path:"register-student",component:RegisterStudentComponent},
    {path:"student-list",component:StudentListComponent},
    {path:"update-student/:id",component:UpdateStudentComponent},
    {path:"assigned-students/:batchId",component:AssignedStudentsComponent},
    {path:"assign-batch/:batchId/:courseId",component:AssinStudentBatchComponent}
  ]
  
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
