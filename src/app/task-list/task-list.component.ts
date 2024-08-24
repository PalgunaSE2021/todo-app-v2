import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../models/task.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { TasksService } from '../services/tasks.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate(
          '0.3s ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
  imports: [ButtonModule, CardModule, CommonModule],
  providers: [DialogService],
})
export class TaskListComponent implements OnChanges {
  @Input() tasks: Task[] = [];

  taskCardStyleClass: string = 'task-card-content';
  ref: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private tasksService: TasksService
  ) {}

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

  editTask(task: Task) {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Edit Task',
      width: '400px',
      modal: true,
      data: { task },
    });

    this.ref.onClose.subscribe((updatedTask: Task) => {
      if (updatedTask) {
        this.updateTaskList(updatedTask);
      }
    });
  }

  deleteTask(taskId: string | undefined, index: number) {
    if (taskId) {
      setTimeout(() => {
        this.tasks.splice(index, 1);
      }, 300);
    }
  }
  updateTaskList(updatedTask: Task) {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'].currentValue?.length > 0) {
      this.setCardStyleClass(changes['tasks'].currentValue[0].status);
    }
  }
}
