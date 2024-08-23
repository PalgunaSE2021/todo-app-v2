import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { ButtonModule } from 'primeng/button';
import { Task } from '../models/task.model';
import { TaskListComponent } from '../task-list/task-list.component';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DialogService],
  imports: [ButtonModule, AddTaskDialogComponent, TaskListComponent],
})
export class HomeComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  openTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completeTasks: Task[] = [];
  constructor(
    private dialogService: DialogService,
    private tasksService: TasksService
  ) {}

  showTaskDialog() {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Add Task',
      width: '400px',
      modal: true,
    });
    this.ref.onClose.subscribe((newTask: Task) => {
      if (newTask) {
        switch (newTask.status) {
          case 'OPEN':
            this.openTasks = [newTask, ...this.openTasks];
            break;
          case 'IN_PROGRESS':
            this.inProgressTasks = [newTask, ...this.inProgressTasks];
            break;
          case 'COMPLETE':
            this.completeTasks = [newTask, ...this.completeTasks];
            break;
          default:
            break;
        }
      }
    });
  }

  getAllTasks() {
    this.tasksService.getTasks().subscribe((allTasks) => {
      this.openTasks = this.tasksService.filterTasksByStatus(allTasks, 'OPEN');
      this.inProgressTasks = this.tasksService.filterTasksByStatus(
        allTasks,
        'IN_PROGRESS'
      );
      this.completeTasks = this.tasksService.filterTasksByStatus(
        allTasks,
        'COMPLETE'
      );
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }
}
