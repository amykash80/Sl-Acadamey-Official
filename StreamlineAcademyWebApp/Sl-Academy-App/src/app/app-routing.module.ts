import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",loadChildren:()=>import("./public/public.module").then(r=>r.PublicModule)},
  {path:"admin",loadChildren:()=>import('./admin/admin.module').then(r=>r.AdminModule)},
  {path:"academy",loadChildren:()=>import('./academy/academy.module').then(r=>r.AcademyModule)},
  {path:"instructor",loadChildren:()=>import('./instructor/instructor.module').then(r=>r.InstructorModule)},
  {path:"student",loadChildren:()=>import('./student/student.module').then(r=>r.StudentModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
