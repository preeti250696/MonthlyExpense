import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'departments',
    children:[{
      path:'',
      loadChildren: () => import('./departments/departments.module').then( m => m.DepartmentsPageModule)
    },
    {
      path: ':id',
      loadChildren: () => import('./add-department/add-department.module').then( m => m.AddDepartmentPageModule)
    }
    ]
    ,canLoad: [AuthGuard]
  } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
