import BlogCard from "@/components/blog";
export default async function blogs() {
    const response = await fetch("https://dev.to/api/articles?username=dilutewater");
    const data = await response.json();
    const blogs = data;

    console.log(blogs);

    return (
        <main className="bg-base-100">
            <div className="text-5xl w-full text-center py-5 font-bold underline">Blogs</div>

            <div className="flex w-full justify-center">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16 gap-x-8">
                    {/* {blogs.map((blog) => (
                        <div key={blog.id}>
                        <div className="flex justify-center">
                            {blog.title}
                        </div>
                        <div>
                            {blog.description}
                        </div>
                        <img src={blog.cover_image} width={100} />
                        </div>
                    ))} */}
                    {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        title={blog.title}
                        description={blog.description}
                        cover_image={blog.cover_image}
                        url={blog.url}
                    />
                    ))}
                </div>
            </div>
        </main>
    );
}
