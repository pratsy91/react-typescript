"use client";

import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  title?: string;
  output?: string;
  error?: string;
}

export default function CodeBlock({
  children,
  title,
  output,
  error,
}: CodeBlockProps) {
  return (
    <div className="my-6">
      {title && (
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {title}
        </div>
      )}
      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
          <code>{children}</code>
        </pre>
        {output && (
          <div className="bg-green-50 dark:bg-green-900/20 border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
              Output:
            </div>
            <pre className="text-sm text-green-700 dark:text-green-300">
              {output}
            </pre>
          </div>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
              Error:
            </div>
            <pre className="text-sm text-red-700 dark:text-red-300">
              {error}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
