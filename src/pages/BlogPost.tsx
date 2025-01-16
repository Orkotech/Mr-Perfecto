import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Link to="/blog" className="text-rose-600 hover:text-rose-700">
          Return to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link 
        to="/blog"
        className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to blog
      </Link>

    <article className="flex flex-col h-full">
        <div className="mb-8">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="flex items-center mb-6">
          <span className="text-sm font-medium text-rose-600 uppercase tracking-wider">
            {post.category}
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        
        <div className="prose prose-rose max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}