import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Storage } from 'src/app/services/storage';
import { ToastService } from 'src/app/services/toast';
import { EncryptService } from 'src/app/services/encrypt';
import { CountryService } from 'src/app/services/countryService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  countries: any[] = [];
  currentUser!: User;

  constructor(
    private storage: Storage,
    private toast: ToastService,
    private encryptService: EncryptService,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCountries();
    this.loadCurrentUser();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe({
      next: (res: any) => {
        this.countries = res.data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      },
      error: (err) => console.error(err),
    });
  }

  loadCurrentUser() {
    const users: User[] = this.storage.get('users') || [];
    this.currentUser = this.storage.get('currentUser') ||
      users[0] || {
        name: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
      };
  }

  async onSubmit(formData: any) {
    const users: User[] = this.storage.get('users') || [];
    const index = users.findIndex((u) => u.email === this.currentUser.email);

    if (index === -1) {
      await this.toast.present('User not found');
      return;
    }

    const { currentPassword, newPassword, ...rest } = formData;

    if (newPassword) {
      if (!currentPassword) {
        await this.toast.present(
          'You must enter your current password to set a new one'
        );
        return;
      }
      if (
        !this.encryptService.compare(currentPassword, this.currentUser.password)
      ) {
        await this.toast.present('Current password is incorrect');
        return;
      }
      users[index].password = this.encryptService.encrypt(newPassword);
    }

    users[index] = { ...users[index], ...rest };

    this.storage.set('users', users);
    this.storage.set('currentUser', users[index]);
    this.currentUser = users[index];

    await this.toast.present('Profile updated successfully', 1500, 'success');
    this.router.navigate(['/home']);
  }
  cancel() {
    this.router.navigate(['/home']);
  }
}
