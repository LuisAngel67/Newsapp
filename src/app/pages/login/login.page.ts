import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginData = {
    email: '',
    password: '',
  };

  constructor() {}

  ngOnInit() {}
}
