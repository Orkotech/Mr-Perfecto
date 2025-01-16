import React, { useEffect, useState } from 'react';
import { Gift } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { RecommendationEngine } from '../../services/recommendationEngine';
import type { Partner, Product } from '../../types';

interface GiftSuggestionsProps {
  partner: Partner;
}

export function GiftSuggestions({ partner }: GiftSuggestionsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const engine = RecommendationEngine.getInstance();
        const recommendations = await engine.getRecommendations({
          partner,
          upcomingEvents: true
        });
        setProducts(recommendations);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [partner]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Gift className="h-6 w-6 text-rose-600 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-900">Gift Ideas</h2>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finding perfect gift ideas...</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}