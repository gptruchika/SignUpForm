import { Component} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';
import { CanComponentDeactivate } from 'src/app/auth/can-deactivate.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements CanComponentDeactivate {
  signupForm: FormGroup;


  constructor(private fb: FormBuilder ,private router: Router, private userdata : UserdataService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['',[Validators.required,this.validatePhoneNumber]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required],
    });
  }

  canDeactivate(): boolean {
    if(this.signupForm.dirty)
    return confirm('Do you really want to leave?');
    else
    return true;
  }

  validatePhoneNumber(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneNumber = control.value;
    const valid = /^\d{10}$/.test(phoneNumber);
    return valid ? null : { 'invalidPhoneNumber': true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const name = this.signupForm.get('name')?.value;
      const email = this.signupForm.get('email')?.value;
      const phoneNumber = this.signupForm.get('phoneNumber')?.value;
      const password = this.signupForm.get('password')?.value;

      this.userdata.signup(name,email,phoneNumber,password).subscribe(
        success => {
          if (success) {
            alert('Signup successful!');
            this.router.navigateByUrl("/login");
            // Optionally, navigate to the login page or perform other actions
          } else {
            alert('Username already exists. Please choose a different username.');
          }
        },
        error => {
          console.error('Error during signup:', error);
          alert('An error occurred during signup.');
        }
      );
      
    } else {
      this.validateAllFormFields(this.signupForm);
    }
    
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)!;
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  // Helper method to check if a field has an error
  isFieldInvalid(field: string) {
    const control = this.signupForm.get(field)!;
    return control.invalid && control.touched;
  }

}
