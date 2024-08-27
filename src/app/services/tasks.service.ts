import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = [
      {
        id: 't1',
        name: 'Design Homepage',
        dueDate: new Date('2024-09-01'),
        status: 'OPEN',
        priority: 'P0',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:00:00'),
      },
      {
        id: 't2',
        name: 'Develop Login Module',
        dueDate: new Date('2024-09-02'),
        status: 'IN_PROGRESS',
        priority: 'P1',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T20:00:00'),
      },
      {
        id: 't3',
        name: 'Write Unit Tests',
        dueDate: new Date('2024-09-03'),
        status: 'COMPLETE',
        priority: 'P2',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T12:00:00'),
      },
      {
        id: 't4',
        name: 'Fix Bugs in Cart',
        dueDate: new Date('2024-09-04'),
        status: 'OPEN',
        priority: 'P0',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T13:00:00'),
      },
      {
        id: 't5',
        name: 'Optimize Images',
        dueDate: new Date('2024-09-05'),
        status: 'IN_PROGRESS',
        priority: 'P1',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:10:00'),
      },
      {
        id: 't6',
        name: 'Setup CI/CD',
        dueDate: new Date('2024-09-06'),
        status: 'COMPLETE',
        priority: 'P2',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:30:00'),
      },
      {
        id: 't7',
        name: 'Update Documentation',
        dueDate: new Date('2024-09-07'),
        status: 'OPEN',
        priority: 'P0',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:03:00'),
      },
      {
        id: 't8',
        name: 'Create API Endpoints',
        dueDate: new Date('2024-09-08'),
        status: 'IN_PROGRESS',
        priority: 'P1',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:00:20'),
      },
      {
        id: 't9',
        name: 'Conduct User Testing',
        dueDate: new Date('2024-09-09'),
        status: 'OPEN',
        priority: 'P2',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:03:00'),
      },
      {
        id: 't10',
        name: 'Refactor Codebase',
        dueDate: new Date('2024-09-10'),
        status: 'OPEN',
        priority: 'P0',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:00:04'),
      },
      {
        id: 't11',
        name: 'Implement Search',
        dueDate: new Date('2024-09-11'),
        status: 'OPEN',
        priority: 'P1',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:00:30'),
      },
      {
        id: 't12',
        name: 'Setup Database',
        dueDate: new Date('2024-09-12'),
        status: 'IN_PROGRESS',
        priority: 'P2',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:05:00'),
      },
      {
        id: 't13',
        name: 'Deploy Application',
        dueDate: new Date('2024-09-13'),
        status: 'OPEN',
        priority: 'P0',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:06:00'),
      },
      {
        id: 't14',
        name: 'Run Performance Tests',
        dueDate: new Date('2024-09-14'),
        status: 'IN_PROGRESS',
        priority: 'P1',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:10:00'),
      },
      {
        id: 't15',
        name: 'Resolve UI Issues',
        dueDate: new Date('2024-09-15'),
        status: 'OPEN',
        priority: 'P1',
        createdAt: new Date('2024-08-01T10:00:00'),
        updatedAt: new Date('2024-08-01T10:11:00'),
      },
    ];
    return of(tasks);
  }

  filterTasksByStatus = (allTasks: Task[], status: string) => {
    return allTasks.filter((task) => task.status === status);
  };
}
