import { Issue, User, Label, Project, Comment } from './types';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Chen',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  email: 'sarah@linear.app',
};

export const mockUsers: User[] = [
  mockUser,
  {
    id: '2',
    name: 'Alex Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    email: 'alex@linear.app',
  },
  {
    id: '3',
    name: 'Jordan Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    email: 'jordan@linear.app',
  },
];

export const mockLabels: Label[] = [
  { id: '1', name: 'bug', color: '#ef4444' },
  { id: '2', name: 'feature', color: '#8b5cf6' },
  { id: '3', name: 'improvement', color: '#3b82f6' },
  { id: '4', name: 'documentation', color: '#10b981' },
];

export const mockProjects: Project[] = [
  { id: '1', name: 'Engineering', icon: '⚙️' },
  { id: '2', name: 'Design', icon: '🎨' },
  { id: '3', name: 'Marketing', icon: '📢' },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    author: mockUsers[1],
    content: 'I think we should prioritize this for the next sprint. The current implementation is causing issues in production.',
    createdAt: new Date('2024-02-05T10:30:00'),
  },
  {
    id: '2',
    author: mockUser,
    content: 'Agreed. I\'ll start working on this today and have a PR ready by EOD.',
    createdAt: new Date('2024-02-05T11:15:00'),
  },
];

export const mockIssue: Issue = {
  id: '1',
  identifier: 'ENG-2847',
  title: 'Implement real-time collaboration for document editor',
  status: 'in-progress',
  priority: 'high',
  assignee: mockUser,
  labels: [mockLabels[1], mockLabels[2]],
  project: mockProjects[0],
  estimate: 5,
  dueDate: new Date('2024-02-15'),
  description: `## Context

We need to add real-time collaboration features to our document editor to compete with modern editing tools. Users should be able to see each other's cursors and edits in real-time.

## Requirements

- Implement WebSocket connection for real-time updates
- Show user cursors with name labels
- Handle conflict resolution for concurrent edits
- Add presence indicators showing who's currently viewing
- Implement operational transformation for text consistency

## Technical Approach

Using Y.js for CRDT-based conflict resolution and Socket.io for WebSocket management. The architecture will follow our existing event-driven patterns.`,
  comments: mockComments,
  createdAt: new Date('2024-02-01T09:00:00'),
  updatedAt: new Date('2024-02-05T11:15:00'),
};
