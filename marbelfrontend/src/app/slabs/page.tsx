"use client";
import { useEffect, useState } from "react";
import { SlabsCard } from "../components/slabscard";
import { StoneHead } from "../components/stoneHeadCard";
import { Counter } from "../components/counterup";
import { PopularProductsGrid } from "../components/popularslabsgrid";
import Link from "next/link";
import axiosInstance from "../../../utils/axiosInstance";

interface BackendProduct {
  id: number;
  product_name: string;
  size: string;
  min_order: string;
  FOB_price: string;
  product_image: string;
  product_slug: string;  // Add the slug field
}

interface SlabProduct {
  id: number;
  name: string;
  thick: string;
  stock: number;
  price: number;
  image: string;
  slug: string;  // Add the slug to the SlabProduct interface
}
// const BrownStone = [
//   {
//     name: "Admiral Blue Quartzite",
//     thick:"17",
//     stock: 200.85,
//     price: 358.568,
//     image: "/mar_pics/marbel4.jpg",
//   },
//   {
//     name: "Blue Sodalite",
//     thick:"18",
//     stock: 1010.01,
//     price: 432.11,
//     image: "/mar_pics/marbel6.jpg",
//   },
//   {
//     name: "Sodalite Royal Blue",
//     thick:"17",
//     stock: 54.65,
//     price: 790.58,
//     image: "/mar_pics/marbel3.jpg",
//   },
//   {
//     name: "Emerald Green Quartzite",
//     thick:"19",
//     stock: 967.06,
//     price: 345.58,
//     image: "/mar_pics/marbel8.jpg",
//   },
//   {
//     name: "Hermes Gray Marble",
//     thick:"18",
//     stock: 3411.88,
//     price: 234.74,
//     image: "/mar_pics/marbel9.jpg",
//   },
// ];

export default function Home() {
  const [whiteStones, setWhiteStones] = useState<SlabProduct[]>([]);
  const [blueStones, setBlueStones] = useState<SlabProduct[]>([]);
  const [brownStones, setBrownStones] = useState<SlabProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByColor = async (color: string): Promise<SlabProduct[]> => {
      try {
        const res = await axiosInstance.get(`/products/color/${color}`);
        return (res.data as BackendProduct[]).map((product) => ({
          id: product.id,
          name: product.product_name,
          thick: product.size || "18",
          stock: parseFloat(product.min_order),
          price: parseFloat(product.FOB_price),
          image: `/${product.product_image.replace(/^\/?/, '')}`,
          slug: product.product_slug,  // Map the slug
        }));
      } catch (error) {
        console.error(`Failed to fetch ${color} products`, error);
        return [];
      }
    };

    const fetchAllColors = async () => {
      try {
        const [white, blue, brown] = await Promise.all([
          fetchProductsByColor("White"),
          fetchProductsByColor("Blue"),
          fetchProductsByColor("Brown"),
        ]);
        setWhiteStones(white);
        setBlueStones(blue);
        setBrownStones(brown);
      } finally {
        setLoading(false);
      }
    };
    fetchAllColors();
  }, []);
  
  return (
    <>
      <div className="h-96 w-full bg-cover bg-center" style={{ backgroundImage: `url('/mar_pics/marbel7.jpg')` }}>
        <div className="flex justify-center items-center flex-col text-white gap-14 pt-20">
          <h1 className="text-3xl sm:text-4xl font-semibold">Best, Cheap, All in Stock </h1>
          <div className="flex gap-30 sm:gap-40 items-center justify-center">
            <div className="text-2xl sm:text-3xl flex flex-col items-center justify-center">
              <h1 className="font-bold"><Counter end={157800} /> </h1>
              <h1 className="text-2xl">In Stock</h1>
            </div>
            <div className="text-2xl sm:text-3xl flex flex-col items-center justify-center">
              <h1 className="font-bold"> <Counter end={1056} /> </h1>
              <h1 className="text-xl">Material Types</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <PopularProductsGrid />
      </div>

      {loading ? (
        <p className="p-3 sm:p-6">Loading Coloured Stones...</p>
      ) : (
        <div className="container mx-auto">
          <div className="my-6 p-3 sm:p-6 bg-gray-100 rounded-2xl" id="white-slab">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              <div className="col-span-2">
                <Link href={"/products?color=White"}>
                  <StoneHead icon="/mar_pics/marbel5.jpg" name="White Stone Slabs" w={340} h={300} />
                </Link>
              </div>
              {whiteStones.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <SlabsCard product={product} />
                </Link>
              ))}
            </div>
          </div>

          <div className="my-6 p-3 sm:p-6 bg-gray-100 rounded-2xl" id="blue-slab">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              <div className="col-span-2">
                <Link href={"/products?color=Blue"}>
                  <StoneHead icon="/mar_pics/marbel3.jpg" name="Blue Stone Slabs" w={340} h={300} />
                </Link>
              </div>
              {blueStones.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <SlabsCard product={product} />
                </Link>
              ))}
            </div>
          </div>

          <div className="my-6 p-3 sm:p-6 bg-gray-100 rounded-2xl" id="brown-slab">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              <div className="col-span-2">
                <Link href={"/products?color=Brown"}>
                  <StoneHead icon="/mar_pics/marbel7.jpg" name="Brown Stone Slabs" w={340} h={300} />
                </Link>
              </div>
              {brownStones.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <SlabsCard product={product} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}