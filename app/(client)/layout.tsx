// import AnimatedCarBackground from '@/components/car/AnimatedCarBackground';
import PageLayout from '@/components/layouts/PageLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* <AnimatedCarBackground /> */}

      <main className="relative z-10">
        <PageLayout>{children}</PageLayout>
      </main>
    </div>
  );
}