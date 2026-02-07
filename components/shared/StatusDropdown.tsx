'use client';

import React from 'react';
import { StatusType, STATUS_CONFIG } from '@/lib/types';
import { useIssueStore } from '@/lib/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Circle, CircleDot, CheckCircle, XCircle, CircleDashed } from 'lucide-react';

const StatusIcon = ({ status }: { status: StatusType }) => {
  const config = STATUS_CONFIG[status];
  const iconClass = "h-4 w-4";
  
  switch (status) {
    case 'backlog':
      return <CircleDashed className={iconClass} style={{ color: config.color }} />;
    case 'todo':
      return <Circle className={iconClass} style={{ color: config.color }} />;
    case 'in-progress':
      return <CircleDot className={iconClass} style={{ color: config.color }} />;
    case 'done':
      return <CheckCircle className={iconClass} style={{ color: config.color }} />;
    case 'canceled':
      return <XCircle className={iconClass} style={{ color: config.color }} />;
  }
};

export function StatusDropdown() {
  const { selectedIssue, updateStatus } = useIssueStore();
  const currentStatus = STATUS_CONFIG[selectedIssue.status];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors text-sm focus:outline-none">
        <StatusIcon status={selectedIssue.status} />
        <span className="font-medium">{currentStatus.label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {(Object.entries(STATUS_CONFIG) as [StatusType, typeof STATUS_CONFIG[StatusType]][]).map(
          ([key, config]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => updateStatus(key)}
              className="flex items-center gap-2"
            >
              <StatusIcon status={key} />
              <span>{config.label}</span>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
