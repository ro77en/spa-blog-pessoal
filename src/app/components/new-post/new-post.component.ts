import { Component, Inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Category } from '../../models/category.model';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-new-post',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent {
  title: string = '';
  content: string = '';
  categoryId: string = '';
  categories: Category[] = [];

  successMsg: string = '';
  errorMsg: string = '';
  isSubmitting: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categories: Category[] },
    private postService: PostService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<NewPostComponent>
  ) {}

  ngOnInit() {
    this.categories = this.data.categories;
  }

  createPost() {
    this.isSubmitting = true;
    const user = this.authService.currentUser();

    if (user) {
      const postData = {
        title: this.title,
        content: this.content,
        userId: user.userId,
        categoryId: Number(this.categoryId),
      };

      this.postService.createPost(postData).subscribe({
        next: () => {
          this.successMsg = 'Post criado com sucesso!';
          this.title = '';
          this.content = '';
          this.categoryId = '';
          this.isSubmitting = false;

          setTimeout(() => {
            this.dialogRef.close(true);
          }, 1000);
        },
        error: (e) => {
          this.errorMsg = 'Erro na criação do post, tente novamente';
          console.error('Erro ao criar post', e);
        },
      });
    }
  }
}
