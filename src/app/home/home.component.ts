import { ToastModule } from 'primeng/toast';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Task } from '../models/task.model';
import { TaskListComponent } from '../task-list/task-list.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { TasksService } from '../services/tasks.service';
import { MessageService } from 'primeng/api';
import { MeterGroupModule } from 'primeng/metergroup';
import { TooltipModule } from 'primeng/tooltip';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AddTaskDialogComponent,
    TaskListComponent,
    SearchFilterComponent,
    ButtonModule,
    ToastModule,
    MeterGroupModule,
    TooltipModule,
    NavbarComponent,
  ],
  providers: [DialogService, TasksService, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  allTasks: Task[] = [];
  openTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completeTasks: Task[] = [];
  filteredTasks: Task[] = [];

  searchText: string = '';
  priority: string = '';

  value = [
    { label: 'Apps', color: '#34d399', value: 0 },
    { label: 'Messages', color: '#fbbf24', value: 0 },
    { label: 'Media', color: '#60a5fa', value: 0 },
  ];

  constructor(
    private tasksService: TasksService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  showTaskDialog() {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Add Task',
      width: '400px',
      modal: true,
    });
    this.ref.onClose.subscribe((newTask: Task) => {
      //adding new task
      if (newTask) {
        this.allTasks.unshift(newTask);
        this.applyFilters();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task saved successfully',
        });
      }
    });
  }

  onSearchTextChanged(searchText: string) {
    //fn to handle input event
    this.searchText = searchText;
    this.applyFilters();
  }

  onPriorityChanged(priority: string) {
    //fn to handle input event
    this.priority = priority;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTasks = this.allTasks.filter((task) => {
      //filter method creates new array containing only the tasks
      const matchesSearch = this.searchText //that satisfy both the search text and priority criteria.
        ? task.name.toLowerCase().includes(this.searchText.toLowerCase())
        : true; //checks whether substring is present
      const matchesPriority = this.priority //similarly for priority, if no priority means it will return true
        ? task.priority === this.priority
        : true;

      return matchesSearch && matchesPriority;
    });

    this.filteredTasks.sort((a, b) => {
      //sort lists based on creation date
      const dateA = a.updatedAt || a.createdAt;
      const dateB = b.updatedAt || b.createdAt;
      return dateB.getTime() - dateA.getTime();
    });

    this.updateFilteredTaskLists();
  }

  updateFilteredTaskLists() {
    //categorizes the already filtered tasks
    this.openTasks = this.filteredTasks.filter(
      (task) => task.status === 'OPEN'
    );
    this.inProgressTasks = this.filteredTasks.filter(
      (task) => task.status === 'IN_PROGRESS'
    );
    this.completeTasks = this.filteredTasks.filter(
      (task) => task.status === 'COMPLETE'
    );
    this.value = [
      {
        label: 'Open Tasks',
        color: '#34d399',
        value: this.calculatePercentage(
          this.openTasks.length,
          this.filteredTasks.length
        ),
      },
      {
        label: 'In Progress Tasks',
        color: '#fbbf24',
        value: this.calculatePercentage(
          this.inProgressTasks.length,
          this.filteredTasks.length
        ),
      },
      {
        label: 'Completed Tasks',
        color: '#60a5fa',
        value: this.calculatePercentage(
          this.completeTasks.length,
          this.filteredTasks.length
        ),
      },
    ];
  }

  calculatePercentage(part: number, total: number): number {
    return total > 0 ? Math.round((part / total) * 100) : 0;
  }

  editTask(task: Task) {
    //edit task dialogue
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Edit Task',
      width: '400px',
      data: { task: { ...task } },
      modal: true,
    });
    this.ref.onClose.subscribe((updatedTask: Task) => {
      if (updatedTask) {
        this.updateTask(task, updatedTask); //calls update task fn
      }
    });
  }

  deleteTask(task: Task) {
    //if delete button is pressed
    const index = this.allTasks.findIndex((t) => t.id == task.id);
    if (index != -1) {
      this.allTasks.splice(index, 1); // removes one element from the position specified by index
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Task deleted successfully',
      });
    }
    this.applyFilters();
  }

  updateTask(oldTask: Task, updatedTask: Task) {
    const index = this.allTasks.findIndex((t) => t.id === oldTask.id);
    if (index !== -1) {
      this.allTasks.splice(index, 1); //removes old copy
      this.allTasks.unshift(updatedTask); //adds new task
      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Task updated successfully',
      });
    }
    this.applyFilters();
  }

  getAllTasks() {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.allTasks = tasks;
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }
}
