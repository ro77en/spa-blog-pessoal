import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewPostComponent } from '../../components/new-post/new-post.component';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    PostCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  isLoading: boolean = true;
  posts: Post[] = [];
  categories: Category[] = [];

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.postService
      .getPosts()
      .pipe(
        map((posts) =>
          posts.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        )
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.isLoading = false;
      });

    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (e) => console.error('Erro ao buscar categorias', e),
    });
  }

  openNewPostDialog(): void {
    console.log(this.categories);

    const dialogRef = this.dialog.open(NewPostComponent, {
      data: { categories: this.categories },
    });

    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        window.location.reload();
      }
    });
  }
}
