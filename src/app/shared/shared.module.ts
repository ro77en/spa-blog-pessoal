import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// Directives
import { HighlightDirective } from './directives/highlight.directive';

// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatMenuModule,
  MatDividerModule,
  MatChipsModule,
  MatPaginatorModule,
];

const components = [
  HeaderComponent,
  FooterComponent,
  LoadingComponent,
  ConfirmDialogComponent,
];

const directives = [HighlightDirective];

const pipes = [TruncatePipe];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ...materialModules,
    ...components,
    ...directives,
    ...pipes,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ...materialModules,
    components,
    directives,
    ...pipes,
  ],
})
export class SharedModule {}
