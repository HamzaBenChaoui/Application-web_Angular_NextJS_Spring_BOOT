// components/BlogCard.js
import Link from 'next/link';

const BlogCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:scale-[1.02] hover:border-gray-300 transition-all duration-300 cursor-pointer group">
        {/* Image with hover effect */}
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Title with hover effect */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-gray-700">
            {post.title}
          </h3>
          
          {/* Excerpt with hover effect */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
            {post.excerpt}
          </p>
          
          {/* Blog Info with hover effects */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="transition-colors duration-300 group-hover:text-gray-700">
              {post.postedDaysAgo} days ago
            </span>
            <span className="transition-colors duration-300 group-hover:text-gray-700">
              {post.readTime} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;