import BlogCard from "../../components/blogComponents/blogCard";

import { blogPosts } from "../../data/blogs-inspiration";

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Header with background image */}
      <div 
        className="relative h-[500px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/inspiration.jpg')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Text content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-2xl font-bold mb-4">Le blog de RideHub</p>
          <h1 className="text-5xl font-bold mb-8 tracking-wider">Inspiration</h1>
          <p className="text-xl mt-6 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Où partir ? Comment bien préparer son trajet ? Suivez le guide !
           
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