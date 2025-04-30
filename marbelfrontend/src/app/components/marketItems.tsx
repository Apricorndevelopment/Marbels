import Image from "next/image";

interface MarketItemProps {
  icon: string;
  name: string;
}

export function MarketItem({ icon, name }: MarketItemProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-5 sm:p-5 hover:bg-yellow-200 cursor-pointer">
      
      <Image src={icon} alt={name} width={38} height={38} />

      <span className="flex-grow sm:text-2xl">{name}</span>

      <i className="bi bi-chevron-down text-xl text-gray-500"></i>
    </div>
  );
}
