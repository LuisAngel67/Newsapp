import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared-module';
import { CountryService } from 'src/app/services/countryService';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  countries: any[] = [];
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.loadCountries();
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      country: ['', Validators.required],
    });
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
}
