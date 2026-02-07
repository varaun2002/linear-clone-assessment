interface IssueListItem {
  id: string;
  identifier: string;
  title: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'done' | 'canceled';
  priority: 'urgent' | 'high' | 'medium' | 'low' | 'no-priority';
}

export const mockIssuesList: IssueListItem[] = [
  {
    id: '1',
    identifier: 'ENG-2847',
    title: 'Implement real-time collaboration for document editor',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: '2',
    identifier: 'ENG-2846',
    title: 'Fix memory leak in WebSocket connection',
    status: 'todo',
    priority: 'urgent',
  },
  {
    id: '3',
    identifier: 'ENG-2845',
    title: 'Add dark mode support to dashboard',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: '4',
    identifier: 'ENG-2844',
    title: 'Optimize database queries for analytics page',
    status: 'todo',
    priority: 'high',
  },
  {
    id: '5',
    identifier: 'ENG-2843',
    title: 'Implement user authentication with OAuth',
    status: 'done',
    priority: 'high',
  },
  {
    id: '6',
    identifier: 'ENG-2842',
    title: 'Update dependencies to latest versions',
    status: 'backlog',
    priority: 'low',
  },
  {
    id: '7',
    identifier: 'ENG-2841',
    title: 'Add unit tests for API endpoints',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: '8',
    identifier: 'ENG-2840',
    title: 'Refactor legacy code in payment module',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: '9',
    identifier: 'ENG-2839',
    title: 'Implement file upload with drag and drop',
    status: 'done',
    priority: 'medium',
  },
  {
    id: '10',
    identifier: 'ENG-2838',
    title: 'Fix Safari rendering issues',
    status: 'todo',
    priority: 'urgent',
  },
];

export const STATUS_COLORS = {
  backlog: 'border-gray-300 bg-gray-50',
  todo: 'border-indigo-300 bg-indigo-50',
  'in-progress': 'border-amber-300 bg-amber-50',
  done: 'border-emerald-300 bg-emerald-50',
  canceled: 'border-gray-300 bg-gray-100',
};

export const PRIORITY_COLORS = {
  'no-priority': 'text-gray-400',
  urgent: 'text-red-500',
  high: 'text-amber-500',
  medium: 'text-blue-500',
  low: 'text-gray-400',
};
