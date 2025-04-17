import Image from "next/image";

interface ProductCardProps {
  product: {
    name: string;
    origin: string;
    flag: string;
    stock: number;
    price: number;
    image: string;
  };
}

export function PopularSlabs({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md px-3 py-5 bg-white">
       <div className="w-full h-40 overflow-hidden rounded-md hover:border-[1.4px] border-blue-700">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-sm mt-2">{product.name}</h3>
      <p className="text-sm">
        <span className="mr-2">{product.flag}</span> {product.origin}
      </p>
      <p className="text-green-600 font-semibold text-sm">
        Instock: {product.stock.toLocaleString()}m²
      </p>
      <p className="text-gray-700 text-sm">
        Price: From <strong className="text-black">Rupees {product.price.toFixed(2)}/m²</strong> (FOB)
      </p>
    </div>
  );
}
