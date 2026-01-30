export function AnimatedBackground() {
  return (
    <>
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -left-4 top-0 h-72 w-72 animate-pulse rounded-full bg-linear-to-r from-blue-400/20 to-cyan-400/20 blur-3xl" />
        <div className="absolute -right-4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-linear-to-r from-purple-400/20 to-pink-400/20 blur-3xl [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-pulse rounded-full bg-linear-to-r from-indigo-400/20 to-blue-400/20 blur-3xl [animation-delay:2s]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>
    </>
  );
}
