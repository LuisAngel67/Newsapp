import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { SharedModule } from 'src/app/modules/shared/shared-module';
import { CountryService } from 'src/app/services/countryService';
import { Storage } from 'src/app/services/storage';
import { ToastService } from 'src/app/services/toast';
import { EncryptService } from 'src/app/services/encrypt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  countries: any[] = [];
  registerForm!: FormGroup;
  emailExists: boolean = false;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private storageService: Storage,
    private toastService: ToastService,
    private encryptService: EncryptService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCountries();
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  loadCountries() {
    this.countryService.getCountries().subscribe({
      next: (res) => {
        this.countries = res.data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      },
      error: (err) => {
        console.error('Error cargando países:', err);
      },
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.saveUser();
    } else {
      console.log('Form is invalid');
      this.registerForm.markAllAsTouched();
    }
  }

  saveUser() {
    if (this.registerForm.invalid) {
      this.toastService.present('Please fill all required fields');
      return;
    }

    if (this.registerForm.errors?.['mismatch']) {
      this.toastService.present('Passwords do not match');
      return;
    }

    const users: User[] = this.storageService.get('users') || [];

    const emailExists = users.some(
      (u: User) => u.email === this.registerForm.value.email
    );
    if (emailExists) {
      this.toastService.present('This email is already registered');
      return;
    }

    const newUser: User = {
      name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName,
      country: this.registerForm.value.country,
      email: this.registerForm.value.email,
      password: this.encryptService.encrypt(this.registerForm.value.password),
    };

    users.push(newUser);
    this.storageService.set('users', users);

    this.toastService.present('User registered successfully', 1500, 'success');

    this.registerForm.reset();
    this.router.navigate(['/login']);
  }
}
