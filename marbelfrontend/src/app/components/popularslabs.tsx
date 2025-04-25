import Image from "next/image";

interface ProductCardProps {
  product: {
    product_name: string;
    material_origin: string;
    product_image: string;
    min_order: number;
    FOB_price: number;
    province_city: string;
  };
}

export function PopularSlabs({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md px-3 py-5 bg-white">
      <div className="w-full h-40 overflow-hidden rounded-md hover:border-[1.4px] border-blue-700">
        <Image
          src={`http://127.0.0.1:8000/storage/${product.product_image}`}
          alt={product.product_name}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-sm mt-2">{product.product_name}</h3>
      <p className="text-sm">{product.material_origin}</p>
      <p className="text-green-600 font-semibold text-sm">
        Instock: {product.min_order.toLocaleString()}m²
      </p>
      <p className="text-gray-700 text-sm">
        Price: From{" "}
        <strong className="text-black">
          Rupees {Number(product.FOB_price).toFixed(2)}/m²
        </strong>{" "}
        (FOB)
      </p>
    </div>
  );
}

