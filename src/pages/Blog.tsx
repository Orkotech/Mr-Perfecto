import React from 'react';
import { BookHeart } from 'lucide-react';
import { BlogCard } from '../components/blog/BlogCard';
import { BLOG_POSTS } from '../data/blogPosts';

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <BookHeart className="h-10 w-10 text-rose-600" />
          <h1 className="text-4xl font-bold text-gray-900 ml-3">Cupid's Playbook</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Insights and tips to help you become a better partner and nurture your relationship.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}