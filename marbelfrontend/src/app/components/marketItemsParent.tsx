"use client";

import { useState } from "react";
import { MarketItem } from "./marketItems";

const markets = [
  { 
    name: "Natural Stone", 
    icon: "/file.svg", 
    content: ["Marble", "Granite", "Limestone", "Travertine", "Onyx","Marble", "Granite", "Limestone", "Travertine", "Onyx","Marble", "Granite", "Limestone", "Travertine", "Onyx"]
  },
  { 
    name: "Artificial Stone", 
    icon: "/window.svg", 
    content: ["Quartz", "Solid Surface", "Sintered Stone", "Concrete Stone","Solid Surface", "Sintered Stone", "Concrete Stone","Solid Surface", "Sintered Stone", "Concrete Stone"]
  },
  { 
    name: "Stone Machinery", 
    icon: "/file.svg", 
    content: ["Cutting Machines", "Polishing Machines", "CNC Machines","Cutting Machines", "Polishing Machines", "CNC Machines"]
  },
  { 
    name: "Stone Tools & Abrasives", 
    icon: "/window.svg", 
    content: ["Diamond Blades", "Grinding Tools", "Abrasive Pads", "Resin Polishers","Diamond Blades", "Grinding Tools", "Abrasive Pads", "Resin Polishers"]
  }
];

export function Sidebar({ setActiveMarket }: { setActiveMarket: (content: string[] | null) => void }) {
  const [isPermanent, setIsPermanent] = useState(false);

  return (
    <aside className="p-4 mt-3">
      <h2 className="font-bold text-xl mb-7">My Markets</h2>
      <div>
        {markets.map((market, index) => (
          
          <div className="py-3"
            key={index}
            onMouseEnter={() => !isPermanent && setActiveMarket(market.content)}
            onMouseLeave={() => !isPermanent && setActiveMarket(null)}
            onClick={() => {
              if (isPermanent) {
                setActiveMarket(null);
                setIsPermanent(false);
              } else {
                setActiveMarket(market.content);
                setIsPermanent(true);
              }
            }}
          >
            <MarketItem icon={market.icon} name={market.name} />
          </div>
        ))}
      </div>
    </aside>
  );
}
