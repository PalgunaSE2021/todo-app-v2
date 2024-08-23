import { Component, Input } from '@angular/core';
import { Task } from '../models/task.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
}
