"use client"

import Image from "next/image";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Sidebar } from "./components/marketItemsParent";
import { StoneLib } from "./components/stonelib";
import { StoneHead } from "./components/stoneHeadCard";
import { StoneCard } from "./components/stoneCard";

export default function Home() {
  const [activeMarket, setActiveMarket] = useState<string[] | null>(null);

  return (
    <>
      <div className="cont1 flex mt-4 gap-4 sm:gap-16 xl:gap-5 lg:gap-7">
        <Sidebar setActiveMarket={setActiveMarket} />

        <div className="flex gap-0 xl:gap-5 flex-wrap relative">
          <div className="overflow-hidden ms-3 hidden sm:block xl:ms-0 w-[200px] h-[150px] sm:h-fit sm:w-[400px] md:w-[500px] lg:w-[450px] xl:w-[500px] relative">
            <Image
              className="pt-10 w-full h-full object-cover"
              src="/mar_pics/marbel1.jpg"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>

          <div className="px-6 relative">
           
                <h4 className="mt-3">Sponsors</h4>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center py-4">
                  <Image src="/mar_pics/marbel3.jpg" alt="Logo" width={170} height={170} />
                  <Image src="/mar_pics/marbel3.jpg" alt="Logo" width={170} height={170} />
                  <Image src="/mar_pics/marbel3.jpg" alt="Logo" width={170} height={170} />
                </div>
              
          </div>
          {activeMarket && (
              <div className="absolute inset-0 bg-gray-50 flex flex-col px-6 py-4">
                <h4 className="text-3xl font-bold mb-6">Categories</h4>
                <ul className="list-disc text-lg space-y-3 grid grid-cols-2 md:grid-cols-3 gap-6 px-8">
                  {activeMarket.map((item, index) => (
                    <li key={index} className="text-gray-700 hover:text-black cursor-pointer">
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
          <StoneHead
            icon="/mar_pics/marbel4.jpg"
            name="Natural Stone"
            w={300}
            h={450}
          />
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
          <div className="flex gap-3 w-56 border border-gray-400 p-2">
            <Image
              src={"/mar_pics/marbel4.jpg"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1>Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm">China</p>
            </div>
          </div>
          <div className="flex gap-3 w-56 border border-gray-400 p-2">
            <Image
              src={"/mar_pics/marbel3.jpg"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1>Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm">China</p>
            </div>
          </div>
          <div className="flex gap-3 w-56 border border-gray-400 p-2">
            <Image
              src={"/mar_pics/marbel2.jpg"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1>Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm">China</p>
            </div>
          </div>
          <div className="flex gap-3 w-56 border border-gray-400 p-2">
            <Image
              src={"/mar_pics/marbel4.jpg"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1>Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm">China</p>
            </div>
          </div>
          <div className="flex gap-3 w-56 border border-gray-400 p-2">
            <Image
              src={"/mar_pics/marbel1.jpg"}
              alt=""
              width={70}
              height={70}
            ></Image>
            <div>
              <h1>Sunshine Corporation Industry pvt. ltd.</h1>
              <p className="text-sm">China</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cont4 flex flex-wrap w-full px-5 py-10 my-6 bg-white shadow-lg">
        <div className="w-full md:w-1/2 lg:w-1/4">
          <StoneHead
            icon="/mar_pics/marbel2.jpg"
            name="Artificial Stone"
            w={300}
            h={450}
          />
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

      <div className="h-[20vh]"></div>
    </>
  );
}
