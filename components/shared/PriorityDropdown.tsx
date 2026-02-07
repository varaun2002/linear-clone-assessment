'use client';

import React from 'react';
import { PriorityType, PRIORITY_CONFIG } from '@/lib/types';
import { useIssueStore } from '@/lib/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, AlertCircle, ArrowUp, ArrowRight, ArrowDown, Minus } from 'lucide-react';

const PriorityIcon = ({ priority }: { priority: PriorityType }) => {
  const config = PRIORITY_CONFIG[priority];
  const iconClass = "h-4 w-4";
  
  switch (priority) {
    case 'urgent':
      return <AlertCircle className={iconClass} style={{ color: config.color }} />;
    case 'high':
      return <ArrowUp className={iconClass} style={{ color: config.color }} />;
    case 'medium':
      return <ArrowRight className={iconClass} style={{ color: config.color }} />;
    case 'low':
      return <ArrowDown className={iconClass} style={{ color: config.color }} />;
    default:
      return <Minus className={iconClass} style={{ color: config.color }} />;
  }
};

export function PriorityDropdown() {
  const { selectedIssue, updatePriority } = useIssueStore();
  const currentPriority = PRIORITY_CONFIG[selectedIssue.priority];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors text-sm focus:outline-none">
        <PriorityIcon priority={selectedIssue.priority} />
        <span className="font-medium">{currentPriority.label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {(Object.entries(PRIORITY_CONFIG) as [PriorityType, typeof PRIORITY_CONFIG[PriorityType]][]).map(
          ([key, config]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => updatePriority(key)}
              className="flex items-center gap-2"
            >
              <PriorityIcon priority={key} />
              <span>{config.label}</span>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
