export type StatusType = 'backlog' | 'todo' | 'in-progress' | 'done' | 'canceled';
export type PriorityType = 'urgent' | 'high' | 'medium' | 'low' | 'no-priority';

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  icon: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}

export interface Issue {
  id: string;
  identifier: string;
  title: string;
  status: StatusType;
  priority: PriorityType;
  assignee: User | null;
  labels: Label[];
  project: Project;
  estimate: number | null;
  dueDate: Date | null;
  description: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export const STATUS_CONFIG = {
  backlog: {
    label: 'Backlog',
    color: '#94a3b8',
  },
  todo: {
    label: 'Todo',
    color: '#5e6ad2',
  },
  'in-progress': {
    label: 'In Progress',
    color: '#f59e0b',
  },
  done: {
    label: 'Done',
    color: '#10b981',
  },
  canceled: {
    label: 'Canceled',
    color: '#6b7280',
  },
} as const;

export const PRIORITY_CONFIG = {
  'no-priority': {
    label: 'No priority',
    color: '#94a3b8',
  },
  urgent: {
    label: 'Urgent',
    color: '#ef4444',
  },
  high: {
    label: 'High',
    color: '#f59e0b',
  },
  medium: {
    label: 'Medium',
    color: '#3b82f6',
  },
  low: {
    label: 'Low',
    color: '#94a3b8',
  },
} as const;
