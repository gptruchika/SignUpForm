import { CanActivate, Router} from '@angular/router';
import { UserdataService } from '../user/userdata.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private userdata: UserdataService, private router: Router) {}

  canActivate(): boolean {
    if (this.userdata.isAuthenticated()) {
      return true;
    } else {
      alert("Please login first");
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
