import Image from "next/image";

interface MarketItemProps {
  icon: string;
  name: string;
}

export function MarketItem({ icon, name }: MarketItemProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-6 sm:p-3 hover:bg-yellow-200 cursor-pointer">
      
      <Image src={icon} alt={name} width={33} height={33} />

      <span className="flex-grow sm:text-xl">{name}</span>

      <i className="bi bi-chevron-down text-gray-500"></i>
    </div>
  );
}
