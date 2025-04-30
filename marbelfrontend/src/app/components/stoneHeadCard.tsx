import Image from "next/image";

interface StoneCardProps {
  icon: string;
  name: string;
  w: number;
  h: number;
}

export function StoneHead({ icon, name, w, h }: StoneCardProps) {
  return (
    <div
      className="relative cursor-pointer overflow-hidden hover:border-[1.5px]"
      style={{ width: `${w}px`, height: `${h}px` }} 
    >
      <Image
        className="w-full h-full object-cover"
        src={icon}
        alt={name}
        layout="fill"
      />
     <h1 className="absolute top-3 left-2 text-3xl font-bold text-black px-2 py-1 hover:text-zinc-700 transition-colors duration-200 drop-shadow-[2px_2px_4px_rgba(255,255,255,0.7)]">
  {name}
</h1>
    </div>
  );
}
