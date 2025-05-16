import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../services/post.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input({ required: true })
  post!: Post;

  expanded: boolean = false;
  canDelete: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private dialog: MatDialog
  ) {}

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  toggleExpandedPost() {
    this.expanded = !this.expanded;
    this.showPostActions();
  }

  showPostActions() {
    const authUserId = this.authService.currentUser()?.userId;
    const postAuthorId = this.post.user.id;

    this.canDelete = this.expanded && authUserId === postAuthorId;
  }

  deletePost() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmar exclusão',
          message: 'Tem certeza que deseja excluir este post?',
        },
      })
      .afterClosed()
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => this.postService.deletePost(this.post.id))
      )
      .subscribe({
        next: () => {
          this.successMsg = 'Post deletado com sucesso';
          window.location.reload();
        },
        error: (err) => {
          console.error('Erro ao deletar o post:', err);
          this.errorMsg = 'Erro ao deletar o post, tente novamente';
        },
      });
  }
}
