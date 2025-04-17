import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from './context/SidebarContext';
import { ThemeProvider } from './context/ThemeContext';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${outfit.className} dark:bg-gray-900`}>
      <ThemeProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
