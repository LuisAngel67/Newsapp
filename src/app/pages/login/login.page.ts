import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared-module';
import { Storage } from 'src/app/services/storage';
import { ToastService } from 'src/app/services/toast';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: Storage,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastService.present('Please fill all required fields');
      return;
    }

    const users: User[] = this.storageService.get('users') || [];

    const user = users.find(
      (u: User) =>
        u.email === this.loginForm.value.email &&
        u.password === this.loginForm.value.password
    );

    if (!user) {
      this.toastService.present('Invalid email or password');
      return;
    }

    this.toastService.present(`Welcome ${user.name}!`, 1500, 'success');

    this.router.navigate(['/home']);
  }
}
