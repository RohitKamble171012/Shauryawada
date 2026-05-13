'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { resorts } from '@/data/resorts';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CinematicHero() {
  const [active, setActive] = useState(0);
  const r = resorts[active];
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* layered background */}
      <div className="absolute inset-0">
        {resorts.map((rs, i) => (
          <motion.div key={rs.slug} className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.05 }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}>
            <Image src={rs.hero} alt={rs.name} fill priority={i === 0} className="object-cover" sizes="100vw" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </div>

      {/* content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-12 min-h-[100svh] flex flex-col justify-between">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-3xl">
          <p className="kicker mb-5">Shauryawada · Est. Hospitality</p>
          <h1 className="h-display text-[14vw] md:text-[7.5rem] lg:text-[9rem] text-bone">
            Choose your <span className="italic gold-text">escape</span>.
          </h1>
          <p className="mt-6 text-base md:text-lg text-bone/75 max-w-xl leading-relaxed">
            Three sanctuaries — coast, valley, cloud. Designed for the unhurried. Built for the cinematic.
          </p>
        </motion.div>

        {/* Resort selector */}
        <div className="mt-10">
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
            {resorts.map((rs, i) => (
              <button key={rs.slug} onClick={() => setActive(i)}
                className={`shrink-0 px-4 py-2 text-[11px] tracking-[0.2em] uppercase border transition-all ${i === active ? 'bg-gold text-ink border-gold' : 'border-bone/20 text-bone/70 hover:border-gold/60 hover:text-gold'}`}>
                {rs.location.split(',')[0]}
              </button>
            ))}
          </div>

          <motion.div key={r.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <p className="font-display text-3xl md:text-5xl text-bone leading-tight">{r.name}</p>
              <p className="mt-2 text-bone/60 italic font-display text-lg md:text-xl">{r.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/resorts/${r.slug}`} className="px-6 py-4 bg-bone text-ink text-[12px] tracking-[0.25em] uppercase hover:bg-gold transition flex items-center gap-2">
                Discover <ArrowUpRight size={14} />
              </Link>
              <Link href="/booking/3d" className="px-6 py-4 border border-gold/60 text-gold text-[12px] tracking-[0.25em] uppercase hover:bg-gold hover:text-ink transition">
                Explore in 3D
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-bone/50 text-[10px] tracking-[0.3em] uppercase">
        Scroll
        <span className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}
