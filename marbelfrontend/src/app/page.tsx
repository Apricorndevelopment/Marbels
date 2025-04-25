"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Sidebar } from "./components/marketItemsParent";
import { StoneLib } from "./components/stonelib";
import { StoneHead } from "./components/stoneHeadCard";
import { StoneCard } from "./components/stoneCard";
import axios from "axios";
import Link from "next/link";

type Category = {
  id: number;
  categorie_name: string;
  image_url: string;
};

export default function Home() {
  const [activeMarket, setActiveMarket] = useState<string[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);


  return (
    <>
      <div className="cont1 flex px-3 pt-14 pb-12 gap-4 sm:gap-16 xl:gap-5 lg:gap-7 bg-white border shadow-xl">
        <Sidebar setActiveMarket={setActiveMarket} />

        <div className="flex gap-0 xl:gap-4 flex-wrap relative">
          <div className="overflow-hidden ms-3 hidden sm:block xl:ms-0 w-[200px] h-[150px] sm:h-fit sm:w-[400px] md:w-[500px] lg:w-[450px] xl:w-[550px] relative">
            <Image
              className="pt-12 w-full h-full object-cover"
              src="/Main-Banner.jpg"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>

          <div className="px-6 relative">
            <h4 className="font-semibold">Sponsors</h4>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center py-4">
              <Image src="/sponsor3.png" alt="Logo" className="border border-gray-200 p-1" width={100} height={100} />
              <Image src="/sponsor1.png" alt="Logo" className="border border-gray-200 p-1" width={100} height={100} />
              <Image src="/sponsor2.png" alt="Logo" className="border border-gray-200 p-1" width={100} height={100} />
            </div>

          </div>
          {activeMarket && (
            <div className="absolute inset-0 bg-yellow-50 flex flex-col px-6 py-4 mb-4">
              <h4 className="text-3xl font-bold mb-6">Categories</h4>
              <ul className="list-disc text-lg space-y-3 grid grid-cols-2 md:grid-cols-3 gap-7 px-8">
                {activeMarket.map((item, index) => (
                  <li key={index} className="text-gray-700 hover:text-black text-2xl cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="cont2 mt-8">
        <StoneLib />
      </div>

      <div className="cont3 flex flex-wrap w-full p-5 my-6 bg-white shadow-lg">
        <div className="w-full md:w-1/2 lg:w-1/4">
          {categories.length > 0 && (
            <Link key={categories[0].id} href={`/products?category_id=${categories[0].id}`}>
            <StoneHead
              icon={categories[0].image_url}
              name={categories[0].categorie_name}
              w={300}
              h={450}
            />
          </Link>
        )}
        </div>
        <div className="w-full md:w-1/2 lg:w-3/4">
          <div className="flex flex-wrap ">
            <div className="w-1/2 lg:w-1/4">
              <StoneCard icon="/mar_pics/marbel2.jpg" name="Stone Blocks" />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard icon="/mar_pics/marbel4.jpg" name="Stone tiles" />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard
                icon="/mar_pics/marbel3.jpg"
                name="Interioe stone products"
              />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard icon="/mar_pics/marbel2.jpg" name="kitchen sink" />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 lg:w-1/4">
              <StoneCard icon="/mar_pics/marbel1.jpg" name="stone sculpture" />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard
                icon="/mar_pics/marbel5.jpg"
                name="building stone ledge"
              />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard icon="/mar_pics/marbel4.jpg" name="gravestone" />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard
                icon="/mar_pics/marbel3.jpg"
                name="landscaping stones"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sponsor px-5 py-10 bg-white shadow-xl">
        <h1 className="text-4xl font-bold mb-8">Our Sponsors</h1>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-md hover:border-black transition-transform hover:scale-[1.02]">
            <Image
              src={"/sponsor3.gif"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1 className="text-sm font-semibold">Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm mt-1">China</p>
            </div>
          </div>
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-md hover:border-black transition-transform hover:scale-[1.02]">
            <Image
              src={"/sponsor4.png"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1 className="text-sm font-semibold">Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm mt-1">China</p>
            </div>
          </div>
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-md hover:border-black transition-transform hover:scale-[1.02]">
            <Image
              src={"/sponsor5.png"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1 className="text-sm font-semibold">Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm mt-1">China</p>
            </div>
          </div>
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-md hover:border-black transition-transform hover:scale-[1.02]">
            <Image
              src={"/sponsor6.jpg"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1 className="text-sm font-semibold">Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm mt-1">China</p>
            </div>
          </div>
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-md hover:border-black transition-transform hover:scale-[1.02]">
            <Image
              src={"/sponsor7.jpg"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1 className="text-sm font-semibold">Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm mt-1">China</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cont4 flex flex-wrap w-full px-5 py-10 my-6 bg-white shadow-lg">
        <div className="w-full md:w-1/2 lg:w-1/4">
          {categories.length > 1 && (
            <Link key={categories[1].id} href={`/products?category_id=${categories[1].id}`}>
              <StoneHead
                icon={categories[1].image_url}
                name={categories[1].categorie_name}
                w={300}
                h={450}
              />
            </Link>
          )}
        </div>
        <div className="w-full md:w-1/2 lg:w-3/4">
          <div className="flex flex-wrap">
            <div className="w-1/2 lg:w-1/4">
              <StoneCard icon="/mar_pics/marbel3.jpg" name="Stone Blocks" />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard icon="/mar_pics/marbel2.jpg" name="Stone tiles" />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard
                icon="/mar_pics/marbel5.jpg"
                name="Interioe stone products"
              />
            </div>
            <div className="w-1/2 lg:w-1/4">
              <StoneCard icon="/mar_pics/marbel3.jpg" name="kitchen sink" />
            </div>
          </div>
          <div className="flex">
            <div className=" w-1/3">
              <StoneCard icon="/mar_pics/marbel4.jpg" name="stone sculpture" />
            </div>
            <div className=" w-1/3">
              <StoneCard
                icon="/mar_pics/marbel5.jpg"
                name="building stone ledge"
              />
            </div>
            <div className=" w-1/3">
              <StoneCard icon="/mar_pics/marbel1.jpg" name="gravestone" />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
