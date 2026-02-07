'use client';

import React from 'react';
import { useIssueStore } from '@/lib/store';
import { mockLabels } from '@/lib/mock-data';
import { Label } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Tag } from 'lucide-react';

export function LabelMultiSelect() {
  const { selectedIssue, updateLabels } = useIssueStore();

  const toggleLabel = (label: Label) => {
    const isSelected = selectedIssue.labels.some((l) => l.id === label.id);
    if (isSelected) {
      updateLabels(selectedIssue.labels.filter((l) => l.id !== label.id));
    } else {
      updateLabels([...selectedIssue.labels, label]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors text-sm focus:outline-none">
        {selectedIssue.labels.length > 0 ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            {selectedIssue.labels.map((label) => (
              <span
                key={label.id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium label-badge"
                style={{
                  backgroundColor: `${label.color}15`,
                  color: label.color,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        ) : (
          <>
            <Tag className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Add labels</span>
          </>
        )}
        <ChevronDown className="h-3.5 w-3.5 text-gray-400 ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {mockLabels.map((label) => (
          <DropdownMenuCheckboxItem
            key={label.id}
            checked={selectedIssue.labels.some((l) => l.id === label.id)}
            onCheckedChange={() => toggleLabel(label)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: label.color }}
              />
              <span>{label.name}</span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
