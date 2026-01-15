export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskInput {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface FilterState {
  searchText: string;
  status: TaskStatus | 'all';
}
