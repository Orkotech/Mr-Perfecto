import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
        <Link to="/blog" className="text-rose-500 hover:text-rose-400">
          Return to blog
        </Link>
      </div>
    );
  }

  const formatContent = (content: string) => {
    const lines = content.trim().split('\n');
    const formattedContent = [];
    let currentSection: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) return;

      // Check for numbered sections (e.g., "1. Title")
      if (/^\d+\.\s/.test(trimmedLine)) {
        if (currentSection.length > 0) {
          formattedContent.push(<div key={`section-${formattedContent.length}`} className="mb-8">{currentSection}</div>);
          currentSection = [];
        }
        formattedContent.push(
          <h2 key={`heading-${index}`} className="text-2xl font-bold text-white mt-8 mb-4">
            {trimmedLine}
          </h2>
        );
      }
      // Check for subsections (ending with ":")
      else if (trimmedLine.endsWith(':')) {
        currentSection.push(
          <h3 key={`subheading-${index}`} className="text-xl font-semibold text-rose-400 mt-6 mb-3">
            {trimmedLine.slice(0, -1)}
          </h3>
        );
      }
      // Regular paragraphs
      else {
        currentSection.push(
          <p key={`paragraph-${index}`} className="text-gray-300 mb-4 leading-relaxed">
            {trimmedLine}
          </p>
        );
      }
    });

    // Add any remaining section
    if (currentSection.length > 0) {
      formattedContent.push(<div key={`section-${formattedContent.length}`} className="mb-8">{currentSection}</div>);
    }

    return formattedContent;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-rose-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link 
          to="/blog"
          className="inline-flex items-center text-rose-500 hover:text-rose-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to blog
        </Link>

        <article className="bg-black/40 backdrop-blur-sm rounded-lg border border-rose-500/20 shadow-lg shadow-rose-900/20 p-8">
          <div className="mb-8">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="flex items-center mb-6">
            <span className="text-sm font-medium text-rose-500 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="flex items-center text-sm text-gray-300">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-8">{post.title}</h1>
          
          <div className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </div>
        </article>
      </div>
    </div>
  );
}