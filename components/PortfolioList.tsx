'use client';

import { useEffect, useState } from 'react';
import PortfolioCard from './PortfolioCard';
import Link from 'next/link';

interface Portfolio {
  id: number;
  title: string;
  description: string;
  link?: string;
  image?: string;
  category: string;
  startDate: string;
  endDate?: string;
  technologies?: string;
  featured: boolean;
}

interface PortfolioListProps {
  featured?: boolean;
}

export default function PortfolioList({ featured = false }: PortfolioListProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchPortfolios();
  }, [featured]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const url = featured
        ? '/api/portfolios?featured=true'
        : '/api/portfolios';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch portfolios');
      const data = await response.json();
      setPortfolios(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      setDeletingId(id);
      const response = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete portfolio');
      setPortfolios(portfolios.filter((p) => p.id !== id));
    } catch (err: any) {
      alert('Error deleting portfolio: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading portfolios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No portfolios found</p>
        <Link
          href="/create"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create your first portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
          onDelete={handleDelete}
          isDeleting={deletingId === portfolio.id}
        />
      ))}
    </div>
  );
}
