// components/BlogCard.js
import Link from 'next/link';

const BlogCard = ({ post, basePath = 'blog' }) => {
  return (
    <Link href={`/${basePath}/${post.id}`}>
      
      {/* 1. La carte doit être h-full et flex-col */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:scale-[1.02] hover:border-gray-300 transition-all duration-300 cursor-pointer group 
      
          h-full flex flex-col">
        
        {/* Image (pas de changement) */}
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* 2. Le contenu doit grandir (flex-grow) pour remplir l'espace */}
        <div className="p-6 flex flex-col flex-grow">
          
          {/* Titre (pas de changement) */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-gray-700">
            {post.title}
          </h3>
          
          {/* Extrait (pas de changement) */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
            {post.excerpt}
          </p>
          
          {/* 3. L-BLAN (LA MAGIE) : "mt-auto" pousse le footer en bas */}
          <div className="flex items-center justify-between text-xs text-gray-500
          
              mt-auto"> 
            
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