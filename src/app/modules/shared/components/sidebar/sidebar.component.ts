import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private categoryService: CategoryService,
    private menuCtrl: MenuController,
    private router: Router
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
}
