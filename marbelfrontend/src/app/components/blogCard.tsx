import Link from "next/link";
import Image from "next/image";

interface BlogProps {
  blog: {
  id: number;
  blog_name: string;
  blog_image: string;
  blog_shortdesc: string;
  blog_type: string;
  post_by: string;
  created_at:string;
  };
}

export default function BlogCard({ blog }: BlogProps) {
  return (
    <Link href={`blogs/${blog.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] min-h-[430px]">
        <div className="w-full h-56">
        <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${blog.blog_image}`} width={300} height={200} alt={blog.blog_name || "Blog Image"} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{blog.blog_name}</h2>
          <h2 className="font-semibold my-2">Blog Type - {blog.blog_type}</h2>
          <p className="text-gray-600 text-sm mt-2">{blog.blog_shortdesc}</p>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>By {blog.post_by}</span>
            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
