import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, DashboardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  isLoading = true;

  onDashboardLoaded() {
    this.isLoading = false;
  }
}
