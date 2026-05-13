import Image from 'next/image';

export const metadata = { title: 'Story · Shauryawada' };

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24 px-5 md:px-10">
      <div className="max-w-[1100px] mx-auto">
        <p className="kicker mb-4 text-gold">The Shauryawada story</p>
        <h1 className="h-display text-5xl md:text-8xl text-bone">A study in <span className="italic gold-text">slowness</span>.</h1>
        <div className="relative aspect-[16/9] mt-12 overflow-hidden">
          <Image src="/images/Untitled-design-53-1536x1152.png" alt="Shauryawada" fill className="object-cover" />
        </div>
        <div className="grid md:grid-cols-2 gap-10 mt-16 text-bone/70 leading-relaxed">
          <p className="font-display text-2xl md:text-3xl text-bone leading-snug">
            Shauryawada was born from a single idea: hospitality should feel like cinema — composed, paced, and quietly unforgettable.
          </p>
          <div className="space-y-5">
            <p>Three properties. One philosophy. Each Shauryawada resort is built around the landscape it inhabits — the coast, the valley, the cloud. Architecture borrows from where it stands; menus borrow from who farms nearby; staff borrow nothing — they belong here.</p>
            <p>Our 3D booking experience is a small extension of the same idea: let guests feel the place before they arrive. Walk the property, choose the cottage, imagine the morning.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
