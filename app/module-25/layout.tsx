import Sidebar from "../components/Sidebar";

export default function Module25Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-80 p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

