import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
          Trusted marketplace
        </div>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Find your next car with clarity, speed, and confidence.
        </h1>
        <p className="text-lg text-slate-300">
          Browse verified listings, compare offers, and move from search to ownership in a few clicks.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Active listings', value: '1.2k+' },
            { label: 'Verified users', value: '4.8k' },
            { label: 'Avg. response', value: '12 min' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
            >
              <p className="text-xs uppercase text-slate-400">{item.label}</p>
              <p className="text-lg font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-[100px]" />
        <div className="absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-violet-400/20 blur-[120px]" />
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <Image
            src="/images/car-logo.png"
            alt="Car marketplace"
            width={520}
            height={420}
            className="w-full rounded-2xl"
          />
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <span>Live inventory updated</span>
            <span className="text-white">Every 5 min</span>
          </div>
        </div>
      </div>
    </section>
  );
}
