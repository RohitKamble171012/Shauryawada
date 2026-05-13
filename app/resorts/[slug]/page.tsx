import { resorts, getResort } from '@/data/resorts';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

export default async function ResortPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getResort(slug);
  if (!r) notFound();

  return (
    <div className="pt-20">
      <section className="relative h-[80svh] md:h-[100svh]">
        <Image src={r.hero} alt={r.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 md:px-10 pb-12 md:pb-16 max-w-[1400px] mx-auto">
          <p className="kicker mb-4 text-gold">{r.location}</p>
          <h1 className="h-display text-5xl md:text-9xl text-bone">{r.name}</h1>
          <p className="font-display italic text-xl md:text-3xl text-bone/80 mt-3">{r.tagline}</p>
        </div>
      </section>

      <section className="px-5 md:px-10 py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20">
          <div>
            <p className="kicker mb-3 text-gold">The story</p>
            <p className="font-display text-3xl md:text-5xl text-bone leading-[1.1]">{r.story}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {r.highlights.map((h, i) => (
              <div key={h} className="glass p-5">
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase">0{i + 1}</p>
                <p className="mt-2 font-display text-xl text-bone">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="kicker mb-4 text-gold">Frames</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {r.gallery.map((g, i) => (
              <div key={g} className={`relative ${i % 5 === 0 ? 'aspect-[3/4] md:col-span-2 md:row-span-2' : 'aspect-square'} overflow-hidden`}>
                <Image src={g} alt={r.name} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width:768px)50vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 pb-24">
        <div className="max-w-[1400px] mx-auto glass p-8 md:p-16 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="kicker mb-3 text-gold">Reserve {r.name}</p>
            <h3 className="font-display text-4xl md:text-6xl text-bone leading-[1]">Step inside.</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/booking?resort=${r.slug}`} className="px-6 py-4 bg-gold text-ink text-center text-[12px] tracking-[0.25em] uppercase">Book a stay</Link>
            <Link href="/booking/3d" className="px-6 py-4 border border-gold/60 text-gold text-center text-[12px] tracking-[0.25em] uppercase">Explore in 3D</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
