import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import type { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.id}`} className="block group h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
        <div className="aspect-w-16 aspect-h-9 relative h-48">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center mb-2">
            <span className="text-xs font-medium text-rose-600 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-rose-600">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-2 flex-1">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}