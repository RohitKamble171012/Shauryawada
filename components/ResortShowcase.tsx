'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { resorts } from '@/data/resorts';

export default function ResortShowcase() {
  return (
    <section className="relative py-24 md:py-40 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-[auto_1fr] gap-6 items-end mb-16 md:mb-24">
          <div>
            <p className="kicker mb-5">Three sanctuaries</p>
            <h2 className="h-display text-5xl md:text-7xl lg:text-8xl text-bone max-w-3xl">
              A trilogy of <span className="italic gold-text">landscapes</span>.
            </h2>
          </div>
          <p className="text-bone/60 max-w-md md:text-right md:justify-self-end leading-relaxed">
            Each Shauryawada property is a chapter in the same story — written in stone, water and silence.
          </p>
        </div>

        <div className="space-y-32 md:space-y-48">
          {resorts.map((r, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div key={r.slug}
                initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
                className={`grid md:grid-cols-12 gap-6 md:gap-10 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
                <div className={`md:col-span-7 [direction:ltr] relative aspect-[4/5] md:aspect-[5/6] overflow-hidden`}>
                  <Image src={r.cover} alt={r.name} fill className="object-cover hover:scale-105 transition-transform duration-[2s]" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <span className="absolute top-5 left-5 kicker bg-ink/40 backdrop-blur px-3 py-2">0{i + 1} / 03</span>
                </div>
                <div className="md:col-span-5 [direction:ltr]">
                  <p className="kicker mb-4 text-gold/80">{r.location}</p>
                  <h3 className="font-display text-4xl md:text-6xl leading-[1] text-bone mb-6">{r.name}</h3>
                  <p className="font-display italic text-xl text-bone/70 mb-6">{r.tagline}</p>
                  <p className="text-bone/60 leading-relaxed mb-8">{r.story}</p>
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {r.highlights.map((h) => (
                      <li key={h} className="text-xs text-bone/60 border-l border-gold/40 pl-3 py-1">{h}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/resorts/${r.slug}`} className="px-5 py-3 bg-bone text-ink text-[11px] tracking-[0.25em] uppercase hover:bg-gold transition">View resort</Link>
                    <Link href={`/booking?resort=${r.slug}`} className="px-5 py-3 border border-gold/50 text-gold text-[11px] tracking-[0.25em] uppercase hover:bg-gold hover:text-ink transition">Book a stay</Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
