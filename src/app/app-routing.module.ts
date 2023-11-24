import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { NotFoundComponent } from './page-not-found/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{ path: 'signup', component: SignupComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
