import { blogPosts } from "../../data/blogs-data";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function BlogPostPage({ params }) {
  const { id } = params;
  const post = blogPosts.find((p) => p.id.toString() === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">
          Posted {post.postedDaysAgo} days ago · {post.readTime} min read
        </p>
        
        <div className="relative h-96 w-full mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{objectFit: "cover"}}
            className="rounded-lg"
          />
        </div>

        <div className="prose lg:prose-xl max-w-none mt-8">
          <p>{post.excerpt}</p>
          
        </div>
      </article>
    </div>
  );
}