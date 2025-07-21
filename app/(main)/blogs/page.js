"use client";
import { useState, useEffect } from "react";
import BlogCard from "@/components/blog";
import BlurIn from "@/components/magicui/blur-in";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("https://dev.to/api/articles?username=dilutewater");
                if (!response.ok) throw new Error('Failed to fetch blogs');
                const data = await response.json();
                setBlogs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-5xl w-full text-center py-8 font-bold">
                        <div className="animate-pulse bg-gray-300 h-12 w-64 mx-auto rounded"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                                <div className="bg-gray-300 h-6 rounded mb-2"></div>
                                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-error mb-4">Oops! Something went wrong</h1>
                    <p className="text-xl text-gray-600 mb-8">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <BlurIn
                        word="My Blog"
                        className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2"
                    />
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Sharing my thoughts on web development, technology, and programming insights
                    </p>
                    <div className="flex justify-center mt-6">
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    </div>
                </div>

                {/* Blog Stats */}
                {/* <div className="flex justify-center mb-12">
                    <div className="stats shadow-lg border border-primary/20">
                        <div className="stat">
                            <div className="stat-title">Total Articles</div>
                            <div className="stat-value text-primary">{blogs.length}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Platform</div>
                            <div className="stat-value text-secondary">Dev.to</div>
                        </div>
                    </div>
                </div> */}

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {blogs.map((blog, index) => (
                        <div
                            key={blog.id}
                            className="opacity-0 animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                        >
                            <BlogCard
                                title={blog.title}
                                description={blog.description}
                                cover_image={blog.cover_image}
                                url={blog.url}
                                published_at={blog.published_at}
                                reading_time_minutes={blog.reading_time_minutes}
                                tag_list={blog.tag_list}
                            />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {blogs.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">✍️</div>
                        <h3 className="text-2xl font-bold mb-2">No blogs found</h3>
                        <p className="text-gray-600">Check back later for new content!</p>
                    </div>
                )}
            </div>
        </main>
    );
}