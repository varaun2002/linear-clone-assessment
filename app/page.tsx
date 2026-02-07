'use client';

import { IssuePanel } from '@/components/IssuePanel/IssuePanel';
import { useIssueStore } from '@/lib/store';
import { CircleDot, Circle, CircleDashed, CheckCircle, AlertCircle, ArrowUp, ArrowRight, ArrowDown, XCircle } from 'lucide-react';

const STATUS_COLORS = {
  backlog: 'border-gray-300 bg-gray-50',
  todo: 'border-indigo-300 bg-indigo-50',
  'in-progress': 'border-amber-300 bg-amber-50',
  done: 'border-emerald-300 bg-emerald-50',
  canceled: 'border-gray-300 bg-gray-100',
};

const PRIORITY_COLORS = {
  'no-priority': 'text-gray-400',
  urgent: 'text-red-500',
  high: 'text-amber-500',
  medium: 'text-blue-500',
  low: 'text-gray-400',
};

const StatusIcon = ({ status }: { status: string }) => {
  const iconClass = "h-3.5 w-3.5";
  switch (status) {
    case 'backlog':
      return <CircleDashed className={iconClass} />;
    case 'todo':
      return <Circle className={iconClass} />;
    case 'in-progress':
      return <CircleDot className={iconClass} />;
    case 'done':
      return <CheckCircle className={iconClass} />;
    case 'canceled':
      return <XCircle className={iconClass} />;
    default:
      return <Circle className={iconClass} />;
  }
};

const PriorityIcon = ({ priority }: { priority: string }) => {
  const iconClass = "h-3.5 w-3.5";
  const colorClass = PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS];
  
  switch (priority) {
    case 'urgent':
      return <AlertCircle className={`${iconClass} ${colorClass}`} />;
    case 'high':
      return <ArrowUp className={`${iconClass} ${colorClass}`} />;
    case 'medium':
      return <ArrowRight className={`${iconClass} ${colorClass}`} />;
    case 'low':
      return <ArrowDown className={`${iconClass} ${colorClass}`} />;
    default:
      return null;
  }
};

export default function Home() {
  const issues = useIssueStore((state) => state.issues);
  const selectedIssueId = useIssueStore((state) => state.selectedIssueId);
  const setSelectedIssue = useIssueStore((state) => state.setSelectedIssue);

  return (
    <main className="flex h-screen bg-gray-50">
      {/* Left side - Issues list */}
      <div className="flex-1 border-r border-gray-200 bg-white flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Issues</h2>
          <p className="text-sm text-gray-500 mt-0.5">{issues.length} issues</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-2">
            {issues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                className={`p-3 rounded-lg border-l-2 transition-all duration-150 cursor-pointer hover:shadow-sm ${
                  STATUS_COLORS[issue.status as keyof typeof STATUS_COLORS]
                } ${
                  issue.id === selectedIssueId
                    ? 'ring-2 ring-blue-500 ring-offset-1 shadow-md'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-600">{issue.identifier}</span>
                    <StatusIcon status={issue.status} />
                  </div>
                  <PriorityIcon priority={issue.priority} />
                </div>
                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                  {issue.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Issue Detail Panel */}
      <IssuePanel />
    </main>
  );
}
