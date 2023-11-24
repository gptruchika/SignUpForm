import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private users: { name: string; email: string ; phoneNumber:number ; password: string }[] = [];
  private isAuthenticatedFlag = false;

  authenticate(email: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.email === email && u.password === password);
    this.isAuthenticatedFlag = !!user;
    return of(this.isAuthenticatedFlag);
  }

  signup(name: string,email:string,phoneNumber:number, password: string): Observable<boolean> {
    const userExists = this.users.some(u => u.email === email);
    if (!userExists) {
      this.users.push({ name,email,phoneNumber, password });
      return of(true);
    } else {
      return of(false);
    }
  }

  changePassword(email: string, newPassword: string): Observable<boolean> {
    const userIndex = this.users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      this.users[userIndex].password = newPassword;
      return of(true);
    } else {
      return of(false);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  logout(): Observable<boolean> {
    this.isAuthenticatedFlag = false;
    return of(true);
  }
}
