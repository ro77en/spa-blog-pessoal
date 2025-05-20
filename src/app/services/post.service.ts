import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = `${environment.apiUrl}/posts`;

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

  editPost(postData: {
    postId: number;
    title: string;
    content: string;
    userId: number;
    categoryId: number;
  }) {
    return this.http.put<void>(`${this.API_URL}/${postData.postId}`, postData);
  }
}
