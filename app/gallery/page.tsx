import Image from 'next/image';
import { resorts } from '@/data/resorts';

export const metadata = { title: 'Gallery · Shauryawada' };

export default function GalleryPage() {
  const all = resorts.flatMap((r) => r.gallery.map((g) => ({ src: g, label: r.name })));
  return (
    <div className="pt-28 md:pt-36 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <p className="kicker mb-4 text-gold">Gallery</p>
        <h1 className="h-display text-5xl md:text-8xl text-bone">Frames from <span className="italic gold-text">elsewhere</span>.</h1>
        <div className="mt-16 columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-5 [column-fill:_balance]">
          {all.map((it, i) => (
            <div key={i} className="break-inside-avoid mb-3 md:mb-5 relative overflow-hidden group">
              <Image src={it.src} alt={it.label} width={800} height={1000} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              <span className="absolute bottom-3 left-3 kicker text-bone opacity-0 group-hover:opacity-100 transition">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
