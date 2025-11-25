'use client';

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

interface PortfolioCardProps {
  portfolio: Portfolio;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

export default function PortfolioCard({
  portfolio,
  onDelete,
  isDeleting = false,
}: PortfolioCardProps) {
  const startDate = new Date(portfolio.startDate);
  const endDate = portfolio.endDate ? new Date(portfolio.endDate) : null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const dateRange = endDate
    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
    : `${formatDate(startDate)} - Present`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {portfolio.image && (
        <img
          src={portfolio.image}
          alt={portfolio.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {portfolio.title}
          </h3>
          {portfolio.featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-2">{portfolio.category}</p>
        <p className="text-gray-600 mb-4">{portfolio.description}</p>

        {portfolio.technologies && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Tech:</span> {portfolio.technologies}
            </p>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-4">{dateRange}</p>

        <div className="flex gap-2">
          {portfolio.link && (
            <a
              href={portfolio.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-center text-sm font-medium hover:bg-blue-700"
            >
              View Project
            </a>
          )}
          <Link
            href={`/edit/${portfolio.id}`}
            className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded text-center text-sm font-medium hover:bg-gray-300"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete?.(portfolio.id)}
            disabled={isDeleting}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-red-700 disabled:bg-gray-400"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
