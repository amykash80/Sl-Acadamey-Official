import { Routes } from '@angular/router';

export const routes: Routes = [
{path:"",loadChildren:()=>import("./public/public.module").then(r=>r.PublicModule)},
];
