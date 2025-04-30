"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Sidebar } from "./components/marketItemsParent";
import { StoneLib } from "./components/stonelib";
import { StoneHead } from "./components/stoneHeadCard";
import { StoneCard } from "./components/stoneCard";
import axiosInstance from "../../utils/axiosInstance";
import Link from "next/link";
import { Counter } from "./components/counterup";

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
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);


  return (
    <>
      <div className="cont1 flex pt-14 pb-12 gap-4 sm:gap-16 lg:gap-7 xl:gap-5 2xl:gap-10 bg-white border shadow-xl">
        <Sidebar setActiveMarket={setActiveMarket} />

        <div className="flex gap-0 xl:gap-4 flex-wrap relative">
          <div className="overflow-hidden ms-3 hidden sm:block xl:ms-0 w-[200px] h-[150px] sm:h-fit sm:w-[400px] md:w-[480px] lg:w-[450px] xl:w-[490px] 2xl:w-[600px] relative">
            <Image
              className="pt-6 w-full h-full object-cover"
              src="/Main-Banner.jpg"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>

          <div className="px-3 relative 2xl:ms-8">
            <h4 className="font-semibold xl:mb-6">Sponsors</h4>
            <div className="flex flex-col sm:flex-row gap-4 2xl:gap-7 justify-center items-center py-4">
              <div className="lg:w-[150px] xl:w-[185px] 2xl:w-[235px]">
              <Image src="/sponsor3.png" alt="Logo" className="border border-gray-200 p-1 w-full h-full object-cover" width={100} height={100} />
              </div>
              <div className="lg:w-[150px] xl:w-[185px] 2xl:w-[235px]">
              <Image src="/sponsor1.png" alt="Logo" className="border border-gray-200 p-1 w-full h-full object-cover" width={100} height={100} />
              </div>
              {/* <Image src="/sponsor2.png" alt="Logo" className="border border-gray-200 p-1" width={100} height={100} /> */}
            </div>

          </div>
          {activeMarket && (
            <div className="absolute inset-0 bg-white border flex flex-col px-6 py-4 mb-4">
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
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-xl hover:border-black transition-transform hover:scale-[1.02]">
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
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-xl hover:border-black transition-transform hover:scale-[1.02]">
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
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-xl hover:border-black transition-transform hover:scale-[1.02]">
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
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-xl hover:border-black transition-transform hover:scale-[1.02]">
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
          <div className="flex gap-3 w-56 border border-gray-400 p-2 shadow-xl hover:border-black transition-transform hover:scale-[1.02]">
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

      <div
        className="sm:my-5 text-black bg-white flex lg:justify-between flex-wrap justify-center items-center p-8 rounded-md shadow-xl">
        <div className="sm:text-3xl flex flex-col gap-4 sm:gap-16">
          <h1>REQUEST FOR QUOTATION </h1>
          <div className="flex gap-4 sm:gap-12">
            <div className="flex gap-2 sm:gap-4 items-center">
              <i className="bi bi-journal-arrow-up text-4xl border-[1.5px] border-black rounded-full p-3"></i>
              <h1>
                <Counter end={30000} /> + <br /> Requests
              </h1>
            </div>
            <div className="flex gap-4 items-center">
              <i className="bi bi-basket text-4xl border-[1.5px] border-black rounded-full p-3"></i>
              <h1>
                <Counter end={42000} /> + <br /> Products
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-0 sm:p-6">
          <h2 className="text-2xl font-semibold">Want to get quotations?</h2>
          <input
            type="text"
            placeholder="What are you looking for.."
            className="sm:w-full p-3 mt-4 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-[12px] sm:text-sm mt-1">
            Please input the name of product you need!
          </p>
          <div className="flex gap-4 mt-4">
            <input
              type="number"
              placeholder="Quantity"
              className="flex-1 w-full p-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="p-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Pieces</option>
              <option>Boxes</option>
              <option>Foot</option>
              <option>Meter</option>
            </select>
          </div>
          <p className="text-red-500 text-[13px] sm:text-sm mt-1">
            Please Input your Need Product Number!
          </p>
          <button className="w-full mt-4 p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
            Request For Quotation
          </button>
        </div>
      </div>

    </>
  );
}
