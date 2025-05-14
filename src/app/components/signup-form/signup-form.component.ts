import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  username: string = '';
  password: string = '';
  profilePicUrl: string = '';
  confirmPassword: string = '';
  termsCheckbox: boolean = false;
  errorMsg: string = '';

  isSubmitting: boolean = false;

  constructor(private authService: AuthService) {}

  @Output() toggleForms = new EventEmitter<void>();
  onToggleEmitt() {
    this.toggleForms.emit();
  }

  onSubmit() {
    this.isSubmitting = true;

    if (!this.username || !this.password || !this.confirmPassword) {
      this.isSubmitting = false;
      this.errorMsg = 'Nome, senha e confirmação de senha sao obrigatórios';
      return;
    }

    if (!(this.password === this.confirmPassword)) {
      this.isSubmitting = false;
      this.errorMsg = 'A confirmação de senha não confere';
      return;
    }

    const userData = {
      username: this.username,
      password: this.password,
      profilePicUrl: this.profilePicUrl,
    };

    this.authService.register(userData).subscribe({
      error: (e) => {
        this.isSubmitting = false;
        if (e.status === 422) {
          this.errorMsg = 'Nome de usuário já está em uso. Escolha outro';
          return;
        }
        this.errorMsg = 'Erro no cadastro. Por favor, tente novamente';
      },
    });
  }
}
