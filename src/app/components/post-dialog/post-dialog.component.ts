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
import { Post } from '../../models/post.model';

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
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss',
})
export class PostDialogComponent {
  title: string = '';
  content: string = '';
  categoryId: number = 0;
  categories: Category[] = [];

  postAction: 'Criar' | 'Editar' = 'Criar';

  successMsg: string = '';
  errorMsg: string = '';
  isSubmitting: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { post?: Post; categories: Category[] },
    private postService: PostService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<PostDialogComponent>
  ) {}

  ngOnInit() {
    if (this.data.post) {
      this.postAction = 'Editar';
      this.title = this.data.post.title;
      this.content = this.data.post.content;
      this.categoryId = this.data.post.category.id;
    } else {
      this.postAction = 'Criar';
    }
    this.categories = this.data.categories;
  }

  createPost() {
    this.isSubmitting = true;
    this.postAction = 'Criar';
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
          this.clearFormAndClose();
        },
        error: (e) => {
          this.errorMsg = 'Erro na criação do post, tente novamente';
          console.error('Erro ao criar post', e);
        },
      });
    }
  }

  updatePost() {
    this.isSubmitting = true;
    this.postAction = 'Editar';
    const user = this.authService.currentUser();

    if (!user || !this.data.post) return;

    const postData = {
      postId: this.data.post!.id,
      title: this.title,
      content: this.content,
      userId: user.userId,
      categoryId: this.categoryId,
    };

    this.postService.editPost(postData).subscribe({
      next: () => {
        this.successMsg = 'Post atualizado com sucesso!';
        this.clearFormAndClose();
      },
      error: (e) => {
        this.errorMsg = 'Erro ao atualizar o post.';
        console.error(e);
        this.isSubmitting = false;
      },
    });
  }

  submitPost() {
    if (this.postAction === 'Criar') {
      this.createPost();
    } else {
      this.updatePost();
    }
  }

  private clearFormAndClose() {
    this.isSubmitting = false;
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 1000);
  }
}
