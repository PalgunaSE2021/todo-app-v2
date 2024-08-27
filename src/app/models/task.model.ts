export interface Task {
  id?: string;
  name: string;
  status: string;
  dueDate: Date;
  priority: string;
  createdAt: Date;
  updatedAt?: Date;
}
