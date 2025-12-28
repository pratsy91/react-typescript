import { ReactNode } from "react";

interface InfoBoxProps {
  type?: "info" | "tip" | "warning" | "important";
  children: ReactNode;
}

export default function InfoBox({ type = "info", children }: InfoBoxProps) {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    tip: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    important:
      "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  };

  const textStyles = {
    info: "text-blue-800 dark:text-blue-300",
    tip: "text-green-800 dark:text-green-300",
    warning: "text-yellow-800 dark:text-yellow-300",
    important: "text-red-800 dark:text-red-300",
  };

  const labels = {
    info: "💡 Info",
    tip: "✨ Tip",
    warning: "⚠️ Warning",
    important: "🔴 Important",
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} my-4`}>
      <div className={`font-semibold text-sm mb-2 ${textStyles[type]}`}>
        {labels[type]}
      </div>
      <div className={`text-sm ${textStyles[type]}`}>{children}</div>
    </div>
  );
}
