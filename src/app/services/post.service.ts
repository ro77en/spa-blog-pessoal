import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`${this.API_URL}`);
  }
}
