"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  product_name: string;
  product_image: string;
  product_slug: string;
  product_desc: string;
  material_type: string;
  color: string;
  min_order: string;
  port: string;
  material_origin: string;
  province_city: string;
  size: string;
  surface: string;
  FOB_price: string;
  grade: string;
  subcategory_id: number;
}

export default function MarbleDetailPage() {
  const { slug } = useParams(); // Fetching slug from URL
  const [product, setProduct] = useState<Product | null>(null);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (product?.subcategory_id && product?.id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/related/${product.subcategory_id}`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((item: Product) => item.id !== product.id);
          setRelatedProducts(filtered);
        })
        .catch((err) => console.error("Failed to fetch related products:", err));
    }
  }, [product?.subcategory_id, product?.id]);



  useEffect(() => {
    if (slug) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`) // API call with slug
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Failed to fetch product:", err));
    }
  }, [slug]);

  if (!product) {
    return <div className="text-center p-8 text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="mx-6 my-10 py-10 px-8 bg-white rounded-2xl shadow-xl">
      {/* Product Name */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{product.product_name}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${product.product_image}`} // Assuming the first image is displayed
            alt={product.product_name}
            width={800}
            height={600}
            className="rounded-xl shadow-xl object-cover w-full h-[500px]"
          />
        </div>

        {/* Right Side Info */}
        <div className="flex flex-col gap-4 h-[500px]">
          {/* Highlight Table-like Info */}
          <div className="border border-gray-300 rounded-xl overflow-hidden shadow-md sm:h-[88px]">
            <div className="grid grid-cols-4 text-sm bg-gray-100 font-semibold text-gray-700">
              <div className="p-2 sm:p-3 border-r">Grade</div>
              <div className="p-2 sm:p-3 border-r">Size</div>
              <div className="p-2 sm:p-3 border-r">Surface</div>
              <div className="p-2 sm:p-3">FOB Price</div>
            </div>
            <div className="grid grid-cols-4 text-sm text-gray-800 bg-white">
              <div className="p-2 sm:p-3 border-t border-r">{product.grade}</div>
              <div className="p-2 sm:p-3 border-t border-r">{product.size}</div>
              <div className="p-2 sm:p-3 border-t border-r">{product.surface}</div>
              <div className="p-2 sm:p-3 border-t text-green-700 font-semibold">{product.FOB_price}</div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-lg p-6 space-y-3 overflow-y-auto text-gray-700 h-[345px]">
            <p><span className="font-semibold">Description:</span> {product.product_desc}</p>
            <p><span className="font-semibold">Material:</span> {product.material_type}</p>
            <p><span className="font-semibold">Color:</span> {product.color}</p>
            <p><span className="font-semibold">Minimum Order:</span> {product.min_order}</p>
            <p><span className="font-semibold">Port:</span> {product.port}</p>
            <p><span className="font-semibold">Origin:</span> {product.material_origin}</p>
            <p><span className="font-semibold">Province/City:</span> {product.province_city}</p>
          </div>

          {/* Enquiry Button */}
          <Link href={`/enquiry?product=${encodeURIComponent(product.product_name)}`}>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
              Enquire Now
            </button>
          </Link>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.product_slug}`} className="block border rounded-xl shadow hover:shadow-md transition overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${item.product_image}`}
                    alt={item.product_name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.product_name}</h3>
                  <p className="text-sm text-gray-600">Material: {item.material_type}</p>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm text-gray-600">Grade: {item.grade}</p>
                  <p className="text-sm text-green-700 font-medium">FOB: {item.FOB_price}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
