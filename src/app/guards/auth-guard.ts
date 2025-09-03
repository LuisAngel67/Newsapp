import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '../services/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.storage.get('currentUser');
    const currentUrl = this.router.url;

    if (!currentUser) {
      if (currentUrl !== '/login') {
        this.router.navigate(['/login']);
      }
      return false;
    }
    return true;
  }
}
