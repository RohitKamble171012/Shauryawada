'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-28 md:pt-36 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <p className="kicker mb-4 text-gold">Speak with our concierge</p>
        <h1 className="h-display text-5xl md:text-8xl text-bone">Let's plan your <span className="italic gold-text">stay</span>.</h1>

        <div className="mt-16 grid md:grid-cols-[1.2fr_1fr] gap-10">
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass p-6 md:p-10 grid gap-5">
            {[
              { l: 'Full name', t: 'text' }, { l: 'Email', t: 'email' }, { l: 'Phone', t: 'tel' },
            ].map((f) => (
              <div key={f.l}>
                <label className="kicker block mb-2">{f.l}</label>
                <input required type={f.t} className="w-full bg-bone/5 border border-bone/10 px-4 py-3 text-bone outline-none focus:border-gold" />
              </div>
            ))}
            <div>
              <label className="kicker block mb-2">Tell us about your trip</label>
              <textarea rows={4} className="w-full bg-bone/5 border border-bone/10 px-4 py-3 text-bone outline-none focus:border-gold" />
            </div>
            <button className="px-6 py-4 bg-gold text-ink text-[12px] tracking-[0.25em] uppercase hover:bg-bone transition">{sent ? 'Sent — we\'ll be in touch' : 'Send message'}</button>
          </form>

          <div className="space-y-6">
            {[
              { Icon: Mail, l: 'Email', v: 'concierge@shauryawada.com' },
              { Icon: Phone, l: 'Phone', v: '+91 98 9000 0000' },
              { Icon: MessageCircle, l: 'WhatsApp', v: 'Chat with our concierge', href: 'https://wa.me/919890000000' },
              { Icon: MapPin, l: 'Properties', v: 'Alibaug · Pune · Mahabaleshwar' },
            ].map(({ Icon, l, v, href }) => (
              <a key={l} href={href ?? '#'} className="glass p-5 flex items-start gap-4 group">
                <Icon className="text-gold mt-1" size={20} />
                <div>
                  <p className="kicker mb-1">{l}</p>
                  <p className="text-bone group-hover:text-gold transition">{v}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
