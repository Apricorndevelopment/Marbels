import Image from "next/image";

interface stoneProps {
  icon: string;
  name: string;
}

export function StoneCard({ icon, name }: stoneProps) {
  return (
    <div className="px-4 border-r border-b border-gray-400 bg-white h-56 cursor-pointer hover:border-2">
      <div className="flex flex-col gap-5 justify-center">
        <h1 className="text-1xl pt-2 hover:text-blue-500">{name} </h1>
        <div className="flex justify-center items-center py-3 h-36">
          <Image src={icon} alt={name} width={200} height={200}></Image>
        </div>
      </div>
    </div>
  );
}
