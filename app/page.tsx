import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Master TypeScript for React
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          A comprehensive, no-shortcuts learning platform covering every
          TypeScript type, concept, and pattern you need to become a TypeScript
          expert in React development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Complete Coverage
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Every type, concept, and feature - nothing left out
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Practical Examples
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Real-world code examples for every concept
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              React Focused
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              TypeScript patterns specifically for React development
            </p>
          </div>
        </div>

        <Link
          href="/module-1/primitive-types"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          Start Learning →
        </Link>

        <div className="mt-16 text-left max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            What You'll Learn
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">
                ✓
              </span>
              <span>
                <strong>Module 1:</strong> Core Type System - All primitive,
                special, and literal types
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">
                ✓
              </span>
              <span>
                <strong>Module 2:</strong> Complex Types - Arrays, objects,
                unions, intersections, and more
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">
                ✓
              </span>
              <span>
                <strong>Module 3:</strong> Advanced Features - Generics, utility
                types, mapped types
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">
                ✓
              </span>
              <span>
                <strong>Module 4+:</strong> React-specific TypeScript, hooks,
                components, patterns, and ecosystem
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
