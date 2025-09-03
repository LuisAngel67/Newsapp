import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from 'src/app/services/storage';
import { ToastService } from 'src/app/services/toast';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent {
  categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  menuItems = [
    {
      label: 'Update Profile',
      icon: 'person-circle',
      route: '/profile',
    },
  ];

  constructor(
    private storage: Storage,
    private categoryService: CategoryService,
    private menuCtrl: MenuController,
    private router: Router,
    private toast: ToastService
  ) {}

  selectCategory(cat: string) {
    this.categoryService.setCategory(cat);
    this.menuCtrl.close();
  }

  navigate(item: any) {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  logout() {
    this.storage.remove('currentUser');

    this.toast.present('Logged out successfully', 1500, 'success');

    this.router.navigate(['/login']);
  }
}
