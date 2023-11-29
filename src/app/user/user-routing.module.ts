
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CanDeactivateChildGuard } from '../auth/can-deactivate-child.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canDeactivate: [CanDeactivateChildGuard] },
  { path: 'signup', component: SignupComponent, canDeactivate: [CanDeactivateChildGuard]  },
  { path: 'resetPassword', component: ResetPasswordComponent, canDeactivate: [CanDeactivateChildGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
