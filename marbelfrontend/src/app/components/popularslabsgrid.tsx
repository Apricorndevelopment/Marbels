import {PopularSlabs} from "./popularslabs";

const products = [
  {
    name: "Admiral Blue Quartzite",
    origin: "Brazil",
    flag: "🇧🇷",
    stock: 200.85,
    price: 358.568,
    image: "/mar_pics/marbel7.jpg",
  },
  {
    name: "Blue Sodalite",
    origin: "Bolivia",
    flag: "🇧🇴",
    stock: 1010.01,
    price: 432.11,
    image: "/mar_pics/marbel9.jpg",
  },
  {
    name: "Aquarella Quartzite",
    origin: "Brazil",
    flag: "🇧🇷",
    stock: 79.63,
    price: 633.58,
    image: "/mar_pics/marbel6.jpg",
  },
  {
    name: "Picasso Silver Quartzite",
    origin: "Brazil",
    flag: "🇧🇷",
    stock: 85.48,
    price: 214.11,
    image: "/mar_pics/marbel8.jpg",
  },
  {
    name: "Macaubas Illusion Quartzite",
    origin: "Brazil",
    flag: "🇧🇷",
    stock: 6.18,
    price: 432.35,
    image: "/mar_pics/marbel5.jpg",
  },
  {
    name: "Sodalite Royal Blue",
    origin: "Bolivia",
    flag: "🇧🇴",
    stock: 54.65,
    price: 790.58,
    image: "/mar_pics/marbel3.jpg",
  },
  {
    name: "Emerald Green Quartzite",
    origin: "Brazil",
    flag: "🇧🇷",
    stock: 967.06,
    price: 345.58,
    image: "/mar_pics/marbel4.jpg",
  },
  {
    name: "Hermes Gray Marble",
    origin: "Turkey",
    flag: "🇹🇷",
    stock: 3411.88,
    price: 234.74,
    image: "/mar_pics/marbel2.jpg",
  },
  {
    name: "Pandora Granite",
    origin: "Brazil",
    flag: "🇧🇷",
    stock: 2774.43,
    price: 421.06,
    image: "/mar_pics/marbel7.jpg",
  },
  {
    name: "Tesla Grey Marble",
    origin: "Turkey",
    flag: "🇹🇷",
    stock: 1443.65,
    price: 224.62,
    image: "/mar_pics/marbel1.jpg",
  },
];

export function ProductsGrid() {
  return (
    <div id="popular-slab" className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Popular Natural Stone</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products.map((product, index) => (
          <PopularSlabs key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
