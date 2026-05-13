'use client';

import { useEffect } from 'react';
import CinematicHero from '@/components/CinematicHero';
import ResortShowcase from '@/components/ResortShowcase';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', move);

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <CinematicHero />

      {/* 3D Teaser */}
      <section className="relative py-24 md:py-32 px-5 md:px-10 overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/30 via-ink to-ink" />

          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <p className="kicker mb-5 text-gold">
              A Shauryawada first
            </p>

            <h2 className="h-display text-5xl md:text-7xl text-bone leading-[0.95]">
              Walk the resort,
              <br />
              <span className="italic gold-text">
                before you arrive
              </span>.
            </h2>

            <p className="mt-6 text-bone/70 max-w-md leading-relaxed">
              Step into a stylized 3D map of any Shauryawada property.
              Orbit, hover, choose the cottage that catches your eye —
              then book it instantly.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              
              <Link
                href="/booking/3d"
                className="px-6 py-4 bg-gold text-ink text-[12px] tracking-[0.25em] uppercase hover:bg-bone transition"
              >
                Enter the 3D experience
              </Link>

              <Link
                href="/booking"
                className="px-6 py-4 border border-bone/30 text-bone text-[12px] tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition"
              >
                Standard booking
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative aspect-[4/5] glass overflow-hidden group rounded-3xl">
            
            {/* WATER RIPPLE EFFECT */}
            <div className="absolute inset-0 z-20 pointer-events-none water-ripple" />

            {/* IMAGE */}
            <Image
              src="/images/Untitled-design-53-1536x1152.png"
              alt="3D resort preview"
              fill
              priority
              sizes="100vw"
              className="
                object-contain
                p-2
                transition-transform duration-700
                group-hover:scale-105
                opacity-95
              "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-transparent to-gold/10 z-10" />

            {/* WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div
                className="
                  text-[15vw] md:text-[7vw]
                  font-display
                  italic
                  text-white/[0.04]
                  tracking-[0.3em]
                  uppercase
                  select-none
                "
              >
                SHAURYAWADA
              </div>
            </div>

            {/* BOTTOM INFO */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between text-xs z-30">
              
              <span className="kicker text-gold">
                Live demo
              </span>

              <span className="kicker text-bone/60">
                Touch · Drag · Tap
              </span>
            </div>

            {/* FLOATING MARKERS */}
            {[
              { t: '20%', l: '35%', label: 'Coral Villa' },
              { t: '55%', l: '60%', label: 'Tide Suite' },
              { t: '70%', l: '25%', label: 'Palm Cottage' },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  top: m.t,
                  left: m.l,
                  animationDelay: `${i * 0.6}s`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 animate-float z-30"
              >
                <div className="w-3 h-3 rounded-full bg-gold ring-4 ring-gold/30" />

                <div className="mt-2 px-2 py-1 text-[10px] tracking-widest uppercase bg-ink/70 backdrop-blur text-bone whitespace-nowrap">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResortShowcase />

      {/* MANIFESTO */}
      <section className="px-5 md:px-10 py-24 md:py-40">
        <div className="max-w-5xl mx-auto text-center">
          
          <p className="kicker mb-6">
            The Shauryawada doctrine
          </p>

          <p className="font-display text-3xl md:text-6xl leading-[1.1] text-bone">
            We do not build hotels.
            <br />
            We frame{' '}
            <span className="italic gold-text">
              moments
            </span>{' '}
            you'll keep for life.
          </p>

          <div className="hairline mt-10 max-w-xs mx-auto" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-10 mb-24">
        <div className="max-w-[1400px] mx-auto glass p-10 md:p-20 grid md:grid-cols-[1fr_auto] gap-8 items-center rounded-3xl">
          
          <div>
            <p className="kicker mb-3 text-gold">
              Reserve
            </p>

            <h3 className="font-display text-4xl md:text-6xl text-bone leading-[1]">
              Begin your escape.
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            
            <Link
              href="/booking"
              className="px-6 py-4 bg-gold text-ink text-center text-[12px] tracking-[0.25em] uppercase hover:bg-bone transition"
            >
              Book a stay
            </Link>

            <Link
              href="/booking/3d"
              className="px-6 py-4 border border-gold/60 text-gold text-center text-[12px] tracking-[0.25em] uppercase hover:bg-gold hover:text-ink transition"
            >
              Explore in 3D
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
