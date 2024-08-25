import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    CommonModule,
    DynamicDialogModule,
    DragDropModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-app-v2';
}
