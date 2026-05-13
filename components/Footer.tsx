import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-gold/15 bg-ink">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full border border-gold/60 grid place-items-center font-display text-gold">S</span>
            <span className="font-display text-2xl">Shauryawada</span>
          </div>
          <p className="font-display text-3xl md:text-5xl leading-[1.05] text-bone/90 max-w-lg">
            A new chapter of <span className="gold-text italic">cinematic luxury</span> hospitality.
          </p>
        </div>
        <div>
          <p className="kicker mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            {['Resorts', 'Book a stay', 'Explore in 3D', 'Gallery', 'Story', 'Contact'].map((x) => (
              <li key={x}><Link href="/" className="text-bone/70 hover:text-gold transition-colors">{x}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker mb-5">Reach</p>
          <ul className="space-y-3 text-sm text-bone/70">
            <li>concierge@shauryawada.com</li>
            <li>+91 98 9000 0000</li>
            <li>Alibaug · Pune · Mahabaleshwar</li>
          </ul>
          <a href="https://wa.me/919890000000" className="inline-flex mt-6 px-4 py-2 border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-ink transition">WhatsApp</a>
        </div>
      </div>
      <div className="border-t border-bone/5 py-6 px-5 md:px-10 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-3 text-xs text-bone/40">
        <span>© {new Date().getFullYear()} Shauryawada Hospitality. All rights reserved.</span>
        <span>Crafted as a cinematic demo experience.</span>
      </div>
    </footer>
  );
}
