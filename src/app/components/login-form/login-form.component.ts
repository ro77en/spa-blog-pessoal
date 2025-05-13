import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  termsCheckbox: boolean = false;
  errorMsg: string = '';
  isSubmitting: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.isSubmitting = true;

    if (!this.username || !this.password) {
      this.errorMsg = 'Por favor, preencha todos os campos';
      return;
    }

    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(loginData).subscribe({
      next: () => console.log('success!'),
      error: () => {
        this.errorMsg = 'Erro de autenticação. Verifique suas credenciais';
      },
    });
  }
}
