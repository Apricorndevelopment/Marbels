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

interface Subcategory {
  id: number;
  subcategorie_name: string;
  category_id: number;
}

export default function Home() {
  const [activeMarket, setActiveMarket] = useState<Subcategory[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [requirement, setRequirement] = useState("");
  const [qnt, setQnt] = useState("");
  const [unit, setUnit] = useState("Pieces");

  const handleSubmit = async () => {
    if (!requirement || !qnt || !unit) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axiosInstance.post(`/quotations`, {
        requirement,
        qnt,
        unit,
      });
      alert("Quotation sent successfully!");
      // Optional: clear fields
      setRequirement("");
      setQnt("");
      setUnit("Pieces");
    } catch (error) {
      console.error("Failed to submit quotation", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);
  console.log(activeMarket); // Add this line before rendering the categories

  return (
    <>
      <div className="cont1 flex pt-14 pb-12 gap-2 sm:gap-16 lg:gap-7 xl:gap-5 2xl:gap-10 bg-white border shadow-xl">
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
            </div>

          </div>
          {activeMarket && (
            <div className="absolute inset-0 bg-white border flex flex-col px-2 sm:px-6 sm:py-4 mb-4 z-5">
              <h4 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6">Categories</h4>

              <div className="overflow-y-auto max-h-[400px] pr-2">
                <ul className="list-none sm:list-disc space-y-1 sm:space-y-2 md:space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-5 md:gap-7 px-3 sm:px-8">
                  {activeMarket.map((item) => (
                    <li
                      key={item.id}
                      className="text-gray-700 hover:text-black text-lg sm:text-xl md:text-2xl cursor-pointer"
                    >
                      <Link href={`/products?category_id=${item.category_id}&subcategory_id=${item.id}`}>
                        {item.subcategorie_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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
              <Link href={"/products?category_id=1"}>
                <StoneCard icon="/mar_pics/marbel2.jpg" name="Stone Blocks" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=1"}>
                <StoneCard icon="/mar_pics/marbel4.jpg" name="Stone tiles" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=1"}>
                <StoneCard icon="/mar_pics/marbel3.jpg" name="Interioe stone products" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=1"}>
                <StoneCard icon="/mar_pics/marbel2.jpg" name="kitchen sink" />
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=1"}>
                <StoneCard icon="/mar_pics/marbel1.jpg" name="stone sculpture" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=1"}>
                <StoneCard icon="/mar_pics/marbel5.jpg" name="building stone ledge" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=1"}>
                <StoneCard icon="/mar_pics/marbel4.jpg" name="gravestone" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=1"}>
                <StoneCard icon="/mar_pics/marbel3.jpg" name="landscaping stones" />
              </Link>
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
              <Link href={"/products?category_id=2"}>
                <StoneCard icon="/mar_pics/marbel3.jpg" name="Stone Blocks" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=2"}>
                <StoneCard icon="/mar_pics/marbel2.jpg" name="Stone tiles" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=2"}>
                <StoneCard icon="/mar_pics/marbel5.jpg" name="Interioe stone products" />
              </Link>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <Link href={"/products?category_id=2"}>
                <StoneCard icon="/mar_pics/marbel3.jpg" name="kitchen sink" />
              </Link>
            </div>
          </div>
          <div className="flex">
            <div className=" w-1/3">
              <Link href={"/products?category_id=2"}>
                <StoneCard icon="/mar_pics/marbel4.jpg" name="stone sculpture" />
              </Link>
            </div>
            <div className=" w-1/3">
              <Link href={"/products?category_id=2"}>
                <StoneCard icon="/mar_pics/marbel5.jpg" name="building stone ledge" />
              </Link>
            </div>
            <div className=" w-1/3">
              <Link href={"/products?category_id=2"}>
                <StoneCard icon="/mar_pics/marbel1.jpg" name="gravestone" />
              </Link>
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
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className="sm:w-full p-3 mt-4 border text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-[12px] sm:text-sm mt-1">
            Please input the name of product you need!
          </p>
          <div className="flex gap-4 mt-4">
            <input
              type="number"
              placeholder="Quantity"
              value={qnt}
              onChange={(e) => setQnt(e.target.value)}
              className="flex-1 w-full p-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="p-3 text-gray-700 border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Pieces</option>
              <option>Boxes</option>
              <option>Foot</option>
              <option>Meter</option>
            </select>
          </div>
          <p className="text-red-500 text-[13px] sm:text-sm mt-1">
            Please Input your Need Product Number!
          </p>
          <button
            onClick={handleSubmit}
            className="w-full mt-4 p-3 text-black bg-yellow-400 rounded-md hover:bg-yellow-300 transition"
          >
            Request For Quotation
          </button>
        </div>
      </div>

    </>
  );
}
