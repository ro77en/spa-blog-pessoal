import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`${this.API_URL}`);
  }

  createPost(postData: {
    title: string;
    content: string;
    userId: number;
    categoryId: number;
  }) {
    return this.http.post<void>(`${this.API_URL}`, postData);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${postId}`);
  }
}
