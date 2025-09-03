import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '../services/storage';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.storage.get('currentUser');
    const currentUrl = this.router.url;

    if (currentUser) {
      if (currentUrl !== '/home') {
        this.router.navigate(['/home']);
      }
      return false;
    }
    return true;
  }
}
