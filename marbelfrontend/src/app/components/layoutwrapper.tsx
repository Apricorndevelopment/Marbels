"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Header1 } from "./header1";
import { Header2 } from "./header2";
import Footer from "./footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // Set <body> class depending on path
  useEffect(() => {
    document.body.classList.remove("dashboard-theme", "main-theme");
    document.body.classList.add(isDashboard ? "dashboard-theme" : "main-theme");
  }, [isDashboard]);

  return (
    <>
      {!isDashboard && (
        <>
          <Header1 />
          <Header2 />
        </>
      )}

      {/* No <main> here! Just pass children */}
      {children}

      {!isDashboard && <Footer />}
    </>
  );
}
