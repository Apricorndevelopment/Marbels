import Image from "next/image";
import Link from "next/link";

interface MarbleCardProps {
    id: string; 
  imageUrl: string;
  title: string;
  countryName: string;
  type: string;
  color:string;
}

export function MarbleCard({
    id,
  imageUrl,
  title,
  countryName,
  type,
  color
}: MarbleCardProps) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
    
      <div className="relative w-full h-48">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-2xl">{title}</h3>

        <div className="mt-2 flex gap-2 items-center text-md text-gray-700">
          <h1 className="font-semibold">Country : </h1>
          <h1> {countryName} </h1>
        </div>
        <div className="mt-1 flex gap-2 items-center text-md text-gray-700">
          <h1 className="font-semibold"> Marble Type : </h1>
          <h1> {type} </h1>
        </div>
        <div className="mt-1 flex gap-2 items-center text-md text-gray-700">
          <h1 className="font-semibold"> Color : </h1>
          <h1> {color} </h1>
        </div>

        <button className="mt-3 flex items-center gap-2 text-blue-600 hover:underline">
          <i className="bi bi-pencil-square"></i> Post Request
        </button>
        <button className="mt-3 rounded text-white p-2 bg-blue-600 hover:underline">
           <Link href={`/products/${id}`}> View Details → </Link>
          </button>
      </div>
    </div>
  );
}
