'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PortfolioForm, { Portfolio } from '@/components/PortfolioForm';

export default function CreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Portfolio) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to create portfolio');
      }

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      alert('Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Portfolio Manager
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Portfolio
          </h1>
          <p className="text-gray-600">Add a new item to your portfolio</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <PortfolioForm onSubmit={handleSubmit} isLoading={isLoading} />

        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Portfolio
          </Link>
        </div>
      </main>
    </div>
  );
}
