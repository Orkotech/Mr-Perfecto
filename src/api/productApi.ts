import { API_CONFIG } from './config';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import type { Product } from '../types';

const cache = new Map<string, { data: Product[]; timestamp: number }>();

export async function fetchProducts(query: string): Promise<Product[]> {
  // Check cache first
  const cacheKey = query.toLowerCase();
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < API_CONFIG.cache.duration) {
    return cached.data;
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find matching products from mock data
  const products = Object.entries(MOCK_PRODUCTS)
    .filter(([key]) => key.includes(query.toLowerCase()))
    .flatMap(([, products]) => products);

  // Update cache
  cache.set(cacheKey, {
    data: products,
    timestamp: Date.now()
  });

  return products;
}