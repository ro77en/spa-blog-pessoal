import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { forkJoin } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    BaseChartDirective,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  errorMsg: string = '';
  isLoaded: boolean = false;
  users: User[] = [];
  posts: Post[] = [];
  categories: Category[] = [];

  topUser?: User;
  topUserPosts: number = 0;

  topCategory?: Category;
  topCategoryPosts: number = 0;

  selectedView: 'user' | 'category' = 'user';

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Quantidade de postagens',
        data: [],
        backgroundColor: '#3f51b5',
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          precision: 0,
        },
      },
    },
  };

  @Output() loaded = new EventEmitter<void>();

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    forkJoin({
      posts: this.postService.getPosts(),
      users: this.userService.getUsers(),
      categories: this.categoryService.getCategories(),
    }).subscribe({
      next: ({ posts, users, categories }) => {
        this.posts = posts;
        this.users = users;
        this.categories = categories;
        this.prepareChartsData();
        this.isLoaded = true;
        this.loaded.emit();
      },
      error: (e) => {
        this.errorMsg = 'Erro ao carregar dados';
        console.error('Erro ao buscar dados', e);
        this.loaded.emit();
      },
    });
  }

  private generateColors(count: number): string[] {
    const colors: string[] = [];

    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }

    return colors;
  }

  private getTopUser() {
    const userPostCounts = this.users.map((u) => ({
      user: u,
      count: this.posts.filter((p) => p.user.id === u.id).length,
    }));
    const topUserData = userPostCounts.sort((a, b) => b.count - a.count)[0];
    this.topUser = topUserData?.user;
    this.topUserPosts = topUserData?.count ?? 0;
  }

  private getTopCategory() {
    const categoryPostCounts = this.categories.map((c) => ({
      category: c,
      count: this.posts.filter((p) => p.category.title === c.title).length,
    }));
    const topCategoryData = categoryPostCounts.sort(
      (a, b) => b.count - a.count
    )[0];
    this.topCategory = topCategoryData?.category;
    this.topCategoryPosts = topCategoryData?.count ?? 0;
  }

  onViewChange() {
    this.prepareChartsData();
  }

  prepareChartsData() {
    let labels: string[] = [];
    let data: number[] = [];

    if (this.selectedView === 'user') {
      labels = this.users.map((u) => u.username);
      data = this.users.map(
        (u) => this.posts.filter((p) => p.user.id === u.id).length
      );
    }

    if (this.selectedView === 'category') {
      const categories = [...new Set(this.posts.map((p) => p.category.title))];
      labels = this.categories.map((c) => c.title);
      data = categories.map(
        (category) =>
          this.posts.filter((p) => p.category.title === category).length
      );
    }

    this.chartData.labels = labels;
    this.chartData.datasets[0].data = data;
    this.chartData.datasets[0].backgroundColor = this.generateColors(
      labels.length
    );
    this.getTopUser();
    this.getTopCategory();

    this.chart?.update();
  }
}
