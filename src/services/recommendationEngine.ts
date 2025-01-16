import { fetchProducts } from '../api/productApi';
import type { Partner, Product } from '../types';

interface RecommendationContext {
  partner: Partner;
  upcomingEvents: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
}

export class RecommendationEngine {
  private static instance: RecommendationEngine;
  private requestQueue: Promise<any>[] = [];
  private concurrentLimit = 3;

  private constructor() {}

  static getInstance(): RecommendationEngine {
    if (!this.instance) {
      this.instance = new RecommendationEngine();
    }
    return this.instance;
  }

  async getRecommendations(context: RecommendationContext): Promise<Product[]> {
    const queries = this.generateQueries(context);
    const products: Product[] = [];

    // Process queries in batches to respect rate limits
    for (let i = 0; i < queries.length; i += this.concurrentLimit) {
      const batch = queries.slice(i, i + this.concurrentLimit);
      const batchResults = await Promise.all(
        batch.map(query => this.queueRequest(() => fetchProducts(query)))
      );
      products.push(...batchResults.flat());
    }

    return this.rankProducts(products, context);
  }

  private generateQueries(context: RecommendationContext): string[] {
    const { partner } = context;
    const queries: string[] = [];

    // Generate interest-based queries
    partner.interests.forEach(interest => {
      queries.push(`${interest} gift ideas`);
      if (partner.favorite_colors.length > 0) {
        queries.push(`${partner.favorite_colors[0]} ${interest} accessories`);
      }
    });

    // Add size-specific queries if available
    if (partner.clothing_size) {
      queries.push(`clothing ${partner.clothing_size} fashion`);
    }

    return queries;
  }

  private async queueRequest<T>(request: () => Promise<T>): Promise<T> {
    const promise = request();
    this.requestQueue.push(promise);
    
    if (this.requestQueue.length > this.concurrentLimit) {
      await this.requestQueue.shift();
    }
    
    return promise;
  }

  private rankProducts(products: Product[], context: RecommendationContext): Product[] {
    return products
      .filter(product => this.isRelevant(product, context))
      .sort((a, b) => this.calculateRelevanceScore(b, context) - this.calculateRelevanceScore(a, context))
      .slice(0, 10);
  }

  private isRelevant(product: Product, context: RecommendationContext): boolean {
    if (!product.price) return false;
    
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    
    if (context.priceRange) {
      return price >= context.priceRange.min && price <= context.priceRange.max;
    }
    
    return true;
  }

  private calculateRelevanceScore(product: Product, context: RecommendationContext): number {
    let score = 0;
    const { partner } = context;

    // Check if product matches interests
    partner.interests.forEach(interest => {
      if (product.title.toLowerCase().includes(interest.toLowerCase())) {
        score += 2;
      }
    });

    // Check if product matches color preferences
    partner.favorite_colors.forEach(color => {
      if (product.title.toLowerCase().includes(color.toLowerCase())) {
        score += 1;
      }
    });

    return score;
  }
}