import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
} from '@angular/core';
import { Task } from '../models/task.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule],
  providers: [DialogService],
})
export class TaskListComponent implements OnChanges {
  @Input() tasks: Task[] = [];
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  taskCardStyleClass: string = 'task-card-content';
  ref: DynamicDialogRef | undefined;

  onEditTask(task: Task) {
    this.editTask.emit(task);
  }

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }

  setCardStyleClass(status: string) {
    switch (status) {
      case 'OPEN':
        this.taskCardStyleClass = this.taskCardStyleClass + ' open-task';
        break;
      case 'IN_PROGRESS':
        this.taskCardStyleClass = this.taskCardStyleClass + ' in-progress-task';
        break;
      case 'COMPLETE':
        this.taskCardStyleClass = this.taskCardStyleClass + ' complete-task';
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'].currentValue?.length > 0) {
      this.setCardStyleClass(changes['tasks'].currentValue[0].status);
    }
  }
}
