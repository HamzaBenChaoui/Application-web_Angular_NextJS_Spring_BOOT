import BlogCard from "../../components/blogComponents/blogCard";

import { blogPosts } from "../../data/blogs-propre";

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Header with background image */}
      <div 
        className="relative h-[500px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/licensed-image.jpeg')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Text content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 tracking-wider">Consiel Et Astuse</h1>
          <p className="text-xl mt-6 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Découvre nos meilleurs conseils pour bien choisir, utiliser et entretenir ton deux-roues en toute sécurité.
          </p>
        </div>
      </div>

    
     
      {/* Blog Cards Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} basePath="blogsPages/inspiration" />
          ))}
        </div>
      </div>

    </div>
  );
}