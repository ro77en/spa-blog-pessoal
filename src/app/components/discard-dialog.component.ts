import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-discard-dialog',
  template: `
    <h2 mat-dialog-title>Descartar alterações?</h2>
    <mat-dialog-content
      >Tem certeza que deseja descartar as alterações?</mat-dialog-content
    >
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-button color="warn" [mat-dialog-close]="true">
        Descartar
      </button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class DiscardDialogComponent {}
