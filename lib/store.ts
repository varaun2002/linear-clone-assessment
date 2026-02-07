import { create } from 'zustand';
import { Issue, StatusType, PriorityType, User, Label, Comment } from './types';
import { mockIssue } from './mock-data';

interface IssueStore {
  issues: Issue[];
  selectedIssueId: string;
  selectedIssue: Issue;
  setSelectedIssue: (issueId: string) => void;
  updateTitle: (title: string) => void;
  updateStatus: (status: StatusType) => void;
  updatePriority: (priority: PriorityType) => void;
  updateAssignee: (assignee: User | null) => void;
  updateLabels: (labels: Label[]) => void;
  updateEstimate: (estimate: number | null) => void;
  updateDueDate: (dueDate: Date | null) => void;
  updateDescription: (description: string) => void;
  addComment: (comment: Comment) => void;
}

// Create multiple issues from the mock issue template
const createIssues = (): Issue[] => {
  const titles = [
    'Implement real-time collaboration for document editor',
    'Fix memory leak in WebSocket connection',
    'Add dark mode support to dashboard',
    'Optimize database queries for analytics page',
    'Implement user authentication with OAuth',
    'Update dependencies to latest versions',
    'Add unit tests for API endpoints',
    'Refactor legacy code in payment module',
    'Implement file upload with drag and drop',
    'Fix Safari rendering issues',
  ];

  const statuses: StatusType[] = ['in-progress', 'todo', 'in-progress', 'todo', 'done', 'backlog', 'todo', 'in-progress', 'done', 'todo'];
  const priorities: PriorityType[] = ['high', 'urgent', 'medium', 'high', 'high', 'low', 'medium', 'medium', 'medium', 'urgent'];

  return titles.map((title, index) => ({
    ...mockIssue,
    id: String(index + 1),
    identifier: `ENG-${2847 - index}`,
    title,
    status: statuses[index],
    priority: priorities[index],
  }));
};

export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: createIssues(),
  selectedIssueId: '1',
  selectedIssue: createIssues()[0],

  setSelectedIssue: (issueId) => {
    const issue = get().issues.find(i => i.id === issueId);
    if (issue) {
      set({ selectedIssueId: issueId, selectedIssue: issue });
    }
  },
  
  updateTitle: (title) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? { ...issue, title, updatedAt: new Date() }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: { ...state.selectedIssue, title, updatedAt: new Date() },
      };
    }),
  
  updateStatus: (status) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? { ...issue, status, updatedAt: new Date() }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: { ...state.selectedIssue, status, updatedAt: new Date() },
      };
    }),
  
  updatePriority: (priority) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? { ...issue, priority, updatedAt: new Date() }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: { ...state.selectedIssue, priority, updatedAt: new Date() },
      };
    }),
  
  updateAssignee: (assignee) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? { ...issue, assignee, updatedAt: new Date() }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: { ...state.selectedIssue, assignee, updatedAt: new Date() },
      };
    }),
  
  updateLabels: (labels) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? { ...issue, labels, updatedAt: new Date() }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: { ...state.selectedIssue, labels, updatedAt: new Date() },
      };
    }),
  
  updateEstimate: (estimate) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? { ...issue, estimate, updatedAt: new Date() }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: { ...state.selectedIssue, estimate, updatedAt: new Date() },
      };
    }),
  
  updateDueDate: (dueDate) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? { ...issue, dueDate, updatedAt: new Date() }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: { ...state.selectedIssue, dueDate, updatedAt: new Date() },
      };
    }),
  
  updateDescription: (description) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? { ...issue, description, updatedAt: new Date() }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: { ...state.selectedIssue, description, updatedAt: new Date() },
      };
    }),
  
  addComment: (comment) =>
    set((state) => {
      const updatedIssues = state.issues.map(issue =>
        issue.id === state.selectedIssueId
          ? {
              ...issue,
              comments: [...issue.comments, comment],
              updatedAt: new Date(),
            }
          : issue
      );
      return {
        issues: updatedIssues,
        selectedIssue: {
          ...state.selectedIssue,
          comments: [...state.selectedIssue.comments, comment],
          updatedAt: new Date(),
        },
      };
    }),
}));
