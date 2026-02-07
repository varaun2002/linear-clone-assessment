'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useIssueStore } from '@/lib/store';
import { StatusDropdown } from '@/components/shared/StatusDropdown';
import { PriorityDropdown } from '@/components/shared/PriorityDropdown';
import { AssigneeSelect } from '@/components/shared/AssigneeSelect';
import { LabelMultiSelect } from '@/components/shared/LabelMultiSelect';
import { Calendar, Hash, X, Link2, Eye, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

export function IssuePanel() {
  const { selectedIssue, updateTitle } = useIssueStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(selectedIssue.title);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTitleValue(selectedIssue.title);
  }, [selectedIssue.id, selectedIssue.title]);

  const handleTitleSave = () => {
    updateTitle(titleValue);
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTitleValue(selectedIssue.title);
      setIsEditingTitle(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="linear-panel h-screen w-full md:w-[640px] flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-gray-500">{selectedIssue.identifier}</span>
          <div className="flex items-center gap-2">
            <StatusDropdown />
            <PriorityDropdown />
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onClick={copyLink}
            className="p-2 rounded-md hover:bg-gray-100 transition-all duration-150 hover:scale-105 active:scale-95"
            title="Copy link"
          >
            {copied ? (
              <span className="text-xs text-green-600 font-medium px-1">✓</span>
            ) : (
              <Link2 className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 transition-all duration-150 hover:scale-105 active:scale-95" title="Watch">
            <Eye className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 transition-all duration-150 hover:scale-105 active:scale-95" title="More">
            <MoreHorizontal className="h-4 w-4 text-gray-500" />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button className="p-2 rounded-md hover:bg-gray-100 transition-all duration-150 hover:scale-105 active:scale-95">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Title */}
        <div className="mb-8">
          {isEditingTitle ? (
            <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyDown}
              className="w-full text-2xl font-semibold linear-input focus:ring-2 focus:ring-blue-500 rounded px-1 -ml-1"
              autoFocus
            />
          ) : (
            <h1
              className="text-2xl font-semibold cursor-text title-editable px-1 -mx-1 rounded"
              onClick={() => setIsEditingTitle(true)}
            >
              {selectedIssue.title}
            </h1>
          )}
        </div>

        {/* Metadata Grid */}
        <div className="space-y-2 mb-8">
          <div className="metadata-row">
            <div className="w-32 linear-label">Assignee</div>
            <div className="flex-1">
              <AssigneeSelect />
            </div>
          </div>

          <div className="metadata-row">
            <div className="w-32 linear-label">Labels</div>
            <div className="flex-1">
              <LabelMultiSelect />
            </div>
          </div>

          <div className="metadata-row">
            <div className="w-32 linear-label">Project</div>
            <div className="flex-1 linear-value flex items-center gap-2 px-2 py-1.5">
              <span>{selectedIssue.project.icon}</span>
              <span>{selectedIssue.project.name}</span>
            </div>
          </div>

          <div className="metadata-row">
            <div className="w-32 linear-label">Estimate</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-all text-sm cursor-pointer">
                <Hash className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{selectedIssue.estimate || 'No estimate'}</span>
              </div>
            </div>
          </div>

          <div className="metadata-row">
            <div className="w-32 linear-label">Due Date</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-all text-sm cursor-pointer">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="font-medium">
                  {selectedIssue.dueDate ? format(selectedIssue.dueDate, 'MMM dd, yyyy') : 'No due date'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description with Markdown Rendering */}
        <div className="mb-10">
          <div className="linear-label mb-3">Description</div>
          <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-h2:text-base prose-h2:mt-4 prose-h2:mb-2 prose-p:text-sm prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-sm prose-ul:text-gray-700">
            <ReactMarkdown>{selectedIssue.description}</ReactMarkdown>
          </div>
        </div>

        {/* Comments */}
        <div>
          <div className="linear-label mb-4">Activity</div>
          <div className="space-y-5">
            {selectedIssue.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 avatar-container">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-medium">{comment.author.name}</span>
                    <span className="text-xs text-gray-500">
                      {format(comment.createdAt, 'MMM dd, h:mm a')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">{comment.content}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="flex gap-3 mt-6 pt-5 border-t border-gray-200">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 avatar-container">
              {selectedIssue.assignee && (
                <Image
                  src={selectedIssue.assignee.avatar}
                  alt="You"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm comment-input transition-all duration-200 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
