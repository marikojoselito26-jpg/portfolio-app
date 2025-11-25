'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import PortfolioForm, { Portfolio } from '@/components/PortfolioForm';

export const dynamic = 'force-dynamic';

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolios/${id}`);
        if (!response.ok) throw new Error('Failed to fetch portfolio');
        const data = await response.json();
        
        // Format dates for input
        data.startDate = new Date(data.startDate).toISOString().split('T')[0];
        if (data.endDate) {
          data.endDate = new Date(data.endDate).toISOString().split('T')[0];
        }
        
        setPortfolio(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const handleSubmit = async (data: Portfolio) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`/api/portfolios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to update portfolio');
      }

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Portfolio Manager
            </Link>
          </div>
        </nav>
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Portfolio Manager
            </Link>
          </div>
        </nav>
        <div className="text-center py-12">
          <p className="text-red-500">Portfolio not found</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

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
            Edit Portfolio
          </h1>
          <p className="text-gray-600">Update your portfolio item</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <PortfolioForm
          initialData={portfolio}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />

        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Portfolio
          </Link>
        </div>
      </main>
    </div>
  );
}
