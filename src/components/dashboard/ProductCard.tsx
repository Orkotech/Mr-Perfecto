import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  title: string;
  price: string;
  url: string;
  image?: string;
  category: string;
}

export function ProductCard({ title, price, url, image, category }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <div className="aspect-w-16 aspect-h-9">
          <img src={image} alt={title} className="object-cover w-full h-48" />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs font-medium text-rose-600 uppercase tracking-wider">
          {category}
        </span>
        <h3 className="mt-1 text-lg font-medium text-gray-900 line-clamp-2">{title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{price}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-rose-600 hover:text-rose-700"
          >
            View <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}