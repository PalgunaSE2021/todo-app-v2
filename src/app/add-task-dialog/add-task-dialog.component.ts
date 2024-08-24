import { Component, OnInit, Inject } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { Task } from '../models/task.model';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
  providers: [DialogService],
  imports: [
    ButtonModule,
    DropdownModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    CommonModule,
  ],
})
export class AddTaskDialogComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  value: string = '';
  date: Date | undefined;
  name?: string;

  task: Task = {
    name: '',
    status: 'OPEN',
    dueDate: new Date(),
    priority: '',
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

  onCancel() {
    this.dynamicDialogRef.close();
  }

  onSave() {
    if (!this.task.name || !this.task.dueDate || !this.task.priority) {
      return;
    }
    this.dynamicDialogRef.close(this.task);
  }

  ngOnInit(): void {
    if (this.config.data && this.config.data.task) {
      this.task = { ...this.config.data.task };
    }
  }
}
