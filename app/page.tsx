import Link from 'next/link';
import PortfolioList from '@/components/PortfolioList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Portfolio Manager
            </h1>
            <Link
              href="/create"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add Portfolio
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            My Portfolio
          </h2>
          <p className="text-gray-600">Manage and showcase your portfolio items</p>
        </div>

        <PortfolioList />
      </main>
    </div>
  );
}
