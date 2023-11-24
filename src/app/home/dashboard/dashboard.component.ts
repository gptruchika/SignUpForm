import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/user/userdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private userdata: UserdataService, private route:Router) {}

  logout() {
    this.userdata.logout().subscribe(
      success => {
        if (success) {
          this.route.navigateByUrl("login");
        } else {
          console.error('Logout failed.');
        }
      },
      error => {
        console.error('Error during logout:', error);
      }
    );
  }
}
