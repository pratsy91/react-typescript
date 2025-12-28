import Sidebar from "@/app/components/Sidebar";

export default function Module2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-80">
        <div className="max-w-4xl mx-auto px-8 py-12">{children}</div>
      </main>
    </div>
  );
}
