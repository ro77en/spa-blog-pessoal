import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from '../../components/signup-form/signup-form.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, CommonModule, SignupFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  isLogin: boolean = true;

  toggleForms() {
    this.isLogin = !this.isLogin;
  }
}
