import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  constructor (private fb : FormBuilder, private router: Router, private userdata : UserdataService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.userdata.authenticate(username, password).subscribe(
        success => {
          if (success) {
            alert('Login successful!');
            this.router.navigateByUrl("/dashboard");
            // Optionally, navigate to a different page or perform other actions
          } else {
            alert('Invalid username or password.');
          }
        },
        error => {
          console.error('Error during authentication:', error);
          alert('An error occurred during authentication.');
        }
      );
    }
    
  }
}
