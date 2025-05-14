import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.showUserInfo();
  }

  showUserInfo() {
    const username = this.authService.currentUser()?.username;

    if (username) {
      this.userService.getUserByUsername(username).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: () => console.error('Erro ao carregar informações do usuário'),
      });
    }
  }

  logout(): void {
    return this.authService.logout();
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }

  goToProfilePage(): void {
    this.router.navigate(['/profile']);
  }
}
