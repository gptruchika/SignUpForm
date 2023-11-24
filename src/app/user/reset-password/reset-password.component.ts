import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  randomPassword: string | undefined;

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private userdata: UserdataService, private route:Router) {
    this.changePasswordForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmNewPassword: ['', Validators.required,this.passwordMatchValidator],
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.changePasswordForm.get('password')?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }
  
  onSubmit() {
    if (this.changePasswordForm.valid) {
      const username = this.changePasswordForm.get('username')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;

      this.userdata.changePassword(username, newPassword).subscribe(
        success => {
          if (success) {
            alert('Password changed successfully!');
            this.route.navigateByUrl('login');
          } else {
            alert('Failed to change password. Please check your Username.');
          }
        },
        error => {
          console.error('Error during password change:', error);
          alert('An error occurred during password change.');
        }
      );
    }
  }

  generateRandomPassword() {
    const length = 15;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    this.randomPassword = password;
  }
}
