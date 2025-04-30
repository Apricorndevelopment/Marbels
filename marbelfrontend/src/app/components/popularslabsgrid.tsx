'use client';

import { useEffect, useState } from "react";
import { PopularSlabs } from "./popularslabs";
import Link from "next/link";
import axiosInstance from "../../../utils/axiosInstance";

interface Product {
  id: number;
  product_name: string;
  product_image: string;
  product_slug: string; // Add product_slug
  material_origin: string;
  min_order: number;
  FOB_price: number;
  province_city: string;
}

export function PopularProductsGrid() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await axiosInstance.get("/products/popular");
        setPopularProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch popular products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div id="popular-slab" className="p-3 sm:p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Popular Natural Stone</h2>

      {loading ? (
        <p>Loading Popular Stones...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {popularProducts.map((product) => (
            <Link href={`/products/${product.product_slug}`} key={product.id}> {/* Update link to use product_slug */}
              <PopularSlabs key={product.id} product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
