import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { ToastService } from 'src/app/services/toast';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: false,
})
export class UserFormComponent implements OnInit {
  @Input() user!: User;
  @Input() countries: any[] = [];
  @Output() submitForm = new EventEmitter<any>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      country: [this.user.country, Validators.required],
      currentPassword: [''],
      newPassword: [''],
    });
  }

  get isFormInvalid(): boolean {
    const { currentPassword, newPassword, ...rest } = this.userForm.value;

    const requiredInvalid =
      this.userForm.get('name')?.invalid ||
      this.userForm.get('lastName')?.invalid ||
      this.userForm.get('email')?.invalid ||
      this.userForm.get('country')?.invalid;

    const passwordInvalid =
      (currentPassword && !newPassword) || (!currentPassword && newPassword);

    return requiredInvalid || passwordInvalid;
  }

  async onSubmit() {
    if (this.isFormInvalid) {
      await this.toastService.present('Please fill all required fields');
      return;
    }

    const { currentPassword, newPassword, ...rest } = this.userForm.value;

    const formData = { ...rest, currentPassword, newPassword };
    this.submitForm.emit(formData);
  }
}
