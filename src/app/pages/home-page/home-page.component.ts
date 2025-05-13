import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatCardModule, PostCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  isLoading: boolean = true;
  posts: Post[] = [];

  constructor(private postService: PostService) {}

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
  }
}
