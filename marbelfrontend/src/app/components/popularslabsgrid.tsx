// const products = [
//   {
//     name: "Admiral Blue Quartzite",
//     origin: "Brazil",
//     flag: "🇧🇷",
//     stock: 200.85,
//     price: 358.568,
//     image: "/mar_pics/marbel7.jpg",
//   },
//   {
//     name: "Blue Sodalite",
//     origin: "Bolivia",
//     flag: "🇧🇴",
//     stock: 1010.01,
//     price: 432.11,
//     image: "/mar_pics/marbel9.jpg",
//   },
//   {
//     name: "Aquarella Quartzite",
//     origin: "Brazil",
//     flag: "🇧🇷",
//     stock: 79.63,
//     price: 633.58,
//     image: "/mar_pics/marbel6.jpg",
//   },
//   {
//     name: "Picasso Silver Quartzite",
//     origin: "Brazil",
//     flag: "🇧🇷",
//     stock: 85.48,
//     price: 214.11,
//     image: "/mar_pics/marbel8.jpg",
//   },
//   {
//     name: "Macaubas Illusion Quartzite",
//     origin: "Brazil",
//     flag: "🇧🇷",
//     stock: 6.18,
//     price: 432.35,
//     image: "/mar_pics/marbel5.jpg",
//   },
// ];

'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { PopularSlabs } from "./popularslabs";
import Link from "next/link";

interface Product {
  id: number;
  product_name: string;
  product_image: string;
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
        const res = await axios.get("http://127.0.0.1:8000/api/products/popular");
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
    <div id="popular-slab" className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Popular Natural Stone</h2>

      {loading ? (
        <p>Loading Popular Stones...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {popularProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
            <PopularSlabs key={product.id} product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
