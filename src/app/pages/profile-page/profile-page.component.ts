import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, ProfileFormComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  isLoading: boolean = true;
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.getUserInfo();
  }

  getUserInfo() {
    const username = this.authService.currentUser()?.username;

    if (username) {
      this.userService.getUserByUsername(username).subscribe({
        next: (user) => {
          this.isLoading = false;
          this.user = user;
        },
        error: () => console.error('Erro ao carregar informações do usuário'),
      });
    }
  }
}
