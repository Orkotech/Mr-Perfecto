import { load } from 'cheerio';

interface Product {
  title: string;
  price: string;
  url: string;
  image?: string;
}

interface ProductSearch {
  category: string;
  keywords: string[];
}

const AMAZON_SEARCH_URL = 'https://www.amazon.com/s?k=';

export async function searchProducts(interests: string[]): Promise<Product[]> {
  const searchQueries = generateSearchQueries(interests);
  const products: Product[] = [];

  for (const query of searchQueries) {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query.keywords.join('+'))}`);
      const html = await response.text();
      const $ = load(html);

      $('.s-result-item').each((_, element) => {
        const $element = $(element);
        const title = $element.find('h2').text().trim();
        const price = $element.find('.a-price-whole').first().text().trim();
        const url = $element.find('a.a-link-normal').first().attr('href');
        const image = $element.find('img.s-image').first().attr('src');

        if (title && price && url) {
          products.push({
            title,
            price: `$${price}`,
            url: `https://amazon.com${url}`,
            image,
            category: query.category
          });
        }
      });
    } catch (error) {
      console.error(`Error searching for ${query.category}:`, error);
    }
  }

  return products.slice(0, 10); // Return top 10 products
}

function generateSearchQueries(interests: string[]): ProductSearch[] {
  return interests.map(interest => {
    switch (interest) {
      case 'Reading':
        return {
          category: 'Books',
          keywords: ['bestseller books', 'popular novels']
        };
      case 'Cooking':
        return {
          category: 'Kitchen',
          keywords: ['cooking gadgets', 'kitchen tools']
        };
      case 'Fashion':
        return {
          category: 'Fashion',
          keywords: ['trendy accessories', 'fashion items']
        };
      // Add more cases for other interests
      default:
        return {
          category: interest,
          keywords: [`best ${interest.toLowerCase()} gifts`]
        };
    }
  });
}