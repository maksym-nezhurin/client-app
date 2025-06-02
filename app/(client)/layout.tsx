// import AnimatedCarBackground from '@/components/car/AnimatedCarBackground';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* <AnimatedCarBackground /> */}

      <main className="relative z-10">{children}</main>
    </div>
  );
}