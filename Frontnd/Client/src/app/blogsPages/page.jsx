import BlogCard from "../components/blogComponents/blogCard";
import BlogFooter from "../components/blogComponents/BlogFooter";
import BlogsCarousel from "../components/blogComponents/BlogsCarousel";
import { blogPosts } from "../data/blogs-data";

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Header with background image */}
      <div 
        className="relative h-[500px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/blog-cover.png')" }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Text content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-2xl font-bold mb-4">Le blog de RideHub</p>
          <h1 className="text-5xl font-bold mb-8 tracking-wider">Sur la route</h1>
          <p className="text-xl mt-6 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Nos conseils, mises à jour et dernières trouvailles
            pour vivre au mieux <br /> vos locations de voiture
          </p>
        </div>
      </div>

      {/* Carousel superimposed on top of header - WIDER VERSION */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        <BlogsCarousel />
      </div> 
     
      {/* Blog Cards Section */}
      <div className="container mx-auto px-4 mt-10">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <BlogFooter />
    </div>
  );
}