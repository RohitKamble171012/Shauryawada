'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/resorts', label: 'Resorts' },
  { href: '/booking', label: 'Book' },
  { href: '/booking/3d', label: 'Explore in 3D' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'Story' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'py-5 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-9 h-9 rounded-full border border-gold/60 grid place-items-center font-display text-gold text-lg">S</span>
            <span className="font-display text-xl tracking-wide text-bone">Shauryawada</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {links.slice(1).map((l) => (
              <Link key={l.href} href={l.href} className="text-[13px] tracking-wider uppercase text-bone/70 hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/booking" className="hidden lg:inline-flex px-5 py-2.5 border border-gold/50 text-gold text-[12px] tracking-[0.2em] uppercase hover:bg-gold hover:text-ink transition-all">
            Reserve
          </Link>
          <button onClick={() => setOpen(true)} className="lg:hidden text-bone p-2 -mr-2" aria-label="Menu"><Menu size={22} /></button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-ink/90 backdrop-blur-xl transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[88%] max-w-sm bg-ink border-l border-gold/20 transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between p-5 border-b border-gold/10">
            <span className="font-display text-lg text-gold">Menu</span>
            <button onClick={() => setOpen(false)} className="text-bone p-2 -mr-2"><X size={22} /></button>
          </div>
          <nav className="flex flex-col p-5 gap-1">
            {links.map((l, i) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-4 px-3 font-display text-2xl text-bone border-b border-bone/5 hover:text-gold transition-colors flex items-center justify-between">
                <span>{l.label}</span>
                <span className="text-xs text-gold/50">0{i + 1}</span>
              </Link>
            ))}
            <Link href="/booking" onClick={() => setOpen(false)} className="mt-6 px-5 py-4 bg-gold text-ink text-center text-[12px] tracking-[0.25em] uppercase">
              Reserve a stay
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
