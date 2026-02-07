'use client';

import React from 'react';
import { useIssueStore } from '@/lib/store';
import { mockUsers } from '@/lib/mock-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, User as UserIcon } from 'lucide-react';
import Image from 'next/image';

export function AssigneeSelect() {
  const { selectedIssue, updateAssignee } = useIssueStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors text-sm focus:outline-none">
        {selectedIssue.assignee ? (
          <>
            <div className="relative w-5 h-5 rounded-full overflow-hidden">
              <Image
                src={selectedIssue.assignee.avatar}
                alt={selectedIssue.assignee.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium">{selectedIssue.assignee.name}</span>
          </>
        ) : (
          <>
            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="h-3 w-3 text-gray-500" />
            </div>
            <span className="text-gray-500">No assignee</span>
          </>
        )}
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={() => updateAssignee(null)} className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
            <UserIcon className="h-3 w-3 text-gray-500" />
          </div>
          <span>No assignee</span>
        </DropdownMenuItem>
        {mockUsers.map((user) => (
          <DropdownMenuItem
            key={user.id}
            onClick={() => updateAssignee(user)}
            className="flex items-center gap-2"
          >
            <div className="relative w-5 h-5 rounded-full overflow-hidden">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
