'use client';

import '@/lib/i18n';
import { ReactNode } from 'react';
import { AuthProvider } from '@/components/auth/AuthContext';
// import { Sidebar } from '../ui/Sidebar';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';

export default function AppLayout({ children }: { children: ReactNode }) {
  //  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header className="h-16 px-6 flex items-center justify-between bg-primary text-primary-foreground shadow" />

        <div className="flex flex-1">
          {/* Sidebar */}
          {/* <Sidebar isOpen={isSidebarOpen} onToggle={() => setSidebarOpen(!isSidebarOpen)}/> */}

          {/* Main content */}
          <main className="flex-1 bg-slate-50">
            <div className="h-[calc(100vh-120px)] overflow-y-auto">{children}</div>
          </main>
        </div>

        {/* Footer */}
        <Footer className="h-16 flex items-center justify-center" />
      </div>
    </AuthProvider>
  );
}
