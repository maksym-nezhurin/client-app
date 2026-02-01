'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { MarketProvider } from '@/contexts/market/MarketContext';
// import { Sidebar } from '../ui/Sidebar';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';

export default function AppLayout({ children }: { children: ReactNode }) {
  //  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <MarketProvider>
        <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header className="h-16 px-6 flex items-center justify-between bg-primary text-primary-foreground shadow" />

        <div className="flex flex-1">
          {/* Sidebar */}
          {/* <Sidebar isOpen={isSidebarOpen} onToggle={() => setSidebarOpen(!isSidebarOpen)}/> */}

          {/* Main content */}
          <main
          className="flex-1 bg-muted/40"
          >
            <div className='h-[calc(100vh-120px)] overflow-scroll'>
              {children}
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer className="h-16 flex items-center justify-center bg-primary text-muted-foreground text-sm">
          © 2025 Car Rental Service
        </Footer>
        </div>
      </MarketProvider>
    </AuthProvider>
  
  );
}
