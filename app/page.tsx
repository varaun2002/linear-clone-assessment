'use client';

import { IssuePanel } from '@/components/IssuePanel/IssuePanel';
import { useIssueStore } from '@/lib/store';
import { CircleDot, Circle, CircleDashed, CheckCircle, AlertCircle, ArrowUp, ArrowRight, ArrowDown, XCircle } from 'lucide-react';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'backlog':
      return 'border-l-gray-400 bg-gray-50';
    case 'todo':
      return 'border-l-indigo-500 bg-indigo-50';
    case 'in-progress':
      return 'border-l-amber-500 bg-amber-50';
    case 'done':
      return 'border-l-emerald-500 bg-emerald-50';
    case 'canceled':
      return 'border-l-gray-400 bg-gray-100';
    default:
      return 'border-l-gray-300 bg-white';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'text-red-500';
    case 'high':
      return 'text-amber-500';
    case 'medium':
      return 'text-blue-500';
    case 'low':
      return 'text-gray-400';
    default:
      return 'text-gray-400';
  }
};

const StatusIcon = ({ status }: { status: string }) => {
  const iconClass = "h-3.5 w-3.5";
  switch (status) {
    case 'backlog':
      return <CircleDashed className={`${iconClass} text-gray-500`} />;
    case 'todo':
      return <Circle className={`${iconClass} text-indigo-500`} />;
    case 'in-progress':
      return <CircleDot className={`${iconClass} text-amber-500`} />;
    case 'done':
      return <CheckCircle className={`${iconClass} text-emerald-500`} />;
    case 'canceled':
      return <XCircle className={`${iconClass} text-gray-500`} />;
    default:
      return <Circle className={iconClass} />;
  }
};

const PriorityIcon = ({ priority }: { priority: string }) => {
  const iconClass = "h-3.5 w-3.5";
  const colorClass = getPriorityColor(priority);
  
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
                className={`p-3 rounded-lg border-l-4 transition-all duration-150 cursor-pointer hover:shadow-sm ${
                  getStatusColor(issue.status)
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
