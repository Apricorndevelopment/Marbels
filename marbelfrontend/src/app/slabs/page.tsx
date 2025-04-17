"use client";

import { ProductsGrid } from "../components/popularslabsgrid";
import { StoneHead } from "../components/stoneHeadCard";
import { SlabsCard } from "../components/slabscard";
import { Counter } from "../components/counterup";

const WhiteStone = [
  {
    name: "Admiral Blue Quartzite",
    thick:"17",
    stock: 200.85,
    price: 358.568,
    image: "/mar_pics/marbel6.jpg",
  },
  {
    name: "Blue Sodalite",
    thick:"18",
    stock: 1010.01,
    price: 432.11,
    image: "/mar_pics/marbel9.jpg",
  },
  {
    name: "Aquarella Quartzite",
    thick:"17",
    stock: 79.63,
    price: 633.58,
    image: "/mar_pics/marbel3.jpg",
  },
  {
    name: "Picasso Silver Quartzite",
    thick:"16",
    stock: 85.48,
    price: 214.11,
    image: "/mar_pics/marbel1.jpg",
  },
  {
    name: "Macaubas Illusion Quartzite",
    thick:"18",
    stock: 6.18,
    price: 432.35,
    image: "/mar_pics/marbel5.jpg",
  },
  {
    name: "Sodalite Royal Blue",
    thick:"17",
    stock: 54.65,
    price: 790.58,
    image: "/mar_pics/marbel7.jpg",
  },
  {
    name: "Emerald Green Quartzite",
    thick:"19",
    stock: 967.06,
    price: 345.58,
    image: "/mar_pics/marbel4.jpg",
  },
  {
    name: "Hermes Gray Marble",
    thick:"18",
    stock: 3411.88,
    price: 234.74,
    image: "/mar_pics/marbel2.jpg",
  },
];
const BlueStone = [
  {
    name: "Admiral Blue Quartzite",
    thick:"17",
    stock: 200.85,
    price: 358.568,
    image: "/mar_pics/marbel4.jpg",
  },
  {
    name: "Blue Sodalite",
    thick:"18",
    stock: 1010.01,
    price: 432.11,
    image: "/mar_pics/marbel8.jpg",
  },
  {
    name: "Aquarella Quartzite",
    thick:"17",
    stock: 79.63,
    price: 633.58,
    image: "/mar_pics/marbel9.jpg",
  },
  {
    name: "Picasso Silver Quartzite",
    thick:"16",
    stock: 85.48,
    price: 214.11,
    image: "/mar_pics/marbel8.jpg",
  },
  {
    name: "Macaubas Illusion Quartzite",
    thick:"18",
    stock: 6.18,
    price: 432.35,
    image: "/mar_pics/marbel5.jpg",
  },
  {
    name: "Sodalite Royal Blue",
    thick:"17",
    stock: 54.65,
    price: 790.58,
    image: "/mar_pics/marbel7.jpg",
  },
  {
    name: "Emerald Green Quartzite",
    thick:"19",
    stock: 967.06,
    price: 345.58,
    image: "/mar_pics/marbel4.jpg",
  },
  {
    name: "Hermes Gray Marble",
    thick:"18",
    stock: 3411.88,
    price: 234.74,
    image: "/mar_pics/marbel7.jpg",
  },
];
const BrownStone = [
  {
    name: "Admiral Blue Quartzite",
    thick:"17",
    stock: 200.85,
    price: 358.568,
    image: "/mar_pics/marbel4.jpg",
  },
  {
    name: "Blue Sodalite",
    thick:"18",
    stock: 1010.01,
    price: 432.11,
    image: "/mar_pics/marbel6.jpg",
  },
  {
    name: "Sodalite Royal Blue",
    thick:"17",
    stock: 54.65,
    price: 790.58,
    image: "/mar_pics/marbel3.jpg",
  },
  {
    name: "Emerald Green Quartzite",
    thick:"19",
    stock: 967.06,
    price: 345.58,
    image: "/mar_pics/marbel8.jpg",
  },
  {
    name: "Hermes Gray Marble",
    thick:"18",
    stock: 3411.88,
    price: 234.74,
    image: "/mar_pics/marbel9.jpg",
  },
];

export default function Home() {
  return (
    <>
    <div className="h-96 w-full bg-cover bg-center" style={{ backgroundImage: `url('/mar_pics/marbel7.jpg')` }}>
    <div className="flex justify-center items-center flex-col text-white gap-14 pt-20">
        <h1 className="text-3xl sm:text-4xl font-semibold">Best, Cheap, All in Stock </h1>
        <div className="flex gap-30 sm:gap-40 items-center justify-center">
            <div className="text-2xl sm:text-3xl flex flex-col items-center justify-center">
            <Counter end={157800} />
            <h1 className="text-2xl">In Stock</h1>
            </div>
            <div className="text-2xl sm:text-3xl flex flex-col items-center justify-center">
            <Counter end={1056} />
            <h1 className="text-xl">Material Types</h1>
            </div>
        </div>
    </div>
    </div>
      <div className="container mx-auto">
        <ProductsGrid />
      </div>

      <div id="white-slab" className="white-slab p-3 sm:p-6 bg-gray-100 rounded-2xl my-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <div className="whitestone sm:ps-2 w-full col-span-2">
            <StoneHead
              icon="/mar_pics/marbel5.jpg"
              name="White Stone Labs"
              w={345}
              h={300}
            />
          </div>
          {WhiteStone.map((product, index) => (
            <SlabsCard key={index} product={product} />
          ))}
        </div>
      </div>

      <div id="blue-slab" className="blue-slab p-3 sm:p-6 bg-gray-100 rounded-2xl my-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <div className="bluestone sm:ps-2 w-full col-span-2">
            <StoneHead
              icon="/mar_pics/marbel3.jpg"
              name="Blue Stone Labs"
              w={345}
              h={300}
            />
          </div>
          {BlueStone.map((product, index) => (
            <SlabsCard key={index} product={product} />
          ))}
        </div>
      </div>

      <div id="brown-slab" className="brown-slab p-3 sm:p-6 bg-gray-100 rounded-2xl my-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <div className="brownstone sm:ps-2 w-full col-span-2">
            <StoneHead
              icon="/mar_pics/marbel7.jpg"
              name="Brown Stone Labs"
              w={345}
              h={300}
            />
          </div>
          {BrownStone.map((product, index) => (
            <SlabsCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
