import Link from 'next/link';
import Image from 'next/image';
import { resorts } from '@/data/resorts';

export const metadata = { title: 'Resorts · Shauryawada' };

export default function ResortsPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <p className="kicker mb-4 text-gold">Three sanctuaries</p>
        <h1 className="h-display text-5xl md:text-8xl text-bone">Choose a <span className="italic gold-text">landscape</span>.</h1>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {resorts.map((r, i) => (
            <Link key={r.slug} href={`/resorts/${r.slug}`} className="group relative aspect-[3/4] overflow-hidden block">
              <Image src={r.cover} alt={r.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]" sizes="(max-width:768px)100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="kicker mb-2 text-gold">0{i + 1} / 03</p>
                <p className="font-display text-3xl md:text-4xl text-bone">{r.name}</p>
                <p className="font-display italic text-bone/70 mt-1">{r.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
