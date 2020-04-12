import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    if (!userName || !password) return;

    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true,
      };
      confirm('Admin login');
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false,
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}
