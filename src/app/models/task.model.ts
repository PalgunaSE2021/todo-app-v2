export interface Task {
  id?: string;
  name: string;
  dueDate: Date;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
  priority: 'P0' | 'P1' | 'P2' | '';
}
