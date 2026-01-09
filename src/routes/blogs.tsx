import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendar, FaClock, FaTag, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export const Route = createFileRoute('/blogs')({
  component: Blogs,
})

function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=dilutewater")
        .then((res) => res.json())
        .then((data) => {
            setBlogs(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
  }, []);

  return (
    <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl relative">
       {/* Dynamic Background */}
       <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </div>

      <header className="mb-16">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-primary/30 backdrop-blur-sm"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Writings</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Thoughts, tutorials, and insights on Web Development, Blockchain, and Technology.
            </p>
        </motion.div>
      </header>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
                <motion.a
                    key={index}
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group glass rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-white/10 hover:border-primary/30"
                >
                    {/* Cover Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-secondary/50">
                        {blog.cover_image ? (
                            <img 
                                src={blog.cover_image} 
                                alt={blog.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary">
                                <span className="text-4xl font-bold text-white/10">Dev.to</span>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read <FaExternalLinkAlt size={10} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                            <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
                                <FaCalendar size={10} />
                                {new Date(blog.published_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
                                <FaClock size={10} />
                                {blog.reading_time_minutes} min read
                            </span>
                        </div>

                        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {blog.title}
                        </h2>
                        
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                            {blog.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {blog.tag_list.map((tag: string) => (
                                <span key={tag} className="text-[10px] font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded border border-primary/20">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.a>
            ))}
        </div>
      )}
    </main>
  )
}
