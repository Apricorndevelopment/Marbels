import Image from "next/image";

interface ProductCardProps {
  product: {
    name: string;
    thick: string;
    stock: number;
    price: number;
    image: string;
  };
}

export function SlabsCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md px-3 py-5 bg-white">
       <div className="w-full h-40 overflow-hidden rounded-md hover:border-[1.4px] border-blue-700">
        <Image
          src={`http://127.0.0.1:8000/storage/${product.image}`}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-sm mt-3">{product.name}</h3>
      <p className="text-green-600 font-semibold text-sm mt-1">
        {product.stock.toLocaleString()}m² in Stock
      </p>
      <p className="text-sm mt-1">
       Thickness: {product.thick} mm (+-0.5mm)
      </p>
      <p className="text-gray-700 mt-1">
        <strong className="text-black">Rupees {product.price.toFixed(2)}/m²</strong> (FOB)
      </p>
    </div>
  );
}
