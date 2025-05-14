import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent {
  @Input({ required: true })
  userInfo: User | null = null;

  username: string = '';
  password: string = '';
  profilePicUrl: string = '';

  isSubmitting: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.userInfo) {
      this.username = this.userInfo.username;
      this.password = this.userInfo.password;
      this.profilePicUrl = this.userInfo.profilePicUrl;
    }
  }

  onSubmit() {
    this.isSubmitting = true;

    const userId = this.userInfo?.id;

    if (!userId || !this.username || !this.password) {
      this.errorMsg = 'Todos os campos devem ser preenchidos';
      setTimeout(() => {
        this.errorMsg = '';
      }, 5000);
      this.isSubmitting = false;
      return;
    }

    const infoToUpdate = {
      username: this.username,
      password: this.password,
      profilePicUrl: this.profilePicUrl,
    };

    return this.userService.editUserInfo(userId, infoToUpdate).subscribe({
      next: () => {
        this.errorMsg = '';
        this.isSubmitting = false;
        this.successMsg = 'Informações de usuário alteradas com sucesso!';
        setTimeout(() => {
          this.successMsg = '';
        }, 5000);
      },
      error: (e) => {
        if (e.status === 400) {
          this.errorMsg = 'Já existe um usuário com este nome, escolha outro';
          return;
        }
        this.errorMsg =
          'Erro ao atualizar informações. Por favor, tente novamente';
      },
    });
  }
}
