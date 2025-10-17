import BlogFooter from "../components/BlogFooter";
import BlogsCarousel from "../components/BlogsCarousel";

export default function BlogsPage() {
  return (
    <div className="relative">
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

      {/* Carousel superimposed on top of header */}
      <div className="absolute left-8 top-[360px] w-full max-w-2xl px-4 sm:px-6 lg:px-8 z-30">
        <BlogsCarousel />
      </div>

      {/* Spacer to push content below */}
      <div className="pt-80">
        {/* This creates space for the superimposed carousel */}
      </div>

    </div>
  );
}