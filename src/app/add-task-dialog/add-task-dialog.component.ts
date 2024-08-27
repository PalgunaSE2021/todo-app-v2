import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Task } from '../models/task.model';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})
export class AddTaskDialogComponent implements OnInit {
  value: string = '';
  date: Date | undefined;

  task: Task = {
    name: '',
    status: 'OPEN',
    dueDate: new Date(),
    priority: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  today: Date = new Date();

  priorityOptions: ('P0' | 'P1' | 'P2')[] = ['P0', 'P1', 'P2'];

  statusOptions: any[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In progress', value: 'IN_PROGRESS' },
    { label: 'Complete', value: 'COMPLETE' },
  ];

  constructor(
    public dynamicDialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data?.task) {
      this.task = { ...this.config.data.task };
      this.date = new Date(this.task.dueDate);
    }
  }

  onCancel() {
    this.dynamicDialogRef.close();
  }

  onSave() {
    if (!this.task.name || !this.date || !this.task.priority) {
      return;
    }
    this.task.dueDate = this.date;
    this.dynamicDialogRef.close(this.task);
  }
}
