import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { NotFoundComponent } from './page-not-found/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path: 'user',
  loadChildren: () => import('../app/user/user.module').then(mod => mod.UserModule),},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'user/signup', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
