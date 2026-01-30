import PageLayout from '@/components/layouts/PageLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Shadow Car Background - Appears on all client pages */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="car-hero-bg absolute inset-0" />
      </div>
      
      <main className="relative z-10">
        <PageLayout>
          {children}
        </PageLayout>
      </main>
    </div>
  );
}