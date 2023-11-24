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
      this.router.navigate(['/login']);
      return false;
    }
  }
}
